import type { Metadata } from "next";
import Script from "next/script";

import "./globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false

export const metadata: Metadata = {
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
      { //@TODO update this and make it a webp
        url: "/social-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
      },
    ],
  },

  // Twitter
  twitter: { // @TODO update social image here too
    card: "summary_large_image",
    site: "@refactorgames",
    title: "Refactor Games",
    description: "We make experimental, emergent sports video games.",
    images: ["/social-image.jpg"],
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
        <link rel="stylesheet" href="https://use.typekit.net/nhr0bmk.css"></link>

        {/* FontAwesome */}
        <Script
          src="https://kit.fontawesome.com/a35f7c14ea.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
