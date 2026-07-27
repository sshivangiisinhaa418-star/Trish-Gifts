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
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80"
            alt="Frequently Asked Questions"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-[#500000]/70 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10 animate-fade-up">
          <span className="text-sm font-bold text-white/70 uppercase tracking-widest mb-6 block drop-shadow-md">Help & Support</span>
          <h1 className="text-5xl md:text-7xl text-white font-light mb-6 tracking-wide drop-shadow-lg" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            Frequently Asked Questions
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 bg-[#faf9f6]">
        <div className="container mx-auto">
          
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-stone-200 shadow-sm hover:shadow-lg transition-shadow">
          <h3 className="text-2xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>How long does bespoke customization take?</h3>
          <p className="text-lg text-gray-600 font-light leading-relaxed">Standard personalization (engraving, monogramming) adds 2-3 business days to your order processing time. For fully custom bespoke creations, a concierge will contact you with a specific timeline.</p>
        </div>
        
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-stone-200 shadow-sm hover:shadow-lg transition-shadow">
          <h3 className="text-2xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Do you ship internationally?</h3>
          <p className="text-lg text-gray-600 font-light leading-relaxed">Yes, TRISH offers luxury white-glove international shipping to over 150 countries. All customs and import duties are calculated and paid at checkout to ensure seamless delivery.</p>
        </div>
        
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-stone-200 shadow-sm hover:shadow-lg transition-shadow">
          <h3 className="text-2xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>What is your return policy for gifted items?</h3>
          <p className="text-lg text-gray-600 font-light leading-relaxed">Gift recipients may return items for store credit within 30 days of delivery. The original purchaser will not be notified of the return to preserve the gifting experience.</p>
        </div>
      </div>
    
        </div>
      </section>
    </div>
  );
}
