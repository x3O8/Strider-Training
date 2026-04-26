"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgressBar from "@/components/ScrollProgressBar";
const AboutSection = dynamic(() => import("@/components/AboutSection"), {
  loading: () => <div className="h-[800px] bg-black" />
});
const HowWeWorkSticky = dynamic(() => import("@/components/HowWeWorkSticky"), {
  loading: () => <div className="h-[400vh] bg-black" />
});
const MeetTheCoachSection = dynamic(() => import("@/components/MeetTheCoachSection"), {
  loading: () => <div className="h-[600px] bg-black" />
});
const FeatureSection = dynamic(() => import("@/components/FeatureSection"), {
  loading: () => <div className="h-[1000px] bg-black" />
});
const ProductShowcase = dynamic(() => import("@/components/ProductShowcase"), {
  loading: () => <div className="h-[800px] bg-black" />
});
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"), {
  loading: () => <div className="h-[700px] bg-black" />
});
const BlogSection = dynamic(() => import("@/components/BlogSection"), {
  loading: () => <div className="h-[800px] bg-black" />
});
const FinalCTA = dynamic(() => import("@/components/FinalCTA"), {
  loading: () => <div className="h-[400px] bg-black" />
});
const ClientForm = dynamic(() => import("@/components/ClientForm"), {
  loading: () => <div className="h-[800px] bg-black" />
});
const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="h-[400px] bg-black" />
});
const MarqueeSection = dynamic(() => import("@/components/MarqueeSection"), {
  loading: () => <div className="h-20 bg-black" />
});


const HeroCanvasAnimation = dynamic(
  () => import("@/components/HeroCanvasAnimation"),
  { 
    ssr: false,
    loading: () => <div className="h-[400vh] bg-black" />
  }
);


export default function Home() {
  const [loading, setLoading] = useState(true);
  const [preselectedGoal, setPreselectedGoal] = useState<string | null>(null);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const handleApply = useCallback((goal: string) => {
    setPreselectedGoal(goal);
    // Smooth scroll to contact section
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      {!loading && <ScrollProgressBar />}
      <SmoothScroll>
        <main
          className="relative bg-black min-h-screen"
          style={{
            overflow: loading ? "hidden" : undefined,
          }}
        >
          <Navbar />

          {/* 1. Scroll-animated hero (run frames → muscle → skel) */}
          <HeroCanvasAnimation />

          {/* Scrolling Tickers */}
          <MarqueeSection />

          {/* 2. About Strider — story, method, coaches */}
          <AboutSection />
          <HowWeWorkSticky />
          <MeetTheCoachSection />

          {/* 4. Results You Can Measure — features */}
          <FeatureSection />

          {/* 5. Coaching programs */}
          <ProductShowcase onApply={handleApply} />

          {/* 6. Client testimonials */}
          <TestimonialsSection />

          {/* 7. Blog / Knowledge hub */}
          <BlogSection />

          {/* 8. CTA banner */}
          <FinalCTA />

          {/* 9. Client intake form */}
          <ClientForm preselectedGoal={preselectedGoal} />

          {/* 10. Footer */}
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}

