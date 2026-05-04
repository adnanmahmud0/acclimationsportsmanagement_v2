import React from "react";
import Image from "next/image";
import { GradientHeader } from "@/components/gradient-header";
import { CtaButton } from "@/components/cta-button";
import { PageData } from "@/types/cms";

export function AboutSection({ data }: { data?: PageData | null }) {
  const content = data?.content?.about || {
    title: "About Acclimation Sports Management\nLed by Joe Grekoski",
    subtitle: "I am a certified agent from the National Basketball Players Association (NBPA).",
    description: "Joe Grekoski is the founder of Acclimation Group and Acclimation Sports Management.",
    focusText: "While other agents focus only on basketball, Joe Grekoski built Acclimation Sports Management as the true one-stop shop. You just play basketball. We handle everything else.",
    ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
    bullets: [
      "Launched Acclimation Group and built it into a premier advisory firm serving top law firms worldwide.",
      "Advised on the sale of IP assets to professional sports teams using advanced social media sentiment analysis.",
      "Featured on CBS News discussing college basketball economics and player valuation.",
      "Expert in determining fair market rates for endorsement deals and NIL valuation.",
      "Brings courtroom-tested economic analysis to NBA contract negotiation.",
      "His goal is clear: to help elite NBA players, college prospects, and 5-star high-school talents succeed."
    ],
    specialties: [
      "Intellectual Property Expert",
      "Personal Brand Valuation Specialist",
      "Endorsement Market Rate Authority",
      "IP Asset Valuation for Professional Sports Teams",
      "Featured on CBS News",
      "You Just Play Basketball",
      "Acclimation Sports Management",
    ]
  };

  return (
    <section className="relative py-24 overflow-hidden bg-[#05070a]" id="about">
      {/* Subtle Background elements */}
      {content.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image src={content.backgroundImage} alt="About Background" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05070a] via-transparent to-[#05070a]" />
        </div>
      )}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full" />

      <div className="w-full mx-auto px-6 max-w-7xl relative">
        <div className="text-center mb-16 space-y-4">
          <GradientHeader tag="h2" size="lg" className="mb-6">
            {(content.title || "").split('\n').map((line: string, i: number) => (
              <React.Fragment key={i}>
                {line}
                {i < (content.title || "").split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </GradientHeader>

          <div className="max-w-4xl mx-auto glass-premium p-6 rounded-2xl border-primary/20 bg-primary/5">
            <p className="text-sm md:text-base font-bold text-white leading-relaxed">
              {content.subtitle}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Image Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              <div className="relative w-full aspect-[4/5] max-w-[520px] rounded-2xl overflow-hidden border border-white/10 glass shadow-2xl mx-auto">
                <Image
                  src={content.profileImage || "/owner/me.jpg"}
                  alt="Joe Grekoski"
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <p className="text-lg text-white/90 leading-relaxed">
                {content.description}
              </p>
            </div>

            <ul className="space-y-4">
              {content.bullets?.map((bullet: string, idx: number) => (
                <li key={idx} className="flex items-start gap-4 group">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 shadow-[0_0_8px_rgba(0,210,255,1)]" />
                  <p className="text-sm md:text-base text-white/70 leading-relaxed group-hover:text-white transition-colors">
                    {bullet}
                  </p>
                </li>
              ))}
            </ul>

            <p className="text-sm font-medium text-white/50 leading-relaxed uppercase tracking-wide">
              {content.focusText}
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 flex flex-col items-center">
          <CtaButton href="/contact">
            {content.ctaText}
          </CtaButton>
        </div>
      </div>

      {/* Specialty Bar (Bottom) */}
      <div className="mt-20 w-full bg-[#0a0d12]/80 backdrop-blur-sm py-6 border-y border-white/5 overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-12 text-[9px] md:text-[11px] font-black tracking-[0.4em] text-white/30 uppercase">
            {content.specialties?.map((text: string, i: number) => (
              <div key={i} className="flex items-center gap-12">
                <span>{text}</span>
                <span className="text-primary/20 text-lg">•</span>
              </div>
            ))}
          </div>
          {/* Duplicate for infinite loop */}
          <div className="flex items-center gap-12 text-[9px] md:text-[11px] font-black tracking-[0.4em] text-white/30 uppercase ml-12">
            {content.specialties?.map((text: string, i: number) => (
              <div key={i} className="flex items-center gap-12">
                <span>{text}</span>
                <span className="text-primary/20 text-lg">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
