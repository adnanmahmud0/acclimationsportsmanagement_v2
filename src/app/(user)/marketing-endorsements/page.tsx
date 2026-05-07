import Image from "next/image";
import React from "react";
import { GradientHeader } from "@/components/gradient-header";
import { CtaButton } from "@/components/cta-button";
import { BarChart3, Mic2, Handshake, Network, Trophy } from "lucide-react";
import { buildMetadataFromPage } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/json-ld";
import connectDB from "@/lib/mongodb";
import Page from "@/models/page";
import { PageData } from "@/types/cms";

export const dynamic = "force-dynamic";

async function getPageData() {
  try {
    await connectDB();
    const page = await Page.findOne({ slug: "marketing-endorsements" }).lean();
    return page as unknown as PageData | null;
  } catch (error) {
    console.error("Error fetching Marketing & Endorsements data:", error);
    return null;
  }
}

export async function generateMetadata() {
  const page = await getPageData();
  return buildMetadataFromPage(page, "/marketing-endorsements");
}

export default async function MarketingEndorsementsPage() {
  const pageData = await getPageData();

  // Static design fallback for parity
  const content = pageData?.content?.marketingEndorsements || {
    title: "Marketing and \n Endorsement Deals",
    tagline: "We build and monetize your personal brand so you earn maximum value from endorsements, sponsorships, and marketing opportunities.",
    backgroundImage: "/fullbuscatecoart.png",
    ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
    items: [
      { title: "Professional brand valuation", desc: "Analysis of market value", iconType: "chart" },
      { title: "Media training", desc: "Personal branding development", iconType: "mic" },
      { title: "Endorsement Negotiation", desc: "Strategic contract review", iconType: "handshake" },
      { title: "Network Access", desc: "Global brand connections", iconType: "network" },
    ],
    transitionQuote: "Whether you're chasing your first major shoe deal or expanding your brand, we make sure you're never undervalued.",
    readyHeading: "Ready to unlock your full potential?"
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden pt-12">
      <BreadcrumbSchema items={[{ name: "Marketing & Endorsements", href: "/marketing-endorsements" }]} />
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={content.backgroundImage || "/fullbuscatecoart.png"}
          alt="Marketing & Endorsements Background"
          fill
          className="object-cover opacity-80"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/90 via-[#05070a]/40 to-[#05070a]" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-24 relative z-10 flex flex-col items-center text-center">
        <div className="space-y-16 max-w-5xl mx-auto">
          {/* Main Header */}
          <div className="space-y-6">
            <GradientHeader tag="h1" size="lg" className="mb-4">
              {(content.title || "").split('\n').map((line, i) => (
                <React.Fragment key={i}>{line}{i < (content.title || "").split('\n').length - 1 && <br />}</React.Fragment>
              ))}
            </GradientHeader>
            <p className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4 whitespace-pre-line max-w-4xl mx-auto leading-relaxed">
              {content.tagline}
            </p>
          </div>

          {/* List Section */}
          <div className="flex flex-col items-center gap-10 py-8 w-full max-w-4xl mx-auto">
            <ul className="space-y-10 text-left w-full">
              {content.items?.map((item, i) => (
                <ListItem
                  key={i}
                  icon={getIcon(item.iconType)}
                  title={item.title}
                  desc={item.desc}
                />
              ))}
            </ul>
          </div>

          {/* Transition Copy */}
          <div className="space-y-8 max-w-4xl mx-auto">
            <p className="text-white/60 text-xl md:text-2xl font-bold tracking-wide leading-relaxed italic border-l-4 border-primary pl-8 text-left">
              &quot;{content.transitionQuote}&quot;
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter pt-4">
              {content.readyHeading}
            </h2>
          </div>

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

function getIcon(type: string) {
  switch (type) {
    case "chart": return <BarChart3 className="w-6 h-6 text-primary" />;
    case "mic": return <Mic2 className="w-6 h-6 text-primary" />;
    case "handshake": return <Handshake className="w-6 h-6 text-primary" />;
    case "network": return <Network className="w-6 h-6 text-primary" />;
    case "trophy": return <Trophy className="w-6 h-6 text-primary" />;
    default: return <Trophy className="w-6 h-6 text-primary" />;
  }
}

function ListItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc?: string; }) {
  return (
    <li className="flex gap-8 group bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 hover:border-primary/40 transition-all backdrop-blur-md">
      <div className="w-16 h-16 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all shadow-xl">
        {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8 group-hover:text-black transition-colors" })}
      </div>
      <div className="space-y-2">
        <h4 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight uppercase group-hover:text-primary transition-colors">
          {title}
        </h4>
        {desc && (
          <p className="text-white/40 text-xs md:text-sm font-black uppercase tracking-[0.2em] leading-relaxed">
            {desc}
          </p>
        )}
      </div>
    </li>
  );
}
