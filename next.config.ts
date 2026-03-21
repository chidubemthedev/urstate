import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://images.unsplash.com/**"),
      new URL("https://unsplash.com/photos/**"),
    ],
  },
};

export default nextConfig;
