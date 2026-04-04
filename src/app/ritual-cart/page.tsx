"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/store/useCart";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart();
  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 md:px-12 py-24 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="max-w-md mx-auto"
        >
          <div className="w-24 h-24 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-8 text-brand-400">
            <ShoppingBag size={48} />
          </div>
          <h1 className="text-4xl font-display font-bold text-brand-900 mb-4">Your Ritual is Empty</h1>
          <p className="text-brand-500 mb-10 text-lg">It looks like you haven't added any products to your cart yet. Start your journey with our best sellers.</p>
          <Link href="/products">
            <Button size="lg" className="rounded-full">Continue Shopping</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-brand-50 min-h-screen pb-24">
      <div className="container mx-auto px-6 md:px-12 py-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-900 mb-12 tracking-tighter">
          Your Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col sm:flex-row items-center sm:items-start p-6 rounded-3xl bg-white border border-brand-100 shadow-sm gap-6"
                >
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-brand-50 flex-shrink-0">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 128px"
                      className="object-cover" 
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between h-32 py-1">
                    <div className="flex justify-between items-start w-full">
                      <div>
                        <h3 className="text-lg font-display font-bold text-brand-900">{item.name}</h3>
                        <p className="text-sm text-brand-500 uppercase tracking-widest font-semibold mt-1">One Size</p>
                      </div>
                      <p className="text-lg font-bold text-brand-900 font-display">${item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center bg-brand-50 rounded-full px-4 py-1.5 border border-brand-100">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-brand-400 hover:text-brand-900 transition-colors p-1">
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-brand-900">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-brand-400 hover:text-brand-900 transition-colors p-1">
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-brand-300 hover:text-red-500 transition-colors flex items-center space-x-2 text-sm font-medium"
                      >
                        <Trash2 size={16} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="space-y-6">
            <div className="p-8 rounded-[2.5rem] bg-white border border-brand-100 shadow-lg">
              <h2 className="text-2xl font-display font-bold text-brand-900 mb-8">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-brand-600">
                  <span>Subtotal</span>
                  <span className="text-brand-900 font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-brand-600">
                  <span>Shipping</span>
                  <span className={cn("font-medium", shipping === 0 ? "text-green-600" : "text-brand-900")}>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-brand-600">
                  <span>Estimated Tax</span>
                  <span className="text-brand-900 font-medium">$0.00</span>
                </div>
                <div className="h-px bg-brand-100 my-6" />
                <div className="flex justify-between text-xl font-display font-bold text-brand-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Link href="/checkout">
                <Button size="lg" className="w-full rounded-full">
                  Checkout
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              
              <p className="mt-6 text-center text-xs text-brand-400 leading-relaxed">
                By proceeding to checkout, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
            
            <div className="p-8 rounded-[2.5rem] bg-brand-200/30 border border-brand-200/50">
               <h3 className="text-sm font-display font-bold uppercase tracking-widest text-brand-700 mb-4">Loyalty Rewards</h3>
               <p className="text-sm text-brand-600 mb-6">You'll earn <span className="font-bold text-brand-900">{Math.floor(subtotal)} points</span> with this purchase!</p>
               <Link href="/account" className="text-sm font-bold text-brand-900 underline">View rewards dashboard</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
