"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function FounderCard() {
  const pathname = usePathname()

  // Hide on admin routes
  if (pathname.startsWith("/admin")) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-right-10 duration-1000 hidden md:block">
      <div className="glass p-4 rounded-2xl border border-white/10 flex items-center gap-4 text-left hover:border-primary/50 transition-all hover:scale-105 shadow-2xl group max-w-[280px]">
        <div className="w-12 h-12 rounded-lg overflow-hidden border border-primary/30 shrink-0">
          <Image 
            src="/owner/me.png" 
            alt="Joe Grekoski" 
            width={48} 
            height={48} 
            className="object-cover" 
          />

        </div>
        <div>
          <h4 className="text-xs font-black text-white group-hover:text-primary transition-colors uppercase">Joe Grekoski</h4>
          <p className="text-[10px] text-white/50 font-bold tracking-wider">Founding Principal</p>

          <Link href="/book" className="text-[10px] text-primary font-bold hover:underline block mt-0.5">
            Schedule your confidential strategy call
          </Link>
        </div>
      </div>
    </div>
  )
}
