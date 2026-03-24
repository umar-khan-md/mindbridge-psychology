"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useId,
  useEffect,
} from "react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   TABS — 21st.dev pill-shaped active indicator · Keyboard navigation
   WCAG AAA · 44px touch targets · prefers-reduced-motion
   --------------------------------------------------------------------------- */

/* ---- Context ---- */

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tab components must be used within a Tabs provider.");
  return ctx;
}

/* ---- Tabs Root ---- */

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  onValueChange?: (value: string) => void;
}

function Tabs({
  defaultValue,
  onValueChange,
  className,
  children,
  ...props
}: TabsProps) {
  const [activeTab, setActiveInternal] = useState(defaultValue);
  const baseId = useId();

  const setActiveTab = useCallback(
    (value: string) => {
      setActiveInternal(value);
      onValueChange?.(value);
    },
    [onValueChange]
  );

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, baseId }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

/* ---- Tab List ---- */

export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {}

function TabList({ className, children, ...props }: TabListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const { activeTab } = useTabsContext();

  // Update pill indicator position
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeButton = container.querySelector<HTMLButtonElement>(
      '[aria-selected="true"]'
    );
    if (!activeButton) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();

    setIndicatorStyle({
      left: buttonRect.left - containerRect.left,
      width: buttonRect.width,
    });
  }, [activeTab]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container) return;

      const tabs = Array.from(
        container.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])')
      );
      const currentIndex = tabs.findIndex((t) => t === document.activeElement);
      if (currentIndex === -1) return;

      let nextIndex: number | null = null;
      if (e.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
      if (e.key === "ArrowLeft")
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      if (e.key === "Home") nextIndex = 0;
      if (e.key === "End") nextIndex = tabs.length - 1;

      if (nextIndex !== null) {
        e.preventDefault();
        tabs[nextIndex].focus();
        tabs[nextIndex].click();
      }
    },
    []
  );

  return (
    <div
      ref={containerRef}
      role="tablist"
      onKeyDown={handleKeyDown}
      className={cn(
        "relative inline-flex items-center gap-1 p-1",
        "bg-sand-100 rounded-2xl",
        className
      )}
      {...props}
    >
      {/* Pill-shaped sliding indicator (21st.dev style) */}
      <div
        className={cn(
          "absolute top-1 bottom-1 rounded-xl bg-white shadow-sm",
          "motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out",
          "motion-reduce:transition-none"
        )}
        style={indicatorStyle}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

/* ---- Tab ---- */

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

function Tab({ value, className, children, disabled, ...props }: TabProps) {
  const { activeTab, setActiveTab, baseId } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-selected={isActive}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={() => setActiveTab(value)}
      className={cn(
        "relative z-10 inline-flex items-center justify-center",
        // 44px min touch target
        "min-h-[44px] px-5 py-2.5",
        "text-sm font-sans font-semibold rounded-xl",
        "cursor-pointer select-none whitespace-nowrap",
        // Transitions
        "motion-safe:transition-colors motion-safe:duration-200 motion-safe:ease-out",
        // Focus ring — WCAG AAA
        "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        // Disabled
        "disabled:opacity-[0.38] disabled:cursor-not-allowed",
        // Active vs inactive
        isActive
          ? "text-primary-700"
          : "text-text-tertiary hover:text-primary-600",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* ---- Tab Panel ---- */

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

function TabPanel({ value, className, children, ...props }: TabPanelProps) {
  const { activeTab, baseId } = useTabsContext();
  const isActive = activeTab === value;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      className={cn(
        "pt-4 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-xl",
        "motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Tabs, TabList, Tab, TabPanel };
