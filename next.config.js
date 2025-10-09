/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kirilok-nextjs-demo-users-image.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '/images/**', // Matches all files in the images folder
      },
    ],  },
};

module.exports = nextConfig;