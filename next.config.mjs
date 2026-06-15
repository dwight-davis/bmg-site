/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  poweredByHeader: false,
  // Marketing site — SEO-first. No experimental features that could throw.
  reactStrictMode: true,
  // WordPress URLs all end with a trailing slash. Preserve them so we
  // don't issue 301s on every legacy backlink at cutover.
  trailingSlash: true,
};
export default nextConfig;
