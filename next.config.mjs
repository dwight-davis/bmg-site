/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  poweredByHeader: false,
  // Marketing site — SEO-first. No experimental features that could throw.
  reactStrictMode: true,
};
export default nextConfig;
