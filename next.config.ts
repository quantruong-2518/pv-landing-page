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

  // Generated source art stays lossless where alpha matters; AVIF/WebP
  // negotiation sends a compact, correctly-sized format to each browser.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
