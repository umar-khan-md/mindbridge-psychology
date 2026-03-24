import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { ServicePageTemplate } from "@/components/features/service-page-template";
import { Badge } from "@/components/ui/badge";

const service = services.find((s) => s.slug === "group-therapy");

export function generateMetadata(): Metadata {
  if (!service) return {};
  return {
    title: "Online Group Therapy Programs | MindBridge Psychology - Telehealth Australia",
    description:
      "Join facilitated online group therapy programs for anxiety, depression & more. Affordable telehealth group sessions with registered psychologists. Medicare eligible.",
    openGraph: {
      title: "Online Group Therapy Programs | MindBridge Psychology",
      description: service.shortDescription,
      type: "website",
      locale: "en_AU",
      url: "https://mindbridgepsychology.com.au/services/group-therapy",
    },
    twitter: {
      card: "summary_large_image",
      title: "Online Group Therapy | MindBridge Psychology",
      description: "Facilitated online group therapy programs with registered psychologists.",
    },
    alternates: {
      canonical: "https://mindbridgepsychology.com.au/services/group-therapy",
    },
    keywords: [
      "group therapy online australia",
      "telehealth group programs",
      "online psychology australia",
      "group CBT australia",
    ],
  };
}

export default function GroupTherapyPage() {
  if (!service) notFound();

  return (
    <ServicePageTemplate
      service={service}
      extraSections={
        <section className="section-padding bg-bg-primary">
          <div className="container-content">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading text-2xl md:text-3xl text-text-primary mb-6">
                Current Group Programs
              </h2>
              <p className="text-text-secondary mb-8">
                We run structured therapeutic group programs throughout the
                year. Each program is facilitated by an experienced psychologist
                and limited to 6-10 participants to ensure a safe, supportive
                environment.
              </p>

              <div className="space-y-6">
                {/* Program 1 */}
                <div className="bg-white rounded-xl p-6 border border-border-subtle">
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                    <h3 className="font-sans font-semibold text-text-primary text-base">
                      CBT Anxiety Management Group
                    </h3>
                    <Badge variant="default" size="sm">
                      10 weeks
                    </Badge>
                  </div>
                  <p className="text-text-secondary text-sm">
                    A structured Cognitive Behavioural Therapy program targeting
                    generalised anxiety, social anxiety, and panic. Participants
                    learn cognitive restructuring, exposure techniques,
                    relaxation strategies, and relapse prevention skills.
                  </p>
                </div>

                {/* Program 2 */}
                <div className="bg-white rounded-xl p-6 border border-border-subtle">
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                    <h3 className="font-sans font-semibold text-text-primary text-base">
                      Behavioural Activation for Depression
                    </h3>
                    <Badge variant="default" size="sm">
                      8 weeks
                    </Badge>
                  </div>
                  <p className="text-text-secondary text-sm">
                    Based on the Behavioural Activation model, this program
                    helps participants re-engage with valued activities, break
                    cycles of avoidance and withdrawal, and build sustainable
                    routines that support mood improvement.
                  </p>
                </div>

                {/* Program 3 */}
                <div className="bg-white rounded-xl p-6 border border-border-subtle">
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                    <h3 className="font-sans font-semibold text-text-primary text-base">
                      DBT Skills Training Group
                    </h3>
                    <Badge variant="default" size="sm">
                      12 weeks
                    </Badge>
                  </div>
                  <p className="text-text-secondary text-sm">
                    Covering the four core DBT modules -- mindfulness, distress
                    tolerance, emotion regulation, and interpersonal
                    effectiveness -- this program provides practical skills for
                    managing intense emotions and improving relationships.
                  </p>
                </div>
              </div>

              <p className="text-text-secondary text-sm mt-6">
                A brief screening call is required before enrolment to ensure
                the group is an appropriate fit. New groups commence throughout
                the year. Contact us to register your interest or to be
                notified when the next intake opens.
              </p>
            </div>
          </div>
        </section>
      }
    />
  );
}
