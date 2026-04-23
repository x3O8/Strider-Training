"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-black border-t border-white/[0.07] overflow-hidden">

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(-55deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 34px),
            repeating-linear-gradient( 55deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 34px)
          `,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-28 relative z-10">

        {/* ── Section label + headline ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <p
            className="text-[9px] text-white/28 tracking-[0.5em] uppercase mb-5"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Our Story
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start lg:items-end">
            <h2
              className="text-[clamp(42px,9vw,120px)] text-white leading-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
            >
              We Coach<br />Champions
            </h2>
            <div className="lg:pl-20">
              <div className="w-10 h-px bg-white/30 mb-5 md:mb-7" />
              <p
                className="text-sm text-white/80 leading-[1.9] mb-4 md:mb-5"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Strider was founded on one belief: every person who commits to their fitness
                deserves world-class coaching — not generic apps, not one-size-fits-all plans.
                We pair you with an expert who becomes your training partner, accountability
                partner, and the person who refuses to let you quit.
              </p>
              <p
                className="text-sm text-white/70 leading-[1.9]"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                From first-time gym-goers to competitive athletes, our coaches have helped
                thousands of clients break through their limits and achieve results they never
                thought possible.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Banner: Train With The Best ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.97 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative h-32 md:h-44 overflow-hidden"
        >
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #151515ff 0%, #5a5c5cff 100%)" }} />
          <img
            src="/athlete/performance-banner.jpg"
            alt="Strider Coaching"
            className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-20"
          />

          {/* Floating dots */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -14, 0], opacity: [0.12, 0.35, 0.12] }}
              transition={{ repeat: Infinity, duration: 2.5 + i * 0.4, delay: i * 0.35 }}
              className="absolute w-1 h-1 rounded-full bg-white"
              style={{ left: `${12 + i * 16}%`, top: `${25 + (i % 3) * 18}%` }}
            />
          ))}

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <p
              className="text-[8px] md:text-[9px] text-white/28 tracking-[0.5em] uppercase mb-2 md:mb-3"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Science-Backed · Results-Driven
            </p>
            <h3
              className="text-[clamp(22px,5vw,70px)] text-white leading-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
            >
              Train with the Best. Become the Best.
            </h3>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
