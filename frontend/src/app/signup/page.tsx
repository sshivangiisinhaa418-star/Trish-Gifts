"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useTransition, useState } from "react";
import { signup } from "@/app/actions/auth";
import { createBrowserClient } from "@supabase/ssr";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = await signup(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  const handleOAuthLogin = async (provider: 'google' | 'apple') => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

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
            
            <form action={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-light">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] block mb-2 ml-1">First Name</label>
                  <input type="text" name="first_name" required placeholder="Jane" className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:border-[#500000] focus:bg-white focus:ring-1 focus:ring-[#500000] transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] block mb-2 ml-1">Last Name</label>
                  <input type="text" name="last_name" required placeholder="Doe" className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:border-[#500000] focus:bg-white focus:ring-1 focus:ring-[#500000] transition-all" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] block mb-2 ml-1">Email Address</label>
                <input type="email" name="email" required placeholder="name@example.com" className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:border-[#500000] focus:bg-white focus:ring-1 focus:ring-[#500000] transition-all" />
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] block mb-2 ml-1">Password</label>
                <input type="password" name="password" required placeholder="••••••••" className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:border-[#500000] focus:bg-white focus:ring-1 focus:ring-[#500000] transition-all" />
                <p className="text-[10px] text-gray-400 mt-2 font-light ml-1">Must be at least 8 characters long.</p>
              </div>

              <div className="flex items-start gap-3 mt-6">
                <input type="checkbox" name="newsletter" id="newsletter" className="mt-1.5 w-4 h-4 text-[#500000] focus:ring-[#500000] border-gray-300 rounded" />
                <label htmlFor="newsletter" className="text-sm text-gray-500 font-light leading-relaxed">
                  Yes, I want to receive TRISH Concierge updates, exclusive event invitations, and personalized gifting recommendations.
                </label>
              </div>

              <button 
                type="submit" 
                disabled={isPending}
                className="w-full py-4 bg-[#500000] text-white rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-[#3d0000] transition-colors mt-6 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="relative mt-10 mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-400 font-light text-[10px] uppercase tracking-widest">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button type="button" onClick={() => handleOAuthLogin('google')} className="flex items-center justify-center gap-3 px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl hover:bg-stone-100 transition-colors group">
                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                <span className="text-sm font-medium text-gray-700">Google</span>
              </button>
              <button type="button" onClick={() => handleOAuthLogin('apple')} className="flex items-center justify-center gap-3 px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl hover:bg-stone-100 transition-colors group">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.71 3.58-.71 1.06.03 2.62.33 3.53 1.29-2.2 1.29-1.8 4.6 0 5.41-1.01 2.37-2.3 4.88-4.14 6.28zm-3.13-14.73c.48-1.46.03-3.13-.91-4.04-1.28.8-2.67 2.12-2.14 4.09 1.41.25 2.57-1.12 3.05-2.05z"/></svg>
                <span className="text-sm font-medium text-gray-700">Apple</span>
              </button>
            </div>
            
            <p className="mt-8 text-center text-sm text-gray-500 font-light">
              Already have an account? <Link href="/login" className="font-bold text-gray-900 hover:text-[#500000] hover:underline transition-colors">Sign in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
