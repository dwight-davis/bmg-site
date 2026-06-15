import Link from "next/link";

export function Nav() {
  return (
    <nav className="absolute top-0 inset-x-0 z-30 bg-transparent">
      <div className="container-content py-5 flex items-center justify-between gap-6">
        <Link
          href="/"
          className="bg-white text-ink px-3 py-2 font-display text-sm leading-none uppercase tracking-tight"
        >
          BMG<span className="block text-[10px] tracking-eyebrow font-body font-bold">Boise Marketing Guy</span>
        </Link>

        <div className="hidden lg:flex items-center gap-7 font-body text-sm font-medium text-white/90">
          <Link href="#solution" className="hover:text-white">What we do</Link>
          <Link href="#guide" className="hover:text-white">About Dwight</Link>
          <Link href="#plan" className="hover:text-white">The plan</Link>
          <Link href="#stakes" className="hover:text-white">Results</Link>
        </div>

        <Link href="#schedule" className="btn-pill bg-red text-white shadow-crisp-sm text-xs px-5 py-3">
          Let&apos;s chat today
        </Link>
      </div>
    </nav>
  );
}
