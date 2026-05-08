import type { Metadata } from "next";
import "./globals.css";
import { buildSiteMetadata, siteMetadata } from "@/lib/seo";
import { OrganizationSchema } from "@/components/json-ld";
import localFont from "next/font/local";

const inter = localFont({
  src: [
    { path: "../../public/fonts/Inter-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Inter-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const playfair = localFont({
  src: [
    { path: "../../public/fonts/PlayfairDisplay-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/PlayfairDisplay-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-playfair",
  display: "swap",
});

import Branding from "@/models/branding";
import connectDB from "@/lib/mongodb";

export async function generateMetadata(): Promise<Metadata> {
  await connectDB();
  const branding = await Branding.findOne();
  const favicon = branding?.favicon || "/favicon.ico";
  
  const baseMetadata = buildSiteMetadata();

  return {
    ...baseMetadata,
    title: {
      default: siteMetadata.name,
      template: `%s | ${siteMetadata.name}`,
    },
    authors: [{ name: "Joe Grekoski" }],
    creator: siteMetadata.name,
    publisher: siteMetadata.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [
        { url: favicon, sizes: "any" },
        { url: "/icon.png", type: "image/png", sizes: "32x32" },
      ],
      shortcut: favicon,
      apple: "/apple-touch-icon.png",
    },
    manifest: "/manifest.json",
  };
}

import { Toaster } from "@/components/ui/sonner";
import { ViewTracker } from "@/components/view-tracker";
import { BrandingProvider } from "@/providers/branding-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#05070a] text-white">
        <BrandingProvider>
          <OrganizationSchema />
          <ViewTracker />
          {children}
          <Toaster />
        </BrandingProvider>
      </body>
    </html>
  );
}
