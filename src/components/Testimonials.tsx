"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const TESTIMONIALS = [
  {
    text: "This cleanser has completely transformed my skin. I've always struggled with redness, and after just two weeks, it's virtually gone.",
    author: "Sarah J.",
    role: "Verified Buyer",
    rating: 5,
  },
  {
    text: "The most luxurious texture I've ever experienced in a moisturizer. It feels like silk and keeps me hydrated all day long.",
    author: "Michael R.",
    role: "Verified Buyer",
    rating: 5,
  },
  {
    text: "Finally, a brand that actually delivers on its promises. Clean ingredients that actually work. My skin has never looked better.",
    author: "Elena G.",
    role: "Verified Buyer",
    rating: 5,
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-brand-500 font-bold tracking-widest uppercase text-sm"
        >
          Community
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display font-bold text-brand-900 mt-4"
        >
          Loved by Thousands
        </motion.h2>
      </div>

      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-8">
        {TESTIMONIALS.map((testimonial, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex-1 p-10 rounded-3xl bg-brand-50 border border-brand-100 flex flex-col items-center text-center space-y-6 relative"
          >
            <Quote className="absolute top-6 left-6 text-brand-200" size={40} />
            
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-brand-500 text-brand-500" />
              ))}
            </div>

            <p className="text-xl text-brand-700 font-medium leading-relaxed italic">
              "{testimonial.text}"
            </p>

            <div className="mt-4">
              <p className="text-lg font-display font-bold text-brand-900">{testimonial.author}</p>
              <p className="text-sm text-brand-500">{testimonial.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
