import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ["m.media-amazon.com","lh3.googleusercontent.com"],
  }
};

export default nextConfig;
