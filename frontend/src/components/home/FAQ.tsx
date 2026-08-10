"use client";

import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does the AI Gift Curator work?",
      answer: "Our AI Curator asks you a few simple questions about the recipient, the occasion, and your budget. It then analyzes our entire catalog to recommend the most thoughtful, relevant gifts tailored specifically to your needs."
    },
    {
      question: "Can I include a personal message with my gift?",
      answer: "Absolutely. During checkout, you can add a personalized note which we will handwrite or elegantly print on our premium signature TRISH cards, completely free of charge."
    },
    {
      question: "What is the Bespoke Gifting Experience?",
      answer: "Our Bespoke service connects you with a dedicated gifting assistant to curate a one-of-a-kind gift basket from scratch. This premium service ensures every detail, from product selection to the final presentation, is tailored to your exact vision."
    },
    {
      question: "Do you offer same-day delivery?",
      answer: "Yes! We offer express same-day delivery for select items and locations if ordered before 2 PM local time. Look for the 'Same-Day' badge while shopping."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-stone-50 to-white relative overflow-hidden">
      
      {/* Decorative background element */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-rose-50 rounded-full blur-[100px] opacity-70 pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-sm border border-gray-100 mb-6">
            <MessageCircleQuestion className="w-6 h-6 text-[#500000]" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light mb-4 text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 font-light text-base md:text-lg">
            Everything you need to know about the TRISH experience.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-white border rounded-[2rem] overflow-hidden transition-all duration-500 ${
                openIndex === index 
                  ? 'border-rose-200 shadow-[0_20px_40px_-15px_rgba(80,0,0,0.05)]' 
                  : 'border-gray-100 shadow-sm hover:border-rose-100 hover:shadow-md'
              }`}
            >
              <button
                className="w-full px-8 py-6 md:py-8 flex items-center justify-between text-left focus:outline-none group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`font-heading text-xl md:text-2xl transition-colors duration-300 pr-8 ${openIndex === index ? 'text-[#500000]' : 'text-gray-900 group-hover:text-[#500000]'}`} style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                  {faq.question}
                </span>
                <span className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${openIndex === index ? 'bg-rose-50' : 'bg-gray-50 group-hover:bg-rose-50'}`}>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 transition-transform duration-500 ${openIndex === index ? 'rotate-180 text-[#500000]' : ''}`} 
                  />
                </span>
              </button>
              
              <div 
                className={`px-8 overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-48 pb-8 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="w-full h-px bg-gradient-to-r from-rose-100 to-transparent mb-6"></div>
                <p className="text-gray-500 font-light text-base md:text-lg leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
