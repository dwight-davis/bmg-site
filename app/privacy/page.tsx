import { LegalLayout } from "@/components/page/LegalLayout";

export const metadata = {
  title: "Privacy Policy — Boise Marketing Guy",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return <LegalLayout slug="privacy" />;
}
