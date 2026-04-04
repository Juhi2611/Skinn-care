"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FilterSidebar } from "@/components/FilterSidebar";
import { ProductCard } from "@/components/ProductCard";
import { ChevronDown, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

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

export default function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    result = result.filter((p) => p.price <= priceRange[1]);

    if (sortBy === "price-low-to-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high-to-low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result.sort((a, b) => (a.isNew ? -1 : 1));
    }

    return result;
  }, [selectedCategories, priceRange, sortBy]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="bg-brand-50 min-h-screen">
      {/* Header */}
      <div className="container mx-auto px-6 md:px-12 py-12">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-brand-900 mb-4 tracking-tighter">
          Our Collection
        </h1>
        <p className="text-brand-500 text-lg max-w-2xl">
          Discover a curated selecton of clean, premium skincare designed to bring out your skin's natural radiance.
        </p>
      </div>

      <div className="container mx-auto px-6 md:px-12 border-t border-brand-200">
        <div className="flex flex-col lg:flex-row gap-12 py-12">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
              selectedCategories={selectedCategories}
              onCategoryChange={toggleCategory}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
            />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center text-sm font-medium text-brand-500">
                <span className="text-brand-900 mr-2">{filteredProducts.length}</span> Products found
              </div>
              
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                  className="lg:hidden flex items-center space-x-2 px-4 py-2 rounded-full border border-brand-200 bg-white text-sm font-medium text-brand-700"
                >
                  <SlidersHorizontal size={16} />
                  <span>Filters</span>
                </button>
                
                <div className="relative group">
                  <button className="flex items-center space-x-2 px-4 py-2 rounded-full border border-brand-200 bg-white text-sm font-medium text-brand-700">
                    <ArrowUpDown size={16} className="text-brand-400" />
                    <span>Sort by: <span className="text-brand-900 capitalize">{sortBy.replace(/-/g, " ")}</span></span>
                    <ChevronDown size={14} className="text-brand-400" />
                  </button>
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl border border-brand-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden">
                    {[
                      { label: "Featured", value: "featured" },
                      { label: "Newest", value: "newest" },
                      { label: "Price: Low to High", value: "price-low-to-high" },
                      { label: "Price: High to Low", value: "price-high-to-low" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                        className={cn(
                          "w-full text-left px-6 py-3 text-sm transition-colors",
                          sortBy === option.value ? "bg-brand-50 text-brand-900 font-bold" : "hover:bg-brand-50 text-brand-500"
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
               {filteredProducts.map((product) => (
                 <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                 >
                   <ProductCard {...product} />
                 </motion.div>
               ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-24 text-center">
                <h3 className="text-2xl font-display font-bold text-brand-900 mb-2 italic">Nothing found.</h3>
                <p className="text-brand-500">Try adjusting your filters to find what you're looking for.</p>
                <button
                  onClick={() => { setSelectedCategories([]); setPriceRange([0, 200]); }}
                  className="mt-6 text-brand-500 font-bold underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Backdrop */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-brand-900/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
               initial={{ x: "100%" }}
               animate={{ x: 0 }}
               exit={{ x: "100%" }}
               transition={{ type: "spring", damping: 25, stiffness: 200 }}
               className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl z-50 p-8 lg:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-display font-bold text-brand-900">Filters</h2>
                <button onClick={() => setIsMobileFilterOpen(false)} className="text-brand-500 font-medium">Close</button>
              </div>
              <FilterSidebar
                selectedCategories={selectedCategories}
                onCategoryChange={toggleCategory}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
