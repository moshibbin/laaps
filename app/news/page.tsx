"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SecondHeader from "../components/SecondHeader";

interface News {
  id: string;
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

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/news");
      const data = await res.json();
      if (data.success) {
        // Only show published news
        const publishedNews = data.data.filter(
          (item: News) => item.status === "published",
        );
        setNews(publishedNews);
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNews =
    selectedCategory === "all"
      ? news
      : news.filter((item) => item.category === selectedCategory);

  const categories = Array.from(
    new Set(news.map((item) => item.category).filter(Boolean)),
  );

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
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
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
          line-height: 1.6;
          color: #2c3e50;
        }

        /* Header */
        .header {
          background: linear-gradient(135deg, #0b2e48 0%, #1a4d6f 100%);
          color: white;
          padding: 0.8rem 0;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 1rem;
          text-decoration: none;
          color: white;
        }

        .logo img {
          height: 50px;
          width: auto;
        }

        .logo-text h1 {
          font-size: 1.3rem;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-links a {
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.3s;
        }

        .nav-links a:hover {
          color: white;
        }

        /* Hero Section */
        .hero-section {
          background: linear-gradient(135deg, #0b2e48 0%, #1a4d6f 100%);
          color: white;
          padding: 4rem 2rem;
          text-align: center;
        }

        .hero-section h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .hero-section p {
          font-size: 1.2rem;
          opacity: 0.9;
          max-width: 800px;
          margin: 0 auto;
        }

        /* News Container */
        .news-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 3rem 2rem;
        }

        /* Filter Section */
        .filter-section {
          margin-bottom: 2rem;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .filter-btn {
          padding: 0.6rem 1.5rem;
          border: 2px solid #0b2e48;
          background: white;
          color: #0b2e48;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .filter-btn:hover,
        .filter-btn.active {
          background: #0b2e48;
          color: white;
        }

        /* News Grid */
        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .news-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition:
            transform 0.3s,
            box-shadow 0.3s;
          cursor: pointer;
        }

        .news-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }

        .news-image {
          width: 100%;
          height: 220px;
          object-fit: cover;
          background: linear-gradient(135deg, #e0e7f1 0%, #c5d5e4 100%);
        }

        .news-content {
          padding: 1.5rem;
        }

        .news-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .news-category {
          background: #0b2e48;
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .news-date {
          color: #64748b;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .news-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 0.8rem;
          color: #1e293b;
          line-height: 1.3;
        }

        .news-excerpt {
          color: #64748b;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .news-author {
          color: #475569;
          font-size: 0.85rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .read-more {
          color: #0b2e48;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
          text-decoration: none;
        }

        .read-more:hover {
          gap: 0.8rem;
        }

        /* Loading */
        .loading {
          text-align: center;
          padding: 4rem 2rem;
        }

        .loading i {
          font-size: 3rem;
          color: #0b2e48;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: #64748b;
        }

        .empty-state i {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.3;
        }

        /* Featured News */
        .featured-news {
          background: #ffffff;
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 3rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: center;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
        }

        .featured-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 16px;
        }

        .featured-content h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #1e293b;
        }

        .featured-content p {
          font-size: 1.1rem;
          color: #475569;
          margin-bottom: 1.5rem;
          line-height: 1.7;
        }

        @media (max-width: 768px) {
          .hero-section h1 {
            font-size: 2rem;
          }

          .news-grid {
            grid-template-columns: 1fr;
          }

          .featured-news {
            grid-template-columns: 1fr;
          }

          .nav-links {
            display: none;
          }
        }
      `}</style>

      {/* Header */}
      <SecondHeader />
      {/* Hero Section */}
      <section
        className="hero"
        style={{ padding: "5rem 2.5rem", background: "#ffffff" }}
      >
        <div
          className="container"
          style={{ maxWidth: "800px", textAlign: "center" }}
        >
          <span
            className="badge-pill"
            style={{
              background:
                "linear-gradient(135deg, var(--primary-deep), var(--secondary-earth))",
              color: "white",
              padding: "0.5rem 1.2rem",
              borderRadius: "30px",
              fontSize: "0.85rem",
              fontWeight: 500,
              letterSpacing: "0.5px",
              display: "inline-block",
              marginBottom: "1.5rem",
            }}
          >
            News & Updates
          </span>
          <h1 style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>
            Stay Informed with LAAPS Institute
          </h1>
          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--text-medium)",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Stay informed about our latest research findings, events, and
            announcements
          </p>
        </div>
      </section>

      {/* News Container */}
      <div
        className="news-container"
        style={{
          background: "#ffffff",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          margin: "2rem auto",
          maxWidth: "1400px",
        }}
      >
        {/* Filter Section */}
        <div className="filter-section">
          <button
            className={`filter-btn ${selectedCategory === "all" ? "active" : ""}`}
            onClick={() => setSelectedCategory("all")}
          >
            All News
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category as string)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured News */}
        {news.filter((item) => item.featured).length > 0 && (
          <Link
            href={`/news/${news.filter((item) => item.featured)[0].id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="featured-news" style={{ cursor: "pointer" }}>
              <img
                src={
                  news.filter((item) => item.featured)[0].imageUrl ||
                  "/hero.jpg"
                }
                alt="Featured"
                className="featured-image"
              />
              <div className="featured-content">
                <div className="news-meta">
                  <span className="news-category">
                    {news.filter((item) => item.featured)[0].category ||
                      "Featured"}
                  </span>
                  <span className="news-date">
                    <i className="fas fa-calendar"></i>
                    {formatDate(
                      news.filter((item) => item.featured)[0].publishDate,
                    )}
                  </span>
                </div>
                <h2>{news.filter((item) => item.featured)[0].title}</h2>
                <p>{news.filter((item) => item.featured)[0].excerpt}</p>
                {news.filter((item) => item.featured)[0].author && (
                  <div className="news-author">
                    <i className="fas fa-user"></i>
                    {news.filter((item) => item.featured)[0].author}
                  </div>
                )}
              </div>
            </div>
          </Link>
        )}

        {/* Loading State */}
        {loading && (
          <div className="loading">
            <i className="fas fa-spinner fa-spin"></i>
            <p style={{ marginTop: "1rem" }}>Loading news...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredNews.length === 0 && (
          <div className="empty-state">
            <i className="fas fa-newspaper"></i>
            <h3>No news articles found</h3>
            <p>Check back later for updates</p>
          </div>
        )}

        {/* News Grid */}
        {!loading && filteredNews.length > 0 && (
          <div className="news-grid">
            {filteredNews.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="news-card">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="news-image"
                    />
                  )}
                  <div className="news-content">
                    <div className="news-meta">
                      {item.category && (
                        <span className="news-category">{item.category}</span>
                      )}
                      <span className="news-date">
                        <i className="fas fa-calendar"></i>
                        {formatDate(item.publishDate)}
                      </span>
                    </div>
                    <h3 className="news-title">{item.title}</h3>
                    {item.excerpt && (
                      <p className="news-excerpt">{item.excerpt}</p>
                    )}
                    {item.author && (
                      <div className="news-author">
                        <i className="fas fa-user"></i>
                        {item.author}
                      </div>
                    )}
                    <span className="read-more">
                      Read More <i className="fas fa-arrow-right"></i>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
