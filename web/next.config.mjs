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
};

export default nextConfig;
