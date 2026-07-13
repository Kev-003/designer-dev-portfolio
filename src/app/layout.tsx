import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { BrandNav } from "@/components/layout/BrandNav";
import { ThemeProvider } from "@/components/ThemeProvider";

import { Footer } from "@/components/layout/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kevern | Full-Stack Product Engineer",
    template: "%s · Kevern",
  },
  description:
    "Full-stack product engineer from Bataan, Philippines. I build end-to-end digital products — from system architecture to the interfaces people actually use.",
  keywords: [
    "Kevern",
    "Kevern Angeles",
    "full-stack developer",
    "product engineer",
    "web developer",
    "software engineer",
    "Philippines",
    "Bataan",
    "Next.js",
    "Laravel",
    "portfolio",
    "fullstack",
  ],
  authors: [{ name: "Kevern Angeles" }],
  creator: "Kevern Angeles",
  metadataBase: new URL("https://kevern.cc"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kevern.cc",
    siteName: "Kevern",
    title: "Kevern | Full-Stack Product Engineer",
    description:
      "Full-stack product engineer from Bataan, Philippines. I build end-to-end digital products — from system architecture to the interfaces people actually use.",
    images: [
      // {
      //   url: "/og-image.gif", // Discord sees this and animates
      //   width: 1200,
      //   height: 630,
      //   alt: "Kevern — Full-Stack Product Engineer",
      // },
      {
        url: "/og-image.png", // Some platforms fall back to second image
        width: 1200,
        height: 630,
        alt: "Kevern — Full-Stack Product Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kevern | Full-Stack Product Engineer",
    description:
      "Full-stack product engineer from Bataan, Philippines. I build end-to-end digital products — from system architecture to the interfaces people actually use.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://kevern.cc/#person",
                  name: "Kevern Angeles",
                  url: "https://kevern.cc",
                  jobTitle: "Full-Stack Product Engineer",
                  address: {
                    "@type": "PostalAddress",
                    addressRegion: "Bataan",
                    addressCountry: "Philippines",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://kevern.cc/#website",
                  url: "https://kevern.cc",
                  name: "Kevern | Full-Stack Product Engineer",
                  publisher: {
                    "@id": "https://kevern.cc/#person",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <BrandNav />
          <main className="flex-1 flex flex-col">{children}</main>
          <FloatingCTA />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
