"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Gift } from "lucide-react";
import confetti from "canvas-confetti";

export default function DigitalRevealPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Trigger confetti animation
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#500000', '#d4af37', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#500000', '#d4af37', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#500000]/20 to-transparent blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-[#d4af37]/20 to-transparent blur-3xl"></div>
      </div>

      <div className="w-full max-w-2xl px-4 relative z-10 flex flex-col items-center">
        
        {/* Closed State */}
        <div className={`transition-all duration-1000 w-full flex flex-col items-center ${isOpen ? 'opacity-0 scale-95 pointer-events-none absolute' : 'opacity-100 scale-100'}`}>
          <div className="text-center mb-12 animate-fade-up">
            <span className="text-6xl text-[#500000] tracking-[0.05em] font-light mb-8 block" style={{ fontFamily: 'var(--font-cormorant), serif' }}>TRISH</span>
            <h1 className="text-3xl md:text-4xl text-gray-900 font-light mb-4">A bespoke gift is waiting for you.</h1>
            <p className="text-gray-500 font-light">Sent with love by Eleanor Sterling.</p>
          </div>

          <button 
            onClick={handleOpen}
            className="group relative w-64 h-64 bg-[#500000] rounded-3xl shadow-2xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-500 animate-bounce-slow"
          >
            {/* Box Ribbon */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-[#3d0000]"></div>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 bg-[#3d0000]"></div>
            
            {/* Box Lid Highlight */}
            <div className="absolute top-0 inset-x-0 h-1/2 bg-white/5 rounded-t-3xl"></div>
            
            <div className="relative z-10 w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
              <Gift className="w-8 h-8 text-[#500000] mb-1" />
              <span className="text-[10px] font-bold text-[#500000] uppercase tracking-widest">Tap to Open</span>
            </div>
          </button>
        </div>

        {/* Opened State */}
        <div className={`transition-all duration-1000 delay-300 w-full flex flex-col items-center ${!isOpen ? 'opacity-0 translate-y-12 pointer-events-none absolute' : 'opacity-100 translate-y-0'}`}>
          
          <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-stone-100 text-center w-full relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#500000] rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>

            <h2 className="text-4xl md:text-5xl text-[#500000] mb-8" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              Surprise!
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-800 font-light italic leading-relaxed mb-12 font-serif">
              "Happy Anniversary! I saw this bespoke watch and instantly thought of you. I had it engraved with our initials. Can't wait to see you wear it."
            </p>
            
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-stone-50 rounded-[2rem] border border-stone-200 text-left">
              <div className="w-32 h-32 relative rounded-2xl overflow-hidden shrink-0 shadow-md">
                <Image src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80" alt="Gift" fill className="object-cover" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#500000] uppercase tracking-widest mb-2 block">Currently En Route</span>
                <h3 className="text-xl text-gray-900 font-medium mb-2">Bespoke Engraved Watch</h3>
                <p className="text-gray-500 font-light text-sm mb-4">Estimated Delivery: Oct 27, 2026</p>
                <Link href="/" className="text-sm font-bold text-gray-900 hover:text-[#500000] uppercase tracking-widest transition-colors flex items-center gap-2">
                  Explore TRISH <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
