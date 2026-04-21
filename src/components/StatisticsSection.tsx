"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "3,500+", label: "Clients Coached" },
  { value: "96%",    label: "Goal Achieved"   },
  { value: "12+",    label: "Expert Coaches"  },
  { value: "4.9★",   label: "Avg. Rating"     },
];

export default function StatisticsSection() {
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

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 border border-white/[0.09]"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="px-8 py-10 border-r border-b border-white/[0.09] last:border-r-0 md:[&:nth-child(n+3)]:border-b-0 text-center"
            >
              <p
                className="text-[clamp(34px,5vw,58px)] text-white leading-none mb-2"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
              >
                {s.value}
              </p>
              <p
                className="text-[9px] text-white/28 tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
