// Firebase Configuration
export { auth, db, storage } from "./config";

// Authentication Services
export {
  loginWithEmail,
  registerWithEmail,
  logout,
  resetPassword,
  getCurrentUser,
} from "./auth";

// Firestore Services
export {
  getDocument,
  getDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
  where,
  orderBy,
  limit,
} from "./firestore";

// Storage Services
export { uploadFile, getFileURL, deleteFile, listFiles } from "./storage";

// Authors Services
export {
  createAuthor,
  getAuthor,
  getAllAuthors,
  getAuthorsByExpertise,
  searchAuthors,
  updateAuthor,
  deleteAuthor,
  checkAuthorEmailExists,
} from "./authors";

export type { Author } from "./authors";

// Publications Services
export {
  createPublication,
  getPublication,
  getAllPublications,
  getPublicationsByType,
  getPublicationsByStatus,
  searchPublications,
  updatePublication,
  deletePublication,
  checkPublicationTitleExists,
} from "./publications";

export type { Publication } from "./publications";

// News Services
export {
  createNews,
  getNews,
  getAllNews,
  getNewsByStatus,
  getNewsByCategory,
  searchNews,
  getFeaturedNews,
  updateNews,
  deleteNews,
  incrementNewsViewCount,
} from "./news";

export type { News } from "./news";

// Case Studies Services
export {
  createCaseStudy,
  getCaseStudy,
  getAllCaseStudies,
  getCaseStudiesByStatus,
  getCaseStudiesBySector,
  searchCaseStudies,
  getFeaturedCaseStudies,
  updateCaseStudy,
  deleteCaseStudy,
  incrementCaseStudyViewCount,
} from "./case-studies";

export type { CaseStudy } from "./case-studies";
