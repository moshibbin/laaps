"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Research {
  id: string;
  title: string;
  authors: string;
  abstract: string;
  date: string;
  category: string;
  pdfUrl?: string;
  status: "draft" | "published";
}

export default function ResearchPage() {
  const [research, setResearch] = useState<Research[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchResearch();
  }, []);

  const fetchResearch = async () => {
    try {
      const res = await fetch("/api/research");
      const data = await res.json();
      // Only show published research
      const published = data.filter((r: Research) => r.status === "published");
      setResearch(published);
    } catch (error) {
      console.error("Failed to fetch research:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "All",
    ...Array.from(new Set(research.map((r) => r.category))),
  ];

  const filteredResearch = research.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#2d5a3d] rounded-full flex items-center justify-center">
                <i className="fas fa-leaf text-white"></i>
              </div>
              <span className="text-xl font-bold text-[#1a472a]">
                LAAPS Institute
              </span>
            </Link>
            <div className="flex gap-6">
              <Link
                href="/"
                className="text-gray-600 hover:text-[#2d5a3d] transition"
              >
                Home
              </Link>
              <Link
                href="/services"
                className="text-gray-600 hover:text-[#2d5a3d] transition"
              >
                Services
              </Link>
              <Link
                href="/consultancy"
                className="text-gray-600 hover:text-[#2d5a3d] transition"
              >
                Consultancy
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-[#2d5a3d] transition"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1a472a] to-[#2d5a3d] text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Our Research</h1>
            <p className="text-xl text-green-100 leading-relaxed">
              Explore our collection of evidence-based research and publications
              that inform policy and support effective solutions for
              development, humanitarian, and governance interventions.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 -mt-16 relative z-10">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search research by title, author, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2d5a3d] focus:border-transparent outline-none text-gray-700"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2d5a3d] focus:border-transparent outline-none text-gray-700"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-6 text-gray-600">
            <span className="font-semibold">{filteredResearch.length}</span>{" "}
            research publication{filteredResearch.length !== 1 ? "s" : ""} found
          </div>
        </div>
      </section>

      {/* Research Grid */}
      <section className="container mx-auto px-6 pb-20">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#2d5a3d]"></div>
          </div>
        ) : filteredResearch.length === 0 ? (
          <div className="text-center py-20">
            <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
            <p className="text-xl text-gray-500">
              No research found matching your criteria.
            </p>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-4 px-6 py-3 bg-[#2d5a3d] text-white rounded-lg hover:bg-[#1a472a] transition"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResearch.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Category Badge */}
                <div className="bg-gradient-to-r from-[#1a472a] to-[#2d5a3d] px-6 py-4">
                  <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1a472a] mb-3 line-clamp-2 hover:text-[#2d5a3d] transition">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <i className="fas fa-users"></i>
                    <span className="line-clamp-1">{item.authors}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <i className="fas fa-calendar"></i>
                    <span>
                      {new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <p className="text-gray-700 leading-relaxed line-clamp-4 mb-6">
                    {item.abstract}
                  </p>

                  {/* Action Button */}
                  {item.pdfUrl ? (
                    <a
                      href={item.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#2d5a3d] text-white rounded-lg font-semibold hover:bg-[#1a472a] transition-colors shadow-md hover:shadow-lg"
                    >
                      <i className="fas fa-file-pdf"></i>
                      View PDF
                    </a>
                  ) : (
                    <button
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-300 text-gray-600 rounded-lg font-semibold cursor-not-allowed"
                      disabled
                    >
                      <i className="fas fa-file-pdf"></i>
                      PDF Unavailable
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
