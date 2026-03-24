import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { practitioners } from "@/data/practitioners";
import { PractitionerProfile } from "./profile-content";

/* ==========================================================================
   Individual Practitioner Profile — MindBridge Psychology
   ========================================================================== */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return practitioners.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const practitioner = practitioners.find((p) => p.slug === slug);

  if (!practitioner) {
    return { title: "Psychologist Not Found" };
  }

  const fullName = `${practitioner.firstName} ${practitioner.lastName}`;

  return {
    title: `${fullName} — ${practitioner.title} | MindBridge Psychology - Telehealth Australia`,
    description: `${fullName} is a ${practitioner.title.toLowerCase()} at MindBridge Psychology specialising in ${practitioner.specialisations.slice(0, 3).join(", ")}. AHPRA registered. Book a telehealth session today.`,
    openGraph: {
      title: `${fullName} | ${practitioner.title} | MindBridge Psychology`,
      description: `${practitioner.title} specialising in ${practitioner.specialisations.slice(0, 3).join(", ")}. AHPRA registered. Book a telehealth session online.`,
      type: "profile",
      locale: "en_AU",
      url: `https://mindbridgepsychology.com.au/team/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${fullName} | ${practitioner.title} | MindBridge Psychology`,
      description: `${practitioner.title} specialising in ${practitioner.specialisations.slice(0, 3).join(", ")}. Book telehealth.`,
    },
    alternates: {
      canonical: `https://mindbridgepsychology.com.au/team/${slug}`,
    },
    keywords: [
      "telehealth psychologist australia",
      `${practitioner.title.toLowerCase()} telehealth`,
      "clinical psychologist telehealth melbourne",
      "AHPRA registered psychologist",
      ...practitioner.specialisations.slice(0, 3).map((s) => s.toLowerCase()),
    ],
  };
}

export default async function PractitionerPage({ params }: PageProps) {
  const { slug } = await params;
  const practitioner = practitioners.find((p) => p.slug === slug);

  if (!practitioner) {
    notFound();
  }

  return <PractitionerProfile practitioner={practitioner} />;
}
