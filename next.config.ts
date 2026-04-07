import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "securfix.pt",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
  allowedDevOrigins: ['*'],
};

export default nextConfig;
