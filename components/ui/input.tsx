"use client";

import React, { useId, useState, useRef, useCallback, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   INPUT — 44px min height · Floating label · Error shake · WCAG AAA focus
   prefers-reduced-motion · 3px focus ring with offset
   --------------------------------------------------------------------------- */

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** Use floating label instead of top label */
  floatingLabel?: boolean;
  error?: string;
  helperText?: string;
  /** Left icon slot */
  iconLeft?: React.ReactNode;
  /** Right icon slot */
  iconRight?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      floatingLabel = false,
      error,
      helperText,
      iconLeft,
      iconRight,
      id,
      disabled,
      type = "text",
      placeholder,
      value,
      defaultValue,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const reactId = useId();
    const inputId = id ?? reactId;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    const describedBy = [errorId, helperId].filter(Boolean).join(" ") || undefined;

    // For floating label — track focus + filled state
    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(
      !!(value ?? defaultValue ?? (placeholder && placeholder.length > 0))
    );
    const internalRef = useRef<HTMLInputElement | null>(null);

    const isFloated = floatingLabel && (focused || hasValue);

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        setHasValue(!!e.target.value);
        onBlur?.(e);
      },
      [onBlur]
    );

    // Keep hasValue in sync with controlled value
    useEffect(() => {
      if (value !== undefined) {
        setHasValue(!!value);
      }
    }, [value]);

    // Error shake animation class
    const shakeClass = error
      ? "motion-safe:animate-[shake_0.3s_ease-in-out]"
      : "";

    return (
      <div className={cn("w-full", shakeClass)}>
        {/* Standard label (non-floating) */}
        {label && !floatingLabel && (
          <label
            htmlFor={inputId}
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

          <input
            ref={(node) => {
              internalRef.current = node;
              if (typeof ref === "function") ref(node);
              else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
            }}
            id={inputId}
            type={type}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            placeholder={floatingLabel ? " " : placeholder}
            aria-invalid={!!error}
            aria-required={props.required || (label?.includes("*") ? true : undefined)}
            aria-describedby={describedBy}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              // Base
              "peer block w-full rounded-xl border bg-white font-sans text-sm text-primary-900",
              "min-h-[44px]",
              // Padding — adjust for icons
              iconLeft ? "pl-11" : "pl-4",
              iconRight || error ? "pr-11" : "pr-4",
              floatingLabel ? "pt-5 pb-2" : "py-3",
              // Placeholder
              "placeholder:text-text-muted",
              // Transitions
              "motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out",
              // Focus ring — WCAG AAA: 3px outline with offset
              "focus:outline-none focus:ring-3 focus:ring-offset-0 focus:ring-primary-500/40 focus:border-primary-500",
              // Disabled
              "disabled:opacity-[0.38] disabled:bg-sand-50 disabled:cursor-not-allowed",
              // Error vs normal border
              error
                ? "border-error focus:ring-error/40 focus:border-error"
                : "border-border-default hover:border-border-strong",
              className
            )}
            {...props}
          />

          {/* Floating label */}
          {label && floatingLabel && (
            <label
              htmlFor={inputId}
              className={cn(
                "absolute left-4 font-sans pointer-events-none",
                "motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out",
                iconLeft && "left-11",
                isFloated
                  ? "top-1.5 text-xs font-medium text-primary-600"
                  : "top-1/2 -translate-y-1/2 text-sm text-text-muted"
              )}
            >
              {label}
            </label>
          )}

          {/* Right icon / error icon */}
          {error ? (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-error pointer-events-none" aria-hidden="true">
              <AlertCircle className="h-5 w-5" />
            </div>
          ) : (
            iconRight && (
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-tertiary [&>svg]:h-5 [&>svg]:w-5 pointer-events-none" aria-hidden="true">
                {iconRight}
              </div>
            )
          )}
        </div>

        {/* Error message */}
        {error && (
          <p id={errorId} className="mt-1.5 text-sm font-sans text-error flex items-center gap-1.5" role="alert">
            {error}
          </p>
        )}

        {/* Helper text */}
        {helperText && !error && (
          <p id={helperId} className="mt-1.5 text-sm font-sans text-text-tertiary">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
