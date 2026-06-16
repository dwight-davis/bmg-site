import Link from "next/link";
import {
  getIndustries,
  getLocations,
  getServiceCategories,
} from "@/lib/wp-content";
import { CalendlyButton } from "./CalendlyButton";

// Sitewide footer. Dark navy, mirrors storybrand.com's footer treatment
// (organized link columns, copyright row at bottom) but expanded to expose
// BMG's full URL inventory — every industry, every location, every service
// category — as a crawlable internal-link surface.

export function Footer() {
  const industries = getIndustries();
  const locations = getLocations();
  const serviceCats = getServiceCategories();

  return (
    <footer className="bg-navy text-white/70">
      {/* Top — brand + thematic columns */}
      <div className="mx-auto w-full max-w-[1280px] px-6 pt-16 pb-10">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand block */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-block">
              <div className="bg-white text-ink inline-block px-4 py-2.5 leading-none">
                <div className="font-display uppercase tracking-tight text-2xl leading-none">
                  Boise
                </div>
                <div className="font-display uppercase tracking-tight text-2xl leading-none mt-0.5">
                  Marketing Guy
                </div>
              </div>
            </Link>
            <p className="font-body text-sm leading-relaxed mt-6 max-w-sm">
              Local marketing help for small businesses across Idaho and
              beyond. Twenty years of getting customers to call, click, and
              walk in.
            </p>
            <div className="font-body text-sm mt-6 space-y-1.5">
              <div>
                <span className="text-white/50 text-xs">Talk to Maya, 24/7</span>{" "}
                <a className="hover:text-white" href="tel:+12089575828">
                  (208) 957-5828
                </a>
              </div>
              <div>
                <a className="hover:text-white" href="mailto:dwight@boisemarketingguy.com">
                  dwight@boisemarketingguy.com
                </a>
              </div>
              <div className="text-white/40 text-xs mt-3">
                Boise, Idaho
              </div>
            </div>
          </div>

          {/* What we do */}
          <div className="md:col-span-3">
            <div className="font-display uppercase tracking-eyebrow text-xs text-white mb-4">
              What we do
            </div>
            <ul className="font-body text-sm space-y-2">
              <li><Link className="hover:text-white" href="/services/">All services</Link></li>
              {serviceCats.map((c) => (
                <li key={c.slug}>
                  <Link className="hover:text-white" href={`/services/${c.slug}/`}>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About + Resources */}
          <div className="md:col-span-2">
            <div className="font-display uppercase tracking-eyebrow text-xs text-white mb-4">
              About
            </div>
            <ul className="font-body text-sm space-y-2">
              <li><Link className="hover:text-white" href="/about/">About Dwight</Link></li>
              <li><Link className="hover:text-white" href="/blog/">Blog</Link></li>
              <li><Link className="hover:text-white" href="/contact/">Contact</Link></li>
              <li><CalendlyButton className="hover:text-white cursor-pointer">Schedule a call</CalendlyButton></li>
            </ul>
          </div>

          {/* Reach */}
          <div className="md:col-span-3">
            <div className="font-display uppercase tracking-eyebrow text-xs text-white mb-4">
              Ready to talk?
            </div>
            <p className="font-body text-sm leading-relaxed mb-4">
              Free 30-minute strategy call. No commitment. We figure out if I
              can help, and what it would take.
            </p>
            <CalendlyButton className="btn-pill bg-red text-white shadow-crisp-sm text-xs px-5 py-3">
              Let&apos;s chat today
            </CalendlyButton>
          </div>
        </div>
      </div>

      {/* Industries directory */}
      <div className="border-t border-white/10">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-10">
          <div className="font-display uppercase tracking-eyebrow text-xs text-white mb-5">
            Marketing by industry
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2 font-body text-sm">
            {industries.map((i) => (
              <li key={i.slug}>
                <Link className="hover:text-white" href={`/industries/${i.slug}/`}>
                  {i.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Locations directory */}
      <div className="border-t border-white/10">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-10">
          <div className="font-display uppercase tracking-eyebrow text-xs text-white mb-5">
            Marketing services by location
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2 font-body text-sm">
            {locations.map((l) => (
              <li key={l.slug}>
                <Link className="hover:text-white" href={`/locations/${l.slug}/`}>
                  {l.title.replace(/^Marketing Services in /, "").replace(/, Idaho$/, "")}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom row */}
      <div className="border-t border-white/10">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-6 flex flex-wrap items-center gap-4 justify-between font-body text-xs text-white/40">
          <div>
            © {new Date().getFullYear()} Boise Marketing Guy. All rights reserved.
          </div>
          <div className="flex gap-5">
            <Link className="hover:text-white/70" href="/privacy/">Privacy</Link>
            <Link className="hover:text-white/70" href="/terms/">Terms</Link>
            <Link className="hover:text-white/70" href="/accessibility/">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
