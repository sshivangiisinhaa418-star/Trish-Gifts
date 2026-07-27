"use client";

import GlobalNav from "@/components/layout/GlobalNav";
import Image from "next/image";

export default function EditorialPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col">
      <header className="w-full bg-white border-b border-gray-100 hidden lg:block relative z-40">
        <GlobalNav />
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1508614999368-9260051292e5?w=1600&q=80"
            alt="Site Map"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-[#500000]/70 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10 animate-fade-up">
          <span className="text-sm font-bold text-white/70 uppercase tracking-widest mb-6 block drop-shadow-md">Information</span>
          <h1 className="text-5xl md:text-7xl text-white font-light mb-6 tracking-wide drop-shadow-lg" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            Site Map
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 bg-[#faf9f6]">
        <div className="container mx-auto">
          
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="bg-white p-10 rounded-3xl border border-stone-100 shadow-sm">
            <h3 className="text-2xl text-gray-900 mb-6 border-b border-stone-200 pb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Shopping</h3>
            <ul className="space-y-4 text-lg text-gray-600 font-light">
              <li><a href="/discover" className="hover:text-[#500000] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#500000]/50 block"></span>All Products</a></li>
              <li><a href="/discover?intent=birthday" className="hover:text-[#500000] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#500000]/50 block"></span>Birthday Gifts</a></li>
              <li><a href="/discover?intent=anniversary" className="hover:text-[#500000] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#500000]/50 block"></span>Anniversary Gifts</a></li>
              <li><a href="/corporate" className="hover:text-[#500000] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#500000]/50 block"></span>Corporate Bulk Gifting</a></li>
            </ul>
          </div>
          
          <div className="bg-white p-10 rounded-3xl border border-stone-100 shadow-sm">
            <h3 className="text-2xl text-gray-900 mb-6 border-b border-stone-200 pb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Experience</h3>
            <ul className="space-y-4 text-lg text-gray-600 font-light">
              <li><a href="/gift-finder" className="hover:text-[#500000] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#500000]/50 block"></span>AI Gift Wizard</a></li>
              <li><a href="/journal" className="hover:text-[#500000] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#500000]/50 block"></span>The Gifting Journal</a></li>
              <li><a href="/concierge" className="hover:text-[#500000] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#500000]/50 block"></span>Private Concierge</a></li>
              <li><a href="/app" className="hover:text-[#500000] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#500000]/50 block"></span>Mobile Application</a></li>
            </ul>
          </div>
          
          <div className="bg-white p-10 rounded-3xl border border-stone-100 shadow-sm">
            <h3 className="text-2xl text-gray-900 mb-6 border-b border-stone-200 pb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Account</h3>
            <ul className="space-y-4 text-lg text-gray-600 font-light">
              <li><a href="/account" className="hover:text-[#500000] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#500000]/50 block"></span>My Dashboard</a></li>
              <li><a href="/wishlist" className="hover:text-[#500000] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#500000]/50 block"></span>My Wishlist</a></li>
              <li><a href="/order-tracking" className="hover:text-[#500000] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#500000]/50 block"></span>Track an Order</a></li>
            </ul>
          </div>
        </div>
      </div>
    
        </div>
      </section>
    </div>
  );
}
