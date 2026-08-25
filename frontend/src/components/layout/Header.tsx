"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Heart, ShoppingBag, User, Sparkles, Settings, Menu, X, ChevronRight, Gift, CalendarHeart, PartyPopper } from "lucide-react";
import GlobalNav from "./GlobalNav";
import { useCart } from "@/lib/context/CartContext";
import { useWishlist } from "@/lib/context/WishlistContext";
import { useAuth } from "@/lib/context/AuthContext";
import { CATEGORIES, OCCASIONS, FESTIVALS } from "@/lib/constants/navigation";

export default function Header() {
  const router = useRouter();
  const { cartItems, openCart } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, loading: authLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-gray-100 animate-fade-up">
      <div className="w-full px-4 md:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 md:gap-6">
        
        {/* Left Section: Mobile Menu Button + Logo */}
        <div className="flex items-center gap-3 lg:gap-12">
          {/* Mobile Hamburger Button (Phones & Tablets) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-gray-900 hover:bg-stone-100 rounded-full transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span 
              className="text-3xl text-[#500000] tracking-[0.05em] inline-block hover:opacity-80 transition-opacity origin-left font-light pl-1"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              TRISH
            </span>
          </Link>

          {/* Main Links */}
          <div className="hidden lg:flex items-center gap-8 pt-2">
            <Link href="/heritage" className="text-xs font-bold text-gray-500 hover:text-[#500000] uppercase tracking-widest transition-colors">Our Story</Link>
            <Link href="/concierge" className="text-xs font-bold text-gray-500 hover:text-[#500000] uppercase tracking-widest transition-colors">Our Services</Link>
          </div>
        </div>

        {/* Center Section: Search Bar */}
        <div className="flex-1 max-w-xl hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 cursor-pointer whitespace-nowrap bg-gray-50 px-3 py-2 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            Deliver to: <span className="font-bold">Select Location</span>
          </div>
          <div className="relative group flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
            </div>
            <input
              type="text"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = e.currentTarget.value.trim();
                  const dest = val ? `/discover?q=${encodeURIComponent(val)}` : '/discover';
                  router.push(dest);
                }
              }}
              className="block w-full pl-11 pr-4 py-3 border-0 bg-gray-100/80 rounded-full text-sm font-medium text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all outline-none"
              placeholder="Search for gifts, occasions, sentiments..."
            />
          </div>
        </div>

        {/* Right Section: Icons & Professional Auth Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* AI Gift Finder Button */}
          <Link 
            href="/gift-finder"
            className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-[#500000] text-white rounded-full hover:bg-[#600000] transition-colors text-xs font-medium mr-1 shadow-sm whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Customize
          </Link>
          <Link 
            href="/gift-finder"
            className="md:hidden p-2 text-[#500000] hover:bg-red-50 transition-colors rounded-full relative group"
          >
            <Sparkles className="w-5 h-5" />
          </Link>
          
          {/* Mobile Search Icon */}
          <Link href="/discover" className="p-2 md:hidden text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100">
            <Search className="w-5 h-5" />
          </Link>
          
          <Link href="/wishlist" className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100 relative group">
            <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {wishlistItems.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
            )}
          </Link>
          
          <button 
            onClick={() => {
              openCart();
            }}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100 flex items-center gap-1 group"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-gray-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-white">
                  {cartItems.length}
                </span>
              )}
            </div>
          </button>

          {user?.email?.toLowerCase() === 'mayankrajdto@gmail.com' && (
            <Link href="/admin" className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100 group">
              <Settings className="w-5 h-5 group-hover:scale-110 transition-transform text-[#500000]" />
            </Link>
          )}

          {/* Professional Sign Up & Log In Buttons */}
          {authLoading ? (
            <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-gray-200 ml-1">
              <div className="w-16 h-7 bg-gray-100 rounded-full animate-pulse" />
              <div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse" />
            </div>
          ) : user ? (
            <Link href="/account" title="My Account & Orders" className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100 group flex items-center ml-1">
              {user?.user_metadata?.avatar_url ? (
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt="Profile" 
                  className="w-7 h-7 rounded-full object-cover group-hover:scale-105 transition-transform shadow-sm ring-2 ring-[#500000]/20"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#500000]/10 flex items-center justify-center text-[#500000] group-hover:bg-[#500000]/20 transition-colors">
                  <User className="w-4 h-4 text-[#500000]" />
                </div>
              )}
            </Link>
          ) : (
            <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-gray-200 ml-1">
              <Link 
                href="/login" 
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs md:text-sm font-semibold text-gray-700 hover:text-[#500000] transition-colors rounded-full hover:bg-gray-100 whitespace-nowrap"
              >
                Log In
              </Link>
              <Link 
                href="/signup" 
                className="px-4 py-2 md:px-5 md:py-2.5 bg-gradient-to-r from-[#500000] to-[#700000] text-white hover:opacity-95 transition-all duration-300 text-xs md:text-sm font-semibold rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Global Navigation */}
      <GlobalNav />

      {/* Mobile & Tablet Slide-Over Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-50 bg-black/50 backdrop-blur-xs lg:hidden animate-fade-in" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="w-full max-w-sm bg-white h-[calc(100vh-5rem)] overflow-y-auto p-6 space-y-6 shadow-2xl animate-slide-in-left" onClick={(e) => e.stopPropagation()}>
            <div className="border-b border-stone-200 pb-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Navigation Menu</p>
              <p className="text-xl text-[#500000] font-serif" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Explore TRISH</p>
            </div>

            {/* Quick Mobile Links */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-[#500000] uppercase tracking-widest flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5" /> Popular Categories
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {CATEGORIES.slice(0, 6).map((cat) => (
                  <Link
                    key={cat}
                    href={`/discover?category=${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-gray-800 hover:bg-stone-100 hover:border-stone-300 transition-all flex items-center justify-between"
                  >
                    <span>{cat}</span>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-bold text-[#500000] uppercase tracking-widest flex items-center gap-1.5">
                <CalendarHeart className="w-3.5 h-3.5" /> Special Occasions
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {OCCASIONS.slice(0, 6).map((occ) => (
                  <Link
                    key={occ}
                    href={`/discover?intent=${occ.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-gray-800 hover:bg-stone-100 hover:border-stone-300 transition-all flex items-center justify-between"
                  >
                    <span>{occ}</span>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-bold text-[#500000] uppercase tracking-widest flex items-center gap-1.5">
                <PartyPopper className="w-3.5 h-3.5" /> Upcoming Festivals
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {FESTIVALS.slice(0, 4).map((fest) => (
                  <Link
                    key={fest}
                    href={`/discover?intent=${fest.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-gray-800 hover:bg-stone-100 hover:border-stone-300 transition-all flex items-center justify-between"
                  >
                    <span>{fest}</span>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-stone-200 pt-4 space-y-2">
              <Link href="/heritage" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-gray-900">Our Story</Link>
              <Link href="/concierge" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-gray-900">Our Concierge Services</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


