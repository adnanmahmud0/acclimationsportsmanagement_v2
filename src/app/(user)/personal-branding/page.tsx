import Image from "next/image";
import { Metadata } from "next";
import { GradientHeader } from "@/components/gradient-header";
import { CtaButton } from "@/components/cta-button";
import { buildPageMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/json-ld";

export const metadata: Metadata = buildPageMetadata("/personal-branding");

export default function PersonalBrandingPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden flex flex-col">
      <BreadcrumbSchema items={[{ name: "Personal Branding", href: "/personal-branding" }]} />
      {/* Background Image */}
      <div className="absolute inset-0 z-[-1]">
        <Image
          src="/glove.png"
          alt="Personal Branding Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-24 relative z-10 flex flex-col items-center">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-8 md:mb-12">
          <GradientHeader tag="h1" size="lg" className="mb-4">
            Turn Your Talent Into a <br />
            Premium, Monetizable
            <br />
            Economic Asset
          </GradientHeader>
          <p className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4">
            Personal Brand Development: the art of truly identifying the unique
            value, <br />
            data-backed and scaling strategically and carefully, then to view
            the potential.
          </p>
        </div>

        {/* Central Visual Section - Mobile Optimized */}
        <div className="relative w-full max-w-5xl mb-12">
          {/* Mobile view: Stacked Data Points */}
          <div className="grid grid-cols-1 md:hidden gap-4 w-full">
            <DataPoint title="Brand Equity" value="$1.2M" />
            <DataPoint title="Social Reach" value="2.4M" />
            <DataPoint title="Endorsement Value" value="$850K" />
          </div>

          <div className="hidden md:flex relative w-full aspect-[16/9] items-center justify-center">
            <div className="absolute top-10 left-10 md:top-20 md:left-20 bg-[#0a0d12]/95 border border-primary/30 p-8 rounded-3xl backdrop-blur-xl shadow-2xl z-20">
              <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
                Brand Equity
              </div>
              <div className="text-3xl font-black text-white">$1.2M</div>
            </div>

            <div className="absolute top-1/2 -right-10 md:-right-20 -translate-y-1/2 bg-[#0a0d12]/95 border border-primary/30 p-8 rounded-3xl backdrop-blur-xl shadow-2xl z-20">
              <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
                Social Reach
              </div>
              <div className="text-3xl font-black text-white">2.4M</div>
            </div>

            <div className="absolute bottom-10 left-5 md:bottom-20 md:left-5 lg:-left-20 bg-[#0a0d12]/95 border border-primary/30 p-8 rounded-3xl backdrop-blur-xl shadow-2xl z-20">
              <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
                Endorsement Value
              </div>
              <div className="text-3xl font-black text-white">$850K</div>
            </div>
          </div>
        </div>

        {/* Info & Results Section */}
        <div className="w-full max-w-7xl space-y-12 bg-gradient-to-t from-[#05070a] via-[#05070a]/80 to-transparent p-8 md:p-12 rounded-[3rem] border border-white/5 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row gap-12 items-end">
            {/* Strategy Details */}
            <div className="flex-1 space-y-8">
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight drop-shadow-lg">
                Personal Brand Strategy |{" "}
                <span className="text-primary">Negotiation:</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <ServiceBox
                  title="Personal Brand Strategy"
                  desc="Personal brand strategy to guarantee and optimize valuation and monetization."
                />
                <ServiceBox
                  title="Endorsement Deal"
                  desc="Endorsement negotiation and contract review sent to the highest value."
                />
                <ServiceBox
                  title="Media Training Programs"
                  desc="Media training programs to ensure you are ready and strategic and confident."
                />
              </div>
            </div>

            {/* Results Highlight */}
            <div className="lg:w-1/3 space-y-6">
              <div className="flex justify-between items-center bg-white/10 border border-white/20 px-8 py-3 rounded-xl backdrop-blur-md">
                <span className="text-sm font-black text-white uppercase tracking-widest">
                  Potential Results
                </span>
                <span className="text-primary text-xl">→</span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#0a0d12]/95 border border-primary/20 p-8 rounded-2xl shadow-2xl">
                  <div className="text-4xl font-black text-white mb-2">
                    $8.2M
                  </div>
                  <div className="text-xs font-bold text-white/70 uppercase tracking-widest leading-relaxed">
                    Average Uplift in <br /> Endorsement Value
                  </div>
                </div>
                <div className="bg-[#0a0d12]/95 border border-primary/20 p-8 rounded-2xl shadow-2xl">
                  <div className="text-4xl font-black text-white mb-2">
                    340%
                  </div>
                  <div className="text-xs font-bold text-white/70 uppercase tracking-widest leading-relaxed">
                    Brand <br /> Growth
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 w-full pb-12 flex flex-col items-center text-center">
          <CtaButton href="/contact">
            SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL
          </CtaButton>
        </div>
      </div>
    </main>
  );
}

function ServiceBox({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-[#0a0d12]/95 border border-white/10 p-8 rounded-2xl space-y-4 hover:border-primary/40 transition-all flex flex-col justify-between shadow-xl min-h-[160px]">
      <div className="space-y-4">
        <div className="flex gap-3 items-center">
          <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_rgba(0,210,255,1)]" />
          <h4 className="text-white font-black uppercase text-sm tracking-widest leading-tight">
            {title}
          </h4>
        </div>
        <p className="text-white/70 text-xs font-bold leading-relaxed uppercase tracking-wider">
          {desc}
        </p>
      </div>
    </div>
  );
}

function DataPoint({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-[#0a0d12]/95 border border-primary/30 p-5 rounded-2xl backdrop-blur-xl shadow-2xl flex justify-between items-center">
      <div className="text-xs font-bold text-primary uppercase tracking-widest">
        {title}
      </div>
      <div className="text-xl font-black text-white">{value}</div>
    </div>
  );
}
