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
            src="https://images.unsplash.com/photo-1450101499163-c8848c66cb85?w=1600&q=80"
            alt="Manage Personal Information"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-[#500000]/70 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10 animate-fade-up">
          <span className="text-sm font-bold text-white/70 uppercase tracking-widest mb-6 block drop-shadow-md">Information & Privacy</span>
          <h1 className="text-5xl md:text-7xl text-white font-light mb-6 tracking-wide drop-shadow-lg" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            Manage Personal Information
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 bg-[#faf9f6]">
        <div className="container mx-auto">
          
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xl text-gray-600 font-light leading-relaxed mb-12">You have complete control over your data. Use the form below to request a copy of your personal data or to request account deletion in accordance with global regulations.</p>
        
        <div className="bg-white p-10 md:p-16 rounded-[2.5rem] border border-stone-200 shadow-2xl text-left">
          <form className="space-y-8">
            <div>
              <label className="text-xs font-bold text-gray-900 uppercase tracking-widest block mb-4">Request Type</label>
              <select className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-gray-700 font-light focus:outline-none focus:border-[#500000] focus:ring-1 focus:ring-[#500000] transition-colors">
                <option>Download My Data (Takeout)</option>
                <option>Delete My Account & Data</option>
                <option>Opt-out of Targeted Advertising</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-900 uppercase tracking-widest block mb-4">Email Address</label>
              <input type="email" required placeholder="Enter the email associated with your account" className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-gray-700 font-light focus:outline-none focus:border-[#500000] focus:ring-1 focus:ring-[#500000] transition-colors" />
            </div>
            <button type="button" className="w-full py-5 bg-gray-900 text-white rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl mt-4">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    
        </div>
      </section>
    </div>
  );
}
