import type { NextConfig } from "next";

const robotsHeader = {
  key: "X-Robots-Tag",
  value: "noindex, nofollow, noarchive",
} as const;

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [robotsHeader],
      },
    ];
  },
};

export default nextConfig;