"use client";

import Link from "next/link";
import { Search, Heart, ShoppingBag, User } from "lucide-react";
import GlobalNav from "./GlobalNav";
import { useCart } from "@/lib/context/CartContext";

export default function Header() {
  const { cartItems, openCart } = useCart();
  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-gray-100 animate-fade-up">
      <div className="w-full px-4 md:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Left Section: Logo */}
        <div className="flex items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span 
              className="text-6xl text-[#500000] tracking-[0.05em] inline-block transform scale-x-[1.4] scale-y-[1.1] group-hover:opacity-80 transition-opacity origin-left font-light pl-2"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              QUMI
            </span>
          </Link>
        </div>

        {/* Center Section: Search Bar */}
        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-3 border-0 bg-gray-100/80 rounded-full text-sm font-medium text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all outline-none"
              placeholder="Search for gifts, occasions, sentiments..."
            />
          </div>
        </div>

        {/* Right Section: Icons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Search Icon */}
          <button className="p-2.5 md:hidden text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100">
            <Search className="w-5 h-5" />
          </button>
          
          <button className="p-2.5 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100 relative group">
            <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
          
          <button className="p-2.5 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100 group">
            <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          
          <button 
            onClick={openCart}
            className="p-2.5 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100 flex items-center gap-1 group"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-gray-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-white">
                  {cartItems.length}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>
      <GlobalNav />
    </header>
  );
}
