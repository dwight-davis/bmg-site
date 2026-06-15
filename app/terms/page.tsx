import { LegalLayout } from "@/components/page/LegalLayout";

export const metadata = {
  title: "Terms of Use — Boise Marketing Guy",
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return <LegalLayout slug="terms" />;
}
