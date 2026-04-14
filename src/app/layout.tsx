import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { BrandNav } from "@/components/layout/BrandNav";
import { ThemeProvider } from "@/components/ThemeProvider";

import { Footer } from "@/components/layout/Footer";

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
    default: "Kevern | Designer & Developer",
    template: "%s · Kevern",
  },
  description:
    "Designer and developer from Bataan, Philippines. I build thoughtful digital experiences — from branding to full-stack web apps.",
  keywords: [
    "Kevern",
    "web developer",
    "UI designer",
    "designer developer",
    "Philippines",
    "Bataan",
    "Next.js",
    "Laravel",
    "portfolio",
    "fullstack",
  ],
  authors: [{ name: "Kevern" }],
  creator: "Kevern",
  metadataBase: new URL("https://designer-dev-portfolio.kevern920.workers.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://designer-dev-portfolio.kevern920.workers.dev",
    siteName: "Kevern",
    title: "Kevern | Designer & Developer",
    description:
      "Designer and developer from Bataan, Philippines. I build thoughtful digital experiences — from branding to full-stack web apps.",
    images: [
      // {
      //   url: "/og-image.gif", // Discord sees this and animates
      //   width: 1200,
      //   height: 630,
      //   alt: "Kevern — Designer & Developer",
      // },
      {
        url: "/og-image.png", // Some platforms fall back to second image
        width: 1200,
        height: 630,
        alt: "Kevern — Designer & Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kevern | Designer & Developer",
    description:
      "Designer and developer from Bataan, Philippines. I build thoughtful digital experiences — from branding to full-stack web apps.",
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
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <BrandNav />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
