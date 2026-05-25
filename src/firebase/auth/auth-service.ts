'use client';

/**
 * @fileOverview Centralized Firebase Authentication and Onboarding Service.
 * Handles user synchronization, role assignment, and workspace redirection.
 */

import { 
  Auth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  User as FirebaseUser 
} from 'firebase/auth';
import { 
  Firestore, 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp, 
  collection, 
  getDocs, 
  limit, 
  query 
} from 'firebase/firestore';

export type UserRole = 'super-admin' | 'admin' | 'staff' | 'client';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
  provider: string;
  createdAt: any;
  lastLoginAt: any;
}

/**
 * Syncs the authenticated user to the /users collection and determines the role.
 */
export async function syncUserToFirestore(
  db: Firestore, 
  user: FirebaseUser, 
  provider: string
): Promise<UserProfile> {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    console.log("Existing identity detected. Updating last login for:", user.email);
    const existingProfile = userSnap.data() as UserProfile;
    await setDoc(userRef, { 
      lastLoginAt: serverTimestamp(),
      displayName: user.displayName || existingProfile.displayName,
    }, { merge: true });
    return existingProfile;
  }

  // Determine if this is the first user in the system
  console.log("Initializing new identity in the nexus...");
  const usersQuery = query(collection(db, 'users'), limit(1));
  const usersSnap = await getDocs(usersQuery);
  
  // First user is super-admin, others are clients by default
  const role: UserRole = usersSnap.empty ? 'super-admin' : 'client';
  console.log(`Assigning role: ${role} to user: ${user.email}`);

  const newProfile: UserProfile = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || (user.email ? user.email.split('@')[0] : 'Explorer'),
    role: role,
    provider: provider,
    createdAt: serverTimestamp(),
    lastLoginAt: serverTimestamp(),
  };

  await setDoc(userRef, newProfile);
  return newProfile;
}

/**
 * Routes the user to their designated workspace based on their role.
 */
export function getRedirectPath(role: UserRole): string {
  console.log("Calculating redirect destination for role:", role);
  switch (role) {
    case 'super-admin': return '/superadmin';
    case 'admin': return '/admin';
    case 'staff': return '/staff';
    case 'client': return '/dashboard';
    default: return '/dashboard';
  }
}

/**
 * Handles Google Sign-In and Onboarding
 */
export async function handleGoogleSignIn(auth: Auth, db: Firestore) {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const profile = await syncUserToFirestore(db, result.user, 'google.com');
  const path = getRedirectPath(profile.role);
  window.location.href = path;
}
