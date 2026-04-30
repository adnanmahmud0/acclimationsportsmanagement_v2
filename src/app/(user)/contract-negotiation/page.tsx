import Image from "next/image";
import { Metadata } from "next";
import { GradientHeader } from "@/components/gradient-header";
import { CtaButton } from "@/components/cta-button";
import { buildPageMetadata } from "@/lib/seo";
import { BreadcrumbSchema, FAQSchema } from "@/components/json-ld";

export const metadata: Metadata = buildPageMetadata("/contract-negotiation");

export default function ContractNegotiationPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden pt-12">
      <BreadcrumbSchema items={[{ name: "Contract Negotiation", href: "/contract-negotiation" }]} />
      <FAQSchema faqs={[
        { question: "How does Acclimation negotiate NBA contracts?", answer: "We use proprietary in-house salary-cap models and litigation-grade strategies to maximize guaranteed money, incentives, and long-term player security." },
        { question: "What is salary cap mastery in NBA contracts?", answer: "Our analytical models provide real-time cap forecasting, Bird Rights optimization, luxury tax stress testing, and trade scenario analysis to ensure the best possible contract structure." },
        { question: "Can Acclimation help with rookie scale contracts?", answer: "Yes. We specialize in rookie scale and veteran extension negotiations, pre-draft positioning, and full CBA compliance for all stages of an NBA career." },
      ]} />
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/effect.png"
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
            NBA Contract Negotiation and <br />
            <span className="flex justify-center">Representation</span>
          </GradientHeader>

          <p className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4">
            Data-driven contract deals with proprietary in-house salary-cap
            models. Expert representation that maximizes guaranteed money,
            incentives, and long-term player for active NBA players, college
            prospects, and elite high-school talent.
          </p>

          <div className="flex flex-col md:flex-row">
            <ul className="text-left">
              {[
                "Salary Cap Mastery & Analytical Modeling",
                "Rookie Scale & Veteran Extension Negotiation",
                "Multi-Team Bidding War Strategy",
                "Full CBA Compliance & Contract Structuring",
                "Pre-Draft & Combine Contract Positioning",
              ].map((point, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 text-white/80 group"
                >
                  <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(0,210,255,1)] group-hover:scale-125 transition-transform" />
                  <span className="text-base md:text-lg font-bold tracking-tight">
                    {point}
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
              {[
                { step: 1, title: "Maximum", subtitle: "Guaranteed Money" },
                {
                  step: 2,
                  title: "Performance",
                  subtitle: "Incentives & Escalators",
                },
                { step: 3, title: "Trade & Buyout", subtitle: "Negotiation" },
                {
                  step: 4,
                  title: "Post-Contract",
                  subtitle: "Wealth Coordination",
                },
              ].map((item) => (
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
              SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL
            </CtaButton>
          </div>
        </div>
      </div>
    </main>
  );
}
