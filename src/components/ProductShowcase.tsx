"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProgramCard from "./ProductCard";
import { coachingPrograms } from "@/data/products";

export default function ProductShowcase() {
  const [cardsExpanded, setCardsExpanded] = useState(false);

  return (
    <section id="programs" className="relative bg-black">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-16">
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
      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.06]">
          {coachingPrograms.map((program, index) => (
            <div key={program.id} className="bg-black">
              <ProgramCard 
                program={program} 
                index={index} 
                expanded={cardsExpanded} 
                onToggle={() => setCardsExpanded(!cardsExpanded)} 
              />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
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
