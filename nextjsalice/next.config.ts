import type { NextConfig } from "next";

const backendUrl = new URL(process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: backendUrl.protocol.replace(":", "") as "http" | "https",
        hostname: backendUrl.hostname,
        port: backendUrl.port,
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
