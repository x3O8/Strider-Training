"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function MeetTheCoachSection() {
  return (
    <section className="bg-black py-16 md:py-28 relative border-t border-white/[0.07] overflow-hidden">
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
            className="text-[clamp(40px,6vw,80px)] text-white leading-none mb-16"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
          >
            Meet Your Coach
          </motion.h3>

          <div className="relative bg-white/[0.03] border border-white/[0.07] p-8 md:p-12 overflow-hidden">
            {/* Cross Texture for Coach Section */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen z-0"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(-55deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 34px),
                  repeating-linear-gradient( 55deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 34px)
                `,
              }}
            />

            <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start md:items-start text-left md:text-left">
              {/* Avatar image */}
              <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full flex-shrink-0 overflow-hidden border-2 border-white/10 bg-[#08090D] shadow-2xl">
                <Image
                  src="/unsplash/ad_pfp.png"
                  alt="Ashik Divakaran"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col items-center md:items-start">
                <h4
                  className="text-4xl md:text-5xl text-white leading-none mb-3"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
                >
                  Ashik Divakaran
                </h4>
                <p
                  className="text-[12px] text-white/60 tracking-[0.2em] uppercase mb-6"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Performance Coaching
                </p>

                <div className="flex flex-col gap-3 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0" />
                    <span className="text-sm text-white/70 tracking-wide" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                      Strength and Conditioning
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0" />
                    <span className="text-sm text-white/70 tracking-wide" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                      Mobility and Injury Prevention
                    </span>
                  </div>
                </div>

                <p
                  className="text-sm text-white/60 leading-relaxed font-light"
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
