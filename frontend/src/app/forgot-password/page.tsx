"use client";

import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { requestPasswordReset } from "@/app/actions/auth";

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = await requestPasswordReset(formData);
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSuccess(true);
      }
    });
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#faf9f6] px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-[2.5rem] border border-stone-200 shadow-xl">
        <Link href="/login" className="inline-flex items-center text-xs text-gray-500 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Sign In
        </Link>

        <h1 className="text-3xl text-gray-900 mb-2 font-serif" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
          Reset Password
        </h1>
        <p className="text-sm text-gray-500 font-light mb-8 leading-relaxed">
          Enter your account email address and we'll send you a link to reset your password.
        </p>

        {success ? (
          <div className="p-6 bg-green-50 border border-green-200 rounded-2xl text-center space-y-3">
            <CheckCircle className="w-10 h-10 text-green-600 mx-auto" />
            <h3 className="text-base font-bold text-green-900">Check Your Email</h3>
            <p className="text-xs text-green-700 font-light leading-relaxed">
              We've dispatched a password reset link to your email address. Please check your inbox and click the link to proceed.
            </p>
            <div className="pt-2">
              <Link href="/login" className="text-xs font-bold text-[#500000] underline">Return to Sign In</Link>
            </div>
          </div>
        ) : (
          <form action={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-light">
                {error}
              </div>
            )}

            <div>
              <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest block mb-2">
                Email Address
              </label>
              <div className="relative">
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="name@example.com" 
                  className="w-full pl-11 pr-4 py-3.5 bg-stone-50 text-gray-900 font-medium placeholder:text-gray-400 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:border-[#500000] focus:bg-white focus:ring-1 focus:ring-[#500000] transition-all" 
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isPending}
              className="w-full py-4 bg-gray-900 text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-[#500000] transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ? 'Sending Link...' : 'Send Reset Link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
