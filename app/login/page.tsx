import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lock, Shield } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Client Login | MindBridge Psychology",
  description:
    "Log in to the MindBridge Psychology client portal to access your appointments, session notes, and secure messages.",
  alternates: {
    canonical: "https://mindbridgepsychology.com.au/login",
  },
};

export default function LoginPage() {
  return (
    <>
      <Breadcrumbs />

      <section className="relative py-16 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/60 to-transparent" />
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-primary-100/30 blur-3xl" />

        <div className="container-wide relative z-10">
          <div className="max-w-md mx-auto">
            {/* Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 p-8 lg:p-10">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-100 mx-auto mb-6">
                <Lock className="w-7 h-7 text-primary-700" />
              </div>

              <h1 className="font-heading text-3xl text-primary-900 text-center mb-2">
                Client Portal
              </h1>
              <p className="text-neutral-500 text-center text-sm mb-8">
                Access your appointments, session notes, and secure messages.
              </p>

              <form className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-primary-900 mb-1.5"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-primary-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow bg-white"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-primary-900"
                    >
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-xs text-primary-600 hover:text-primary-800 transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-primary-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-all duration-200 shadow-md shadow-primary-500/20 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                >
                  Sign In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-neutral-100 text-center">
                <p className="text-sm text-neutral-500">
                  New client?{" "}
                  <Link
                    href="/intake"
                    className="text-primary-700 font-medium hover:text-primary-900 transition-colors"
                  >
                    Complete your intake form
                  </Link>
                </p>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-neutral-400">
                <Shield className="w-3.5 h-3.5" />
                <span>Secured with 256-bit encryption</span>
              </div>
            </div>

            <p className="text-center text-sm text-neutral-500 mt-6">
              Need help?{" "}
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="text-primary-600 hover:text-primary-800 transition-colors"
              >
                {SITE_CONFIG.phone}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
