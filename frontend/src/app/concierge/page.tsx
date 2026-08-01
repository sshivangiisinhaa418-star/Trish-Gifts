"use client";

import { useState, useTransition } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Phone, Mail, Clock, Sparkles, ShieldCheck, CheckCircle2, Award, Gift, Crown, Calendar, Briefcase } from "lucide-react";
import { submitConcierge } from "@/app/actions/forms";

export default function ConciergePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const res = await submitConcierge(formData);
      if (res?.error) {
        alert(res.error);
      } else {
        setSuccess(true);
      }
    });
  };

  const faqs = [
    {
      question: "How long does personalized engraving or custom calligraphy take?",
      answer: "Bespoke engraving and hand-inscribed calligraphic note cards typically add 2 to 3 business days to your order's timeline. Our master artisans inspect every detail under magnification to ensure impeccable symmetry and presentation before dispatch."
    },
    {
      question: "Do you provide international white-glove courier delivery?",
      answer: "Yes. We collaborate exclusively with premier private couriers and temperature-controlled freight partners to deliver curated chests worldwide. All international shipments are discreetly declared, fully insured, and arrive in our intact signature keepsake packaging."
    },
    {
      question: "How does the Private Milestones & Calendar Guardianship work?",
      answer: "Once enrolled with a dedicated concierge, you entrust us with your significant family and social milestones. Three weeks prior to any date, your specialist provides an curated portfolio of three sentiment-tailored recommendations for your simple approval."
    },
    {
      question: "Can we incorporate our executive corporate branding into TRISH gift boxes?",
      answer: "Certainly. Our Corporate Diplomat division designs custom embossed wax seals, engraved wooden plaques, and subtle silk ribbon pantone matching that honors your brand architecture while retaining our unmistakable luxury aesthetic."
    },
    {
      question: "What happens if a recipient needs to exchange a curated gift?",
      answer: "Our concierge team arranges effortless, complimentary door-to-door retrievals for any non-customized items within 30 days of receipt, ensuring the recipient experiences grace and accommodation rather than traditional return friction."
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col font-sans">
      <Header />
      
      <main className="flex-1">
        {/* 1. HERO SECTION: Exquisite Dark Luxury */}
        <section className="relative w-full h-[65vh] min-h-[520px] flex items-center justify-center overflow-hidden bg-gray-950">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1600&q=80"
              alt="TRISH Bespoke Gifting Concierge"
              fill
              className="object-cover opacity-50 scale-105 animate-pulse-slow transition-transform duration-[10000ms]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#500000]/60 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />
          </div>

          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-6 animate-fade-up">
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-amber-300 mb-4 inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Private Client & White-Glove Services <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-light tracking-tight mb-6 leading-none" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              Bespoke Gifting <span className="italic font-normal text-amber-200">Concierge</span>
            </h1>
            <p className="text-base md:text-2xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed mb-10">
              Where unspoken emotions meet clockwork precision. Allow our dedicated specialists to orchestrate your family milestones and executive tributes.
            </p>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
          </div>
        </section>

        {/* 2. THE THREE CONCIERGE DIVISIONS */}
        <section className="py-24 md:py-32 bg-white border-y border-stone-200">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-20">
              <span className="text-xs font-bold text-[#500000] uppercase tracking-[0.3em] mb-3 block">Tailored Excellence</span>
              <h2 className="text-4xl md:text-6xl text-gray-900 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                How Our Concierge Serves You
              </h2>
              <p className="text-gray-500 font-light text-base md:text-lg max-w-2xl mx-auto mt-4">
                We bridge the gap between intention and presentation through three tailored pillars of white-glove service.
              </p>
              <div className="w-16 h-px bg-[#500000] mx-auto mt-8" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
              
              {/* Pillar 1 */}
              <div className="p-8 lg:p-10 rounded-3xl bg-[#faf9f6] border border-stone-200/80 flex flex-col justify-between group hover:border-[#500000]/40 transition-all duration-500 hover:shadow-2xl">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#500000] text-white flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <Calendar className="w-7 h-7 text-amber-300" />
                  </div>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-widest block w-fit mb-4">Milestone Management</span>
                  <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    Calendar Guardianship
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed text-base">
                    Never scramble for a last-minute present again. Entrust us with your family dates and client birthdays; our specialists will present three curated options weeks ahead for simple, one-click approval and seamless dispatch.
                  </p>
                </div>
                <div className="pt-8 border-t border-stone-200/60 mt-8 flex items-center gap-2 text-xs font-bold uppercase text-[#500000] tracking-widest">
                  <CheckCircle2 className="w-4 h-4 text-[#500000]" /> Proactive Reminders Included
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-8 lg:p-10 rounded-3xl bg-[#faf9f6] border border-stone-200/80 flex flex-col justify-between group hover:border-[#500000]/40 transition-all duration-500 hover:shadow-2xl">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#500000] text-white flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <Briefcase className="w-7 h-7 text-amber-300" />
                  </div>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-widest block w-fit mb-4">Corporate Diplomacy</span>
                  <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    Executive & Corporate
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed text-base">
                    Strengthen executive partnerships with customized presentation trunks, artisan preserves, and leather portfolios. We offer volume packaging, tailored brand embossing, and multi-address fulfillment worldwide.
                  </p>
                </div>
                <div className="pt-8 border-t border-stone-200/60 mt-8 flex items-center gap-2 text-xs font-bold uppercase text-[#500000] tracking-widest">
                  <CheckCircle2 className="w-4 h-4 text-[#500000]" /> Bespoke Branding Options
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="p-8 lg:p-10 rounded-3xl bg-[#faf9f6] border border-stone-200/80 flex flex-col justify-between group hover:border-[#500000]/40 transition-all duration-500 hover:shadow-2xl">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#500000] text-white flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <Award className="w-7 h-7 text-amber-300" />
                  </div>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-widest block w-fit mb-4">Artisan Commissions</span>
                  <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    Rare & Bespoke Quests
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed text-base">
                    Have an extraordinary vision that defies conventional catalogues? Our sourcing guild collaborates directly with Florentine glass masters, Grasse perfumers, and high-jewelry ateliers to make your bespoke request reality.
                  </p>
                </div>
                <div className="pt-8 border-t border-stone-200/60 mt-8 flex items-center gap-2 text-xs font-bold uppercase text-[#500000] tracking-widest">
                  <CheckCircle2 className="w-4 h-4 text-[#500000]" /> Global Artisan Sourcing
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. INQUIRY & SPECIALIST PORTAL */}
        <section className="py-24 md:py-36 bg-[#faf9f6] relative">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
              
              {/* Left Column: Direct Inquiry Form */}
              <div className="lg:col-span-7">
                <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] border border-stone-200 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)]">
                  <div className="mb-10">
                    <span className="text-[11px] font-bold text-[#500000] uppercase tracking-[0.25em] block mb-2">Initiate A Consultation</span>
                    <h2 className="text-3xl md:text-5xl text-gray-900 font-light leading-tight" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                      Connect With A Specialist
                    </h2>
                    <p className="text-gray-500 font-light text-base md:text-lg mt-3">
                      Share your celebration goals or corporate requirements below. A dedicated concierge will review your parameters within two hours.
                    </p>
                  </div>

                  {success ? (
                    <div className="bg-green-50 border border-green-200 text-green-800 p-10 text-center rounded-3xl my-6 animate-fade-up">
                      <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-medium mb-2" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Inquiry Received with Honor</h3>
                      <p className="font-light text-green-700 text-sm md:text-base max-w-md mx-auto">
                        Thank you for confiding in TRISH Concierge. Your dedicated gifting specialist is reviewing your notes and will reach out shortly.
                      </p>
                      <button 
                        onClick={() => setSuccess(false)}
                        className="mt-8 px-6 py-2.5 bg-green-700 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-green-800 transition-colors"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form action={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="text-[11px] font-bold text-gray-800 uppercase tracking-[0.15em] block mb-2 ml-1">First Name <span className="text-[#500000]">*</span></label>
                          <input 
                            type="text" 
                            name="first_name" 
                            required 
                            className="w-full px-5 py-4 bg-stone-50 border border-stone-200 text-gray-900 font-medium rounded-2xl text-sm focus:outline-none focus:border-[#500000] focus:bg-white focus:ring-1 focus:ring-[#500000] transition-all placeholder:text-gray-400 caret-[#500000]" 
                            placeholder="e.g. Eleanor" 
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-gray-800 uppercase tracking-[0.15em] block mb-2 ml-1">Last Name <span className="text-[#500000]">*</span></label>
                          <input 
                            type="text" 
                            name="last_name" 
                            required 
                            className="w-full px-5 py-4 bg-stone-50 border border-stone-200 text-gray-900 font-medium rounded-2xl text-sm focus:outline-none focus:border-[#500000] focus:bg-white focus:ring-1 focus:ring-[#500000] transition-all placeholder:text-gray-400 caret-[#500000]" 
                            placeholder="e.g. Vance" 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-gray-800 uppercase tracking-[0.15em] block mb-2 ml-1">Email Address <span className="text-[#500000]">*</span></label>
                        <input 
                          type="email" 
                          name="email" 
                          required 
                          className="w-full px-5 py-4 bg-stone-50 border border-stone-200 text-gray-900 font-medium rounded-2xl text-sm focus:outline-none focus:border-[#500000] focus:bg-white focus:ring-1 focus:ring-[#500000] transition-all placeholder:text-gray-400 caret-[#500000]" 
                          placeholder="name@executive.com" 
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="text-[11px] font-bold text-gray-800 uppercase tracking-[0.15em] block mb-2 ml-1">Inquiry Type</label>
                          <select 
                            name="type" 
                            className="w-full px-5 py-4 bg-stone-50 border border-stone-200 text-gray-900 font-medium rounded-2xl text-sm focus:outline-none focus:border-[#500000] focus:bg-white focus:ring-1 focus:ring-[#500000] transition-all"
                          >
                            <option value="Bespoke Milestone Curation">Bespoke Milestone Curation</option>
                            <option value="Corporate Executive Gifting">Corporate Executive Gifting</option>
                            <option value="Calendar Guardianship Enrollment">Calendar Guardianship Enrollment</option>
                            <option value="International White-Glove Shipping">International White-Glove Shipping</option>
                            <option value="General Concierge Assistance">General Concierge Assistance</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-gray-800 uppercase tracking-[0.15em] block mb-2 ml-1">Estimated Budget (Optional)</label>
                          <input 
                            type="text" 
                            name="budget" 
                            className="w-full px-5 py-4 bg-stone-50 border border-stone-200 text-gray-900 font-medium rounded-2xl text-sm focus:outline-none focus:border-[#500000] focus:bg-white focus:ring-1 focus:ring-[#500000] transition-all placeholder:text-gray-400 caret-[#500000]" 
                            placeholder="e.g. $500 - $5,000" 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-gray-800 uppercase tracking-[0.15em] block mb-2 ml-1">Occasion Details & Requirements <span className="text-[#500000]">*</span></label>
                        <textarea 
                          name="message" 
                          required 
                          rows={5} 
                          className="w-full px-5 py-4 bg-stone-50 border border-stone-200 text-gray-900 font-medium rounded-2xl text-sm focus:outline-none focus:border-[#500000] focus:bg-white focus:ring-1 focus:ring-[#500000] transition-all placeholder:text-gray-400 caret-[#500000] resize-none leading-relaxed" 
                          placeholder="Please tell us about the recipient, the emotion or celebration you wish to evoke, preferred dates of delivery, or any aesthetic notes..."
                        ></textarea>
                      </div>

                      <button 
                        type="submit" 
                        disabled={isPending} 
                        className="w-full py-4 bg-[#500000] text-white font-bold rounded-2xl hover:bg-[#600000] transition-all duration-300 shadow-xl hover:-translate-y-0.5 text-sm uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                      >
                        {isPending ? 'Transmiting to Guild...' : 'Send Direct Consultation Request →'}
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Right Column: Private Contact Details & Guarantee */}
              <div className="lg:col-span-5 space-y-8">
                
                {/* Contact Card */}
                <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-8">
                  <div className="flex items-center gap-3 pb-6 border-b border-stone-100">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200/50">
                      <Crown className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Direct Specialist Bureau</h3>
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mt-0.5">Priority Dispatch</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#500000]/5 text-[#500000] flex items-center justify-center shrink-0 mt-0.5">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">Concierge Telephone</span>
                        <p className="text-gray-900 font-semibold text-lg mt-0.5">+1 (800) 555-0199</p>
                        <span className="text-xs text-green-600 font-medium block mt-1">● Lines Active for Immediate Counsel</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#500000]/5 text-[#500000] flex items-center justify-center shrink-0 mt-0.5">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">Direct Guild Email</span>
                        <p className="text-gray-900 font-semibold text-base mt-0.5">concierge@trish.com</p>
                        <span className="text-xs text-gray-500 font-light block mt-1">Average response within 90 minutes</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#500000]/5 text-[#500000] flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">Hours of Operation</span>
                        <p className="text-gray-900 font-semibold text-base mt-0.5">Mon – Sat: 8:00 AM – 10:00 PM EST</p>
                        <span className="text-xs text-gray-500 font-light block mt-1">Global on-call emergency dispatch available for enrolled accounts</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* The TRISH Concierge Pledge */}
                <div className="p-8 rounded-3xl bg-gradient-to-br from-[#2a0000] to-gray-950 text-white relative overflow-hidden shadow-xl border border-[#500000]/30">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-widest">
                      <ShieldCheck className="w-4 h-4 text-amber-300" /> The Guild Covenant
                    </div>
                    <h4 className="text-2xl font-light text-white" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                      Absolute Confidentiality & Grace
                    </h4>
                    <p className="text-gray-300 font-light text-sm leading-relaxed">
                      All communications, recipient addresses, and gift itineraries handled by TRISH Concierge are protected by absolute confidentiality. We treat every delivery with the reverence of a personal family heirloom.
                    </p>
                    <div className="pt-2">
                      <span className="text-[11px] text-amber-200 font-medium uppercase tracking-wider block">— Signed, Master Concierge Guild</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 4. FREQUENTLY ASKED QUESTIONS (Accordion) */}
        <section className="py-24 bg-white border-t border-stone-200">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-[#500000] uppercase tracking-[0.3em] mb-3 block">Clarity & Assurance</span>
              <h2 className="text-4xl md:text-5xl text-gray-900 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                Frequently Asked Inquiries
              </h2>
              <p className="text-gray-500 font-light mt-2">Answers regarding white-glove transport, custom calligraphy, and corporate diplomacy.</p>
              <div className="w-12 h-px bg-[#500000] mx-auto mt-6" />
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                    openFaq === index ? 'bg-[#faf9f6] border-[#500000]/30 shadow-md' : 'bg-white border-stone-200 hover:border-gray-400'
                  }`}
                >
                  <button
                    type="button"
                    className="w-full p-6 sm:p-7 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className={`text-lg md:text-xl font-medium pr-6 transition-colors ${
                      openFaq === index ? 'text-[#500000]' : 'text-gray-900 group-hover:text-[#500000]'
                    }`} style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                      {faq.question}
                    </span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      openFaq === index ? 'bg-[#500000] text-white rotate-180' : 'bg-stone-100 text-gray-500 group-hover:bg-[#500000]/10 group-hover:text-[#500000]'
                    }`}>
                      {openFaq === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  
                  <div 
                    className={`transition-all duration-500 ease-in-out px-6 sm:px-7 ${
                      openFaq === index ? 'max-h-96 pb-7 opacity-100' : 'max-h-0 pb-0 opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="w-full h-px bg-stone-200 mb-4" />
                    <p className="text-gray-600 font-light leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 rounded-3xl bg-[#faf9f6] border border-stone-200 text-center space-y-4">
              <h3 className="text-2xl text-gray-900 font-medium" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Have a question not addressed here?</h3>
              <p className="text-gray-500 font-light text-sm max-w-lg mx-auto">Our specialists are on standby to discuss unusual dimensions, custom floral pairings, or international export customs.</p>
              <div className="pt-2">
                <a 
                  href="tel:18005550199" 
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gray-900 text-white font-semibold rounded-full hover:bg-[#500000] transition-colors text-xs uppercase tracking-widest shadow-md"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Concierge Directly
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 5. FOOTER CALL TO ACTION */}
        <section className="py-24 bg-gradient-to-br from-[#2a0000] to-gray-900 text-white text-center px-4 relative">
          <div className="container mx-auto max-w-4xl relative z-10">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-300 mb-3 block">Ready To Explore?</span>
            <h2 className="text-4xl md:text-6xl font-light mb-6" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              Prefer Our Curated Gift Collections?
            </h2>
            <p className="text-gray-300 font-light max-w-xl mx-auto mb-10 text-base md:text-lg">
              Explore our ready-to-deliver artisan boxes and sentiment collections in our master catalog, crafted with the same uncompromising elegance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/discover"
                className="w-full sm:w-auto px-10 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-amber-50 hover:text-[#500000] transition-all duration-300 shadow-xl text-sm uppercase tracking-widest"
              >
                Browse Gift Catalog
              </Link>
              <Link
                href="/heritage"
                className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-white/40 text-white font-bold rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 text-sm uppercase tracking-widest"
              >
                Discover Our Heritage
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
