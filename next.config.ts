import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {

    domains: ["firebasestorage.googleapis.com", 'img.youtube.com', "source.unsplash.com", "picsum.photos", "placehold.co",'localhost', "images.unsplash.com", "localhost:1337",], 
    

  },
  env: {
    NEXT_PUBLIC_STRAPI_URL: process.env.STRAPI_URL
  },
};

export default nextConfig;
