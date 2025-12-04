/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_REMOTE_IMAGE_HOST,
        port: "",
        pathname: "/images/**", // Matches all files in the images folder
      },
      {
        protocol: 'http',
        hostname: 'books.google.com',
        pathname: '/books/content/**',
      },
      {
        protocol: 'https',
        hostname: 'books.google.com',
        pathname: '/books/content/**',
      },
    ],
  },
};

module.exports = nextConfig;