"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useTransition, useState, useEffect } from "react";
import { login } from "@/app/actions/auth";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [redirectTo, setRedirectTo] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRedirectTo(params.get("redirectTo") || "");
  }, []);

  const handleSubmit = (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  const handleOAuthLogin = async (provider: 'google') => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback${redirectTo ? `?next=${encodeURIComponent(redirectTo)}` : ''}`,
        },
      });
      if (error) {
        setError(error.message);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during login.");
    }
  };

  return (
    <div className="min-h-screen relative flex overflow-hidden bg-[#faf9f6]">
      
      {/* Background Layer: Slanted Image on the Right */}
      <div className="hidden lg:block absolute right-0 top-0 w-[55%] h-full z-0" 
           style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}>
        <Image
          src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=1600&q=80"
          alt="Luxury Gift Unboxing"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent mix-blend-multiply" />
        <div className="absolute bottom-16 right-16 text-white max-w-md text-right">
          <p className="text-3xl font-light mb-2 drop-shadow-lg" style={{ fontFamily: 'var(--font-cormorant), serif' }}>"The anticipation is half the gift."</p>
          <p className="text-sm font-light text-white/80 drop-shadow-md">— The TRISH Concierge</p>
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Column: Form inside a beautiful floating card */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-8 py-12 lg:py-0">
          

          
          {/* Premium Card Border */}
          <div className="w-full max-w-lg bg-white/95 backdrop-blur-2xl p-10 md:p-12 rounded-[2.5rem] border border-white/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] transition-shadow duration-500 animate-fade-up">
            
            <h1 className="text-4xl text-gray-900 mb-2" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Welcome Back</h1>
            <p className="text-gray-500 font-light mb-10">Sign in to access your bespoke gifting dashboard and concierge services.</p>
            
            <form action={handleSubmit} className="space-y-6">
              {redirectTo && <input type="hidden" name="redirectTo" value={redirectTo} />}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-light">
                  {error}
                </div>
              )}
              <div>
                <label className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] block mb-2 ml-1">Email Address</label>
                <input type="email" name="email" required placeholder="name@example.com" className="w-full px-6 py-4 bg-stone-50 text-gray-900 font-medium placeholder:text-gray-400 caret-[#500000] border border-stone-200 rounded-2xl text-sm focus:outline-none focus:border-[#500000] focus:bg-white focus:ring-1 focus:ring-[#500000] transition-all" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2 ml-1">
                  <label className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em]">Password</label>
                  <Link href="/concierge" className="text-xs text-[#500000] hover:underline font-medium">Forgot Password?</Link>
                </div>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password" 
                    required 
                    placeholder="••••••••" 
                    className="w-full pl-6 pr-14 py-4 bg-stone-50 text-gray-900 font-medium placeholder:text-gray-400 caret-[#500000] border border-stone-200 rounded-2xl text-sm focus:outline-none focus:border-[#500000] focus:bg-white focus:ring-1 focus:ring-[#500000] transition-all" 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none p-1 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="mt-3 ml-1 flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#500000] focus:ring-[#500000] cursor-pointer" />
                    <span className="text-xs text-gray-600 font-medium">Remember me</span>
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isPending}
                className="w-full py-4 bg-gray-900 text-white rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-[#500000] transition-colors mt-6 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? 'Signing in...' : 'Sign In'}
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

            <div>
              <button type="button" onClick={() => handleOAuthLogin('google')} className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl hover:bg-stone-100 hover:border-gray-300 transition-all shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                <span className="text-sm font-medium text-gray-800">Continue with Google</span>
              </button>
            </div>
            
            <p className="mt-8 text-center text-sm text-gray-500 font-light">
              Don't have an account? <Link href={`/signup${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`} className="font-bold text-gray-900 hover:text-[#500000] hover:underline transition-colors">Create one here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
