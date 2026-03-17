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
  Timestamp,
  limit,
  increment,
} from "firebase/firestore";
import { db } from "./config";

const COLLECTION_NAME = "caseStudies";

export interface CaseStudy {
  id?: string;
  title: string;
  content: string;
  summary?: string;
  client?: string;
  location?: string;
  sector?: string;
  tags?: string[];
  imageUrl?: string;
  impactMetrics?: {
    beneficiaries?: number;
    costSavings?: string;
    timeframe?: string;
    successRate?: string;
  };
  challenges?: string;
  solutions?: string;
  outcomes?: string;
  testimonial?: {
    quote?: string;
    author?: string;
    position?: string;
  };
  status?: "draft" | "published";
  featured?: boolean;
  publishDate?: string;
  viewCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Create a new case study
 */
export async function createCaseStudy(data: CaseStudy) {
  try {
    const caseStudyData = {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      viewCount: 0,
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), caseStudyData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error creating case study:", error);
    return { success: false, error };
  }
}

/**
 * Get a single case study by ID
 */
export async function getCaseStudy(id: string) {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        success: true,
        data: { id: docSnap.id, ...docSnap.data() } as CaseStudy,
      };
    } else {
      return { success: false, error: "Case study not found" };
    }
  } catch (error) {
    console.error("Error getting case study:", error);
    return { success: false, error };
  }
}

/**
 * Get all case studies
 */
export async function getAllCaseStudies() {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "desc"),
    );
    const querySnapshot = await getDocs(q);

    const caseStudies: CaseStudy[] = [];
    querySnapshot.forEach((doc) => {
      caseStudies.push({ id: doc.id, ...doc.data() } as CaseStudy);
    });

    return { success: true, data: caseStudies };
  } catch (error) {
    console.error("Error getting case studies:", error);
    return { success: false, error, data: [] };
  }
}

/**
 * Get case studies by status
 */
export async function getCaseStudiesByStatus(status: "draft" | "published") {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("status", "==", status),
      orderBy("createdAt", "desc"),
    );
    const querySnapshot = await getDocs(q);

    const caseStudies: CaseStudy[] = [];
    querySnapshot.forEach((doc) => {
      caseStudies.push({ id: doc.id, ...doc.data() } as CaseStudy);
    });

    return { success: true, data: caseStudies };
  } catch (error) {
    console.error("Error getting case studies by status:", error);
    return { success: false, error, data: [] };
  }
}

/**
 * Get case studies by sector
 */
export async function getCaseStudiesBySector(sector: string) {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("sector", "==", sector),
      orderBy("createdAt", "desc"),
    );
    const querySnapshot = await getDocs(q);

    const caseStudies: CaseStudy[] = [];
    querySnapshot.forEach((doc) => {
      caseStudies.push({ id: doc.id, ...doc.data() } as CaseStudy);
    });

    return { success: true, data: caseStudies };
  } catch (error) {
    console.error("Error getting case studies by sector:", error);
    return { success: false, error, data: [] };
  }
}

/**
 * Search case studies by title or content
 */
export async function searchCaseStudies(searchTerm: string) {
  try {
    const q = query(collection(db, COLLECTION_NAME));
    const querySnapshot = await getDocs(q);

    const caseStudies: CaseStudy[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as CaseStudy;
      const searchLower = searchTerm.toLowerCase();

      if (
        data.title?.toLowerCase().includes(searchLower) ||
        data.content?.toLowerCase().includes(searchLower) ||
        data.client?.toLowerCase().includes(searchLower) ||
        data.sector?.toLowerCase().includes(searchLower)
      ) {
        caseStudies.push({ id: doc.id, ...data });
      }
    });

    return { success: true, data: caseStudies };
  } catch (error) {
    console.error("Error searching case studies:", error);
    return { success: false, error, data: [] };
  }
}

/**
 * Get featured case studies
 */
export async function getFeaturedCaseStudies(limitCount: number = 3) {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("featured", "==", true),
      where("status", "==", "published"),
      orderBy("publishDate", "desc"),
      limit(limitCount),
    );
    const querySnapshot = await getDocs(q);

    const caseStudies: CaseStudy[] = [];
    querySnapshot.forEach((doc) => {
      caseStudies.push({ id: doc.id, ...doc.data() } as CaseStudy);
    });

    return { success: true, data: caseStudies };
  } catch (error) {
    console.error("Error getting featured case studies:", error);
    return { success: false, error, data: [] };
  }
}

/**
 * Update a case study
 */
export async function updateCaseStudy(id: string, data: Partial<CaseStudy>) {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating case study:", error);
    return { success: false, error };
  }
}

/**
 * Delete a case study
 */
export async function deleteCaseStudy(id: string) {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting case study:", error);
    return { success: false, error };
  }
}

/**
 * Increment view count for a case study
 */
export async function incrementCaseStudyViewCount(id: string) {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      viewCount: increment(1),
    });
    return { success: true };
  } catch (error) {
    console.error("Error incrementing view count:", error);
    return { success: false, error };
  }
}
