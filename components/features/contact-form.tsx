"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2 } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/validators";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

const subjectOptions = [
  { value: "general", label: "General Enquiry" },
  { value: "booking", label: "Booking Question" },
  { value: "ndis", label: "NDIS Enquiry" },
  { value: "corporate", label: "Corporate / EAP" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Other" },
] as const;

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormData) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      setIsSubmitted(true);
      toast({
        variant: "success",
        title: "Message sent",
        description: "We'll get back to you within 1 business day.",
      });
      reset();
    } catch (error) {
      toast({
        variant: "error",
        title: "Something went wrong",
        description:
          error instanceof Error
            ? error.message
            : "Please try again or call us directly.",
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
          Message Sent Successfully
        </h3>
        <p className="text-neutral-600 mb-6 max-w-md mx-auto">
          Thank you for reaching out. Our team will respond within 1 business
          day. For urgent matters, please call us directly.
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSubmitted(false)}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
      aria-label="Contact form"
    >
      {/* Accessible error summary */}
      {errorCount > 0 && (
        <div role="alert" aria-live="assertive" className="sr-only">
          {errorCount} {errorCount === 1 ? "error" : "errors"} found. Please correct the highlighted fields.
        </div>
      )}
      <Input
        label="Full Name *"
        placeholder="Your full name"
        autoComplete="name"
        error={errors.name?.message}
        {...register("name")}
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
          label="Phone (Optional)"
          type="tel"
          placeholder="04XX XXX XXX"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      <Select
        label="Subject *"
        placeholder="Select a subject"
        error={errors.subject?.message}
        {...register("subject")}
      >
        {subjectOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>

      <Textarea
        label="Message *"
        placeholder="How can we help you? Please provide as much detail as possible."
        rows={5}
        error={errors.message?.message}
        {...register("message")}
      />

      <Button
        type="submit"
        loading={isSubmitting}
        fullWidth
        size="lg"
        iconLeft={<Send className="h-4 w-4" />}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>

      <p className="text-xs text-neutral-500 text-center">
        Your information is protected and will never be shared. See our{" "}
        <a href="/privacy" className="underline hover:text-primary-700">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
