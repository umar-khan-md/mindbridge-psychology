import type { Metadata } from "next";
import { TeamPageContent } from "./team-content";

export const metadata: Metadata = {
  title:
    "Our Psychologists | MindBridge Psychology - Telehealth Psychology Australia",
  description:
    "Meet our AHPRA-registered clinical & registered psychologists. Browse by specialisation, approach & funding. Book a telehealth psychologist online Australia-wide.",
  openGraph: {
    title: "Our Psychologists | MindBridge Psychology",
    description:
      "Browse our team of AHPRA-registered clinical and registered psychologists. Filter by specialisation, approach, and funding type.",
    type: "website",
    locale: "en_AU",
    url: "https://mindbridgepsychology.com.au/team",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Psychologists | MindBridge Psychology",
    description:
      "AHPRA-registered clinical & registered psychologists. Find the right telehealth psychologist for you.",
  },
  alternates: {
    canonical: "https://mindbridgepsychology.com.au/team",
  },
  keywords: [
    "telehealth psychologist australia",
    "clinical psychologist telehealth melbourne",
    "online psychologist australia",
    "AHPRA registered psychologist",
    "psychologist near me telehealth",
  ],
};

export default function TeamPage() {
  return <TeamPageContent />;
}
