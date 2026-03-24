import type { Metadata } from "next";
import { HowItWorksPageContent } from "./how-it-works-content";

export const metadata: Metadata = {
  title:
    "How Telehealth Psychology Works | MindBridge Psychology - Online Therapy Australia",
  description:
    "Learn how online therapy works at MindBridge. Find a telehealth psychologist, choose Medicare or NDIS funding, book online, and attend your session from home. Simple 4-step process.",
  openGraph: {
    title: "How Telehealth Psychology Works | MindBridge Psychology",
    description:
      "Four simple steps to expert psychological care. Medicare, NDIS, WorkCover & DVA accepted. Book your first telehealth session today.",
    type: "website",
    locale: "en_AU",
    url: "https://mindbridgepsychology.com.au/how-it-works",
  },
  twitter: {
    card: "summary_large_image",
    title: "How Telehealth Psychology Works | MindBridge Psychology",
    description:
      "Four simple steps to expert psychological care from home. Medicare & NDIS accepted.",
  },
  alternates: {
    canonical: "https://mindbridgepsychology.com.au/how-it-works",
  },
  keywords: [
    "how telehealth psychology works",
    "online therapy australia",
    "telehealth psychologist australia",
    "book psychologist online australia",
    "mental health treatment plan online",
  ],
};

export default function HowItWorksPage() {
  return <HowItWorksPageContent />;
}
