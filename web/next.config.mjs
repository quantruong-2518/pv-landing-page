import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * `outputFileTracingRoot`: a stray package-lock.json in the dev machine's home
 * directory makes Next guess the wrong workspace root. Pin it to this folder.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),

  /**
   * The site lives under `/vi` so a second language can be added later without
   * moving every URL. Nothing is served from the bare root, so send it — and the
   * pre-`/vi` URLs that were briefly live — to their Vietnamese equivalent.
   */
  async redirects() {
    return [
      { source: "/", destination: "/vi", permanent: true },
      { source: "/products", destination: "/vi/products", permanent: true },
      { source: "/contact", destination: "/vi/contact", permanent: true },
    ];
  },
};

export default nextConfig;
