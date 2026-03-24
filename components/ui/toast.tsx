"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useRef,
} from "react";
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   TOAST — Slide from top-right · Colored left border · Auto-dismiss progress
   WCAG AAA · Lucide icons · Framer Motion · prefers-reduced-motion
   --------------------------------------------------------------------------- */

/* ---- Types ---- */

type ToastVariant = "success" | "error" | "warning" | "info";

interface ToastItem {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextValue {
  toast: (options: Omit<ToastItem, "id">) => void;
  dismiss: (id: string) => void;
}

/* ---- Context ---- */

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider.");
  return ctx;
}

/* ---- Provider ---- */

export interface ToastProviderProps {
  children: React.ReactNode;
  /** Max number of visible toasts */
  limit?: number;
}

export function ToastProvider({ children, limit = 5 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback(
    (options: Omit<ToastItem, "id">) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => {
        const next = [...prev, { ...options, id }];
        // Trim oldest if over limit
        return next.length > limit ? next.slice(-limit) : next;
      });
    },
    [limit]
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {/* Toast container — top-right */}
      <div
        aria-live="polite"
        aria-label="Notifications"
        className="fixed top-4 right-4 z-[100] flex flex-col gap-3 w-full max-w-sm pointer-events-none"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <ToastNotification key={t.id} item={t} onDismiss={dismiss} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

/* ---- Variant config ---- */

const variantConfig: Record<
  ToastVariant,
  { borderClass: string; iconClass: string; progressClass: string; Icon: React.ElementType }
> = {
  success: {
    borderClass: "border-l-success",
    iconClass: "text-success",
    progressClass: "bg-success",
    Icon: CheckCircle2,
  },
  error: {
    borderClass: "border-l-error",
    iconClass: "text-error",
    progressClass: "bg-error",
    Icon: AlertCircle,
  },
  warning: {
    borderClass: "border-l-warning",
    iconClass: "text-warning",
    progressClass: "bg-warning",
    Icon: AlertTriangle,
  },
  info: {
    borderClass: "border-l-info",
    iconClass: "text-info",
    progressClass: "bg-info",
    Icon: Info,
  },
};

/* ---- Individual toast ---- */

interface ToastNotificationProps {
  item: ToastItem;
  onDismiss: (id: string) => void;
}

function ToastNotification({ item, onDismiss }: ToastNotificationProps) {
  const duration = item.duration ?? 5000;
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const startTimeRef = useRef(Date.now());
  const remainingRef = useRef(duration);
  const rafRef = useRef<number>(0);

  const config = variantConfig[item.variant];
  const IconComponent = config.Icon;

  const handleDismiss = useCallback(() => {
    onDismiss(item.id);
  }, [item.id, onDismiss]);

  // Auto-dismiss timer with pause/resume
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
      return;
    }

    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(handleDismiss, remainingRef.current);

    // Progress bar animation
    const totalDuration = duration;
    const startProgress = progress;

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progressDecrement = (elapsed / remainingRef.current) * startProgress;
      const newProgress = Math.max(0, startProgress - progressDecrement);
      setProgress(newProgress);
      if (newProgress > 0) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, handleDismiss]);

  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
    remainingRef.current = (progress / 100) * duration;
  }, [progress, duration]);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  return (
    <motion.div
      layout
      role="alert"
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95, transition: { duration: 0.15 } }}
      transition={{ type: "spring", damping: 25, stiffness: 350 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      className={cn(
        "pointer-events-auto relative overflow-hidden",
        "bg-white rounded-xl shadow-lg ring-1 ring-border-subtle",
        "border-l-4 p-4",
        config.borderClass
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <IconComponent
          className={cn("h-5 w-5 shrink-0 mt-0.5", config.iconClass)}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-sans font-semibold text-primary-900 leading-snug">
            {item.title}
          </p>
          {item.description && (
            <p className="mt-1 text-sm font-sans text-text-tertiary leading-relaxed">
              {item.description}
            </p>
          )}
        </div>

        {/* Dismiss button — 44px touch target */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss notification"
          className={cn(
            "shrink-0 flex items-center justify-center",
            "min-h-[44px] min-w-[44px] -m-2 -mt-2 -mr-2",
            "rounded-xl text-text-muted cursor-pointer",
            "hover:text-primary-900 hover:bg-sand-100",
            "motion-safe:transition-colors motion-safe:duration-150",
            "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary-500"
          )}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Auto-dismiss progress bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px] bg-sand-100"
        aria-hidden="true"
      >
        <div
          className={cn("h-full rounded-full motion-safe:transition-none", config.progressClass)}
          style={{ width: `${progress}%`, opacity: 0.6 }}
        />
      </div>
    </motion.div>
  );
}

export { ToastNotification };
