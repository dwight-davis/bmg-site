import type { Metadata } from "next";
import "./globals.css";
import { JsonLd } from "@/components/schema/JsonLd";
import { orgSchema, localBusinessSchema, SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: "Boise Marketing Guy — Transform your marketing into a revenue machine",
    template: "%s | Boise Marketing Guy",
  },
  description:
    "Twenty years of digital marketing. $450K/month in paid media managed personally. Boise-based, working with small businesses across Idaho and the US to turn marketing into measurable revenue.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Boise Marketing Guy — Transform your marketing into a revenue machine",
    description:
      "Twenty years of digital marketing. $450K/month managed paid media. Real results for small businesses.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: "/dwight.png", width: 800, height: 800, alt: "Dwight Davis, Boise Marketing Guy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boise Marketing Guy",
    description: "Marketing that finally works. 20+ years experience. Real ROI.",
    images: ["/dwight.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:wght@400;500;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
        {/* Site-wide structured data. Organization + LocalBusiness ride on
            every page so AI summarizers and search crawlers see the brand
            identity regardless of which URL they land on first. */}
        <JsonLd data={orgSchema()} />
        <JsonLd data={localBusinessSchema()} />
      </head>
      <body className="bg-bg text-ink font-body antialiased">{children}</body>
    </html>
  );
}
