'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { useToast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handlePermissionError = (error: any) => {
      // In a real development environment, this would trigger the Next.js error overlay.
      // For now, we'll surface it via a toast for better visibility.
      toast({
        variant: "destructive",
        title: "Security Rule Denied",
        description: "The request was denied by Firestore Security Rules. Check console for details.",
      });
      console.error(error);
    };

    errorEmitter.on('permission-error', handlePermissionError);
    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, [toast]);

  return null;
}
