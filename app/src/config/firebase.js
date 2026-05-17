import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { env, isFirebaseConfigured } from './env';

let app;
let auth;
let db;
let storage;

export function getFirebase() {
  if (!isFirebaseConfigured()) {
    return { app: null, auth: null, db: null, storage: null, configured: false };
  }

  if (!app) {
    app = getApps().length ? getApps()[0] : initializeApp(env.firebase);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  }

  return { app, auth, db, storage, configured: true };
}
