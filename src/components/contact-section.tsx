import React from "react";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { GradientHeader } from "@/components/gradient-header";
import { PageData } from "@/types/cms";

export function ContactSection({ data }: { data?: PageData | null }) {
   const content = data?.content?.contact || {
      title: "Ready to Take the Next Step?",
      tagline: "Any questions or remarks? Just contact us!",
      phone: "512-518-6547",
      phoneTitle: "Joe's Direct Line",
      phoneDesc: "Call or text Joe anytime —\n24/7 for serious inquiries",
      email: "Joseph.Grekoski@AcclimationGroup.com",
      emailTitle: "Email",
      emailDesc: "Fast responses for NBA,\ncollege & high school athletes",
      location: "Acclimation Sports Agency\nFort Lauderdale, Florida 33308",
      locationTitle: "Office Location"
   };

   return (
      <section id="contact" className="relative py-32 overflow-hidden bg-[#05070a]">
         {/* Background Image with Overlay */}
         <div className="absolute inset-0 z-0">
            <Image
               src="/bascatecoart_v6.png"
               alt="Contact Background"
               fill
               className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/95 via-[#05070a]/60 to-[#05070a]" />
         </div>

         <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
            {/* Header Section */}
            <div className="text-center space-y-6 mb-20 max-w-4xl mx-auto">
               <GradientHeader tag="h2" size="lg" className="mb-4">
                  {content.title}
               </GradientHeader>
               <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4">
                  {content.tagline}
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
                     <h3 className="text-white font-black text-xl uppercase tracking-[0.2em] pt-4">{content.phoneTitle}</h3>
                     <a
                        href={`tel:${content.phone}`}
                        className="text-2xl md:text-3xl font-serif font-black text-white hover:text-primary transition-colors block"
                     >
                        {content.phone}
                     </a>
                     <p className="text-white/50 text-sm font-bold leading-relaxed tracking-wide uppercase">
                        {content.phoneDesc?.split('\n').map((line: string, i: number) => (
                           <React.Fragment key={i}>
                              {line}
                              {i < content.phoneDesc.split('\n').length - 1 && <br />}
                           </React.Fragment>
                        ))}
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
                     <h3 className="text-white font-black text-xl uppercase tracking-[0.2em] pt-4">{content.emailTitle}</h3>
                     <a
                        href={`mailto:${content.email}`}
                        className="text-lg md:text-xl font-bold text-white hover:text-primary transition-colors break-all leading-snug block"
                     >
                        {content.email}
                     </a>
                     <p className="text-white/50 text-sm font-bold leading-relaxed tracking-wide uppercase">
                        {content.emailDesc?.split('\n').map((line: string, i: number) => (
                           <React.Fragment key={i}>
                              {line}
                              {i < content.emailDesc.split('\n').length - 1 && <br />}
                           </React.Fragment>
                        ))}
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
                     <h3 className="text-white font-black text-xl uppercase tracking-[0.2em] pt-4">{content.locationTitle}</h3>
                     <div className="text-white/90 font-bold text-lg leading-relaxed pt-2">
                        {content.location?.split('\n').map((line: string, i: number) => (
                           <React.Fragment key={i}>
                              {line}
                              {i < content.location.split('\n').length - 1 && <br />}
                           </React.Fragment>
                        ))}
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </section>
   );
}
