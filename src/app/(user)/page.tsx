import { Hero } from "@/components/hero";
import { OneStopShop } from "@/components/one-stop-shop";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { buildPageMetadata } from "@/lib/seo";
import connectDB from "@/lib/mongodb";
import Page from "@/models/page";

async function getPageData() {
  await connectDB();
  const page = await Page.findOne({ slug: "home" }).lean();
  return page || null;
}

export async function generateMetadata() {
  const page = await getPageData();
  if (page?.seo) {
    return {
      title: page.seo.title,
      description: page.seo.description,
      keywords: page.seo.keywords,
      openGraph: {
        title: page.seo.title,
        description: page.seo.description,
        images: page.seo.ogImage ? [{ url: page.seo.ogImage }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: page.seo.title,
        description: page.seo.description,
        images: page.seo.ogImage ? [page.seo.ogImage] : [],
      }
    };
  }
  return buildPageMetadata("/");
}

export default async function Home() {
  const pageData = await getPageData();

  return (
    <div className="relative min-h-screen font-sans overflow-x-hidden">
      <Hero data={pageData} />
      <OneStopShop data={pageData} />
      <AboutSection data={pageData} />
      <ContactSection data={pageData} />
    </div>
  );
}
