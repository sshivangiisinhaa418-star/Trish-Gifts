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
            src="https://images.unsplash.com/photo-1558769132-cb1fac08c04b?w=1600&q=80"
            alt="Apparel Size Charts"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-[#500000]/70 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10 animate-fade-up">
          <span className="text-sm font-bold text-white/70 uppercase tracking-widest mb-6 block drop-shadow-md">Help & Support</span>
          <h1 className="text-5xl md:text-7xl text-white font-light mb-6 tracking-wide drop-shadow-lg" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            Apparel Size Charts
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 bg-[#faf9f6]">
        <div className="container mx-auto">
          
      <div className="max-w-4xl mx-auto space-y-12 text-center">
        <p className="text-lg text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">Ensure the perfect fit for your luxury apparel gifts. Measurements below reflect standard TRISH bespoke sizing (in inches).</p>
        
        <h3 className="text-3xl text-gray-900 mb-8" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Women's Apparel</h3>
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xl text-left">
          <table className="w-full text-center text-sm">
            <thead className="bg-[#fcfbf9] text-gray-900 uppercase tracking-widest text-xs border-b border-stone-200">
              <tr>
                <th className="px-6 py-6 font-bold">Size</th>
                <th className="px-6 py-6 font-bold">Bust</th>
                <th className="px-6 py-6 font-bold">Waist</th>
                <th className="px-6 py-6 font-bold">Hip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-gray-600">
              <tr className="hover:bg-stone-50 transition-colors"><td className="px-6 py-6 font-bold text-gray-900">XS (0-2)</td><td className="px-6 py-6">32 - 33</td><td className="px-6 py-6">24 - 25</td><td className="px-6 py-6">34.5 - 35.5</td></tr>
              <tr className="hover:bg-stone-50 transition-colors"><td className="px-6 py-6 font-bold text-gray-900">S (4-6)</td><td className="px-6 py-6">34 - 35</td><td className="px-6 py-6">26 - 27</td><td className="px-6 py-6">36.5 - 37.5</td></tr>
              <tr className="hover:bg-stone-50 transition-colors"><td className="px-6 py-6 font-bold text-gray-900">M (8-10)</td><td className="px-6 py-6">36 - 37</td><td className="px-6 py-6">28 - 29</td><td className="px-6 py-6">38.5 - 39.5</td></tr>
              <tr className="hover:bg-stone-50 transition-colors"><td className="px-6 py-6 font-bold text-gray-900">L (12-14)</td><td className="px-6 py-6">38.5 - 40</td><td className="px-6 py-6">30.5 - 32</td><td className="px-6 py-6">41 - 42.5</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    
        </div>
      </section>
    </div>
  );
}
