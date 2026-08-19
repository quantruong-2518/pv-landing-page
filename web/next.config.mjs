import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * `outputFileTracingRoot`: máy dev có một package-lock.json lạc ở thư mục home, Next tự đoán
 * nhầm đó là workspace root. Ghim về chính thư mục này.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),
};

export default nextConfig;
