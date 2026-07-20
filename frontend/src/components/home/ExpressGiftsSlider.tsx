"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Gift, Heart, Star } from "lucide-react";
import Image from "next/image";

const cards = [
  {
    id: 1,
    title: "Last-Minute Birthdays",
    description: "Forgot? We've got you covered. Delivered in 2 hours.",
    image: "https://images.unsplash.com/photo-1530103862676-de3c9de59f9e?w=800&q=80",
    color: "from-rose-100 to-teal-50",
    icon: <Gift className="w-5 h-5 text-rose-500" />,
    badge: "Most Popular",
  },
  {
    id: 2,
    title: "Anniversary Surprises",
    description: "Premium roses and luxury gifts to save the day.",
    image: "https://images.unsplash.com/photo-1583847268964-b28e51136b34?w=800&q=80",
    color: "from-amber-50 to-orange-100",
    icon: <Heart className="w-5 h-5 text-red-500" />,
    badge: "Premium",
  },
  {
    id: 3,
    title: "Just Because",
    description: "Make their ordinary day extraordinary instantly.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
    color: "from-blue-50 to-indigo-100",
    icon: <Star className="w-5 h-5 text-indigo-500" />,
    badge: "Trending",
  },
  {
    id: 4,
    title: "Apology Gifts",
    description: "Say 'I'm sorry' perfectly, delivered right now.",
    image: "https://images.unsplash.com/photo-1562228172-3f8d387cc87c?w=800&q=80",
    color: "from-emerald-50 to-teal-100",
    icon: <Clock className="w-5 h-5 text-emerald-500" />,
    badge: "Fastest",
  }
];

export default function ExpressGiftsSlider() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 mb-10 flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-bold mb-4 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span>
            Same-Day Delivery
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 tracking-tight">
            Forgot a special day? <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-accent-500 italic font-light">We've got you.</span>
          </h2>
        </div>
        <div className="flex gap-2">
          {/* We rely on native smooth scrolling, but could add buttons to scroll the container via ref if needed. For now, swipe is best. */}
          <p className="text-gray-500 text-sm hidden md:block">Swipe to explore &rarr;</p>
        </div>
      </div>

      {/* Slider Container */}
      <div className="w-full pl-4 md:pl-[max(1rem,calc((100vw-1200px)/2))] pb-12">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pr-8 pb-8 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="snap-start shrink-0 w-[85vw] sm:w-[400px] group cursor-pointer"
            >
              {/* Card Body */}
              <div className={`relative h-[450px] rounded-3xl bg-gradient-to-br ${card.color} p-6 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2`}>
                
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-105 group-hover:opacity-80 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/90"></div>
                </div>

                {/* Top Section */}
                <div className="relative z-10 flex justify-between items-start">
                  <div className="bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-sm">
                    {card.icon}
                  </div>
                  <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                    {card.badge}
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="relative z-10 bg-white/60 backdrop-blur-lg p-6 rounded-2xl border border-white/50 group-hover:bg-white/80 transition-colors duration-300">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{card.description}</p>
                  
                  <button className="flex items-center gap-2 text-sm font-bold text-gray-900 group/btn">
                    Shop Now 
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
          
          {/* Extra spacer to allow the last card to scroll fully to the left */}
          <div className="shrink-0 w-4 sm:w-[10vw]"></div>
        </div>
      </div>

      {/* Global Style for hiding scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
