"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/app/ui/Navbar";
import Footer from "@/app/ui/Footer";
import { useParams, useRouter } from "next/navigation";
import { ArticleData } from "@/app/lib/types";
import ArticleHeader from "./components/ArticleHeader";
import ArticleBody from "./components/ArticleBody";
import CommentList from "./components/CommentList";
import LoadingBar from "@/app/ui/LoadingBar";

export default function ArticlePage() {
  const params = useParams<{ documentId: string }>();
  const { documentId } = params;
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [parentCommentId, setParentCommentId] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  const fetchArticle = useCallback(async () => {
    try {
      const res = await fetch(`/api/articles/${documentId}`);
      const data = await res.json();
      if (res.ok) {
        setArticle(data);
      } else {
        setError(data.message || "Failed to load article");
      }
    } catch {
      setError("An error occurred while loading the article");
    } finally {
      setLoading(false);
    }
  }, [documentId]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  const handleCommentPosted = () => {
    setParentCommentId(null);
    fetchArticle();
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <LoadingBar className="w-30 h-30" />
        </div>
    
      </div>

    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-800">Article not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />
      <div className="pt-20 px-4 lg:px-20 xl:px-45 max-w-6xl mx-auto py-8">
        <button
          onClick={() => router.back()}
          className="mb-4 text-[#026C79] hover:underline"
        >
          &larr; Back
        </button>
        <ArticleHeader article={article} />
        <ArticleBody article={article} />

        <div className="mt-8">
          <CommentList
            comments={article.comments}
            articleId={documentId}
            userId={session?.user?.id}
            onCommentPosted={handleCommentPosted}
            currentParentCommentId={parentCommentId}
            onSetParentCommentId={setParentCommentId}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
