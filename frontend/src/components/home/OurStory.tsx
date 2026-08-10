"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Link as LinkIcon, Star, HandHeart } from "lucide-react";

export default function OurStory() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-stone-50 text-gray-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-rose-50/50 rounded-l-full blur-3xl -z-10 transform translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Story Intro */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-100 text-[#500000] text-xs font-bold uppercase tracking-[0.3em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#500000] animate-pulse"></span>
            Our Story
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light mb-8 leading-tight tracking-tight" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            At TRISH, we believe every meaningful gift begins with <span className="italic text-[#500000]">intention.</span>
          </h2>
          <div className="space-y-4 text-gray-600 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto">
            <p>
              Created to elevate the experience of giving, we move beyond ordinary gifting by curating pieces that reflect emotion, thoughtfulness, and genuine connection. Every detail, from the selection to the presentation, is designed to transform a simple gesture into a lasting memory.
            </p>
            <p className="font-medium text-gray-900 italic text-xl mt-6">
              "Because the most memorable gifts aren't measured by their value, but by how they make someone feel."
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-center mb-10 text-[#500000]">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Heart className="w-6 h-6 text-[#500000]" />,
                title: "Thoughtful by Design",
                desc: "Every gift is curated with meticulous care and profound purpose."
              },
              {
                icon: <LinkIcon className="w-6 h-6 text-[#500000]" />,
                title: "Meaningful Connections",
                desc: "We believe the absolute best gifts strengthen relationships."
              },
              {
                icon: <Star className="w-6 h-6 text-[#500000]" />,
                title: "Uncompromising Quality",
                desc: "From our products to our packaging, every single detail matters."
              },
              {
                icon: <HandHeart className="w-6 h-6 text-[#500000]" />,
                title: "Personal Touch",
                desc: "Every order is handled with the personalized attention it deserves."
              }
            ].map((value, i) => (
              <div key={i} className="group bg-white p-8 rounded-[1.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50/0 to-rose-50/0 group-hover:from-rose-50/50 group-hover:to-transparent transition-colors duration-500"></div>
                <div className="relative z-10">
                  <div className="bg-rose-50/80 w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-inner border border-rose-100 group-hover:scale-110 transition-transform duration-500">
                    {value.icon}
                  </div>
                  <h4 className="text-lg font-heading font-semibold mb-3 text-gray-900">{value.title}</h4>
                  <p className="text-gray-500 font-light text-sm leading-relaxed">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Thoughtfully Presented */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 lg:order-1 relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-xl group">
            <img 
              src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&q=80" 
              alt="Thoughtful Presentation"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <span className="text-rose-200 text-xs font-bold uppercase tracking-widest mb-2 block">The Art of Gifting</span>
              <h3 className="text-white text-2xl font-heading font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Unboxing Memories</h3>
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:pl-8">
            <h3 className="text-3xl md:text-4xl font-heading font-light mb-6 leading-tight" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              Thoughtfully Presented
            </h3>
            <p className="text-gray-600 font-light text-base md:text-lg leading-relaxed mb-6">
              Every TRISH gift is carefully prepared to make the experience as memorable as the gift itself. From elegant presentation to the finishing touches, we believe every detail should reflect the thought and care behind the gesture.
            </p>
            <Link href="/discover" className="inline-flex items-center gap-2 text-[#500000] font-semibold uppercase tracking-widest text-xs hover:gap-4 transition-all group">
              Discover Our Collections
              <span className="text-lg font-light">→</span>
            </Link>
          </div>
        </div>

        {/* Outro CTA */}
        <div className="text-center max-w-4xl mx-auto bg-gradient-to-br from-gray-900 via-[#2a0000] to-gray-900 p-12 md:p-16 rounded-[2.5rem] shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-heading font-light mb-4 text-white" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              Begin your story of Meaningful Gifting
            </h3>
            <p className="text-gray-300 font-light text-base md:text-lg mb-8 max-w-2xl mx-auto">
              Step into our world of intentional expression. Let us curate your next milestone with the grace, artistry, and precision that your loved ones deserve.
            </p>
            <Link
              href="/discover"
              className="inline-block px-10 py-4 bg-white text-[#500000] font-bold rounded-full hover:bg-rose-50 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] text-xs uppercase tracking-widest"
            >
              Explore Gifts
            </Link>
          </div>
        </div>
        
      </div>
    </section>
  );
}
