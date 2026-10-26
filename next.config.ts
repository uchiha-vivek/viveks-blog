import type { NextConfig } from "next";

// Files that are not pages: link-preview images and fonts.
// Google should fetch them but never list them in search.
const notPages = ["/share/:path*", "/og/:path*", "/_next/static/media/:path*"];

const nextConfig: NextConfig = {
  async redirects() {
    // Old static-site URL still linked from somewhere.
    return [{ source: "/index.html", destination: "/", permanent: true }];
  },
  async headers() {
    return notPages.map((source) => ({
      source,
      headers: [{ key: "X-Robots-Tag", value: "noindex" }],
    }));
  },
};

export default nextConfig;
