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
            src="https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=1600&q=80"
            alt="California Supply Chain Act"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-[#500000]/70 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10 animate-fade-up">
          <span className="text-sm font-bold text-white/70 uppercase tracking-widest mb-6 block drop-shadow-md">Corporate Responsibility</span>
          <h1 className="text-5xl md:text-7xl text-white font-light mb-6 tracking-wide drop-shadow-lg" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            California Supply Chain Act
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 bg-[#faf9f6]">
        <div className="container mx-auto">
          
      <div className="max-w-5xl mx-auto space-y-20">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xl text-gray-600 font-light leading-relaxed">TRISH is deeply committed to ethical sourcing, sustainable manufacturing, and strict compliance with the California Transparency in Supply Chains Act of 2010 (SB 657).</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Verification of Supply Chains</h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed">We conduct rigorous preliminary assessments of our suppliers to verify their compliance with international labor laws and to ensure the total eradication of human trafficking and slavery from our product lifecycles.</p>
          </div>
          <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl">
            <Image src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80" alt="Supply Chain" fill className="object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center flex-col-reverse md:flex-row-reverse">
          <div className="space-y-6">
            <h2 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Audits & Certification</h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed">Our global partners are subjected to unannounced, independent third-party audits. Furthermore, all direct suppliers must certify that materials incorporated into our bespoke products comply with the laws regarding slavery and human trafficking.</p>
          </div>
          <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl">
            <Image src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" alt="Audits" fill className="object-cover" />
          </div>
        </div>
      </div>
    
        </div>
      </section>
    </div>
  );
}
