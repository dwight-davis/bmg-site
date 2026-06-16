import { Hero } from "@/components/Hero";
import { Empathy } from "@/components/Empathy";
import { Outcomes } from "@/components/Outcomes";
import { Trust } from "@/components/Trust";
import { Guide } from "@/components/Guide";
import { Plan } from "@/components/Plan";
import { LeadMagnet } from "@/components/LeadMagnet";
import { Stakes } from "@/components/Stakes";
import { Transformation } from "@/components/Transformation";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/schema/JsonLd";
import { personSchema } from "@/lib/seo";

export default function HomePage() {
  return (
    <main>
      <JsonLd data={personSchema()} />
      <Hero />
      <Empathy />
      <section id="solution"></section>
      <Outcomes />
      <LeadMagnet />
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
