"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface FilterSidebarProps {
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}

const CATEGORIES = ["Cleanse", "Treat", "Moisturize", "Masks", "Sun Care"];

export const FilterSidebar = ({
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceChange,
}: FilterSidebarProps) => {
  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-sm font-display font-bold uppercase tracking-widest text-brand-900 mb-6">
          Category
        </h3>
        <div className="space-y-4">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategories.includes(category);
            return (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className="flex items-center w-full group"
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded border flex items-center justify-center transition-colors mr-3",
                    isSelected
                      ? "bg-brand-500 border-brand-500 text-white"
                      : "border-brand-200 group-hover:border-brand-300"
                  )}
                >
                  {isSelected && <Check size={12} />}
                </div>
                <span
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isSelected ? "text-brand-900" : "text-brand-500 group-hover:text-brand-700"
                  )}
                >
                  {category}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-display font-bold uppercase tracking-widest text-brand-900 mb-6">
          Price Range
        </h3>
        <div className="px-1">
          <input
            type="range"
            min="0"
            max="200"
            step="10"
            value={priceRange[1]}
            onChange={(e) => onPriceChange([0, parseInt(e.target.value)])}
            className="w-full h-1.5 bg-brand-100 rounded-lg appearance-none cursor-pointer accent-brand-500"
          />
          <div className="flex items-center justify-between mt-4">
             <span className="text-sm font-medium text-brand-500">$0</span>
             <span className="text-sm font-bold text-brand-900 font-display">${priceRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
