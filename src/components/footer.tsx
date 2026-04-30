import Link from "next/link";
import { Logo } from "./logo";

export function Footer() {
  return (
    <div className="w-full flex flex-col items-center space-y-12 py-16 relative z-10">
      {/* Confidence Tags */}
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-sm font-black text-white/80 uppercase tracking-[0.4em] px-4">
        <span>100% Confidential</span>
        <span>Built for the Next Generation of NBA Stars</span>
        <span>Litigation-Proven Strategies</span>
      </div>

      {/* Mini Footer Links */}
      <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-black text-white/60 uppercase tracking-widest border-t border-white/5 pt-8 w-full max-w-3xl px-4">
        <Link href="/#about" className="hover:text-white transition-colors">About</Link>
        <Link href="/#services" className="hover:text-white transition-colors">Services</Link>
        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>

        <Link href="/nba-players" className="hover:text-white transition-colors">NBA Players</Link>
        <Link href="/college-prospects" className="hover:text-white transition-colors">College Prospects</Link>
      </nav>

      <footer className="w-full flex flex-col items-center gap-6 pt-4">
        <Logo variant="vertical" width={60} height={60} className="opacity-60 hover:opacity-100 transition-opacity" />
        <address className="not-italic text-xs font-bold text-white/20 uppercase tracking-[0.2em] text-center">
          Acclimation Sports Management &bull; Fort Lauderdale, FL 33308 &bull;{" "}
          <a href="tel:5125186547" className="hover:text-white/50 transition-colors">512-518-6547</a>
        </address>
        <p className="text-xs font-black text-white/30 uppercase tracking-[0.3em] text-center px-4">
          © {new Date().getFullYear()} ACCLIMATION SPORTS MANAGEMENT ALL RIGHTS RESERVED
        </p>
      </footer>
    </div>
  );
}
