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
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&q=80"
            alt="Privacy Policy"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-[#500000]/70 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10 animate-fade-up">
          <span className="text-sm font-bold text-white/70 uppercase tracking-widest mb-6 block drop-shadow-md">Legal</span>
          <h1 className="text-5xl md:text-7xl text-white font-light mb-6 tracking-wide drop-shadow-lg" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            Privacy Policy
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 bg-[#faf9f6]">
        <div className="container mx-auto">
          
      <div className="max-w-4xl mx-auto space-y-16">
        <p className="text-xl text-gray-600 font-light leading-relaxed border-l-4 border-[#500000] pl-6 italic">At TRISH, we prioritize the protection of your personal and financial data with the highest industry standards. This Privacy Policy details how we handle your information.</p>
        
        <section>
          <h2 className="text-3xl text-gray-900 mb-8" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Information We Collect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-white border border-stone-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Personal Information</h3>
              <p className="text-gray-600 font-light">Name, email address, billing and shipping addresses, and phone numbers provided during account creation or checkout.</p>
            </div>
            <div className="p-8 bg-white border border-stone-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Payment Details</h3>
              <p className="text-gray-600 font-light">Encrypted credit card information processed securely via Stripe. We do not store raw card numbers.</p>
            </div>
            <div className="p-8 bg-white border border-stone-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Usage Data</h3>
              <p className="text-gray-600 font-light">Browsing history, IP addresses, and interaction with our GiftWizard to provide personalized recommendations.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl text-gray-900 mb-6" style={{ fontFamily: 'var(--font-cormorant), serif' }}>How We Use Your Information</h2>
          <p className="text-lg text-gray-600 font-light leading-relaxed">Your data is strictly used to process orders, enhance your bespoke shopping experience, and communicate important updates regarding your luxury shipments.</p>
        </section>
      </div>
    
        </div>
      </section>
    </div>
  );
}
