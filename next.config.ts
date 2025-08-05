import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["firebasestorage.googleapis.com", 'img.youtube.com', "source.unsplash.com", "picsum.photos", "placehold.co"], 
    
  },
};

export default nextConfig;
