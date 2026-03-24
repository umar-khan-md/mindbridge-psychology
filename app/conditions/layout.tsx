import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Mental Health Conditions We Treat | MindBridge Psychology - Telehealth Australia",
  description:
    "Browse 39+ mental health conditions treated by our telehealth psychologists. Anxiety, depression, PTSD, ADHD, OCD, couples issues & more. Evidence-based online therapy Australia.",
  openGraph: {
    title: "Conditions We Treat | MindBridge Psychology",
    description:
      "Evidence-based telehealth treatment for anxiety, depression, PTSD, ADHD, OCD, relationship issues & more. Medicare & NDIS accepted.",
    type: "website",
    locale: "en_AU",
    url: "https://mindbridgepsychology.com.au/conditions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conditions We Treat | MindBridge Psychology",
    description:
      "Telehealth treatment for 39+ mental health conditions. Evidence-based therapy Australia-wide.",
  },
  alternates: {
    canonical: "https://mindbridgepsychology.com.au/conditions",
  },
  keywords: [
    "online psychology australia",
    "telehealth psychologist australia",
    "anxiety treatment online",
    "depression therapy telehealth",
    "ADHD psychologist telehealth",
    "PTSD therapy online australia",
  ],
};

export default function ConditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
