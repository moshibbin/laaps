"use client";

import { useState, useEffect } from "react";
import { Publication } from "@/lib/firebase/publications";

export default function PublicationsManagement() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPublication, setEditingPublication] =
    useState<Publication | null>(null);
  const [formData, setFormData] = useState({
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
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Fetch publications
  const fetchPublications = async (search = "") => {
    try {
      setLoading(true);
      const url = search
        ? `/api/publications?search=${encodeURIComponent(search)}`
        : "/api/publications";
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setPublications(data.data);
      } else {
        setError(data.error || "Failed to fetch publications");
      }
    } catch (err) {
      setError("Failed to fetch publications");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPublications(searchTerm);
  };

  // Open modal for create/edit
  const openModal = (publication?: Publication) => {
    if (publication) {
      setEditingPublication(publication);
      setFormData({
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
    } else {
      setEditingPublication(null);
      setFormData({
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
    }
    setIsModalOpen(true);
    setError("");
    setSuccessMessage("");
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPublication(null);
    setError("");
    setSuccessMessage("");
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const payload = {
        title: formData.title,
        abstract: formData.abstract,
        authors: formData.authors
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== ""),
        publicationDate: formData.publicationDate,
        type: formData.type,
        journal: formData.journal,
        volume: formData.volume,
        issue: formData.issue,
        pages: formData.pages,
        doi: formData.doi,
        url: formData.url,
        keywords: formData.keywords
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== ""),
        pdfUrl: formData.pdfUrl,
        coverImageUrl: formData.coverImageUrl,
        citations: Number(formData.citations),
        status: formData.status,
      };

      const url = editingPublication
        ? `/api/publications/${editingPublication.id}`
        : "/api/publications";
      const method = editingPublication ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(
          editingPublication
            ? "Publication updated successfully"
            : "Publication created successfully",
        );
        fetchPublications(searchTerm);
        setTimeout(() => closeModal(), 1500);
      } else {
        setError(data.error || "Operation failed");
      }
    } catch (err) {
      setError("An error occurred");
      console.error(err);
    }
  };

  // Delete publication
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this publication?")) {
      return;
    }

    try {
      const response = await fetch(`/api/publications/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage("Publication deleted successfully");
        fetchPublications(searchTerm);
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setError(data.error || "Failed to delete publication");
      }
    } catch (err) {
      setError("Failed to delete publication");
      console.error(err);
    }
  };

  // Handle PDF upload
  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is PDF
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return;
    }

    try {
      setUploadingPdf(true);
      setError("");

      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await response.json();

      if (data.success) {
        setFormData({ ...formData, pdfUrl: data.url });
        setSuccessMessage("PDF uploaded successfully");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setError(data.error || "Failed to upload PDF");
      }
    } catch (err) {
      setError("Failed to upload PDF");
      console.error(err);
    } finally {
      setUploadingPdf(false);
    }
  };

  // Handle Cover Image Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    try {
      setUploadingImage(true);
      setError("");

      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await response.json();

      if (data.success) {
        setFormData({ ...formData, coverImageUrl: data.url });
        setSuccessMessage("Image uploaded successfully");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setError(data.error || "Failed to upload image");
      }
    } catch (err) {
      setError("Failed to upload image");
      console.error(err);
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Publications Management
          </h1>
          <p className="text-gray-600">
            Manage research publications and papers
          </p>
        </div>

        {/* Messages */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMessage}
          </div>
        )}
        {error && !isModalOpen && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
          <form onSubmit={handleSearch} className="flex gap-2 flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search publications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Search
            </button>
          </form>
          <button
            onClick={() => openModal()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add New Publication
          </button>
        </div>

        {/* Publications List */}
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading publications...</p>
          </div>
        ) : publications.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">No publications found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {publications.map((publication) => (
              <div
                key={publication.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Cover Image */}
                  {publication.coverImageUrl && (
                    <div className="flex-shrink-0">
                      <img
                        src={publication.coverImageUrl}
                        alt={publication.title}
                        className="w-32 h-40 object-cover rounded"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {publication.title}
                      </h3>
                      <span
                        className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${
                          publication.status === "Published"
                            ? "bg-green-100 text-green-800"
                            : publication.status === "In Press"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {publication.status}
                      </span>
                    </div>

                    {/* Authors */}
                    {publication.authors && publication.authors.length > 0 && (
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Authors:</span>{" "}
                        {publication.authors.join(", ")}
                      </p>
                    )}

                    {/* Publication Details */}
                    <div className="text-sm text-gray-600 mb-2">
                      {publication.journal && (
                        <span className="font-medium">
                          {publication.journal}
                        </span>
                      )}
                      {publication.volume && `, Vol. ${publication.volume}`}
                      {publication.issue && `, Issue ${publication.issue}`}
                      {publication.pages && `, pp. ${publication.pages}`}
                      {publication.publicationDate && (
                        <span className="ml-2">
                          ({new Date(publication.publicationDate).getFullYear()}
                          )
                        </span>
                      )}
                    </div>

                    {/* Type Badge */}
                    {publication.type && (
                      <span className="inline-block text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
                        {publication.type}
                      </span>
                    )}

                    {/* Abstract */}
                    {publication.abstract && (
                      <p className="text-sm text-gray-700 mt-3 line-clamp-2">
                        {publication.abstract}
                      </p>
                    )}

                    {/* Keywords */}
                    {publication.keywords &&
                      publication.keywords.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {publication.keywords.map((keyword, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                            >
                              #{keyword}
                            </span>
                          ))}
                        </div>
                      )}

                    {/* Metadata */}
                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
                      {publication.doi && <span>DOI: {publication.doi}</span>}
                      {publication.citations !== undefined && (
                        <span>Citations: {publication.citations}</span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="mt-3 flex gap-2">
                      {publication.url && (
                        <a
                          href={publication.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          View Online
                        </a>
                      )}
                      {publication.pdfUrl && (
                        <a
                          href={publication.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Download PDF
                        </a>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => openModal(publication)}
                        className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          publication.id && handleDelete(publication.id)
                        }
                        className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {editingPublication
                  ? "Edit Publication"
                  : "Add New Publication"}
              </h2>

              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              {successMessage && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Abstract */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Abstract
                  </label>
                  <textarea
                    rows={4}
                    value={formData.abstract}
                    onChange={(e) =>
                      setFormData({ ...formData, abstract: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Authors */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Authors (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.authors}
                    onChange={(e) =>
                      setFormData({ ...formData, authors: e.target.value })
                    }
                    placeholder="e.g., John Doe, Jane Smith"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Publication Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Publication Date
                    </label>
                    <input
                      type="date"
                      value={formData.publicationDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          publicationDate: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Publication Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                  {/* Journal */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Journal/Publication Venue
                    </label>
                    <input
                      type="text"
                      value={formData.journal}
                      onChange={(e) =>
                        setFormData({ ...formData, journal: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Published">Published</option>
                      <option value="In Press">In Press</option>
                      <option value="Submitted">Submitted</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>

                  {/* Volume */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Volume
                    </label>
                    <input
                      type="text"
                      value={formData.volume}
                      onChange={(e) =>
                        setFormData({ ...formData, volume: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Issue */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Issue
                    </label>
                    <input
                      type="text"
                      value={formData.issue}
                      onChange={(e) =>
                        setFormData({ ...formData, issue: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Pages */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pages
                    </label>
                    <input
                      type="text"
                      value={formData.pages}
                      onChange={(e) =>
                        setFormData({ ...formData, pages: e.target.value })
                      }
                      placeholder="e.g., 1-15"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Citations */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Citations Count
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.citations}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          citations: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* DOI */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    DOI
                  </label>
                  <input
                    type="text"
                    value={formData.doi}
                    onChange={(e) =>
                      setFormData({ ...formData, doi: e.target.value })
                    }
                    placeholder="e.g., 10.1234/example"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Keywords */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Keywords (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.keywords}
                    onChange={(e) =>
                      setFormData({ ...formData, keywords: e.target.value })
                    }
                    placeholder="e.g., Research, Analysis, Development"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Publication URL
                  </label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) =>
                      setFormData({ ...formData, url: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* PDF Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PDF File
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handlePdfUpload}
                      disabled={uploadingPdf}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {uploadingPdf && (
                      <span className="text-sm text-gray-600 py-2">
                        Uploading...
                      </span>
                    )}
                  </div>
                  {formData.pdfUrl && (
                    <div className="mt-2">
                      <a
                        href={formData.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View uploaded PDF
                      </a>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, pdfUrl: "" })}
                        className="ml-3 text-sm text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Cover Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Image
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {uploadingImage && (
                      <span className="text-sm text-gray-600 py-2">
                        Uploading...
                      </span>
                    )}
                  </div>
                  {formData.coverImageUrl && (
                    <div className="mt-2">
                      <img
                        src={formData.coverImageUrl}
                        alt="Cover preview"
                        className="w-32 h-40 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, coverImageUrl: "" })
                        }
                        className="mt-2 text-sm text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingPublication
                      ? "Update Publication"
                      : "Create Publication"}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
