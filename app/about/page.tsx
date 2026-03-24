import type { Metadata } from "next";
import { AboutPageContent } from "./about-content";

export const metadata: Metadata = {
  title: "About Us | MindBridge Psychology - Telehealth Psychology Australia",
  description:
    "MindBridge Psychology is Australia's telehealth-first psychology clinic. AHPRA-registered psychologists delivering evidence-based care Australia-wide. Medicare & NDIS accepted.",
  openGraph: {
    title: "About MindBridge Psychology | Telehealth Psychology Australia",
    description:
      "Our mission: make evidence-based psychological care accessible to every Australian through expert telehealth psychology.",
    type: "website",
    locale: "en_AU",
    url: "https://mindbridgepsychology.com.au/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About MindBridge Psychology | Telehealth Psychology Australia",
    description:
      "Australia's telehealth-first psychology clinic. AHPRA-registered psychologists delivering evidence-based care nationwide.",
  },
  alternates: {
    canonical: "https://mindbridgepsychology.com.au/about",
  },
  keywords: [
    "online psychology australia",
    "telehealth psychologist australia",
    "about mindbridge psychology",
    "australian psychology clinic",
    "AHPRA registered psychologist",
  ],
};

export default function AboutPage() {
  return <AboutPageContent />;
}
