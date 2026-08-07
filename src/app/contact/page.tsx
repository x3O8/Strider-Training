import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ClientForm from "@/components/ClientForm";
import BlogFeatureCarousel from "@/components/BlogFeatureCarousel";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact | Strider Training Systems",
  description:
    "Contact Strider Training Systems or apply for personalised performance coaching.",
};

const contactChannels = [
  {
    label: "Instagram",
    value: "@strider_training",
    detail: "Training insights, education, and coaching updates.",
    href: "https://www.instagram.com/strider_training/",
    external: true,
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.25" />
        <circle cx="17.4" cy="6.7" r="0.85" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+91 99959 06262",
    detail: "Consultations and coaching enquiries",
    href: "tel:+919995906262",
    external: false,
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M7.1 3.5 9.6 7.8 7.8 9.6c1.2 2.6 4 5.4 6.6 6.6l1.8-1.8 4.3 2.5-.9 3.1c-.2.7-.9 1.2-1.7 1.2C10.1 20.8 3.2 13.9 2.8 6.1c0-.8.5-1.5 1.2-1.7l3.1-.9Z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "hello@stridertraining.com",
    detail: "General enquiries and support.",
    href: "mailto:hello@stridertraining.com",
    external: false,
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4.5 7 7.5 6 7.5-6" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-white/[0.07] px-6 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage: `
                repeating-linear-gradient(-55deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 34px),
                repeating-linear-gradient(55deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 34px)
              `,
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-orange-500/[0.07] blur-[110px]"
          />

          <div className="relative mx-auto max-w-7xl">
            <p
              className="mb-5 text-[10px] uppercase tracking-[0.5em] text-orange-400"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Connect with Strider
            </p>

            <div className="grid items-end gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <h1
                className="text-[clamp(68px,11vw,156px)] leading-[0.78] tracking-[0.025em] text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                what&apos;s next?
              </h1>
              <div className="max-w-xl lg:pb-2">
                <BlogFeatureCarousel />
                <p
                  className="mt-6 text-sm font-light leading-[1.8] text-white/50 md:text-base"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Whether you&apos;re looking to improve your health, return from injury,
                  or perform at your highest level, we&apos;re here to help you find the
                  right path. Reach out through the contact method that works best
                  for you, or request a complimentary consultation to get started.
                </p>
                <p
                  className="mt-5 text-[9px] uppercase tracking-[0.34em] text-white/28"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Kerala, India &bull; Coaching worldwide
                </p>
              </div>
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-3 md:gap-5">
              {contactChannels.map((channel) => (
                <div
                  key={channel.label}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.11] bg-white/[0.035] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-orange-400/40 hover:bg-white/[0.055]"
                >
                  <a
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noreferrer" : undefined}
                    aria-label={`Open ${channel.label}`}
                    className="absolute inset-0 z-0"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent"
                  />
                  <div className="relative z-10 mb-8 flex items-center justify-between pointer-events-none">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-black/30 text-white/60 transition-colors duration-300 group-hover:border-orange-400/35 group-hover:text-orange-400">
                      {channel.icon}
                    </span>
                    <span className="text-lg text-white/18 transition duration-300 group-hover:translate-x-1 group-hover:text-orange-400">
                      ↗
                    </span>
                  </div>
                  <p
                    className="relative z-10 pointer-events-none text-[9px] uppercase tracking-[0.34em] text-white/32"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {channel.label}
                  </p>
                  <p
                    className="relative z-10 mt-2 flex items-center gap-3 break-words text-base text-white/88 pointer-events-none"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {channel.value}
                    {channel.label === "Phone" && (
                      <a
                        href="https://wa.me/919995906262"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Message Strider on WhatsApp"
                        className="pointer-events-auto relative z-20 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/55 transition-colors duration-300 hover:border-orange-400/60 hover:text-orange-400"
                      >
                        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                          <path d="M20.5 3.5A11.9 11.9 0 0 0 12.04 0C5.47 0 .12 5.35.12 11.93c0 2.1.55 4.15 1.6 5.95L0 24l6.27-1.64a11.87 11.87 0 0 0 5.77 1.49h.01c6.57 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.19-3.48-8.42Zm-8.46 18.37h-.01a9.89 9.89 0 0 1-5.04-1.38l-.36-.21-3.72.97.99-3.63-.23-.37a9.91 9.91 0 0 1-1.52-5.32C2.15 6.46 6.58 2.03 12.04 2.03c2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 7c0 5.46-4.44 9.89-9.89 9.89Zm5.42-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.46-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                        </svg>
                      </a>
                    )}
                  </p>
                  <p
                    className="relative z-10 mt-2 pointer-events-none text-[10px] leading-relaxed text-white/32"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {channel.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ClientForm preselectedGoal={null} />
      </main>

      <Footer />
    </div>
  );
}
