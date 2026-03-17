"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import SecondHeader from "../../components/SecondHeader";

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

export default function PublicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [publication, setPublication] = useState<Publication | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPublications, setRelatedPublications] = useState<Publication[]>(
    [],
  );

  useEffect(() => {
    if (params.id) {
      fetchPublication(params.id as string);
      fetchRelatedPublications();
    }
  }, [params.id]);

  const fetchPublication = async (id: string) => {
    try {
      const res = await fetch(`/api/publications/${id}`);
      const data = await res.json();
      if (data.success && data.data.status === "Published") {
        setPublication(data.data);
      } else {
        router.push("/publications");
      }
    } catch (error) {
      console.error("Failed to fetch publication:", error);
      router.push("/publications");
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPublications = async () => {
    try {
      const res = await fetch("/api/publications");
      const data = await res.json();
      if (data.success) {
        const published = data.data
          .filter(
            (item: Publication) =>
              item.status === "Published" && item.id !== params.id,
          )
          .slice(0, 3);
        setRelatedPublications(published);
      }
    } catch (error) {
      console.error("Failed to fetch related publications:", error);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <>
        <SecondHeader />
        <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
          <i
            className="fas fa-spinner fa-spin"
            style={{ fontSize: "3rem", color: "#0b2e48" }}
          ></i>
          <p style={{ marginTop: "1rem" }}>Loading...</p>
        </div>
      </>
    );
  }

  if (!publication) {
    return (
      <>
        <SecondHeader />
        <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
          <h2>Publication not found</h2>
          <Link
            href="/publications"
            style={{ color: "#0b2e48", fontWeight: 600 }}
          >
            Back to Publications
          </Link>
        </div>
      </>
    );
  }

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      <style jsx global>{`
        .publication-detail-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 3rem 2rem;
        }

        .publication-detail-header {
          margin-bottom: 2rem;
        }

        .back-link {
          color: #0b2e48;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          font-weight: 500;
        }

        .back-link:hover {
          gap: 0.8rem;
        }

        .publication-detail-meta {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .publication-detail-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1e293b;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .publication-detail-authors {
          font-size: 1.2rem;
          color: #475569;
          font-style: italic;
          margin-bottom: 1rem;
        }

        .publication-detail-journal {
          font-size: 1.1rem;
          color: #0b2e48;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .publication-detail-date {
          color: #64748b;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .publication-detail-abstract {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #2c3e50;
          margin: 2rem 0;
          padding: 2rem;
          background: #f8f9fa;
          border-left: 4px solid #0b2e48;
          border-radius: 8px;
        }

        .publication-detail-abstract h3 {
          margin-bottom: 1rem;
          color: #1e293b;
        }

        .publication-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
          padding: 2rem;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .info-item {
          display: flex;
          flex-direction: column;
        }

        .info-label {
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .info-value {
          font-size: 1rem;
          color: #1e293b;
          font-weight: 500;
        }

        .download-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #0b2e48;
          color: white;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: background 0.3s;
          margin-top: 1rem;
        }

        .download-btn:hover {
          background: #1a4d6f;
        }

        .tags-section {
          margin: 3rem 0;
          padding-top: 2rem;
          border-top: 2px solid #e2ddd6;
        }

        .tag {
          display: inline-block;
          background: #f1f5f9;
          color: #475569;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          margin-right: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .related-publications {
          margin-top: 4rem;
          padding-top: 3rem;
          border-top: 2px solid #e2ddd6;
        }

        .related-publications h3 {
          font-size: 1.8rem;
          margin-bottom: 2rem;
        }

        .related-publications-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .related-publication-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s;
          text-decoration: none;
          color: inherit;
          padding: 1.5rem;
        }

        .related-publication-card:hover {
          transform: translateY(-3px);
        }

        .related-publication-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .related-publication-authors {
          font-size: 0.85rem;
          color: #64748b;
          font-style: italic;
          margin-bottom: 0.5rem;
        }

        .related-publication-date {
          font-size: 0.85rem;
          color: #64748b;
        }

        @media (max-width: 768px) {
          .publication-detail-title {
            font-size: 2rem;
          }

          .publication-info {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <SecondHeader />
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
            Publication
          </span>
          <h1 style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>
            {publication.title}
          </h1>
          {publication.authors && publication.authors.length > 0 && (
            <p
              style={{
                fontSize: "1.15rem",
                color: "var(--text-medium)",
                maxWidth: "600px",
                margin: "0 auto",
                fontStyle: "italic",
              }}
            >
              {publication.authors.join(", ")}
            </p>
          )}
        </div>
      </section>

      <div
        className="publication-detail-container"
        style={{
          background: "#ffffff",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          marginTop: "2rem",
        }}
      >
        <Link href="/publications" className="back-link">
          <i className="fas fa-arrow-left"></i> Back to Publications
        </Link>

        <article className="publication-detail-header">
          {publication.journal && (
            <p className="publication-detail-journal">{publication.journal}</p>
          )}

          <div className="publication-detail-date">
            <i className="fas fa-calendar"></i>
            {formatDate(publication.publicationDate)}
          </div>

          {publication.abstract && (
            <div className="publication-detail-abstract">
              <h3>Abstract</h3>
              <p>{publication.abstract}</p>
            </div>
          )}

          {/* PDF Viewer */}
          {publication.pdfUrl && (
            <div
              style={{
                margin: "2rem 0",
                border: "1px solid #e2ddd6",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: "#f8f9fa",
                  padding: "1rem 1.5rem",
                  borderBottom: "1px solid #e2ddd6",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3 style={{ margin: 0, fontSize: "1.1rem" }}>
                  <i
                    className="fas fa-file-pdf"
                    style={{ marginRight: "0.5rem", color: "#dc2626" }}
                  ></i>
                  Publication PDF
                </h3>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <a
                    href={publication.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "0.6rem 1.2rem",
                      background: "#3b82f6",
                      color: "white",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    <i className="fas fa-external-link-alt"></i> Open in New Tab
                  </a>
                  <a
                    href={publication.pdfUrl}
                    download
                    style={{
                      padding: "0.6rem 1.2rem",
                      background: "#0b2e48",
                      color: "white",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    <i className="fas fa-download"></i> Download PDF
                  </a>
                </div>
              </div>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  background: "#f5f5f5",
                }}
              >
                <object
                  data={publication.pdfUrl}
                  type="application/pdf"
                  style={{
                    width: "100%",
                    height: "600px",
                  }}
                >
                  {/* Fallback to Google Docs Viewer */}
                  <iframe
                    src={`https://docs.google.com/viewer?url=${encodeURIComponent(publication.pdfUrl)}&embedded=true`}
                    style={{
                      width: "100%",
                      height: "600px",
                      border: "none",
                    }}
                    title="Publication PDF"
                  />
                </object>
              </div>
            </div>
          )}

          <div className="publication-info">
            {publication.doi && (
              <div className="info-item">
                <span className="info-label">DOI</span>
                <span className="info-value">{publication.doi}</span>
              </div>
            )}
            {publication.citations !== undefined && (
              <div className="info-item">
                <span className="info-label">Citations</span>
                <span className="info-value">{publication.citations}</span>
              </div>
            )}
            {publication.publicationDate && (
              <div className="info-item">
                <span className="info-label">Publication Date</span>
                <span className="info-value">
                  {formatDate(publication.publicationDate)}
                </span>
              </div>
            )}
          </div>

          {publication.keywords && publication.keywords.length > 0 && (
            <div className="tags-section">
              <strong style={{ color: "#475569" }}>Keywords:</strong>
              <div style={{ marginTop: "1rem" }}>
                {publication.keywords.map((keyword, index) => (
                  <span key={index} className="tag">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {relatedPublications.length > 0 && (
          <div className="related-publications">
            <h3>Related Publications</h3>
            <div className="related-publications-grid">
              {relatedPublications.map((item) => (
                <Link
                  key={item.id}
                  href={`/publications/${item.id}`}
                  className="related-publication-card"
                >
                  <h4 className="related-publication-title">{item.title}</h4>
                  {item.authors && item.authors.length > 0 && (
                    <p className="related-publication-authors">
                      {item.authors.join(", ")}
                    </p>
                  )}
                  <p className="related-publication-date">
                    {formatDate(item.publicationDate)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
