import Image from "next/image";
import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { GradientHeader } from "@/components/gradient-header";
import { buildPageMetadata } from "@/lib/seo";
import { LocalBusinessSchema, PersonSchema, BreadcrumbSchema } from "@/components/json-ld";

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
  return buildPageMetadata("/contact");
}

export default async function ContactPage() {
  const pageData = await getPageData();

  const content = pageData?.content || {
    mainTitle: "Ready to Take the Next Step?",
    subDescription: "Any questions or remarks? Just contact us!",
    backgroundImage: "/aurabasketcoart.png",
    points: [
      { title: "Joe's Direct Line", items: ["512-518-6547", "Call or text Joe anytime — 24/7 for serious inquiries"] },
      { title: "Email", items: ["Joseph.Grekoski@AcclimationGroup.com", "Fast responses for NBA, college & high school athletes"] },
      { title: "Office Location", items: ["Acclimation Sports Agency", "Fort Lauderdale, Florida 33308"] },
    ]
  };

  const icons = [<Phone key="phone" size={40} strokeWidth={1.5} />, <Mail key="mail" size={40} strokeWidth={1.5} />, <MapPin key="map" size={40} strokeWidth={1.5} />];

  return (
    <main className="relative min-h-screen overflow-x-hidden flex flex-col bg-black/5">
      <LocalBusinessSchema />
      <PersonSchema />
      <BreadcrumbSchema items={[{ name: "Contact", href: "/contact" }]} />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(0,210,255,0.14),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(58,123,213,0.16),_transparent_32%),linear-gradient(180deg,_#070b10_0%,_#05070a_55%,_#030406_100%)]" />
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-[-1]">
        <Image
          src={content.backgroundImage || "/aurabasketcoart.png"}
          alt="Contact Background"
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/95 via-[#05070a]/60 to-[#05070a]" />
      </div>

      <div className="container mx-auto px-6 pt-40 pb-20 relative z-10 flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-20">
          <GradientHeader tag="h1" size="lg" className="mb-4">
            {content.mainTitle}
          </GradientHeader>
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4">
            {content.subDescription}
          </h2>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
          {content.points?.slice(0, 3).map((point, idx) => (
            <div key={idx} className="glass-premium p-12 rounded-[2.5rem] flex flex-col items-center text-center space-y-6 border-white/5 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 shadow-2xl">
                {icons[idx]}
              </div>
              <div className="space-y-4 relative z-10">
                <h3 className="text-white font-black text-xl uppercase tracking-[0.2em] pt-4">{point.title}</h3>
                {idx === 0 && (
                  <a href={`tel:${point.items?.[0]}`} className="text-2xl md:text-3xl font-serif font-black text-white hover:text-primary transition-colors block">
                    {point.items?.[0]}
                  </a>
                )}
                {idx === 1 && (
                  <a href={`mailto:${point.items?.[0]}`} className="text-lg md:text-xl font-bold text-white hover:text-primary transition-colors break-all leading-snug block">
                    {point.items?.[0]}
                  </a>
                )}
                {idx === 2 && (
                  <div className="text-white/90 font-bold text-lg leading-relaxed pt-2">
                    {point.items?.[0]}<br />{point.items?.[1]}
                  </div>
                )}
                {idx < 2 && point.items?.[1] && (
                  <p className="text-white/50 text-sm font-bold leading-relaxed tracking-wide uppercase">
                    {point.items?.[1]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
