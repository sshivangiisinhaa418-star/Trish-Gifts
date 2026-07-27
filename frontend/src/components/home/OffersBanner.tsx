"use client";

import { Percent, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OffersBanner() {
  return (
    <section className="pt-8 pb-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Offer Card 1 - Dark Premium */}
          <div className="relative overflow-hidden rounded-[2rem] h-[280px] md:h-[320px] group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500">
            {/* Rich Background Image */}
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1607083206968-13611e3d76ba?w=1200&q=80" 
                alt="Premium Offers"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/70 to-transparent"></div>
            </div>
            
            <div className="relative z-10 h-full p-8 md:p-10 flex flex-col justify-center max-w-md">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest mb-4 w-fit border border-white/20">
                <Percent className="w-3 h-3 text-brand-400" />
                Special Offer
              </div>
              
              <h3 className="text-3xl md:text-4xl font-heading font-medium text-white mb-3 leading-tight">
                Get 20% Off <span className="text-brand-300 italic font-light">Premium</span>
              </h3>
              
              <p className="text-gray-300 text-sm md:text-base mb-8 font-light">
                Use code <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded border border-white/30">PREMIUM20</span> at checkout for exclusive luxury gifts.
              </p>
              
              <Link href="/discover" className="flex items-center gap-2 text-sm font-bold text-gray-900 bg-white px-6 py-3 rounded-full hover:bg-gray-100 transition-colors group/btn w-fit">
                Claim Offer
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Offer Card 2 - Rich Accent */}
          <div className="relative overflow-hidden rounded-[2rem] h-[280px] md:h-[320px] group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500">
            {/* Rich Background Image */}
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&q=80" 
                alt="Cashback Offer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-rose-900/95 via-rose-900/70 to-transparent mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-50"></div>
            </div>
            
            <div className="relative z-10 h-full p-8 md:p-10 flex flex-col justify-center max-w-md">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest mb-4 w-fit border border-white/20">
                <Percent className="w-3 h-3 text-rose-300" />
                Wallet Cashback
              </div>
              
              <h3 className="text-3xl md:text-4xl font-heading font-medium text-white mb-3 leading-tight">
                ₹500 TRISH <span className="text-rose-200 italic font-light">Wallet</span>
              </h3>
              
              <p className="text-rose-100/80 text-sm md:text-base mb-8 font-light">
                Valid on all orders above ₹2,999. Credited instantly to your account.
              </p>
              
              <Link href="/discover" className="flex items-center gap-2 text-sm font-bold text-rose-900 bg-white px-6 py-3 rounded-full hover:bg-rose-50 transition-colors group/btn w-fit">
                Know More
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
