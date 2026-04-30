import Image from "next/image";
import React from "react";
import { GradientHeader } from "@/components/gradient-header";
import { CtaButton } from "@/components/cta-button";
import { buildPageMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/json-ld";
import connectDB from "@/lib/mongodb";
import Page from "@/models/page";
import { PageData, MetricData, ServiceBoxData, HighlightData } from "@/types/cms";

async function getPageData() {
  await connectDB();
  const page = await Page.findOne({ slug: "personal-branding" }).lean();
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
  return buildPageMetadata("/personal-branding");
}

export default async function PersonalBrandingPage() {
  const pageData = await getPageData();
  
  const content = pageData?.content?.personalBranding || {
    title: "Turn Your Talent Into a \n Premium, Monetizable \n Economic Asset",
    tagline: "Personal Brand Development: the art of truly identifying the unique value, \n data-backed and scaling strategically and carefully, then to view the potential.",
    metrics: [
      { title: "Brand Equity", value: "$1.2M" },
      { title: "Social Reach", value: "2.4M" },
      { title: "Endorsement Value", value: "$850K" },
    ],
    services: [
      { title: "Personal Brand Strategy", desc: "Personal brand strategy to guarantee and optimize valuation and monetization." },
      { title: "Endorsement Deal", desc: "Endorsement negotiation and contract review sent to the highest value." },
      { title: "Media Training Programs", desc: "Media training programs to ensure you are ready and strategic and confident." },
    ],
    resultsTitle: "Personal Brand Strategy | Negotiation:",
    highlights: [
      { value: "$8.2M", label: "Average Uplift in \n Endorsement Value" },
      { value: "340%", label: "Brand \n Growth" },
    ]
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden flex flex-col pt-12">
      <BreadcrumbSchema items={[{ name: "Personal Branding", href: "/personal-branding" }]} />
      {/* Background Image */}
      <div className="absolute inset-0 z-[-1]">
        <Image
          src="/glove.png"
          alt="Personal Branding Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/60 via-[#05070a]/20 to-[#05070a]" />
      </div>

      <div className="container mx-auto px-6 pt-24 pb-24 relative z-10 flex flex-col items-center">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-8 md:mb-12">
          <GradientHeader tag="h1" size="lg" className="mb-4">
            {content.title.split('\n').map((line: string, i: number) => (
              <React.Fragment key={i}>
                {line}
                {i < content.title.split('\n').length - 1 && <br className="hidden md:block" />}
              </React.Fragment>
            ))}
          </GradientHeader>
          <p className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4 whitespace-pre-line">
            {content.tagline}
          </p>
        </div>

        {/* Central Visual Section - Mobile Optimized */}
        <div className="relative w-full max-w-5xl mb-12">
          {/* Mobile view: Stacked Data Points */}
          <div className="grid grid-cols-1 md:hidden gap-4 w-full">
            {content.metrics.map((m: MetricData, i: number) => (
              <DataPoint key={i} title={m.title} value={m.value} />
            ))}
          </div>

          <div className="hidden md:flex relative w-full aspect-[16/9] items-center justify-center">
            {content.metrics[0] && (
              <div className="absolute top-10 left-10 md:top-20 md:left-20 bg-[#0a0d12]/95 border border-primary/30 p-8 rounded-3xl backdrop-blur-xl shadow-2xl z-20">
                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
                  {content.metrics[0].title}
                </div>
                <div className="text-3xl font-black text-white">{content.metrics[0].value}</div>
              </div>
            )}

            {content.metrics[1] && (
              <div className="absolute top-1/2 -right-10 md:-right-20 -translate-y-1/2 bg-[#0a0d12]/95 border border-primary/30 p-8 rounded-3xl backdrop-blur-xl shadow-2xl z-20">
                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
                  {content.metrics[1].title}
                </div>
                <div className="text-3xl font-black text-white">{content.metrics[1].value}</div>
              </div>
            )}

            {content.metrics[2] && (
              <div className="absolute bottom-10 left-5 md:bottom-20 md:left-5 lg:-left-20 bg-[#0a0d12]/95 border border-primary/30 p-8 rounded-3xl backdrop-blur-xl shadow-2xl z-20">
                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
                  {content.metrics[2].title}
                </div>
                <div className="text-3xl font-black text-white">{content.metrics[2].value}</div>
              </div>
            )}
          </div>
        </div>

        {/* Info & Results Section */}
        <div className="w-full max-w-7xl space-y-12 bg-gradient-to-t from-[#05070a] via-[#05070a]/80 to-transparent p-8 md:p-12 rounded-[3rem] border border-white/5 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row gap-12 items-end">
            {/* Strategy Details */}
            <div className="flex-1 space-y-8">
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight drop-shadow-lg">
                {content.resultsTitle.split('|')[0]} |{" "}
                <span className="text-primary">{content.resultsTitle.split('|')[1]}</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {content.services.map((s: ServiceBoxData, i: number) => (
                  <ServiceBox key={i} title={s.title} desc={s.desc} />
                ))}
              </div>
            </div>

            {/* Results Highlight */}
            <div className="lg:w-1/3 space-y-6">
              <div className="flex justify-between items-center bg-white/10 border border-white/20 px-8 py-3 rounded-xl backdrop-blur-md">
                <span className="text-sm font-black text-white uppercase tracking-widest">
                  Potential Results
                </span>
                <span className="text-primary text-xl">→</span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {content.highlights.map((h: HighlightData, i: number) => (
                  <div key={i} className="bg-[#0a0d12]/95 border border-primary/20 p-8 rounded-2xl shadow-2xl">
                    <div className="text-4xl font-black text-white mb-2">
                      {h.value}
                    </div>
                    <div className="text-[10px] font-bold text-white/70 uppercase tracking-widest leading-relaxed whitespace-pre-line">
                      {h.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 w-full pb-12 flex flex-col items-center text-center">
          <CtaButton href="/contact">
            SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL
          </CtaButton>
        </div>
      </div>
    </main>
  );
}

function ServiceBox({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-[#0a0d12]/95 border border-white/10 p-8 rounded-2xl space-y-4 hover:border-primary/40 transition-all flex flex-col justify-between shadow-xl min-h-[160px]">
      <div className="space-y-4">
        <div className="flex gap-3 items-center">
          <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_rgba(0,210,255,1)]" />
          <h4 className="text-white font-black uppercase text-sm tracking-widest leading-tight">
            {title}
          </h4>
        </div>
        <p className="text-white/70 text-[10px] font-bold leading-relaxed uppercase tracking-wider">
          {desc}
        </p>
      </div>
    </div>
  );
}

function DataPoint({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-[#0a0d12]/95 border border-primary/30 p-5 rounded-2xl backdrop-blur-xl shadow-2xl flex justify-between items-center">
      <div className="text-xs font-bold text-primary uppercase tracking-widest">
        {title}
      </div>
      <div className="text-xl font-black text-white">{value}</div>
    </div>
  );
}
