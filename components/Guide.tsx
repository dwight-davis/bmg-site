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
            I started in my mom&apos;s basement on an IBM PC JR, writing
            databases on green screens before personal computers were
            normal. Twenty years later I&apos;m still here, except now
            I&apos;m placing $450,000 a month in paid media and watching
            every dollar to make sure it&apos;s bringing real customers,
            not just clicks.
          </p>
          <p className="font-body text-lg text-ink/85 mb-8 leading-relaxed">
            I built Boise Marketing Guy because I&apos;ve seen too many
            small businesses pour money into marketing that doesn&apos;t
            move the needle. Yours shouldn&apos;t be one of them.
          </p>

          <div className="space-y-3 font-body text-base">
            <div>
              <span className="text-ink/60 text-sm">Talk to Maya, my 24/7 assistant</span>{" "}
              <a href="tel:+12089575828" className="font-bold text-ink hover:text-red">
                (208) 957-5828
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
