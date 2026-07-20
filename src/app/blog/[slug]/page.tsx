import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

// SEO metadata generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return { title: "Blog Post Not Found" };

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
  };
}

// Set up dynamic routes at build time
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <SmoothScroll>
      <div className="bg-[#050505] min-h-screen text-white relative">
        <Navbar />

        <article className="pt-32 pb-24 border-t border-white/[0.07] mt-10">
          <div className="max-w-3xl mx-auto px-6 relative z-10">
            
            {/* Breadcrumbs / Back */}
            <Link 
              href="/blog" 
              className="inline-flex min-h-11 sm:min-h-0 items-center gap-2 text-[10px] text-white/40 tracking-[0.25em] uppercase hover:text-white/80 transition-colors duration-300 mb-12"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              ← Back to Archive
            </Link>

            {/* Header section */}
            <header className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="px-2.5 py-1 text-[8px] text-white/80 tracking-[0.22em] uppercase border border-white/20"
                  style={{ fontFamily: "var(--font-inter), sans-serif", background: "rgba(255,255,255,0.05)" }}
                >
                  {post.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span
                  className="text-[9px] text-white/40 tracking-[0.2em]"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {post.readTime} read
                </span>
              </div>

              <h1
                className="text-[clamp(44px,6vw,82px)] text-white leading-[1.05] mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
              >
                {post.title}
              </h1>

              <div 
                className="text-xs text-white/40 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-white/10 pt-6 sm:flex-nowrap"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                <span>{post.date}</span>
                <span className="hidden h-3 w-px bg-white/20 min-[360px]:block" />
                <span className="text-white">By Ashik Divakaran</span>
                <span className="hidden h-3 w-px bg-white/20 min-[360px]:block" />
                <span>Strider Coaching</span>
              </div>
            </header>

            {/* Hero Image (COLORED) */}
            <div className="relative w-full h-[300px] min-[360px]:h-[400px] md:h-[500px] mb-16 overflow-hidden border border-white/10 rounded-sm">
              <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                className="object-cover opacity-90 scale-105 transition-transform duration-[2s] hover:scale-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,5,1)] via-[rgba(5,5,5,0.2)] to-transparent" />
            </div>

            {/* Markdown / Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div 
                className="text-white/60 leading-relaxed font-light text-[15px] sm:text-base 
                           [&>h3]:text-white [&>h3]:text-3xl [&>h3]:mb-5 [&>h3]:mt-14 [&>h3]:font-['Bebas_Neue'] [&>h3]:tracking-wide
                           [&>p]:mb-6
                           [&>ul]:my-6 [&>ul]:space-y-3 [&>ul]:list-disc [&>ul]:pl-5
                           [&>ol]:my-6 [&>ol]:space-y-3 [&>ol]:list-decimal [&>ol]:pl-5
                           [&>ol>li>strong]:text-white [&>ul>li>strong]:text-white [&>p>strong]:text-white
                           [&>blockquote]:border-l-4 [&>blockquote]:border-white/20 [&>blockquote]:pl-6 [&>blockquote]:border-l-white/60 [&>blockquote]:py-1 [&>blockquote]:my-8 [&>blockquote]:bg-white/[0.015] [&>blockquote]:italic [&>blockquote]:text-white/70"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
            </div>

          </div>
        </article>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
