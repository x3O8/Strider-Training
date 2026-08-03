"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/#about" },
      { label: "Meet the Founder", href: "/#founder" },
      { label: "Success Stories", href: "/client-stories" },
      { label: "Knowledge Hub", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Coaching",
    links: [
      { label: "Foundation", href: "/#program-general-fitness" },
      { label: "Performance", href: "/#program-competition-prep" },
      { label: "Request Consultation", href: "/#contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Articles", href: "/blog" },
      { label: "Success Stories", href: "/client-stories" },
      { label: "Free Guides", href: "/blog" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "hello@stridertraining.com", href: "mailto:hello@stridertraining.com" },
      { label: "Remote Coaching Worldwide", href: "/contact" },
      { label: "Instagram", href: "https://www.instagram.com/strider_training/" },
      { label: "YouTube", href: "#" },
    ],
  },
];

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/strider_training/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];


export default function Footer() {
  return (
    <footer className="relative bg-[#080808] border-t border-white/[0.07] overflow-hidden">

      {/* Subtle diagonal background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(-55deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 36px),
            repeating-linear-gradient( 55deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 36px)
          `,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-12 pb-7 relative z-10">

        {/* ── Top row: logo + description + link columns ──────────────── */}
        <div className="grid grid-cols-1 gap-10 border-b border-white/[0.07] pb-10 md:grid-cols-2 lg:grid-cols-[1.6fr_repeat(4,1fr)]">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="relative w-48 h-12 flex-shrink-0">
                <Image src="/strider-logo.png" alt="Strider" fill sizes="192px" className="object-contain" />
              </div>
            </div>

            {/* Tagline */}
            <p
              className="text-xs text-white/30 leading-[1.9] max-w-[220px]"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Helping people build healthier, stronger, and more capable bodies through
              individualized coaching, adaptive systems, and evidence-based practice.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <p
                className="text-[9px] text-white/50 tracking-[0.35em] uppercase mb-1"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {col.heading}
              </p>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[11px] text-white/28 hover:text-white/65 transition-colors duration-200 leading-none"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────── */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-5">

          {/* Copyright */}
          <p
            className="text-[9px] text-white/20 tracking-[0.25em]"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            © 2026 Strider Training Systems. All rights reserved.
          </p>

          <p
            className="text-[9px] uppercase tracking-[0.22em] text-white/20"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            BUILT FOR LONGEVITY. ENGINEERED FOR PERFORMANCE.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-2.5">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 sm:w-8 sm:h-8 rounded-full border border-white/12 flex items-center justify-center text-white/30 hover:border-white/30 hover:text-white/70 transition-all duration-200"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
