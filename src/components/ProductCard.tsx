"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Heart, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/useCart";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
}

export const ProductCard = ({
  id,
  name,
  price,
  image,
  category,
  rating,
  reviewsCount,
  isNew,
}: ProductCardProps) => {
  const { addItem, items } = useCart();
  const isInCart = items.some((item) => item.id === id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id,
      name,
      price,
      image,
      quantity: 1,
    });
  };

  return (
    <Card className="group relative overflow-hidden border-none bg-transparent p-0 shadow-none">
      <Link href={`/product/${id}`}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-brand-100">
          {isNew && (
            <Badge className="absolute left-4 top-4 z-10 bg-white text-brand-900 shadow-sm">
              New
            </Badge>
          )}
          {isInCart && (
            <Badge className="absolute left-4 top-4 z-10 bg-green-500 text-white shadow-sm flex items-center space-x-1">
              <CheckCircle2 size={12} />
              <span>In Cart</span>
            </Badge>
          )}
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-brand-500 backdrop-blur-sm transition-all hover:bg-white hover:text-red-500"
          >
            <Heart size={20} />
          </button>
          
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <Button 
              className={cn("w-full shadow-lg", isInCart && "bg-green-600 hover:bg-green-700")} 
              size="md"
              onClick={handleAddToCart}
            >
              {isInCart ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </Link>

      <CardContent className="mt-4 px-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-400">
            {category}
          </span>
          <div className="flex items-center space-x-1 text-xs text-brand-500">
            <Star size={14} className="fill-brand-500 text-brand-500" />
            <span>{rating}</span>
            <span className="text-brand-300">({reviewsCount})</span>
          </div>
        </div>
        <h3 className="mt-2 text-lg font-display font-semibold text-brand-900 line-clamp-1">
          {name}
        </h3>
        <p className="mt-1 text-base font-medium text-brand-600">
          ${price.toFixed(2)}
        </p>
      </CardContent>
    </Card>
  );
};
