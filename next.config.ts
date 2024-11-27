import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/:page(platform|connectors|pricing|security).html", destination: "/:page", permanent: true },
    ];
  },
};

export default nextConfig;
