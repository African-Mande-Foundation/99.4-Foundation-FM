"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import ArticleGrid from "./components/ArticleGrid";
import Sidebar from "./components/Sidebar";
import LoadingBar from "../ui/LoadingBar";
import ImageSlider from "./components/ImageSlider";
import { Article, Category, RecentComment, Author } from "@/app/lib/types";
import InfoCards from "./components/InfoCards";
import PeaceAndSocialIssues from "./components/Peace&SocialIssues";
import CommunityHighlights from "./components/CommunityHighlight";
import LatestPosts from "./components/LatestPosts";
import RealVoicesComponent from "./components/RealVoice";
import ArticleGridSkeleton from "./components/Skeletons/ArticleGrid";

const NewsPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [recentComments, setRecentComments] = useState<RecentComment[]>([]);
  const [error, setError] = useState("");

  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/news-page");
      const data = await res.json();
      if (res.ok) {
        setArticles(data.articles);
        setCategories(data.categories);
        setAuthors(data.authors);
        setRecentComments(data.recentComments);
      } else {
        setError(data.message || "Failed to load data");
      }
    } catch {
      setError("An error occurred while loading data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleGoogleRegistrationPhotoUpdate = async () => {
      if (status === "authenticated") {
        const isGoogleRegistration = localStorage.getItem("googleRegistration");
        if (isGoogleRegistration) {
          try {
            const res = await fetch("/api/users/me", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (!res.ok) throw new Error("Photo update failed");

            localStorage.removeItem("googleRegistration");
          } catch {
            console.error("Failed to update photo in Strapi");
          }
        }
      }
    };

    if (status === "authenticated") {
      fetchAllData().then(() => {
        handleGoogleRegistrationPhotoUpdate();
      });
    }
  }, [status, session]);

  if (status === "loading") {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <LoadingBar className="w-30 h-30" />
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />

        <div className="h-[95vh]  flex items-center justify-center px-4">
          <div className="text-center space-y-6 max-w-">
            <p className="text-lg md:text-xl text-gray-600">
              Please log in to access the latest stories and updates.
            </p>
            <Link
              href="/login?callbackUrl=/news"
              className="inline-block px-6 py-3 border border-black rounded-full text-sm md:text-base font-medium hover:bg-black hover:text-white transition"
            >
              Log In
            </Link>
            <p className="mt-5 text-lg md:text-xl text-gray-600">
              New here? Create an account to stay updated.
            </p>
            <Link
              href="/register?callbackUrl=/news"
              className="inline-block px-6 py-3 border border-black rounded-full text-sm md:text-base font-medium hover:bg-black hover:text-white transition"
            >
              Register
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />
      <ImageSlider />
      <InfoCards />
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <div className="pt-20 px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 w-full mx-auto py-8 ">
        <div className="flex flex-col lg:flex-row gap-8 ">
          <div className="flex-grow w-full lg:w-2/3 xl:w-3/4">
            <PeaceAndSocialIssues />
            <CommunityHighlights />
            <LatestPosts />
            {isLoading ? (
              <ArticleGridSkeleton />
            ) : (
              <ArticleGrid articles={articles} />
            )}
          </div>

          <div className="w-full lg:w-2/3 xl:w-1/3">
            <Sidebar
              categories={categories}
              authors={authors}
              recentComments={recentComments}
              isLoading={isLoading}
            />
          </div>
        </div>
        <RealVoicesComponent />
      </div>

      <Footer />
    </div>
  );
};

export default NewsPage;
