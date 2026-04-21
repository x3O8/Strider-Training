import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        "off-black": "#0a0a0a",
        "dark-1": "#111111",
        "dark-2": "#1a1a1a",
        "dark-3": "#222222",
        "mid": "#333333",
        "light-muted": "#888888",
        "light-dim": "#aaaaaa",
        "off-white": "#eeeeee",
      },
      fontFamily: {
        bebas: ["'Bebas Neue'", "var(--font-bebas)", "sans-serif"],
        inter: ["var(--font-inter)", "'Inter'", "sans-serif"],
        barlow: ["'Barlow Condensed'", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "line-grow": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease forwards",
        "fade-in": "fade-in 0.5s ease forwards",
        "line-grow": "line-grow 0.8s ease forwards",
        "spin-slow": "spin-slow 20s linear infinite",
        flicker: "flicker 3s ease-in-out infinite",
      },
      letterSpacing: {
        widest2: "0.25em",
        widest3: "0.35em",
      },
    },
  },
  plugins: [],
};

export default config;
