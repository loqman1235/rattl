import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // temporary allow all hostnames
      },
    ],
  },
};

export default nextConfig;
