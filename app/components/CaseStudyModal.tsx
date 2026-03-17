"use client";

import { FormEvent } from "react";
import TiptapEditor from "./TiptapEditor";

interface CaseStudyFormData {
  title: string;
  content: string;
  summary: string;
  client: string;
  location: string;
  sector: string;
  tags: string;
  imageUrl: string;
  beneficiaries: number;
  costSavings: string;
  timeframe: string;
  successRate: string;
  challenges: string;
  solutions: string;
  outcomes: string;
  testimonialQuote: string;
  testimonialAuthor: string;
  testimonialPosition: string;
  status: "draft" | "published";
  featured: boolean;
  publishDate: string;
}

interface CaseStudyModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (e: FormEvent) => void;
  formData: CaseStudyFormData;
  setFormData: (data: CaseStudyFormData) => void;
  editingId: string | null;
  imageUploading: boolean;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CaseStudyModal({
  show,
  onClose,
  onSubmit,
  formData,
  setFormData,
  editingId,
  imageUploading,
  onImageUpload,
}: CaseStudyModalProps) {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingId ? "Edit Case Study" : "New Case Study"}</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form onSubmit={onSubmit}>
          {/* Title */}
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              placeholder="Enter case study title"
            />
          </div>

          {/* Content (Rich Text) */}
          <div className="form-group">
            <label>Content * (rich text editor)</label>
            <TiptapEditor
              content={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              placeholder="Write the detailed case study content..."
            />
          </div>

          {/* Summary */}
          <div className="form-group">
            <label>Summary</label>
            <textarea
              value={formData.summary}
              onChange={(e) =>
                setFormData({ ...formData, summary: e.target.value })
              }
              placeholder="Brief summary of the case study..."
            />
          </div>

          {/* Client & Location Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div className="form-group">
              <label>Client/Organization</label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) =>
                  setFormData({ ...formData, client: e.target.value })
                }
                placeholder="Client name"
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="e.g., Mogadishu, Somalia"
              />
            </div>
          </div>

          {/* Sector */}
          <div className="form-group">
            <label>Sector</label>
            <select
              value={formData.sector}
              onChange={(e) =>
                setFormData({ ...formData, sector: e.target.value })
              }
            >
              <option value="">Select Sector</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Governance">Governance</option>
              <option value="Economic Development">Economic Development</option>
              <option value="Women Empowerment">Women Empowerment</option>
              <option value="Youth Development">Youth Development</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Humanitarian Response">
                Humanitarian Response
              </option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Research & Policy">Research & Policy</option>
            </select>
          </div>

          {/* Tags */}
          <div className="form-group">
            <label>Tags (comma-separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              placeholder="e.g., impact, development, somalia"
            />
          </div>

          {/* Impact Metrics Section */}
          <div style={{ marginTop: "1.5rem", marginBottom: "1rem" }}>
            <h3
              style={{
                fontSize: "1.1rem",
                marginBottom: "1rem",
                color: "#0b2e48",
              }}
            >
              <i
                className="fas fa-chart-line"
                style={{ marginRight: "0.5rem" }}
              ></i>
              Impact Metrics
            </h3>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div className="form-group">
              <label>Beneficiaries</label>
              <input
                type="number"
                value={formData.beneficiaries}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    beneficiaries: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="Number of people impacted"
              />
            </div>

            <div className="form-group">
              <label>Cost Savings</label>
              <input
                type="text"
                value={formData.costSavings}
                onChange={(e) =>
                  setFormData({ ...formData, costSavings: e.target.value })
                }
                placeholder="e.g., 30% reduction"
              />
            </div>

            <div className="form-group">
              <label>Timeframe</label>
              <input
                type="text"
                value={formData.timeframe}
                onChange={(e) =>
                  setFormData({ ...formData, timeframe: e.target.value })
                }
                placeholder="e.g., 12 months"
              />
            </div>

            <div className="form-group">
              <label>Success Rate</label>
              <input
                type="text"
                value={formData.successRate}
                onChange={(e) =>
                  setFormData({ ...formData, successRate: e.target.value })
                }
                placeholder="e.g., 95%"
              />
            </div>
          </div>

          {/* Challenges Section */}
          <div className="form-group">
            <label>Challenges</label>
            <textarea
              value={formData.challenges}
              onChange={(e) =>
                setFormData({ ...formData, challenges: e.target.value })
              }
              placeholder="Main challenges faced during the project..."
            />
          </div>

          {/* Solutions Section */}
          <div className="form-group">
            <label>Solutions</label>
            <textarea
              value={formData.solutions}
              onChange={(e) =>
                setFormData({ ...formData, solutions: e.target.value })
              }
              placeholder="Solutions implemented to overcome challenges..."
            />
          </div>

          {/* Outcomes Section */}
          <div className="form-group">
            <label>Outcomes</label>
            <textarea
              value={formData.outcomes}
              onChange={(e) =>
                setFormData({ ...formData, outcomes: e.target.value })
              }
              placeholder="Results and outcomes achieved..."
            />
          </div>

          {/* Testimonial Section */}
          <div style={{ marginTop: "1.5rem", marginBottom: "1rem" }}>
            <h3
              style={{
                fontSize: "1.1rem",
                marginBottom: "1rem",
                color: "#0b2e48",
              }}
            >
              <i
                className="fas fa-quote-right"
                style={{ marginRight: "0.5rem" }}
              ></i>
              Testimonial (Optional)
            </h3>
          </div>

          <div className="form-group">
            <label>Testimonial Quote</label>
            <textarea
              value={formData.testimonialQuote}
              onChange={(e) =>
                setFormData({ ...formData, testimonialQuote: e.target.value })
              }
              placeholder="Client or beneficiary testimonial..."
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div className="form-group">
              <label>Testimonial Author</label>
              <input
                type="text"
                value={formData.testimonialAuthor}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    testimonialAuthor: e.target.value,
                  })
                }
                placeholder="Author name"
              />
            </div>

            <div className="form-group">
              <label>Position/Title</label>
              <input
                type="text"
                value={formData.testimonialPosition}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    testimonialPosition: e.target.value,
                  })
                }
                placeholder="e.g., Director, Community Leader"
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="form-group">
            <label>Featured Image</label>
            {formData.imageUrl && (
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
                  src={formData.imageUrl}
                  alt="Case study preview"
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
                    href={formData.imageUrl}
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
              onChange={onImageUpload}
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
              {formData.imageUrl
                ? "Upload a new image to replace the current one"
                : "Upload an image file (max 5MB)"}
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
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              placeholder="https://example.com/image.jpg"
              style={{ marginTop: "0.25rem" }}
            />
          </div>

          {/* Publish Date */}
          <div className="form-group">
            <label>Publish Date</label>
            <input
              type="date"
              value={formData.publishDate}
              onChange={(e) =>
                setFormData({ ...formData, publishDate: e.target.value })
              }
            />
          </div>

          {/* Status */}
          <div className="form-group">
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "draft" | "published",
                })
              }
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* Featured Checkbox */}
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
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                style={{ width: "auto" }}
              />
              Featured Case Study
            </label>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
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
  );
}
