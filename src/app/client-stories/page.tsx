"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { clientStories, ClientStory } from "@/data/testimonials";
import Navbar from "@/components/Navbar";

// ── Full SVG line chart ────────────────────────────────────────────────────────
function LineChart({ story }: { story: ClientStory }) {
  const { progressData: data, chartLabel, chartUnit, chartInvert, duration } = story;
  const W = 600, H = 160;
  const pad = { t: 16, r: 16, b: 32, l: 48 };
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const toY = (v: number) =>
    chartInvert
      ? pad.t + ((v - min) / range) * ih        // higher value = higher on chart (worse)
      : pad.t + (1 - (v - min) / range) * ih;  // higher value = lower on chart (better)

  const pts = data.map((v, i) => ({
    x: pad.l + (i / (data.length - 1)) * iw,
    y: toY(v),
    v,
  }));

  // Smooth cubic bezier path
  const linePath = pts.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x},${p.y}`;
    const pr = pts[i - 1];
    const cpx = (pr.x + p.x) / 2;
    return `${acc} C ${cpx},${pr.y} ${cpx},${p.y} ${p.x},${p.y}`;
  }, "");

  const areaPath = `${linePath} L ${pts[pts.length - 1].x},${H - pad.b} L ${pts[0].x},${H - pad.b} Z`;

  // Y-axis ticks (5 labels)
  const yTicks = Array.from({ length: 5 }, (_, i) => {
    const frac = i / 4;
    const val  = min + frac * range;
    const y    = chartInvert
      ? pad.t + frac * ih
      : pad.t + (1 - frac) * ih;
    return { val, y };
  });

  // X-axis labels
  const totalWeeks = data.length - 1;
  const xTicks = [0, Math.floor(totalWeeks / 3), Math.floor(2 * totalWeeks / 3), totalWeeks];

  const first = pts[0];
  const last  = pts[pts.length - 1];

  return (
    <div>
      <div className="flex flex-col items-start gap-2 mb-3 min-[360px]:flex-row min-[360px]:items-center min-[360px]:justify-between min-[360px]:gap-0">
        <p className="text-[9px] text-white/28 tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
          {chartLabel} {chartUnit && `(${chartUnit})`} over {duration}
        </p>
        <div className="flex w-full items-center justify-between gap-3 min-[360px]:w-auto min-[360px]:justify-start min-[360px]:gap-4">
          <span className="text-[9px] text-white/25" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            Start: <strong className="text-white/50">{data[0]}{chartUnit ? ` ${chartUnit}` : ""}</strong>
          </span>
          <span className="text-[9px] text-white/25" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            End: <strong className="text-white/70">{data[data.length - 1]}{chartUnit ? ` ${chartUnit}` : ""}</strong>
          </span>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 160 }}>
        {/* Y-axis grid lines + labels */}
        {yTicks.map(({ val, y }, i) => (
          <g key={i}>
            <line x1={pad.l} y1={y} x2={W - pad.r} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <text x={pad.l - 6} y={y + 4} textAnchor="end" fontSize="9" fill="rgba(255,255,255,0.2)" fontFamily="var(--font-inter), sans-serif">
              {Math.round(val)}
            </text>
          </g>
        ))}

        {/* X-axis */}
        <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        {xTicks.map((wi, i) => {
          const x = pad.l + (wi / totalWeeks) * iw;
          return (
            <text key={i} x={x} y={H - pad.b + 14} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.22)" fontFamily="var(--font-inter), sans-serif">
              Wk {wi}
            </text>
          );
        })}

        {/* Area fill */}
        <path d={areaPath} fill="rgba(255,255,255,0.04)" />

        {/* Line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />

        {/* Start dot */}
        <circle cx={first.x} cy={first.y} r="3" fill="rgba(255,255,255,0.25)" />
        {/* End dot (highlighted) */}
        <circle cx={last.x} cy={last.y} r="4.5" fill="rgb(249,115,22)" />

        {/* Midline dots */}
        {pts.filter((_, i) => i > 0 && i < pts.length - 1 && i % Math.ceil(pts.length / 8) === 0).map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2" fill="rgba(255,255,255,0.35)" />
        ))}
      </svg>
    </div>
  );
}

// ── Stat bar (before → after horizontal bar) ─────────────────────────────────
function StatBar({ label, before, after, unit, invert = false }: {
  label: string; before: string; after: string; unit: string; invert?: boolean;
}) {
  const bNum = parseFloat(before);
  const aNum = parseFloat(after);
  const pct  = invert
    ? Math.round(((bNum - aNum) / bNum) * 100)   // lower is better
    : Math.round(((aNum - bNum) / bNum) * 100);  // higher is better

  const improved = invert ? aNum < bNum : aNum > bNum;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-col items-start gap-1 min-[360px]:flex-row min-[360px]:items-center min-[360px]:justify-between min-[360px]:gap-0">
        <span className="text-[9px] text-white/28 tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-inter), sans-serif" }}>{label}</span>
        <span className="text-[9px] text-white/40" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
          {before}{unit} → <strong className="text-white/70">{after}{unit}</strong>
          {" "}
          <span className="text-white/35">({improved ? "+" : ""}{pct}%)</span>
        </span>
      </div>
      <div className="h-px w-full bg-white/[0.07] relative">
        <motion.div
          className="absolute top-0 left-0 h-full bg-white/60"
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.min(Math.abs(pct) * 1.5, 100)}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ── Full story card ───────────────────────────────────────────────────────────
function StoryCard({ story }: { story: ClientStory }) {
  return (
    <motion.div
      id={story.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      className="border border-white/[0.08] bg-[#080808] overflow-hidden"
    >
      {/* Top: client identity + program */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-5 py-6 min-[360px]:px-8 min-[360px]:py-7 border-b border-white/[0.07]">
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center border border-white/15 flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <span className="text-xl text-white/55" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.06em" }}>
              {story.initials}
            </span>
          </div>
          <div>
            <h2
              className="text-3xl text-white leading-none mb-1"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
            >
              {story.name}
            </h2>
            <p className="text-[10px] text-white/30 tracking-[0.18em]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              {story.age ? `${story.age} · ` : ""}{story.location}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <span className="text-[8px] text-white/35 tracking-[0.2em] uppercase border border-white/12 px-3 py-1.5" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            {story.program}
          </span>
          <span className="text-[8px] text-white/35 tracking-[0.2em] uppercase border border-white/12 px-3 py-1.5" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            {story.duration}
          </span>
          <span className="text-[8px] text-white/35 tracking-[0.2em] uppercase border border-white/12 px-3 py-1.5" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            {story.goal}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/[0.07]">

        {/* Left: Stats + Chart */}
        <div className="bg-[#080808] p-5 min-[360px]:p-8 space-y-8">
          {/* Before → After stats */}
          <div>
            <p className="text-[9px] text-white/25 tracking-[0.4em] uppercase mb-5" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Metrics · Before → After
            </p>
            <div className="space-y-4">
              {story.stats.map((s, i) => (
                <StatBar key={i} label={s.label} before={s.before} after={s.after} unit={s.unit} invert={story.chartInvert} />
              ))}
            </div>
          </div>

          {/* Progress chart */}
          <div>
            <p className="text-[9px] text-white/25 tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Weekly Progress
            </p>
            <div className="border border-white/[0.07] p-5 bg-black/40">
              <LineChart story={story} />
            </div>
          </div>
        </div>

        {/* Right: Quotes + Coach note */}
        <div className="bg-[#080808] p-5 min-[360px]:p-8 flex flex-col gap-8">
          {story.image && (
            <div className="relative aspect-[16/9] overflow-hidden border border-white/[0.07] bg-black">
              <Image
                src={story.image}
                alt={story.imageAlt ?? `${story.name} client result`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>
          )}

          {/* Full quote */}
          <div>
            <p className="text-[9px] text-white/25 tracking-[0.4em] uppercase mb-5" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              In Their Words
            </p>
            <blockquote
              className="text-sm text-white/50 leading-[1.95] italic border-l border-white/12 pl-5"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              "{story.fullQuote}"
            </blockquote>
          </div>

          {/* Coach note */}
          <div className="mt-auto border border-white/[0.07] bg-white/[0.015] p-6">
            <p className="text-[9px] text-white/25 tracking-[0.35em] uppercase mb-1" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Coach&apos;s Analysis
            </p>
            <p className="text-[10px] text-white/35 mb-4" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              {story.coachName}
            </p>
            <p className="text-xs text-white/38 leading-relaxed" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              {story.coachNote}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
const FILTERS = ["All", "Fat Loss", "Strength", "Endurance", "Rehabilitation", "Performance"] as const;
type FilterType = typeof FILTERS[number];

const CATEGORY_MAP: Record<string, FilterType> = {
  "weight-loss": "Fat Loss",
  "strength":    "Strength",
  "endurance":   "Endurance",
};

export default function ClientStoriesPage() {
  const [active, setActive] = useState<FilterType>("All");

  const filtered = clientStories.filter(
    (s) => active === "All" || CATEGORY_MAP[s.category] === active
  );

  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative border-b border-white/[0.07] pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(-55deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 32px),
              repeating-linear-gradient( 55deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 32px)
            `,
          }}
        />
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <p className="text-[10px] text-orange-400 tracking-[0.5em] uppercase mb-5" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            Proof. Not Promises.
          </p>
          <h1
            className="text-[37px] text-white leading-none mb-8 min-[320px]:text-[43px] min-[360px]:text-[54px] min-[430px]:text-[clamp(60px,12vw,160px)]"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
          >
            Client Stories.<br />Real Results.
          </h1>
          <p className="max-w-3xl text-sm font-light leading-[1.8] text-white/50 md:text-base" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            Every client starts with different goals, challenges, and constraints. These case studies show how individualized coaching, continuous adaptation, and evidence-based decision making produce meaningful long-term results.
          </p>
        </div>
      </section>

      {/* Filters + Stories */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {FILTERS.map((f) => (
            <motion.button
              key={f}
              onClick={() => setActive(f)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`min-h-11 px-5 py-2 text-[9px] tracking-[0.22em] uppercase border transition-all duration-200 sm:min-h-0 ${
                active === f
                  ? "bg-white text-black border-white"
                  : "border-white/14 text-white/35 hover:border-white/30 hover:text-white/60"
              }`}
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {f}
            </motion.button>
          ))}
        </div>

        {/* Stories */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="space-y-8"
          >
            {filtered.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <div className="text-center mt-20 pt-14 border-t border-white/[0.07]">
          <p className="text-[9px] text-white/25 tracking-[0.45em] uppercase mb-4" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            Ready to start your own story?
          </p>
          <h2 className="text-[clamp(40px,7vw,100px)] text-white leading-none mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}>
            Start Your Journey.
          </h2>
          <Link
            href="/#contact"
            className="inline-block px-14 py-4 bg-white text-black text-[10px] font-bold tracking-[0.28em] uppercase hover:bg-white/88 transition-colors duration-200"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Book Free Consultation
          </Link>
        </div>

      </section>
    </div>
  );
}
