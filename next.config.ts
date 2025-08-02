import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["firebasestorage.googleapis.com", 'img.youtube.com', 'localhost', "images.unsplash.com"],

  },
};

export default nextConfig;
