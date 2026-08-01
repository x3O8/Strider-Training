"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden border-t border-white/[0.07] bg-black">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(-55deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 34px),
            repeating-linear-gradient(55deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 34px)
          `,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-10 pt-14 md:px-10 md:pb-14 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 md:mb-14"
        >
          <p
            className="mb-5 text-[9px] uppercase tracking-[0.5em] text-white/40"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            The Strider Approach
          </p>

          <div className="grid grid-cols-1 items-start gap-8 md:gap-12 lg:grid-cols-2">
            <h2
              className="text-[clamp(36px,6.8vw,94px)] leading-[0.98] text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
            >
              WE BUILD<br />PERFORMANCE SYSTEMS
            </h2>

            <div className="lg:pl-16">
              <div className="mb-5 h-px w-10 bg-white/30 md:mb-7" />
              <div
                className="space-y-5 text-[13px] font-light leading-[1.8] text-white/75 md:text-[15px]"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                <p>
                  Training is only one part of the equation. Lasting performance comes from understanding how movement, nutrition, recovery, lifestyle, physiology, and health markers work together. That&apos;s why Strider builds human performance systems—not isolated programs.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-32 overflow-hidden md:h-44"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#151515] to-[#5a5c5c]" />
          <Image
            src="/athlete/performancebann.jpg"
            alt="Strider Coaching"
            fill
            quality={72}
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="absolute inset-0 object-cover opacity-20"
          />

          {Array.from({ length: 6 }).map((_, index) => (
            <span
              key={index}
              className="about-particle absolute h-1 w-1 rounded-full bg-white"
              style={{
                left: `${12 + index * 16}%`,
                top: `${25 + (index % 3) * 18}%`,
                animationDuration: `${2.5 + index * 0.4}s`,
                animationDelay: `${index * 0.35}s`,
              }}
            />
          ))}

          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <p
              className="mb-2 text-[8px] uppercase tracking-[0.5em] text-white/40 md:mb-3 md:text-[9px]"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Science-Backed · Results-Driven
            </p>
            <h3
              className="text-[clamp(22px,5vw,70px)] leading-none text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
            >
              The Best Is Built Through Systems.
            </h3>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
