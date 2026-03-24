"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2, ShieldCheck } from "lucide-react";
import { consentSchema, type ConsentFormData } from "@/lib/validators";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
   Consent sections with explanatory text
   -------------------------------------------------------------------------- */

interface ConsentSection {
  fieldName: keyof ConsentFormData;
  title: string;
  content: string;
}

const consentSections: ConsentSection[] = [
  {
    fieldName: "telehealthNature",
    title: "1. Nature of Telehealth Services",
    content:
      "Telehealth involves the delivery of psychological services via secure video conferencing technology. Your sessions will be conducted over an encrypted, HIPAA-compliant video platform. Telehealth is not a replacement for in-person emergency care. Your psychologist will be located in Australia and is registered with AHPRA.",
  },
  {
    fieldName: "benefits",
    title: "2. Benefits of Telehealth",
    content:
      "Telehealth offers convenient access to psychological services from any location in Australia. It removes geographical barriers, reduces travel time and costs, and allows you to attend sessions in a familiar and comfortable environment. Research demonstrates that telehealth psychology is equally effective as face-to-face sessions for most presenting concerns.",
  },
  {
    fieldName: "risks",
    title: "3. Potential Risks",
    content:
      "While telehealth is generally safe and effective, potential risks include: technology failures (internet disruptions, audio/video issues), reduced ability for the clinician to observe non-verbal cues, privacy concerns if you are not in a private space, and the possibility that telehealth may not be appropriate for all conditions or crisis situations. If your clinician determines that telehealth is not suitable for your needs, they will discuss alternative options.",
  },
  {
    fieldName: "privacy",
    title: "4. Privacy & Confidentiality",
    content:
      "Your sessions are confidential and subject to the same professional and legal standards as in-person sessions. All video sessions are conducted on an encrypted platform. Your clinical records are stored securely in compliance with the Australian Privacy Principles. We will not share your information without your consent, except where required by law (e.g., mandatory reporting obligations, court orders, or imminent risk of harm).",
  },
  {
    fieldName: "recordingPolicy",
    title: "5. Recording Policy",
    content:
      "Sessions will NOT be recorded by MindBridge Psychology unless explicitly agreed upon in writing by both parties for a specific clinical purpose. You agree not to record, screenshot, or distribute any part of your telehealth sessions. Any breach of this policy may result in termination of services.",
  },
  {
    fieldName: "emergencyProcedures",
    title: "6. Emergency Procedures",
    content:
      "Telehealth sessions are not suitable for acute emergencies. If you are experiencing a mental health crisis during or outside of your session, you should: call 000 (emergency services), contact Lifeline on 13 11 14, or attend your nearest emergency department. You agree to provide your physical location at the start of each session so your clinician can coordinate emergency services if needed.",
  },
  {
    fieldName: "cancellationPolicy",
    title: "7. Cancellation Policy",
    content:
      "We require a minimum of 24 hours notice for cancellations or rescheduling. Late cancellations (less than 24 hours) or missed appointments may incur a cancellation fee equivalent to the full session cost. Medicare rebates cannot be claimed for cancelled or missed sessions. We understand that emergencies arise and will consider these on a case-by-case basis.",
  },
];

/* --------------------------------------------------------------------------
   Component
   -------------------------------------------------------------------------- */

export function ConsentForm() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ConsentFormData>({
    resolver: zodResolver(consentSchema),
    defaultValues: {
      telehealthNature: false as unknown as true,
      benefits: false as unknown as true,
      risks: false as unknown as true,
      privacy: false as unknown as true,
      recordingPolicy: false as unknown as true,
      emergencyProcedures: false as unknown as true,
      cancellationPolicy: false as unknown as true,
      signatureName: "",
      signatureDate: new Date().toISOString().split("T")[0],
    },
  });

  const watchedFields = watch();

  // Check whether all checkboxes are true
  const allChecked = consentSections.every(
    (s) => watchedFields[s.fieldName] === true
  );

  async function onSubmit(data: ConsentFormData) {
    try {
      const response = await fetch("/api/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Submission failed");
      }

      setIsSubmitted(true);
      toast({
        variant: "success",
        title: "Consent recorded",
        description: "Your telehealth consent has been securely stored.",
      });
    } catch (error) {
      toast({
        variant: "error",
        title: "Submission failed",
        description:
          error instanceof Error ? error.message : "Please try again later.",
      });
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 mb-5">
          <ShieldCheck className="h-10 w-10 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-semibold text-primary-900 mb-3">
          Consent Recorded
        </h3>
        <p className="text-neutral-600 max-w-lg mx-auto">
          Your telehealth consent has been securely stored. You will receive a
          copy via email for your records. You can proceed to book your first
          session.
        </p>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Telehealth consent form">
      {/* Accessible error summary */}
      {errorCount > 0 && (
        <div role="alert" aria-live="assertive" className="sr-only">
          {errorCount} {errorCount === 1 ? "error" : "errors"} found. Please acknowledge all sections and fill in required fields.
        </div>
      )}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <ShieldCheck className="h-6 w-6 text-primary-700" />
          <h2 className="text-xl font-semibold text-primary-900">
            Informed Consent for Telehealth Services
          </h2>
        </div>
        <p className="text-neutral-600 text-sm">
          Please read each section carefully and check the acknowledgment box to
          indicate you understand and agree. All sections must be acknowledged
          before you can sign and submit this form.
        </p>
      </div>

      <div className="space-y-6">
        {consentSections.map((section) => (
          <div
            key={section.fieldName}
            className={cn(
              "rounded-lg border p-5 transition-colors",
              watchedFields[section.fieldName] === true
                ? "bg-emerald-50/50 border-emerald-200"
                : "bg-white border-neutral-200"
            )}
          >
            <h3 className="text-base font-semibold text-primary-900 mb-2">
              {section.title}
            </h3>
            <p className="text-sm text-neutral-700 leading-relaxed mb-4">
              {section.content}
            </p>

            <Controller
              name={section.fieldName as "telehealthNature" | "benefits" | "risks" | "privacy" | "recordingPolicy" | "emergencyProcedures" | "cancellationPolicy"}
              control={control}
              render={({ field }) => (
                <div>
                  <Checkbox
                    label="I have read, understood, and agree to the above"
                    checked={field.value === true}
                    onChange={(e) => field.onChange((e.target as HTMLInputElement).checked)}
                  />
                  {errors[section.fieldName as keyof ConsentFormData]?.message && (
                    <p className="mt-1 text-sm text-red-600 ml-8" role="alert">
                      {errors[section.fieldName as keyof ConsentFormData]?.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        ))}
      </div>

      {/* Digital Signature */}
      <div className="mt-8 border-t border-neutral-200 pt-6">
        <h3 className="text-lg font-semibold text-primary-900 mb-4">
          Digital Signature
        </h3>
        <p className="text-sm text-neutral-600 mb-4">
          By typing your full legal name below, you are providing your digital
          signature and confirming that you have read, understood, and agree to
          all sections of this consent form.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Legal Name *"
            placeholder="Type your full name as a signature"
            autoComplete="name"
            error={errors.signatureName?.message}
            {...register("signatureName")}
          />
          <Input
            label="Date *"
            type="date"
            error={errors.signatureDate?.message}
            {...register("signatureDate")}
          />
        </div>
      </div>

      <div className="mt-8">
        <Button
          type="submit"
          loading={isSubmitting}
          fullWidth
          size="lg"
          disabled={!allChecked}
          iconLeft={<Send className="h-4 w-4" />}
        >
          {isSubmitting ? "Submitting..." : "Sign & Submit Consent"}
        </Button>
        {!allChecked && (
          <p className="text-sm text-neutral-500 text-center mt-2">
            Please acknowledge all sections above before submitting.
          </p>
        )}
      </div>
    </form>
  );
}
