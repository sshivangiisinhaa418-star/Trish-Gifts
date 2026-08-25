"use client";

import Link from "next/link";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useState, useTransition } from "react";
import { updatePassword } from "@/app/actions/auth";

export default function ResetPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = await updatePassword(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#faf9f6] px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-[2.5rem] border border-stone-200 shadow-xl">
        <h1 className="text-3xl text-gray-900 mb-2 font-serif" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
          Set New Password
        </h1>
        <p className="text-sm text-gray-500 font-light mb-8 leading-relaxed">
          Please enter your new security password below.
        </p>

        <form action={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-light">
              {error}
            </div>
          )}

          <div>
            <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest block mb-2">
              New Password
            </label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                required 
                placeholder="••••••••" 
                className="w-full pl-6 pr-12 py-3.5 bg-stone-50 text-gray-900 font-medium placeholder:text-gray-400 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:border-[#500000] focus:bg-white focus:ring-1 focus:ring-[#500000] transition-all" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest block mb-2">
              Confirm New Password
            </label>
            <input 
              type="password" 
              name="confirmPassword" 
              required 
              placeholder="••••••••" 
              className="w-full px-6 py-3.5 bg-stone-50 text-gray-900 font-medium placeholder:text-gray-400 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:border-[#500000] focus:bg-white focus:ring-1 focus:ring-[#500000] transition-all" 
            />
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            className="w-full py-4 bg-gray-900 text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-[#500000] transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? 'Updating Password...' : 'Save New Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
