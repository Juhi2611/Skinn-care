import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TawkToChat from "@/components/TawkToChat";
import { NextAuthProvider } from "@/components/providers/SessionProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "SKINN. | Modern Clean Skincare & Rituals",
  description: "Experience the ultimate in clean, premium skincare. High-performance formulas designed for your skin's health and daily ritual.",
  keywords: ["skincare", "clean beauty", "luxury skincare", "dermatologist tested", "sustainable beauty"],
  openGraph: {
    title: "SKINN. | Modern Clean Skincare",
    description: "Premium, clean skincare designed for modern life.",
    type: "website",
    url: "https://skinn.luxury", // Placeholder
    images: [{ url: "/images/hero.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SKINN. | Modern Clean Skincare",
    description: "Premium, clean skincare designed for modern life.",
    images: ["/images/hero.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-background text-foreground`}
      >
        <NextAuthProvider>
          <Navbar />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
          <TawkToChat />
        </NextAuthProvider>
      </body>
    </html>
  );
}

