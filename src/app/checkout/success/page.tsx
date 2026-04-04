"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SuccessPage() {
  return (
    <div className="bg-brand-50 min-h-screen flex flex-col items-center justify-center py-24 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="max-w-2xl w-full p-12 rounded-[3.5rem] bg-white border border-brand-100 shadow-2xl space-y-10"
      >
        <div className="relative mx-auto w-24 h-24">
           <motion.div 
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ delay: 0.3 }}
             className="absolute inset-0 bg-green-100 rounded-full flex items-center justify-center text-green-600"
           >
              <CheckCircle2 size={48} />
           </motion.div>
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: [0, 1, 0], y: [-20, -50], x: [-10, 20] }}
             transition={{ repeat: Infinity, duration: 2 }}
             className="absolute top-0 right-0 text-brand-500"
           >
              <Sparkles size={16} />
           </motion.div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-900 italic">Your Ritual has Begun.</h1>
          <p className="text-brand-600 text-lg leading-relaxed max-w-md mx-auto">
            Order #SKN-2024-8192 confirmed. We've sent a confirmation email to your inbox with tracking details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-6 rounded-3xl bg-brand-50 border border-brand-100 text-left">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-400 mb-2">Estimated Arrival</h4>
              <p className="text-lg font-display font-medium text-brand-900 italic">April 12 - April 15</p>
           </div>
           <div className="p-6 rounded-3xl bg-brand-50 border border-brand-100 text-left">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-400 mb-2">Loyalty Points</h4>
              <p className="text-lg font-display font-medium text-brand-900 italic">+120 Points Earned</p>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
           <Link href="/products" className="flex-1">
              <Button size="lg" className="w-full rounded-full">
                 Keep Browsing
              </Button>
           </Link>
           <Link href="/account" className="flex-1">
              <Button size="lg" variant="secondary" className="w-full rounded-full">
                 View Ritual History
              </Button>
           </Link>
        </div>
      </motion.div>
      
      <p className="mt-12 text-sm text-brand-400 font-medium tracking-widest uppercase">
         Questions? Contact our Skin Concierge at hello@skinn.care
      </p>
    </div>
  );
}
