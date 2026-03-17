import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";

export interface News {
  id?: string;
  title: string;
  content: string;
  excerpt?: string;
  author?: string;
  publishDate?: string;
  category?: string;
  tags?: string[];
  imageUrl?: string;
  status?: "draft" | "published";
  featured?: boolean;
  viewCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

const NEWS_COLLECTION = "news";

/**
 * Create a new news article
 */
export async function createNews(
  newsData: Omit<News, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
  try {
    const timestamp = Timestamp.now().toDate().toISOString();
    const docRef = await addDoc(collection(db, NEWS_COLLECTION), {
      ...newsData,
      createdAt: timestamp,
      updatedAt: timestamp,
      status: newsData.status || "draft",
      featured: newsData.featured || false,
      viewCount: newsData.viewCount || 0,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating news:", error);
    throw error;
  }
}

/**
 * Get a single news article by ID
 */
export async function getNews(newsId: string): Promise<News | null> {
  try {
    const docRef = doc(db, NEWS_COLLECTION, newsId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as News;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting news:", error);
    throw error;
  }
}

/**
 * Get all news articles, ordered by publish date (newest first)
 */
export async function getAllNews(): Promise<News[]> {
  try {
    const q = query(
      collection(db, NEWS_COLLECTION),
      orderBy("publishDate", "desc"),
    );
    const querySnapshot = await getDocs(q);
    const newsList: News[] = [];

    querySnapshot.forEach((doc) => {
      newsList.push({ id: doc.id, ...doc.data() } as News);
    });

    return newsList;
  } catch (error) {
    console.error("Error getting all news:", error);
    throw error;
  }
}

/**
 * Get news articles by status
 */
export async function getNewsByStatus(
  status: "draft" | "published",
): Promise<News[]> {
  try {
    const q = query(
      collection(db, NEWS_COLLECTION),
      where("status", "==", status),
      orderBy("publishDate", "desc"),
    );
    const querySnapshot = await getDocs(q);
    const newsList: News[] = [];

    querySnapshot.forEach((doc) => {
      newsList.push({ id: doc.id, ...doc.data() } as News);
    });

    return newsList;
  } catch (error) {
    console.error("Error getting news by status:", error);
    throw error;
  }
}

/**
 * Get news articles by category
 */
export async function getNewsByCategory(category: string): Promise<News[]> {
  try {
    const q = query(
      collection(db, NEWS_COLLECTION),
      where("category", "==", category),
      orderBy("publishDate", "desc"),
    );
    const querySnapshot = await getDocs(q);
    const newsList: News[] = [];

    querySnapshot.forEach((doc) => {
      newsList.push({ id: doc.id, ...doc.data() } as News);
    });

    return newsList;
  } catch (error) {
    console.error("Error getting news by category:", error);
    throw error;
  }
}

/**
 * Search news articles by title or content
 */
export async function searchNews(searchTerm: string): Promise<News[]> {
  try {
    const allNews = await getAllNews();
    const searchLower = searchTerm.toLowerCase();

    return allNews.filter(
      (news) =>
        news.title.toLowerCase().includes(searchLower) ||
        news.content?.toLowerCase().includes(searchLower) ||
        news.excerpt?.toLowerCase().includes(searchLower) ||
        news.category?.toLowerCase().includes(searchLower),
    );
  } catch (error) {
    console.error("Error searching news:", error);
    throw error;
  }
}

/**
 * Get featured news articles
 */
export async function getFeaturedNews(): Promise<News[]> {
  try {
    const q = query(
      collection(db, NEWS_COLLECTION),
      where("featured", "==", true),
      where("status", "==", "published"),
      orderBy("publishDate", "desc"),
    );
    const querySnapshot = await getDocs(q);
    const newsList: News[] = [];

    querySnapshot.forEach((doc) => {
      newsList.push({ id: doc.id, ...doc.data() } as News);
    });

    return newsList;
  } catch (error) {
    console.error("Error getting featured news:", error);
    throw error;
  }
}

/**
 * Update a news article
 */
export async function updateNews(
  newsId: string,
  newsData: Partial<News>,
): Promise<void> {
  try {
    const docRef = doc(db, NEWS_COLLECTION, newsId);
    const timestamp = Timestamp.now().toDate().toISOString();

    await updateDoc(docRef, {
      ...newsData,
      updatedAt: timestamp,
    });
  } catch (error) {
    console.error("Error updating news:", error);
    throw error;
  }
}

/**
 * Delete a news article
 */
export async function deleteNews(newsId: string): Promise<void> {
  try {
    const docRef = doc(db, NEWS_COLLECTION, newsId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting news:", error);
    throw error;
  }
}

/**
 * Increment view count for a news article
 */
export async function incrementNewsViewCount(newsId: string): Promise<void> {
  try {
    const docRef = doc(db, NEWS_COLLECTION, newsId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const currentViewCount = docSnap.data().viewCount || 0;
      await updateDoc(docRef, {
        viewCount: currentViewCount + 1,
      });
    }
  } catch (error) {
    console.error("Error incrementing view count:", error);
    throw error;
  }
}
