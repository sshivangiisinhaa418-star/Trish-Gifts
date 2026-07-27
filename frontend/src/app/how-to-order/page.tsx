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
            src="https://images.unsplash.com/photo-1466041185449-34da7175be92?w=1600&q=80"
            alt="How to Order"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-[#500000]/70 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10 animate-fade-up">
          <span className="text-sm font-bold text-white/70 uppercase tracking-widest mb-6 block drop-shadow-md">Help & Support</span>
          <h1 className="text-5xl md:text-7xl text-white font-light mb-6 tracking-wide drop-shadow-lg" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            How to Order
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 bg-[#faf9f6]">
        <div className="container mx-auto">
          
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xl text-gray-600 font-light leading-relaxed">The TRISH ordering experience is designed to be as effortless and luxurious as the gifts themselves.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            <Image src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800&q=80" alt="Discover" fill className="object-cover" />
          </div>
          <div className="order-1 md:order-2 space-y-4">
            <span className="text-6xl text-[#500000]/20 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>01</span>
            <h3 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Discover & Personalize</h3>
            <p className="text-lg text-gray-600 font-light leading-relaxed">Browse our catalog or use the AI GiftWizard. Select your item and add complimentary monogramming or custom gift wrapping.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-6xl text-[#500000]/20 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>02</span>
            <h3 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Secure Checkout</h3>
            <p className="text-lg text-gray-600 font-light leading-relaxed">Enter the recipient's shipping address. You can choose to delay delivery for a specific future date (like a birthday) using our concierge system.</p>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            <Image src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80" alt="Checkout" fill className="object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            <Image src="https://images.unsplash.com/photo-1512418490979-92798cec1380?w=800&q=80" alt="Reveal" fill className="object-cover" />
          </div>
          <div className="order-1 md:order-2 space-y-4">
            <span className="text-6xl text-[#500000]/20 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>03</span>
            <h3 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>The Digital Reveal</h3>
            <p className="text-lg text-gray-600 font-light leading-relaxed">Instantly send an animated "Digital Reveal" to the recipient's email while the physical luxury gift is en route.</p>
          </div>
        </div>
      </div>
    
        </div>
      </section>
    </div>
  );
}
