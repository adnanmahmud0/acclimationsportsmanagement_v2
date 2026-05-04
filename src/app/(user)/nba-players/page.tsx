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
    mainTitle: "Elite Advocacy for the \n Active NBA Professional",
    subDescription: "Maximum Leverage • Data-Backed Strategy • Global Branding",
    description: "You've made it to the league. Now, we make sure you stay on top and maximize every second of your professional window. From aggressive contract negotiation to global brand scaling, we provide the elite infrastructure required by the modern NBA star.",
    ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
    backgroundImage: "/ground.png",
    points: [
      { title: "Aggressive Contract Negotiation", items: ["Utilizing proprietary salary cap models to secure maximum guaranteed money and optimized incentives."] },
      { title: "Global Brand Monetization", items: ["Scaling your personal brand into a global economic asset with high-value endorsement deals."] },
      { title: "Holistic Concierge Support", items: ["Private chefs, elite trainers, luxury travel coordination, and 24/7 personal security."] },
      { title: "Long-Term Wealth Strategy", items: ["Coordinating with world-class financial advisors to ensure your NBA earnings last a lifetime."] },
    ],
    stats: [
      { label: "Contract Value Managed", value: "$420M+" },
      { label: "Average Deal Uplift", value: "24%" },
      { label: "Global Brand Reach", value: "12M+" },
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
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/80 via-[#05070a]/40 to-[#05070a]" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-24 relative z-10 flex flex-col items-center text-center">
        <div className="space-y-12 max-w-6xl mx-auto">
          {/* Header Content */}
          <div className="space-y-6">
            <GradientHeader tag="h1" size="lg" className="mb-4">
              {(content.mainTitle || "").split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < (content.mainTitle || "").split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </GradientHeader>
            <p className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4">
              {content.subDescription}
            </p>
            <p className="md:text-lg text-white/80 font-medium leading-relaxed max-w-4xl mx-auto">
              {content.description}
            </p>
          </div>

          {/* Core Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            {content.points?.map((service, idx) => (
              <div
                key={idx}
                className="group relative p-10 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-primary/20 transition-all duration-500 text-left"
              >
                <div className="absolute top-8 right-8 text-white/10 group-hover:text-primary/20 transition-colors">
                  <span className="text-4xl font-black">0{idx + 1}</span>
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-widest mb-4">
                  {service.title}
                </h3>
                <p className="text-sm font-bold text-white/40 uppercase tracking-widest leading-relaxed">
                  {service.items?.[0] || ""}
                </p>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="pt-12">
            <div className="glass-premium rounded-[2.5rem] p-10 flex flex-wrap justify-center gap-12 md:gap-24 border-white/5">
              {content.stats?.map((stat, idx) => (
                <div key={idx} className="space-y-2">
                  <p className="text-3xl md:text-5xl font-black text-white">
                    {stat.value}
                  </p>
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-12">
            <CtaButton href="/contact" className="w-full max-w-4xl">
              {content.ctaText}
            </CtaButton>
          </div>
        </div>
      </div>
    </main>
  );
}
