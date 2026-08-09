import type { Metadata } from "next";
import { Inter, Bebas_Neue, Barlow_Condensed } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Strider Training Systems | Human Performance Coaching",
  description:
    "Individualized, adaptive human performance systems integrating training, nutrition, recovery, movement, and lifestyle.",
  keywords: ["human performance", "fitness coaching", "strength and conditioning", "movement", "nutrition", "recovery"],
  openGraph: {
    title: "Strider Training Systems | Human Performance Coaching",
    description: "Individualized, adaptive human performance systems built around you.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable} ${barlowCondensed.variable}`}>
      <head>
        {/* Resource Hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload LCP Image */}
        <link 
          rel="preload" 
          as="image" 
          href="/runframes/outputs/2x-run-001.webp"
          type="image/webp"
          fetchPriority="high" 
        />
      </head>
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
