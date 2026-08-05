"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function MeetTheCoachSection() {
  return (
    <section id="founder" className="bg-black py-14 md:py-20 relative border-t border-white/[0.07] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(40px,6vw,80px)] text-white leading-none mb-10 md:mb-12"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
          >
            WHY I BUILT STRIDER
          </motion.h3>

          <div className="relative bg-[#080808] border border-white/[0.1] p-5 min-[360px]:p-6 sm:p-8 md:p-12 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
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

            <div className="relative z-10 grid grid-cols-[5rem_minmax(0,1fr)] items-start gap-x-4 gap-y-6 text-left min-[360px]:grid-cols-[6rem_minmax(0,1fr)] sm:flex sm:flex-col sm:gap-10 md:flex-row">
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
                    ASHIK DIVAKARAN
                  </h4>
                  <p
                    className="mb-4 text-[10px] uppercase tracking-[0.16em] text-white/60 min-[360px]:text-[11px] sm:mb-6 sm:text-[12px] sm:tracking-[0.2em]"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Founder • Lead Performance Coach
                  </p>

                </div>

                <div
                  className="col-span-2 text-sm leading-relaxed text-white/60 font-light sm:col-auto"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  <p>I&apos;ve always been fascinated by the human body—not simply by how it looks, but by how it moves, adapts, recovers, and performs. Years of studying strength training, biomechanics, nutrition, physiology, rehabilitation, and human performance led me to one conclusion: no two people should follow the same programme. Every individual is shaped by a unique combination of anatomy, movement quality, health markers, recovery capacity, lifestyle, training history, and personal goals, yet much of the fitness industry still relies on generic templates and one-size-fits-all solutions. Strider was built to challenge that approach. Together with our team, we build individualized human performance systems by integrating training, nutrition, cardio, recovery, lifestyle, and continuous adaptation into one evolving blueprint designed specifically around each individual. Our mission is simple: to help people move better, recover smarter, perform at their highest level, and build stronger, healthier, more resilient bodies for life.</p>
                  <Link
                    href="/team"
                    className="group mt-8 inline-flex min-h-12 items-center bg-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-black transition-colors duration-300 hover:bg-orange-400"
                  >
                    MEET THE TEAM &#9656;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
