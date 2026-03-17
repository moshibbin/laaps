"use client";

import { useState, useEffect } from "react";
import { Author } from "@/lib/firebase";

export default function AuthorsManagement() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    expertise: "",
    profileImage: "",
    publications: 0,
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch authors
  const fetchAuthors = async (search = "") => {
    try {
      setLoading(true);
      const url = search
        ? `/api/authors?search=${encodeURIComponent(search)}`
        : "/api/authors";
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setAuthors(data.data);
      } else {
        setError(data.error || "Failed to fetch authors");
      }
    } catch (err) {
      setError("Failed to fetch authors");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAuthors(searchTerm);
  };

  // Open modal for create/edit
  const openModal = (author?: Author) => {
    if (author) {
      setEditingAuthor(author);
      setFormData({
        name: author.name,
        email: author.email,
        bio: author.bio || "",
        expertise: author.expertise?.join(", ") || "",
        profileImage: author.profileImage || "",
        publications: author.publications || 0,
      });
    } else {
      setEditingAuthor(null);
      setFormData({
        name: "",
        email: "",
        bio: "",
        expertise: "",
        profileImage: "",
        publications: 0,
      });
    }
    setIsModalOpen(true);
    setError("");
    setSuccessMessage("");
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAuthor(null);
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
        name: formData.name,
        email: formData.email,
        bio: formData.bio,
        expertise: formData.expertise
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== ""),
        profileImage: formData.profileImage,
        publications: Number(formData.publications),
      };

      const url = editingAuthor
        ? `/api/authors/${editingAuthor.id}`
        : "/api/authors";
      const method = editingAuthor ? "PUT" : "POST";

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
          editingAuthor
            ? "Author updated successfully"
            : "Author created successfully",
        );
        fetchAuthors(searchTerm);
        setTimeout(() => closeModal(), 1500);
      } else {
        setError(data.error || "Operation failed");
      }
    } catch (err) {
      setError("An error occurred");
      console.error(err);
    }
  };

  // Delete author
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this author?")) {
      return;
    }

    try {
      const response = await fetch(`/api/authors/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage("Author deleted successfully");
        fetchAuthors(searchTerm);
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setError(data.error || "Failed to delete author");
      }
    } catch (err) {
      setError("Failed to delete author");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Authors Management
          </h1>
          <p className="text-gray-600">
            Manage research authors and contributors
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
              placeholder="Search authors..."
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
            + Add New Author
          </button>
        </div>

        {/* Authors List */}
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading authors...</p>
          </div>
        ) : authors.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">No authors found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authors.map((author) => (
              <div
                key={author.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                {author.profileImage && (
                  <div className="mb-4">
                    <img
                      src={author.profileImage}
                      alt={author.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto"
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                  {author.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 text-center">
                  {author.email}
                </p>
                {author.bio && (
                  <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                    {author.bio}
                  </p>
                )}
                {author.expertise && author.expertise.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {author.expertise.map((exp, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {author.publications !== undefined && (
                  <p className="text-sm text-gray-600 mb-4">
                    Publications: {author.publications}
                  </p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(author)}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => author.id && handleDelete(author.id)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {editingAuthor ? "Edit Author" : "Add New Author"}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expertise (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.expertise}
                    onChange={(e) =>
                      setFormData({ ...formData, expertise: e.target.value })
                    }
                    placeholder="e.g., Research, Data Analysis, Policy"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.profileImage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profileImage: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Publications
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.publications}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        publications: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingAuthor ? "Update Author" : "Create Author"}
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
