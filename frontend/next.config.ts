import type { NextConfig } from "next";

// Docker build: the browser calls /api on the same origin and Next forwards it to Laravel.
const apiInternalUrl = process.env.API_INTERNAL_URL;

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    if (!apiInternalUrl) return [];
    return [{ source: "/api/:path*", destination: `${apiInternalUrl}/api/:path*` }];
  },
};

export default nextConfig;
