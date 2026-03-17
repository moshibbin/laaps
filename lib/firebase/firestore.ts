import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  DocumentData,
  QueryConstraint,
  CollectionReference,
  DocumentReference,
} from "firebase/firestore";
import { db } from "./config";

/**
 * Get a single document by ID
 */
export const getDocument = async (
  collectionName: string,
  docId: string,
): Promise<DocumentData | null> => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message || "Failed to get document");
  }
};

/**
 * Get all documents from a collection
 */
export const getDocuments = async (
  collectionName: string,
  ...queryConstraints: QueryConstraint[]
): Promise<DocumentData[]> => {
  try {
    const colRef = collection(db, collectionName);
    const q =
      queryConstraints.length > 0 ? query(colRef, ...queryConstraints) : colRef;
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error: any) {
    throw new Error(error.message || "Failed to get documents");
  }
};

/**
 * Add a new document to a collection
 */
export const addDocument = async (
  collectionName: string,
  data: DocumentData,
): Promise<string> => {
  try {
    const colRef = collection(db, collectionName);
    const docRef = await addDoc(colRef, {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error: any) {
    throw new Error(error.message || "Failed to add document");
  }
};

/**
 * Update an existing document
 */
export const updateDocument = async (
  collectionName: string,
  docId: string,
  data: Partial<DocumentData>,
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    throw new Error(error.message || "Failed to update document");
  }
};

/**
 * Delete a document
 */
export const deleteDocument = async (
  collectionName: string,
  docId: string,
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete document");
  }
};

// Re-export query constraints for convenience
export { where, orderBy, limit };
