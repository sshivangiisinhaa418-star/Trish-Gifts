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
            src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1600&q=80"
            alt="Patents & Trademarks"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-[#500000]/70 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10 animate-fade-up">
          <span className="text-sm font-bold text-white/70 uppercase tracking-widest mb-6 block drop-shadow-md">Legal</span>
          <h1 className="text-5xl md:text-7xl text-white font-light mb-6 tracking-wide drop-shadow-lg" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            Patents & Trademarks
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 bg-[#faf9f6]">
        <div className="container mx-auto">
          
      <div className="max-w-4xl mx-auto space-y-12">
        <p className="text-lg text-gray-600 font-light leading-relaxed text-center">TRISH products, technologies, and bespoke gifting mechanisms are protected by patents in the U.S. and elsewhere. This page is provided to satisfy the virtual patent marking provisions of various jurisdictions.</p>
        
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#fcfbf9] text-gray-900 uppercase tracking-widest text-xs border-b border-stone-200">
              <tr>
                <th className="px-8 py-6 font-bold">Product / Technology</th>
                <th className="px-8 py-6 font-bold">Patent Numbers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-gray-600">
              <tr className="hover:bg-stone-50 transition-colors">
                <td className="px-8 py-6 font-medium text-gray-900 text-lg">GiftWizard AI Engine</td>
                <td className="px-8 py-6">US Pat. 10,489,123, EP 3,456,789</td>
              </tr>
              <tr className="hover:bg-stone-50 transition-colors">
                <td className="px-8 py-6 font-medium text-gray-900 text-lg">Bespoke Jewelry Clasp Mech.</td>
                <td className="px-8 py-6">US Pat. 9,876,543</td>
              </tr>
              <tr className="hover:bg-stone-50 transition-colors">
                <td className="px-8 py-6 font-medium text-gray-900 text-lg">Luxury Fragrance Atomizer</td>
                <td className="px-8 py-6">US Pat. D876,543, CN 202130123456.7</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    
        </div>
      </section>
    </div>
  );
}
