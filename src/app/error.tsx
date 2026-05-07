"use client";

import { useEffect } from "react";
import { GradientHeader } from "@/components/gradient-header";
import { RefreshCcwIcon } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#05070a] flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <div className="relative z-10 space-y-8 max-w-2xl">
          <div className="space-y-2">
            <p className="text-secondary font-black tracking-[0.5em] uppercase text-xs">Technical Fault</p>
            <GradientHeader tag="h1" size="lg">Something Went Wrong</GradientHeader>
          </div>
          
          <p className="text-white/60 text-lg leading-relaxed">
            Our systems encountered an unexpected variable. We&apos;ve logged the issue and are analyzing the data. 
            Try refreshing the strategy.
          </p>

          <div className="flex justify-center pt-4">
            <button 
              onClick={() => reset()}
              className="flex items-center gap-2 px-8 py-4 bg-secondary text-white font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(58,123,213,0.4)]"
            >
              <RefreshCcwIcon className="w-5 h-5" />
              Try Again
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
