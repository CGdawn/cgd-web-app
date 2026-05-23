'use client';

/**
 * @fileOverview Firebase Modular SDK Entry Point
 * Initializes and exports singleton instances for Auth, Firestore, and Storage.
 * 
 * SECURITY RULES DEPLOYMENT TRIGGER:
 * The following rules are required for the CyGen Dawn ecosystem:
 * - Users: Read/Write own profile (/users/{userId}). Super Admin: Full Access.
 * - Posts: Public Read. Admins: Create/Update. Super Admin: Full Access/Delete.
 * - Tasks: Super Admin: Full Access. Staff: Read/Update assigned tasks.
 * - JobRequests: Super Admin: Full Access. Clients: Read/Create own requests.
 * - Products: Public Read. Super Admin: Full Access.
 * - Update: 2024-05-22: Refined list permissions for staff and clients.
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
  // Prevent duplicate initialization in development
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
