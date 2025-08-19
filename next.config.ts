import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {

    domains: ["firebasestorage.googleapis.com", 'img.youtube.com', "source.unsplash.com", "picsum.photos", "placehold.co",'localhost', "images.unsplash.com", "localhost:1337","young-basket-bbd005c9d4.strapiapp.com","young-basket-bbd005c9d4.media.strapiapp.com",], 
    

    remotePatterns: [
      // For Google profile images
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      // Wildcard for all Google user content subdomains
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      // Firebase Storage
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      // YouTube thumbnails
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      // Local development
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/**',
      },
      // Unsplash
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'young-basket-bbd005c9d4.media.strapiapp.com',
      },
    ],
  },
 
  env: {
    NEXT_PUBLIC_STRAPI_URL: process.env.STRAPI_URL
  },
};

export default nextConfig;