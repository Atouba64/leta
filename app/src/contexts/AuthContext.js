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

const STORAGE_KEY = '@leta/session';

const AuthContext = createContext(null);

export const ROLES = {
  CUSTOMER: 'customer',
  FIELD_TECH: 'field_tech',
  REMOTE_TECH: 'remote_tech',
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

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(!isFirebaseConfigured());

  useEffect(() => {
    let unsubscribe = () => {};

    (async () => {
      const stored = await loadStoredSession();
      if (stored?.uid) {
        setUser({ uid: stored.uid, email: stored.email, displayName: stored.displayName });
        setRole(stored.role);
      }

      const { auth, configured } = getFirebase();
      if (configured && auth) {
        setDemoMode(false);
        unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
          if (fbUser) {
            const storedRole = (await loadStoredSession())?.role;
            setUser({
              uid: fbUser.uid,
              email: fbUser.email,
              displayName: fbUser.displayName || fbUser.email?.split('@')[0],
            });
            if (storedRole) setRole(storedRole);
          } else if (!stored?.uid) {
            setUser(null);
            setRole(null);
          }
          setLoading(false);
        });
      } else {
        setDemoMode(true);
        setLoading(false);
      }
    })();

    return () => unsubscribe();
  }, []);

  const signIn = useCallback(async (email, password, selectedRole) => {
    const { auth, configured } = getFirebase();

    if (configured && auth) {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const session = {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName || email.split('@')[0],
        role: selectedRole,
      };
      await persistSession(session);
      setUser({ uid: session.uid, email: session.email, displayName: session.displayName });
      setRole(selectedRole);
      return session;
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
  }, []);

  const signUp = useCallback(async (email, password, displayName, selectedRole) => {
    const { auth, configured } = getFirebase();

    if (configured && auth) {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const session = {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: displayName || email.split('@')[0],
        role: selectedRole,
      };
      await persistSession(session);
      setUser({ uid: session.uid, email: session.email, displayName: session.displayName });
      setRole(selectedRole);
      return session;
    }

    return signIn(email, password, selectedRole);
  }, [signIn]);

  const logOut = useCallback(async () => {
    const { auth, configured } = getFirebase();
    if (configured && auth) {
      await signOut(auth);
    }
    await persistSession(null);
    setUser(null);
    setRole(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      role,
      loading,
      demoMode,
      isAuthenticated: Boolean(user && role),
      signIn,
      signUp,
      logOut,
    }),
    [user, role, loading, demoMode, signIn, signUp, logOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
