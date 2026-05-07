import { Hero } from "@/components/hero";
import { OneStopShop } from "@/components/one-stop-shop";
import { buildMetadataFromPage } from "@/lib/seo";
export const revalidate = 60;
import connectDB from "@/lib/mongodb";
import Page from "@/models/page";
import { FAQSchema } from "@/components/json-ld";
import { mergePageData } from "@/lib/data-utils";
import { cache } from "react";
import dynamic from "next/dynamic";

const AboutSection = dynamic(() => import("@/components/about-section").then(mod => mod.AboutSection));
const ContactSection = dynamic(() => import("@/components/contact-section").then(mod => mod.ContactSection));

const getPageData = cache(async () => {
  await connectDB();
  const page = await Page.findOne({ slug: "home" }).lean();
  return mergePageData(page);
});

export async function generateMetadata() {
  const page = await getPageData();
  return buildMetadataFromPage(page, "/");
}

export default async function Home() {
  const pageData = await getPageData();

  return (
    <div className="relative min-h-screen font-sans overflow-x-hidden">
      {pageData?.seo?.faqs && <FAQSchema faqs={pageData.seo.faqs} />}
      <Hero data={pageData} />
      <OneStopShop data={pageData} />
      <AboutSection data={pageData} />
      <ContactSection data={pageData} />
    </div>
  );
}
