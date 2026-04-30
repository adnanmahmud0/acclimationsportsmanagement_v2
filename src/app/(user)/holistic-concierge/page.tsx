import Image from "next/image";
import { Metadata } from "next";
import { GradientHeader } from "@/components/gradient-header";
import { CtaButton } from "@/components/cta-button";
import { buildPageMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/json-ld";

export const metadata: Metadata = buildPageMetadata("/holistic-concierge");
import {
  Dumbbell,
  Utensils,
  PiggyBank,
  Plane,
  Tv,
  Headphones,
} from "lucide-react";

export default function HolisticConciergePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden pt-12">
      <BreadcrumbSchema items={[{ name: "Holistic Concierge", href: "/holistic-concierge" }]} />
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-[-1] h-[85vh]">
          <Image
            src="/foodsearvice.png"
            alt="Concierge Services Background"
            fill
            className="object-cover opacity-90 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/90 via-[#05070a]/40 to-[#05070a]" />
        </div>

        <div className="container mx-auto px-6 pt-32 pb-24 relative z-10 flex flex-col items-center text-center">
          <div className="space-y-12 max-w-6xl mx-auto">
            {/* Main Header */}
            <div className="space-y-6">
              <GradientHeader tag="h1" size="lg" className="mb-4">
                One-Stop Holistic <br />
                Concierge Support
              </GradientHeader>
              <div className="space-y-6">
                <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4">
                  We manage your entire off-court world so you can{" "}
                  <br className="hidden md:block" />
                  <span className="text-primary">
                    focus only on dominating the game.
                  </span>
                </h2>
              </div>
            </div>

            {/* Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 w-full max-w-5xl mx-auto text-left">
              <ServiceCard
                icon={<Dumbbell className="w-6 h-6" />}
                title="Elite Physical Training"
                desc="Access to world-class trainers and state-of-the-art facilities to optimize your performance."
              />
              <ServiceCard
                icon={<Plane className="w-6 h-6" />}
                title="Luxury Travel"
                desc="Private jet charters and VIP logistics for seamless travel."
              />
              <ServiceCard
                icon={<Utensils className="w-6 h-6" />}
                title="Gourmet Nutrition"
                desc="Personal chefs crafting meals tailored to your diet and training schedule."
              />
              <ServiceCard
                icon={<Tv className="w-6 h-6" />}
                title="Media & Brand Management"
                desc="Strategic media training and brand partnerships to build your empire."
              />
              <ServiceCard
                icon={<PiggyBank className="w-6 h-6" />}
                title="Wealth Management"
                desc="Expert financial advisors ensuring your money grows and lasts."
              />
              <ServiceCard
                icon={<Headphones className="w-6 h-6" />}
                title="24/7 Concierge"
                desc="Round-the-clock support for any request, anytime, anywhere."
              />
            </div>

            {/* CTA Section */}
            <div className="space-y-6 pt-6">
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

function ServiceCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-6 group p-6 rounded-2xl bg-[#0a0d12]/40 border border-white/5 hover:border-primary/40 hover:bg-[#0a0d12]/60 transition-all backdrop-blur-md shadow-xl">
      <div className="w-12 h-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="text-base md:text-lg font-black text-white tracking-tight leading-tight uppercase group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-white/60 text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}
