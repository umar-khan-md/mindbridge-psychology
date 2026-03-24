import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Mental Health Resources & Articles | MindBridge Psychology - Online Psychology Australia",
  description:
    "Expert mental health articles by registered psychologists. Anxiety, depression, relationships, NDIS guides, workplace burnout & more. Evidence-based telehealth psychology insights.",
  openGraph: {
    title: "Mental Health Resources & Articles | MindBridge Psychology",
    description:
      "Expert mental health articles written by AHPRA-registered psychologists. Evidence-based insights and guides.",
    type: "website",
    locale: "en_AU",
    url: "https://mindbridgepsychology.com.au/resources",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mental Health Resources | MindBridge Psychology",
    description:
      "Expert mental health articles by registered psychologists. Evidence-based guides & insights.",
  },
  alternates: {
    canonical: "https://mindbridgepsychology.com.au/resources",
  },
  keywords: [
    "mental health articles australia",
    "psychology resources online",
    "anxiety self help",
    "depression resources",
    "telehealth psychology blog",
  ],
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
