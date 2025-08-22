import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  BACKEND_URL: process.env.BACKEND_URL || "http://localhost:8280",
};

export default nextConfig;
