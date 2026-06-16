import Link from "next/link";
import { CalendlyButton } from "./CalendlyButton";

export function Nav() {
  return (
    <nav className="absolute top-0 inset-x-0 z-30 bg-transparent">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-5 flex items-center justify-between gap-6">
        <Link href="/" aria-label="Boise Marketing Guy — home" className="block">
          <div className="bg-white text-ink inline-block px-4 py-2.5 leading-none">
            <div className="font-display uppercase tracking-tight text-2xl leading-none">
              Boise
            </div>
            <div className="font-display uppercase tracking-tight text-2xl leading-none mt-0.5">
              Marketing Guy
            </div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-7 font-body text-sm font-medium text-white/90">
          <Link href="/services/" className="hover:text-white">Services</Link>
          <Link href="/about/" className="hover:text-white">About Dwight</Link>
          <Link href="/industries/" className="hover:text-white">Industries</Link>
          <Link href="/blog/" className="hover:text-white">Field notes</Link>
          <Link href="/contact/" className="hover:text-white">Contact</Link>
        </div>

        <CalendlyButton className="btn-pill bg-red text-white shadow-crisp-sm text-xs px-5 py-3">
          Let&apos;s chat today
        </CalendlyButton>
      </div>
    </nav>
  );
}
