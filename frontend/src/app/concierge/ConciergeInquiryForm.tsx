"use client";

import { useState, useTransition } from "react";
import { submitConcierge } from "@/app/actions/forms";
import { Sparkles, CheckCircle2, Send, Clock, ShieldCheck } from "lucide-react";

export default function ConciergeInquiryForm() {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (formData: FormData) => {
    setErrorMessage(null);
    startTransition(async () => {
      const result = await submitConcierge(formData);
      if (result?.error) {
        setErrorMessage(result.error);
      } else {
        setSubmitted(true);
      }
    });
  };

  return (
    <section id="inquire" className="py-20 bg-[#faf9f6] border-t border-stone-200">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-[#500000] text-xs font-bold uppercase tracking-[0.25em] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            White-Glove Service
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            Book Your Bespoke Concierge
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto font-light text-base">
            Tell us about your recipient, milestone, or corporate requirement. Our master curators will assemble a custom proposal within 24 hours.
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-[2.5rem] p-8 md:p-14 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#500000]/5 rounded-bl-full pointer-events-none"></div>

          {submitted ? (
            <div className="text-center py-16 animate-fade-up">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-200">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl text-gray-900 mb-3" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                Inquiry Received
              </h3>
              <p className="text-gray-500 font-light max-w-md mx-auto mb-8">
                Thank you for entrusting TRISH with your gifting requirements. Your personal concierge is reviewing your request and will reach out promptly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-8 py-3 bg-[#500000] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#3d0000] transition-colors shadow-md"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form action={handleSubmit} className="space-y-6 relative z-10">
              {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-light">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest block mb-2">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    required
                    placeholder="Eleanor"
                    className="w-full px-5 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-gray-900 font-light focus:outline-none focus:border-[#500000] focus:ring-1 focus:ring-[#500000] transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest block mb-2">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    required
                    placeholder="Sterling"
                    className="w-full px-5 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-gray-900 font-light focus:outline-none focus:border-[#500000] focus:ring-1 focus:ring-[#500000] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest block mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="eleanor@sterling.com"
                  className="w-full px-5 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-gray-900 font-light focus:outline-none focus:border-[#500000] focus:ring-1 focus:ring-[#500000] transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-900 uppercase tracking-widest block mb-2">Gifting Requirements & Vision</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Describe the occasion, budget range, recipient's tastes, or any bespoke personalization ideas..."
                  className="w-full px-5 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-gray-900 font-light focus:outline-none focus:border-[#500000] focus:ring-1 focus:ring-[#500000] transition-all resize-none"
                ></textarea>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-400 font-light">
                  <ShieldCheck className="w-4 h-4 text-[#500000]" />
                  <span>Confidential & White-Glove Guaranteed</span>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full sm:w-auto px-10 py-4 bg-[#500000] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#3d0000] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {isPending ? "Submitting Inquiry..." : "Submit Concierge Inquiry"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
