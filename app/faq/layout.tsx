import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Frequently Asked Questions | MindBridge Psychology - Telehealth Psychology Australia",
  description:
    "Get answers about telehealth psychology, Medicare rebates, NDIS funding, bulk billing, referrals, booking & privacy. Everything you need to know about online therapy in Australia.",
  openGraph: {
    title: "FAQ | MindBridge Psychology",
    description:
      "Answers about telehealth psychology, Medicare rebates, NDIS, bulk billing, and how to get started with online therapy.",
    type: "website",
    locale: "en_AU",
    url: "https://mindbridgepsychology.com.au/faq",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | MindBridge Psychology",
    description:
      "Common questions about telehealth psychology, Medicare, NDIS & online therapy in Australia.",
  },
  alternates: {
    canonical: "https://mindbridgepsychology.com.au/faq",
  },
  keywords: [
    "telehealth psychology FAQ",
    "online therapy australia medicare",
    "bulk bill psychologist telehealth",
    "ndis psychology questions",
    "mental health treatment plan online",
  ],
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
