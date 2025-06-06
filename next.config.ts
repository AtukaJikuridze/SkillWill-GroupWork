import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
    cacheLife: {
      default: {
        stale: 20,
        revalidate: 20,
        expire: 20,
      },
    },
  },
};

export default nextConfig;
