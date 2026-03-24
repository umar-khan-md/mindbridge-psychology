import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { ServicePageTemplate } from "@/components/features/service-page-template";

const service = services.find((s) => s.slug === "couples-relationship-therapy");

export function generateMetadata(): Metadata {
  if (!service) return {};
  return {
    title: "Couples Therapy Online Australia | MindBridge Psychology - Telehealth Counselling",
    description:
      "Expert couples therapy online via secure telehealth. Gottman Method & EFT trained therapists. Improve communication, rebuild trust. Medicare rebates available Australia-wide.",
    openGraph: {
      title: "Couples Therapy Online Australia | MindBridge Psychology",
      description: service.shortDescription,
      type: "website",
      locale: "en_AU",
      url: "https://mindbridgepsychology.com.au/services/couples-therapy",
    },
    twitter: {
      card: "summary_large_image",
      title: "Couples Therapy Online | MindBridge Psychology",
      description:
        "Expert couples therapy via telehealth. Gottman Method & EFT trained therapists. Australia-wide.",
    },
    alternates: {
      canonical: "https://mindbridgepsychology.com.au/services/couples-therapy",
    },
    keywords: [
      "couples therapy online australia",
      "relationship counselling telehealth",
      "gottman therapy online",
      "marriage counselling australia",
      "telehealth couples counselling",
    ],
  };
}

export default function CouplesTherapyPage() {
  if (!service) notFound();

  return (
    <ServicePageTemplate
      service={service}
      extraSections={
        <section className="section-padding bg-bg-primary">
          <div className="container-content">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading text-2xl md:text-3xl text-text-primary mb-6">
                How Telehealth Couples Therapy Works
              </h2>
              <p className="text-text-secondary mb-4">
                One of the advantages of telehealth couples therapy is that both
                partners can attend from wherever they are -- whether in the
                same room or in different locations. This flexibility is
                particularly valuable for couples managing busy schedules, those
                in long-distance relationships, or partners who feel more
                comfortable beginning therapy from the privacy of their own
                space.
              </p>
              <p className="text-text-secondary mb-4">
                Sessions are 80 minutes in duration to allow sufficient time for
                both partners to be heard and for the therapist to facilitate
                meaningful dialogue. Your therapist may assign between-session
                exercises such as communication practice tasks, reflective
                journaling, or structured check-in conversations to reinforce
                the skills developed in session.
              </p>
              <p className="text-text-secondary">
                We recommend that both partners attend all sessions where
                possible, though your therapist may occasionally suggest
                individual sessions to explore specific themes in more depth.
                Couples therapy at MindBridge is a non-judgemental space where
                both partners are treated with equal respect and care.
              </p>
            </div>
          </div>
        </section>
      }
    />
  );
}
