'use client';

/**
 * @fileOverview Firebase Storage Utilities
 * Handles production file uploads with real-time progress and error handling.
 */

import { ref, uploadBytesResumable, getDownloadURL, FirebaseStorage } from 'firebase/storage';
import { errorEmitter } from './error-emitter';

export async function uploadFile(
  storage: FirebaseStorage,
  path: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) onProgress(progress);
      },
      (error) => {
        errorEmitter.emit('storage-error', error);
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
}
