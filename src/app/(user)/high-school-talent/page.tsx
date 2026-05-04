import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { GradientHeader } from "@/components/gradient-header";
import { CtaButton } from "@/components/cta-button";
import { buildPageMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/json-ld";

import connectDB from "@/lib/mongodb";
import Page from "@/models/page";
import { PageData } from "@/types/cms";

async function getPageData() {
  await connectDB();
  const page = await Page.findOne({ slug: "high-school-talent" }).lean();
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
  return buildPageMetadata("/high-school-talent");
}

export default async function HighSchoolTalentPage() {
  const pageData = await getPageData();

  const content = pageData?.content || {
    mainTitle: "From Elite High School to the NBA \n Start Building Your Professional Future Now",
    subDescription: "The Path to the Pros Begins Here",
    description: "Join the exclusive network of elite prospects who secured multi-million dollar NIL deals and direct NBA pathways before graduation. Our proprietary system turns high school talent into professional assets.",
    ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
    backgroundImage: "/player.png",
    tagline: "Acclimation Edge",
    points: [
      { title: "Early Representation Advantage", items: ["Secure multi-million dollar NIL deals before your peers even start their recruitment process."] },
      { title: "Direct NBA Pathway", items: ["Strategic connections to NBA scouts, front offices, and elite veteran agents."] },
      { title: "Proprietary Valuation", items: ["Maximize your market value with our exclusive NIL-to-NBA valuation algorithm."] },
      { title: "Family-Centric Strategy", items: ["Comprehensive guidance and concierge support for you and your entire family circle."] },
    ],
    stats: [
      { label: "Guaranteed Scout Introductions", value: "" },
      { label: "Exclusive NIL Contract Review", value: "" },
      { label: "24/7 Strategy & Concierge Support", value: "" },
      { label: "Elite Media & Interview Training", value: "" },
      { label: "College-to-Pro Multi-Year Transition", value: "" },
    ]
  };


  return (
    <main className="relative min-h-screen overflow-x-hidden pt-12">
      <BreadcrumbSchema items={[{ name: "Elite High School Talent", href: "/high-school-talent" }]} />
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={content.backgroundImage || "/player.png"}
          alt="High School Players Background"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/80 via-[#05070a]/50 to-[#05070a]" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-24 relative z-10 flex flex-col items-center">
        <div className="space-y-16 max-w-7xl mx-auto text-center">
          {/* Header Content */}
          <div className="space-y-8">
            <GradientHeader tag="h1" size="lg" className="mb-4">
              {(content.mainTitle || "").split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < (content.mainTitle || "").split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </GradientHeader>

            <div className="space-y-4">
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4">
                {content.subDescription}
              </h2>
              <p className="md:text-lg text-white/80 font-medium leading-relaxed max-w-4xl mx-auto">
                {content.description}
              </p>
            </div>
          </div>

          {/* Info Grid Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-16">
            {/* Why Choose Section */}
            <div className="space-y-10 text-left">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <div className="h-[1px] w-8 bg-primary/40" />
                  <span className="text-xs font-black uppercase tracking-[0.4em]">
                    {content.tagline}
                  </span>
                </div>
                <GradientHeader tag="h2" size="md">
                  Why Elite Prospects <br />
                  Choose Acclimation
                </GradientHeader>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.points?.map((point, i) => (
                  <ChoiceItem
                    key={i}
                    title={point.title}
                    desc={point.items?.[0] || ""}
                  />
                ))}
              </div>
            </div>

            {/* Key Benefits Section */}
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-[2.5rem] group-hover:bg-primary/10 transition-colors duration-700" />
              <div className="relative h-full space-y-10 text-left bg-white/[0.02] border border-white/5 p-10 md:p-12 rounded-[2.5rem] backdrop-blur-2xl shadow-2xl flex flex-col justify-between">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-white uppercase tracking-widest">
                      Key Benefits
                    </h3>
                    <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    </div>
                  </div>

                  <ul className="space-y-6">
                    {content.stats?.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-5 text-white/70 font-bold uppercase tracking-widest text-sm border-b border-white/[0.03] pb-6 last:border-0 hover:text-white transition-all duration-300 group/item"
                      >
                        <div className="w-2 h-2 rounded-full border border-primary/40 flex items-center justify-center group-hover/item:border-primary transition-colors">
                          <div className="w-1 h-1 rounded-full bg-primary/40 group-hover/item:bg-primary" />
                        </div>
                        {benefit.label}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <p className="text-xs font-black text-primary/40 uppercase tracking-[0.4em]">
                    Exclusive Entry • High Stakes Advocacy
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div className="pt-6 flex justify-center">
              <CtaButton href="/contact" className="w-full max-w-3xl">
                {content.ctaText}
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ChoiceItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="space-y-3 group p-6 rounded-2xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/[0.03] hover:border-primary/20 transition-all duration-500">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/5 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
          <CheckCircle2 className="w-4 h-4 text-primary group-hover:text-inherit" />
        </div>
        <h4 className="text-base font-black text-white uppercase tracking-widest leading-tight">
          {title}
        </h4>
      </div>
      <p className="text-sm font-bold text-white/50 uppercase tracking-widest leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
