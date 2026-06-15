import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Boise Marketing Guy — Grow without the marketing struggle",
  description:
    "Boise Marketing Guy helps small businesses in Boise grow without the marketing struggle. 20+ years experience, hundreds of clients, measurable results.",
  metadataBase: new URL("https://boisemarketingguy.com"),
  openGraph: {
    title: "Boise Marketing Guy — Grow without the marketing struggle",
    description:
      "Helping small businesses in Boise get customers. 20+ years experience.",
    url: "https://boisemarketingguy.com",
    siteName: "Boise Marketing Guy",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
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
      </head>
      <body className="bg-bg text-ink font-body antialiased">{children}</body>
    </html>
  );
}
