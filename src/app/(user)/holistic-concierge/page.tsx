import Image from "next/image"
import React from "react"
import { GradientHeader } from "@/components/gradient-header"
import { CtaButton } from "@/components/cta-button"
import { buildMetadataFromPage } from "@/lib/seo"
import { BreadcrumbSchema } from "@/components/json-ld"

import {
  Dumbbell,
  Utensils,
  PiggyBank,
  Plane,
  Tv,
  Headphones,
} from "lucide-react"

import { FAQSchema } from "@/components/json-ld"

import connectDB from "@/lib/mongodb"
import Page from "@/models/page"
import { mergePageData } from "@/lib/data-utils";
import { DEFAULT_HOLISTIC_CONCIERGE_DATA } from "@/lib/defaults";

async function getPageData() {
  await connectDB();
  const page = await Page.findOne({ slug: "holistic-concierge" }).lean();
  return mergePageData(page, DEFAULT_HOLISTIC_CONCIERGE_DATA);
}

export async function generateMetadata() {
  const page = await getPageData();
  return buildMetadataFromPage(page, "/holistic-concierge");
}

export default async function HolisticConciergePage() {
  const pageData = await getPageData();
  const content = pageData.content.holisticConcierge!;
  const faqs = pageData.seo.faqs || [];

  const getIcon = (type: string) => {
    switch (type) {
      case "dumbbell": return <Dumbbell className="w-6 h-6" />;
      case "plane": return <Plane className="w-6 h-6" />;
      case "utensils": return <Utensils className="w-6 h-6" />;
      case "tv": return <Tv className="w-6 h-6" />;
      case "piggybank": return <PiggyBank className="w-6 h-6" />;
      case "headphones": return <Headphones className="w-6 h-6" />;
      default: return <Headphones className="w-6 h-6" />;
    }
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden pt-12">
      <BreadcrumbSchema items={[{ name: "Holistic Concierge", href: "/holistic-concierge" }]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Background */}
      <div className="absolute inset-x-0 top-0 z-0 h-[85vh]">
        <Image
          src={content.backgroundImage || "/foodsearvice.png"}
          alt="Concierge Services Background"
          fill
          className="object-cover opacity-90"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/90 via-[#05070a]/40 to-[#05070a]" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-24 relative z-10 flex flex-col items-center text-center">
        <div className="space-y-12 max-w-6xl mx-auto">
          {/* Main Header */}
          <div className="space-y-6">
            <GradientHeader tag="h1" size="lg" className="mb-4">
              {(content.title || "").split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < (content.title || "").split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </GradientHeader>
            <div className="space-y-6">
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4 whitespace-pre-line">
                {content.tagline}
              </h2>
            </div>
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 w-full max-w-5xl mx-auto text-left">
            {(content.services || []).map((service, idx) => (
              <ServiceCard
                key={idx}
                icon={getIcon(service.iconType)}
                title={service.title}
                desc={service.desc}
              />
            ))}
          </div>

          {/* CTA Section */}
          <div className="space-y-6 pt-6">
            <CtaButton href="/contact">
              {content.ctaText}
            </CtaButton>
          </div>
        </div>
      </div>
    </main>
  );
}

function ServiceCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-6 group p-6 rounded-2xl bg-[#0a0d12]/40 border border-white/5 hover:border-primary/40 hover:bg-[#0a0d12]/60 transition-all backdrop-blur-md shadow-xl">
      <div className="w-12 h-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="text-base md:text-lg font-black text-white tracking-tight leading-tight uppercase group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-white/60 text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}
