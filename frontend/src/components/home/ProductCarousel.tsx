"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useRef } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  tags?: string[];
  sameDayDelivery?: boolean;
}

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
}

export default function ProductCarousel({ title, subtitle, products, viewAllLink = "/discover" }: ProductCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-heading font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="text-gray-500 mt-2">{subtitle}</p>}
          </div>
          
          <div className="hidden sm:flex items-center gap-4">
            <button 
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-gray-200 hover:border-gray-900 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-gray-200 hover:border-gray-900 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="text-sm font-bold text-gray-900 uppercase tracking-widest hover:text-brand-500 transition-colors ml-4">
              View All
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative -mx-4 px-4 overflow-hidden">
          <div 
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="snap-start shrink-0 w-[260px] md:w-[280px]"
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
            {/* Spacer for last item */}
            <div className="shrink-0 w-4 md:w-8"></div>
          </div>
        </div>

      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </section>
  );
}
