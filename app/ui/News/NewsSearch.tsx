"use client";

import { useState } from 'react';

const categories = [
  "All",
  "Politics",
  "Community", 
  "Health",
  "Education",
  "Sports",
  "Entertainment",
  "Technology",
  "Business",
  "Weather"
];

const sortOptions = [
  "Latest",
  "Most Popular",
  "Trending",
  "Most Commented"
];

export default function NewsSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Latest");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search news articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#03A0B4] focus:border-transparent"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          {/* Category Filter */}
          <div className="flex-1 min-w-48">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#03A0B4] focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div className="flex-1 min-w-48">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#03A0B4] focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              type="submit"
              className="px-6 py-2 bg-[#03A0B4] text-white rounded-lg hover:bg-[#0284a3] transition-colors font-medium"
            >
              Search
            </button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700">Quick Filters:</span>
          <button
            type="button"
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-[#03A0B4] hover:text-white transition-colors"
          >
            Breaking News
          </button>
          <button
            type="button"
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-[#03A0B4] hover:text-white transition-colors"
          >
            Today
          </button>
          <button
            type="button"
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-[#03A0B4] hover:text-white transition-colors"
          >
            This Week
          </button>
          <button
            type="button"
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-[#03A0B4] hover:text-white transition-colors"
          >
            Local News
          </button>
        </div>
      </form>
    </div>
  );
} 