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
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&q=80"
            alt="Get the TRISH App"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-[#500000]/70 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10 animate-fade-up">
          <span className="text-sm font-bold text-white/70 uppercase tracking-widest mb-6 block drop-shadow-md">Experience</span>
          <h1 className="text-5xl md:text-7xl text-white font-light mb-6 tracking-wide drop-shadow-lg" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            Get the TRISH App
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 bg-[#faf9f6]">
        <div className="container mx-auto">
          
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 order-2 md:order-1 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'var(--font-cormorant), serif' }}>The Art of Gifting, <br/>In Your Pocket.</h2>
          <p className="mb-10 text-xl text-gray-600 font-light leading-relaxed">
            Download the TRISH iOS or Android app to unlock exclusive mobile-only features. Manage your Gifting Calendar on the go, receive push notifications for upcoming anniversaries, and chat live with your dedicated concierge directly from your phone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl flex items-center justify-center gap-4 hover:bg-gray-800 transition-colors shadow-xl">
              <svg viewBox="0 0 384 512" width="24" height="24" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
              <div className="text-left">
                <div className="text-[11px] leading-tight text-white/80">Download on the</div>
                <div className="text-base font-bold leading-tight">App Store</div>
              </div>
            </button>
            <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl flex items-center justify-center gap-4 hover:bg-gray-800 transition-colors shadow-xl">
              <svg viewBox="0 0 512 512" width="24" height="24" fill="currentColor"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
              <div className="text-left">
                <div className="text-[11px] leading-tight text-white/80">GET IT ON</div>
                <div className="text-base font-bold leading-tight">Google Play</div>
              </div>
            </button>
          </div>
        </div>
        
        <div className="flex-1 order-1 md:order-2 flex justify-center md:justify-end">
          <div className="w-64 h-[500px] bg-stone-100 rounded-[3rem] border-[12px] border-gray-900 shadow-2xl relative overflow-hidden flex flex-col">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-full z-10"></div>
            <div className="w-full h-1/2 bg-[#500000] flex items-end justify-center pb-8">
              <span className="font-serif tracking-widest text-white text-xl">TRISH</span>
            </div>
            <div className="w-full h-1/2 bg-white flex flex-col gap-4 p-6">
              <div className="w-full h-16 bg-stone-100 rounded-xl"></div>
              <div className="w-full h-16 bg-stone-100 rounded-xl"></div>
              <div className="w-full h-16 bg-stone-100 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    
        </div>
      </section>
    </div>
  );
}
