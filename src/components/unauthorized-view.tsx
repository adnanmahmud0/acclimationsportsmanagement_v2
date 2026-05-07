"use client"

import Link from "next/link";
import { GradientHeader } from "@/components/gradient-header";
import { ShieldAlertIcon, LockIcon } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export function UnauthorizedView() {
  return (
    <div className="min-h-screen bg-[#05070a] flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        {/* Warning Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full z-0" />
        
        <div className="relative z-10 space-y-8 max-w-2xl">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center animate-pulse">
              <ShieldAlertIcon className="w-10 h-10 text-red-500" />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-red-500 font-black tracking-[0.5em] uppercase text-xs">Access Denied</p>
            <GradientHeader tag="h1" size="lg">Restricted Area</GradientHeader>
          </div>
          
          <p className="text-white/60 text-lg leading-relaxed">
            You don&apos;t have the required credentials to access this secure zone. 
            Please sign in with an authorized account or contact an administrator.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/login">
              <button className="flex items-center gap-2 px-8 py-4 bg-white text-background font-black rounded-full hover:scale-105 active:scale-95 transition-all">
                <LockIcon className="w-5 h-5" />
                Sign In
              </button>
            </Link>
            <Link href="/">
              <button className="flex items-center gap-2 px-8 py-4 glass-premium text-white font-bold rounded-full hover:bg-white/10 transition-all">
                Return to Public Site
              </button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
