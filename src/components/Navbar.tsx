"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const navLinksLeft = [
  { label: "Knowledge Hub", href: "/blog" },
  { label: "Stories", href: "/client-stories" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const allNavLinks = [...navLinksLeft];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrolled: boolean | undefined;
    const onScroll = () => {
      const nextScrolled = window.scrollY > 10;
      if (nextScrolled === lastScrolled) return;
      lastScrolled = nextScrolled;
      setScrolled(nextScrolled);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen || window.innerWidth >= 768) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const diagonalPattern = {
    backgroundImage: `
      repeating-linear-gradient(-55deg,rgba(255,255,255,0.035) 0px,rgba(255,255,255,0.035) 1px,transparent 1px,transparent 30px),
      repeating-linear-gradient( 55deg,rgba(255,255,255,0.035) 0px,rgba(255,255,255,0.035) 1px,transparent 1px,transparent 30px)
    `,
  };

  // Logo: constant size
  const logoSize = 72;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100]"
        style={{
          background: "rgba(0,0,0,0.96)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(255,255,255,0.04)",
          ...diagonalPattern,
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center">

          {/* ── LEFT nav links ─────────────────────────────────────── */}
          <div className="hidden flex-1 items-center justify-start gap-4 md:flex lg:gap-8">
            {navLinksLeft.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-[10px] text-white/40 hover:text-white/80 tracking-[0.22em] uppercase transition-colors duration-200 group"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/60 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* ── CENTER: Big logo only (no text) ─────────────────────── */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex-shrink-0 group absolute left-1/2 -translate-x-1/2"
          >
            <div
              className="relative flex-shrink-0 rounded-sm overflow-hidden"
              style={{ width: `${logoSize}px`, height: `${logoSize}px` }}
            >
              <Image
                src="/stryder-logo.jpeg"
                alt="Strider Logo"
                fill
                sizes="72px"
                className="object-contain group-hover:opacity-80 transition-opacity duration-200"
                priority
              />
            </div>
          </Link>

          {/* ── RIGHT: Get Started CTA only ─────────────────────────── */}
          <div className="hidden md:flex items-center flex-1 justify-end">
            <motion.a
              href="/contact#contact"
              whileHover={{ scale: 1.02, backgroundColor: "#e8e8e8" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center px-6 py-2.5 bg-white text-black rounded-full text-[10px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Get Started
            </motion.a>
          </div>

          {/* ── Premium Hamburger (mobile) ──────────────────────────── */}
          <button
            className="group relative ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.035] transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.07] md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <motion.div
              className="pointer-events-none absolute inset-[5px] rounded-full border border-orange-400/0"
              animate={{ borderColor: menuOpen ? "rgba(251,146,60,0.48)" : "rgba(251,146,60,0)" }}
              transition={{ duration: 0.25 }}
            />
            <div className="relative z-10 flex flex-col items-end justify-center gap-[6px]">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 4, width: 19 } : { rotate: 0, y: 0, width: 19 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="block h-px origin-center bg-white/85"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -3, width: 19 } : { rotate: 0, y: 0, width: 12 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="block h-px origin-center bg-white/55"
              />
            </div>
            <motion.span
              aria-hidden="true"
              className="absolute right-[8px] top-[9px] h-1 w-1 rounded-full bg-orange-400"
              animate={{ opacity: menuOpen ? 1 : 0.55, scale: menuOpen ? 1.2 : 1 }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Menu ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 top-20 z-[99] overflow-y-auto overscroll-contain border-b border-white/[0.08] bg-[#0b0b0b] md:hidden"
            style={diagonalPattern}
          >
            <div className="relative flex min-h-full flex-col px-6 pb-7 pt-6 min-[390px]:px-8">
              <div className="mb-7 flex items-center justify-between border-b border-white/[0.08] pb-5">
                <div className="relative h-10 w-40">
                  <Image src="/strider-logo.png" alt="Strider Training Systems" fill sizes="160px" className="object-contain object-left" />
                </div>
                <span className="text-[8px] uppercase tracking-[0.34em] text-orange-400" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                  Menu / 01
                </span>
              </div>

              <nav aria-label="Mobile navigation" className="flex flex-col">
              {allNavLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.065, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex min-h-[70px] items-center justify-between border-b border-dashed border-white/18 py-3 text-[clamp(36px,11vw,48px)] uppercase leading-[0.82] tracking-[0.025em] text-white/85 transition-colors duration-300 hover:text-white"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {link.label}
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.035] text-[9px] text-orange-400 transition-all duration-300 group-hover:border-orange-400/50 group-hover:bg-orange-400 group-hover:text-black">
                      &#9654;
                    </span>
                  </Link>
                </motion.div>
              ))}
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.44, duration: 0.4 }}
                className="mt-auto pt-8"
              >
                <Link
                  href="/contact#contact"
                  onClick={() => setMenuOpen(false)}
                  className="group flex min-h-12 items-center justify-between rounded-xl bg-white px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-black transition-colors hover:bg-orange-400"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Start your journey
                  <span aria-hidden="true" className="text-[9px] transition-transform duration-300 group-hover:translate-x-1">&#9654;</span>
                </Link>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <p className="text-[7px] uppercase leading-[1.7] tracking-[0.26em] text-white/25" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                    Individualized &bull; Adaptive<br />Human Performance Systems
                  </p>
                  <a
                    href="https://www.instagram.com/strider_training/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Strider on Instagram"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/45 transition-colors hover:border-white/30 hover:text-white"
                  >
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4.2" />
                      <circle cx="17.4" cy="6.7" r="0.8" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
