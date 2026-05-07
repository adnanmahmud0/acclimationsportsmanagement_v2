import React from "react";
import { buildMetadataFromPage } from "@/lib/seo";
import { LocalBusinessSchema, PersonSchema, BreadcrumbSchema } from "@/components/json-ld";
import { ContactSection } from "@/components/contact-section";

import connectDB from "@/lib/mongodb";
import Page from "@/models/page";
import { PageData } from "@/types/cms";

async function getPageData() {
  await connectDB();
  const page = await Page.findOne({ slug: "contact" }).lean();
  return page as unknown as PageData | null;
}

export async function generateMetadata() {
  const page = await getPageData();
  return buildMetadataFromPage(page, "/contact");
}

export default async function ContactPage() {
  const pageData = await getPageData();

  return (
    <main className="relative min-h-screen bg-[#05070a]">
      <LocalBusinessSchema />
      <PersonSchema />
      <BreadcrumbSchema items={[{ name: "Contact", href: "/contact" }]} />
      
      <div className="pt-20">
        <ContactSection data={pageData} />
      </div>
    </main>
  );
}
