"use client";

export default function MarqueeSection() {
  const topStripItems = ["PLAN", "//", "EXECUTE", "//", "ADAPT", "//", "PROGRESS", "//"];

  // Duplicate items enough times so that a single set exceeds the ultra-wide screen width
  const topContent = Array(8).fill(topStripItems).flat();

  return (
    <section className="relative flex flex-col z-20 overflow-hidden border-b border-white/[0.07]">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-right {
          /* Much slower animation: 90s */
          animation: marquee-right 90s linear infinite;
        }
      `}} />

      {/* Top Strip (Dark Grey) - Scrolls Right */}
      <div className="bg-[#1a1a1a] text-white py-3.5 md:py-5 w-full flex whitespace-nowrap overflow-hidden z-10 shadow-lg relative">
        {/* Slanting lines texture */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 10px)`
          }}
        />
        <div className="flex shrink-0 animate-marquee-right w-max">
          {/* We render exactly 2 identical halves so moving from -50% perfectly loops */}
          {[...Array(2)].map((_, groupIdx) => (
            <div key={groupIdx} className="flex items-center shrink-0">
              {topContent.map((item, i) => (
                <div key={i} className="flex items-center mx-5 md:mx-10 group cursor-default">
                  <span className="text-2xl md:text-4xl tracking-[0.06em] leading-none mt-1 hover:opacity-80 transition-opacity" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
