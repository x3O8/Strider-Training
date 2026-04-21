"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import ProductShowcase from "@/components/ProductShowcase";
import FeatureSection from "@/components/FeatureSection";
import FinalCTA from "@/components/FinalCTA";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import HowWeWorkSticky from "@/components/HowWeWorkSticky";
import MeetTheCoachSection from "@/components/MeetTheCoachSection";
import ClientForm from "@/components/ClientForm";
import Footer from "@/components/Footer";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import MarqueeSection from "@/components/MarqueeSection";

const HeroCanvasAnimation = dynamic(
  () => import("@/components/HeroCanvasAnimation"),
  { ssr: false }
);

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      {!loading && <ScrollProgressBar />}
      <SmoothScroll>
        <main
          className="bg-black min-h-screen"
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
          <ProductShowcase />

          {/* 6. Client testimonials */}
          <TestimonialsSection />

          {/* 7. Blog / Knowledge hub */}
          <BlogSection />

          {/* 8. CTA banner */}
          <FinalCTA />

          {/* 9. Client intake form */}
          <ClientForm />

          {/* 10. Footer */}
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
