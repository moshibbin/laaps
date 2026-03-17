import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
  StorageReference,
  UploadTaskSnapshot,
} from "firebase/storage";
import { storage } from "./config";

/**
 * Upload a file to Firebase Storage
 */
export const uploadFile = async (
  filePath: string,
  file: File,
  onProgress?: (progress: number) => void,
): Promise<string> => {
  try {
    const storageRef = ref(storage, filePath);

    if (onProgress) {
      // Use resumable upload with progress tracking
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot: UploadTaskSnapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress(progress);
          },
          (error) => {
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          },
        );
      });
    } else {
      // Simple upload without progress tracking
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    }
  } catch (error: any) {
    throw new Error(error.message || "Failed to upload file");
  }
};

/**
 * Get download URL for a file
 */
export const getFileURL = async (filePath: string): Promise<string> => {
  try {
    const storageRef = ref(storage, filePath);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error: any) {
    throw new Error(error.message || "Failed to get file URL");
  }
};

/**
 * Delete a file from Firebase Storage
 */
export const deleteFile = async (filePath: string): Promise<void> => {
  try {
    const storageRef = ref(storage, filePath);
    await deleteObject(storageRef);
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete file");
  }
};

/**
 * List all files in a directory
 */
export const listFiles = async (dirPath: string): Promise<string[]> => {
  try {
    const storageRef = ref(storage, dirPath);
    const result = await listAll(storageRef);

    const urls = await Promise.all(
      result.items.map((itemRef: StorageReference) => getDownloadURL(itemRef)),
    );

    return urls;
  } catch (error: any) {
    throw new Error(error.message || "Failed to list files");
  }
};
