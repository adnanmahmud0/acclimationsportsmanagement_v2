import Image from "next/image";
import React from "react";
import { GradientHeader } from "@/components/gradient-header";
import { CtaButton } from "@/components/cta-button";
import { buildMetadataFromPage } from "@/lib/seo";
import { BreadcrumbSchema, FAQSchema } from "@/components/json-ld";
import connectDB from "@/lib/mongodb";
import Page from "@/models/page";
import { PageData, ProcessStep } from "@/types/cms";

async function getPageData() {
  await connectDB();
  const page = await Page.findOne({ slug: "contract-negotiation" }).lean();
  return page as unknown as PageData | null;
}

export async function generateMetadata() {
  const page = await getPageData();
  return buildMetadataFromPage(page, "/contract-negotiation");
}

export default async function ContractNegotiationPage() {
  const pageData = await getPageData();
  
  const content = pageData?.content || {
    mainTitle: "NBA Contract Negotiation and \n Representation",
    subDescription: "Data-driven contract deals with proprietary in-house salary-cap models. Expert representation that maximizes guaranteed money, incentives, and long-term player for active NBA players, college prospects, and elite high-school talent.",
    points: [
      { title: "Salary Cap Mastery & Analytical Modeling", items: [] },
      { title: "Rookie Scale & Veteran Extension Negotiation", items: [] },
      { title: "Multi-Team Bidding War Strategy", items: [] },
      { title: "Full CBA Compliance & Contract Structuring", items: [] },
      { title: "Pre-Draft & Combine Contract Positioning", items: [] },
    ],
    processSteps: [
      { step: 1, title: "Maximum", subtitle: "Guaranteed Money" },
      { step: 2, title: "Performance", subtitle: "Incentives & Escalators" },
      { step: 3, title: "Trade & Buyout", subtitle: "Negotiation" },
      { step: 4, title: "Post-Contract", subtitle: "Wealth Coordination" },
    ],
    ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
    backgroundImage: "/effect.png"
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden pt-12">
      <BreadcrumbSchema items={[{ name: "Contract Negotiation", href: "/contract-negotiation" }]} />
      {pageData?.seo?.faqs && <FAQSchema faqs={pageData.seo.faqs} />}
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={content.backgroundImage || "/effect.png"}
          alt="Contract Negotiation Background"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/90 via-transparent to-[#05070a]" />
      </div>

      <div className="container mx-auto px-6 pt-24 relative z-10 flex flex-col items-center ">
        <div className="space-y-8 max-w-5xl mx-auto text-center">
          <GradientHeader tag="h1" size="lg" className="mb-4 text-center">
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

          <div className="flex flex-col md:flex-row">
            <ul className="text-left">
              {content.points?.map((point: { title: string; items: string[] }, i: number) => (
                <li
                  key={i}
                  className="flex items-center gap-4 text-white/80 group"
                >
                  <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(0,210,255,1)] group-hover:scale-125 transition-transform" />
                  <span className="text-base md:text-lg font-bold tracking-tight">
                    {point.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="container mx-auto px-6 pb-24 relative z-10">
        <div className="space-y-20">
          {/* Horizontal Timeline */}
          <div className="relative pt-12">
            <h2 className="text-center text-sm font-black uppercase tracking-[0.4em] text-primary mb-10">
              Our Negotiation Process
            </h2>
            {/* Connecting Line */}
            <div className="absolute top-[4.5rem] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
              {content.processSteps?.map((item: ProcessStep) => (
                <div
                  key={item.step}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#0a0d12] border border-primary/40 flex items-center justify-center font-black text-primary mb-6 group-hover:bg-primary group-hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,210,255,0.2)]">
                    {item.step}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-white text-sm font-black uppercase tracking-widest">
                      {item.title}
                    </h3>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-8">
            <CtaButton href="/contact" fullWidth className="max-w-4xl">
              {content.ctaText}
            </CtaButton>
          </div>
        </div>
      </div>
    </main>
  );
}
