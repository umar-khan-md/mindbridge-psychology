"use client";

import { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  FileText,
  Stethoscope,
  Settings,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Send,
} from "lucide-react";
import {
  intakeSchema,
  type IntakeFormData,
  referralSources,
  fundingMethods,
  presentingConcernOptions,
} from "@/lib/validators";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
   Constants
   -------------------------------------------------------------------------- */

const STEPS = [
  { label: "Personal Details", icon: User },
  { label: "Referral Info", icon: FileText },
  { label: "Clinical Info", icon: Stethoscope },
  { label: "Preferences & Consent", icon: Settings },
] as const;

const STEP_FIELDS: Record<number, (keyof IntakeFormData)[]> = {
  0: ["firstName", "lastName", "dateOfBirth", "email", "phone", "address"],
  1: ["referralSource", "gpName", "hasMentalHealthPlan", "ndisNumber"],
  2: [
    "presentingConcerns",
    "previousTherapy",
    "currentMedications",
    "emergencyContactName",
    "emergencyContactPhone",
    "emergencyContactRelationship",
  ],
  3: [
    "preferredPractitioner",
    "preferredSessionTime",
    "fundingMethod",
    "privacyConsent",
    "telehealthConsent",
  ],
};

const referralSourceLabels: Record<string, string> = {
  gp: "GP / Doctor",
  psychiatrist: "Psychiatrist",
  psychologist: "Psychologist",
  school: "School / University",
  employer: "Employer / EAP",
  "friend-family": "Friend or Family",
  google: "Google Search",
  "social-media": "Social Media",
  directory: "Online Directory",
  other: "Other",
};

const fundingMethodLabels: Record<string, string> = {
  "medicare-rebate": "Medicare Rebate",
  "medicare-bulk-bill": "Medicare Bulk Bill",
  "self-funded": "Self-Funded (Private)",
  ndis: "NDIS",
  workcover: "WorkCover",
  dva: "DVA",
  eap: "Employee Assistance Program (EAP)",
};

const concernLabels: Record<string, string> = {
  depression: "Depression",
  anxiety: "Anxiety",
  stress: "Stress & Overwhelm",
  "grief-loss": "Grief & Loss",
  "trauma-ptsd": "Trauma / PTSD",
  "relationship-issues": "Relationship Issues",
  "family-conflict": "Family Conflict",
  "anger-management": "Anger Management",
  "self-esteem": "Self-Esteem",
  "eating-disorders": "Eating Disorders",
  "substance-use": "Substance Use",
  "sleep-issues": "Sleep Difficulties",
  adhd: "ADHD",
  autism: "Autism / ASD",
  ocd: "OCD",
  phobias: "Phobias",
  "workplace-burnout": "Workplace Burnout",
  "life-transitions": "Life Transitions",
  "perinatal-mental-health": "Perinatal Mental Health",
  "chronic-pain": "Chronic Pain",
  other: "Other",
};

const sessionTimeOptions = [
  "Morning (8am–12pm)",
  "Afternoon (12pm–5pm)",
  "Evening (5pm–8pm)",
  "Weekends",
  "No preference",
];

/* --------------------------------------------------------------------------
   Component
   -------------------------------------------------------------------------- */

export function IntakeForm() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IntakeFormData>({
    resolver: zodResolver(intakeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
      phone: "",
      address: "",
      referralSource: undefined,
      gpName: "",
      hasMentalHealthPlan: false,
      ndisNumber: "",
      presentingConcerns: [],
      previousTherapy: "",
      currentMedications: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      emergencyContactRelationship: "",
      preferredPractitioner: "",
      preferredSessionTime: "",
      fundingMethod: undefined,
      privacyConsent: false as unknown as true,
      telehealthConsent: false as unknown as true,
    },
  });

  const formValues = watch();

  const goNext = useCallback(async () => {
    const fields = STEP_FIELDS[currentStep];
    const valid = await trigger(fields);
    if (valid && currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep, trigger]);

  const goBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

  async function onSubmit(data: IntakeFormData) {
    try {
      const response = await fetch("/api/intake", {
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
        title: "Intake form submitted",
        description: "We will be in touch within 1–2 business days to schedule your first session.",
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

  /* --- Success state --- */
  if (isSubmitted) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 mb-5">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-semibold text-primary-900 mb-3">
          Intake Form Received
        </h3>
        <p className="text-neutral-600 max-w-lg mx-auto mb-2">
          Thank you for completing the intake process. Our team will review your
          information and reach out within 1-2 business days to schedule your
          first session.
        </p>
        <p className="text-sm text-neutral-500 max-w-lg mx-auto">
          A confirmation email has been sent to{" "}
          <strong>{formValues.email}</strong>. Please check your spam folder if
          you don&apos;t see it.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Progress indicator */}
      <nav aria-label="Form progress" className="mb-8">
        <ol className="flex items-center justify-between">
          {STEPS.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <li key={step.label} className="flex-1 flex items-center">
                <div className="flex flex-col items-center gap-2 w-full">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                      isCompleted
                        ? "bg-emerald-100 text-emerald-700"
                        : isActive
                          ? "bg-primary-700 text-white"
                          : "bg-neutral-100 text-neutral-400"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <StepIcon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium text-center hidden sm:block",
                      isActive ? "text-primary-700" : "text-neutral-500"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-px mx-2 mt-[-1.25rem] sm:mt-[-2rem]",
                      isCompleted ? "bg-emerald-300" : "bg-neutral-200"
                    )}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Client intake form">
        {/* Accessible error summary */}
        {Object.keys(errors).length > 0 && (
          <div role="alert" aria-live="assertive" className="sr-only">
            {Object.keys(errors).length} {Object.keys(errors).length === 1 ? "error" : "errors"} found. Please correct the highlighted fields.
          </div>
        )}
        {/* Step 1: Personal Details */}
        {currentStep === 0 && (
          <fieldset className="space-y-5">
            <legend className="text-xl font-semibold text-primary-900 mb-4">
              Personal Details
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="First Name *"
                placeholder="First name"
                autoComplete="given-name"
                error={errors.firstName?.message}
                {...register("firstName")}
              />
              <Input
                label="Last Name *"
                placeholder="Last name"
                autoComplete="family-name"
                error={errors.lastName?.message}
                {...register("lastName")}
              />
            </div>
            <Input
              label="Date of Birth *"
              type="date"
              autoComplete="bday"
              error={errors.dateOfBirth?.message}
              {...register("dateOfBirth")}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Email Address *"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                label="Phone Number *"
                type="tel"
                placeholder="04XX XXX XXX"
                autoComplete="tel"
                error={errors.phone?.message}
                {...register("phone")}
              />
            </div>
            <Textarea
              label="Address *"
              placeholder="Full street address, suburb, state, postcode"
              rows={2}
              autoComplete="street-address"
              error={errors.address?.message}
              {...register("address")}
            />
          </fieldset>
        )}

        {/* Step 2: Referral Information */}
        {currentStep === 1 && (
          <fieldset className="space-y-5">
            <legend className="text-xl font-semibold text-primary-900 mb-4">
              Referral Information
            </legend>
            <Select
              label="How did you hear about us? *"
              placeholder="Select a referral source"
              error={errors.referralSource?.message}
              {...register("referralSource")}
            >
              {referralSources.map((source) => (
                <option key={source} value={source}>
                  {referralSourceLabels[source]}
                </option>
              ))}
            </Select>
            <Input
              label="GP / Doctor Name (Optional)"
              placeholder="Dr. Smith"
              error={errors.gpName?.message}
              {...register("gpName")}
            />
            <Controller
              name="hasMentalHealthPlan"
              control={control}
              render={({ field }) => (
                <Checkbox
                  label="I have a current Mental Health Treatment Plan (MHTP)"
                  description="An MHTP from your GP allows you to claim Medicare rebates for up to 10 sessions per year."
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Input
              label="NDIS Number (Optional)"
              placeholder="NDIS participant number"
              helperText="Only required if you are an NDIS participant."
              error={errors.ndisNumber?.message}
              {...register("ndisNumber")}
            />
          </fieldset>
        )}

        {/* Step 3: Clinical Information */}
        {currentStep === 2 && (
          <fieldset className="space-y-5">
            <legend className="text-xl font-semibold text-primary-900 mb-4">
              Clinical Information
            </legend>

            {/* Presenting concerns multi-select */}
            <div>
              <p className="block text-sm font-medium text-primary-900 mb-2">
                Presenting Concerns *{" "}
                <span className="font-normal text-neutral-500">
                  (select all that apply)
                </span>
              </p>
              <Controller
                name="presentingConcerns"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {presentingConcernOptions.map((concern) => {
                      const isSelected = field.value?.includes(concern);
                      return (
                        <button
                          key={concern}
                          type="button"
                          onClick={() => {
                            const next = isSelected
                              ? field.value.filter((c) => c !== concern)
                              : [...(field.value || []), concern];
                            field.onChange(next);
                          }}
                          className={cn(
                            "text-left text-sm rounded-lg border px-3 py-2 transition-colors",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                            isSelected
                              ? "bg-primary-50 border-primary-300 text-primary-800 font-medium"
                              : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300"
                          )}
                          aria-pressed={isSelected}
                        >
                          {concernLabels[concern]}
                        </button>
                      );
                    })}
                  </div>
                )}
              />
              {errors.presentingConcerns?.message && (
                <p className="mt-1.5 text-sm text-red-600" role="alert">
                  {errors.presentingConcerns.message}
                </p>
              )}
            </div>

            <Select
              label="Have you previously seen a therapist or psychologist? *"
              placeholder="Select an option"
              error={errors.previousTherapy?.message}
              {...register("previousTherapy")}
            >
              <option value="no">No, this is my first time</option>
              <option value="yes-current">Yes, I am currently seeing someone</option>
              <option value="yes-past">Yes, but not currently</option>
            </Select>

            <Textarea
              label="Current Medications (Optional)"
              placeholder="List any medications you are currently taking"
              rows={2}
              error={errors.currentMedications?.message}
              {...register("currentMedications")}
            />

            <div className="border-t border-neutral-200 pt-5 mt-5">
              <h3 className="text-lg font-semibold text-primary-900 mb-4">
                Emergency Contact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Contact Name *"
                  placeholder="Full name"
                  error={errors.emergencyContactName?.message}
                  {...register("emergencyContactName")}
                />
                <Input
                  label="Contact Phone *"
                  type="tel"
                  placeholder="04XX XXX XXX"
                  error={errors.emergencyContactPhone?.message}
                  {...register("emergencyContactPhone")}
                />
              </div>
              <div className="mt-4">
                <Input
                  label="Relationship *"
                  placeholder="e.g., Partner, Parent, Friend"
                  error={errors.emergencyContactRelationship?.message}
                  {...register("emergencyContactRelationship")}
                />
              </div>
            </div>
          </fieldset>
        )}

        {/* Step 4: Preferences & Consent */}
        {currentStep === 3 && (
          <fieldset className="space-y-5">
            <legend className="text-xl font-semibold text-primary-900 mb-4">
              Preferences & Consent
            </legend>

            <Input
              label="Preferred Practitioner (Optional)"
              placeholder="Leave blank if no preference"
              helperText="If you have been recommended a specific psychologist, enter their name here."
              error={errors.preferredPractitioner?.message}
              {...register("preferredPractitioner")}
            />

            <Select
              label="Preferred Session Time *"
              placeholder="Select preferred time"
              error={errors.preferredSessionTime?.message}
              {...register("preferredSessionTime")}
            >
              {sessionTimeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </Select>

            <Select
              label="Funding Method *"
              placeholder="Select how you'll pay"
              error={errors.fundingMethod?.message}
              {...register("fundingMethod")}
            >
              {fundingMethods.map((method) => (
                <option key={method} value={method}>
                  {fundingMethodLabels[method]}
                </option>
              ))}
            </Select>

            <div className="border-t border-neutral-200 pt-5 space-y-4">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">
                Consent
              </h3>

              <Controller
                name="privacyConsent"
                control={control}
                render={({ field }) => (
                  <div>
                    <Checkbox
                      label="I have read and agree to the Privacy Policy *"
                      description="Your personal and clinical information will be stored securely and handled in accordance with Australian Privacy Principles."
                      checked={field.value === true}
                      onChange={(e) => field.onChange((e.target as HTMLInputElement).checked)}
                    />
                    {errors.privacyConsent?.message && (
                      <p className="mt-1 text-sm text-red-600 ml-8" role="alert">
                        {errors.privacyConsent.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="telehealthConsent"
                control={control}
                render={({ field }) => (
                  <div>
                    <Checkbox
                      label="I consent to receiving psychology services via telehealth *"
                      description="I understand that sessions will be conducted via secure video call and I have access to a private space with a stable internet connection."
                      checked={field.value === true}
                      onChange={(e) => field.onChange((e.target as HTMLInputElement).checked)}
                    />
                    {errors.telehealthConsent?.message && (
                      <p className="mt-1 text-sm text-red-600 ml-8" role="alert">
                        {errors.telehealthConsent.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Summary review */}
            <div className="bg-neutral-50 rounded-lg border border-neutral-200 p-5 mt-6">
              <h3 className="text-sm font-semibold text-primary-900 mb-3 uppercase tracking-wide">
                Review Your Information
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <div>
                  <dt className="text-neutral-500">Name</dt>
                  <dd className="font-medium text-primary-900">
                    {formValues.firstName} {formValues.lastName}
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Date of Birth</dt>
                  <dd className="font-medium text-primary-900">
                    {formValues.dateOfBirth || "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Email</dt>
                  <dd className="font-medium text-primary-900">
                    {formValues.email || "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Phone</dt>
                  <dd className="font-medium text-primary-900">
                    {formValues.phone || "—"}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-neutral-500">Presenting Concerns</dt>
                  <dd className="font-medium text-primary-900">
                    {formValues.presentingConcerns?.length
                      ? formValues.presentingConcerns
                          .map((c) => concernLabels[c] || c)
                          .join(", ")
                      : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Funding</dt>
                  <dd className="font-medium text-primary-900">
                    {formValues.fundingMethod
                      ? fundingMethodLabels[formValues.fundingMethod]
                      : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Session Time</dt>
                  <dd className="font-medium text-primary-900">
                    {formValues.preferredSessionTime || "—"}
                  </dd>
                </div>
              </dl>
            </div>
          </fieldset>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-200">
          {currentStep > 0 ? (
            <Button
              type="button"
              variant="outline"
              onClick={goBack}
              iconLeft={<ChevronLeft className="h-4 w-4" />}
            >
              Back
            </Button>
          ) : (
            <div />
          )}

          {currentStep < STEPS.length - 1 ? (
            <Button
              type="button"
              onClick={goNext}
              iconRight={<ChevronRight className="h-4 w-4" />}
            >
              Next Step
            </Button>
          ) : (
            <Button
              type="submit"
              loading={isSubmitting}
              iconLeft={<Send className="h-4 w-4" />}
            >
              {isSubmitting ? "Submitting..." : "Submit Intake Form"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
