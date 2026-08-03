"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProgramCard from "./ProductCard";
import MobileSwipeHint from "./MobileSwipeHint";
import { coachingPrograms } from "@/data/products";

export default function ProductShowcase({ onApply }: { onApply: (goal: string) => void }) {
  const [cardsExpanded, setCardsExpanded] = useState(false);

  return (
    <section id="programs" className="relative bg-black">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-20 pb-10 md:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <p
            className="text-[9px] text-white tracking-[0.5em] uppercase"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            INDIVIDUALIZED HUMAN PERFORMANCE COACHING
          </p>
          <h2
            className="whitespace-nowrap text-[clamp(34px,9vw,52px)] font-bold text-white leading-none sm:text-[clamp(52px,8vw,110px)]"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
          >
            CHOOSE YOUR COACHING PATH.
          </h2>
          <p
            className="max-w-2xl self-start text-left text-xs leading-[1.8] text-white md:text-[13px]"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Whether your goal is improving your health, building strength, reducing body fat, moving pain-free, or maximizing athletic performance, every Strider membership begins with a comprehensive assessment and an individualized human performance system. Through continuous coaching, regular reviews, and adaptive programming, your training, nutrition, cardio, recovery, and lifestyle strategies evolve with you—because lasting results come from an evolving system, not a one-time program.
          </p>
          <div className="w-10 h-px bg-white/25 mt-2" />
        </motion.div>
      </div>

      {/* Program Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-20">
        <MobileSwipeHint />
        <div className="-mx-6 grid touch-auto snap-x snap-mandatory grid-flow-col auto-cols-[90%] gap-4 overflow-x-auto overflow-y-hidden bg-white/[0.06] px-6 min-[360px]:auto-cols-[86%] sm:mx-0 sm:grid-flow-row sm:auto-cols-auto sm:grid-cols-1 sm:overflow-visible sm:px-0 sm:snap-none sm:touch-pan-x md:grid-cols-2 md:gap-px">
          {coachingPrograms.map((program, index) => (
            <div key={program.id} className="snap-start bg-black">
              <ProgramCard 
                program={program} 
                index={index} 
                expanded={cardsExpanded} 
                onToggle={() => setCardsExpanded(!cardsExpanded)} 
                onApply={onApply}
              />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10 md:mt-12"
        >
          <a
            href="/#contact"
            className="inline-block px-12 py-3.5 border border-white/30 text-[10px] text-white tracking-[0.3em] uppercase hover:border-white/60 transition-all duration-300"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Discuss Custom Plans →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
