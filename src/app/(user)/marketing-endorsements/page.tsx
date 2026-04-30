import Image from "next/image";
import { Metadata } from "next";
import { GradientHeader } from "@/components/gradient-header";
import { CtaButton } from "@/components/cta-button";
import { BarChart3, Mic2, Handshake, Network, Trophy } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/json-ld";

export const metadata: Metadata = buildPageMetadata("/marketing-endorsements");

export default function MarketingEndorsementsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden pt-12">
      <BreadcrumbSchema items={[{ name: "Marketing & Endorsements", href: "/marketing-endorsements" }]} />
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/fullbuscatecoart.png"
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
            <GradientHeader tag="h1" size="lg" className="mb-4">
              Marketing and <br />
              <span className="flex justify-center">Endorsement Deals</span>
            </GradientHeader>
            <p className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4">
              We build and monetize your personal brand so you earn maximum
              value from endorsements, sponsorships, and marketing
              opportunities. elite high school talent turn their talent into
              real off-court income.
            </p>
          </div>

          {/* List Section */}
          <div className="flex flex-col items-center gap-10 py-8 w-full max-w-4xl mx-auto">
            <ul className="space-y-8 text-left w-full">
              <ListItem
                icon={<BarChart3 className="w-6 h-6 text-primary" />}
                title="Professional brand valuation and market positioning"
                desc="Analysis of your market value and strategic positioning"
              />
              <ListItem
                icon={<Mic2 className="w-6 h-6 text-primary" />}
                title="Media training and personal branding development"
              />
              <ListItem
                icon={<Handshake className="w-6 h-6 text-primary" />}
                title="Targeted endorsement strategy and deal sourcing"
                desc="Negotiation of sponsorships, NIL deals, and long-term partnerships"
              />
              <ListItem
                icon={<Network className="w-6 h-6 text-primary" />}
                title="Full integration with your NBA contract for maximum career earnings"
                desc="Seamless alignment with your professional contract"
              />
              <ListItem
                icon={<Trophy className="w-6 h-6 text-primary" />}
                title="Long-term portfolio growth and legacy building"
                desc="Strategies to ensure sustained off-court success"
              />
            </ul>
          </div>

          {/* Transition Copy */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <p className="text-white/60 text-lg md:text-xl font-bold tracking-wide leading-relaxed">
              {`              Whether you're chasing your first major shoe deal, building your
              NIL portfolio, or expanding your brand as a NBA player, we make
              sure you're never undervalued in the marketplace.`}
            </p>
            <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">
              Ready to unlock your full earning potential off the court?
            </h2>
          </div>

          <div className="pt-6">
            <CtaButton href="/contact">
              SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL
            </CtaButton>
          </div>
        </div>
      </div>
    </main>
  );
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
