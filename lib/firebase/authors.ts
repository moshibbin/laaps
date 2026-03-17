import {
  addDocument,
  getDocument,
  getDocuments,
  updateDocument,
  deleteDocument,
  where,
  orderBy,
} from "./firestore";

export interface Author {
  id?: string;
  name: string;
  email: string;
  bio?: string;
  expertise?: string[];
  profileImage?: string;
  publications?: number;
  createdAt?: string;
  updatedAt?: string;
}

const COLLECTION_NAME = "authors";

/**
 * Create a new author
 */
export const createAuthor = async (
  authorData: Omit<Author, "id" | "createdAt" | "updatedAt">,
): Promise<string> => {
  try {
    const docId = await addDocument(COLLECTION_NAME, authorData);
    return docId;
  } catch (error: any) {
    throw new Error(error.message || "Failed to create author");
  }
};

/**
 * Get a single author by ID
 */
export const getAuthor = async (authorId: string): Promise<Author | null> => {
  try {
    const author = await getDocument(COLLECTION_NAME, authorId);
    return author as Author | null;
  } catch (error: any) {
    throw new Error(error.message || "Failed to get author");
  }
};

/**
 * Get all authors
 */
export const getAllAuthors = async (): Promise<Author[]> => {
  try {
    const authors = await getDocuments(COLLECTION_NAME, orderBy("name", "asc"));
    return authors as Author[];
  } catch (error: any) {
    throw new Error(error.message || "Failed to get authors");
  }
};

/**
 * Get authors by expertise
 */
export const getAuthorsByExpertise = async (
  expertise: string,
): Promise<Author[]> => {
  try {
    const authors = await getDocuments(
      COLLECTION_NAME,
      where("expertise", "array-contains", expertise),
      orderBy("name", "asc"),
    );
    return authors as Author[];
  } catch (error: any) {
    throw new Error(error.message || "Failed to get authors by expertise");
  }
};

/**
 * Search authors by name or email
 */
export const searchAuthors = async (searchTerm: string): Promise<Author[]> => {
  try {
    const allAuthors = await getAllAuthors();
    const searchLower = searchTerm.toLowerCase();

    return allAuthors.filter(
      (author) =>
        author.name.toLowerCase().includes(searchLower) ||
        author.email.toLowerCase().includes(searchLower),
    );
  } catch (error: any) {
    throw new Error(error.message || "Failed to search authors");
  }
};

/**
 * Update an existing author
 */
export const updateAuthor = async (
  authorId: string,
  authorData: Partial<Omit<Author, "id" | "createdAt" | "updatedAt">>,
): Promise<void> => {
  try {
    await updateDocument(COLLECTION_NAME, authorId, authorData);
  } catch (error: any) {
    throw new Error(error.message || "Failed to update author");
  }
};

/**
 * Delete an author
 */
export const deleteAuthor = async (authorId: string): Promise<void> => {
  try {
    await deleteDocument(COLLECTION_NAME, authorId);
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete author");
  }
};

/**
 * Check if author email already exists
 */
export const checkAuthorEmailExists = async (
  email: string,
  excludeId?: string,
): Promise<boolean> => {
  try {
    const authors = await getDocuments(
      COLLECTION_NAME,
      where("email", "==", email),
    );

    if (excludeId) {
      return authors.some((author) => author.id !== excludeId);
    }

    return authors.length > 0;
  } catch (error: any) {
    throw new Error(error.message || "Failed to check author email");
  }
};
