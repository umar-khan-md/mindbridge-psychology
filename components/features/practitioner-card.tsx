"use client";

import Link from "next/link";
import { Practitioner } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { FUNDING_LABELS } from "@/lib/constants";
import { cn, getInitials } from "@/lib/utils";
import { ArrowRight, Globe } from "lucide-react";

interface PractitionerCardProps {
  practitioner: Practitioner;
}

export function PractitionerCard({ practitioner }: PractitionerCardProps) {
  const initials = getInitials(practitioner.firstName, practitioner.lastName);
  const visibleSpecs = practitioner.specialisations.slice(0, 4);
  const hiddenSpecCount = practitioner.specialisations.length - visibleSpecs.length;

  return (
    <article
      className={cn(
        "flex flex-col h-full bg-white rounded-xl border border-neutral-100 shadow-sm",
        "transition-all duration-300 ease-out",
        "hover:shadow-lg hover:-translate-y-1"
      )}
    >
      {/* Photo placeholder — entire top area links to profile */}
      <Link
        href={`/team/${practitioner.slug}`}
        className="block relative aspect-[4/3] bg-primary-100 rounded-t-xl overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading text-4xl text-primary-400 select-none">
            {initials}
          </span>
        </div>

        {/* Availability badge */}
        <div className="absolute top-3 right-3">
          {practitioner.acceptingNewClients ? (
            <Badge variant="success" size="sm">
              Accepting New Clients
            </Badge>
          ) : (
            <Badge variant="warning" size="sm">
              Waitlist
            </Badge>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 space-y-3 flex-1 flex flex-col">
        {/* Name & title */}
        <div>
          <Link
            href={`/team/${practitioner.slug}`}
            className="hover:text-primary-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
          >
            <h3 className="font-heading text-lg text-primary-900">
              {practitioner.firstName} {practitioner.lastName}
            </h3>
          </Link>
          <p className="text-sm text-neutral-600">
            {practitioner.title} &middot;{" "}
            <span className="text-neutral-400">{practitioner.pronouns}</span>
          </p>
          <p className="text-xs text-neutral-400 mt-0.5">
            AHPRA: {practitioner.ahpraNumber}
          </p>
        </div>

        {/* Specialisations */}
        <div className="flex flex-wrap gap-1.5">
          {visibleSpecs.map((spec) => (
            <Badge key={spec} size="sm" variant="default">
              {spec}
            </Badge>
          ))}
          {hiddenSpecCount > 0 && (
            <Badge size="sm" variant="outline">
              +{hiddenSpecCount} more
            </Badge>
          )}
        </div>

        {/* Approaches */}
        <p className="text-sm text-neutral-500 line-clamp-1">
          {practitioner.approaches.join(", ")}
        </p>

        {/* Funding accepted */}
        <div className="flex flex-wrap gap-1.5">
          {practitioner.fundingAccepted.map((fund) => (
            <Badge key={fund} size="sm" variant="accent">
              {FUNDING_LABELS[fund] ?? fund}
            </Badge>
          ))}
        </div>

        {/* Languages */}
        {practitioner.languages.length > 1 && (
          <div className="flex items-center gap-1.5 text-sm text-neutral-500">
            <Globe className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{practitioner.languages.join(", ")}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2 mt-auto">
          <Link
            href={`/team/${practitioner.slug}`}
            className={cn(
              "flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 min-h-[44px] text-sm font-medium rounded-lg",
              "border border-primary-700 text-primary-700 bg-transparent",
              "hover:bg-primary-50 active:bg-primary-100 transition-colors duration-200 ease-out",
              "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/50 focus-visible:ring-offset-2"
            )}
          >
            View Profile
          </Link>
          <Link
            href={practitioner.calendlyUrl || "/book"}
            className={cn(
              "flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 min-h-[44px] text-sm font-medium rounded-lg",
              "bg-primary-700 text-white",
              "hover:bg-primary-800 active:bg-primary-900 transition-colors duration-200 ease-out",
              "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/50 focus-visible:ring-offset-2"
            )}
          >
            Book Now
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
