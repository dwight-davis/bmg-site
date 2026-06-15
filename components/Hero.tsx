import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-navy text-white">
      <div className="container-content section flex flex-col items-center text-center">
        <div className="eyebrow !text-paper mb-6">Boise Marketing Guy</div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
          We help small businesses in Boise{" "}
          <span className="accent">grow</span>
          {" "}without the marketing struggle.
        </h1>

        <p className="mt-8 max-w-column font-body text-lg md:text-xl text-white/85">
          We understand how frustrating ineffective marketing can be. With over
          20 years of experience, we have helped hundreds of businesses grow
          and get measurable results.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
          <Link href="#schedule" className="btn-red">Let&apos;s chat today</Link>
          <Link href="#audit" className="btn-pill bg-white text-ink">Get started</Link>
        </div>
      </div>
    </section>
  );
}
