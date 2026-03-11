import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Hostinger shared hosting (no Node.js runtime required).
  // Generates a flat `out/` directory of HTML/CSS/JS ready for FTP upload.
  output: "export",
  // Needed for static file servers: /about → /about/index.html
  trailingSlash: true,
  images: {
    // Static export requires unoptimized images (Next.js image optimization needs a server).
    unoptimized: true,
    // Add remote patterns here only if hosting on S3/CDN
    remotePatterns: [],
  },
};

export default nextConfig;
