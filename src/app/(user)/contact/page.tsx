import Image from "next/image";
import { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { GradientHeader } from "@/components/gradient-header";
import { buildPageMetadata } from "@/lib/seo";
import { LocalBusinessSchema, PersonSchema, BreadcrumbSchema } from "@/components/json-ld";

export const metadata: Metadata = buildPageMetadata("/contact");

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden flex flex-col bg-black/5">
      <LocalBusinessSchema />
      <PersonSchema />
      <BreadcrumbSchema items={[{ name: "Contact", href: "/contact" }]} />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(0,210,255,0.14),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(58,123,213,0.16),_transparent_32%),linear-gradient(180deg,_#070b10_0%,_#05070a_55%,_#030406_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[url('/bascatecoart_v6.png')] bg-cover bg-center opacity-15 mix-blend-screen" />
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-[-1]">
        <Image
          src="/aurabasketcoart.png"
          alt="Contact Background"
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/95 via-[#05070a]/60 to-[#05070a]" />
      </div>

      <div className="container mx-auto px-6 pt-40 pb-20 relative z-10 flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-20">
          <GradientHeader tag="h1" size="lg" className="mb-4">
            Ready to Take the Next Step?
          </GradientHeader>
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4">
            Any questions or remarks? Just contact us!
          </h2>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
          {/* Card 1: Phone */}
          <div className="glass-premium p-12 rounded-[2.5rem] flex flex-col items-center text-center space-y-6 border-white/5 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 shadow-2xl">
              <Phone size={40} strokeWidth={1.5} />
            </div>
            <div className="space-y-4 relative z-10">
              <h3 className="text-white font-black text-xl uppercase tracking-[0.2em] pt-4">{`Joe's Direct Line`}</h3>
              <a
                href="tel:512-518-6547"
                className="text-2xl md:text-3xl font-serif font-black text-white hover:text-primary transition-colors block"
              >
                512-518-6547
              </a>
              <p className="text-white/50 text-sm font-bold leading-relaxed tracking-wide uppercase">
                Call or text Joe anytime —<br />
                24/7 for serious inquiries
              </p>
            </div>
          </div>

          {/* Card 2: Email */}
          <div className="glass-premium p-12 rounded-[2.5rem] flex flex-col items-center text-center space-y-6 border-white/5 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 shadow-2xl">
              <Mail size={40} strokeWidth={1.5} />
            </div>
            <div className="space-y-4 relative z-10">
              <h3 className="text-white font-black text-xl uppercase tracking-[0.2em] pt-4">
                Email
              </h3>
              <a
                href="mailto:Joseph.Grekoski@AcclimationGroup.com"
                className="text-lg md:text-xl font-bold text-white hover:text-primary transition-colors break-all leading-snug block"
              >
                Joseph.Grekoski@AcclimationGroup.com
              </a>
              <p className="text-white/50 text-sm font-bold leading-relaxed tracking-wide uppercase">
                Fast responses for NBA,
                <br />
                college & high school athletes
              </p>
            </div>
          </div>

          {/* Card 3: Location */}
          <div className="glass-premium p-12 rounded-[2.5rem] flex flex-col items-center text-center space-y-6 border-white/5 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 shadow-2xl">
              <MapPin size={40} strokeWidth={1.5} />
            </div>
            <div className="space-y-4 relative z-10">
              <h3 className="text-white font-black text-xl uppercase tracking-[0.2em] pt-4">
                Office Location
              </h3>
              <div className="text-white/90 font-bold text-lg leading-relaxed pt-2">
                Acclimation Sports Agency
                <br />
                Fort Lauderdale, Florida 33308
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
