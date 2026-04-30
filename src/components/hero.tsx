import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, TrendingUp, Handshake, Trophy } from "lucide-react";
import { CareerGrowthChart } from "@/components/career-growth-chart";
import { GradientHeader } from "@/components/gradient-header";

export function Hero() {
  return (
    <div className="relative">
      {/* Background Image with Overlay */}
      <div className="absolute top-0 left-0 w-full h-[120vh] z-[-1] overflow-hidden">
        <Image
          src="/baskateballplayer.png"
          alt="NBA Basketball Player Action"
          fill
          className="object-cover object-top opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/60 via-[#05070a]/20 to-[#05070a]" />
      </div>

      <main className="container mx-auto px-6 pb-20 min-h-screen flex flex-col justify-center text-center text-balance">
        <div className="max-w-7xl mx-auto w-full">
          <GradientHeader tag="h1" size="lg" className="mb-4">
            Where Economic Precision <br className="hidden md:block" /> Meets NBA Domination
          </GradientHeader>

          <p className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4">
            A New Kind of Basketball Agency
          </p>

          {/* Feature Bar */}
          <div className="inline-flex flex-wrap justify-center items-center gap-4 md:gap-8 px-6 py-2.5 glass-premium rounded-full text-[9px] md:text-[10px] font-semibold tracking-wide border-primary/20 bg-[#00d2ff]/5 mb-4">
            <span className="flex items-center gap-2">20+ Years Economic Edge</span>
            <span className="text-primary/30 hidden sm:inline">•</span>
            <span className="flex items-center gap-2">Real-Time Salary Cap Forecasting</span>
            <span className="text-primary/30 hidden sm:inline">•</span>
            <span className="flex items-center gap-2">Litigation-Grade Strategy</span>
            <span className="text-primary/30 hidden sm:inline">•</span>
            <span className="flex items-center gap-2">In-House Analytics</span>
            <span className="text-primary/30 hidden sm:inline">•</span>
            <span className="flex items-center gap-2">Lower Fees & More In Your Pocket</span>
          </div>

          {/* Service Cards Grid */}
          <section id="services" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-left">
            <ServiceCard
              title="NBA Contract Negotiation"
              desc="Data-driven deals with litigation-grade strategy."
              icon={<ShieldCheck className="w-5 h-5 text-primary" />}
            />
            <ServiceCard
              title="Brand Development"
              desc="Turn your talent into a premium economic asset."
              icon={<TrendingUp className="w-5 h-5 text-primary" />}
            />
            <ServiceCard
              title="Marketing and Endorsements"
              desc="Proprietary analytics ensure you're never underpaid."
              icon={<Handshake className="w-5 h-5 text-primary" />}
            />
            <ServiceCard
              title="Holistic Support"
              desc="Elite trainers, chefs, wealth advisors & strategists."
              icon={<Trophy className="w-5 h-5 text-primary" />}
            />
          </section>

          {/* Career Value Growth Section */}
          <div className="relative glass-premium p-6 rounded-xl overflow-hidden mb-6 border-primary/10 mx-auto">
            <div className="flex flex-col items-center">
              <GradientHeader tag="h3" size="md" className="mb-4 text-center">Projected Career Value Growth</GradientHeader>
              <div className="w-full h-[280px] relative">
                <CareerGrowthChart />
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col items-center gap-8 relative">
            <Link href="/contact" className="group relative">
              <div className="absolute inset-0 bg-primary/40 blur-2xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-500" />
              <button className="relative px-10 py-4 bg-primary text-background font-black text-base tracking-widest rounded-full shadow-[0_0_30px_rgba(0,210,255,0.6)] hover:shadow-[0_0_50px_rgba(0,210,255,0.8)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 font-sans!">
              GET STARTED
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function ServiceCard({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="glass-premium px-8 py-5 rounded-xl hover:border-primary/50 transition-all duration-500 group">
      <div className="w-10 h-10 glass rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform bg-white/5 border-white/10!">
        {icon}
      </div>
      <GradientHeader tag="h4" size="sm" className="mb-2">{title}</GradientHeader>
      <p className="text-sm text-white/60 leading-relaxed font-light">
        {desc}
      </p>
    </div>
  );
}
