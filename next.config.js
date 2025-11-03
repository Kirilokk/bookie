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
    ],  },
};

module.exports = nextConfig;