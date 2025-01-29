/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.gizmodotech.com',
      },
    ],
    unoptimized: false,
  },
};

module.exports = nextConfig;
