"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2 } from "lucide-react";
import { referralSchema, type ReferralFormData } from "@/lib/validators";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/toast";

export function ReferralForm() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReferralFormData>({
    resolver: zodResolver(referralSchema),
    defaultValues: {
      referrerName: "",
      referrerEmail: "",
      referrerPhone: "",
      referrerPractice: "",
      patientName: "",
      patientEmail: "",
      patientPhone: "",
      referralReason: "",
      mentalHealthPlan: false,
      additionalNotes: "",
    },
  });

  async function onSubmit(data: ReferralFormData) {
    try {
      const response = await fetch("/api/referral", {
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
        title: "Referral submitted",
        description: "We will contact the patient within 1–2 business days.",
      });
      reset();
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
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 mb-4">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        <h3 className="text-xl font-semibold text-primary-900 mb-2">
          Referral Submitted Successfully
        </h3>
        <p className="text-neutral-600 mb-6 max-w-md mx-auto">
          Thank you for your referral. We will reach out to the patient within
          1–2 business days and keep you informed of their progress as
          appropriate.
        </p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
          Submit Another Referral
        </Button>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6" aria-label="GP referral form">
      {/* Accessible error summary */}
      {errorCount > 0 && (
        <div role="alert" aria-live="assertive" className="sr-only">
          {errorCount} {errorCount === 1 ? "error" : "errors"} found. Please correct the highlighted fields.
        </div>
      )}
      {/* Referrer Information */}
      <div>
        <h3 className="text-lg font-semibold text-primary-900 mb-4">
          Your Details (Referrer)
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Your Name *"
              placeholder="Dr. Jane Smith"
              autoComplete="name"
              error={errors.referrerName?.message}
              {...register("referrerName")}
            />
            <Input
              label="Practice / Organisation *"
              placeholder="Melbourne Medical Centre"
              autoComplete="organization"
              error={errors.referrerPractice?.message}
              {...register("referrerPractice")}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email Address *"
              type="email"
              placeholder="doctor@practice.com.au"
              autoComplete="email"
              error={errors.referrerEmail?.message}
              {...register("referrerEmail")}
            />
            <Input
              label="Phone Number *"
              type="tel"
              placeholder="03 XXXX XXXX"
              autoComplete="tel"
              error={errors.referrerPhone?.message}
              {...register("referrerPhone")}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Patient Information */}
      <div>
        <h3 className="text-lg font-semibold text-primary-900 mb-4">
          Patient Details
        </h3>
        <div className="space-y-4">
          <Input
            label="Patient Name *"
            placeholder="Patient's full name"
            error={errors.patientName?.message}
            {...register("patientName")}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Patient Email *"
              type="email"
              placeholder="patient@example.com"
              error={errors.patientEmail?.message}
              {...register("patientEmail")}
            />
            <Input
              label="Patient Phone *"
              type="tel"
              placeholder="04XX XXX XXX"
              error={errors.patientPhone?.message}
              {...register("patientPhone")}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Referral Details */}
      <div>
        <h3 className="text-lg font-semibold text-primary-900 mb-4">
          Referral Details
        </h3>
        <div className="space-y-4">
          <Textarea
            label="Reason for Referral *"
            placeholder="Please describe the presenting issues, clinical history, and any relevant assessment results..."
            rows={5}
            error={errors.referralReason?.message}
            {...register("referralReason")}
          />

          <Controller
            name="mentalHealthPlan"
            control={control}
            render={({ field }) => (
              <Checkbox
                label="Mental Health Treatment Plan (MHTP) has been prepared"
                description="A current MHTP enables the patient to access Medicare rebates for psychological services."
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Textarea
            label="Additional Notes (Optional)"
            placeholder="Any additional information, medication details, risk factors, or special considerations..."
            rows={3}
            error={errors.additionalNotes?.message}
            {...register("additionalNotes")}
          />
        </div>
      </div>

      <Button
        type="submit"
        loading={isSubmitting}
        fullWidth
        size="lg"
        iconLeft={<Send className="h-4 w-4" />}
      >
        {isSubmitting ? "Submitting..." : "Submit Referral"}
      </Button>

      <p className="text-xs text-neutral-500 text-center">
        All referral information is treated as confidential and handled in
        accordance with Australian Privacy Principles.
      </p>
    </form>
  );
}
