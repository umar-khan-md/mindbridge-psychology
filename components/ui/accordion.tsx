"use client";

import React, { createContext, useContext, useCallback, useState, useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   ACCORDION — Smooth grid-rows animation · Left border accent · 44px targets
   WCAG AAA keyboard navigation · prefers-reduced-motion
   --------------------------------------------------------------------------- */

/* ---- Accordion Group (optional wrapper for single-open behaviour) ---- */

interface AccordionGroupContextValue {
  openId: string | null;
  toggle: (id: string) => void;
}

const AccordionGroupContext = createContext<AccordionGroupContextValue | null>(null);

export interface AccordionGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** When true only one item can be open at a time */
  single?: boolean;
  defaultOpen?: string;
}

function AccordionGroup({
  single = true,
  defaultOpen,
  className,
  children,
  ...props
}: AccordionGroupProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpen ?? null);

  const toggle = useCallback(
    (id: string) => {
      if (!single) return; // each item manages itself
      setOpenId((prev) => (prev === id ? null : id));
    },
    [single]
  );

  return (
    <AccordionGroupContext.Provider value={single ? { openId, toggle } : null}>
      <div
        className={cn("divide-y divide-border-subtle rounded-xl", className)}
        role="presentation"
        {...props}
      >
        {children}
      </div>
    </AccordionGroupContext.Provider>
  );
}

/* ---- Single Accordion Item ---- */

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique value for this item when used inside AccordionGroup */
  value?: string;
  defaultOpen?: boolean;
}

function AccordionItem({
  value,
  defaultOpen = false,
  className,
  children,
  ...props
}: AccordionItemProps) {
  const reactId = useId();
  const itemId = value ?? reactId;
  const group = useContext(AccordionGroupContext);

  const [localOpen, setLocalOpen] = useState(defaultOpen);
  const isOpen = group ? group.openId === itemId : localOpen;

  const toggle = useCallback(() => {
    if (group) {
      group.toggle(itemId);
    } else {
      setLocalOpen((prev) => !prev);
    }
  }, [group, itemId]);

  const triggerId = `accordion-trigger-${itemId}`;
  const panelId = `accordion-panel-${itemId}`;

  return (
    <div
      className={cn(
        "relative",
        // Subtle left border accent when open
        "before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[3px] before:rounded-full",
        "before:bg-primary-500",
        "motion-safe:before:transition-all motion-safe:before:duration-300 motion-safe:before:ease-out",
        isOpen
          ? "before:opacity-100 before:scale-y-100"
          : "before:opacity-0 before:scale-y-0",
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        if (child.type === AccordionTrigger) {
          return React.cloneElement(child as React.ReactElement<AccordionTriggerInternalProps>, {
            __isOpen: isOpen,
            __onToggle: toggle,
            __triggerId: triggerId,
            __panelId: panelId,
          });
        }
        if (child.type === AccordionContent) {
          return React.cloneElement(child as React.ReactElement<AccordionContentInternalProps>, {
            __isOpen: isOpen,
            __triggerId: triggerId,
            __panelId: panelId,
          });
        }
        return child;
      })}
    </div>
  );
}

/* ---- Trigger ---- */

interface AccordionTriggerInternalProps {
  __isOpen?: boolean;
  __onToggle?: () => void;
  __triggerId?: string;
  __panelId?: string;
}

export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    AccordionTriggerInternalProps {}

function AccordionTrigger({
  className,
  children,
  __isOpen,
  __onToggle,
  __triggerId,
  __panelId,
  ...props
}: AccordionTriggerProps) {
  return (
    <button
      type="button"
      id={__triggerId}
      aria-expanded={__isOpen}
      aria-controls={__panelId}
      onClick={__onToggle}
      className={cn(
        "group flex w-full items-center justify-between",
        // 44px min touch target
        "min-h-[44px] py-4 pl-4 pr-2",
        "text-left font-heading font-semibold text-primary-900",
        "rounded-xl cursor-pointer select-none",
        // Hover
        "hover:text-primary-600 hover:bg-primary-50/50",
        // Transitions
        "motion-safe:transition-colors motion-safe:duration-200 motion-safe:ease-out",
        // Focus ring — WCAG AAA
        "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      <span className="flex-1 leading-snug">{children}</span>
      <span className="shrink-0 ml-2 flex items-center justify-center h-8 w-8 rounded-lg group-hover:bg-primary-100/60 motion-safe:transition-colors motion-safe:duration-200">
        <ChevronDown
          className={cn(
            "h-5 w-5 text-primary-500",
            "motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out",
            __isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </span>
    </button>
  );
}

/* ---- Content ---- */

interface AccordionContentInternalProps {
  __isOpen?: boolean;
  __triggerId?: string;
  __panelId?: string;
}

export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    AccordionContentInternalProps {}

function AccordionContent({
  className,
  children,
  __isOpen,
  __triggerId,
  __panelId,
  ...props
}: AccordionContentProps) {
  return (
    <div
      id={__panelId}
      role="region"
      aria-labelledby={__triggerId}
      className={cn(
        "grid",
        "motion-safe:transition-[grid-template-rows,opacity] motion-safe:duration-300 motion-safe:ease-out",
        "motion-reduce:transition-none",
        __isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}
    >
      <div className="overflow-hidden">
        <div
          className={cn(
            "pb-4 pl-4 pr-4 text-text-secondary font-sans leading-relaxed",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export { AccordionGroup, AccordionItem, AccordionTrigger, AccordionContent };
