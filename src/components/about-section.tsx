import Image from "next/image";
import { GradientHeader } from "@/components/gradient-header";
import { CtaButton } from "@/components/cta-button";

export function AboutSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-[#05070a]" id="about">
      {/* Subtle Background elements */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 max-w-7xl relative">
        <div className="text-center mb-16 space-y-4">
          <GradientHeader tag="h2" size="lg" className="mb-6">
            About Acclimation Sports Management<br />
            Led by Joe Grekoski
          </GradientHeader>

          <div className="max-w-4xl mx-auto glass-premium p-6 rounded-2xl border-primary/20 bg-primary/5">
            <p className="text-sm md:text-base font-bold text-white leading-relaxed">
              I am a certified agent from the National
              Basketball Players Association (NBPA).
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Image Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              <div className="relative w-full aspect-[4/5] min-w-[270px] md:min-w-[520px] rounded-2xl overflow-hidden border border-white/10 glass shadow-2xl">
                <Image
                  src="/owner/me.jpg"
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
                <span className="font-black text-primary">Joe Grekoski</span> is the founder of <span className="font-bold whitespace-nowrap">Acclimation Group</span> and <span className="font-bold">Acclimation Sports Management</span>.
                He is a recognized economic expert who specializes in intellectual property with a particular focus on
                personal brand valuation and development for high-profile athletes. At age 29, Joe Grekoski became one of the youngest economic damages experts to testify in a U.S. court.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                "Launched Acclimation Group and built it into a premier advisory firm serving top law firms worldwide and major global consumer brands.",
                "Advised on the sale of IP assets to professional sports teams using advanced social media sentiment analysis and esoteric brand valuation modeling.",
                "Featured on CBS News discussing college basketball economics and player valuation.",
                "Expert in determining fair market rates for endorsement deals, NIL valuation, and turning personal brands into premium, monetizable economic assets.",
                "Brings courtroom-tested economic analysis to NBA contract negotiation, reputational management, and long-term wealth building that traditional agents cannot match.",
                "His goal is clear: to help elite NBA players, college prospects, and 5-star high-school talents succeed at the highest level on the court. While making sure they are compensated what they truly deserve, both on and off the court."
              ].map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-4 group">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 shadow-[0_0_8px_rgba(0,210,255,1)]" />
                  <p className="text-sm md:text-base text-white/70 leading-relaxed group-hover:text-white transition-colors">
                    {bullet}
                  </p>
                </li>
              ))}
            </ul>

            <p className="text-sm font-medium text-white/50 leading-relaxed uppercase tracking-wide">
              While other agents focus only on basketball, Joe Grekoski built <span className="text-white">Acclimation Sports Management</span> as the true one-stop shop.
              <span className="text-primary"> You just play basketball. We handle everything else.</span>
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 flex flex-col items-center">
          <CtaButton href="/contact">
            SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL
          </CtaButton>
        </div>
      </div>

      {/* Specialty Bar (Bottom) */}
      <div className="mt-20 w-full bg-[#0a0d12]/80 backdrop-blur-sm py-6 border-y border-white/5 overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-12 text-[9px] md:text-[11px] font-black tracking-[0.4em] text-white/30 uppercase">
            {[
              "Intellectual Property Expert",
              "Personal Brand Valuation Specialist",
              "Endorsement Market Rate Authority",
              "IP Asset Valuation for Professional Sports Teams",
              "Featured on CBS News",
              "You Just Play Basketball",
              "Acclimation Sports Management",
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-12">
                <span>{text}</span>
                <span className="text-primary/20 text-lg">•</span>
              </div>
            ))}
          </div>
          {/* Duplicate for infinite loop */}
          <div className="flex items-center gap-12 text-[9px] md:text-[11px] font-black tracking-[0.4em] text-white/30 uppercase ml-12">
            {[
              "Intellectual Property Expert",
              "Personal Brand Valuation Specialist",
              "Endorsement Market Rate Authority",
              "IP Asset Valuation for Professional Sports Teams",
              "Featured on CBS News",
              "You Just Play Basketball",
              "Acclimation Sports Management",
            ].map((text, i) => (
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
