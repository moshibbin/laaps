"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TiptapEditor from "../../components/TiptapEditor";
import CaseStudyModal from "../../components/CaseStudyModal";

interface Research {
  id: string;
  title: string;
  authors: string;
  abstract: string;
  date: string;
  category: string;
  pdfUrl?: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

interface Author {
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

interface Publication {
  id?: string;
  title: string;
  abstract?: string;
  authors?: string[];
  publicationDate?: string;
  type?: string;
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
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface News {
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

interface CaseStudy {
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

export default function AdminDashboard() {
  const [research, setResearch] = useState<Research[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorsLoading, setAuthorsLoading] = useState(false);
  const [publicationsLoading, setPublicationsLoading] = useState(false);
  const [newsLoading, setNewsLoading] = useState(false);
  const [caseStudiesLoading, setCaseStudiesLoading] = useState(false);
  const [pdfUploading, setPdfUploading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState("");
  const [activeTab, setActiveTab] = useState<
    | "dashboard"
    | "publications"
    | "authors"
    | "news"
    | "case-studies"
    | "analytics"
    | "settings"
  >("dashboard");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingAuthorId, setEditingAuthorId] = useState<string | null>(null);
  const [editingPublicationId, setEditingPublicationId] = useState<
    string | null
  >(null);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [editingCaseStudyId, setEditingCaseStudyId] = useState<string | null>(
    null,
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const [showPublicationModal, setShowPublicationModal] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [showCaseStudyModal, setShowCaseStudyModal] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    abstract: "",
    date: "",
    category: "",
    pdfUrl: "",
    status: "draft" as "draft" | "published",
  });

  const [authorFormData, setAuthorFormData] = useState({
    name: "",
    email: "",
    bio: "",
    expertise: "",
    profileImage: "",
    publications: 0,
  });

  const [publicationFormData, setPublicationFormData] = useState({
    title: "",
    abstract: "",
    authors: "",
    publicationDate: "",
    type: "Journal Article",
    journal: "",
    volume: "",
    issue: "",
    pages: "",
    doi: "",
    url: "",
    keywords: "",
    pdfUrl: "",
    coverImageUrl: "",
    citations: 0,
    status: "Published",
  });

  const [newsFormData, setNewsFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    author: "",
    publishDate: "",
    category: "",
    tags: "",
    imageUrl: "",
    status: "draft" as "draft" | "published",
    featured: false,
    viewCount: 0,
  });

  const [caseStudyFormData, setCaseStudyFormData] = useState({
    title: "",
    content: "",
    summary: "",
    client: "",
    location: "",
    sector: "",
    tags: "",
    imageUrl: "",
    beneficiaries: 0,
    costSavings: "",
    timeframe: "",
    successRate: "",
    challenges: "",
    solutions: "",
    outcomes: "",
    testimonialQuote: "",
    testimonialAuthor: "",
    testimonialPosition: "",
    status: "draft" as "draft" | "published",
    featured: false,
    publishDate: "",
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    if (!isAuthenticated) {
      router.push("/admin/login");
      return;
    }
    fetchResearch();
    fetchAuthors();
    fetchPublications();
    fetchNews();
    fetchCaseStudies();
  }, [router]);

  useEffect(() => {
    if (activeTab === "authors") {
      fetchAuthors();
    } else if (activeTab === "publications") {
      fetchPublications();
    } else if (activeTab === "news") {
      fetchNews();
    } else if (activeTab === "case-studies") {
      fetchCaseStudies();
    }
  }, [activeTab]);

  const fetchResearch = async () => {
    try {
      const res = await fetch("/api/research");
      const data = await res.json();
      setResearch(data);
    } catch (error) {
      console.error("Failed to fetch research:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    router.push("/admin/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await fetch("/api/research", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...formData }),
        });
      } else {
        await fetch("/api/research", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      resetForm();
      fetchResearch();
      setShowAddModal(false);
    } catch (error) {
      console.error("Failed to save research:", error);
    }
  };

  const handleEdit = (item: Research) => {
    setFormData({
      title: item.title,
      authors: item.authors,
      abstract: item.abstract,
      date: item.date,
      category: item.category,
      pdfUrl: item.pdfUrl || "",
      status: item.status,
    });
    setEditingId(item.id);
    setShowAddModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this research?")) return;

    try {
      await fetch(`/api/research?id=${id}`, { method: "DELETE" });
      fetchResearch();
    } catch (error) {
      console.error("Failed to delete research:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      authors: "",
      abstract: "",
      date: "",
      category: "",
      pdfUrl: "",
      status: "draft",
    });
    setEditingId(null);
  };

  // Authors CRUD Functions
  const fetchAuthors = async () => {
    try {
      setAuthorsLoading(true);
      const res = await fetch("/api/authors");
      const data = await res.json();
      if (data.success) {
        setAuthors(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch authors:", error);
    } finally {
      setAuthorsLoading(false);
    }
  };

  const handleAuthorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        name: authorFormData.name,
        email: authorFormData.email,
        bio: authorFormData.bio,
        expertise: authorFormData.expertise
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== ""),
        profileImage: authorFormData.profileImage,
        publications: Number(authorFormData.publications),
      };

      const url = editingAuthorId
        ? `/api/authors/${editingAuthorId}`
        : "/api/authors";
      const method = editingAuthorId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        resetAuthorForm();
        fetchAuthors();
        setShowAuthorModal(false);
      } else {
        alert(data.error || "Operation failed");
      }
    } catch (error) {
      console.error("Failed to save author:", error);
      alert("Failed to save author");
    }
  };

  const handleAuthorEdit = (author: Author) => {
    setAuthorFormData({
      name: author.name,
      email: author.email,
      bio: author.bio || "",
      expertise: author.expertise?.join(", ") || "",
      profileImage: author.profileImage || "",
      publications: author.publications || 0,
    });
    setEditingAuthorId(author.id || null);
    setShowAuthorModal(true);
  };

  const handleAuthorDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this author?")) return;

    try {
      const response = await fetch(`/api/authors/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        fetchAuthors();
      } else {
        alert(data.error || "Failed to delete author");
      }
    } catch (error) {
      console.error("Failed to delete author:", error);
      alert("Failed to delete author");
    }
  };

  const resetAuthorForm = () => {
    setAuthorFormData({
      name: "",
      email: "",
      bio: "",
      expertise: "",
      profileImage: "",
      publications: 0,
    });
    setEditingAuthorId(null);
  };

  // Publications CRUD Functions
  const fetchPublications = async () => {
    try {
      setPublicationsLoading(true);
      const res = await fetch("/api/publications");
      const data = await res.json();
      if (data.success) {
        setPublications(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch publications:", error);
    } finally {
      setPublicationsLoading(false);
    }
  };

  const handlePublicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        title: publicationFormData.title,
        abstract: publicationFormData.abstract,
        authors: publicationFormData.authors
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== ""),
        publicationDate: publicationFormData.publicationDate,
        type: publicationFormData.type,
        journal: publicationFormData.journal,
        volume: publicationFormData.volume,
        issue: publicationFormData.issue,
        pages: publicationFormData.pages,
        doi: publicationFormData.doi,
        url: publicationFormData.url,
        keywords: publicationFormData.keywords
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== ""),
        pdfUrl: publicationFormData.pdfUrl,
        coverImageUrl: publicationFormData.coverImageUrl,
        citations: Number(publicationFormData.citations),
        status: publicationFormData.status,
      };

      const url = editingPublicationId
        ? `/api/publications/${editingPublicationId}`
        : "/api/publications";
      const method = editingPublicationId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        resetPublicationForm();
        fetchPublications();
        setShowPublicationModal(false);
      } else {
        alert(data.error || "Operation failed");
      }
    } catch (error) {
      console.error("Failed to save publication:", error);
      alert("Failed to save publication");
    }
  };

  const handlePublicationEdit = (publication: Publication) => {
    setPublicationFormData({
      title: publication.title,
      abstract: publication.abstract || "",
      authors: publication.authors?.join(", ") || "",
      publicationDate: publication.publicationDate || "",
      type: publication.type || "Journal Article",
      journal: publication.journal || "",
      volume: publication.volume || "",
      issue: publication.issue || "",
      pages: publication.pages || "",
      doi: publication.doi || "",
      url: publication.url || "",
      keywords: publication.keywords?.join(", ") || "",
      pdfUrl: publication.pdfUrl || "",
      coverImageUrl: publication.coverImageUrl || "",
      citations: publication.citations || 0,
      status: publication.status || "Published",
    });
    setEditingPublicationId(publication.id || null);
    setShowPublicationModal(true);
  };

  const handlePublicationDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this publication?")) return;

    try {
      const response = await fetch(`/api/publications/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        fetchPublications();
      } else {
        alert(data.error || "Failed to delete publication");
      }
    } catch (error) {
      console.error("Failed to delete publication:", error);
      alert("Failed to delete publication");
    }
  };

  const handleViewPdf = (pdfUrl: string) => {
    setCurrentPdfUrl(pdfUrl);
    setShowPdfViewer(true);
  };

  const resetPublicationForm = () => {
    setPublicationFormData({
      title: "",
      abstract: "",
      authors: "",
      publicationDate: "",
      type: "Journal Article",
      journal: "",
      volume: "",
      issue: "",
      pages: "",
      doi: "",
      url: "",
      keywords: "",
      pdfUrl: "",
      coverImageUrl: "",
      citations: 0,
      status: "Published",
    });
    setEditingPublicationId(null);
  };

  // News CRUD Functions
  const fetchNews = async () => {
    try {
      setNewsLoading(true);
      const res = await fetch("/api/news");
      const data = await res.json();
      if (data.success) {
        setNews(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setNewsLoading(false);
    }
  };

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        title: newsFormData.title,
        content: newsFormData.content,
        excerpt: newsFormData.excerpt,
        author: newsFormData.author,
        publishDate: newsFormData.publishDate,
        category: newsFormData.category,
        tags: newsFormData.tags
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== ""),
        imageUrl: newsFormData.imageUrl,
        status: newsFormData.status,
        featured: newsFormData.featured,
        viewCount: Number(newsFormData.viewCount),
      };

      const url = editingNewsId ? `/api/news/${editingNewsId}` : "/api/news";
      const method = editingNewsId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        resetNewsForm();
        fetchNews();
        setShowNewsModal(false);
      } else {
        alert(data.error || "Operation failed");
      }
    } catch (error) {
      console.error("Failed to save news:", error);
      alert("Failed to save news article");
    }
  };

  const handleNewsEdit = (newsItem: News) => {
    setNewsFormData({
      title: newsItem.title,
      content: newsItem.content,
      excerpt: newsItem.excerpt || "",
      author: newsItem.author || "",
      publishDate: newsItem.publishDate || "",
      category: newsItem.category || "",
      tags: newsItem.tags?.join(", ") || "",
      imageUrl: newsItem.imageUrl || "",
      status: newsItem.status || "draft",
      featured: newsItem.featured || false,
      viewCount: newsItem.viewCount || 0,
    });
    setEditingNewsId(newsItem.id || null);
    setShowNewsModal(true);
  };

  const handleNewsDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news article?")) return;

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        fetchNews();
      } else {
        alert(data.error || "Failed to delete news article");
      }
    } catch (error) {
      console.error("Failed to delete news:", error);
      alert("Failed to delete news article");
    }
  };

  const resetNewsForm = () => {
    setNewsFormData({
      title: "",
      content: "",
      excerpt: "",
      author: "",
      publishDate: "",
      category: "",
      tags: "",
      imageUrl: "",
      status: "draft",
      featured: false,
      viewCount: 0,
    });
    setEditingNewsId(null);
  };

  // Case Studies CRUD Functions
  const fetchCaseStudies = async () => {
    try {
      setCaseStudiesLoading(true);
      const res = await fetch("/api/case-studies");
      const data = await res.json();
      if (data.success) {
        setCaseStudies(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch case studies:", error);
    } finally {
      setCaseStudiesLoading(false);
    }
  };

  const handleCaseStudySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        title: caseStudyFormData.title,
        content: caseStudyFormData.content,
        summary: caseStudyFormData.summary,
        client: caseStudyFormData.client,
        location: caseStudyFormData.location,
        sector: caseStudyFormData.sector,
        tags: caseStudyFormData.tags
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== ""),
        imageUrl: caseStudyFormData.imageUrl,
        impactMetrics: {
          beneficiaries: caseStudyFormData.beneficiaries,
          costSavings: caseStudyFormData.costSavings,
          timeframe: caseStudyFormData.timeframe,
          successRate: caseStudyFormData.successRate,
        },
        challenges: caseStudyFormData.challenges,
        solutions: caseStudyFormData.solutions,
        outcomes: caseStudyFormData.outcomes,
        testimonial: {
          quote: caseStudyFormData.testimonialQuote,
          author: caseStudyFormData.testimonialAuthor,
          position: caseStudyFormData.testimonialPosition,
        },
        status: caseStudyFormData.status,
        featured: caseStudyFormData.featured,
        publishDate: caseStudyFormData.publishDate,
      };

      const url = editingCaseStudyId
        ? `/api/case-studies/${editingCaseStudyId}`
        : "/api/case-studies";
      const method = editingCaseStudyId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        resetCaseStudyForm();
        fetchCaseStudies();
        setShowCaseStudyModal(false);
      } else {
        alert(data.error || "Operation failed");
      }
    } catch (error) {
      console.error("Failed to save case study:", error);
      alert("Failed to save case study");
    }
  };

  const handleCaseStudyEdit = (caseStudy: CaseStudy) => {
    setCaseStudyFormData({
      title: caseStudy.title,
      content: caseStudy.content,
      summary: caseStudy.summary || "",
      client: caseStudy.client || "",
      location: caseStudy.location || "",
      sector: caseStudy.sector || "",
      tags: caseStudy.tags?.join(", ") || "",
      imageUrl: caseStudy.imageUrl || "",
      beneficiaries: caseStudy.impactMetrics?.beneficiaries || 0,
      costSavings: caseStudy.impactMetrics?.costSavings || "",
      timeframe: caseStudy.impactMetrics?.timeframe || "",
      successRate: caseStudy.impactMetrics?.successRate || "",
      challenges: caseStudy.challenges || "",
      solutions: caseStudy.solutions || "",
      outcomes: caseStudy.outcomes || "",
      testimonialQuote: caseStudy.testimonial?.quote || "",
      testimonialAuthor: caseStudy.testimonial?.author || "",
      testimonialPosition: caseStudy.testimonial?.position || "",
      status: caseStudy.status || "draft",
      featured: caseStudy.featured || false,
      publishDate: caseStudy.publishDate || "",
    });
    setEditingCaseStudyId(caseStudy.id || null);
    setShowCaseStudyModal(true);
  };

  const handleCaseStudyDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;

    try {
      const response = await fetch(`/api/case-studies/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        fetchCaseStudies();
      } else {
        alert(data.error || "Failed to delete case study");
      }
    } catch (error) {
      console.error("Failed to delete case study:", error);
      alert("Failed to delete case study");
    }
  };

  const resetCaseStudyForm = () => {
    setCaseStudyFormData({
      title: "",
      content: "",
      summary: "",
      client: "",
      location: "",
      sector: "",
      tags: "",
      imageUrl: "",
      beneficiaries: 0,
      costSavings: "",
      timeframe: "",
      successRate: "",
      challenges: "",
      solutions: "",
      outcomes: "",
      testimonialQuote: "",
      testimonialAuthor: "",
      testimonialPosition: "",
      status: "draft",
      featured: false,
      publishDate: "",
    });
    setEditingCaseStudyId(null);
  };

  // Handle Case Study Image upload to Cloudinary
  const handleCaseStudyImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Validate file size (e.g., max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      alert("Image file size must be less than 5MB");
      return;
    }

    try {
      setImageUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setCaseStudyFormData({
          ...caseStudyFormData,
          imageUrl: data.url,
        });
        alert("Image uploaded successfully!");
      } else {
        alert(data.error || "Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setImageUploading(false);
    }
  };

  // Handle PDF upload to Cloudinary
  const handlePdfUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    // Validate file size (e.g., max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      alert("PDF file size must be less than 10MB");
      return;
    }

    try {
      setPdfUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setPublicationFormData({
          ...publicationFormData,
          pdfUrl: data.url,
        });
        alert("PDF uploaded successfully!");
      } else {
        alert(data.error || "Failed to upload PDF");
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
      alert("Failed to upload PDF");
    } finally {
      setPdfUploading(false);
    }
  };

  // Handle Image upload to Cloudinary for News
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Validate file size (e.g., max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      alert("Image file size must be less than 5MB");
      return;
    }

    try {
      setImageUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setNewsFormData({
          ...newsFormData,
          imageUrl: data.url,
        });
        alert("Image uploaded successfully!");
      } else {
        alert(data.error || "Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setImageUploading(false);
    }
  };

  const publishedCount = research.filter(
    (r) => r.status === "published",
  ).length;
  const draftCount = research.filter((r) => r.status === "draft").length;

  // Calculate total citations from publications
  const totalCitations = publications.reduce(
    (sum, pub) => sum + (pub.citations || 0),
    0,
  );

  // Calculate monthly publications data for the chart
  const getMonthlyPublications = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May"];
    const currentYear = new Date().getFullYear();

    return months.map((month, index) => {
      const monthIndex = index; // 0-4 for Jan-May
      const count = publications.filter((pub) => {
        if (!pub.publicationDate) return false;
        const pubDate = new Date(pub.publicationDate);
        return (
          pubDate.getFullYear() === currentYear &&
          pubDate.getMonth() === monthIndex
        );
      }).length;

      return { month, count, height: Math.min(count * 30 + 40, 140) };
    });
  };

  const monthlyData = getMonthlyPublications();
  const maxMonthlyCount = Math.max(...monthlyData.map((d) => d.count), 1);

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family:
            "Inter",
            -apple-system,
            system-ui,
            sans-serif;
          background: #f4f6fb;
          display: flex;
          min-height: 100vh;
          color: #1e293b;
        }

        /* ----- SIDEBAR (admin navigation) ----- */
        .sidebar {
          width: 280px;
          background: linear-gradient(180deg, #0b1e33 0%, #0b2b3f 100%);
          color: #e0edff;
          flex-direction: column;
          box-shadow: 4px 0 20px rgba(0, 20, 40, 0.12);
          position: fixed;
          height: 100vh;
          z-index: 100;
          transition: transform 0.3s ease;
          display: flex;
        }

        .sidebar-header {
          padding: 2rem 1.5rem 1.5rem;
          font-size: 1.6rem;
          font-weight: 600;
          letter-spacing: -0.3px;
          border-bottom: 1px solid #2a4a6e;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sidebar-header i {
          color: #6ab0ff;
          font-size: 1.9rem;
        }

        .sidebar-nav {
          flex: 1;
          padding: 2rem 0 0 1.2rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 0.9rem 1.5rem;
          margin: 0.3rem 1rem 0.3rem 0;
          border-radius: 40px 0 0 40px;
          color: #cbd5e1;
          font-weight: 500;
          transition: all 0.15s;
          cursor: pointer;
        }

        .nav-item i {
          width: 24px;
          font-size: 1.25rem;
          text-align: center;
        }

        .nav-item.active {
          background: #f4f6fb;
          color: #0b2a41;
          box-shadow: -4px 4px 12px rgba(0, 0, 0, 0.05);
        }

        .nav-item:not(.active):hover {
          background: rgba(255, 255, 255, 0.06);
          color: #ffffff;
        }

        .nav-item span {
          font-size: 0.98rem;
        }

        /* footer sidebar (optional) */
        .sidebar-footer {
          padding: 2rem 1.5rem 2rem;
          font-size: 0.85rem;
          border-top: 1px solid #1f405d;
          color: #9bb5d4;
        }

        /* ----- MAIN PANEL (dashboard + publications) ----- */
        .main-panel {
          margin-left: 280px;
          min-height: 100vh;
          width: calc(100vw - 280px);
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
        }

        /* Mobile Menu Toggle */
        .mobile-menu-toggle {
          display: none;
          position: fixed;
          top: 1rem;
          left: 1rem;
          z-index: 150;
          background: #0b2e48;
          color: white;
          border: none;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .mobile-sidebar-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 99;
        }

        /* header */
        .top-header {
          background: white;
          padding: 1.2rem 2.2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #e9eef3;
          box-shadow: 0 2px 8px rgba(0, 20, 40, 0.02);
          width: 100%;
        }

        .header-title h1 {
          font-size: 1.7rem;
          font-weight: 600;
          color: #0e2c44;
          letter-spacing: -0.02em;
        }

        .header-title p {
          font-size: 0.9rem;
          color: #64748b;
          margin-top: 4px;
        }

        .admin-profile {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .notification-badge {
          background: #f1f5f9;
          padding: 8px 12px;
          border-radius: 50px;
          font-size: 1rem;
          color: #2c3e50;
          cursor: pointer;
        }

        .avatar {
          background: #1d3a5c;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 1.2rem;
          cursor: pointer;
        }

        /* dashboard content */
        .content {
          padding: 2rem 2rem 1.5rem;
          flex: 1;
          overflow-y: auto;
          width: 100%;
          max-width: 100%;
        }

        /* metric cards */
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.8rem;
          margin-bottom: 2.5rem;
          width: 100%;
        }

        .stat-card {
          background: white;
          border-radius: 28px;
          padding: 1.6rem 1.5rem;
          box-shadow: 0 12px 28px -8px rgba(0, 34, 64, 0.08);
          transition: transform 0.15s;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid rgba(211, 226, 243, 0.4);
        }

        .stat-left h3 {
          font-size: 2.1rem;
          font-weight: 700;
          color: #0b2a41;
          line-height: 1.2;
        }

        .stat-left p {
          color: #5f7d9c;
          font-weight: 500;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .stat-icon {
          background: #ecf3fa;
          width: 56px;
          height: 56px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1d4e7c;
          font-size: 1.9rem;
        }

        /* charts / mini overview (just for visual) */
        .insight-row {
          display: flex;
          gap: 2rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
          width: 100%;
        }

        .chart-card {
          flex: 2;
          min-width: 280px;
          background: white;
          border-radius: 28px;
          padding: 1.5rem 1.8rem;
          box-shadow: 0 8px 24px rgba(0, 32, 64, 0.04);
          border: 1px solid #eaf0f6;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.2rem;
        }

        .chart-header h3 {
          font-weight: 600;
          font-size: 1.2rem;
          color: #1e3a5f;
        }

        .badge-light {
          background: #d9e9ff;
          padding: 0.3rem 1rem;
          border-radius: 40px;
          font-size: 0.8rem;
          color: #13548b;
          font-weight: 600;
        }

        .mini-bars {
          display: flex;
          align-items: flex-end;
          gap: 1rem;
          height: 140px;
          margin-top: 1.2rem;
        }

        .bar-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .bar {
          width: 40px;
          background: #407bff;
          border-radius: 18px 18px 6px 6px;
          transition: 0.2s;
          position: relative;
        }

        .bar-label {
          font-size: 0.8rem;
          color: #62748c;
          font-weight: 500;
        }

        .recent-card {
          flex: 1.2;
          background: white;
          border-radius: 28px;
          padding: 1.5rem 1.8rem;
          border: 1px solid #eaf0f6;
        }

        .recent-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 0.8rem 0;
          border-bottom: 1px solid #eef3f8;
        }
        .recent-item:last-child {
          border: none;
        }
        .recent-icon {
          background: #e8f0fe;
          width: 38px;
          height: 38px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1d4e7c;
        }
        .recent-detail {
          font-weight: 500;
          font-size: 0.95rem;
        }
        .recent-date {
          font-size: 0.8rem;
          color: #6f8faf;
          margin-left: auto;
        }

        /* ----- RESEARCH PUBLICATIONS TABLE (admin section) ----- */
        .publications-section {
          background: white;
          border-radius: 30px;
          padding: 1.8rem 2rem;
          box-shadow: 0 16px 30px -10px rgba(16, 42, 80, 0.1);
          margin-top: 1.2rem;
          border: 1px solid #e3ebf5;
          width: 100%;
        }

        .section-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.8rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .section-title h2 {
          font-size: 1.6rem;
          font-weight: 600;
          color: #143450;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .add-btn {
          background: #0b2e48;
          color: white;
          border: none;
          padding: 0.7rem 1.5rem;
          border-radius: 34px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          box-shadow: 0 6px 12px rgba(0, 65, 131, 0.2);
          transition: all 0.2s;
        }

        .add-btn:hover {
          background: #0a2538;
          transform: translateY(-1px);
        }

        .table-responsive {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
        }

        th {
          text-align: left;
          padding: 1rem 0.5rem 0.8rem 0.5rem;
          color: #5f7d9c;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 0.3px;
          text-transform: uppercase;
          border-bottom: 2px solid #e2ebf6;
        }

        td {
          padding: 1rem 0.5rem;
          border-bottom: 1px solid #edf3fa;
          color: #1f3b58;
          font-weight: 500;
        }

        .pub-tag {
          background: #e4f0fa;
          color: #0f4b77;
          padding: 0.25rem 1rem;
          border-radius: 40px;
          font-size: 0.8rem;
          font-weight: 600;
          display: inline-block;
        }

        .status-badge {
          background: #c3e2cf;
          color: #135f33;
          font-weight: 600;
          padding: 0.25rem 0.9rem;
          border-radius: 40px;
          font-size: 0.75rem;
        }

        .status-badge.draft {
          background: #ffd9b3;
          color: #8b4513;
        }

        .action-icons i {
          margin: 0 6px;
          color: #7f9cbb;
          transition: 0.1s;
          cursor: pointer;
        }

        .action-icons i:hover {
          color: #1d4e7c;
        }

        /* footer */
        .footer-note {
          text-align: right;
          font-size: 0.8rem;
          color: #8aa4c0;
          margin-top: 1.4rem;
          padding-top: 0.5rem;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
        }

        .modal-content {
          background: white;
          border-radius: 24px;
          padding: 2rem;
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #e9eef3;
        }

        .modal-header h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #0e2c44;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #64748b;
          cursor: pointer;
          padding: 0.5rem;
          line-height: 1;
        }

        .close-btn:hover {
          color: #1e293b;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #1e293b;
          font-size: 0.9rem;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          font-size: 0.95rem;
          transition: all 0.2s;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #0b2e48;
          box-shadow: 0 0 0 3px rgba(11, 46, 72, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e9eef3;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary {
          background: #0b2e48;
          color: white;
        }

        .btn-primary:hover {
          background: #0a2538;
          transform: translateY(-1px);
        }

        .btn-secondary {
          background: #e9eef3;
          color: #64748b;
        }

        .btn-secondary:hover {
          background: #cbd5e1;
        }

        @media (max-width: 1200px) {
          .dashboard-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .mobile-menu-toggle {
            display: flex;
          }

          .sidebar {
            transform: translateX(-100%);
          }

          .sidebar.mobile-open {
            transform: translateX(0);
          }

          .mobile-sidebar-overlay.show {
            display: block;
          }

          .main-panel {
            margin-left: 0;
            width: 100%;
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .top-header {
            padding-left: 5rem;
          }

          .content {
            padding: 1rem;
          }

          .section-title h2 {
            font-size: 1.3rem;
          }
        }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Mobile Menu Toggle Button */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setShowMobileSidebar(!showMobileSidebar)}
        >
          <i className={`fas fa-${showMobileSidebar ? "times" : "bars"}`}></i>
        </button>

        {/* Mobile Sidebar Overlay */}
        <div
          className={`mobile-sidebar-overlay ${showMobileSidebar ? "show" : ""}`}
          onClick={() => setShowMobileSidebar(false)}
        ></div>

        {/* SIDEBAR (admin) */}
        <div className={`sidebar ${showMobileSidebar ? "mobile-open" : ""}`}>
          <div className="sidebar-header">
            <img
              src="/logo.png"
              alt="LAAPS Logo"
              style={{ height: "50px", width: "auto" }}
            />
            <span>
              Admin<span style={{ fontWeight: 300 }}>Panel</span>
            </span>
          </div>
          <div className="sidebar-nav">
            <div
              className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("dashboard");
                setShowMobileSidebar(false);
              }}
            >
              <i className="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </div>
            <div
              className={`nav-item ${activeTab === "publications" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("publications");
                setShowMobileSidebar(false);
              }}
            >
              <i className="fas fa-file-alt"></i>
              <span>Publications</span>
            </div>
            <div
              className={`nav-item ${activeTab === "authors" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("authors");
                setShowMobileSidebar(false);
              }}
            >
              <i className="fas fa-users"></i>
              <span>Authors</span>
            </div>
            <div
              className={`nav-item ${activeTab === "news" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("news");
                setShowMobileSidebar(false);
              }}
            >
              <i className="fas fa-newspaper"></i>
              <span>News</span>
            </div>
            <div
              className={`nav-item ${activeTab === "case-studies" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("case-studies");
                setShowMobileSidebar(false);
              }}
            >
              <i className="fas fa-briefcase"></i>
              <span>Case Studies</span>
            </div>
            <div
              className={`nav-item ${activeTab === "analytics" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("analytics");
                setShowMobileSidebar(false);
              }}
            >
              <i className="fas fa-chart-line"></i>
              <span>Analytics</span>
            </div>
            <div
              className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("settings");
                setShowMobileSidebar(false);
              }}
            >
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </div>
          </div>
          <div className="sidebar-footer">
            <i className="fas fa-database"></i> v2.41 · research core
          </div>
        </div>

        {/* MAIN PANEL (dashboard + research publications) */}
        <div className="main-panel">
          <div className="top-header">
            <div className="header-title">
              <h1>Research publications</h1>
              <p>
                <i
                  className="fas fa-regular fa-calendar-alt"
                  style={{ marginRight: "6px" }}
                ></i>{" "}
                last updated today,{" "}
                {new Date().toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="admin-profile">
              <div className="notification-badge">
                <i className="fas fa-bell"></i> 3
              </div>
              <div className="avatar" onClick={handleLogout} title="Logout">
                AD
              </div>
            </div>
          </div>

          <div className="content">
            {/* DASHBOARD CARDS (metrics) */}
            {activeTab === "dashboard" && (
              <>
                <div className="dashboard-grid">
                  <div className="stat-card">
                    <div className="stat-left">
                      <h3>{publications.length}</h3>
                      <p>publications</p>
                    </div>
                    <div className="stat-icon">
                      <i className="fas fa-book"></i>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-left">
                      <h3>{authors.length}</h3>
                      <p>authors</p>
                    </div>
                    <div className="stat-icon">
                      <i className="fas fa-users"></i>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-left">
                      <h3>{news.length + caseStudies.length}</h3>
                      <p>news & cases</p>
                    </div>
                    <div className="stat-icon">
                      <i className="fas fa-newspaper"></i>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-left">
                      <h3>
                        {totalCitations >= 1000
                          ? `${(totalCitations / 1000).toFixed(1)}k`
                          : totalCitations}
                      </h3>
                      <p>citations</p>
                    </div>
                    <div className="stat-icon">
                      <i className="fas fa-quote-right"></i>
                    </div>
                  </div>
                </div>

                {/* extra row: mini bar chart + recent activity (visual dashboard) */}
                <div className="insight-row">
                  <div className="chart-card">
                    <div className="chart-header">
                      <h3>
                        <i
                          className="fas fa-chart-bar"
                          style={{ marginRight: "8px", color: "#2563eb" }}
                        ></i>{" "}
                        Publications by month
                      </h3>
                      <span className="badge-light">
                        {new Date().getFullYear()}
                      </span>
                    </div>
                    <div className="mini-bars">
                      {monthlyData.map((data, index) => (
                        <div key={data.month} className="bar-container">
                          <div
                            className="bar"
                            style={{
                              height: `${data.height}px`,
                              background:
                                index === 0
                                  ? "#2563eb"
                                  : index === 1
                                    ? "#1e6f9f"
                                    : index === 2
                                      ? "#2b6a95"
                                      : index === 3
                                        ? "#0f4c81"
                                        : "#3b82b6",
                            }}
                          >
                            {data.count > 0 && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "-20px",
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                  fontSize: "0.75rem",
                                  fontWeight: "600",
                                  color: "#1e3a5f",
                                }}
                              >
                                {data.count}
                              </div>
                            )}
                          </div>
                          <span className="bar-label">{data.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="recent-card">
                    <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
                      <i className="fas fa-clock"></i> Recent activity
                    </h3>
                    {(() => {
                      // Combine all content with type and sort by creation date
                      const allContent = [
                        ...publications.map((p) => ({
                          id: p.id,
                          title: p.title,
                          type: "publication",
                          icon: "fa-book",
                          createdAt: p.createdAt,
                        })),
                        ...news.map((n) => ({
                          id: n.id,
                          title: n.title,
                          type: "news",
                          icon: "fa-newspaper",
                          createdAt: n.createdAt,
                        })),
                        ...caseStudies.map((c) => ({
                          id: c.id,
                          title: c.title,
                          type: "case study",
                          icon: "fa-briefcase",
                          createdAt: c.createdAt,
                        })),
                      ]
                        .filter((item) => item.createdAt)
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt!).getTime() -
                            new Date(a.createdAt!).getTime(),
                        )
                        .slice(0, 3);

                      if (allContent.length === 0) {
                        return (
                          <div className="recent-item">
                            <div className="recent-icon">
                              <i className="fas fa-info-circle"></i>
                            </div>
                            <div className="recent-detail">
                              No recent activity
                            </div>
                          </div>
                        );
                      }

                      return allContent.map((item) => {
                        const timeAgo = item.createdAt
                          ? (() => {
                              const hours = Math.floor(
                                (Date.now() -
                                  new Date(item.createdAt).getTime()) /
                                  1000 /
                                  60 /
                                  60,
                              );
                              if (hours < 1) return "just now";
                              if (hours < 24) return `${hours}h ago`;
                              const days = Math.floor(hours / 24);
                              if (days === 1) return "yesterday";
                              if (days < 7) return `${days}d ago`;
                              return `${Math.floor(days / 7)}w ago`;
                            })()
                          : "recently";

                        return (
                          <div key={item.id} className="recent-item">
                            <div className="recent-icon">
                              <i className={`fas ${item.icon}`}></i>
                            </div>
                            <div className="recent-detail">
                              {item.title.substring(0, 30)}
                              {item.title.length > 30 ? "..." : ""}
                              <div
                                style={{
                                  fontSize: "0.7rem",
                                  color: "#94a3b8",
                                  marginTop: "2px",
                                }}
                              >
                                {item.type}
                              </div>
                            </div>
                            <div className="recent-date">{timeAgo}</div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              </>
            )}

            {/* RESEARCH PUBLICATIONS ADMIN TABLE (core) */}
            {(activeTab === "publications" || activeTab === "dashboard") && (
              <div className="footer-note">
                <i className="fas fa-shield-alt"></i> admin access ·
                publications updated {Math.floor(Math.random() * 60)} minutes
                ago
              </div>
            )}

            {/* PUBLICATIONS MANAGEMENT SECTION */}
            {activeTab === "publications" && (
              <div className="publications-section">
                <div className="section-title">
                  <h2>
                    <i className="fas fa-book" style={{ color: "#1f5e9e" }}></i>{" "}
                    Publications Management
                  </h2>
                  <button
                    className="add-btn"
                    onClick={() => {
                      resetPublicationForm();
                      setShowPublicationModal(true);
                    }}
                  >
                    <i className="fas fa-plus"></i> New Publication
                  </button>
                </div>
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Authors</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th style={{ textAlign: "center" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {publicationsLoading ? (
                        <tr>
                          <td
                            colSpan={6}
                            style={{ textAlign: "center", padding: "2rem" }}
                          >
                            <i
                              className="fas fa-spinner fa-spin"
                              style={{ fontSize: "2rem" }}
                            ></i>
                            <p style={{ marginTop: "1rem" }}>Loading...</p>
                          </td>
                        </tr>
                      ) : publications.length === 0 ? (
                        <tr>
                          <td
                            colSpan={6}
                            style={{ textAlign: "center", padding: "2rem" }}
                          >
                            <i
                              className="fas fa-book-open"
                              style={{ fontSize: "3rem", color: "#cbd5e1" }}
                            ></i>
                            <p style={{ marginTop: "1rem", color: "#64748b" }}>
                              No publications yet
                            </p>
                          </td>
                        </tr>
                      ) : (
                        publications.map((publication) => (
                          <tr key={publication.id}>
                            <td>
                              <strong>{publication.title}</strong>
                              {publication.journal && (
                                <div
                                  style={{
                                    fontSize: "0.75rem",
                                    color: "#64748b",
                                  }}
                                >
                                  {publication.journal}
                                </div>
                              )}
                            </td>
                            <td>
                              {publication.authors &&
                              publication.authors.length > 0
                                ? publication.authors.slice(0, 2).join(", ") +
                                  (publication.authors.length > 2
                                    ? ` +${publication.authors.length - 2}`
                                    : "")
                                : "-"}
                            </td>
                            <td>
                              <span className="pub-tag">
                                {publication.type || "Journal Article"}
                              </span>
                            </td>
                            <td>
                              {publication.publicationDate
                                ? new Date(
                                    publication.publicationDate,
                                  ).getFullYear()
                                : "-"}
                            </td>
                            <td>
                              <span
                                className={`status-badge ${
                                  publication.status?.toLowerCase() !==
                                  "published"
                                    ? "draft"
                                    : ""
                                }`}
                              >
                                {publication.status || "Published"}
                              </span>
                            </td>
                            <td
                              className="action-icons"
                              style={{ textAlign: "center" }}
                            >
                              <i
                                className="fas fa-edit"
                                title="edit"
                                onClick={() =>
                                  handlePublicationEdit(publication)
                                }
                              ></i>
                              <i
                                className="fas fa-trash-alt"
                                title="delete"
                                style={{ color: "#acb8ca" }}
                                onClick={() =>
                                  publication.id &&
                                  handlePublicationDelete(publication.id)
                                }
                              ></i>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "1.5rem",
                    color: "#7f9bb9",
                  }}
                >
                  <span>
                    <i className="fas fa-chevron-left"></i> 1-
                    {publications.length} of {publications.length} publications
                  </span>
                  <span>
                    <i className="fas fa-sliders-h"></i> filter
                  </span>
                </div>
              </div>
            )}

            {/* AUTHORS MANAGEMENT SECTION */}
            {activeTab === "authors" && (
              <div className="publications-section">
                <div className="section-title">
                  <h2>
                    <i
                      className="fas fa-users"
                      style={{ color: "#1f5e9e" }}
                    ></i>{" "}
                    Authors Management
                  </h2>
                  <button
                    className="add-btn"
                    onClick={() => {
                      resetAuthorForm();
                      setShowAuthorModal(true);
                    }}
                  >
                    <i className="fas fa-plus"></i> New Author
                  </button>
                </div>
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Expertise</th>
                        <th>Publications</th>
                        <th style={{ textAlign: "center" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {authorsLoading ? (
                        <tr>
                          <td
                            colSpan={5}
                            style={{ textAlign: "center", padding: "2rem" }}
                          >
                            <i
                              className="fas fa-spinner fa-spin"
                              style={{ fontSize: "2rem" }}
                            ></i>
                            <p style={{ marginTop: "1rem" }}>Loading...</p>
                          </td>
                        </tr>
                      ) : authors.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            style={{ textAlign: "center", padding: "2rem" }}
                          >
                            <i
                              className="fas fa-user-slash"
                              style={{ fontSize: "3rem", color: "#cbd5e1" }}
                            ></i>
                            <p style={{ marginTop: "1rem", color: "#64748b" }}>
                              No authors yet
                            </p>
                          </td>
                        </tr>
                      ) : (
                        authors.map((author) => (
                          <tr key={author.id}>
                            <td>
                              <strong>{author.name}</strong>
                            </td>
                            <td>{author.email}</td>
                            <td>
                              {author.expertise &&
                              author.expertise.length > 0 ? (
                                <div
                                  style={{
                                    display: "flex",
                                    gap: "0.25rem",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  {author.expertise
                                    .slice(0, 2)
                                    .map((exp, idx) => (
                                      <span
                                        key={idx}
                                        className="pub-tag"
                                        style={{ fontSize: "0.75rem" }}
                                      >
                                        {exp}
                                      </span>
                                    ))}
                                  {author.expertise.length > 2 && (
                                    <span
                                      className="pub-tag"
                                      style={{ fontSize: "0.75rem" }}
                                    >
                                      +{author.expertise.length - 2}
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span style={{ color: "#94a3b8" }}>-</span>
                              )}
                            </td>
                            <td>{author.publications || 0}</td>
                            <td
                              className="action-icons"
                              style={{ textAlign: "center" }}
                            >
                              <i
                                className="fas fa-edit"
                                title="edit"
                                onClick={() => handleAuthorEdit(author)}
                              ></i>
                              <i
                                className="fas fa-trash-alt"
                                title="delete"
                                style={{ color: "#acb8ca" }}
                                onClick={() =>
                                  author.id && handleAuthorDelete(author.id)
                                }
                              ></i>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "1.5rem",
                    color: "#7f9bb9",
                  }}
                >
                  <span>
                    <i className="fas fa-chevron-left"></i> 1-{authors.length}{" "}
                    of {authors.length} authors
                  </span>
                  <span>
                    <i className="fas fa-sliders-h"></i> filter
                  </span>
                </div>
              </div>
            )}

            {/* NEWS MANAGEMENT SECTION */}
            {activeTab === "news" && (
              <div className="publications-section">
                <div className="section-title">
                  <h2>
                    <i
                      className="fas fa-newspaper"
                      style={{ color: "#1f5e9e" }}
                    ></i>{" "}
                    News Management
                  </h2>
                  <button
                    className="add-btn"
                    onClick={() => {
                      resetNewsForm();
                      setShowNewsModal(true);
                    }}
                  >
                    <i className="fas fa-plus"></i> New News Article
                  </button>
                </div>
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th style={{ textAlign: "center" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newsLoading ? (
                        <tr>
                          <td
                            colSpan={6}
                            style={{ textAlign: "center", padding: "2rem" }}
                          >
                            <i
                              className="fas fa-spinner fa-spin"
                              style={{ fontSize: "2rem" }}
                            ></i>
                            <p style={{ marginTop: "1rem" }}>Loading...</p>
                          </td>
                        </tr>
                      ) : news.length === 0 ? (
                        <tr>
                          <td
                            colSpan={6}
                            style={{ textAlign: "center", padding: "2rem" }}
                          >
                            <i
                              className="fas fa-newspaper"
                              style={{ fontSize: "3rem", color: "#cbd5e1" }}
                            ></i>
                            <p style={{ marginTop: "1rem", color: "#64748b" }}>
                              No news articles yet
                            </p>
                          </td>
                        </tr>
                      ) : (
                        news.map((newsItem) => (
                          <tr key={newsItem.id}>
                            <td>
                              <strong>{newsItem.title}</strong>
                              {newsItem.excerpt && (
                                <div
                                  style={{
                                    fontSize: "0.75rem",
                                    color: "#64748b",
                                  }}
                                >
                                  {newsItem.excerpt.substring(0, 50)}...
                                </div>
                              )}
                            </td>
                            <td>{newsItem.author || "-"}</td>
                            <td>
                              {newsItem.category ? (
                                <span className="pub-tag">
                                  {newsItem.category}
                                </span>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td>
                              {newsItem.publishDate
                                ? new Date(
                                    newsItem.publishDate,
                                  ).toLocaleDateString()
                                : "-"}
                            </td>
                            <td>
                              <span
                                className={`status-badge ${
                                  newsItem.status?.toLowerCase() !== "published"
                                    ? "draft"
                                    : ""
                                }`}
                              >
                                {newsItem.status || "draft"}
                              </span>
                            </td>
                            <td
                              className="action-icons"
                              style={{ textAlign: "center" }}
                            >
                              <i
                                className="fas fa-edit"
                                title="edit"
                                onClick={() => handleNewsEdit(newsItem)}
                              ></i>
                              <i
                                className="fas fa-trash-alt"
                                title="delete"
                                style={{ color: "#acb8ca" }}
                                onClick={() =>
                                  newsItem.id && handleNewsDelete(newsItem.id)
                                }
                              ></i>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "1.5rem",
                    color: "#7f9bb9",
                  }}
                >
                  <span>
                    <i className="fas fa-chevron-left"></i> 1-{news.length} of{" "}
                    {news.length} news articles
                  </span>
                  <span>
                    <i className="fas fa-sliders-h"></i> filter
                  </span>
                </div>
              </div>
            )}

            {/* CASE STUDIES MANAGEMENT SECTION */}
            {activeTab === "case-studies" && (
              <div className="publications-section">
                <div className="section-title">
                  <h2>
                    <i
                      className="fas fa-briefcase"
                      style={{ color: "#1f5e9e" }}
                    ></i>{" "}
                    Case Studies Management
                  </h2>
                  <button
                    className="add-btn"
                    onClick={() => {
                      resetCaseStudyForm();
                      setShowCaseStudyModal(true);
                    }}
                  >
                    <i className="fas fa-plus"></i> New Case Study
                  </button>
                </div>
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Client</th>
                        <th>Sector</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th style={{ textAlign: "center" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {caseStudiesLoading ? (
                        <tr>
                          <td
                            colSpan={6}
                            style={{ textAlign: "center", padding: "2rem" }}
                          >
                            <i
                              className="fas fa-spinner fa-spin"
                              style={{ fontSize: "2rem" }}
                            ></i>
                            <p style={{ marginTop: "1rem" }}>Loading...</p>
                          </td>
                        </tr>
                      ) : caseStudies.length === 0 ? (
                        <tr>
                          <td
                            colSpan={6}
                            style={{ textAlign: "center", padding: "2rem" }}
                          >
                            <i
                              className="fas fa-briefcase"
                              style={{ fontSize: "3rem", color: "#cbd5e1" }}
                            ></i>
                            <p style={{ marginTop: "1rem", color: "#64748b" }}>
                              No case studies yet
                            </p>
                          </td>
                        </tr>
                      ) : (
                        caseStudies.map((caseStudy) => (
                          <tr key={caseStudy.id}>
                            <td>
                              <strong>{caseStudy.title}</strong>
                              {caseStudy.summary && (
                                <div
                                  style={{
                                    fontSize: "0.75rem",
                                    color: "#64748b",
                                  }}
                                >
                                  {caseStudy.summary.substring(0, 50)}...
                                </div>
                              )}
                            </td>
                            <td>{caseStudy.client || "-"}</td>
                            <td>
                              {caseStudy.sector ? (
                                <span className="pub-tag">
                                  {caseStudy.sector}
                                </span>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td>{caseStudy.location || "-"}</td>
                            <td>
                              <span
                                className={`status-badge ${
                                  caseStudy.status?.toLowerCase() !==
                                  "published"
                                    ? "draft"
                                    : ""
                                }`}
                              >
                                {caseStudy.status || "draft"}
                              </span>
                            </td>
                            <td
                              className="action-icons"
                              style={{ textAlign: "center" }}
                            >
                              <i
                                className="fas fa-edit"
                                title="edit"
                                onClick={() => handleCaseStudyEdit(caseStudy)}
                              ></i>
                              <i
                                className="fas fa-trash-alt"
                                title="delete"
                                style={{ color: "#acb8ca" }}
                                onClick={() =>
                                  caseStudy.id &&
                                  handleCaseStudyDelete(caseStudy.id)
                                }
                              ></i>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "1.5rem",
                    color: "#7f9bb9",
                  }}
                >
                  <span>
                    <i className="fas fa-chevron-left"></i> 1-
                    {caseStudies.length} of {caseStudies.length} case studies
                  </span>
                  <span>
                    <i className="fas fa-sliders-h"></i> filter
                  </span>
                </div>
              </div>
            )}
            <div className="footer-note">
              <i className="fas fa-shield-alt"></i> admin access · {activeTab}
              updated {Math.floor(Math.random() * 60)} minutes ago
            </div>
          </div>
        </div>
      </div>

      {/* News Add/Edit Modal */}
      {showNewsModal && (
        <div className="modal-overlay" onClick={() => setShowNewsModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {editingNewsId ? "Edit News Article" : "New News Article"}
              </h2>
              <button
                className="close-btn"
                onClick={() => setShowNewsModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleNewsSubmit}>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={newsFormData.title}
                  onChange={(e) =>
                    setNewsFormData({
                      ...newsFormData,
                      title: e.target.value,
                    })
                  }
                  required
                  placeholder="Enter news title"
                />
              </div>
              <div className="form-group">
                <label>Content * (rich text editor)</label>
                <TiptapEditor
                  content={newsFormData.content}
                  onChange={(content) =>
                    setNewsFormData({
                      ...newsFormData,
                      content,
                    })
                  }
                  placeholder="Write your news article content here..."
                />
              </div>
              <div className="form-group">
                <label>Excerpt</label>
                <textarea
                  value={newsFormData.excerpt}
                  onChange={(e) =>
                    setNewsFormData({
                      ...newsFormData,
                      excerpt: e.target.value,
                    })
                  }
                  placeholder="Brief summary of the news article..."
                />
              </div>
              <div className="form-group">
                <label>Author</label>
                <input
                  type="text"
                  value={newsFormData.author}
                  onChange={(e) =>
                    setNewsFormData({
                      ...newsFormData,
                      author: e.target.value,
                    })
                  }
                  placeholder="Article author name"
                />
              </div>
              <div className="form-group">
                <label>Publish Date</label>
                <input
                  type="date"
                  value={newsFormData.publishDate}
                  onChange={(e) =>
                    setNewsFormData({
                      ...newsFormData,
                      publishDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={newsFormData.category}
                  onChange={(e) =>
                    setNewsFormData({
                      ...newsFormData,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="">Select Category</option>
                  <option value="Research">Research</option>
                  <option value="Events">Events</option>
                  <option value="Announcements">Announcements</option>
                  <option value="Press Release">Press Release</option>
                  <option value="General">General</option>
                </select>
              </div>
              <div className="form-group">
                <label>Tags (comma-separated)</label>
                <input
                  type="text"
                  value={newsFormData.tags}
                  onChange={(e) =>
                    setNewsFormData({
                      ...newsFormData,
                      tags: e.target.value,
                    })
                  }
                  placeholder="e.g., policy, development, somali, research"
                />
              </div>
              <div className="form-group">
                <label>Featured Image</label>
                {newsFormData.imageUrl && (
                  <div
                    style={{
                      marginBottom: "0.5rem",
                      padding: "0.75rem",
                      background: "#f0f9ff",
                      border: "1px solid #bfdbfe",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <img
                      src={newsFormData.imageUrl}
                      alt="News preview"
                      style={{
                        width: "100px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "#1e40af",
                          marginBottom: "0.25rem",
                        }}
                      >
                        <strong>Current Image:</strong>
                      </p>
                      <a
                        href={newsFormData.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#0b2e48",
                          fontSize: "0.75rem",
                          textDecoration: "underline",
                        }}
                      >
                        View Full Size
                      </a>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={imageUploading}
                  style={{
                    padding: "0.5rem",
                    cursor: imageUploading ? "not-allowed" : "pointer",
                  }}
                />
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#64748b",
                    marginTop: "0.25rem",
                  }}
                >
                  {newsFormData.imageUrl
                    ? "Upload a new image to replace the current one"
                    : "Upload an image file (max 5MB, .jpg, .png, .webp)"}
                </p>
                {imageUploading && (
                  <p
                    style={{
                      color: "#0b2e48",
                      marginTop: "0.5rem",
                      fontWeight: 600,
                    }}
                  >
                    <i
                      className="fas fa-spinner fa-spin"
                      style={{ marginRight: "0.5rem" }}
                    ></i>
                    Uploading Image...
                  </p>
                )}
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#64748b",
                    marginTop: "0.5rem",
                  }}
                >
                  Or enter image URL manually:
                </p>
                <input
                  type="url"
                  value={newsFormData.imageUrl}
                  onChange={(e) =>
                    setNewsFormData({
                      ...newsFormData,
                      imageUrl: e.target.value,
                    })
                  }
                  placeholder="https://example.com/news-image.jpg"
                  style={{ marginTop: "0.25rem" }}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={newsFormData.status}
                  onChange={(e) =>
                    setNewsFormData({
                      ...newsFormData,
                      status: e.target.value as "draft" | "published",
                    })
                  }
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="form-group">
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={newsFormData.featured}
                    onChange={(e) =>
                      setNewsFormData({
                        ...newsFormData,
                        featured: e.target.checked,
                      })
                    }
                    style={{ width: "auto" }}
                  />
                  Featured Article
                </label>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowNewsModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <i
                    className={`fas fa-${editingNewsId ? "save" : "plus"}`}
                    style={{ marginRight: "0.5rem" }}
                  ></i>
                  {editingNewsId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? "Edit Publication" : "New Publication"}</h2>
              <button
                className="close-btn"
                onClick={() => setShowAddModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  placeholder="Enter publication title"
                />
              </div>
              <div className="form-group">
                <label>Authors *</label>
                <input
                  type="text"
                  value={formData.authors}
                  onChange={(e) =>
                    setFormData({ ...formData, authors: e.target.value })
                  }
                  required
                  placeholder="e.g., M. Chen, A. Kumar"
                />
              </div>
              <div className="form-group">
                <label>Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Applied Research">Applied Research</option>
                  <option value="Policy Analysis">Policy Analysis</option>
                  <option value="Evaluation">Evaluation</option>
                  <option value="Development">Development</option>
                  <option value="Humanitarian">Humanitarian</option>
                  <option value="Governance">Governance</option>
                </select>
              </div>
              <div className="form-group">
                <label>Publication Date *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Status *</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as "draft" | "published",
                    })
                  }
                  required
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="form-group">
                <label>PDF URL</label>
                <input
                  type="url"
                  value={formData.pdfUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, pdfUrl: e.target.value })
                  }
                  placeholder="https://example.com/research.pdf"
                />
              </div>
              <div className="form-group">
                <label>Abstract *</label>
                <textarea
                  value={formData.abstract}
                  onChange={(e) =>
                    setFormData({ ...formData, abstract: e.target.value })
                  }
                  required
                  placeholder="Enter the publication abstract..."
                />
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <i
                    className={`fas fa-${editingId ? "save" : "plus"}`}
                    style={{ marginRight: "0.5rem" }}
                  ></i>
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Author Add/Edit Modal */}
      {showAuthorModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowAuthorModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingAuthorId ? "Edit Author" : "New Author"}</h2>
              <button
                className="close-btn"
                onClick={() => setShowAuthorModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleAuthorSubmit}>
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  value={authorFormData.name}
                  onChange={(e) =>
                    setAuthorFormData({
                      ...authorFormData,
                      name: e.target.value,
                    })
                  }
                  required
                  placeholder="Enter author name"
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={authorFormData.email}
                  onChange={(e) =>
                    setAuthorFormData({
                      ...authorFormData,
                      email: e.target.value,
                    })
                  }
                  required
                  placeholder="author@example.com"
                />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea
                  value={authorFormData.bio}
                  onChange={(e) =>
                    setAuthorFormData({
                      ...authorFormData,
                      bio: e.target.value,
                    })
                  }
                  placeholder="Brief author biography..."
                />
              </div>
              <div className="form-group">
                <label>Expertise (comma-separated)</label>
                <input
                  type="text"
                  value={authorFormData.expertise}
                  onChange={(e) =>
                    setAuthorFormData({
                      ...authorFormData,
                      expertise: e.target.value,
                    })
                  }
                  placeholder="e.g., Research, Data Analysis, Policy"
                />
              </div>
              <div className="form-group">
                <label>Profile Image URL</label>
                <input
                  type="url"
                  value={authorFormData.profileImage}
                  onChange={(e) =>
                    setAuthorFormData({
                      ...authorFormData,
                      profileImage: e.target.value,
                    })
                  }
                  placeholder="https://example.com/profile.jpg"
                />
              </div>
              <div className="form-group">
                <label>Number of Publications</label>
                <input
                  type="number"
                  min="0"
                  value={authorFormData.publications}
                  onChange={(e) =>
                    setAuthorFormData({
                      ...authorFormData,
                      publications: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAuthorModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <i
                    className={`fas fa-${editingAuthorId ? "save" : "plus"}`}
                    style={{ marginRight: "0.5rem" }}
                  ></i>
                  {editingAuthorId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Publication Add/Edit Modal */}
      {showPublicationModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowPublicationModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {editingPublicationId ? "Edit Publication" : "New Publication"}
              </h2>
              <button
                className="close-btn"
                onClick={() => setShowPublicationModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handlePublicationSubmit}>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={publicationFormData.title}
                  onChange={(e) =>
                    setPublicationFormData({
                      ...publicationFormData,
                      title: e.target.value,
                    })
                  }
                  required
                  placeholder="Enter publication title"
                />
              </div>
              <div className="form-group">
                <label>Authors (comma-separated)</label>
                <input
                  type="text"
                  value={publicationFormData.authors}
                  onChange={(e) =>
                    setPublicationFormData({
                      ...publicationFormData,
                      authors: e.target.value,
                    })
                  }
                  placeholder="e.g., John Doe, Jane Smith"
                />
              </div>
              <div className="form-group">
                <label>Publication Type</label>
                <select
                  value={publicationFormData.type}
                  onChange={(e) =>
                    setPublicationFormData({
                      ...publicationFormData,
                      type: e.target.value,
                    })
                  }
                >
                  <option value="Journal Article">Journal Article</option>
                  <option value="Conference Paper">Conference Paper</option>
                  <option value="Book Chapter">Book Chapter</option>
                  <option value="Book">Book</option>
                  <option value="Report">Report</option>
                  <option value="Thesis">Thesis</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Journal/Publication Venue</label>
                <input
                  type="text"
                  value={publicationFormData.journal}
                  onChange={(e) =>
                    setPublicationFormData({
                      ...publicationFormData,
                      journal: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Publication Date</label>
                <input
                  type="date"
                  value={publicationFormData.publicationDate}
                  onChange={(e) =>
                    setPublicationFormData({
                      ...publicationFormData,
                      publicationDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>DOI</label>
                <input
                  type="text"
                  value={publicationFormData.doi}
                  onChange={(e) =>
                    setPublicationFormData({
                      ...publicationFormData,
                      doi: e.target.value,
                    })
                  }
                  placeholder="e.g., 10.1234/example"
                />
              </div>
              <div className="form-group">
                <label>URL</label>
                <input
                  type="url"
                  value={publicationFormData.url}
                  onChange={(e) =>
                    setPublicationFormData({
                      ...publicationFormData,
                      url: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>PDF File</label>
                {publicationFormData.pdfUrl && (
                  <div
                    style={{
                      marginBottom: "0.5rem",
                      padding: "0.75rem",
                      background: "#f0f9ff",
                      border: "1px solid #bfdbfe",
                      borderRadius: "8px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "#1e40af",
                        marginBottom: "0.25rem",
                      }}
                    >
                      <strong>Current PDF:</strong>
                    </p>
                    <a
                      href={publicationFormData.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#0b2e48",
                        fontSize: "0.85rem",
                        textDecoration: "underline",
                      }}
                    >
                      {publicationFormData.pdfUrl
                        .split("/")
                        .pop()
                        ?.substring(0, 50) || "View PDF"}
                    </a>
                  </div>
                )}
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfUpload}
                  disabled={pdfUploading}
                  style={{
                    padding: "0.5rem",
                    cursor: pdfUploading ? "not-allowed" : "pointer",
                  }}
                />
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#64748b",
                    marginTop: "0.25rem",
                  }}
                >
                  {publicationFormData.pdfUrl
                    ? "Upload a new file to replace the current PDF"
                    : "Upload a PDF file (max 10MB)"}
                </p>
                {pdfUploading && (
                  <p
                    style={{
                      color: "#0b2e48",
                      marginTop: "0.5rem",
                      fontWeight: 600,
                    }}
                  >
                    <i
                      className="fas fa-spinner fa-spin"
                      style={{ marginRight: "0.5rem" }}
                    ></i>
                    Uploading PDF...
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={publicationFormData.status}
                  onChange={(e) =>
                    setPublicationFormData({
                      ...publicationFormData,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="Published">Published</option>
                  <option value="In Press">In Press</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <div className="form-group">
                <label>Abstract</label>
                <textarea
                  value={publicationFormData.abstract}
                  onChange={(e) =>
                    setPublicationFormData({
                      ...publicationFormData,
                      abstract: e.target.value,
                    })
                  }
                  placeholder="Enter the publication abstract..."
                />
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowPublicationModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <i
                    className={`fas fa-${editingPublicationId ? "save" : "plus"}`}
                    style={{ marginRight: "0.5rem" }}
                  ></i>
                  {editingPublicationId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Case Study Add/Edit Modal */}
      <CaseStudyModal
        show={showCaseStudyModal}
        onClose={() => setShowCaseStudyModal(false)}
        onSubmit={handleCaseStudySubmit}
        formData={caseStudyFormData}
        setFormData={setCaseStudyFormData}
        editingId={editingCaseStudyId}
        imageUploading={imageUploading}
        onImageUpload={handleCaseStudyImageUpload}
      />
    </>
  );
}
