import Image from "next/image";
import React from "react";
import { GradientHeader } from "@/components/gradient-header";
import { CtaButton } from "@/components/cta-button";
import { CircleDot, TrendingUp, Target, Mic, FileText } from "lucide-react";
import { buildMetadataFromPage } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/json-ld";
import connectDB from "@/lib/mongodb";
import Page from "@/models/page";
import { PageData } from "@/types/cms";

export const revalidate = 60;

async function getPageData() {
  try {
    await connectDB();
    const page = await Page.findOne({ slug: "pre-draft" }).lean();
    return page as unknown as PageData | null;
  } catch (error) {
    console.error("Error fetching Pre-Draft data:", error);
    return null;
  }
}

export async function generateMetadata() {
  const page = await getPageData();
  return buildMetadataFromPage(page, "/pre-draft");
}

export default async function PreDraftPage() {
  const pageData = await getPageData();

  // Static design fallback for parity
  const content = pageData?.content?.preDraft || {
    title: "Pre-Draft and NBA \n Combine Mastery",
    tagline: "Our Pre-Draft and NBA Combine Mastery program prepares elite prospects to rise on draft boards and enter the NBA with maximum value.",
    backgroundImage: "/baskateballplayer.png",
    ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
    points: [
      "PROFESSIONAL PLAYER VALUATION REPORT",
      "CUSTOMIZED NBA COMBINE TRAINING",
      "TARGETED WORKOUTS WITH NBA TEAMS",
      "MEDIA TRAINING & INTERVIEW PREP",
      "MEDICAL EVALUATION STRATEGY"
    ]
  };

  const getIcon = (idx: number) => {
    const icons = [
      <CircleDot key="circledot" className="w-8 h-8" />,
      <TrendingUp key="trendingup" className="w-8 h-8" />,
      <Target key="target" className="w-8 h-8" />,
      <Mic key="mic" className="w-8 h-8" />,
      <FileText key="filetext" className="w-8 h-8" />,
    ];
    return icons[idx % icons.length];
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden pt-12">
      <BreadcrumbSchema items={[{ name: "Pre-Draft Mastery", href: "/pre-draft" }]} />
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={content.backgroundImage || "/baskateballplayer.png"}
          alt="Pre-Draft Mastery Background"
          fill
          className="object-cover opacity-60 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/90 via-[#05070a]/40 to-[#05070a]" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-24 relative z-10 flex flex-col items-center text-center">
        <div className="space-y-16 max-w-6xl mx-auto">
          {/* Main Header */}
          <div className="space-y-8">
            <GradientHeader tag="h1" size="lg" className="mb-4">
              {(content.title || "").split('\n').map((line, i) => (
                <React.Fragment key={i}>{line}{i < (content.title || "").split('\n').length - 1 && <br />}</React.Fragment>
              ))}
            </GradientHeader>
            <p className="text-sm font-bold tracking-[0.4em] uppercase text-white/50 mb-4 max-w-4xl mx-auto leading-relaxed">
              {content.tagline}
            </p>
          </div>

          {/* Mastery Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12 w-full max-w-7xl mx-auto text-left">
            {content.points?.map((point, idx) => (
              <div key={idx} className="flex flex-col gap-8 group p-10 rounded-[2.5rem] bg-[#0a0d12]/60 border border-white/5 hover:border-primary/40 hover:bg-[#0a0d12]/80 transition-all backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] -mr-16 -mt-16 rounded-full group-hover:bg-primary/10 transition-all duration-500" />
                
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all shadow-xl">
                  {getIcon(idx)}
                </div>
                
                <div className="space-y-4 relative z-10">
                  <h4 className="text-lg md:text-xl font-black text-white tracking-tight leading-tight uppercase group-hover:text-primary transition-colors">
                    {point}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="pt-8">
            <CtaButton href="/contact">
              {content.ctaText}
            </CtaButton>
          </div>
        </div>
      </div>
    </main>
  );
}
