"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import GlobalNav from "@/components/layout/GlobalNav";
import ProductCard from "@/components/ui/ProductCard";

import { useWishlist } from "@/lib/context/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";

export default function WishlistPage() {
  const { wishlistItems } = useWishlist();
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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white border border-stone-200 rounded-3xl shadow-sm"
          >
            <h3 className="text-2xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Your wishlist is empty</h3>
            <p className="text-gray-500 mb-8 font-light">Explore our curated collections to find the perfect gift.</p>
            <Link href="/discover" className="inline-block px-8 py-3 bg-[#500000] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#3d0000] transition-colors shadow-sm">
              Discover Gifts
            </Link>
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10">
            <AnimatePresence>
              {wishlistItems.map((item, index) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard {...item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </div>
  );
}
