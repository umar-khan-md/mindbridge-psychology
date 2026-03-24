import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { ServicePageTemplate } from "@/components/features/service-page-template";

const service = services.find((s) => s.slug === "individual-therapy");

export function generateMetadata(): Metadata {
  if (!service) return {};
  return {
    title: "Individual Therapy Online | Telehealth Psychologist Australia - MindBridge Psychology",
    description:
      "One-on-one evidence-based therapy via secure telehealth. CBT, ACT, EMDR & Schema Therapy for anxiety, depression & trauma. Medicare bulk bill & NDIS accepted Australia-wide.",
    openGraph: {
      title: "Individual Therapy Online | MindBridge Psychology",
      description: service.shortDescription,
      type: "website",
      locale: "en_AU",
      url: "https://mindbridgepsychology.com.au/services/individual-therapy",
    },
    twitter: {
      card: "summary_large_image",
      title: "Individual Therapy Online | MindBridge Psychology",
      description:
        "Evidence-based one-on-one therapy via telehealth. Medicare bulk bill & NDIS accepted.",
    },
    alternates: {
      canonical: "https://mindbridgepsychology.com.au/services/individual-therapy",
    },
    keywords: [
      "telehealth psychologist australia",
      "online therapy australia medicare",
      "individual therapy online",
      "CBT therapy online australia",
      "psychologist near me telehealth",
      "clinical psychologist telehealth melbourne",
    ],
  };
}

export default function IndividualTherapyPage() {
  if (!service) notFound();

  return (
    <ServicePageTemplate
      service={service}
      extraSections={
        <section className="section-padding bg-bg-primary">
          <div className="container-content">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading text-2xl md:text-3xl text-text-primary mb-6">
                What to Expect in Your First Session
              </h2>
              <p className="text-text-secondary mb-4">
                Your initial session is an opportunity for you and your
                psychologist to get to know each other and begin building a
                therapeutic relationship. Your psychologist will ask about your
                current concerns, background history, and what you are hoping to
                achieve through therapy. Together you will develop an
                individualised treatment plan outlining goals, preferred
                therapeutic approaches, and a recommended session schedule.
              </p>
              <p className="text-text-secondary mb-4">
                There is no pressure to share more than you are comfortable
                with in the first session. Many clients find it helpful to
                prepare a brief summary of what they would like to discuss
                beforehand, though this is entirely optional. All information
                shared in therapy is confidential and handled in accordance with
                the Australian Psychological Society Code of Ethics and relevant
                privacy legislation.
              </p>
              <p className="text-text-secondary">
                Following your initial session, your psychologist will
                recommend a session frequency -- typically weekly or
                fortnightly -- and begin implementing the agreed therapeutic
                approach from your second session onward.
              </p>
            </div>
          </div>
        </section>
      }
    />
  );
}
