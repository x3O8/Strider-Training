"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const navLinksLeft = [
  { label: "Blog", href: "#blog" },
  { label: "Stories", href: "/client-stories" },
  { label: "Contact", href: "#contact" },
];

const allNavLinks = [...navLinksLeft];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setScrollProgress(Math.min(y / 200, 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          backdropFilter: "blur(18px)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(255,255,255,0.04)",
          ...diagonalPattern,
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center">

          {/* ── LEFT nav links ─────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-start">
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
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex-shrink-0 group absolute left-1/2 -translate-x-1/2">
            <div
              className="relative flex-shrink-0 transition-all duration-300 ease-out rounded-sm overflow-hidden"
              style={{ width: `${logoSize}px`, height: `${logoSize}px` }}
            >
              <Image
                src="/stryder-logo.jpeg"
                alt="Strider Logo"
                fill
                className="object-contain group-hover:opacity-80 transition-opacity duration-200"
                priority
              />
            </div>
          </a>

          {/* ── RIGHT: Get Started CTA only ─────────────────────────── */}
          <div className="hidden md:flex items-center flex-1 justify-end">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02, backgroundColor: "#e8e8e8" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center px-6 py-2.5 bg-white text-black rounded-full text-[10px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Get Started
            </motion.a>
          </div>

          {/* ── Hamburger (mobile) ──────────────────────────────────── */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 ml-auto"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block w-5 h-px bg-white origin-center transition-all" />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-5 h-px bg-white" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block w-5 h-px bg-white origin-center transition-all" />
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Menu ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed top-28 left-0 right-0 z-[99] bg-black border-b border-white/10 md:hidden"
            style={diagonalPattern}
          >
            <div className="flex flex-col px-6 py-6 gap-4">
              {allNavLinks.map((link) => (
                <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
                  className="text-sm text-white/50 tracking-[0.22em] uppercase hover:text-white/90 transition-colors duration-200 py-2 border-b border-white/6"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-2">
                <Link href="#contact" onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center py-3 bg-white text-black rounded-full text-[10px] font-semibold tracking-[0.18em] uppercase hover:bg-[#e8e8e8]"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
