"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import AIAssistant from "@/components/AIAssistant";
import AIChat from "@/components/AIChat";


export const Hero = () => {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden bg-brand-50">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-200 text-brand-700 text-xs font-bold tracking-widest uppercase mb-6"
          >
            New Collection 2024
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] text-brand-900 mb-8">
            Your Skin, <br />
            <span className="text-brand-500">Only Radiating.</span>
          </h1>
          <p className="text-lg md:text-xl text-brand-600 mb-10 leading-relaxed max-w-lg">
            Experience the fusion of dermatological science and botanical luxury. 
            Clean formulas for your most confident self.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="group">
              Shop the Collection
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              Take the Skin Quiz
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative h-[500px] lg:h-[700px] w-full"
        >
          <div className="absolute inset-0 bg-brand-200/30 rounded-full blur-3xl -z-10" />
          <Image
            src="/images/hero.png"
            alt="Premium Skincare"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>
      </div>
      <AIAssistant />
{/* <AIChat /> */}
      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-brand-100 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-sage-100 rounded-full blur-3xl opacity-30 -z-10" />
    </section>
  );
};
