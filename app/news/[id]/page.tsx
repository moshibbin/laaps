"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import SecondHeader from "../../components/SecondHeader";

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
}

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState<News[]>([]);

  useEffect(() => {
    if (params.id) {
      fetchNews(params.id as string);
      fetchRelatedNews();
    }
  }, [params.id]);

  const fetchNews = async (id: string) => {
    try {
      const res = await fetch(`/api/news/${id}`);
      const data = await res.json();
      if (data.success && data.data.status === "published") {
        setNews(data.data);
      } else {
        router.push("/news");
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
      router.push("/news");
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedNews = async () => {
    try {
      const res = await fetch("/api/news");
      const data = await res.json();
      if (data.success) {
        const published = data.data
          .filter(
            (item: News) =>
              item.status === "published" && item.id !== params.id,
          )
          .slice(0, 3);
        setRelatedNews(published);
      }
    } catch (error) {
      console.error("Failed to fetch related news:", error);
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

  if (!news) {
    return (
      <>
        <SecondHeader />
        <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
          <h2>News article not found</h2>
          <Link href="/news" style={{ color: "#0b2e48", fontWeight: 600 }}>
            Back to News
          </Link>
        </div>
      </>
    );
  }

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      <style jsx global>{`
        .news-detail-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 3rem 2rem;
        }

        .news-detail-header {
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

        .news-detail-meta {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .news-detail-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1e293b;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .news-detail-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 16px;
          margin: 2rem 0;
        }

        .news-detail-content {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #2c3e50;
        }

        .news-detail-content h1,
        .news-detail-content h2,
        .news-detail-content h3 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #1e293b;
        }

        .news-detail-content p {
          margin-bottom: 1.5rem;
        }

        .news-detail-content ul,
        .news-detail-content ol {
          margin-left: 2rem;
          margin-bottom: 1.5rem;
        }

        .news-detail-content li {
          margin-bottom: 0.5rem;
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

        .related-news {
          margin-top: 4rem;
          padding-top: 3rem;
          border-top: 2px solid #e2ddd6;
        }

        .related-news h3 {
          font-size: 1.8rem;
          margin-bottom: 2rem;
        }

        .related-news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .related-news-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s;
          text-decoration: none;
          color: inherit;
        }

        .related-news-card:hover {
          transform: translateY(-3px);
        }

        .related-news-image {
          width: 100%;
          height: 150px;
          object-fit: cover;
        }

        .related-news-content {
          padding: 1.2rem;
        }

        .related-news-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .related-news-date {
          font-size: 0.85rem;
          color: #64748b;
        }

        @media (max-width: 768px) {
          .news-detail-title {
            font-size: 2rem;
          }

          .news-detail-image {
            height: 250px;
          }

          .news-detail-content {
            font-size: 1rem;
          }
        }
      `}</style>

      <SecondHeader />
      <section
        className="hero"
        style={{
          padding: "5rem 2.5rem",
          background: "#ffffff",
        }}
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
            {news.category && <span>{news.category}</span>}
          </span>
          <h1 style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>
            {news.title}
          </h1>
          {news.excerpt && (
            <p
              style={{
                fontSize: "1.15rem",
                color: "var(--text-medium)",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              {news.excerpt}
            </p>
          )}
        </div>
      </section>

      <div
        className="news-detail-container"
        style={{
          background: "#ffffff",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          marginTop: "2rem",
        }}
      >
        <Link href="/news" className="back-link">
          <i className="fas fa-arrow-left"></i> Back to News
        </Link>

        <article className="news-detail-header">
          {news.imageUrl && (
            <img
              src={news.imageUrl}
              alt={news.title}
              className="news-detail-image"
            />
          )}

          <div
            className="news-detail-content"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

          {news.tags && news.tags.length > 0 && (
            <div className="tags-section">
              <strong style={{ color: "#475569" }}>Tags:</strong>
              <div style={{ marginTop: "1rem" }}>
                {news.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {relatedNews.length > 0 && (
          <div className="related-news">
            <h3>Related News</h3>
            <div className="related-news-grid">
              {relatedNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="related-news-card"
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="related-news-image"
                    />
                  )}
                  <div className="related-news-content">
                    <h4 className="related-news-title">{item.title}</h4>
                    <p className="related-news-date">
                      {formatDate(item.publishDate)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
