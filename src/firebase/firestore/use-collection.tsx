'use client';

import { useState, useEffect } from 'react';
import { Query, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

export function useCollection(query: Query | null) {
  const [data, setData] = useState<DocumentData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = onSnapshot(
      query,
      (snapshot: QuerySnapshot) => {
        const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setData(docs);
        setError(null);
        setLoading(false);
      },
      async (err) => {
        if (err.code === 'permission-denied') {
          // Extract path for context
          const path = (query as any)._query?.path?.segments?.join('/') || 'collection-query';
          
          const permissionError = new FirestorePermissionError({
            path: path,
            operation: 'list',
          });
          
          // We return empty data and the error to the component
          // The component can decide whether to show an error overlay or just empty state
          setData([]);
          setError(permissionError);
          
          // Only emit global error if it's NOT a list operation on a dashboard
          // Dashboard components should handle permission errors locally to avoid the fatal overlay
          const isDashboardQuery = path.includes('tasks') || path.includes('jobRequests') || path.includes('users');
          if (!isDashboardQuery) {
            errorEmitter.emit('permission-error', permissionError);
          }
        } else {
          setError(err);
        }
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [query]);

  return { data, loading, error };
}
