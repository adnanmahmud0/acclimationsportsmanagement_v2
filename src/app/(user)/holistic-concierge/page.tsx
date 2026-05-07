import Image from "next/image";
import React from "react";
import { GradientHeader } from "@/components/gradient-header";
import { CtaButton } from "@/components/cta-button";
import { Dumbbell, Utensils, PiggyBank, Plane, Tv, Headphones } from "lucide-react";
import { buildMetadataFromPage } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/json-ld";
import connectDB from "@/lib/mongodb";
import Page from "@/models/page";
import { PageData } from "@/types/cms";

export const dynamic = "force-dynamic";

async function getPageData() {
  try {
    await connectDB();
    const page = await Page.findOne({ slug: "holistic-concierge" }).lean();
    return page as unknown as PageData | null;
  } catch (error) {
    console.error("Error fetching Holistic Concierge data:", error);
    return null;
  }
}

export async function generateMetadata() {
  const page = await getPageData();
  return buildMetadataFromPage(page, "/holistic-concierge");
}

export default async function HolisticConciergePage() {
  const pageData = await getPageData();

  // Static design fallback for parity
  const content = pageData?.content?.holisticConcierge || {
    title: "One-Stop Holistic \n Concierge Support",
    tagline: "We manage your entire off-court world so you can | focus only on dominating the game.",
    backgroundImage: "/foodsearvice.png",
    ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
    services: [
      { iconType: "dumbbell", title: "Elite Physical Training", desc: "Access to world-class trainers and state-of-the-art facilities to optimize your performance." },
      { iconType: "plane", title: "Luxury Travel", desc: "Private jet charters and VIP logistics for seamless travel." },
      { iconType: "utensils", title: "Gourmet Nutrition", desc: "Personal chefs crafting meals tailored to your diet and training schedule." },
      { iconType: "tv", title: "Media & Brand Management", desc: "Strategic media training and brand partnerships to build your empire." },
      { iconType: "piggybank", title: "Wealth Management", desc: "Expert financial advisors ensuring your money grows and lasts." },
      { iconType: "headphones", title: "24/7 Concierge", desc: "Round-the-clock support for any request, anytime, anywhere." },
    ]
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <BreadcrumbSchema items={[{ name: "Holistic Concierge", href: "/holistic-concierge" }]} />
      
      {/* Hero Section with Fixed Height Background */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-0 h-[85vh]">
          <Image
            src={content.backgroundImage || "/foodsearvice.png"}
            alt="Holistic Concierge Background"
            fill
            className="object-cover opacity-90 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/95 via-[#05070a]/60 to-[#05070a]" />
        </div>

        <div className="container mx-auto px-6 pt-32 pb-24 relative z-10 flex flex-col items-center text-center">
          <div className="space-y-12 max-w-6xl mx-auto">
            {/* Main Header */}
            <div className="space-y-8">
              <GradientHeader tag="h1" size="lg" className="mb-4">
                {(content.title || "").split('\n').map((line, i) => (
                  <React.Fragment key={i}>{line}{i < (content.title || "").split('\n').length - 1 && <br />}</React.Fragment>
                ))}
              </GradientHeader>
              
              <h2 className="text-sm font-bold tracking-[0.4em] uppercase text-white/50 mb-4 max-w-4xl mx-auto leading-relaxed">
                {content.tagline?.includes('|') ? (
                  <>
                    {content.tagline.split('|')[0]}
                    <br className="hidden md:block" />
                    <span className="text-primary">
                      {content.tagline.split('|')[1]}
                    </span>
                  </>
                ) : (
                  content.tagline
                )}
              </h2>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12 w-full max-w-7xl mx-auto text-left">
              {content.services?.map((service, idx) => (
                <ServiceCard
                  key={idx}
                  icon={getIcon(service.iconType)}
                  title={service.title}
                  desc={service.desc}
                />
              ))}
            </div>

            {/* CTA Section */}
            <div className="pt-12">
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

function getIcon(type: string) {
  switch (type) {
    case "dumbbell": return <Dumbbell className="w-8 h-8" />;
    case "plane": return <Plane className="w-8 h-8" />;
    case "utensils": return <Utensils className="w-8 h-8" />;
    case "tv": return <Tv className="w-8 h-8" />;
    case "piggybank": return <PiggyBank className="w-8 h-8" />;
    case "headphones": return <Headphones className="w-8 h-8" />;
    default: return <Headphones className="w-8 h-8" />;
  }
}

function ServiceCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string; }) {
  return (
    <div className="flex flex-col gap-8 group p-10 rounded-[2.5rem] bg-[#0a0d12]/60 border border-white/5 hover:border-primary/40 hover:bg-[#0a0d12]/80 transition-all backdrop-blur-xl shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] -mr-16 -mt-16 rounded-full group-hover:bg-primary/10 transition-all duration-500" />
      
      <div className="w-16 h-16 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all shadow-xl">
        {icon}
      </div>
      
      <div className="space-y-4 relative z-10">
        <h4 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight uppercase group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-white/50 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}
