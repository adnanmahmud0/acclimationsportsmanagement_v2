import Image from "next/image";
import React from "react";
import { GradientHeader } from "@/components/gradient-header";
import { CtaButton } from "@/components/cta-button";
import { buildMetadataFromPage } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/json-ld";
import connectDB from "@/lib/mongodb";
import Page from "@/models/page";
import { PageData } from "@/types/cms";

export const revalidate = 60;

async function getPageData() {
  try {
    await connectDB();
    const page = await Page.findOne({ slug: "contract-negotiation" }).lean();
    return page as unknown as PageData | null;
  } catch (error) {
    console.error("Error fetching Contract Negotiation data:", error);
    return null;
  }
}

export async function generateMetadata() {
  const page = await getPageData();
  return buildMetadataFromPage(page, "/contract-negotiation");
}

export default async function ContractNegotiationPage() {
  const pageData = await getPageData();

  // Static design fallback for parity
  const content = pageData?.content?.contractNegotiation || {
    mainTitle: "NBA Contract Negotiation and \n Representation",
    subDescription: "Data-driven contract deals with proprietary in-house salary-cap models. Expert representation that maximizes guaranteed money, incentives, and long-term player for active NBA players, college prospects, and elite high-school talent.",
    backgroundImage: "/effect.png",
    ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
    points: [
      { title: "Salary Cap Mastery & Analytical Modeling", items: [] },
      { title: "Rookie Scale & Veteran Extension Negotiation", items: [] },
      { title: "Multi-Team Bidding War Strategy", items: [] },
      { title: "Full CBA Compliance & Contract Structuring", items: [] },
      { title: "Pre-Draft & Combine Contract Positioning", items: [] },
    ],
    processTitle: "Our Negotiation Process",
    processSteps: [
      { step: 1, title: "Maximum", subtitle: "Guaranteed Money" },
      { step: 2, title: "Performance", subtitle: "Incentives & Escalators" },
      { step: 3, title: "Trade & Buyout", subtitle: "Negotiation" },
      { step: 4, title: "Post-Contract", subtitle: "Wealth Coordination" },
    ]
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden pt-12">
      <BreadcrumbSchema items={[{ name: "Contract Negotiation", href: "/contract-negotiation" }]} />
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={content.backgroundImage || "/effect.png"}
          alt="Contract Negotiation Background"
          fill
          className="object-cover opacity-30 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/95 via-[#05070a]/60 to-[#05070a]" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-24 relative z-10 flex flex-col items-center text-center">
        <div className="space-y-20 max-w-6xl mx-auto">
          {/* Main Header */}
          <div className="space-y-10">
            <GradientHeader tag="h1" size="lg" className="mb-4">
              {(content.mainTitle || "").split('\n').map((line, i) => (
                <React.Fragment key={i}>{line}{i < (content.mainTitle || "").split('\n').length - 1 && <br />}</React.Fragment>
              ))}
            </GradientHeader>
            <p className="text-base md:text-xl font-bold tracking-wide text-white/50 mb-4 max-w-4xl mx-auto leading-relaxed">
              {content.subDescription}
            </p>
            
            {/* Strategy Points List */}
            <div className="flex flex-col items-center pt-8">
              <ul className="text-left space-y-4">
                {content.points?.map((point, i) => (
                  <li key={i} className="flex items-center gap-6 text-white group">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_15px_rgba(0,210,255,1)] group-hover:scale-150 transition-all" />
                    <span className="text-xl md:text-2xl font-black tracking-tight uppercase group-hover:text-primary transition-colors">
                      {point.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Process Section */}
          <div className="space-y-16">
            <div className="relative">
              <div className="flex items-center justify-center gap-6 text-primary">
                <div className="h-[1px] w-20 bg-primary/30" />
                <span className="text-sm font-black uppercase tracking-[0.5em]">
                  {content.processTitle || "Our Negotiation Process"}
                </span>
                <div className="h-[1px] w-20 bg-primary/30" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
              {/* Connecting Line */}
              <div className="absolute top-10 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent hidden lg:block" />
              
              {content.processSteps?.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center space-y-6 group relative z-10">
                  <div className="w-20 h-20 rounded-full bg-[#0a0d12]/80 border border-primary/40 flex items-center justify-center font-black text-2xl text-white group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all shadow-[0_0_30px_rgba(0,180,255,0.2)]">
                    {item.step}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-white text-lg font-black uppercase tracking-widest group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="pt-12">
            <CtaButton href="/contact">
              {content.ctaText}
            </CtaButton>
          </div>
        </div>
      </div>
    </main>
  );
}
