'use client';

import { useState, useEffect } from 'react';
import { DocumentReference, onSnapshot, DocumentSnapshot, DocumentData } from 'firebase/firestore';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';
import { useAuth } from '../provider';

export function useDoc(docRef: DocumentReference | null) {
  const [data, setData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const auth = useAuth();

  useEffect(() => {
    if (!docRef) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot: DocumentSnapshot) => {
        setData(snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null);
        setError(null);
        setLoading(false);
      },
      async (err) => {
        if (err.code === 'permission-denied') {
          const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'get',
          });

          // Graceful handling: If it's the user's own profile, don't trigger the global error overlay
          // as the app is likely about to bootstrap/create this document.
          const isOwnProfile = auth.currentUser && docRef.path.includes(`users/${auth.currentUser.uid}`);
          
          if (!isOwnProfile) {
            errorEmitter.emit('permission-error', permissionError);
          }
          
          setError(permissionError);
        } else {
          setError(err);
        }
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [docRef, auth]);

  return { data, loading, error };
}
