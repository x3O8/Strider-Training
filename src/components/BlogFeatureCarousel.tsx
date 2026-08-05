"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog";

export default function BlogFeatureCarousel() {
  const [active, setActive] = useState(0);
  const posts = blogPosts;

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % posts.length), 5500);
    return () => window.clearInterval(timer);
  }, [posts.length]);

  const move = (direction: 1 | -1) => setActive((current) => (current + direction + posts.length) % posts.length);
  const post = posts[active];

  return (
    <aside className="hidden border border-white/[0.1] bg-white/[0.025] p-4 sm:p-5 md:block">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-[9px] uppercase tracking-[0.38em] text-white/45" style={{ fontFamily: "var(--font-inter), sans-serif" }}>Check out our blogs</p>
        <div className="flex items-center gap-1.5">
          {posts.map((item, index) => <button key={item.slug} aria-label={`Show blog ${index + 1}`} onClick={() => setActive(index)} className={`h-1.5 w-1.5 rounded-full transition-colors ${index === active ? "bg-white" : "bg-white/20"}`} />)}
        </div>
      </div>
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => { if (info.offset.x < -35) move(1); else if (info.offset.x > 35) move(-1); }}
          >
            <Link href={`/blog/${post.slug}`} className="group block">
              <div className="relative h-32 overflow-hidden border border-white/[0.08] bg-black sm:h-36">
                <Image src={post.image} alt="" fill sizes="(max-width: 1024px) 50vw, 380px" className="object-cover opacity-65 transition duration-500 group-hover:scale-105 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
                <span className="absolute bottom-3 left-3 right-3 text-base leading-tight text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}>{post.title}</span>
              </div>
              <p className="mt-3 text-[8px] uppercase tracking-[0.2em] text-white/30" style={{ fontFamily: "var(--font-inter), sans-serif" }}>{post.category} · {post.readTime}</p>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <button aria-label="Previous blog" onClick={() => move(-1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-sm text-white/45 transition-colors hover:border-white/40 hover:text-white">◀</button>
        <button aria-label="Next blog" onClick={() => move(1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-sm text-white/45 transition-colors hover:border-white/40 hover:text-white">▶</button>
      </div>
    </aside>
  );
}
