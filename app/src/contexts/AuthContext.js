import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirebase } from '../config/firebase';
import { isFirebaseConfigured } from '../config/env';
import { createUserProfile, getUserProfile } from '../services/users';
import { USER_ROLES } from '../firebase/collections';

const STORAGE_KEY = '@leta/session';

const AuthContext = createContext(null);

export const ROLES = {
  CUSTOMER: USER_ROLES.CUSTOMER,
  FIELD_TECH: USER_ROLES.FIELD_TECH,
  REMOTE_TECH: USER_ROLES.REMOTE_TECH,
};

async function loadStoredSession() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

async function persistSession(session) {
  if (session) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } else {
    await AsyncStorage.removeItem(STORAGE_KEY);
  }
}

async function refreshClaims(auth) {
  if (auth?.currentUser) {
    await auth.currentUser.getIdToken(true);
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(!isFirebaseConfigured());

  const applyProfile = useCallback((fbUser, userProfile) => {
    if (!fbUser) {
      setUser(null);
      setProfile(null);
      setRole(null);
      return;
    }
    setUser({
      uid: fbUser.uid,
      email: fbUser.email,
      displayName: userProfile?.displayName || fbUser.displayName || fbUser.email?.split('@')[0],
    });
    setProfile(userProfile);
    setRole(userProfile?.role || null);
  }, []);

  useEffect(() => {
    let unsubscribe = () => {};

    (async () => {
      const { auth, configured } = getFirebase();

      if (configured && auth) {
        setDemoMode(false);
        unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
          if (fbUser) {
            const userProfile = await getUserProfile(fbUser.uid);
            applyProfile(fbUser, userProfile);
            if (userProfile?.role) {
              await persistSession({
                uid: fbUser.uid,
                email: fbUser.email,
                role: userProfile.role,
              });
            }
          } else {
            applyProfile(null, null);
          }
          setLoading(false);
        });
      } else {
        const stored = await loadStoredSession();
        if (stored?.uid) {
          setUser({
            uid: stored.uid,
            email: stored.email,
            displayName: stored.displayName,
          });
          setRole(stored.role);
        }
        setDemoMode(true);
        setLoading(false);
      }
    })();

    return () => unsubscribe();
  }, [applyProfile]);

  const signIn = useCallback(async (email, password, selectedRole) => {
    const { auth, configured } = getFirebase();

    if (configured && auth) {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      let userProfile = await getUserProfile(cred.user.uid);

      if (!userProfile) {
        userProfile = await createUserProfile(cred.user.uid, {
          email: cred.user.email,
          displayName: cred.user.email?.split('@')[0],
          role: selectedRole,
        });
      } else if (userProfile.role !== selectedRole) {
        throw new Error(
          `This account is registered as ${userProfile.role}. Choose that role on the previous screen.`,
        );
      }

      await refreshClaims(auth);
      await persistSession({ uid: cred.user.uid, email: cred.user.email, role: userProfile.role });
      applyProfile(cred.user, userProfile);
      return userProfile;
    }

    const session = {
      uid: `demo-${Date.now()}`,
      email: email.trim(),
      displayName: email.split('@')[0],
      role: selectedRole,
    };
    await persistSession(session);
    setUser({ uid: session.uid, email: session.email, displayName: session.displayName });
    setRole(selectedRole);
    setDemoMode(true);
    return session;
  }, [applyProfile]);

  const signUp = useCallback(async (email, password, displayName, selectedRole) => {
    const { auth, configured } = getFirebase();

    if (configured && auth) {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const userProfile = await createUserProfile(cred.user.uid, {
        email: cred.user.email,
        displayName: displayName || email.split('@')[0],
        role: selectedRole,
      });
      await refreshClaims(auth);
      await persistSession({ uid: cred.user.uid, email: cred.user.email, role: selectedRole });
      applyProfile(cred.user, userProfile);
      return userProfile;
    }

    return signIn(email, password, selectedRole);
  }, [applyProfile, signIn]);

  const logOut = useCallback(async () => {
    const { auth, configured } = getFirebase();
    if (configured && auth) {
      await signOut(auth);
    }
    await persistSession(null);
    applyProfile(null, null);
  }, [applyProfile]);

  const value = useMemo(
    () => ({
      user,
      profile,
      role,
      loading,
      demoMode,
      isAuthenticated: Boolean(user && role),
      signIn,
      signUp,
      logOut,
      refreshProfile: async () => {
        const { auth, configured } = getFirebase();
        if (!configured || !auth?.currentUser) return;
        const userProfile = await getUserProfile(auth.currentUser.uid);
        applyProfile(auth.currentUser, userProfile);
        await refreshClaims(auth);
      },
    }),
    [user, profile, role, loading, demoMode, signIn, signUp, logOut, applyProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
