'use client';

/**
 * @fileOverview Firebase Modular SDK Entry Point
 * Initializes and exports singleton instances for Auth, Firestore, and Storage.
 * 
 * SECURITY RULES DEPLOYMENT TRIGGER:
 * Updated: 2024-05-25 10:15:00 UTC
 * 
 * REQUIRED SECURITY RULES:
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     // Helper: Check if user document exists and get data
 *     function getUser(userId) {
 *       return get(/databases/$(database)/documents/users/$(userId)).data;
 *     }
 * 
 *     // Helper: Role checks
 *     function isSuperAdmin() {
 *       return request.auth != null && getUser(request.auth.uid).role == 'super-admin';
 *     }
 * 
 *     function isAdmin() {
 *       return request.auth != null && getUser(request.auth.uid).role in ['admin', 'super-admin'];
 *     }
 * 
 *     function isStaff() {
 *       return request.auth != null && getUser(request.auth.uid).role in ['staff', 'admin', 'super-admin'];
 *     }
 * 
 *     // Users Collection
 *     match /users/{userId} {
 *       allow get: if request.auth != null && (request.auth.uid == userId || isSuperAdmin());
 *       allow list: if isSuperAdmin() || isAdmin();
 *       allow create: if request.auth != null && request.auth.uid == userId;
 *       allow update: if request.auth != null && (request.auth.uid == userId || isSuperAdmin());
 *       allow delete: if isSuperAdmin();
 *     }
 * 
 *     // Posts Collection
 *     match /posts/{postId} {
 *       allow read: if true;
 *       allow create: if isAdmin();
 *       allow update: if isAdmin() && (resource.data.authorId == request.auth.uid || isSuperAdmin());
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
 *     // Tasks Collection
 *     match /tasks/{taskId} {
 *       allow read: if request.auth != null && (resource.data.assignedToId == request.auth.uid || isAdmin());
 *       allow list: if isStaff();
 *       allow create: if isSuperAdmin();
 *       allow update: if request.auth != null && (resource.data.assignedToId == request.auth.uid || isSuperAdmin());
 *       allow delete: if isSuperAdmin();
 *     }
 * 
 *     // Job Requests Collection
 *     match /jobRequests/{requestId} {
 *       allow read: if request.auth != null && (resource.data.clientId == request.auth.uid || isAdmin());
 *       allow list: if isAdmin();
 *       allow create: if request.auth != null;
 *       allow update: if isSuperAdmin();
 *       allow delete: if isSuperAdmin();
 *     }
 * 
 *     // Products/Store
 *     match /products/{productId} {
 *       allow read: if true;
 *       allow write: if isAdmin();
 *     }
 * 
 *     match /users/{userId}/cart/{itemId} {
 *       allow read, write: if request.auth != null && request.auth.uid == userId;
 *     }
 * 
 *     match /users/{userId}/orders/{orderId} {
 *       allow read, write: if request.auth != null && (request.auth.uid == userId || isAdmin());
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
