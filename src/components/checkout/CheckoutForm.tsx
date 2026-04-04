"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, CreditCard, ShieldCheck, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/store/useCart";
import { cn } from "@/lib/utils";

export const CheckoutForm = () => {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "India",
  });

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleMockPayment = async () => {
    setIsProcessing(true);
    
    // Simulate Razorpay payment processing
    await new Promise((resolve) => setTimeout(resolve, 2500));
    
    setIsProcessing(false);
    clearCart();
    router.push("/checkout/success");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      {/* Form Side */}
      <div className="space-y-10">
        {/* Step Indicator */}
        <div className="flex items-center space-x-6 pb-12 border-b border-brand-200">
          {[
            { id: 1, label: "Shipping" },
            { id: 2, label: "Payment" },
            { id: 3, label: "Review" },
          ].map((s) => (
            <div key={s.id} className="flex items-center space-x-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                  step === s.id ? "bg-brand-900 text-white" : step > s.id ? "bg-green-600 text-white" : "bg-brand-200 text-brand-500"
                )}
              >
                {step > s.id ? <CheckCircle2 size={16} /> : s.id}
              </div>
              <span className={cn("text-sm font-bold uppercase tracking-widest", step === s.id ? "text-brand-900" : "text-brand-400")}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form
              key="step-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleNextStep}
              className="space-y-6"
            >
              <h2 className="text-3xl font-display font-bold text-brand-900 italic">Where shall we send your ritual?</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-500">First Name</label>
                  <input required name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full px-6 py-4 rounded-3xl bg-white border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-500">Last Name</label>
                  <input required name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full px-6 py-4 rounded-3xl bg-white border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-500">Email Address</label>
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-6 py-4 rounded-3xl bg-white border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-500">Shipping Address</label>
                <input required name="address" value={formData.address} onChange={handleInputChange} className="w-full px-6 py-4 rounded-3xl bg-white border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-500">City</label>
                    <input required name="city" value={formData.city} onChange={handleInputChange} className="w-full px-6 py-4 rounded-3xl bg-white border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-500">ZIP / Postcode</label>
                    <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="w-full px-6 py-4 rounded-3xl bg-white border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                 </div>
              </div>
              <Button size="lg" className="w-full py-8 mt-10 rounded-full">
                Continue to Payment
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-10"
            >
              <h2 className="text-3xl font-display font-bold text-brand-900 italic">Payment Ritual</h2>
              <div className="p-8 rounded-[2.5rem] bg-brand-900 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <CreditCard size={120} />
                </div>
                <div className="relative z-10 space-y-6">
                   <div className="flex items-center space-x-2 bg-white/10 px-4 py-1 rounded-full w-fit">
                      <ShieldCheck size={14} className="text-green-400" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Razorpay Secure</span>
                   </div>
                   <p className="text-lg font-medium opacity-80 leading-relaxed">
                     We support all major Indian payment methods via Razorpay including UPI, Cards, and Netbanking.
                   </p>
                   <div className="flex items-center space-x-6">
                      <div className="p-2 bg-white/10 rounded-lg">UPI</div>
                      <div className="p-2 bg-white/10 rounded-lg">CARDS</div>
                      <div className="p-2 bg-white/10 rounded-lg">BANKING</div>
                   </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button size="lg" variant="ghost" className="px-8" onClick={handlePrevStep}>
                  Back
                </Button>
                <Button size="lg" className="flex-1 py-8 rounded-full" onClick={() => setStep(3)}>
                  Review Order
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
               key="step-3"
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 20 }}
               className="space-y-10"
            >
               <h2 className="text-3xl font-display font-bold text-brand-900 italic">One Last Look...</h2>
               <div className="p-8 rounded-[2.5rem] bg-brand-100 border border-brand-200 space-y-6">
                  <div className="grid grid-cols-2 gap-8">
                     <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-400 mb-2">Shipping to</h4>
                        <p className="text-sm text-brand-900 font-medium">{formData.firstName} {formData.lastName}</p>
                        <p className="text-sm text-brand-900 opacity-80 mt-1">{formData.address}, {formData.city}, {formData.zipCode}</p>
                     </div>
                     <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-400 mb-2">Ritual Member</h4>
                        <p className="text-sm text-brand-900 font-medium">{formData.email}</p>
                     </div>
                  </div>
                  <div className="h-px bg-brand-200/50" />
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-400 mb-2">Order Value</h4>
                    <p className="text-2xl font-display font-bold text-brand-900">${total.toFixed(2)}</p>
                  </div>
               </div>
               
               <div className="flex items-center space-x-4 pt-10">
                 <Button size="lg" variant="ghost" className="px-8" onClick={handlePrevStep}>
                   Back
                 </Button>
                 <Button 
                   size="lg" 
                   className="flex-1 py-8 rounded-full shadow-2xl bg-brand-900 hover:bg-black"
                   onClick={handleMockPayment}
                   disabled={isProcessing}
                 >
                   {isProcessing ? (
                     <Loader2 className="mr-2 animate-spin h-5 w-5" />
                   ) : (
                     "Complete Ritual & Pay"
                   )}
                 </Button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Summary Side */}
      <div className="hidden lg:block sticky top-32">
        <div className="p-10 rounded-[3rem] bg-white border border-brand-100 shadow-xl overflow-hidden">
           <h3 className="text-xl font-display font-bold text-brand-900 mb-8">Order Overview</h3>
           <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-6">
                   <div className="relative w-20 h-24 rounded-2xl overflow-hidden bg-brand-50 flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                   </div>
                   <div className="flex-1">
                      <h4 className="text-sm font-bold text-brand-900 line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-brand-400 mt-1">Quantity: {item.quantity}</p>
                   </div>
                   <p className="text-sm font-bold text-brand-900 font-display">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
           </div>
           
           <div className="space-y-4 pt-8 border-t border-brand-100">
             <div className="flex justify-between text-sm">
                <span className="text-brand-500">Subtotal</span>
                <span className="text-brand-900 font-bold">${subtotal.toFixed(2)}</span>
             </div>
             <div className="flex justify-between text-sm">
                <span className="text-brand-500">Shipping</span>
                <span className="text-brand-900 font-bold">${shipping.toFixed(2)}</span>
             </div>
             <div className="flex justify-between items-center text-xl font-display font-bold text-brand-900 pt-4">
                <span>Total Due</span>
                <span>${total.toFixed(2)}</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};
