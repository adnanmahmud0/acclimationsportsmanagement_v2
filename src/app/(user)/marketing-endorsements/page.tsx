import Image from "next/image";
import React from "react";
import { GradientHeader } from "@/components/gradient-header";
import { CtaButton } from "@/components/cta-button";
import { BarChart3, Mic2, Handshake, Network, Trophy } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { BreadcrumbSchema, FAQSchema } from "@/components/json-ld";
import connectDB from "@/lib/mongodb";
import Page from "@/models/page";
import { PageData, MarketingEndorsementItem } from "@/types/cms";

async function getPageData() {
  await connectDB();
  const page = await Page.findOne({ slug: "marketing-endorsements" }).lean();
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
  return buildPageMetadata("/marketing-endorsements");
}

export default async function MarketingEndorsementsPage() {
  const pageData = await getPageData();
  
  const content = pageData?.content?.marketingEndorsements || {
    title: "Marketing and \n Endorsement Deals",
    tagline: "We build and monetize your personal brand so you earn maximum value from endorsements, sponsorships, and marketing opportunities. elite high school talent turn their talent into real off-court income.",
    items: [
      { title: "Professional brand valuation and market positioning", desc: "Analysis of your market value and strategic positioning", iconType: "chart" },
      { title: "Media training and personal branding development", iconType: "mic" },
      { title: "Targeted endorsement strategy and deal sourcing", desc: "Negotiation of sponsorships, NIL deals, and long-term partnerships", iconType: "handshake" },
      { title: "Full integration with your NBA contract for maximum career earnings", desc: "Seamless alignment with your professional contract", iconType: "network" },
      { title: "Long-term portfolio growth and legacy building", desc: "Strategies to ensure sustained off-court success", iconType: "trophy" },
    ],
    transitionQuote: "Whether you're chasing your first major shoe deal, building your NIL portfolio, or expanding your brand as a NBA player, we make sure you're never undervalued in the marketplace.",
    readyHeading: "Ready to unlock your full earning potential off the court?",
    ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
    backgroundImage: "/endorsements_v2.png"
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden pt-12">
      <BreadcrumbSchema items={[{ name: "Marketing & Endorsements", href: "/marketing-endorsements" }]} />
      {pageData?.seo?.faqs && <FAQSchema faqs={pageData.seo.faqs} />}
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={content.backgroundImage || "/fullbuscatecoart.png"}
          alt="Arena Background"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/90 via-[#05070a]/40 to-[#05070a]" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-24 relative z-10 flex flex-col items-center text-center">
        <div className="space-y-12 max-w-5xl mx-auto">
          {/* Main Header */}
          <div className="space-y-6">
            <GradientHeader tag="h1" size="lg" className="mb-4 text-center">
              {(content.title || "").split('\n').map((line: string, i: number) => (
                <React.Fragment key={i}>
                  {line}
                  {i < (content.title || "").split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </GradientHeader>
            <p className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4 whitespace-pre-line">
              {content.tagline}
            </p>
          </div>

          {/* List Section */}
          <div className="flex flex-col items-center gap-10 py-8 w-full max-w-4xl mx-auto">
            <ul className="space-y-8 text-left w-full">
              {content.items.map((item: MarketingEndorsementItem, i: number) => (
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
          <div className="space-y-6 max-w-4xl mx-auto">
            <p className="text-white/60 text-lg md:text-xl font-bold tracking-wide leading-relaxed">
              {content.transitionQuote}
            </p>
            <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">
              {content.readyHeading}
            </h2>
          </div>

          <div className="pt-6">
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

function ListItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc?: string;
}) {
  return (
    <li className="flex gap-6 group">
      <div className="w-12 h-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/40 transition-all shadow-xl">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="text-lg md:text-xl font-black text-white tracking-tight leading-tight uppercase">
          {title}
        </h4>
        {desc && (
          <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-widest">
            {desc}
          </p>
        )}
      </div>
    </li>
  );
}
