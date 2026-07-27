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
            src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1600&q=80"
            alt="Terms of Use"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-[#500000]/70 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10 animate-fade-up">
          <span className="text-sm font-bold text-white/70 uppercase tracking-widest mb-6 block drop-shadow-md">Legal</span>
          <h1 className="text-5xl md:text-7xl text-white font-light mb-6 tracking-wide drop-shadow-lg" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            Terms of Use
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 bg-[#faf9f6]">
        <div className="container mx-auto">
          
      <div className="max-w-4xl mx-auto space-y-16">
        <section>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl text-[#500000]/20 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>01</span>
            <h2 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Introduction</h2>
          </div>
          <p className="text-lg text-gray-600 font-light leading-relaxed">Welcome to TRISH. By accessing or using our website, services, and luxury bespoke offerings, you agree to be bound by these Terms of Use. Please read them carefully.</p>
        </section>
        
        <section>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl text-[#500000]/20 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>02</span>
            <h2 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Intellectual Property Rights</h2>
          </div>
          <p className="text-lg text-gray-600 font-light leading-relaxed">All content published and made available on our site is the property of TRISH and the site's creators. This includes, but is not limited to images, text, logos, documents, downloadable files and anything that contributes to the composition of our site.</p>
        </section>
        
        <section>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl text-[#500000]/20 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>03</span>
            <h2 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Acceptable Use</h2>
          </div>
          <p className="text-lg text-gray-600 font-light leading-relaxed">As a user of our site, you agree to use our site legally, not to use our site for illegal purposes, and not to violate the intellectual property rights of the site owners or any third party to the site.</p>
        </section>
        
        <section>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl text-[#500000]/20 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>04</span>
            <h2 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Limitation of Liability</h2>
          </div>
          <p className="text-lg text-gray-600 font-light leading-relaxed">TRISH and our directors, officers, agents, employees, subsidiaries, and affiliates will not be liable for any actions, claims, losses, damages, liabilities and expenses including legal fees from your use of the site.</p>
        </section>
      </div>
    
        </div>
      </section>
    </div>
  );
}
