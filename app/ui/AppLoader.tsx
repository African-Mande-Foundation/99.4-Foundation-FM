"use client";
import { useState, useEffect } from "react";
import FullScreenLoader from "./FullScreenLoader";

export default function AppLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/podcasts"),
      fetch("/api/testimonials"),
      fetch("/api/songs"),
    ])
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <FullScreenLoader />;
  return <>{children}</>;
}