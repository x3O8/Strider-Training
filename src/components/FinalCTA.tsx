"use client";

import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="relative bg-black border-t border-white/[0.07] overflow-hidden">

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-24 relative z-10">

        {/* CTA */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[9px] text-white/28 tracking-[0.5em] uppercase mb-6"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            YOUR JOURNEY STARTS HERE
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-4 text-[clamp(58px,12vw,155px)] leading-none text-white uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
          >
            READY TO REALIZE<br />YOUR POTENTIAL?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="mb-8 text-[11px] uppercase tracking-[0.46em] text-orange-500 md:mb-10 md:text-xs"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            JOIN THE STRIDE
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="/#contact"
              id="book-consultation-cta"
              whileHover={{ scale: 1.03, backgroundColor: "#e8e8e8" }}
              whileTap={{ scale: 0.97 }}
              className="px-16 py-4 bg-white text-black text-[10px] font-bold tracking-[0.3em] uppercase transition-colors duration-200"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              BOOK FREE CONSULTATION
            </motion.a>

            <motion.a
              href="/#programs"
              initial={{ borderColor: "rgba(255,255,255,0.14)" }}
              whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.38)" }}
              whileTap={{ scale: 0.98 }}
              className="px-14 py-4 border text-white/38 text-[10px] tracking-[0.3em] uppercase transition-all duration-200 hover:text-white/65"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              VIEW PROGRAMS
            </motion.a>
          </motion.div>
        </div>

      </div>

      <div className="border-t border-white/[0.07]" />
    </section>
  );
}
