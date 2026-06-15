import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Guide } from "@/components/Guide";
import { Plan } from "@/components/Plan";
import { Stakes } from "@/components/Stakes";
import { Transformation } from "@/components/Transformation";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Problem />
      <Guide />
      <Plan />
      <Stakes />
      <Transformation />
      <CTA />
      <Footer />
    </main>
  );
}
