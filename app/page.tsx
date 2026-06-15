import { Hero } from "@/components/Hero";
import { Empathy } from "@/components/Empathy";
import { Outcomes } from "@/components/Outcomes";
import { Trust } from "@/components/Trust";
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
      <Empathy />
      <section id="solution"></section>
      <Outcomes />
      <Trust />
      <Guide />
      <Plan />
      <Stakes />
      <Transformation />
      <CTA />
      <Footer />
    </main>
  );
}
