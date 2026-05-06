"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    heading: "Company",
    links: [
      { label: "About Strider", href: "/#about" },
      { label: "Meet the Coaches", href: "/#about" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact Us", href: "/#contact" },
    ],
  },
  {
    heading: "Coaching",
    links: [
      { label: "1-on-1 Coaching", href: "/#programs" },
      { label: "Group Programs", href: "/#programs" },
      { label: "Online Coaching", href: "/#programs" },
      { label: "Corporate Wellness", href: "/#programs" },
      { label: "Student Athletes", href: "/#programs" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Return Policy", href: "/return-policy" },
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


const badges = ["HIPAA Compliant", "SSL Encrypted", "ISO 27001"];

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

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-8 relative z-10">

        {/* ── Top row: logo + description + link columns ──────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr_1fr_1fr] gap-12 pb-14 border-b border-white/[0.07]">

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
              Elite fitness coaching for everyone. Personalised plans, certified coaches,
              and a community that keeps you accountable.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-2.5 mt-2">
              {[
                { icon: "✉", text: "info@striderfitness.com" },
                { icon: "📞", text: "9995906262" },
                { icon: "📍", text: "Kerala, India · Remote Worldwide" },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="text-[10px] mt-0.5 text-white/25">{c.icon}</span>
                  <span
                    className="text-[10px] text-white/30 leading-snug"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {c.text}
                  </span>
                </div>
              ))}
            </div>
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
            © Strider Fitness 2025. All rights reserved.
          </p>

          {/* Trust badges */}
          <div className="flex items-center gap-5">
            {badges.map((b) => (
              <div key={b} className="flex items-center gap-1.5">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
                <span
                  className="text-[8px] text-white/22 tracking-[0.25em] uppercase"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {b}
                </span>
              </div>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2.5">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-full border border-white/12 flex items-center justify-center text-white/30 hover:border-white/30 hover:text-white/70 transition-all duration-200"
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
