"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { blogPosts, BlogPost } from "@/data/blog";

type SortType = "latest" | "alphabetical" | "length";
export default function BlogArchivePage() {
  const [sortBy, setSortBy] = useState<SortType>("latest");

  const sortedPosts = useMemo(() => {
    const posts = [...blogPosts];

    if (sortBy === "alphabetical") {
      return posts.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortBy === "length") {
      return posts.sort((a, b) => {
        const aVal = parseInt(a.readTime) || 0;
        const bVal = parseInt(b.readTime) || 0;
        return bVal - aVal; // Longest first
      });
    }
    // "latest" -> Keep original order (assuming latest is first in array)
    return posts;
  }, [sortBy]);

  return (
    <SmoothScroll>
      <div className="bg-[#050505] min-h-screen text-white relative">
        <Navbar />

        <main className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-32 sm:pt-44 pb-20 sm:pb-32">
          
          {/* Page Header */}
          <div className="mb-16 grid gap-10 sm:mb-24 lg:grid-cols-[1.25fr_300px] lg:items-end lg:gap-16">
            <div>
              <p className="text-[10px] text-orange-400 tracking-[0.5em] uppercase mb-4" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                Knowledge Hub
              </p>
              <h1 className="text-[clamp(56px,8vw,128px)] leading-[0.85] text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}>
                LEARN THE SCIENCE OF HUMAN PERFORMANCE.
              </h1>
              <p className="mt-7 max-w-3xl text-sm font-light leading-[1.85] text-white/50 md:text-base" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                Better decisions begin with better understanding. Explore evidence-based articles, practical guides, and actionable insights covering training, nutrition, recovery, movement, physiology, longevity, and human performance&mdash;so you understand not just what to do, but why it works.
              </p>
            </div>

            <aside className="p-0 lg:pb-2">
              <div className="mt-8">
                <p className="mb-3 text-[9px] uppercase tracking-[0.42em] text-white/35" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                  Sort by
                </p>
                <div className="grid grid-cols-3 gap-1 p-1 bg-white/[0.03] border border-white/10 rounded-full">
                  {(["latest", "alphabetical", "length"] as SortType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSortBy(type)}
                      className={`min-h-10 px-2 py-1.5 text-[8px] tracking-[0.12em] uppercase transition-all rounded-full min-[360px]:px-4 min-[360px]:text-[9px] min-[360px]:tracking-[0.2em] ${
                        sortBy === type
                          ? "bg-white text-black font-bold"
                          : "text-white/40 hover:text-white/70"
                      }`}
                    >
                      {type === "length" ? "Read Time" : type === "alphabetical" ? "A-Z" : "Latest"}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* Dynamic Grid using AnimatePresence for smooth transitions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            <AnimatePresence mode="popLayout">
              {sortedPosts.map((post, idx) => (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <div className="relative aspect-[4/5] overflow-hidden mb-8 border border-white/10 bg-white/[0.02]">
                      <Image 
                        src={post.image} 
                        alt={post.title} 
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
                      
                      {/* Author Tag on image for high visibility */}
                      <div className="absolute bottom-6 left-6 z-10 transition-transform group-hover:-translate-y-1">
                        <p className="text-[9px] text-white/50 tracking-[0.3em] uppercase mb-1">Author</p>
                        <p className="text-sm font-medium tracking-wide">Ashik Divakaran</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-5">
                      <span className="text-[9px] text-white/30 tracking-[0.3em] uppercase">
                        {post.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/10" />
                      <span className="text-[9px] text-white/30 tracking-[0.3em] uppercase">
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-3xl text-white leading-tight mb-5 group-hover:text-white/80 transition-colors" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}>
                      {post.title}
                    </h3>

                    <p className="text-white/40 text-sm leading-relaxed mb-8 line-clamp-2 font-light">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-3">
                      <span className="text-[9px] tracking-[0.4em] uppercase font-bold text-white/40 group-hover:text-white transition-colors">Read Article</span>
                      <div className="w-6 h-px bg-white/10 group-hover:w-10 group-hover:bg-white transition-all duration-500" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {sortedPosts.length === 0 && (
            <p className="mt-12 text-sm text-white/40" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              No articles match the current filters.
            </p>
          )}

        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
