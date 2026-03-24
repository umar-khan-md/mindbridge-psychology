"use client";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ConsentForm } from "@/components/features/consent-form";
import { Card } from "@/components/ui/card";

export function ConsentPageContent() {
  return (
    <>
      <Breadcrumbs />

      {/* Hero */}
      <section className="bg-primary-950 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Telehealth Consent Form
          </h1>
          <p className="text-lg text-primary-200 max-w-2xl mx-auto">
            Before your first session, please review and sign this informed
            consent form for telehealth psychology services.
          </p>
        </div>
      </section>

      {/* Consent Form */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card padding="lg" hoverable={false}>
            <ConsentForm />
          </Card>
        </div>
      </section>
    </>
  );
}
