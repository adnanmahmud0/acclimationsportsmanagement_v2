import React from "react";
import Image from "next/image";
import { GradientHeader } from "@/components/gradient-header";
import { CtaButton } from "@/components/cta-button";
import { buildPageMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/json-ld";

import connectDB from "@/lib/mongodb";
import Page from "@/models/page";
import { PageData } from "@/types/cms";

async function getPageData() {
  await connectDB();
  const page = await Page.findOne({ slug: "g-league-elite" }).lean();
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
  return buildPageMetadata("/g-league-elite");
}

export default async function GLeagueElitePage() {
  const pageData = await getPageData();

  const content = pageData?.content || {
    mainTitle: "NBA G League 2025-26: \n Rules, Salaries, and the Fast Track \n from Prospects to the NBA",
    ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
    backgroundImage: "/analitic.png",
    stats: [
      { label: "Teams", value: "31" },
      { label: "Games", value: "50+" },
      { label: "Tip-Off", value: "Tournament" },
      { label: "Active Roster", value: "12-13" },
      { label: "Standard Salary", value: "$45,000" },
    ],
    points: [
      { 
        title: "What Is the NBA G League?", 
        items: ["The official developmental league of the NBA — a high-level proving ground where young talent gains experience, competes against future NBA players, and earns direct call-up opportunities."] 
      },
      { 
        title: "2025-26 / 2026-27 Key Rules & Roster", 
        items: [
          "31 Teams (30 single-affiliated + 1 independent)",
          "50+ Game Season (Tip-Off Tournament + Regular Season)",
          "Active Roster: 12-13 players; Affiliate Players: Up to 5"
        ] 
      },
      { 
        title: "G League Salaries Breakdown 2025-26", 
        items: ["$45,000", "+ Standard Player Salary: $45,000 + Enhanced minimum available"] 
      },
      { 
        title: "How the G League Leads to the NBA", 
        items: ["Strong performance", "Call-ups", "Two-Way conversions", "Standard NBA deals"] 
      }
    ]
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <BreadcrumbSchema items={[{ name: "G League Elite", href: "/g-league-elite" }]} />
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 z-[-1] h-[85vh]">
          <Image
            src={content.backgroundImage || "/analitic.png"}
            alt="G League Background"
            fill
            className="object-cover opacity-90 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/80 via-[#05070a]/40 to-[#05070a]" />
        </div>

        <div className="container mx-auto px-6 pt-32 pb-16 relative z-10">
          <div className="space-y-12">
            {/* Hero Content Section */}
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

      {/* Grid Content Section */}
      <div className="container mx-auto px-6 pb-24">
        <div className="space-y-12">
          {/* Season at a Glance Bar */}
          {content.stats && content.stats.length > 0 && (
            <div className="glass-premium rounded-2xl md:rounded-full px-8 py-6 flex flex-wrap justify-between items-center gap-8 border-primary/20 shadow-2xl">
              <div className="flex flex-col">
                <span className="text-xs font-black text-primary uppercase tracking-widest">
                  2025-26 G League
                </span>
                <span className="text-lg font-bold text-white uppercase">
                  Season at a Glance
                </span>
              </div>

              {content.stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-2xl font-black text-white">{stat.value}</span>
                  <span className="text-xs font-bold text-white/40 uppercase tracking-widest">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary text-center mb-6">
            G League Breakdown &amp; Benefits
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="glass-premium p-8 rounded-3xl border-primary/20 space-y-6">
              <h3 className="text-xl font-black text-white uppercase tracking-wider">
                {content.points?.[0]?.title}
              </h3>
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center gap-6">
                <div className="relative w-12 h-12">
                  <div className="w-full h-full rounded bg-primary/20 flex items-center justify-center font-black text-primary">
                    NBA
                  </div>
                </div>
                <div className="text-2xl text-white/20">×</div>
                <div className="relative w-12 h-12">
                  <div className="w-full h-full rounded bg-purple-500/20 flex items-center justify-center font-black text-purple-500 text-xl">
                    G
                  </div>
                </div>
              </div>
              <p className="text-sm text-white/70 leading-relaxed font-medium pt-2">
                {content.points?.[0]?.items?.[0]}
              </p>
            </div>

            {/* Card 2 */}
            <div className="glass-premium p-8 rounded-3xl border-primary/20 space-y-6 text-white/80">
              <h3 className="text-xl font-black text-white uppercase tracking-wider leading-tight">
                {content.points?.[1]?.title}
              </h3>
              <ul className="space-y-4">
                {content.points?.[1]?.items?.map((rule, i) => (
                  <li key={i} className="flex gap-4 items-start group">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <p className="text-sm leading-snug font-medium">{rule}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 3 */}
            <div className="glass-premium p-8 rounded-3xl border-primary/20 space-y-6">
              <h3 className="text-xl font-black text-white uppercase tracking-wider leading-tight">
                {content.points?.[2]?.title}
              </h3>
              <div className="space-y-6">
                <div className="text-5xl font-black text-primary drop-shadow-[0_0_15px_rgba(0,210,255,0.4)]">
                  {content.points?.[2]?.items?.[0]}
                </div>
                <div className="space-y-4 pt-4">
                  <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden flex border border-white/5">
                    <div className="h-full bg-primary w-[40%] shadow-[0_0_10px_rgba(0,210,255,0.5)]" />
                    <div className="h-full bg-purple-600 w-[60%]" />
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white/90 uppercase tracking-widest">
                    <span>Base Salary</span>
                    <span>Performance Uplift</span>
                  </div>
                </div>
                <p className="text-base text-white/90 leading-relaxed font-bold pt-4">
                  {content.points?.[2]?.items?.[1]}
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="glass-premium p-8 rounded-3xl border-primary/20 space-y-6">
              <h3 className="text-xl font-black text-white uppercase tracking-wider leading-tight">
                {content.points?.[3]?.title}
              </h3>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 text-base font-bold text-white/90">
                  {content.points?.[3]?.items?.map((step: string, i: number) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex-1">
                        {step}
                      </div>
                      {i < (content.points?.[3]?.items?.length || 0) - 1 && (
                        <span className="text-primary/50 text-lg">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main CTA Section */}
          <div className="text-center space-y-8">
            <div className="flex flex-col items-center gap-4">
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
