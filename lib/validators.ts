import { z } from "zod";

/* --------------------------------------------------------------------------
   Helpers
   -------------------------------------------------------------------------- */

const australianPhoneRegex = /^(?:\+61|0)[2-478](?:[ -]?\d){8}$/;

/* --------------------------------------------------------------------------
   Contact Form
   -------------------------------------------------------------------------- */

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(australianPhoneRegex, "Please enter a valid Australian phone number")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must be under 200 characters"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(5000, "Message must be under 5000 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/* --------------------------------------------------------------------------
   Referral Sources & Funding Methods
   -------------------------------------------------------------------------- */

export const referralSources = [
  "gp",
  "psychiatrist",
  "psychologist",
  "school",
  "employer",
  "friend-family",
  "google",
  "social-media",
  "directory",
  "other",
] as const;

export const fundingMethods = [
  "medicare-rebate",
  "medicare-bulk-bill",
  "self-funded",
  "ndis",
  "workcover",
  "dva",
  "eap",
] as const;

export const presentingConcernOptions = [
  "depression",
  "anxiety",
  "stress",
  "grief-loss",
  "trauma-ptsd",
  "relationship-issues",
  "family-conflict",
  "anger-management",
  "self-esteem",
  "eating-disorders",
  "substance-use",
  "sleep-issues",
  "adhd",
  "autism",
  "ocd",
  "phobias",
  "workplace-burnout",
  "life-transitions",
  "perinatal-mental-health",
  "chronic-pain",
  "other",
] as const;

/* --------------------------------------------------------------------------
   Intake Form
   -------------------------------------------------------------------------- */

export const intakeSchema = z.object({
  // Step 1: Personal Details
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be under 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be under 50 characters"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(australianPhoneRegex, "Please enter a valid Australian phone number"),
  address: z
    .string()
    .min(10, "Please enter your full address")
    .max(300, "Address must be under 300 characters"),

  // Step 2: Referral Information
  referralSource: z.enum(referralSources, {
    message: "Please select a referral source",
  }),
  gpName: z.string().optional().or(z.literal("")),
  hasMentalHealthPlan: z.boolean(),
  ndisNumber: z
    .string()
    .optional()
    .or(z.literal("")),

  // Step 3: Clinical Information
  presentingConcerns: z
    .array(z.enum(presentingConcernOptions))
    .min(1, "Please select at least one presenting concern"),
  previousTherapy: z
    .string()
    .min(1, "Please indicate your previous therapy experience"),
  currentMedications: z
    .string()
    .optional()
    .or(z.literal("")),
  emergencyContactName: z
    .string()
    .min(2, "Emergency contact name is required"),
  emergencyContactPhone: z
    .string()
    .regex(australianPhoneRegex, "Please enter a valid Australian phone number"),
  emergencyContactRelationship: z
    .string()
    .min(2, "Please specify the relationship"),

  // Step 4: Preferences & Consent
  preferredPractitioner: z
    .string()
    .optional()
    .or(z.literal("")),
  preferredSessionTime: z
    .string()
    .min(1, "Please select a preferred session time"),
  fundingMethod: z.enum(fundingMethods, {
    message: "Please select a funding method",
  }),
  privacyConsent: z.literal(true, {
    message: "You must agree to the privacy policy to proceed",
  }),
  telehealthConsent: z.literal(true, {
    message: "You must consent to telehealth services to proceed",
  }),
});

export type IntakeFormData = z.infer<typeof intakeSchema>;

/* --------------------------------------------------------------------------
   Referral Form
   -------------------------------------------------------------------------- */

export const referralSchema = z.object({
  referrerName: z
    .string()
    .min(2, "Referrer name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  referrerEmail: z
    .string()
    .email("Please enter a valid email address"),
  referrerPhone: z
    .string()
    .regex(australianPhoneRegex, "Please enter a valid Australian phone number"),
  referrerPractice: z
    .string()
    .min(2, "Practice name must be at least 2 characters")
    .max(200, "Practice name must be under 200 characters"),
  patientName: z
    .string()
    .min(2, "Patient name must be at least 2 characters")
    .max(100, "Patient name must be under 100 characters"),
  patientEmail: z
    .string()
    .email("Please enter a valid patient email address"),
  patientPhone: z
    .string()
    .regex(australianPhoneRegex, "Please enter a valid Australian phone number"),
  referralReason: z
    .string()
    .min(20, "Please provide more detail about the referral reason (at least 20 characters)")
    .max(2000, "Referral reason must be under 2000 characters"),
  mentalHealthPlan: z.boolean(),
  additionalNotes: z
    .string()
    .max(2000, "Notes must be under 2000 characters")
    .optional()
    .or(z.literal("")),
});

export type ReferralFormData = z.infer<typeof referralSchema>;

/* --------------------------------------------------------------------------
   Consent Form
   -------------------------------------------------------------------------- */

export const consentSchema = z.object({
  telehealthNature: z.literal(true, {
    message: "You must acknowledge the nature of telehealth",
  }),
  benefits: z.literal(true, {
    message: "You must acknowledge the benefits",
  }),
  risks: z.literal(true, {
    message: "You must acknowledge the risks",
  }),
  privacy: z.literal(true, {
    message: "You must acknowledge the privacy policy",
  }),
  recordingPolicy: z.literal(true, {
    message: "You must acknowledge the recording policy",
  }),
  emergencyProcedures: z.literal(true, {
    message: "You must acknowledge the emergency procedures",
  }),
  cancellationPolicy: z.literal(true, {
    message: "You must acknowledge the cancellation policy",
  }),
  signatureName: z
    .string()
    .min(2, "Please type your full legal name")
    .max(100, "Name must be under 100 characters"),
  signatureDate: z
    .string()
    .min(1, "Date is required"),
});

export type ConsentFormData = z.infer<typeof consentSchema>;

/* --------------------------------------------------------------------------
   Newsletter
   -------------------------------------------------------------------------- */

export const newsletterSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address"),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
