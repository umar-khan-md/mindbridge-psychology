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
/*  Bento layout — first 2 cards are "featured" (span 2 cols on lg)    */
/* ------------------------------------------------------------------ */

function isFeatured(index: number) {
  return index < 2;
}

/* ------------------------------------------------------------------ */
/*  ServiceGrid                                                        */
/* ------------------------------------------------------------------ */

export function ServiceGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section-padding bg-bg-primary" ref={ref}>
      <div className="container-wide">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="section-label mb-4"
          >
            Our Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-4xl lg:text-5xl text-text-primary mb-4 tracking-tight"
          >
            Comprehensive Mental Health Support
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-text-secondary text-lg"
          >
            From individual therapy to corporate programs, our team delivers
            evidence-based care tailored to your situation.
          </motion.p>
        </div>

        {/* Bento grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={gridContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || User;
            const featured = isFeatured(index);

            return (
              <motion.div
                key={service.slug}
                variants={gridCardVariants}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : { y: -8, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 25 } }
                }
                className={cn(featured && "lg:col-span-2")}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className={cn(
                    "group relative block rounded-2xl p-7 lg:p-8 h-full",
                    "bg-white border border-border-subtle",
                    "hover:border-transparent hover:shadow-2xl hover:shadow-primary-500/10",
                    "motion-safe:transition-[border-color,box-shadow] duration-200 ease-out",
                    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-500/40 focus-visible:ring-offset-2",
                    "overflow-hidden"
                  )}
                >
                  {/* Gradient border glow on hover */}
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                      "bg-gradient-to-br from-primary-500/10 via-transparent to-accent-500/10"
                    )}
                    aria-hidden="true"
                  />
                  {/* Hover border overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary-200/60 transition-colors duration-200"
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
          })}
        </motion.div>
      </div>
    </section>
  );
}
