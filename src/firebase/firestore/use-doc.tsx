'use client';

import { useState, useEffect } from 'react';
import { DocumentReference, onSnapshot, DocumentSnapshot, DocumentData } from 'firebase/firestore';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

export function useDoc(docRef: DocumentReference | null) {
  const [data, setData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Wait for the document reference to be provided
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
        // Only emit if it's a real permission error and not just a missing document
        if (err.code === 'permission-denied') {
          const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'get',
          });
          errorEmitter.emit('permission-error', permissionError);
          setError(permissionError);
        } else {
          setError(err);
        }
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [docRef]);

  return { data, loading, error };
}
