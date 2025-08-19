"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingBar from "../ui/LoadingBar";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Unsubscribing...");

  useEffect(() => {
    if (!email || !token) {
      setStatus("error");
      setMessage(
        "Invalid unsubscribe link. Please check the URL and try again.",
      );
      return;
    }

    const unsubscribe = async () => {
      try {
        const response = await fetch("/api/unsubscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, token }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage(data.message);
        } else {
          setStatus("error");
          setMessage(
            data.message || "An error occurred during unsubscription.",
          );
        }
      } catch {
        setStatus("error");
        setMessage("An unexpected error occurred. Please try again later.");
      }
    };

    unsubscribe();
  }, [email, token]);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          {status === "loading" && <LoadingBar className="w-12 h-12" />}
          {status === "success" && (
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold text-green-600">Success!</h2>
              <p className="mt-2 text-center text-gray-600">{message}</p>
            </div>
          )}
          {status === "error" && (
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold text-red-600">Error</h2>
              <p className="mt-2 text-center text-gray-600">{message}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
