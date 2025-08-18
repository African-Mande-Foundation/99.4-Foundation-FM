"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/app/ui/Navbar";
import Footer from "@/app/ui/Footer";
import LoadingBar from "@/app/ui/LoadingBar";
import ArticleGrid from "../components/ArticleGrid";
import { Article } from "@/app/lib/types";
import { useRouter } from "next/navigation";
import { ArrowUp, ArrowDown } from "lucide-react";

const AllArticlesPage = () => {
  const { status } = useSession();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const router = useRouter();

  const fetchArticles = useCallback(
    async (search: string) => {
      setIsLoading(true);
      setError("");

      try {
        const searchParams = new URLSearchParams({
          page: page.toString(),
          pageSize: "10",
          sort: `publishedAt:${sortOrder}`,
        });

        if (search) {
          searchParams.set("filters[title][$containsi]", search);
        }

        const res = await fetch(`/api/all-articles?${searchParams.toString()}`);

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to load articles");
        }
        const data = await res.json();
        setArticles(data.data);
        setPageCount(data.meta.pagination.pageCount);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [page, sortOrder],
  );

  useEffect(() => {
    if (status === "authenticated") {
      fetchArticles("");
    }
  }, [status, fetchArticles]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchArticles(searchTerm);
  };

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setPage(1);
  };

  if (status === "loading") {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <LoadingBar className="w-12 h-12" />
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login?callbackUrl=/news/all");
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            All Articles
          </h1>

          {/* Search & Sort always visible */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <form onSubmit={handleSearch} className="flex-grow flex gap-2">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#03A0B4]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#03A0B4] text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </form>
            <button
              onClick={handleSortToggle}
              className="px-4 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center gap-2"
            >
              {sortOrder === "asc" ? (
                <ArrowUp size={20} />
              ) : (
                <ArrowDown size={20} />
              )}
              <span>Sort</span>
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <LoadingBar className="w-24 h-24" /> {/* Bigger loader */}
            </div>
          ) : error ? (
            <p className="text-red-500 text-center py-10">{error}</p>
          ) : articles.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No articles found.
            </p>
          ) : (
            <>
              <ArticleGrid articles={articles} />
              {articles.length > 0 && (
                <div className="flex justify-center items-center gap-4 mt-8 mb-10">
                  <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span>
                    Page {page} of {pageCount}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(p + 1, pageCount))}
                    disabled={page === pageCount}
                    className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Footer hidden while loading */}
      {!isLoading && <Footer />}
    </div>
  );
};

export default AllArticlesPage;
