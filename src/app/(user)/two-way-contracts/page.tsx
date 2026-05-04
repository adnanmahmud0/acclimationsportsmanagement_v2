import Image from "next/image";
import React from "react";
import { GradientHeader } from "@/components/gradient-header";
import { CtaButton } from "@/components/cta-button";
import { buildMetadataFromPage } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/json-ld";

import connectDB from "@/lib/mongodb";
import Page from "@/models/page";
import { PageData } from "@/types/cms";

async function getPageData() {
  await connectDB();
  const page = await Page.findOne({ slug: "two-way-contracts" }).lean();
  return page as unknown as PageData | null;
}

export async function generateMetadata() {
  const page = await getPageData();
  return buildMetadataFromPage(page, "/two-way-contracts");
}

export default async function TwoWayContractsPage() {
  const pageData = await getPageData();

  const content = pageData?.content || {
    mainTitle: "NBA Two-Way Contracts \n 2025-26 / 2026-27: \n Rules, Salaries, and Fast Track",
    ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
    backgroundImage: "/auraplayer.png",
    subDescription: "Two-Way Contract Rules, Salary & Strategy",
    points: [
      { 
        title: "What Is a Two-Way Contract?", 
        items: ["Hybrid deal allowing players to split time between the NBA team and its G League affiliate while receiving occasional call-ups to the main roster."] 
      },
      { 
        title: "2025-26 / 2026-27 Key Rules", 
        items: [
          "May be active on either the NBA roster or inactive list.",
          "Unlimited travel days and G League assignments.",
          "Contract deal converted at any time from G League to NBA."
        ] 
      },
      { 
        title: "Salary Breakdown 2025-26", 
        items: ["$636,435", "2025-26 value (2026-27 will increase)"] 
      },
      { 
        title: "How Conversions Work", 
        items: ["UDFA or second-round pick", "Strong performance & call-ups", "Team converts to standard"] 
      }
    ]
  };


  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <BreadcrumbSchema items={[{ name: "Two-Way Contracts", href: "/two-way-contracts" }]} />
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 z-[-1] h-[85vh]">
          <Image
            src={content.backgroundImage || "/auraplayer.png"}
            alt="Two-Way Background"
            fill
            className="object-cover opacity-90 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/80 via-[#05070a]/40 to-[#05070a]" />
        </div>

        <div className="container mx-auto px-6 pt-32 pb-16 relative z-10">
          <div className="space-y-12">
            <div className="flex flex-col items-center text-center gap-12">
              <div className="space-y-8 max-w-5xl mx-auto">
                <GradientHeader tag="h1" size="lg" className="mb-4">
                  {(content.mainTitle || "").split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < (content.mainTitle || "").split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </GradientHeader>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logic Grid Section */}
      <div className="container mx-auto px-6 pb-24">
        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary text-center mb-8">
          {content.subDescription}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="glass-premium p-8 rounded-3xl border-primary/20 space-y-6">
            <h3 className="text-xl font-black text-white uppercase tracking-wider">
              {content.points?.[0]?.title}
            </h3>
            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
              <Image
                src="/baskatecoart.png"
                alt="Court"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-white/80 uppercase">
                  NBA x G League
                </span>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed font-medium">
              {content.points?.[0]?.items?.[0]}
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-premium p-8 rounded-3xl border-primary/20 space-y-6">
            <h3 className="text-xl font-black text-white uppercase tracking-wider">
              {content.points?.[1]?.title}
            </h3>
            <div className="space-y-4">
              {content.points?.[1]?.items?.map((rule, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-black flex-shrink-0 group-hover:bg-primary group-hover:text-black transition-colors">
                    {idx + 1}
                  </div>
                  <p className="text-base text-white/90 leading-snug font-medium pt-1">
                    {rule}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-premium p-8 rounded-3xl border-primary/20 space-y-6">
            <h3 className="text-xl font-black text-white uppercase tracking-wider">
              {content.points?.[2]?.title}
            </h3>
            <div className="space-y-6">
              <p className="text-xs text-white/50 uppercase font-black tracking-widest">
                Total Value
              </p>
              <div className="text-5xl font-black text-primary drop-shadow-[0_0_15px_rgba(0,210,255,0.4)]">
                {content.points?.[2]?.items?.[0]}
              </div>
              <p className="text-sm font-bold text-white/80 uppercase tracking-widest leading-relaxed pt-2">
                {content.points?.[2]?.items?.[1]}
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-white/40 uppercase tracking-widest">
                    <span>Higher NBA Days</span>
                    <span>Daily Rate G League</span>
                  </div>
                  <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden flex border border-white/5">
                    <div className="h-full bg-primary w-[70%] shadow-[0_0_10px_rgba(0,210,255,0.5)]" />
                    <div className="h-full bg-blue-600 w-[30%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="glass-premium p-8 rounded-3xl border-primary/20 space-y-6">
            <h3 className="text-xl font-black text-white uppercase tracking-wider">
              {content.points?.[3]?.title}
            </h3>
            <div className="flex flex-col gap-6">
              {content.points?.[3]?.items?.map((step: string, i: number) => (
                <div key={i} className="relative group">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-sm font-bold text-white/90 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all">
                    {step}
                  </div>
                  {i < (content.points?.[3]?.items?.length || 0) - 1 && (
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-primary/30 group-hover:text-primary transition-colors">
                      ↓
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center space-y-8 mt-12">
          <div className="flex flex-col items-center gap-4">
            <CtaButton href="/contact">
              {content.ctaText}
            </CtaButton>
          </div>
        </div>
      </div>
    </main>
  );
}
