"use client";

import React from "react";
import Link from "next/link";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  return (
    <div className="bg-brand-50 min-h-screen">
      {/* Checkout Navbar */}
      <div className="border-b border-brand-200 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Sparkles size={24} className="text-brand-600" />
            <span className="text-2xl font-display font-bold tracking-tighter text-brand-900">
              SKINN.
            </span>
          </Link>
          <Link href="/ritual-cart" className="flex items-center space-x-2 text-sm font-bold text-brand-500 hover:text-brand-900 transition-colors group">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span>Return to Cart</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-12 lg:py-24">
        <CheckoutForm />
      </div>

      {/* Simplified Footer */}
      <div className="container mx-auto px-6 md:px-12 py-12 border-t border-brand-200 text-center">
         <p className="text-xs text-brand-400 font-medium tracking-widest uppercase mb-4">Secure Checkout Powered by Razorpay</p>
         <div className="flex items-center justify-center space-x-8 opacity-40 grayscale">
            {/* Payment Logos Placeholders */}
            <div className="font-bold text-lg">VISA</div>
            <div className="font-bold text-lg">MASTERCARD</div>
            <div className="font-bold text-lg">UPI</div>
            <div className="font-bold text-lg">APPLE PAY</div>
         </div>
      </div>
    </div>
  );
}
