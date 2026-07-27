"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Plus, Minus, Phone, Mail, Clock } from "lucide-react";

export default function ConciergePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "How long does personalized engraving take?",
      answer: "Bespoke engraving and personalization typically add 2-3 business days to your order's processing time. Our master artisans ensure every detail meets the TRISH standard of excellence before dispatch."
    },
    {
      question: "Do you offer international white-glove delivery?",
      answer: "Yes, we partner with premier international couriers to deliver our curated gifts worldwide. All international shipments are fully insured and include our signature unboxing experience."
    },
    {
      question: "Can I include a handwritten note?",
      answer: "Absolutely. During checkout, you may provide a message up to 250 words. It will be transcribed by our resident calligrapher on heavy-stock archival paper and sealed with the TRISH wax stamp."
    },
    {
      question: "What is your return policy on curated gifts?",
      answer: "We accept returns on all non-personalized items within 30 days of receipt, provided they remain in their original, immaculate condition and packaging. Personalized or bespoke items are final sale."
    },
    {
      question: "Do you assist with corporate gifting?",
      answer: "Yes, our dedicated Corporate Concierge team specializes in curating memorable gifts for clients, partners, and teams. We offer volume pricing and bespoke branding options."
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1600&q=80" // Elegant desk / concierge style image
              alt="TRISH Concierge"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="relative z-10 text-center px-4">
            <span className="uppercase tracking-[0.3em] text-xs font-bold mb-4 block text-[#E2C792]">At Your Service</span>
            <h1 className="text-4xl md:text-6xl text-white font-light tracking-wide drop-shadow-md" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              Private Concierge
            </h1>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
              
              {/* Left Side: Contact Form & Details */}
              <div className="w-full lg:w-1/2">
                <div className="mb-12">
                  <h2 className="text-3xl text-gray-900 mb-4 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    Direct Inquiry
                  </h2>
                  <p className="text-gray-500 font-light leading-relaxed">
                    Whether you are seeking advice for a milestone anniversary or require assistance tracking an international shipment, our Concierge team is at your complete disposal.
                  </p>
                </div>

                <form className="space-y-8 mb-16" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 border-b border-gray-200 pb-2">
                      <label className="text-xs font-bold tracking-widest text-gray-400 uppercase block">First Name</label>
                      <input type="text" className="w-full bg-transparent border-none focus:ring-0 p-0 text-gray-900 font-light placeholder:text-gray-300" placeholder="Jane" />
                    </div>
                    <div className="space-y-2 border-b border-gray-200 pb-2">
                      <label className="text-xs font-bold tracking-widest text-gray-400 uppercase block">Last Name</label>
                      <input type="text" className="w-full bg-transparent border-none focus:ring-0 p-0 text-gray-900 font-light placeholder:text-gray-300" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2 border-b border-gray-200 pb-2">
                    <label className="text-xs font-bold tracking-widest text-gray-400 uppercase block">Email Address</label>
                    <input type="email" className="w-full bg-transparent border-none focus:ring-0 p-0 text-gray-900 font-light placeholder:text-gray-300" placeholder="jane@example.com" />
                  </div>

                  <div className="space-y-2 border-b border-gray-200 pb-2">
                    <label className="text-xs font-bold tracking-widest text-gray-400 uppercase block">Inquiry Type</label>
                    <select className="w-full bg-transparent border-none focus:ring-0 p-0 text-gray-900 font-light appearance-none">
                      <option>Order Status & Tracking</option>
                      <option>Gifting Advice</option>
                      <option>Corporate Gifting</option>
                      <option>Returns & Exchanges</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-2 border-b border-gray-200 pb-2">
                    <label className="text-xs font-bold tracking-widest text-gray-400 uppercase block">Message</label>
                    <textarea rows={4} className="w-full bg-transparent border-none focus:ring-0 p-0 text-gray-900 font-light placeholder:text-gray-300 resize-none" placeholder="How may we assist you today?"></textarea>
                  </div>

                  <button type="submit" className="px-10 py-4 bg-[#500000] text-white text-xs font-bold tracking-widest uppercase hover:bg-gray-900 transition-colors duration-300">
                    Send Message
                  </button>
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-gray-100">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-4 text-[#500000]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold tracking-widest text-gray-900 uppercase mb-2">Phone</h4>
                    <p className="text-gray-500 font-light text-sm">+1 (800) 555-0199</p>
                  </div>
                  <div>
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-4 text-[#500000]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold tracking-widest text-gray-900 uppercase mb-2">Email</h4>
                    <p className="text-gray-500 font-light text-sm">concierge@trish.com</p>
                  </div>
                  <div>
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-4 text-[#500000]">
                      <Clock className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold tracking-widest text-gray-900 uppercase mb-2">Hours</h4>
                    <p className="text-gray-500 font-light text-sm">Mon-Fri: 9am - 8pm EST</p>
                  </div>
                </div>
              </div>

              {/* Right Side: FAQs */}
              <div className="w-full lg:w-1/2 lg:pl-12">
                <div className="mb-12">
                  <h2 className="text-3xl text-gray-900 mb-4 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    Frequently Asked Questions
                  </h2>
                  <p className="text-gray-500 font-light leading-relaxed">
                    Immediate answers to our most common inquiries regarding shipping, personalization, and returns.
                  </p>
                </div>

                <div className="space-y-2">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200">
                      <button
                        className="w-full py-6 flex items-center justify-between text-left group"
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      >
                        <span className={`text-lg font-light pr-8 transition-colors ${openFaq === index ? 'text-[#500000]' : 'text-gray-900 group-hover:text-[#500000]'}`}>
                          {faq.question}
                        </span>
                        <span className="text-gray-400 flex-shrink-0">
                          {openFaq === index ? (
                            <Minus className="w-5 h-5" />
                          ) : (
                            <Plus className="w-5 h-5" />
                          )}
                        </span>
                      </button>
                      
                      <div 
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
                      >
                        <p className="text-gray-500 font-light leading-relaxed pr-8">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 p-8 bg-[#faf9f6] border border-gray-100 text-center">
                  <h3 className="text-xl text-gray-900 mb-3 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Need something else?</h3>
                  <p className="text-gray-500 font-light text-sm mb-6">Our specialists are standing by to assist with any unique requests.</p>
                  <button className="px-8 py-3 border border-gray-900 text-gray-900 text-xs font-bold tracking-widest uppercase hover:bg-gray-900 hover:text-white transition-colors duration-300">
                    Live Chat Now
                  </button>
                </div>

              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
