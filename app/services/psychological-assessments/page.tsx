import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { fees } from "@/data/fees";
import { ServicePageTemplate } from "@/components/features/service-page-template";
import { formatCurrency } from "@/lib/utils";

const service = services.find((s) => s.slug === "psychological-assessments");

export function generateMetadata(): Metadata {
  if (!service) return {};
  return {
    title: "ADHD & ASD Assessment Online | MindBridge Psychology - Telehealth Australia",
    description:
      "Comprehensive ADHD, autism, cognitive & personality assessments via telehealth. Clinical psychologist-led. NDIS & Medicare eligible. Results in 2-3 weeks. Book online.",
    openGraph: {
      title: "ADHD & ASD Assessment Online | MindBridge Psychology",
      description: service.shortDescription,
      type: "website",
      locale: "en_AU",
      url: "https://mindbridgepsychology.com.au/services/psychological-assessments",
    },
    twitter: {
      card: "summary_large_image",
      title: "ADHD & ASD Assessment Online | MindBridge Psychology",
      description: "Comprehensive psychological assessments via telehealth. NDIS & Medicare eligible.",
    },
    alternates: {
      canonical: "https://mindbridgepsychology.com.au/services/psychological-assessments",
    },
    keywords: [
      "ADHD assessment online australia",
      "ASD assessment telehealth",
      "psychological assessment online",
      "ndis psychology telehealth",
      "clinical psychologist telehealth melbourne",
    ],
  };
}

export default function PsychologicalAssessmentsPage() {
  if (!service) notFound();

  const adhdFee = fees.find((f) => f.id === "assessment-adhd");
  const asdFee = fees.find((f) => f.id === "assessment-asd");

  return (
    <ServicePageTemplate
      service={service}
      extraSections={
        <>
          {/* Assessment Process */}
          <section className="section-padding bg-bg-primary">
            <div className="container-content">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl text-text-primary mb-6">
                  The Assessment Process
                </h2>
                <p className="text-text-secondary mb-8">
                  Our assessment pathway is designed to be thorough, clinically
                  rigorous, and client-centred. Here is what you can expect at
                  each stage:
                </p>

                <div className="space-y-6">
                  {[
                    {
                      step: "1",
                      title: "Initial Enquiry & Screening",
                      description:
                        "We begin with a brief phone or video call to understand your concerns, discuss the assessment process, and confirm that an assessment is appropriate for your situation. We will also discuss referral requirements and funding options.",
                    },
                    {
                      step: "2",
                      title: "Clinical Interview",
                      description:
                        "A detailed clinical interview covers your developmental history, current functioning, mental health history, and specific concerns. For ADHD assessments, this includes a structured diagnostic interview using the DIVA-5. For ASD assessments, a comprehensive developmental and social history is taken.",
                    },
                    {
                      step: "3",
                      title: "Psychometric Testing",
                      description:
                        "You will complete a battery of standardised psychometric instruments selected based on the referral question. These may include cognitive assessments, self-report questionnaires, continuous performance tests, and observational tools such as the ADOS-2 for ASD evaluations.",
                    },
                    {
                      step: "4",
                      title: "Collateral Information",
                      description:
                        "Where clinically indicated and with your consent, we may gather collateral information from family members, partners, or other professionals to support the diagnostic formulation. This is particularly relevant for ADHD and ASD assessments where childhood history is important.",
                    },
                    {
                      step: "5",
                      title: "Feedback Session & Report",
                      description:
                        "You will receive a detailed verbal feedback session explaining the assessment findings, diagnostic conclusions, and tailored recommendations. A comprehensive written report is provided within 2-3 weeks of the final session, suitable for GPs, psychiatrists, the NDIS, educational institutions, and employers.",
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex gap-4 items-start"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-primary-700 font-semibold text-sm">
                          {item.step}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-sans font-semibold text-text-primary mb-1 text-base">
                          {item.title}
                        </h3>
                        <p className="text-text-secondary text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Assessment Pricing */}
          <section className="section-padding bg-bg-secondary">
            <div className="container-content">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl text-text-primary mb-6">
                  Assessment Pricing
                </h2>
                <p className="text-text-secondary mb-8">
                  Assessment fees reflect the extensive clinical time involved
                  in testing, scoring, report writing, and feedback. Below are
                  indicative costs -- final fees depend on the complexity of
                  your assessment.
                </p>

                <div className="space-y-4">
                  {adhdFee && (
                    <div className="bg-white rounded-xl p-6 border border-border-subtle">
                      <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                        <h3 className="font-sans font-semibold text-text-primary text-base">
                          ADHD Assessment
                        </h3>
                        <span className="text-primary-700 font-semibold">
                          From {formatCurrency(adhdFee.privateFee)}
                        </span>
                      </div>
                      <p className="text-text-secondary text-sm mb-2">
                        {adhdFee.duration}
                      </p>
                      <p className="text-text-tertiary text-xs">
                        {adhdFee.notes}
                      </p>
                    </div>
                  )}

                  {asdFee && (
                    <div className="bg-white rounded-xl p-6 border border-border-subtle">
                      <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                        <h3 className="font-sans font-semibold text-text-primary text-base">
                          ASD Assessment
                        </h3>
                        <span className="text-primary-700 font-semibold">
                          From {formatCurrency(asdFee.privateFee)}
                        </span>
                      </div>
                      <p className="text-text-secondary text-sm mb-2">
                        {asdFee.duration}
                      </p>
                      <p className="text-text-tertiary text-xs">
                        {asdFee.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      }
    />
  );
}
