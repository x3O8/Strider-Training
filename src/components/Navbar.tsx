"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinksLeft = [
  { label: "Knowledge Hub", href: "/blog" },
  { label: "Stories", href: "/client-stories" },
  { label: "Contact", href: "/#contact" },
];

const allNavLinks = [...navLinksLeft];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setScrollProgress(Math.min(y / 200, 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
          <Link href="/" className="flex-shrink-0 group absolute left-1/2 -translate-x-1/2">
            <div
              className="relative flex-shrink-0 transition-all duration-300 ease-out rounded-sm overflow-hidden will-change-[width,height]"
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
              href="/#contact"
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
            className="md:hidden ml-auto relative w-11 h-11 flex items-center justify-center rounded-lg group"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{
              background: menuOpen
                ? "rgba(255,255,255,0.08)"
                : "rgba(255,255,255,0.03)",
              border: menuOpen
                ? "1px solid rgba(255,255,255,0.2)"
                : "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              transition: "all 0.3s ease",
            }}
          >
            {/* Animated glow ring */}
            <motion.div
              className="absolute inset-0 rounded-lg pointer-events-none"
              animate={{
                boxShadow: menuOpen
                  ? "0 0 20px rgba(255,255,255,0.1), inset 0 0 12px rgba(255,255,255,0.05)"
                  : "0 0 0px rgba(255,255,255,0), inset 0 0 0px rgba(255,255,255,0)",
              }}
              transition={{ duration: 0.3 }}
            />
            <div className="flex flex-col items-center justify-center gap-[5px] relative z-10">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7, width: 18 } : { rotate: 0, y: 0, width: 18 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block h-[1.5px] origin-center"
                style={{
                  background: menuOpen
                    ? "linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.5))"
                    : "linear-gradient(90deg, rgba(255,255,255,0.7), rgba(255,255,255,0.3))",
                }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-3 h-[1.5px] origin-center"
                style={{
                  background: "linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.2))",
                }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7, width: 18 } : { rotate: 0, y: 0, width: 14 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block h-[1.5px] origin-center"
                style={{
                  background: menuOpen
                    ? "linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.9))"
                    : "linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0.6))",
                }}
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Menu ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, y: 0, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, y: -10, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-20 left-0 right-0 z-[99] md:hidden"
            style={{
              background: "rgba(0,0,0,0.92)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              ...diagonalPattern,
            }}
          >
            <div className="flex flex-col px-6 py-8 gap-1">
              {allNavLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between text-sm text-white/50 tracking-[0.22em] uppercase hover:text-white/90 transition-colors duration-200 py-4 border-b border-white/[0.06]"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {link.label}
                    <span className="text-white/15 text-xs">→</span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="pt-5"
              >
                <Link
                  href="/#contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center py-3.5 bg-white text-black rounded-full text-[10px] font-semibold tracking-[0.18em] uppercase hover:bg-[#e8e8e8] transition-colors"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
