"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import { Sparkles } from "lucide-react";

const MOCK_PRODUCTS = [
  { id: "1", name: "Pure Glow Face Cleanser", price: 34.00, image: "/images/cleaner.png", category: "Cleanse", rating: 4.8, reviewsCount: 124, isNew: true },
  { id: "2", name: "Ultra-Rich Daily Moisturizer", price: 48.00, image: "/images/moisturizer.png", category: "Moisturize", rating: 4.9, reviewsCount: 89, isNew: false },
  { id: "3", name: "Rosehip Infused Facial Oil", price: 52.00, image: "/images/hero.png", category: "Treat", rating: 4.7, reviewsCount: 56, isNew: true },
  { id: "4", name: "Botanical Vitamin C Serum", price: 65.00, image: "/images/cleaner.png", category: "Treat", rating: 5.0, reviewsCount: 201, isNew: false },
  { id: "5", name: "Soothing Lavender Mask", price: 28.00, image: "/images/moisturizer.png", category: "Masks", rating: 4.6, reviewsCount: 45, isNew: true },
  { id: "6", name: "Daily Defense SPF 50", price: 42.00, image: "/images/hero.png", category: "Sun Care", rating: 4.9, reviewsCount: 178, isNew: false },
  { id: "7", name: "Deep Hydration Serum", price: 58.00, image: "/images/cleaner.png", category: "Treat", rating: 4.8, reviewsCount: 92, isNew: false },
  { id: "8", name: "Calming Face Wash", price: 32.00, image: "/images/moisturizer.png", category: "Cleanse", rating: 4.7, reviewsCount: 64, isNew: false },
];

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(
      (p) => p.category.toLowerCase() === slug.toLowerCase()
    );
  }, [slug]);

  return (
    <div className="bg-brand-50 min-h-screen pb-24">
      {/* Category Header */}
      <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-brand-900/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/40 to-brand-50 z-10" />
        
        <div className="relative z-20 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center space-x-3 mb-6"
          >
            <div className="h-px w-12 bg-white/40" />
            <Sparkles className="text-white/80" size={20} />
            <span className="text-white/60 text-xs font-bold uppercase tracking-[0.4em] font-sans">Ritual Collection</span>
            <div className="h-px w-12 bg-white/40" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-display font-bold text-white tracking-tighter"
          >
            {categoryName}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-xl mt-6 max-w-xl mx-auto italic font-display"
          >
            Science-backed formulas curated for your {slug} ritual.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 -mt-12 relative z-30">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-32 text-center">
            <h3 className="text-2xl font-display font-bold text-brand-900 opacity-30 italic">Collection in development...</h3>
            <p className="text-brand-500 mt-4">Check back soon for new science-backed rituals.</p>
          </div>
        )}
      </div>
    </div>
  );
}
