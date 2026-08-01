"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import HeroCanvasAnimation from "@/components/HeroCanvasAnimation";
import MarqueeSection from "@/components/MarqueeSection";
import AboutSection from "@/components/AboutSection";
const HowWeWorkSticky = dynamic(() => import("@/components/HowWeWorkSticky"), {
  loading: () => <div className="h-[500svh] bg-black" />
});
const MeetTheCoachSection = dynamic(() => import("@/components/MeetTheCoachSection"), {
  loading: () => <div className="h-[600px] bg-black" />
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
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [heroReady, setHeroReady] = useState(false);
  const [protocolReady, setProtocolReady] = useState(false);
  const [preselectedGoal, setPreselectedGoal] = useState<string | null>(null);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const handleHeroReady = useCallback(() => {
    setHeroReady(true);
  }, []);

  useEffect(() => {
    if (!heroReady) return;
    let cancelled = false;

    // Once the LCP frame is painted, use the remaining loading-screen time to
    // download, Draco-decode, initialize WebGL, compile shaders, and upload the
    // Protocol model. The same scene and renderer stay mounted for the section.
    import("@/components/ProtocolModel3D")
      .then((modelModule) =>
        Promise.all([
          modelModule.preloadProtocolScene(),
          modelModule.waitForProtocolRenderReady(),
        ])
      )
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setProtocolReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, [heroReady]);

  useEffect(() => {
    if (!loading) return;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [loading]);

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
      {loading && (
        <LoadingScreen
          ready={heroReady && protocolReady}
          onComplete={handleLoadingComplete}
        />
      )}
      {!loading && <ScrollProgressBar />}
      <SmoothScroll>
        <main className="relative bg-black min-h-screen">
          <Navbar />

          {/* 1. Scroll-animated hero (run frames → muscle → skel) */}
          <HeroCanvasAnimation onReady={handleHeroReady} />

          {/* Scrolling Tickers */}
          <MarqueeSection />

          {/* 2. About Strider — story, method, coaches */}
          <AboutSection />
          <HowWeWorkSticky preloadModel={heroReady} />
          <MeetTheCoachSection />

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

