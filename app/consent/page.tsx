import type { Metadata } from "next";
import { ConsentPageContent } from "./consent-content";

export const metadata: Metadata = {
  title: "Telehealth Consent | MindBridge Psychology - Informed Consent Form",
  description:
    "Review and sign your informed consent for telehealth psychology services with MindBridge Psychology. Covers privacy, risks, benefits, emergency procedures, and cancellation.",
  openGraph: {
    title: "Telehealth Consent | MindBridge Psychology",
    description:
      "Provide your informed consent for telehealth psychology sessions with MindBridge Psychology.",
    type: "website",
    locale: "en_AU",
    url: "https://mindbridgepsychology.com.au/consent",
  },
  twitter: {
    card: "summary",
    title: "Telehealth Consent | MindBridge Psychology",
    description: "Informed consent for telehealth psychology sessions.",
  },
  alternates: {
    canonical: "https://mindbridgepsychology.com.au/consent",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ConsentPage() {
  return <ConsentPageContent />;
}
