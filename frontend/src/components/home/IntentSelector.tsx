"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronRight, Gift, Sparkles } from "lucide-react";

export default function IntentSelector() {
  const [recipient, setRecipient] = useState("Select recipient");
  const [occasion, setOccasion] = useState("Select occasion");
  const [budget, setBudget] = useState("Any budget");
  const router = useRouter();

  return (
    <div className="w-full max-w-5xl mx-auto py-8 relative z-20 px-4">
      
      {/* Subtle Title above the bar */}
      <div className="flex items-center justify-center gap-2 mb-4 px-2">
        <Sparkles className="w-5 h-5 text-gray-900 animate-pulse" />
        <h2 className="text-lg font-heading font-medium text-gray-900 tracking-tight">
          Find the perfect gift
        </h2>
      </div>

      {/* The Floating Search Bar */}
      <div className="bg-white rounded-3xl md:rounded-full shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 p-2 flex flex-col md:flex-row items-center transition-all hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] relative">
        
        {/* Who */}
        <div className="w-full md:flex-1 relative group bg-transparent hover:bg-gray-50 transition-colors rounded-2xl md:rounded-full px-6 py-3 cursor-pointer">
          <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-widest">For Who?</label>
          <div className="text-sm font-semibold text-gray-900 truncate">{recipient}</div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 hidden md:block text-gray-200 group-hover:text-brand-500 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-10 bg-gray-100"></div>

        {/* Why */}
        <div className="w-full md:flex-1 relative group bg-transparent hover:bg-gray-50 transition-colors rounded-2xl md:rounded-full px-6 py-3 cursor-pointer">
          <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Why?</label>
          <div className="text-sm font-semibold text-gray-900 truncate">{occasion}</div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 hidden md:block text-gray-200 group-hover:text-brand-500 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-10 bg-gray-100"></div>

        {/* Budget */}
        <div className="w-full md:flex-1 relative group bg-transparent hover:bg-gray-50 transition-colors rounded-2xl md:rounded-full px-6 py-3 cursor-pointer">
          <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-widest">Budget</label>
          <div className="text-sm font-semibold text-gray-900 truncate">{budget}</div>
        </div>

        {/* Search Button */}
        <div className="w-full md:w-auto p-1 mt-2 md:mt-0">
          <button 
            onClick={() => router.push('/discover')}
            className="w-full md:w-auto h-14 px-8 bg-gray-900 hover:bg-black text-white rounded-2xl md:rounded-full font-medium transition-all shadow-lg shadow-gray-900/20 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 group"
          >
            <Gift className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="text-base tracking-wide">Discover</span>
          </button>
        </div>
      </div>
    </div>
  );
}
