'use client';

/**
 * @fileOverview Firebase Modular SDK Entry Point
 * Initializes and exports singleton instances for Auth, Firestore, and Storage.
 * 
 * SECURITY RULES DEPLOYMENT TRIGGER:
 * Updated: 2024-05-24 18:30:00 UTC
 * 
 * REQUIRED SECURITY RULES:
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     // Helper: Check if user is Super Admin
 *     function isSuperAdmin() {
 *       return request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'super-admin';
 *     }
 * 
 *     // Helper: Check if user is Admin
 *     function isAdmin() {
 *       return request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'super-admin'];
 *     }
 * 
 *     match /users/{userId} {
 *       allow get: if request.auth != null && (request.auth.uid == userId || isSuperAdmin());
 *       allow list: if isSuperAdmin();
 *       allow create: if request.auth != null && request.auth.uid == userId;
 *       allow update: if request.auth != null && (request.auth.uid == userId || isSuperAdmin());
 *     }
 * 
 *     match /posts/{postId} {
 *       allow read: if true;
 *       allow create: if isAdmin();
 *       allow update: if isAdmin();
 *       allow delete: if isSuperAdmin();
 *       
 *       match /comments/{commentId} {
 *         allow read: if true;
 *         allow create: if request.auth != null;
 *         allow delete: if request.auth != null && (request.auth.uid == resource.data.userId || isSuperAdmin());
 *       }
 * 
 *       match /reactions/{userId} {
 *         allow read: if true;
 *         allow write: if request.auth != null && request.auth.uid == userId;
 *       }
 *     }
 * 
 *     match /tasks/{taskId} {
 *       allow read: if request.auth != null && (resource.data.assignedToId == request.auth.uid || isSuperAdmin());
 *       allow create: if isSuperAdmin();
 *       allow update: if request.auth != null && (resource.data.assignedToId == request.auth.uid || isSuperAdmin());
 *       allow delete: if isSuperAdmin();
 *     }
 * 
 *     match /jobRequests/{requestId} {
 *       allow read: if request.auth != null && (resource.data.clientId == request.auth.uid || isSuperAdmin());
 *       allow create: if request.auth != null;
 *       allow update: if isSuperAdmin();
 *       allow delete: if isSuperAdmin();
 *     }
 * 
 *     match /products/{productId} {
 *       allow read: if true;
 *       allow write: if isSuperAdmin();
 *     }
 * 
 *     match /users/{userId}/cart/{itemId} {
 *       allow read, write: if request.auth != null && request.auth.uid == userId;
 *     }
 * 
 *     match /users/{userId}/orders/{orderId} {
 *       allow read, write: if request.auth != null && (request.auth.uid == userId || isSuperAdmin());
 *     }
 *   }
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
