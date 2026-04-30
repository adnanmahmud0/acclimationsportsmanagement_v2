import Image from "next/image";
import { Metadata } from "next";
import { GradientHeader } from "@/components/gradient-header";
import { CtaButton } from "@/components/cta-button";
import { buildPageMetadata } from "@/lib/seo";
import { BreadcrumbSchema, FAQSchema } from "@/components/json-ld";

export const metadata: Metadata = buildPageMetadata("/wnba");

export default function WNBAPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <BreadcrumbSchema items={[{ name: "WNBA", href: "/wnba" }]} />
      <FAQSchema faqs={[
        { question: "What is the new WNBA CBA salary cap?", answer: "The new 7-year WNBA CBA (2026–2032) raises the salary cap to $7M in 2026, bumps average pay to $583K, and sets max contracts at over $1.4M." },
        { question: "How can Acclimation help WNBA athletes?", answer: "We provide expert negotiation under the new WNBA CBA, high-value endorsement and brand deals, podcast and media opportunities, personal brand development, and full holistic concierge support." },
      ]} />
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/wnba_player.png"
          alt="WNBA Background"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/90 via-transparent to-[#05070a]" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-16 relative z-10">
        <div className="space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <GradientHeader tag="h1" size="lg" className="mb-4">
              WNBA
            </GradientHeader>

            <div className="space-y-4 text-center">
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4">
                Capitalize on the Historic New CBA <br />{" "}
                <span className="text-primary">Maximize Your Earnings Now</span>
              </h2>
              <p className="text-sm md:text-lg text-white/80 font-medium leading-relaxed max-w-4xl mx-auto">
                The new 7-year WNBA CBA (2026–2032) explodes salaries: salary
                cap jumps to $7M in 2026, average pay rises to $583K, and max
                contracts reach $1.4M+.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="container mx-auto px-6 pb-24">
        <div className="max-w-7xl mx-auto space-y-24">
          {/* "What We Provide" Card */}
          <div className="relative group max-w-3xl mx-auto">
            <div className="absolute -inset-[1px] bg-gradient-to-r from-[#00d2ff] via-purple-500 to-primary rounded-[2rem] opacity-70" />

            <div className="relative bg-[#0a0d12]/90 h-full p-8 md:p-12 rounded-[2rem] shadow-2xl space-y-6 md:space-y-8">
              <h3 className="text-xl md:text-3xl font-black text-white leading-tight uppercase">
                What We Provide:
              </h3>

              <ul className="space-y-4 md:space-y-5">
                {[
                  "Expert negotiation under the new CBA",
                  "High-value endorsement & brand deals",
                  "Podcast appearances and media opportunities",
                  "Personal brand development",
                  "Full holistic concierge support (trainers, chefs, travel, taxes)",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-white/90 text-left"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(0,210,255,0.5)]" />
                    <span className="text-sm md:text-xl font-medium tracking-tight leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* CTA Section */}
          <div className="text-center space-y-8">
            <div className="flex flex-col items-center gap-6">
              <CtaButton href="/contact">
                SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
