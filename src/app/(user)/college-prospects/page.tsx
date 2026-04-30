import Image from "next/image";
import { GraduationCap, Share2, Award, Home, Brain } from "lucide-react";
import { Metadata } from "next";
import { GradientHeader } from "@/components/gradient-header";
import { CtaButton } from "@/components/cta-button";
import { buildPageMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/json-ld";

export const metadata: Metadata = buildPageMetadata("/college-prospects");

export default function CollegeProspectsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden pt-12">
      <BreadcrumbSchema items={[{ name: "College Prospects", href: "/college-prospects" }]} />
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/basketcoart_v5.png"
          alt="Neon Arena Background"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/80 via-[#05070a]/50 to-[#05070a]" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-24 relative z-10 flex flex-col items-center">
        <div className="space-y-16 max-w-7xl mx-auto text-center">
          {/* Header Content */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:text-left">
            <div className="flex-1 space-y-6">
              <GradientHeader tag="h1" size="lg" className="mb-4">
                College <br className="hidden md:block" />
                <span className="   pr-12">Prospects</span>
              </GradientHeader>
              <div className="space-y-6">
                <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4">
                  Position yourself for the NBA Draft and <br />
                  build your future wealth now.
                </h2>
                <p className="text-sm md:text-lg text-white/50 font-medium leading-relaxed max-w-3xl mx-auto lg:mx-0">
                  The college years are your launchpad. We help top college
                  prospects maximize NIL deals, develop a professional brand,
                  and prepare for the NBA with elite off-court support.
                </p>
              </div>
            </div>

            {/* Visual Element - Floating Basketball (from mockup vibe) */}
            <div className="lg:w-1/3 relative aspect-square w-64 md:w-80 animate-float hidden lg:block">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <div className="relative w-full h-full rounded-full border-2 border-primary/30 flex items-center justify-center overflow-hidden">
                <Image
                  src="/baskatecoart.png"
                  alt="Basketball Grid"
                  fill
                  className="object-cover opacity-20 rotate-45 scale-150"
                />
                <div className="text-primary font-black text-4xl tracking-tighter opacity-40 select-none">
                  FUTURE
                </div>
              </div>
            </div>
          </div>

          {/* What We Provide - Arc Layout */}
          <div className="space-y-16 py-12">
            <div className="flex items-center justify-center gap-4 text-primary">
              <div className="h-[1px] w-12 bg-primary/30" />
              <span className="text-sm font-black uppercase tracking-[0.4em]">
                What We Provide
              </span>
              <div className="h-[1px] w-12 bg-primary/30" />
            </div>

            {/* Arc Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <ArcCard
                number="1"
                icon={<GraduationCap className="w-5 h-5" />}
                title="NIL deal valuation and high-value brand partnerships"
                desc="Connect with top brands and secure maximum value for your name, image, and likeness."
              />
              <ArcCard
                number="2"
                icon={<Share2 className="w-5 h-5" />}
                title="Personal brand development and marketing strategy"
                desc="Build a professional, social-media-ready identity that sets you apart."
              />
              <ArcCard
                number="3"
                icon={<Award className="w-5 h-5" />}
                title="Pre-draft and NBA Combine mastery"
                desc="Elite trainers, private chefs, luxury accommodations, and interview prep to dominate the draft."
              />
              <ArcCard
                number="4"
                icon={<Home className="w-5 h-5" />}
                title="One-stop holistic concierge support"
                desc="Manage travel, finances, and logistics so you can focus solely on your game."
              />
              <ArcCard
                number="5"
                icon={<Brain className="w-5 h-5" />}
                title="Early contract negotiation planning and salary cap education"
                desc="Learn the business of the NBA early to maximize your future earnings."
              />
            </div>
          </div>

          {/* Transition Copy */}
          <div className="space-y-12">
            <p className="text-white/80 text-lg md:text-xl font-bold tracking-wide leading-relaxed">
              Start building your NBA-level empire while still in college.
            </p>

            <div className="pt-6 w-full flex justify-center">
              <CtaButton href="/contact" fullWidth className="max-w-4xl">
                SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ArcCard({
  number,
  icon,
  title,
  desc,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-[#0a0d12]/60 border border-white/5 p-6 rounded-2xl backdrop-blur-md hover:border-primary/40 transition-all group flex flex-col items-center text-center space-y-4 shadow-xl min-h-[280px]">
      <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center font-black text-primary text-sm group-hover:bg-primary group-hover:text-black transition-all">
        {number}
      </div>
      <div className="w-8 h-8 flex items-center justify-center text-white/40 group-hover:text-primary transition-colors">
        {icon}
      </div>
      <div className="space-y-3">
        <h4 className="text-base md:text-lg font-black text-white uppercase tracking-widest leading-tight">
          {title}
        </h4>
        <p className="text-sm font-bold text-white/60 uppercase tracking-widest leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}
