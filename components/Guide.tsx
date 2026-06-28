import Image from "next/image";

export function Guide() {
  return (
    <section id="guide" className="bg-bg-muted">
      <div className="container-content section grid md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-2 flex justify-center md:justify-start">
          <div className="rounded-full overflow-hidden border-8 border-ink shadow-crisp w-64 h-64 sm:w-72 sm:h-72">
            <Image
              src="/dwight.png"
              alt="Dwight Davis, founder of Boise Marketing Guy"
              width={448}
              height={422}
              priority
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6">
            Dwight Davis,{" "}
            <span className="accent">Boise Marketing Guy.</span>
          </h2>
          <p className="font-body text-lg text-ink/85 mb-4 leading-relaxed">
            The marketing you bought wasn&apos;t supposed to feel like a
            gamble. I&apos;ve spent twenty years cleaning up after
            marketing built that way.
          </p>
          <p className="font-body text-lg text-ink/85 mb-4 leading-relaxed">
            I started in my mom&apos;s basement on an IBM PCjr, writing
            databases on green screens before personal computers were
            normal. I never really stopped. These days I place
            $450,000 a month in paid media and watch every dollar to
            make sure it&apos;s bringing in real customers, not just
            clicks.
          </p>
          <p className="font-body text-lg text-ink/85 mb-8 leading-relaxed">
            I built Boise Marketing Guy for the owner who&apos;s done
            gambling. You stay the expert in what you do. I&apos;ll be
            the one in your corner who knows where the money lands and
            how to make next month beat this one.
          </p>

          <div className="space-y-3 font-body text-base">
            <div>
              <span className="text-ink/60 text-sm">Talk to Maya, my 24/7 assistant</span>{" "}
              <a href="tel:+12089923986" className="font-bold text-ink hover:text-red">
                (208) 992-3986
              </a>
            </div>
            <div>
              <span className="text-ink/60 text-sm">Or email</span>{" "}
              <a href="mailto:dwight@boisemarketingguy.com" className="font-bold text-ink hover:text-red">
                dwight@boisemarketingguy.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
