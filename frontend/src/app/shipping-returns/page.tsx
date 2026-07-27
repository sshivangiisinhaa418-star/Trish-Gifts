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
            src="https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=1600&q=80"
            alt="Shipping & Returns"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-[#500000]/70 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10 animate-fade-up">
          <span className="text-sm font-bold text-white/70 uppercase tracking-widest mb-6 block drop-shadow-md">Help & Support</span>
          <h1 className="text-5xl md:text-7xl text-white font-light mb-6 tracking-wide drop-shadow-lg" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            Shipping & Returns
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 bg-[#faf9f6]">
        <div className="container mx-auto">
          
      <div className="max-w-4xl mx-auto space-y-16">
        <section className="bg-white p-10 md:p-12 rounded-3xl border border-stone-200 shadow-sm flex flex-col md:flex-row gap-8 items-center">
          <div className="w-20 h-20 shrink-0 bg-[#500000]/5 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-[#500000]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
          </div>
          <div>
            <h2 className="text-3xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Complimentary White-Glove Shipping</h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed">All TRISH orders over ₹10,000 qualify for our complimentary white-glove delivery service. Your gift will arrive in pristine condition, hand-delivered by a premium courier.</p>
          </div>
        </section>
        
        <section>
          <h2 className="text-3xl text-gray-900 mb-8" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Delivery Timelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 border border-stone-200 rounded-2xl bg-stone-50">
              <h3 className="font-bold text-gray-900 mb-2">Standard</h3>
              <p className="text-gray-600 font-light">3-5 Business Days</p>
            </div>
            <div className="p-8 border border-stone-200 rounded-2xl bg-stone-50">
              <h3 className="font-bold text-gray-900 mb-2">Express</h3>
              <p className="text-gray-600 font-light">1-2 Business Days</p>
            </div>
            <div className="p-8 border border-stone-200 rounded-2xl bg-stone-50">
              <h3 className="font-bold text-gray-900 mb-2">Same-Day Courier</h3>
              <p className="text-gray-600 font-light">Select Metro Areas</p>
            </div>
          </div>
        </section>

        <section className="border-t border-stone-200 pt-16">
          <h2 className="text-3xl text-gray-900 mb-6" style={{ fontFamily: 'var(--font-cormorant), serif' }}>The 30-Day Return Promise</h2>
          <p className="text-lg text-gray-600 font-light leading-relaxed mb-6">If the recipient is not entirely thrilled with their gift, they may return it within 30 days of delivery. Returns are free, and we process refunds or exchanges within 48 hours of receiving the returned item.</p>
          <p className="text-sm text-gray-500 font-light italic">*Note: Bespoke engraved items are non-refundable.</p>
        </section>
      </div>
    
        </div>
      </section>
    </div>
  );
}
