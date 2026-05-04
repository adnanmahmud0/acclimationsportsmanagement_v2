import { Hero } from "@/components/hero";
import { OneStopShop } from "@/components/one-stop-shop";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { buildMetadataFromPage } from "@/lib/seo";
import connectDB from "@/lib/mongodb";
import Page from "@/models/page";
import { FAQSchema } from "@/components/json-ld";

async function getPageData() {
  await connectDB();
  const page = await Page.findOne({ slug: "home" }).lean();
  return page || null;
}

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
