import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // dev-only: lets the phone on the LAN load JS chunks/HMR
  allowedDevOrigins: ["192.168.1.12", "192.168.1.*"],
};

export default nextConfig;
