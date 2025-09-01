import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all external domains
      },
    ],
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
