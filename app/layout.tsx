import type { Metadata } from "next";
import Script from "next/script";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ASSETS } from "@/lib/constants/assets.constants";
config.autoAddCss = false;

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://refactorgames.com"),
  title: "Refactor Games",
  description: "We make experimental, emergent sports video games.",
  authors: [{ name: "Refactor Games" }],

  // Open Graph (Social Media, general)
  openGraph: {
    siteName: "Refactor Games",
    title: "Refactor Games",
    description: "We make experimental, emergent sports video games.",
    url: "https://refactorgames.com",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: ASSETS.IMAGES.SOCIAL_MEDIA.standardSize,
        width: 1200,
        height: 630,
        type: "image/webp",
      }
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    site: "@refactorgames",
    title: "Refactor Games",
    description: "We make experimental, emergent sports video games.",
    images: [ASSETS.IMAGES.SOCIAL_MEDIA.standardSize],
  },

  // SEO
  robots: {
    index: true,
    follow: true,
  },

  // Canonical URL
  alternates: {
    canonical: "https://refactorgames.com"
  },

  // Icons
  icons: {
    icon: [
      { url: "/refactor-icon-white.svg", type: "image/svg+xml" },
      {
        url: "/refactor-icon-black.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)"
      },
      {
        url: "/refactor-icon-white.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)"
      },
      { url: "/refactor-icon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/refactor-icon-180x180.png", sizes: "180x180" }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Refactor Games",
              "description": "We make experimental, emergent sports video games",
              "url": "https://refactorgames.com"
            })
          }}
        />
        {/* This is the Din Condensed Adobe font import */}
        <link rel="stylesheet" href="https://use.typekit.net/nhr0bmk.css"></link>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
