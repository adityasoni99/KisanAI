import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  // Only use basePath in production so local dev still works at /
  basePath: isProd ? '/KisanAI' : '',
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
