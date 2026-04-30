import Image from "next/image";
import { Metadata } from "next";
import { GradientHeader } from "@/components/gradient-header";
import { CtaButton } from "@/components/cta-button";
import { buildPageMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/json-ld";

export const metadata: Metadata = buildPageMetadata("/nba-players");

export default function NBAPlayersPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden pt-12">
      <BreadcrumbSchema items={[{ name: "Active NBA Players", href: "/nba-players" }]} />
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/ground.png"
          alt="Active NBA Players Background"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/80 via-[#05070a]/40 to-[#05070a]" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-24 relative z-10 flex flex-col items-center text-center">
        <div className="space-y-12 max-w-6xl mx-auto">
          {/* Main Header */}
          <div className="space-y-6">
            <GradientHeader tag="h1" size="lg" className="mb-4">
              Active NBA Players
            </GradientHeader>
            <div className="space-y-6">
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4">
                Maximize Your Off-Court Value <br className="hidden md:block" />
                <span className="text-primary">and Build Real Wealth</span>
              </h2>
              <p className="text-sm md:text-xl text-white/60 font-medium leading-relaxed max-w-4xl mx-auto">
                Your on-court talent opens doors. We turn that into serious
                money through world-class endorsements, smart branding, and
                strategic opportunities.
              </p>
            </div>
          </div>

          {/* What We Provide Timeline Section */}
          <div className="space-y-12 py-12">
            <div className="relative">
              <div className="flex items-center justify-center gap-4 text-primary">
                <div className="h-[1px] w-12 bg-primary/30" />
                <span className="text-sm font-black uppercase tracking-[0.4em]">
                  What We Provide
                </span>
                <div className="h-[1px] w-12 bg-primary/30" />
              </div>
            </div>

            {/* 5-Point Timeline Visual */}
            <div className="relative w-full max-w-7xl mx-auto pt-10 pb-20">
              {/* Connecting Line */}
              <div className="absolute top-[40px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden md:block" />

              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                <TimelinePoint
                  number="1"
                  text="Direct connections to world-class brands and sponsors."
                />
                <TimelinePoint
                  number="2"
                  text="Proprietary tools to accurately value and maximize your endorsement deals."
                />
                <TimelinePoint
                  number="3"
                  text="Booking high-profile podcast appearances and media opportunities."
                />
                <TimelinePoint
                  number="4"
                  text="Professional publishing and promotion of your advanced statistics online."
                />
                <TimelinePoint
                  number="5"
                  text="Expert negotiation for your next contract extension."
                />
              </div>
            </div>
          </div>

          {/* Transition Copy */}
          <div className="space-y-8">
            <h2 className="text-xl md:text-3xl font-black text-white leading-tight uppercase tracking-tight">
              Advanced Contract Architecture & <br />
              Strategic Career Management
            </h2>
            <p className="text-sm md:text-lg text-white/50 font-medium leading-relaxed max-w-3xl mx-auto">
              For the veteran or rising star, we provide litigation-grade
              representation, proprietary market analysis, and a holistic
              concierge system that handles everything off the court so you can
              dominate on it.
            </p>
          </div>

          {/* CTA Section */}
          <div className="text-center space-y-8">
            <div className="flex flex-col items-center gap-6">
              <CtaButton href="/contact">
                SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL
              </CtaButton>
            </div>
          </div>

          {/* Timeline/Process Section */}
          <div className="relative pt-12">
            {/* Connecting Line */}
            <div className="absolute top-[4.5rem] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden lg:block" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              <TimelinePoint
                number="01"
                text="Comprehensive audit of current contract & market standing."
              />
              <TimelinePoint
                number="02"
                text="Proprietary salary cap modeling & leverage mapping."
              />
              <TimelinePoint
                number="03"
                text="Aggressive negotiation and brand development."
              />
              <TimelinePoint
                number="04"
                text="Full holistic concierge & wealth architecture."
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function TimelinePoint({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex flex-col items-center space-y-6 group">
      <div className="w-14 h-14 rounded-full bg-[#0a0d12]/80 border border-primary/40 flex items-center justify-center font-black text-xl text-white group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all shadow-[0_0_20px_rgba(0,180,255,0.2)] relative z-10">
        {number}
      </div>
      <p className="text-base font-bold text-white/90 uppercase tracking-widest leading-relaxed px-4 group-hover:text-white transition-colors">
        {text}
      </p>
    </div>
  );
}
