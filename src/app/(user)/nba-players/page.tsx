import Image from "next/image";
import React from "react";
import { GradientHeader } from "@/components/gradient-header";
import { CtaButton } from "@/components/cta-button";
import { buildMetadataFromPage } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/json-ld";
export const revalidate = 3600;
import connectDB from "@/lib/mongodb";
import Page from "@/models/page";
import { PageData } from "@/types/cms";

async function getPageData() {
  await connectDB();
  const page = await Page.findOne({ slug: "nba-players" }).lean();
  return page as unknown as PageData | null;
}

export async function generateMetadata() {
  const page = await getPageData();
  return buildMetadataFromPage(page, "/nba-players");
}

export default async function NBAPlayersPage() {
  const pageData = await getPageData();

  const content = pageData?.content || {
    mainTitle: "Active NBA Players",
    subDescription: "Maximize Your Off-Court Value | and Build Real Wealth",
    description: "Your on-court talent opens doors. We turn that into serious money through world-class endorsements, smart branding, and strategic opportunities.",
    ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
    backgroundImage: "/ground.png",
    points: [
      { title: "Comprehensive audit of current contract & market standing.", items: [] },
      { title: "Proprietary salary cap modeling & leverage mapping.", items: [] },
      { title: "Aggressive negotiation and brand development.", items: [] },
      { title: "Full holistic concierge & wealth architecture.", items: [] },
    ],
    stats: [
      { label: "Direct connections to world-class brands and sponsors.", value: "1" },
      { label: "Proprietary tools to accurately value and maximize your endorsement deals.", value: "2" },
      { label: "Booking high-profile podcast appearances and media opportunities.", value: "3" },
      { label: "Professional publishing and promotion of your advanced statistics online.", value: "4" },
      { label: "Expert negotiation for your next contract extension.", value: "5" },
    ]
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden pt-12">
      <BreadcrumbSchema items={[{ name: "Active NBA Players", href: "/nba-players" }]} />
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={content.backgroundImage || "/ground.png"}
          alt="Active NBA Players Background"
          fill
          className="object-cover opacity-80"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/80 via-[#05070a]/40 to-[#05070a]" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-24 relative z-10 flex flex-col items-center text-center">
        <div className="space-y-12 max-w-6xl mx-auto">
          {/* Main Header */}
          <div className="space-y-6">
            <GradientHeader tag="h1" size="lg" className="mb-4">
              {content.mainTitle}
            </GradientHeader>
            <div className="space-y-6">
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4">
                {content.subDescription?.includes('|') ? (
                  <>
                    {content.subDescription.split('|')[0]}
                    <br className="hidden md:block" />
                    <span className="text-primary">
                      {content.subDescription.split('|')[1]}
                    </span>
                  </>
                ) : (
                  content.subDescription
                )}
              </h2>
              <p className="text-sm md:text-xl text-white/60 font-medium leading-relaxed max-w-4xl mx-auto">
                {content.description}
              </p>
            </div>
          </div>

          {/* What We Provide Timeline Section */}
          <div className="space-y-12 py-12">
            <div className="relative">
              <div className="flex items-center justify-center gap-4 text-primary">
                <div className="h-[1px] w-12 bg-primary/30" />
                <span className="text-sm font-black uppercase tracking-[0.4em]">
                  What We Provide
                </span>
                <div className="h-[1px] w-12 bg-primary/30" />
              </div>
            </div>

            {/* 5-Point Timeline Visual */}
            <div className="relative w-full max-w-7xl mx-auto pt-10 pb-20">
              {/* Connecting Line */}
              <div className="absolute top-[40px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden md:block" />

              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {(content.stats || []).map((stat: { label: string; value: string }, idx: number) => (
                  <TimelinePoint
                    key={idx}
                    number={stat.value || (idx + 1).toString()}
                    text={stat.label}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Transition Copy */}
          <div className="space-y-8">
            <h2 className="text-xl md:text-3xl font-black text-white leading-tight uppercase tracking-tight">
              {(content.transitionTitle || "Advanced Contract Architecture & \n Strategic Career Management").split('\n').map((line: string, i: number) => (
                <React.Fragment key={i}>{line}{i < (content.transitionTitle || "").split('\n').length - 1 && <br />}</React.Fragment>
              ))}
            </h2>
            <p className="text-sm md:text-lg text-white/50 font-medium leading-relaxed max-w-3xl mx-auto">
              {content.transitionDescription || "For the veteran or rising star, we provide litigation-grade representation, proprietary market analysis, and a holistic concierge system that handles everything off the court so you can dominate on it."}
            </p>
          </div>

          {/* CTA Section */}
          <div className="text-center space-y-8">
            <div className="flex flex-col items-center gap-6">
              <CtaButton href="/contact">
                {content.ctaText}
              </CtaButton>
            </div>
          </div>

          {/* Timeline/Process Section */}
          <div className="relative pt-12">
            {/* Connecting Line */}
            <div className="absolute top-[4.5rem] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden lg:block" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {(content.points || []).map((point: { title: string }, idx: number) => (
                <TimelinePoint
                  key={idx}
                  number={`0${idx + 1}`}
                  text={point.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function TimelinePoint({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex flex-col items-center space-y-6 group">
      <div className="w-14 h-14 rounded-full bg-[#0a0d12]/80 border border-primary/40 flex items-center justify-center font-black text-xl text-white group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all shadow-[0_0_20px_rgba(0,180,255,0.2)] relative z-10">
        {number}
      </div>
      <p className="text-base font-bold text-white/90 uppercase tracking-widest leading-relaxed px-4 group-hover:text-white transition-colors">
        {text}
      </p>
    </div>
  );
}
