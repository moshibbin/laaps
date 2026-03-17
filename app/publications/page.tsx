"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SecondHeader from "../components/SecondHeader";

interface Publication {
  id: string;
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
  featured?: boolean;
}

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string>("all");

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const res = await fetch("/api/publications");
      const data = await res.json();
      if (data.success) {
        // Show all publications with status "Published"
        const publishedPubs = data.data.filter(
          (item: Publication) => item.status === "Published",
        );
        setPublications(publishedPubs);
      }
    } catch (error) {
      console.error("Failed to fetch publications:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPublications =
    selectedTag === "all"
      ? publications
      : publications.filter((item) => item.keywords?.includes(selectedTag));

  const allTags = Array.from(
    new Set(publications.flatMap((item) => item.keywords || [])),
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

        /* Publications Container */
        .publications-container {
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

        /* Publications Grid */
        .publications-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .publication-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition:
            transform 0.3s,
            box-shadow 0.3s;
          cursor: pointer;
          padding: 1.5rem;
        }

        .publication-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }

        .publication-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .publication-date {
          color: #64748b;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .publication-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 0.8rem;
          color: #1e293b;
          line-height: 1.3;
        }

        .publication-authors {
          color: #475569;
          font-size: 0.9rem;
          margin-bottom: 0.8rem;
          font-style: italic;
        }

        .publication-journal {
          color: #0b2e48;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 0.8rem;
        }

        .publication-abstract {
          color: #64748b;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .publication-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .tag {
          background: #f1f5f9;
          color: #475569;
          padding: 0.3rem 0.8rem;
          border-radius: 15px;
          font-size: 0.75rem;
          font-weight: 600;
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

        /* Featured Publication */
        .featured-publication {
          background: #ffffff;
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 3rem;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
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
          .publications-grid {
            grid-template-columns: 1fr;
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
            Publications
          </span>
          <h1 style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>
            Research Publications
          </h1>
          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--text-medium)",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Explore our latest academic publications and research findings
          </p>
        </div>
      </section>

      {/* Publications Container */}
      <div
        className="publications-container"
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
            className={`filter-btn ${selectedTag === "all" ? "active" : ""}`}
            onClick={() => setSelectedTag("all")}
          >
            All Publications
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`filter-btn ${selectedTag === tag ? "active" : ""}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Featured Publication */}
        {publications.filter((item) => item.featured).length > 0 && (
          <Link
            href={`/publications/${publications.filter((item) => item.featured)[0].id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="featured-publication" style={{ cursor: "pointer" }}>
              <div className="featured-content">
                <div className="publication-meta">
                  <span className="publication-date">
                    <i className="fas fa-calendar"></i>
                    {formatDate(
                      publications.filter((item) => item.featured)[0]
                        .publicationDate,
                    )}
                  </span>
                </div>
                <h2>{publications.filter((item) => item.featured)[0].title}</h2>
                <p className="publication-authors">
                  {publications
                    .filter((item) => item.featured)[0]
                    .authors?.join(", ")}
                </p>
                <p className="publication-journal">
                  {publications.filter((item) => item.featured)[0].journal}
                </p>
                <p>
                  {publications.filter((item) => item.featured)[0].abstract}
                </p>
              </div>
            </div>
          </Link>
        )}

        {/* Loading State */}
        {loading && (
          <div className="loading">
            <i className="fas fa-spinner fa-spin"></i>
            <p style={{ marginTop: "1rem" }}>Loading publications...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredPublications.length === 0 && (
          <div className="empty-state">
            <i className="fas fa-file-alt"></i>
            <h3>No publications found</h3>
            <p>Check back later for updates</p>
          </div>
        )}

        {/* Publications Grid */}
        {!loading && filteredPublications.length > 0 && (
          <div className="publications-grid">
            {filteredPublications.map((item) => (
              <Link
                key={item.id}
                href={`/publications/${item.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="publication-card">
                  <div className="publication-meta">
                    <span className="publication-date">
                      <i className="fas fa-calendar"></i>
                      {formatDate(item.publicationDate)}
                    </span>
                  </div>
                  <h3 className="publication-title">{item.title}</h3>
                  {item.authors && item.authors.length > 0 && (
                    <p className="publication-authors">
                      {item.authors.join(", ")}
                    </p>
                  )}
                  {item.journal && (
                    <p className="publication-journal">{item.journal}</p>
                  )}
                  {item.abstract && (
                    <p className="publication-abstract">{item.abstract}</p>
                  )}
                  {item.keywords && item.keywords.length > 0 && (
                    <div className="publication-tags">
                      {item.keywords.map((keyword, index) => (
                        <span key={index} className="tag">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="read-more">
                    Read More <i className="fas fa-arrow-right"></i>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
