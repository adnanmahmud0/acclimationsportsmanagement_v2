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

import { FAQSchema } from "@/components/json-ld";

export default async function PreDraftPage() {
  const pageData = await getPageData();

  // Static design fallback for parity
  const content = pageData?.content?.preDraft || {
    title: "Pre-Draft and NBA \n Combine Mastery",
    tagline: "Our Pre-Draft and NBA Combine Mastery program prepares elite high school and college basketball prospects to rise on draft boards and enter the NBA with maximum value.",
    backgroundImage: "/baskateballplayer.png",
    ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
    points: [
      "PROFESSIONAL PLAYER VALUATION AND DRAFT PROJECTION REPORT",
      "CUSTOMIZED NBA COMBINE AND PRO DAY TRAINING WITH TOP COACHES",
      "TARGETED WORKOUTS WITH NBA TEAMS THAT NEED YOUR SKILL SET",
      "MEDIA TRAINING, INTERVIEW PREPARATION, AND PERSONAL BRANDING",
      "SEAMLESS TRANSITION INTO AGGRESSIVE ROOKIE CONTRACT NEGOTIATION"
    ]
  };

  const getIcon = (idx: number) => {
    const icons = [
      <CircleDot key="circledot" className="w-6 h-6 text-primary" />,
      <TrendingUp key="trendingup" className="w-6 h-6 text-primary" />,
      <Target key="target" className="w-6 h-6 text-primary" />,
      <Mic key="mic" className="w-6 h-6 text-primary" />,
      <FileText key="filetext" className="w-6 h-6 text-primary" />,
    ];
    return icons[idx % icons.length];
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden pt-12 bg-[#05070a]">
      <BreadcrumbSchema items={[{ name: "Pre-Draft Mastery", href: "/pre-draft" }]} />
      <FAQSchema faqs={[
        { question: "What does NBA Combine preparation include?", answer: "Our Pre-Draft Mastery program includes player valuation reports, customized NBA Combine training with top coaches, targeted workouts with NBA teams, media and interview preparation, and seamless transition into rookie contract negotiation." },
        { question: "How do you prepare prospects for the NBA Draft?", answer: "We provide professional player valuation and draft projection reports, customized combine training, targeted workouts, media training, and aggressive rookie contract negotiation planning." },
      ]} />
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={content.backgroundImage || "/baskateballplayer.png"}
          alt="Pre-Draft Mastery Background"
          fill
          className="object-cover opacity-60"
          sizes="100vw"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/60 via-[#05070a]/20 to-[#05070a]" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-24 relative z-10 flex flex-col items-center">
        <div className="space-y-16 max-w-6xl mx-auto text-center">
          {/* Main Header */}
          <div className="space-y-6">
            <GradientHeader tag="h1" size="lg" className="mb-4">
              {(content.title || "").split('\n').map((line, i) => (
                <React.Fragment key={i}>{line}{i < (content.title || "").split('\n').length - 1 && <br />}</React.Fragment>
              ))}
            </GradientHeader>
            <p className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4 max-w-4xl mx-auto leading-relaxed">
              {content.tagline}
            </p>
          </div>

          {/* Mastery Points List */}
          <div className="pt-12 flex justify-center w-full">
            <ul className="space-y-8 max-w-4xl text-left w-full">
              {content.points?.map((point, idx) => (
                <PointItem
                  key={idx}
                  icon={getIcon(idx)}
                  text={point}
                />
              ))}
            </ul>
          </div>

          {/* CTA Section */}
          <div className="text-center pt-8">
            <CtaButton href="/contact">
              {content.ctaText}
            </CtaButton>
          </div>
        </div>
      </div>
    </main>
  );
}

function PointItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-center gap-6 group">
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/40 transition-all shadow-xl">
        {icon}
      </div>
      <span className="text-base md:text-lg font-bold text-white tracking-tight leading-tight uppercase">
        {text}
      </span>
    </li>
  );
}

