import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ClientForm from "@/components/ClientForm";
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
                Let&apos;s build
                <br />
                what&apos;s next.
              </h1>
              <div className="max-w-xl lg:pb-2">
                <p
                  className="text-base font-light leading-[1.9] text-white/58 md:text-lg"
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
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.external ? "_blank" : undefined}
                  rel={channel.external ? "noreferrer" : undefined}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.11] bg-white/[0.035] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-orange-400/40 hover:bg-white/[0.055]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent"
                  />
                  <div className="mb-8 flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-black/30 text-white/60 transition-colors duration-300 group-hover:border-orange-400/35 group-hover:text-orange-400">
                      {channel.icon}
                    </span>
                    <span className="text-lg text-white/18 transition duration-300 group-hover:translate-x-1 group-hover:text-orange-400">
                      ↗
                    </span>
                  </div>
                  <p
                    className="text-[9px] uppercase tracking-[0.34em] text-white/32"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {channel.label}
                  </p>
                  <p
                    className="mt-2 break-words text-base text-white/88"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {channel.value}
                  </p>
                  <p
                    className="mt-2 text-[10px] leading-relaxed text-white/32"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {channel.detail}
                  </p>
                </a>
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
