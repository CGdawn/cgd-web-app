'use client';

/**
 * @fileOverview Firebase Modular SDK Entry Point
 * Initializes and exports singleton instances for Auth, Firestore, and Storage.
 * 
 * SECURITY RULES DEPLOYMENT TRIGGER:
 * Updated: 2024-05-24 16:15:00 UTC
 * 
 * REQUIRED SECURITY RULES:
 * match /users/{userId} {
 *   allow read, write: if request.auth != null && request.auth.uid == userId;
 * }
 * match /posts/{postId} {
 *   allow read;
 *   allow write: if request.auth != null && (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'super-admin']);
 * }
 * match /jobRequests/{requestId} {
 *   allow read: if request.auth != null && (request.auth.uid == resource.data.clientId || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'super-admin');
 *   allow create: if request.auth != null;
 * }
 */

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { firebaseConfig } from './config';

export function initializeFirebase(): {
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
  storage: FirebaseStorage;
} {
  const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const firestore = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const storage = getStorage(firebaseApp);

  return { firebaseApp, firestore, auth, storage };
}

export * from './provider';
export * from './client-provider';
export * from './auth/use-user';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
