"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProgramCard from "./ProductCard";
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
            className="text-[9px] text-white/30 tracking-[0.5em] uppercase"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Choose Your Path
          </p>
          <h2
            className="text-[clamp(52px,8vw,110px)] text-white leading-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
          >
            Coaching<br />Programs
          </h2>
          <div className="w-10 h-px bg-white/25 mt-2" />
        </motion.div>
      </div>


      {/* Program Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-px bg-white/[0.06]">
          {coachingPrograms.map((program, index) => (
            <div key={program.id} className="bg-black">
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
            className="inline-block px-12 py-3.5 border border-white/18 text-[10px] text-white/45 tracking-[0.3em] uppercase hover:border-white/45 hover:text-white/75 transition-all duration-300"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Discuss Custom Plans →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
