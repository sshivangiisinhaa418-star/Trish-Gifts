"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import GlobalNav from "@/components/layout/GlobalNav";
import ProductCard from "@/components/ui/ProductCard";

// Mock Data
const wishlistItems = [
  { id: 2, title: "French Perfume Gift Box", category: "Fragrance", price: 1899, originalPrice: 2499, rating: 4.9, reviews: 89, image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80", tags: ["BIRTHDAY", "MOTHER"], sameDayDelivery: false },
  { id: 14, title: "Classic Pearl Necklace", category: "Jewelry", price: 4999, originalPrice: 6500, rating: 4.9, reviews: 76, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80", tags: ["ANNIVERSARY", "WIFE"], sameDayDelivery: false },
];

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col">
      <header className="w-full bg-white border-b border-gray-100 hidden lg:block relative z-40">
        <GlobalNav />
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-16 flex-1 max-w-7xl">
        
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl text-gray-900 mb-2" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Your Wishlist</h1>
            <p className="text-gray-500 font-light flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#500000]" />
              {wishlistItems.length} items saved for later
            </p>
          </div>
          <Link href="/account" className="hidden md:flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-widest hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Account
          </Link>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-20 bg-white border border-stone-200 rounded-3xl">
            <h3 className="text-2xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Your wishlist is empty</h3>
            <Link href="/discover" className="inline-block px-8 py-3 bg-[#500000] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#3d0000] transition-colors">
              Discover Gifts
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10">
            {wishlistItems.map((item, index) => (
              <div key={item.id} className="animate-fade-up" style={{ animationDelay: `${(index % 4) * 100}ms` }}>
                <ProductCard {...item} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
