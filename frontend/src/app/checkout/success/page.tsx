"use client";

import Link from "next/link";
import { CheckCircle2, Copy, Gift, Send, Calendar, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function OrderSuccessPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("https://trish.com/reveal/xyz123");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col">
      {/* Minimal Header */}
      <header className="w-full bg-white border-b border-stone-200 h-20 flex items-center justify-center px-4">
        <Link href="/" className="text-3xl text-[#500000] tracking-[0.05em] transform scale-x-[1.15] scale-y-[1.1] font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
          TRISH
        </Link>
      </header>

      <div className="flex-1 container mx-auto px-4 py-12 md:py-20 max-w-3xl flex flex-col items-center animate-fade-up">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-8 border border-green-100 shadow-sm">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl text-gray-900 mb-4 text-center" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
          Gift Sent Successfully
        </h1>
        <p className="text-gray-500 font-light text-center max-w-md mb-2">
          Order #QUM-892410 has been confirmed. We've emailed you the receipt and tracking details.
        </p>

        {/* Digital Reveal Box */}
        <div className="w-full bg-white border border-[#500000]/20 rounded-2xl p-6 md:p-8 mt-10 shadow-sm relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-rose-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#500000]" />
                <h3 className="font-bold text-gray-900 uppercase tracking-widest text-xs">The Digital Reveal</h3>
              </div>
              <h2 className="text-2xl text-gray-900 mb-2" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Build Anticipation</h2>
              <p className="text-sm text-gray-500 font-light">
                Don't wait for delivery. Send them an elegant teaser SMS letting them know a surprise is on the way, without ruining what it is.
              </p>
            </div>

            <div className="w-full md:w-auto flex flex-col gap-3">
              <button className="w-full md:w-auto px-8 py-3.5 bg-[#500000] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#3d0000] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group">
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                Send SMS Teaser
              </button>
              
              <button 
                onClick={handleCopy}
                className="w-full md:w-auto px-8 py-3.5 bg-white border border-stone-200 text-gray-700 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-50 transition-all flex items-center justify-center gap-2"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Link Copied!' : 'Copy Reveal Link'}
              </button>
            </div>
          </div>
        </div>

        {/* Summary Details */}
        <div className="w-full mt-10 bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-medium text-gray-900 mb-6 border-b border-stone-100 pb-4">Delivery Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex gap-3 text-sm">
                <Gift className="w-5 h-5 text-gray-400 shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">The Midnight Velvet Perfume Set</p>
                  <p className="text-gray-500 font-light mt-1">Premium Wrap, Physical Card Included</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3 text-sm">
                <Calendar className="w-5 h-5 text-gray-400 shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Estimated Delivery</p>
                  <p className="text-gray-500 font-light mt-1">Thursday, October 24th</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="mt-12 text-center">
          <Link href="/account" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            View Order in Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}

// Missing Lucide import for Sparkles
import { Sparkles } from "lucide-react";
