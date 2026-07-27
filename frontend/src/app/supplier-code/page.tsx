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
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80"
            alt="Supplier Code of Conduct"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-[#500000]/70 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10 animate-fade-up">
          <span className="text-sm font-bold text-white/70 uppercase tracking-widest mb-6 block drop-shadow-md">Corporate Responsibility</span>
          <h1 className="text-5xl md:text-7xl text-white font-light mb-6 tracking-wide drop-shadow-lg" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            Supplier Code of Conduct
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 bg-[#faf9f6]">
        <div className="container mx-auto">
          
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xl text-gray-600 font-light leading-relaxed">We expect all our partners to share our commitment to ethical practices. The TRISH Supplier Code of Conduct strictly mandates the following core tenets:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group p-10 bg-white border border-stone-200 rounded-3xl shadow-sm hover:shadow-xl hover:border-[#500000]/30 transition-all duration-500">
            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#500000]/10 transition-colors">
              <svg className="w-6 h-6 text-gray-600 group-hover:text-[#500000]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <h3 className="text-2xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Fair Labor Practices</h3>
            <p className="text-gray-500 font-light leading-relaxed">Suppliers must provide safe working environments, fair compensation, and adhere to all local labor laws regarding working hours and conditions.</p>
          </div>
          
          <div className="group p-10 bg-white border border-stone-200 rounded-3xl shadow-sm hover:shadow-xl hover:border-[#500000]/30 transition-all duration-500">
            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#500000]/10 transition-colors">
              <svg className="w-6 h-6 text-gray-600 group-hover:text-[#500000]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-2xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Environmental Stewardship</h3>
            <p className="text-gray-500 font-light leading-relaxed">We require the minimization of ecological footprints, responsible waste management, and the prioritization of sustainable materials.</p>
          </div>
          
          <div className="group p-10 bg-white border border-stone-200 rounded-3xl shadow-sm hover:shadow-xl hover:border-[#500000]/30 transition-all duration-500">
            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#500000]/10 transition-colors">
              <svg className="w-6 h-6 text-gray-600 group-hover:text-[#500000]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 className="text-2xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Anti-Corruption</h3>
            <p className="text-gray-500 font-light leading-relaxed">Zero tolerance for bribery, extortion, or embezzlement in any form. Business must be conducted with the utmost transparency.</p>
          </div>
          
          <div className="group p-10 bg-white border border-stone-200 rounded-3xl shadow-sm hover:shadow-xl hover:border-[#500000]/30 transition-all duration-500">
            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#500000]/10 transition-colors">
              <svg className="w-6 h-6 text-gray-600 group-hover:text-[#500000]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h3 className="text-2xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Non-Discrimination</h3>
            <p className="text-gray-500 font-light leading-relaxed">Employment must be based on ability, not on race, color, gender, religion, or sexual orientation.</p>
          </div>
        </div>
      </div>
    
        </div>
      </section>
    </div>
  );
}
