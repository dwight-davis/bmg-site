import Link from "next/link";

export function CTA() {
  return (
    <section id="schedule" className="bg-navy text-white">
      <div className="container-content section text-center">
        <p className="font-serif italic text-2xl md:text-3xl text-white/90 mb-6 max-w-column mx-auto">
          If you&apos;re overwhelmed by marketing, our services are your solution.
        </p>

        <h2 className="text-4xl sm:text-5xl md:text-6xl mb-10">
          Ready to <span className="accent">grow?</span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link href="https://calendly.com/davisdwight/30-minute-strategy-call" className="btn-red">
            Let&apos;s chat today
          </Link>
          <Link href="#audit" id="audit" className="btn-pill bg-white text-ink">
            Get started
          </Link>
        </div>

        <p className="font-body text-sm text-white/60 mt-8">
          Or call Maya, my assistant, 24/7: (208) 957-5828
        </p>
      </div>
    </section>
  );
}
