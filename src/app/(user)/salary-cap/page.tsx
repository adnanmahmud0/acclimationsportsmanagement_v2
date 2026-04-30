import Image from "next/image";
import React from "react";
import { GradientHeader } from "@/components/gradient-header";
import { CtaButton } from "@/components/cta-button";
import { buildPageMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/json-ld";
import connectDB from "@/lib/mongodb";
import Page from "@/models/page";
import { PageData } from "@/types/cms";

async function getPageData() {
  await connectDB();
  const page = await Page.findOne({ slug: "salary-cap" }).lean();
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
  return buildPageMetadata("/salary-cap");
}

export default async function SalaryCapPage() {
  const pageData = await getPageData();
  
  const content = pageData?.content?.salaryCap || {
    title: "Master the Salary Cap. \n Maximize Every Dollar.",
    subtitle: "Proprietary analytical models and expert salary cap strategy that put more money in your pocket. We deliver precise, real-time salary cap modeling and data-driven strategies to optimize every contract.",
    engineTitle: "The Acclimation Salary Cap Engine",
    cardTitles: [
      "Live Salary Cap Forecasting",
      "Luxury Tax Stress Testing",
      "Endorsement & NIL Valuation",
      "Contract Optimization Simulator"
    ],
    points: [
      "In-house salary cap & luxury tax forecasts",
      "Custom analytical projections",
      "Bird Rights and exception optimization",
      "Trade scenario analysis"
    ],
    ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL"
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#05070a] text-white">
      <BreadcrumbSchema items={[{ name: "Salary Cap Analytics", href: "/salary-cap" }]} />
      {/* Hero Background */}
      <div className="absolute inset-x-0 top-0 h-[85vh]">
        <Image
          src="/graph.png"
          alt="Salary Cap Analysis Background"
          fill
          className="object-cover opacity-100"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/60 via-[#05070a]/20 to-[#05070a]" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-24 relative z-10 flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center space-y-6 max-w-5xl mx-auto mb-16">
          <GradientHeader tag="h1" size="lg" className="mb-4 text-center">
            {content.title.split('\n').map((line: string, i: number) => (
              <React.Fragment key={i}>
                {line}
                {i < content.title.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </GradientHeader>
          <p className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4 whitespace-pre-line">
            {content.subtitle}
          </p>
        </div>

        {/* Engine Section */}
        <div className="w-full max-w-7xl space-y-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 text-primary">
              <div className="h-[1px] w-12 bg-primary/30" />
              <span className="text-sm font-black uppercase tracking-[0.4em]">
                {content.engineTitle}
              </span>
              <div className="h-[1px] w-12 bg-primary/30" />
            </div>
            <div className="w-8 h-8 mx-auto relative opacity-40">
              <div className="absolute inset-0 border-2 border-primary rounded-full animate-ping" />
              <div className="relative w-full h-full bg-primary rounded-full blur-[2px]" />
            </div>
          </div>

          {/* Engine Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <EngineCard title={content.cardTitles[0] || "Live Salary Cap Forecasting"}>
              <div className="space-y-4">
                <div className="text-xs font-bold text-white/30 uppercase tracking-widest leading-none">
                  Premium Growth
                </div>
                <div className="text-2xl font-black text-white">
                  $2.1M / $1.8M
                </div>
                <div className="h-10 flex items-end gap-1">
                  <div className="flex-1 bg-primary/20 h-[40%] rounded-sm" />
                  <div className="flex-1 bg-primary/20 h-[60%] rounded-sm" />
                  <div className="flex-1 bg-primary/20 h-[50%] rounded-sm" />
                  <div className="flex-1 bg-primary h-full rounded-sm shadow-[0_0_10px_rgba(0,210,255,0.5)]" />
                </div>
              </div>
            </EngineCard>

            <EngineCard title={content.cardTitles[1] || "Luxury Tax Stress Testing"}>
              <div className="space-y-4">
                <div className="flex justify-between items-end h-20 gap-2 px-2">
                  <div className="w-3 bg-purple-500/80 h-full rounded-t-sm" />
                  <div className="w-3 bg-white/10 h-[40%] rounded-t-sm" />
                  <div className="w-3 bg-[#00d2ff] h-[70%] rounded-t-sm shadow-[0_0_15px_rgba(0,210,255,0.3)]" />
                  <div className="w-3 bg-white/10 h-[90%] rounded-t-sm" />
                  <div className="w-3 bg-white/10 h-[55%] rounded-t-sm" />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-white/20 uppercase tracking-widest px-1">
                  <span>Base</span>
                  <span>Scen 1</span>
                  <span>Scen 2</span>
                  <span>Tax</span>
                </div>
              </div>
            </EngineCard>

            <EngineCard title={content.cardTitles[2] || "Endorsement & NIL Valuation"}>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                  <span className="text-white/30">Value Uplift</span>
                  <span className="text-primary">+120%</span>
                </div>
                <div className="bg-[#0a0d12]/60 p-4 rounded-xl border border-white/5 space-y-1">
                  <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-none">
                    Personal Brand Delta
                  </div>
                  <div className="text-xl font-black text-white">
                    $2.1M / $1.2M
                  </div>
                </div>
              </div>
            </EngineCard>

            <EngineCard title={content.cardTitles[3] || "Contract Optimization Simulator"}>
              <div className="h-28 relative pt-4">
                <svg
                  viewBox="0 0 200 100"
                  className="w-full h-full stroke-primary fill-none stroke-2"
                >
                  <path
                    d="M0,80 Q50,70 100,40 T200,10"
                    className="opacity-40"
                  />
                  <path
                    d="M0,90 Q50,85 100,50 T200,20"
                    className="stroke-white/10"
                  />
                  <circle cx="100" cy="40" r="4" className="fill-primary" />
                  <circle
                    cx="100"
                    cy="40"
                    r="8"
                    className="fill-primary/20 animate-pulse"
                  />
                </svg>
                <div className="absolute top-2 left-0 text-xs font-black text-white/30 tracking-[0.3em] uppercase">
                  Value Projection
                </div>
              </div>
            </EngineCard>
          </div>

          {/* List Section */}
          <div className="pt-12 ">
            <div className="flex flex-col justify-center items-center">
              {content.points.map((point: string, i: number) => (
                <div key={i} className="flex gap-4 items-center group">
                  <p className="text-sm font-bold text-white/70 uppercase tracking-widest leading-tight">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center order-1 md:order-2">
              <CtaButton href="/contact">
                {content.ctaText}
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function EngineCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-premium p-6 rounded-2xl border-white/10 hover:border-primary/40 transition-all group min-h-[180px] flex flex-col justify-between">
      <h3 className="text-sm font-black text-white uppercase tracking-widest leading-tight mb-6">
        {title}
      </h3>
      {children}
    </div>
  );
}
