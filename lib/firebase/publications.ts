import {
  addDocument,
  getDocument,
  getDocuments,
  updateDocument,
  deleteDocument,
  where,
  orderBy,
} from "./firestore";

export interface Publication {
  id?: string;
  title: string;
  abstract?: string;
  authors?: string[]; // Array of author IDs or names
  publicationDate?: string;
  type?: string; // e.g., "Journal Article", "Conference Paper", "Book Chapter", etc.
  journal?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  url?: string;
  keywords?: string[];
  pdfUrl?: string;
  coverImageUrl?: string;
  citations?: number;
  status?: string; // e.g., "Published", "In Press", "Submitted"
  createdAt?: string;
  updatedAt?: string;
}

const COLLECTION_NAME = "publications";

/**
 * Create a new publication
 */
export const createPublication = async (
  publicationData: Omit<Publication, "id" | "createdAt" | "updatedAt">,
): Promise<string> => {
  try {
    const docId = await addDocument(COLLECTION_NAME, publicationData);
    return docId;
  } catch (error: any) {
    throw new Error(error.message || "Failed to create publication");
  }
};

/**
 * Get a single publication by ID
 */
export const getPublication = async (
  publicationId: string,
): Promise<Publication | null> => {
  try {
    const publication = await getDocument(COLLECTION_NAME, publicationId);
    return publication as Publication | null;
  } catch (error: any) {
    throw new Error(error.message || "Failed to get publication");
  }
};

/**
 * Get all publications
 */
export const getAllPublications = async (): Promise<Publication[]> => {
  try {
    const publications = await getDocuments(
      COLLECTION_NAME,
      orderBy("publicationDate", "desc"),
    );
    return publications as Publication[];
  } catch (error: any) {
    throw new Error(error.message || "Failed to get publications");
  }
};

/**
 * Get publications by type
 */
export const getPublicationsByType = async (
  type: string,
): Promise<Publication[]> => {
  try {
    const publications = await getDocuments(
      COLLECTION_NAME,
      where("type", "==", type),
      orderBy("publicationDate", "desc"),
    );
    return publications as Publication[];
  } catch (error: any) {
    throw new Error(error.message || "Failed to get publications by type");
  }
};

/**
 * Get publications by status
 */
export const getPublicationsByStatus = async (
  status: string,
): Promise<Publication[]> => {
  try {
    const publications = await getDocuments(
      COLLECTION_NAME,
      where("status", "==", status),
      orderBy("publicationDate", "desc"),
    );
    return publications as Publication[];
  } catch (error: any) {
    throw new Error(error.message || "Failed to get publications by status");
  }
};

/**
 * Search publications by title, abstract, or keywords
 */
export const searchPublications = async (
  searchTerm: string,
): Promise<Publication[]> => {
  try {
    const allPublications = await getAllPublications();
    const searchLower = searchTerm.toLowerCase();

    return allPublications.filter(
      (publication) =>
        publication.title.toLowerCase().includes(searchLower) ||
        publication.abstract?.toLowerCase().includes(searchLower) ||
        publication.keywords?.some((keyword) =>
          keyword.toLowerCase().includes(searchLower),
        ) ||
        publication.authors?.some((author) =>
          author.toLowerCase().includes(searchLower),
        ),
    );
  } catch (error: any) {
    throw new Error(error.message || "Failed to search publications");
  }
};

/**
 * Update an existing publication
 */
export const updatePublication = async (
  publicationId: string,
  publicationData: Partial<Omit<Publication, "id" | "createdAt" | "updatedAt">>,
): Promise<void> => {
  try {
    await updateDocument(COLLECTION_NAME, publicationId, publicationData);
  } catch (error: any) {
    throw new Error(error.message || "Failed to update publication");
  }
};

/**
 * Delete a publication
 */
export const deletePublication = async (
  publicationId: string,
): Promise<void> => {
  try {
    await deleteDocument(COLLECTION_NAME, publicationId);
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete publication");
  }
};

/**
 * Check if publication title already exists
 */
export const checkPublicationTitleExists = async (
  title: string,
  excludeId?: string,
): Promise<boolean> => {
  try {
    const publications = await getDocuments(
      COLLECTION_NAME,
      where("title", "==", title),
    );

    if (excludeId) {
      return publications.some((publication) => publication.id !== excludeId);
    }

    return publications.length > 0;
  } catch (error: any) {
    throw new Error(error.message || "Failed to check publication title");
  }
};
