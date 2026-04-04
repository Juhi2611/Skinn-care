"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Truck, RefreshCcw, Plus, Minus, ShoppingBag, Heart, Share2, X, MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/useCart";
import { useRouter } from "next/navigation";

// Mock data (Normally fetched from API)
const PRODUCT = {
  id: "1",
  name: "Pure Glow Face Cleanser",
  description: "A gentle yet effective daily cleanser that removes impurities without stripping your skin of its natural oils. Formulated with botanical extracts to soothe and hydrate while providing a deep, revitalizing clean.",
  price: 34.00,
  image: "/images/cleaner.png",
  images: ["/images/cleaner.png", "/images/moisturizer.png", "/images/hero.png"],
  category: "Cleanse",
  rating: 4.8,
  reviewsCount: 124,
  ingredients: "Aqua (Water), Glycerin, Coco-Glucoside, Aloe Barbadensis Leaf Juice, Rosa Canina (Rosehip) Fruit Oil, Camellia Sinensis (Green Tea) Leaf Extract, Chamomilla Recutita (Matricaria) Flower Extract, Panthenol (Vitamin B5), Tocopherol (Vitamin E), Citrus Aurantium (Neroli) Flower Oil.",
  usage: "Apply a small amount to damp skin and massage gently in circular motions for 60 seconds. Rinse thoroughly with lukewarm water. Use morning and night for best results.",
  isNew: true,
  stock: 15
};

const REVIEWS = [
  { id: "r1", user: "Sarah J.", rating: 5, comment: "Absolutely love this cleanser. My skin feels so fresh and clean without being tight. Highly recommend!", date: "2 days ago" },
  { id: "r2", user: "Michael R.", rating: 5, comment: "I've tried dozens of cleansers and this is the only one that doesn't break me out. Worth every penny.", date: "1 week ago" }
];

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [activeImage, setActiveImage] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addItem({
      id: PRODUCT.id,
      name: PRODUCT.name,
      price: PRODUCT.price,
      image: PRODUCT.image,
      quantity: quantity
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReview(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmittingReview(false);
      setReviewSuccess(true);
      setTimeout(() => {
        setShowReviewModal(false);
        setReviewSuccess(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="bg-brand-50 min-h-screen pb-24 relative">
      <div className="container mx-auto px-6 md:px-12 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Image Gallery */}
          <div className="flex flex-col space-y-6">
            <motion.div 
              key={activeImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square overflow-hidden rounded-[3rem] bg-brand-100 shadow-2xl"
            >
              <Image 
                src={PRODUCT.images[activeImage]}
                alt={PRODUCT.name}
                fill
                className="object-cover"
                priority
              />
              <button className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-brand-500 backdrop-blur-sm transition-all hover:bg-white hover:text-red-500 shadow-lg">
                <Heart size={24} />
              </button>
            </motion.div>
            
            <div className="flex space-x-4">
              {PRODUCT.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "relative h-24 w-24 rounded-2xl overflow-hidden border-2 transition-all",
                    activeImage === idx ? "border-brand-500 scale-105 shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <Image src={img} alt={`Gallery ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="px-4 py-1.5 uppercase tracking-widest text-brand-500 bg-brand-200/50">
                  {PRODUCT.category}
                </Badge>
                <div className="flex items-center space-x-2 text-sm text-brand-500">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={cn("fill-brand-500 text-brand-500", i >= Math.floor(PRODUCT.rating) && "fill-brand-200 text-brand-200")} />
                    ))}
                  </div>
                  <span className="font-bold text-brand-900">{PRODUCT.rating}</span>
                  <span className="text-brand-300">({PRODUCT.reviewsCount} reviews)</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-display font-bold text-brand-900 leading-tight">
                {PRODUCT.name}
              </h1>

              <div className="flex items-center space-x-4">
                 <p className="text-3xl font-display font-bold text-brand-900">${PRODUCT.price.toFixed(2)}</p>
                 <Badge className="bg-brand-100 text-brand-500 uppercase font-bold tracking-widest text-[10px] px-3">IN STOCK ({PRODUCT.stock})</Badge>
              </div>

              <p className="text-lg text-brand-600 leading-relaxed max-w-xl">
                 {PRODUCT.description}
              </p>
            </motion.div>

            {/* Quantity and CTA */}
            <div className="space-y-6 pt-4 border-t border-brand-200">
              <div className="flex items-center space-x-6">
                <div className="flex items-center bg-white rounded-full border border-brand-200 px-6 py-2 shadow-sm">
                  <button onClick={decrementQuantity} className="text-brand-400 hover:text-brand-900 transition-colors p-1">
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center text-lg font-display font-bold text-brand-900">{quantity}</span>
                  <button onClick={incrementQuantity} className="text-brand-400 hover:text-brand-900 transition-colors p-1">
                    <Plus size={18} />
                  </button>
                </div>
                <Button size="lg" className="flex-1 rounded-full shadow-lg h-14" onClick={handleAddToCart}>
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
              <Button size="lg" variant="secondary" className="w-full rounded-full h-14" onClick={handleBuyNow}>
                Buy It Now
              </Button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4 pb-10 border-b border-brand-200">
                <div className="flex items-center space-x-3 text-sm text-brand-600">
                   <ShieldCheck size={20} className="text-brand-400" />
                   <span>Dermatologically Approved</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-brand-600">
                   <Truck size={20} className="text-brand-400" />
                   <span>Free Global Shipping</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-brand-600">
                   <RefreshCcw size={20} className="text-brand-400" />
                   <span>30-Day Ritual Return</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-brand-600">
                   <Share2 size={20} className="text-brand-400" />
                   <span>Ethically Sourced</span>
                </div>
            </div>

            {/* Tabs */}
            <div className="space-y-6 pt-4">
               <div className="flex space-x-8 border-b border-brand-200 overflow-x-auto">
                  {["description", "ingredients", "usage"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        "pb-4 text-sm font-display font-bold uppercase tracking-widest transition-all relative",
                        activeTab === tab ? "text-brand-900" : "text-brand-400"
                      )}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-900" />
                      )}
                    </button>
                  ))}
               </div>
               
               <div className="min-h-32 py-4">
                  {activeTab === "description" && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-brand-600 leading-relaxed italic">
                      "{PRODUCT.description}" - Designed specifically for sensitive yet demanding skin types.
                    </motion.p>
                  )}
                  {activeTab === "ingredients" && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-brand-600 leading-relaxed font-medium tracking-wide">
                      {PRODUCT.ingredients}
                    </motion.p>
                  )}
                  {activeTab === "usage" && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-brand-600 leading-relaxed">
                      {PRODUCT.usage}
                    </motion.p>
                  )}
               </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-24 pt-24 border-t border-brand-200">
           <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-8">
              <div>
                <h2 className="text-4xl font-display font-bold text-brand-900 mb-2 italic">Real Skin Results</h2>
                <div className="flex items-center space-x-4">
                   <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} className="fill-brand-500 text-brand-500" />
                      ))}
                   </div>
                   <span className="text-lg font-bold text-brand-900 font-display">4.8 Average Ritual Rating</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full shadow-md hover:shadow-lg transition-all"
                onClick={() => setShowReviewModal(true)}
              >
                Write a Review
              </Button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {REVIEWS.map((review) => (
                <div key={review.id} className="p-8 rounded-[2rem] bg-white border border-brand-100 shadow-sm transition-all hover:shadow-md">
                   <div className="flex justify-between items-start mb-6">
                      <div className="flex space-x-1">
                         {[...Array(review.rating)].map((_, i) => (
                           <Star key={i} size={14} className="fill-brand-500 text-brand-500" />
                         ))}
                      </div>
                      <span className="text-xs font-medium text-brand-300 uppercase tracking-widest">{review.date}</span>
                   </div>
                   <p className="text-lg text-brand-700 italic leading-relaxed mb-6">"{review.comment}"</p>
                   <div>
                     <p className="text-sm font-display font-bold text-brand-900">{review.user}</p>
                     <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-300">Verified Ritual Member</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 glass-effect">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-white rounded-[3rem] shadow-2xl max-w-lg w-full overflow-hidden border border-brand-100"
            >
                <div className="p-8 md:p-12">
                    <div className="flex justify-between items-center mb-8">
                       <div className="flex items-center space-x-2">
                          <MessageSquare className="text-brand-600" />
                          <h3 className="text-2xl font-display font-bold text-brand-900">Your Ritual Feedback</h3>
                       </div>
                       <button onClick={() => setShowReviewModal(false)} className="text-brand-400 hover:text-brand-900">
                          <X size={24} />
                       </button>
                    </div>

                    {reviewSuccess ? (
                      <div className="py-12 text-center space-y-6">
                         <div className="flex justify-center">
                            <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                               <CheckCircle2 size={40} />
                            </div>
                         </div>
                         <h4 className="text-2xl font-display font-bold text-brand-900 italic">Review Received</h4>
                         <p className="text-brand-500 font-medium">Your ritual experience has been added to our legacy.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleReviewSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-brand-500 ml-4">Ritual Rating</label>
                          <div className="flex space-x-2 bg-brand-50 p-4 rounded-3xl justify-center">
                             {[...Array(5)].map((_, i) => (
                               <Star 
                                 key={i} 
                                 size={24} 
                                 className="text-brand-200 cursor-pointer hover:text-brand-500 transition-colors" 
                               />
                             ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-brand-500 ml-4">Your Experience</label>
                          <textarea 
                             required
                             placeholder="How did your skin feel after the ritual?"
                             className="w-full bg-brand-50 border border-brand-100 rounded-3xl p-6 min-h-32 focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-medium italic text-brand-700"
                          />
                        </div>
                        <Button 
                          type="submit" 
                          className="w-full rounded-full py-8 text-lg shadow-xl"
                          disabled={isSubmittingReview}
                        >
                          {isSubmittingReview ? "Submitting Ritual..." : "Submit Review"}
                        </Button>
                      </form>
                    )}
                </div>
            </motion.div>
        </div>
      )}
    </div>
  );
}
