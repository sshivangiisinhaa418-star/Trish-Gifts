"use client";

import Link from "next/link";
import { Search, Sparkles, Crown } from "lucide-react";

export default function OurServices() {
  const services = [
    {
      title: "Explore Gifts",
      description: "Discover thoughtfully curated gifts designed for every occasion, relationship, and celebration. Browse through our collections, explore different price ranges, and find a gift that perfectly matches the moment.",
      icon: <Search className="w-8 h-8 text-[#500000]" />,
      link: "/discover",
      linkText: "Explore Collection"
    },
    {
      title: "AI Gift Curator",
      description: "Looking for help choosing the right gift? Our AI-powered gifting assistant understands your preferences, occasion, relationship, and budget to recommend thoughtful options tailored to your needs. Simply share your requirements, and we'll curate suggestions that make gifting effortless.",
      icon: <Sparkles className="w-8 h-8 text-[#500000]" />,
      link: "/gift-finder",
      linkText: "Chat with AI"
    },
    {
      title: "Bespoke Experience",
      description: "For those who want a completely personalised gifting journey, our dedicated gifting assistants work with you to create a one-of-a-kind gift basket. From selecting the right products to perfecting the final presentation, every detail is curated around your vision.",
      icon: <Crown className="w-8 h-8 text-[#500000]" />,
      link: "/concierge#inquire",
      linkText: "Premium Customisation"
    }
  ];

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-50 border border-stone-200 text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light mb-6 text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            Levels of Curation
          </h2>
          <p className="text-gray-500 text-base md:text-lg font-light leading-relaxed">
            At TRISH, we believe every gift should feel personal. Whether you are looking for inspiration or a completely bespoke experience, we offer different levels of curation to help you find the perfect expression of thoughtfulness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div key={i} className="group relative bg-white rounded-[2rem] p-10 transition-all duration-500 hover:-translate-y-1 flex flex-col h-full border border-gray-100 hover:border-transparent hover:shadow-[0_20px_40px_-15px_rgba(80,0,0,0.1)] z-10 overflow-hidden">
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-rose-50/0 to-rose-50/0 group-hover:from-rose-50/50 group-hover:to-transparent transition-colors duration-500 -z-10"></div>
              
              <div className="w-16 h-16 rounded-[1.25rem] bg-stone-50 flex items-center justify-center mb-8 shadow-sm border border-stone-100 group-hover:scale-110 group-hover:bg-rose-50 group-hover:border-rose-100 transition-all duration-500">
                {service.icon}
              </div>
              <h3 className="text-2xl font-heading font-medium mb-4 text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>{service.title}</h3>
              <p className="text-gray-500 font-light text-sm leading-relaxed mb-8 flex-1">
                {service.description}
              </p>
              
              <div className="mt-auto">
                <div className="w-full h-px bg-gray-100 mb-6 group-hover:bg-rose-100 transition-colors duration-500"></div>
                <Link 
                  href={service.link}
                  className="inline-flex items-center justify-between w-full text-gray-900 font-bold uppercase tracking-widest text-[10px] hover:text-[#500000] transition-colors group/btn"
                >
                  {service.linkText}
                  <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover/btn:bg-rose-100 transition-colors">
                    <span className="text-lg font-light">→</span>
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
