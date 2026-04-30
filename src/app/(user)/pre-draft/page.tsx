import Image from "next/image";
import { CircleDot, TrendingUp, Target, Mic, FileText } from "lucide-react";
import { Metadata } from "next";
import { GradientHeader } from "@/components/gradient-header";
import { CtaButton } from "@/components/cta-button";
import { buildPageMetadata } from "@/lib/seo";
import { BreadcrumbSchema, FAQSchema } from "@/components/json-ld";

export const metadata: Metadata = buildPageMetadata("/pre-draft");

export default function PreDraftPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden pt-12 bg-[#05070a]">
      <BreadcrumbSchema items={[{ name: "Pre-Draft Mastery", href: "/pre-draft" }]} />
      <FAQSchema faqs={[
        { question: "What does NBA Combine preparation include?", answer: "Our Pre-Draft Mastery program includes player valuation reports, customized NBA Combine training with top coaches, targeted workouts with NBA teams, media and interview preparation, and seamless transition into rookie contract negotiation." },
        { question: "How do you prepare prospects for the NBA Draft?", answer: "We provide professional player valuation and draft projection reports, customized combine training, targeted workouts, media training, and aggressive rookie contract negotiation planning." },
      ]} />
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/baskateballplayer.png"
          alt="Pre-Draft Arena"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/60 via-[#05070a]/20 to-[#05070a]" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-24 relative z-10 flex flex-col items-center">
        <div className="space-y-16 max-w-6xl mx-auto text-center">
          {/* Header Content */}
          <div className="space-y-6">
            <GradientHeader tag="h1" size="lg" className="mb-4">
              Pre-Draft and NBA <br />
              Combine Mastery
            </GradientHeader>
            <p className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4">
              Our Pre-Draft and NBA Combine Mastery program prepares elite high
              school and college basketball prospects to rise on draft boards
              and enter the NBA with maximum value.
            </p>
          </div>

          {/* Mastery Points List */}
          <div className="pt-12 flex justify-center w-full">
            <ul className="space-y-8 max-w-4xl text-left w-full">
              <PointItem
                icon={<CircleDot className="w-6 h-6 text-primary" />}
                text="PROFESSIONAL PLAYER VALUATION AND DRAFT PROJECTION REPORT"
              />
              <PointItem
                icon={<TrendingUp className="w-6 h-6 text-primary" />}
                text="CUSTOMIZED NBA COMBINE AND PRO DAY TRAINING WITH TOP COACHES"
              />
              <PointItem
                icon={<Target className="w-6 h-6 text-primary" />}
                text="TARGETED WORKOUTS WITH NBA TEAMS THAT NEED YOUR SKILL SET"
              />
              <PointItem
                icon={<Mic className="w-6 h-6 text-primary" />}
                text="MEDIA TRAINING, INTERVIEW PREPARATION, AND PERSONAL BRANDING"
              />
              <PointItem
                icon={<FileText className="w-6 h-6 text-primary" />}
                text="SEAMLESS TRANSITION INTO AGGRESSIVE ROOKIE CONTRACT NEGOTIATION"
              />
            </ul>
          </div>

          {/* CTA Section */}
          <div className="text-center pt-8">
            <CtaButton href="/contact">
              SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL
            </CtaButton>
          </div>
        </div>
      </div>
    </main>
  );
}

function PointItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-center gap-6 group">
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/40 transition-all shadow-xl">
        {icon}
      </div>
      <span className="text-base md:text-lg font-bold text-white tracking-tight leading-tight uppercase">
        {text}
      </span>
    </li>
  );
}
