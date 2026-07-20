"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function MeetTheCoachSection() {
  return (
    <section className="bg-black py-14 md:py-20 relative border-t border-white/[0.07] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[9px] text-white/28 tracking-[0.5em] uppercase mb-5"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Coaches Notes
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(40px,6vw,80px)] text-white leading-none mb-10 md:mb-12"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
          >
            Meet Your Coach
          </motion.h3>

          <div className="relative bg-[#080808] border border-white/[0.1] p-5 min-[360px]:p-8 md:p-12 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            {/* Layered technical texture */}
            <div
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 18% 12%, rgba(255,255,255,0.065) 0, transparent 34%),
                  radial-gradient(circle, rgba(255,255,255,0.12) 0.7px, transparent 0.8px),
                  repeating-linear-gradient(-55deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 28px),
                  repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 4px)
                `,
                backgroundSize: "auto, 7px 7px, auto, auto",
                opacity: 0.48,
              }}
            />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="absolute right-0 top-0 h-28 w-28 border-r border-t border-white/[0.08]" />

            <div className="relative z-10 grid grid-cols-[5rem_minmax(0,1fr)] items-start gap-x-4 gap-y-6 text-left sm:flex sm:flex-col sm:gap-10 md:flex-row">
              {/* Avatar image */}
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-white/10 bg-[#08090D] shadow-2xl min-[360px]:h-24 min-[360px]:w-24 sm:h-32 sm:w-32 md:h-48 md:w-48">
                <Image
                  src="/unsplash/ad_pfp.png"
                  alt="Ashik Divakaran"
                  fill
                  sizes="(max-width: 768px) 128px, 192px"
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className="contents sm:flex sm:flex-1 sm:flex-col sm:items-center md:items-start">
                <div className="flex min-w-0 flex-col items-start sm:items-center md:items-start">
                  <h4
                    className="mb-2 text-3xl leading-none text-white sm:mb-3 sm:text-4xl md:text-5xl"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
                  >
                    Ashik Divakaran
                  </h4>
                  <p
                    className="mb-4 text-[10px] uppercase tracking-[0.16em] text-white/60 min-[360px]:text-[11px] sm:mb-6 sm:text-[12px] sm:tracking-[0.2em]"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Performance Coaching
                  </p>

                  <div className="flex flex-col gap-2.5 sm:mb-8 sm:gap-3">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0" />
                      <span className="text-xs text-white/70 tracking-wide sm:text-sm" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                        Strength and Conditioning
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0" />
                      <span className="text-xs text-white/70 tracking-wide sm:text-sm" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                        Mobility and Injury Prevention
                      </span>
                    </div>
                  </div>
                </div>

                <p
                  className="col-span-2 text-sm text-white/60 leading-relaxed font-light sm:col-auto"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Ashik Divakaran brings a comprehensive, science-backed approach to human performance. By integrating elite strength principles with deep biomechanical analysis, Ashik aims not only to maximize your physical output but to fortify your body against injuries. Whether you are an athlete preparing for your next critical competition, or simply looking to restructure your general fitness for the long term, Ashik’s methodology breaks down limitations and guarantees sustainable peak performance. Every protocol is tailored to adapt dynamically as you evolve, ensuring that your training matches the demands of your unique anatomy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
