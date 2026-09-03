import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every public page lives under a locale prefix so each language has its own
  // indexable URL (see src/lib/i18n/config.ts). Bare paths are permanent
  // redirects into the default locale rather than duplicate content.
  async redirects() {
    return [
      { source: "/", destination: "/vi", permanent: true },
      { source: "/products", destination: "/vi/products", permanent: true },
    ];
  },

  // The design handoff ships PNG renders only; AVIF/WebP negotiation keeps the
  // 3840x2160 hero from dominating LCP.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
