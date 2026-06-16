/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  poweredByHeader: false,
  // Marketing site — SEO-first. No experimental features that could throw.
  reactStrictMode: true,
  // WordPress URLs all end with a trailing slash. Preserve them so we
  // don't issue 301s on every legacy backlink at cutover.
  trailingSlash: true,
  // Redirect old WordPress URLs that have moved. Google's cached
  // reference to /wp-sitemap.xml still hits regularly — point it at
  // the new Next.js-generated sitemap.
  async redirects() {
    return [
      { source: "/wp-sitemap.xml",       destination: "/sitemap.xml", permanent: true },
      { source: "/wp-sitemap-index.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/wp-login.php",         destination: "/",            permanent: true },
      { source: "/wp-admin",             destination: "/",            permanent: true },
      { source: "/wp-admin/:path*",      destination: "/",            permanent: true },
    ];
  },
};
export default nextConfig;
