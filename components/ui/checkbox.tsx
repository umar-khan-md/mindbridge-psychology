"use client";

import React, { useId } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   CHECKBOX — 44px touch target · Animated check · Primary color when checked
   WCAG AAA · Lucide icons · prefers-reduced-motion
   --------------------------------------------------------------------------- */

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
  /** Indeterminate state for "select all" patterns */
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, disabled, checked, indeterminate, ...props }, ref) => {
    const reactId = useId();
    const checkboxId = id ?? reactId;
    const descId = description ? `${checkboxId}-desc` : undefined;

    // Set indeterminate via ref callback
    const internalRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        if (node) {
          node.indeterminate = !!indeterminate;
        }
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      },
      [ref, indeterminate]
    );

    const isChecked = checked || indeterminate;

    return (
      <div className={cn("flex items-start gap-3", className)}>
        {/* Touch target wrapper — 44x44px clickable area */}
        <label
          htmlFor={checkboxId}
          className={cn(
            "relative flex items-center justify-center shrink-0",
            "min-h-[44px] min-w-[44px] -m-2.5",
            "cursor-pointer rounded-lg",
            "motion-safe:transition-colors motion-safe:duration-150",
            "hover:bg-primary-50/60",
            disabled && "cursor-not-allowed hover:bg-transparent"
          )}
        >
          <input
            ref={internalRef}
            id={checkboxId}
            type="checkbox"
            disabled={disabled}
            checked={checked}
            aria-describedby={descId}
            className="peer sr-only"
            {...props}
          />
          {/* Visual checkbox */}
          <div
            className={cn(
              "h-5 w-5 rounded-md border-2 flex items-center justify-center",
              "motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out",
              // Focus ring — WCAG AAA
              "peer-focus-visible:ring-3 peer-focus-visible:ring-primary-500/40 peer-focus-visible:ring-offset-2",
              // Disabled
              "peer-disabled:opacity-[0.38] peer-disabled:cursor-not-allowed",
              // Checked state — primary teal
              isChecked
                ? "bg-primary-500 border-primary-500 motion-safe:scale-100"
                : "border-border-strong bg-white motion-safe:scale-100",
              // Hover on unchecked
              !isChecked && !disabled && "peer-hover:border-primary-400"
            )}
            aria-hidden="true"
          >
            {indeterminate ? (
              <Minus
                className={cn(
                  "h-3.5 w-3.5 text-white",
                  "motion-safe:transition-all motion-safe:duration-200",
                  "motion-safe:scale-100 opacity-100"
                )}
                strokeWidth={3}
              />
            ) : (
              <Check
                className={cn(
                  "h-3.5 w-3.5 text-white",
                  "motion-safe:transition-all motion-safe:duration-200",
                  checked
                    ? "motion-safe:scale-100 opacity-100"
                    : "motion-safe:scale-75 opacity-0"
                )}
                strokeWidth={3}
              />
            )}
          </div>
        </label>

        {/* Label + description */}
        {(label || description) && (
          <div className="select-none pt-2.5">
            {label && (
              <label
                htmlFor={checkboxId}
                className={cn(
                  "text-sm font-sans font-medium text-primary-900 cursor-pointer leading-tight",
                  disabled && "opacity-[0.38] cursor-not-allowed"
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p
                id={descId}
                className={cn(
                  "text-sm font-sans text-text-tertiary mt-0.5 leading-relaxed",
                  disabled && "opacity-[0.38]"
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
