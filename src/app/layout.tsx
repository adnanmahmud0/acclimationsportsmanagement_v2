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
});

const playfair = localFont({
  src: [
    { path: "../../public/fonts/PlayfairDisplay-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/PlayfairDisplay-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  ...buildSiteMetadata(),
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
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

import { Toaster } from "@/components/ui/sonner";

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
        <OrganizationSchema />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
