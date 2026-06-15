import Image from "next/image";

export function Guide() {
  return (
    <section className="bg-bg-muted">
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
          <div className="eyebrow mb-4">Meet your guide</div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6">
            Dwight Davis,{" "}
            <span className="accent">Boise Marketing Guy.</span>
          </h2>
          <p className="font-body text-lg text-ink/85 mb-4">
            We understand how frustrating ineffective marketing can be.
          </p>
          <p className="font-body text-lg text-ink/85 mb-8">
            With over 20 years of experience, we have helped hundreds of
            businesses grow and obtain measurable results.
          </p>

          <div className="space-y-3 font-body text-base">
            <div>
              <span className="text-ink/60 text-sm">Direct line</span>{" "}
              <a href="tel:+12087617016" className="font-bold text-ink hover:text-red">
                (208) 761-7016
              </a>
            </div>
            <div>
              <span className="text-ink/60 text-sm">Maya, my assistant (24/7)</span>{" "}
              <a href="tel:+12089575828" className="font-bold text-ink hover:text-red">
                (208) 957-5828
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
