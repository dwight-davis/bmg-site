import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-navy text-white">
      <div className="container-content section flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full border-2 border-paper flex items-center justify-center mb-8">
          <span className="font-display text-paper text-2xl leading-none">B</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl max-w-4xl">
          We help small businesses in Boise{" "}
          <span className="accent">grow</span>{" "}
          without the marketing struggle.
        </h1>

        <p className="mt-10 max-w-column font-body text-lg md:text-xl text-white/85 leading-relaxed">
          If you&apos;re tired of pouring money into marketing that doesn&apos;t
          bring customers, you&apos;re not alone. We get it. We&apos;ve been
          helping Boise small businesses grow for more than 20 years.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
          <Link href="#schedule" className="btn-red">Let&apos;s chat today</Link>
          <Link href="#solution" className="btn-pill bg-transparent text-white border-2 border-white shadow-none">
            See how it works
          </Link>
        </div>
      </div>
    </section>
  );
}
