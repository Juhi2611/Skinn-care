"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";

const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Pure Glow Face Cleanser",
    price: 34.00,
    image: "/images/cleaner.png",
    category: "Cleanse",
    rating: 4.8,
    reviewsCount: 124,
    isNew: true
  },
  {
    id: "2",
    name: "Ultra-Rich Daily Moisturizer",
    price: 48.00,
    image: "/images/moisturizer.png",
    category: "Moisturize",
    rating: 4.9,
    reviewsCount: 89,
    isNew: false
  },
  {
    id: "3",
    name: "Rosehip Infused Facial Oil",
    price: 52.00,
    image: "/images/hero.png",
    category: "Treat",
    rating: 4.7,
    reviewsCount: 56,
    isNew: true
  },
  {
    id: "4",
    name: "Botanical Vitamin C Serum",
    price: 65.00,
    image: "/images/cleaner.png",
    category: "Treat",
    rating: 5.0,
    reviewsCount: 201,
    isNew: false
  }
];

export const FeaturedProducts = () => {
  return (
    <section className="py-24 bg-brand-50">
      <div className="container mx-auto px-6 md:px-12 text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-brand-500 font-bold tracking-widest uppercase text-sm"
        >
          Best Sellers
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display font-bold text-brand-900 mt-4"
        >
          Elevate Your Routine
        </motion.h2>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {MOCK_PRODUCTS.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <ProductCard {...product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
