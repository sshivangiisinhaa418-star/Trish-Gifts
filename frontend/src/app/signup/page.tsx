"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative flex overflow-hidden bg-[#faf9f6]">
      
      {/* Background Layer: Slanted Image on the Left */}
      <div className="hidden lg:block absolute left-0 top-0 w-[55%] h-full z-0" 
           style={{ clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0% 100%)' }}>
        <Image
          src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1600&q=80"
          alt="Premium Gifting Experience"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent mix-blend-multiply" />
        
        <div className="absolute top-8 left-8 sm:left-12">
          <Link href="/" className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors drop-shadow-md">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
        
        <div className="absolute bottom-16 left-12 right-24 text-white">
          <p className="text-3xl font-light mb-4 leading-snug drop-shadow-lg" style={{ fontFamily: 'var(--font-cormorant), serif' }}>"Gifting is an art form. Join TRISH to master it."</p>
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Column Spacer */}
        <div className="hidden lg:block w-1/2"></div>
        
        {/* Right Column: Form inside a beautiful floating card */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-8 py-12 lg:py-0">
          
          {/* Mobile Back Button */}
          <Link href="/" className="lg:hidden absolute top-8 left-8 sm:left-12 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors z-20">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          {/* Premium Card Border */}
          <div className="w-full max-w-lg bg-white/95 backdrop-blur-2xl p-10 md:p-12 rounded-[2.5rem] border border-white/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] transition-shadow duration-500 animate-fade-up">
            
            <h1 className="text-4xl text-gray-900 mb-2 mt-4 lg:mt-0" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Create an Account</h1>
            <p className="text-gray-500 font-light mb-10">Join TRISH to manage your bespoke gifting calendar and enjoy exclusive concierge privileges.</p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] block mb-2 ml-1">First Name</label>
                  <input type="text" required placeholder="Jane" className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:border-[#500000] focus:bg-white focus:ring-1 focus:ring-[#500000] transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] block mb-2 ml-1">Last Name</label>
                  <input type="text" required placeholder="Doe" className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:border-[#500000] focus:bg-white focus:ring-1 focus:ring-[#500000] transition-all" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] block mb-2 ml-1">Email Address</label>
                <input type="email" required placeholder="name@example.com" className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:border-[#500000] focus:bg-white focus:ring-1 focus:ring-[#500000] transition-all" />
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] block mb-2 ml-1">Password</label>
                <input type="password" required placeholder="••••••••" className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:border-[#500000] focus:bg-white focus:ring-1 focus:ring-[#500000] transition-all" />
                <p className="text-[10px] text-gray-400 mt-2 font-light ml-1">Must be at least 8 characters long.</p>
              </div>

              <div className="flex items-start gap-3 mt-6">
                <input type="checkbox" id="newsletter" className="mt-1.5 w-4 h-4 text-[#500000] focus:ring-[#500000] border-gray-300 rounded" />
                <label htmlFor="newsletter" className="text-sm text-gray-500 font-light leading-relaxed">
                  Yes, I want to receive TRISH Concierge updates, exclusive event invitations, and personalized gifting recommendations.
                </label>
              </div>

              <button 
                type="button" 
                onClick={() => router.push('/')}
                className="w-full py-4 bg-[#500000] text-white rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-[#3d0000] transition-colors mt-6 shadow-lg hover:shadow-xl"
              >
                Create Account
              </button>
            </form>
            
            <p className="mt-8 text-center text-sm text-gray-500 font-light">
              Already have an account? <Link href="/login" className="font-bold text-gray-900 hover:text-[#500000] hover:underline transition-colors">Sign in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
