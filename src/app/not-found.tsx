"use client";

import Link from "next/link";
import { GradientHeader } from "@/components/gradient-header";
import { HomeIcon, ArrowLeftIcon } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#05070a] flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full z-0" />
        
        <div className="relative z-10 space-y-8 max-w-2xl">
          <div className="space-y-2">
            <p className="text-primary font-black tracking-[0.5em] uppercase text-xs">Error 404</p>
            <GradientHeader tag="h1" size="lg">Page Not Found</GradientHeader>
          </div>
          
          <p className="text-white/60 text-lg leading-relaxed">
            The strategy you&apos;re looking for doesn&apos;t exist or has been moved to a classified location. 
            Let&apos;s get you back to the main arena.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/">
              <button className="flex items-center gap-2 px-8 py-4 bg-primary text-background font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,210,255,0.4)]">
                <HomeIcon className="w-5 h-5" />
                Return Home
              </button>
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-8 py-4 glass-premium text-white font-bold rounded-full hover:bg-white/10 transition-all"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Go Back
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
