"use client";

import Link from "next/link";
import { Building2, Briefcase, Award, Users, ArrowRight } from "lucide-react";
import GlobalNav from "@/components/layout/GlobalNav";

export default function CorporateGiftingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full bg-white border-b border-gray-100 hidden lg:block relative z-40">
        <GlobalNav />
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=2000')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center text-white">
          <span className="text-xs font-bold text-brand-300 uppercase tracking-[0.2em] mb-4 block">B2B Solutions</span>
          <h1 className="text-5xl md:text-7xl font-light mb-6" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Corporate Gifting</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light mb-10 leading-relaxed">
            Elevate your brand with premium, intent-based gifting solutions for employees, clients, and partners. Because a corporate gift should still feel personal.
          </p>
          <button className="px-10 py-4 bg-white text-gray-900 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-50 transition-colors shadow-xl">
            Request a Catalog
          </button>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-[#faf9f6]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-stone-200 text-[#500000]">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Client Appreciation</h3>
              <p className="text-gray-500 font-light text-sm">Strengthen professional relationships with luxurious, personalized gifts that leave a lasting impression.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-stone-200 text-[#500000]">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Employee Recognition</h3>
              <p className="text-gray-500 font-light text-sm">Celebrate milestones, work anniversaries, and outstanding performance with meaningful rewards.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-stone-200 text-[#500000]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Event & Swag Kits</h3>
              <p className="text-gray-500 font-light text-sm">Curated gift boxes for virtual offsites, conferences, and new-hire onboarding.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Contact Our Concierge</h2>
            <p className="text-gray-500 font-light">Fill out the form below and a dedicated gifting specialist will be in touch within 24 hours.</p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">First Name</label>
                <input type="text" className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg text-sm font-light focus:outline-none focus:border-gray-900" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Last Name</label>
                <input type="text" className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg text-sm font-light focus:outline-none focus:border-gray-900" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Company Name</label>
              <input type="text" className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg text-sm font-light focus:outline-none focus:border-gray-900" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Estimated Budget & Details</label>
              <textarea className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg text-sm font-light focus:outline-none focus:border-gray-900 h-32 resize-none" placeholder="Tell us about your gifting needs..."></textarea>
            </div>
            <button type="button" className="w-full py-4 bg-[#500000] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#3d0000] transition-all">
              Submit Inquiry
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
