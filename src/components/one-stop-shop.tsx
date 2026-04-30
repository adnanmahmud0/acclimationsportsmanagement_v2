import React from "react";
import Image from "next/image";
import { GradientHeader } from "@/components/gradient-header";
import { CtaButton } from "@/components/cta-button";
import { PageData } from "@/types/cms";

interface Point {
  title: string;
  items: string[];
}

export function OneStopShop({ data }: { data?: PageData | null }) {
  const content = data?.content?.oneStopShop || {
    title: "One-Stop Shop for Everything",
    description: "We do it all — contract negotiation, salary-cap strategy, brand & endorsement deals, pre-draft mastery, analytics, and full concierge support.",
    ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
    points: [
      {
        title: "Pre-Draft and NBA Combine Mastery",
        items: ["Data-driven positioning", "Medical evaluation strategy", "Elite scouting access", "Athletic profiling that sets your entire NBA career foundation."]
      },
      {
        title: "Proprietary Salary Cap and Analytical Models",
        items: ["Real-time forecasting", "Luxury-tax modeling", "Endorsement valuation algorithms", "Market value simulations", "In-house analytics that consistently put more money in your pocket."]
      },
      {
        title: "Litigation-Grade NBA Contract Negotiation",
        items: ["Precision tactics", "Courtroom-proven leverage", "Unprecedented leverage", "Better deals at significantly lower fees", "Career-longevity protection"]
      },
      {
        title: "Generational Wealth and Business Empire",
        items: ["Off-court brand architecture", "Endorsement empire building", "Private-jet concierge support", "Elite trainers, CPAs & wealth advisors", "Legacy planning", "Dynamics"]
      }
    ]
  };

  return (
    <section className="relative overflow-hidden" id="services">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-[-1]">
        <Image
          src="/graph.png"
          alt="Analysis background"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a] via-transparent to-[#05070a]" />
      </div>

      <div className="container mx-auto px-6 relative text-balance">
        {/* Header Section */}
        <div className="mb-8">
          <div className="glass-premium p-8 md:p-12 rounded-3xl border-white/5 shadow-2xl text-center space-y-4">
            <GradientHeader tag="h2" size="lg" className="mb-4 pb-3">
              {content.title}
            </GradientHeader>
            <p className="max-w-4xl mx-auto text-white/80 text-sm md:text-lg leading-relaxed">
              {content.description}
            </p>
          </div>
        </div>

        {/* Process Points Grid */}
        <div className="relative">
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-8 md:gap-y-8 relative">
            {content.points?.map((point: Point, idx: number) => (
              <div key={idx} className="relative group h-full">
                <div className="flex items-stretch gap-4 h-full">
                  <span className="text-6xl font-black text-primary/30 leading-none select-none pt-2">{idx + 1}.</span>
                  <div className="flex-1 glass-premium p-6 md:p-8 rounded-2xl border-white/5 hover:border-primary/40 transition-all duration-500 hover:translate-y-[-4px] shadow-2xl flex flex-col">
                    <h3 className="font-serif text-xl md:text-2xl lg:text-3xl font-bold leading-tight bg-gradient-to-r from-white to-primary bg-clip-text text-transparent mb-4 inline-block">
                      {point.title}
                    </h3>
                    <ul className="space-y-2 text-sm text-white/60 font-medium list-none flex-1">
                      {point.items?.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <CtaButton href="/contact">
            {content.ctaText}
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
