import Image from "next/image";
import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { CheckCircle2 } from "lucide-react";
import { GradientHeader } from "@/components/gradient-header";
import { CtaButton } from "@/components/cta-button";
import { BreadcrumbSchema } from "@/components/json-ld";

export const metadata: Metadata = buildPageMetadata("/high-school-talent");

export default function HighSchoolTalentPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden pt-12">
      <BreadcrumbSchema items={[{ name: "Elite High School Talent", href: "/high-school-talent" }]} />
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/player.png"
          alt="High School Players Background"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/80 via-[#05070a]/50 to-[#05070a]" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-24 relative z-10 flex flex-col items-center">
        <div className="space-y-16 max-w-7xl mx-auto text-center">
          {/* Header Content */}
          <div className="space-y-8">
            <GradientHeader tag="h1" size="lg" className="mb-4">
              From Elite High School to the NBA <br />
              <span className="   pr-12 flex">
                Start Building Your Professional Future Now
              </span>
            </GradientHeader>

            <div className="space-y-4">
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4">
                The Path to the Pros Begins Here
              </h2>
              <p className="md:text-lg text-white/80 font-medium leading-relaxed max-w-4xl mx-auto">
                Join the exclusive network of elite prospects who secured
                multi-million dollar NIL deals and direct NBA pathways before
                graduation. Our proprietary system turns high school talent into
                professional assets.
              </p>
            </div>
          </div>

          {/* Info Grid Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-16">
            {/* Why Choose Section */}
            <div className="space-y-10 text-left">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <div className="h-[1px] w-8 bg-primary/40" />
                  <span className="text-xs font-black uppercase tracking-[0.4em]">
                    Acclimation Edge
                  </span>
                </div>
                <GradientHeader tag="h2" size="md">
                  Why Elite Prospects <br />
                  Choose Acclimation
                </GradientHeader>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChoiceItem
                  title="Early Representation Advantage"
                  desc="Secure multi-million dollar NIL deals before your peers even start their recruitment process."
                />
                <ChoiceItem
                  title="Direct NBA Pathway"
                  desc="Strategic connections to NBA scouts, front offices, and elite veteran agents."
                />
                <ChoiceItem
                  title="Proprietary Valuation"
                  desc="Maximize your market value with our exclusive NIL-to-NBA valuation algorithm."
                />
                <ChoiceItem
                  title="Family-Centric Strategy"
                  desc="Comprehensive guidance and concierge support for you and your entire family circle."
                />
              </div>
            </div>

            {/* Key Benefits Section */}
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-[2.5rem] group-hover:bg-primary/10 transition-colors duration-700" />
              <div className="relative h-full space-y-10 text-left bg-white/[0.02] border border-white/5 p-10 md:p-12 rounded-[2.5rem] backdrop-blur-2xl shadow-2xl flex flex-col justify-between">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-white uppercase tracking-widest">
                      Key Benefits
                    </h3>
                    <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    </div>
                  </div>

                  <ul className="space-y-6">
                    {[
                      "Guaranteed Scout Introductions",
                      "Exclusive NIL Contract Review",
                      "24/7 Strategy & Concierge Support",
                      "Elite Media & Interview Training",
                      "College-to-Pro Multi-Year Transition",
                    ].map((benefit, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-5 text-white/70 font-bold uppercase tracking-widest text-sm border-b border-white/[0.03] pb-6 last:border-0 hover:text-white transition-all duration-300 group/item"
                      >
                        <div className="w-2 h-2 rounded-full border border-primary/40 flex items-center justify-center group-hover/item:border-primary transition-colors">
                          <div className="w-1 h-1 rounded-full bg-primary/40 group-hover/item:bg-primary" />
                        </div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <p className="text-xs font-black text-primary/40 uppercase tracking-[0.4em]">
                    Exclusive Entry • High Stakes Advocacy
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div className="pt-6 flex justify-center">
              <CtaButton href="/contact" className="w-full max-w-3xl">
                SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ChoiceItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="space-y-3 group p-6 rounded-2xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/[0.03] hover:border-primary/20 transition-all duration-500">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/5 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
          <CheckCircle2 className="w-4 h-4 text-primary group-hover:text-inherit" />
        </div>
        <h4 className="text-base font-black text-white uppercase tracking-widest leading-tight">
          {title}
        </h4>
      </div>
      <p className="text-sm font-bold text-white/50 uppercase tracking-widest leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
