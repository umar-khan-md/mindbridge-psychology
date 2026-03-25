"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  User,
  Heart,
  Users,
  ClipboardCheck,
  Shield,
  Building2,
  GraduationCap,
  FileText,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Icon mapping                                                       */
/* ------------------------------------------------------------------ */

const iconMap: Record<string, LucideIcon> = {
  User,
  Heart,
  Users,
  ClipboardCheck,
  Shield,
  Building2,
  GraduationCap,
  FileText,
};

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const gridContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const gridCardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const iconScaleVariants: Variants = {
  hidden: { scale: 0.7, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      delay: 0.15,
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Bento layout helpers                                               */
/*  Row 1 (index 0-1): 60/40 split — col-span-3 / col-span-2         */
/*  Row 2 (index 2-4): 3 equal columns                                */
/*  Row 3 (index 5-7): reverse emphasis — 1 / 1 / col-span-3         */
/* ------------------------------------------------------------------ */

function getCardSpan(index: number): string {
  if (index === 0) return "lg:col-span-3";
  if (index === 1) return "lg:col-span-2";
  if (index >= 2 && index <= 4) return "lg:col-span-1";
  if (index === 5) return "lg:col-span-1";
  if (index === 6) return "lg:col-span-1";
  if (index === 7) return "lg:col-span-3";
  return "";
}

function isFeatured(index: number) {
  return index === 0 || index === 7;
}

/* ------------------------------------------------------------------ */
/*  ServiceGrid                                                        */
/* ------------------------------------------------------------------ */

export function ServiceGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  /* Split services into rows for the bento layout */
  const row1 = services.slice(0, 2);
  const row2 = services.slice(2, 5);
  const row3 = services.slice(5, 8);

  const renderCard = (
    service: (typeof services)[number],
    index: number,
    featured: boolean
  ) => {
    const IconComponent = iconMap[service.icon] || User;

    return (
      <motion.div
        key={service.slug}
        variants={gridCardVariants}
        whileHover={
          prefersReducedMotion
            ? {}
            : {
                y: -6,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                },
              }
        }
        className={cn(getCardSpan(index))}
      >
        <Link
          href={`/services/${service.slug}`}
          className={cn(
            "group relative block rounded-[1.5rem] p-7 lg:p-8 h-full",
            "bg-white border border-border-subtle",
            "hover:border-transparent hover:shadow-2xl hover:shadow-primary-500/10",
            "motion-safe:transition-[border-color,box-shadow] duration-200 ease-out",
            "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/40 focus-visible:ring-offset-2",
            "overflow-hidden"
          )}
        >
          {/* Gradient background glow on hover */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-200",
              "bg-gradient-to-br from-primary-500/10 via-transparent to-accent-500/10"
            )}
            aria-hidden="true"
          />
          {/* Gradient border overlay on hover */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{
              background:
                "linear-gradient(135deg, rgba(var(--color-primary-400), 0.35), rgba(var(--color-accent-400), 0.25)) padding-box, linear-gradient(135deg, rgba(var(--color-primary-400), 0.35), rgba(var(--color-accent-400), 0.25)) border-box",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              padding: "1.5px",
              borderRadius: "1.5rem",
            }}
            aria-hidden="true"
          />
          {/* Fallback border for hover with CSS classes */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[1.5rem] border-[1.5px] border-transparent group-hover:border-primary-300/50 transition-colors duration-200"
            aria-hidden="true"
          />

          <div className="relative z-10">
            {/* Icon with spring scale on viewport entry */}
            <motion.div
              variants={iconScaleVariants}
              className={cn(
                "rounded-xl flex items-center justify-center mb-5",
                "bg-gradient-to-br from-primary-50 to-primary-100",
                "group-hover:from-primary-100 group-hover:to-primary-200",
                "transition-[background] duration-200 ease-out",
                featured ? "w-16 h-16" : "w-12 h-12"
              )}
            >
              <IconComponent
                className={cn(
                  "text-primary-700",
                  featured ? "w-7 h-7" : "w-6 h-6"
                )}
              />
            </motion.div>

            {/* Title */}
            <h3
              className={cn(
                "font-heading text-text-primary mb-2 group-hover:text-primary-700 transition-colors duration-200",
                featured ? "text-2xl lg:text-3xl" : "text-xl"
              )}
            >
              {service.name}
            </h3>

            {/* Description */}
            <p
              className={cn(
                "text-text-tertiary leading-relaxed mb-4",
                featured ? "text-base line-clamp-4" : "text-sm line-clamp-3"
              )}
            >
              {service.shortDescription}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {service.medicareEligible && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-primary-50 text-primary-700">
                  Medicare
                </span>
              )}
              {service.ndisEligible && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-accent-50 text-accent-700">
                  NDIS
                </span>
              )}
            </div>

            {/* Link with sliding arrow */}
            <span className="inline-flex items-center text-sm font-semibold text-primary-600 group-hover:text-primary-700 transition-colors duration-200">
              Learn More
              <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-200 ease-out group-hover:translate-x-1.5" />
            </span>
          </div>
        </Link>
      </motion.div>
    );
  };

  return (
    <section className="py-24 lg:py-32 bg-bg-primary" ref={ref}>
      <div className="container-wide">
        {/* Section header — left-aligned with accent bar */}
        <div className="max-w-2xl mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="section-label mb-4"
          >
            Our Services
          </motion.p>
          <div className="flex items-start gap-5">
            {/* Accent bar */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="hidden sm:block w-[3px] flex-shrink-0 self-stretch rounded-full bg-primary-500 origin-top mt-1"
              aria-hidden="true"
            />
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-heading text-4xl lg:text-5xl text-text-primary mb-4 tracking-tight"
              >
                Comprehensive Mental Health Support
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-text-secondary text-lg"
              >
                From individual therapy to corporate programs, our team delivers
                evidence-based care tailored to your situation.
              </motion.p>
            </div>
          </div>
        </div>

        {/* Bento grid — 5-column base for asymmetric rows */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
          variants={gridContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Row 1: 60/40 featured split */}
          {row1.map((service, i) =>
            renderCard(service, i, isFeatured(i))
          )}

          {/* Row 2: 3 equal columns — each spans ~1.67 cols, approximate with manual spans */}
          {row2.map((service, i) => {
            // For 3 items in a 5-col grid: use specific spans
            // Item 0: col-span-2, Item 1: col-span-1, Item 2: col-span-2
            const row2Span =
              i === 1 ? "lg:col-span-1" : "lg:col-span-2";
            return (
              <motion.div
                key={service.slug}
                variants={gridCardVariants}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                        y: -6,
                        transition: {
                          type: "spring",
                          stiffness: 100,
                          damping: 20,
                        },
                      }
                }
                className={cn(row2Span)}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className={cn(
                    "group relative block rounded-[1.5rem] p-7 lg:p-8 h-full",
                    "bg-white border border-border-subtle",
                    "hover:border-transparent hover:shadow-2xl hover:shadow-primary-500/10",
                    "motion-safe:transition-[border-color,box-shadow] duration-200 ease-out",
                    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/40 focus-visible:ring-offset-2",
                    "overflow-hidden"
                  )}
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                      "bg-gradient-to-br from-primary-500/10 via-transparent to-accent-500/10"
                    )}
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[1.5rem] border-[1.5px] border-transparent group-hover:border-primary-300/50 transition-colors duration-200"
                    aria-hidden="true"
                  />

                  <div className="relative z-10">
                    <motion.div
                      variants={iconScaleVariants}
                      className={cn(
                        "rounded-xl flex items-center justify-center mb-5 w-12 h-12",
                        "bg-gradient-to-br from-primary-50 to-primary-100",
                        "group-hover:from-primary-100 group-hover:to-primary-200",
                        "transition-[background] duration-200 ease-out"
                      )}
                    >
                      {(() => {
                        const IconComponent =
                          iconMap[service.icon] || User;
                        return (
                          <IconComponent className="w-6 h-6 text-primary-700" />
                        );
                      })()}
                    </motion.div>

                    <h3 className="font-heading text-xl text-text-primary mb-2 group-hover:text-primary-700 transition-colors duration-200">
                      {service.name}
                    </h3>

                    <p className="text-sm text-text-tertiary leading-relaxed mb-4 line-clamp-3">
                      {service.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {service.medicareEligible && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-primary-50 text-primary-700">
                          Medicare
                        </span>
                      )}
                      {service.ndisEligible && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-accent-50 text-accent-700">
                          NDIS
                        </span>
                      )}
                    </div>

                    <span className="inline-flex items-center text-sm font-semibold text-primary-600 group-hover:text-primary-700 transition-colors duration-200">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-200 ease-out group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* Row 3: reverse emphasis — 1 + 1 + 3 */}
          {row3.map((service, i) => {
            const globalIndex = i + 5;
            return renderCard(service, globalIndex, isFeatured(globalIndex));
          })}
        </motion.div>
      </div>
    </section>
  );
}
