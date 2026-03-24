"use client";

import React, { useId } from "react";
import { ChevronDown, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   SELECT — 44px min height · Better dropdown arrow · WCAG AAA focus
   Matches Input styling · prefers-reduced-motion
   --------------------------------------------------------------------------- */

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  /** Left icon slot */
  iconLeft?: React.ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, label, error, helperText, id, disabled, placeholder, iconLeft, children, ...props },
    ref
  ) => {
    const reactId = useId();
    const selectId = id ?? reactId;
    const errorId = error ? `${selectId}-error` : undefined;
    const helperId = helperText ? `${selectId}-helper` : undefined;
    const describedBy = [errorId, helperId].filter(Boolean).join(" ") || undefined;

    // Error shake
    const shakeClass = error
      ? "motion-safe:animate-[shake_0.3s_ease-in-out]"
      : "";

    return (
      <div className={cn("w-full", shakeClass)}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-sans font-medium text-primary-900 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {/* Left icon */}
          {iconLeft && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary [&>svg]:h-5 [&>svg]:w-5 pointer-events-none" aria-hidden="true">
              {iconLeft}
            </div>
          )}

          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-required={props.required || (label?.includes("*") ? true : undefined)}
            aria-describedby={describedBy}
            className={cn(
              // Base
              "block w-full appearance-none rounded-xl border bg-white font-sans text-sm text-primary-900",
              "min-h-[44px] cursor-pointer",
              // Padding — adjust for icons
              iconLeft ? "pl-11" : "pl-4",
              "pr-12 py-3",
              // Transitions
              "motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out",
              // Focus ring — WCAG AAA
              "focus:outline-none focus:ring-3 focus:ring-offset-0 focus:ring-primary-500/40 focus:border-primary-500",
              // Disabled
              "disabled:opacity-[0.38] disabled:bg-sand-50 disabled:cursor-not-allowed",
              // Error vs normal
              error
                ? "border-error focus:ring-error/40 focus:border-error"
                : "border-border-default hover:border-border-strong",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children}
          </select>

          {/* Custom dropdown arrow */}
          <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {error && (
              <AlertCircle className="h-4 w-4 text-error" aria-hidden="true" />
            )}
            <div className="flex items-center justify-center h-6 w-6 rounded-md bg-sand-100/60">
              <ChevronDown
                className="h-4 w-4 text-primary-600"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {error && (
          <p id={errorId} className="mt-1.5 text-sm font-sans text-error" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="mt-1.5 text-sm font-sans text-text-tertiary">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
