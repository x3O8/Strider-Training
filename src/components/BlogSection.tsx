"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blog";
import MobileSwipeHint from "./MobileSwipeHint";

function BlogCard({ post, large = false, index = 0 }: { post: typeof blogPosts[0]; large?: boolean; index?: number }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-[420px] snap-start sm:h-full">
      <motion.article
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: index * 0.09 }}
        className={`border border-white/[0.07] bg-[#0a0a0a] group-hover:bg-white/[0.04] transition-colors duration-300 flex flex-col overflow-hidden h-full`}
      >
        {/* Top graphic area / Image */}
        <div className={`relative h-44 ${large ? "sm:h-52" : "sm:h-40"} bg-[#0c0c0c] overflow-hidden`}>
          <Image 
            src={post.image} 
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
          
          {/* Category chip */}
          <div className="absolute bottom-4 left-5 z-10">
            <span
              className="px-2.5 py-1 text-[8px] text-white/40 tracking-[0.22em] uppercase border border-white/12"
              style={{ fontFamily: "var(--font-inter), sans-serif", background: "rgba(0,0,0,0.6)" }}
            >
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className={`flex flex-col flex-1 px-6 py-5 ${large ? "sm:py-7" : ""} gap-3`}>
          <h3
            className={`text-lg text-white leading-snug group-hover:text-white/85 transition-colors duration-200 ${large ? "sm:text-2xl" : ""}`}
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
          >
            {post.title}
          </h3>
          <div className={`max-h-14 overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)] sm:max-h-none sm:[mask-image:none] ${large ? "" : "sm:hidden"}`}>
            <p
              className="text-xs text-white/35 leading-relaxed"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {post.excerpt}
            </p>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 mt-auto pt-3 border-t border-white/[0.06]">
            <span
              className="text-[8px] text-white/22 tracking-[0.22em]"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {post.date}
            </span>
            <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
            <span
              className="text-[8px] text-white/22 tracking-[0.22em]"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {post.readTime} read
            </span>
            <span className="ml-auto text-[9px] text-white/28 group-hover:text-white/90 transition-colors duration-200" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Read →
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

export default function BlogSection() {
  const featured = blogPosts.find((p) => p.featured)!;
  const rest     = blogPosts.filter((p) => !p.featured);

  return (
    <section id="blog" className="relative bg-black border-t border-white/[0.07] overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(-55deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 34px),
            repeating-linear-gradient( 55deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 34px)
          `,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12"
        >
          <div>
            <p
              className="text-[9px] text-white/28 tracking-[0.5em] uppercase mb-4"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              KNOWLEDGE HUB
            </p>
            <h2
              className="text-[clamp(34px,10vw,48px)] text-white leading-[0.95] sm:text-[clamp(48px,6.5vw,88px)]"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
            >
              LEARN THE SCIENCE OF HUMAN PERFORMANCE.
            </h2>
            <p
              className="mt-5 max-w-3xl text-sm font-light leading-[1.8] text-white/48"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Better decisions begin with better understanding. Explore evidence-based articles, practical guides, and actionable insights covering training, nutrition, recovery, movement, physiology, longevity, and human performance—so you understand not just what to do, but why it works.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex min-h-11 sm:min-h-0 items-center gap-2 text-[10px] text-white/35 tracking-[0.25em] uppercase border border-white/14 px-6 py-3 hover:border-white/40 hover:text-white/70 transition-all duration-300 self-start md:self-auto"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            EXPLORE KNOWLEDGE HUB →
          </Link>
        </motion.div>

        {/* Balanced desktop grid, horizontal card rail on phones */}
        <MobileSwipeHint />
        <div className="-mx-6 grid touch-auto snap-x snap-mandatory grid-flow-col auto-cols-[90%] gap-4 overflow-x-auto overflow-y-hidden bg-white/[0.06] px-6 min-[360px]:auto-cols-[86%] sm:contents sm:touch-pan-x">
          <div className="contents sm:mb-px sm:block sm:bg-white/[0.06]">
            <BlogCard post={featured} large index={0} />
          </div>

          <div className="contents sm:grid sm:grid-cols-2 sm:gap-px sm:bg-white/[0.06] lg:grid-cols-4">
            {rest.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i + 1} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
