"use client";

import React, { useId, useCallback, useEffect, useRef } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   TEXTAREA — Matches Input improvements · 44px min height · Auto-resize
   WCAG AAA · Error shake · 3px focus ring
   --------------------------------------------------------------------------- */

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  autoResize?: boolean;
  /** Show character count */
  maxLength?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      id,
      disabled,
      autoResize = false,
      rows = 4,
      maxLength,
      onChange,
      value,
      ...props
    },
    ref
  ) => {
    const reactId = useId();
    const textareaId = id ?? reactId;
    const errorId = error ? `${textareaId}-error` : undefined;
    const helperId = helperText ? `${textareaId}-helper` : undefined;
    const describedBy = [errorId, helperId].filter(Boolean).join(" ") || undefined;

    const internalRef = useRef<HTMLTextAreaElement | null>(null);
    const charCount = typeof value === "string" ? value.length : 0;

    const setRefs = useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
      },
      [ref]
    );

    const adjustHeight = useCallback(() => {
      const el = internalRef.current;
      if (!el || !autoResize) return;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }, [autoResize]);

    useEffect(() => {
      adjustHeight();
    }, [adjustHeight, value]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        adjustHeight();
        onChange?.(e);
      },
      [adjustHeight, onChange]
    );

    // Error shake animation
    const shakeClass = error
      ? "motion-safe:animate-[shake_0.3s_ease-in-out]"
      : "";

    return (
      <div className={cn("w-full", shakeClass)}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-sans font-medium text-primary-900 mb-1.5"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <textarea
            ref={setRefs}
            id={textareaId}
            rows={rows}
            disabled={disabled}
            maxLength={maxLength}
            value={value}
            aria-invalid={!!error}
            aria-required={props.required || (label?.includes("*") ? true : undefined)}
            aria-describedby={describedBy}
            onChange={handleChange}
            className={cn(
              // Base
              "block w-full rounded-xl border bg-white px-4 py-3 font-sans text-sm text-primary-900",
              "min-h-[44px]",
              "placeholder:text-text-muted",
              autoResize ? "resize-none overflow-hidden" : "resize-y",
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
          />

          {error && (
            <div className="absolute right-3.5 top-3.5 text-error pointer-events-none" aria-hidden="true">
              <AlertCircle className="h-5 w-5" />
            </div>
          )}
        </div>

        {/* Footer row: error/helper + char count */}
        <div className="flex items-start justify-between gap-2 mt-1.5">
          <div className="flex-1 min-w-0">
            {error && (
              <p id={errorId} className="text-sm font-sans text-error" role="alert">
                {error}
              </p>
            )}
            {helperText && !error && (
              <p id={helperId} className="text-sm font-sans text-text-tertiary">
                {helperText}
              </p>
            )}
          </div>
          {maxLength && (
            <span
              className={cn(
                "text-xs font-sans tabular-nums shrink-0",
                charCount >= maxLength ? "text-error font-medium" : "text-text-muted"
              )}
              aria-live="polite"
            >
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
