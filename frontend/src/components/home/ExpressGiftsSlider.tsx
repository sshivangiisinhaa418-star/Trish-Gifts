"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Gift, Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    id: 1,
    title: "Last-Minute Birthdays",
    description: "Forgot? We've got you covered. Delivered in 2 hours.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
    color: "from-rose-100 to-teal-50",
    icon: <Gift className="w-5 h-5 text-rose-500" />,
    badge: "Most Popular",
  },
  {
    id: 2,
    title: "Anniversary Surprises",
    description: "Premium roses and luxury gifts to save the day.",
    image: "https://images.unsplash.com/photo-1581022295087-35e593704911?w=800&q=80",
    color: "from-rose-500 to-red-600",
    icon: <Heart className="w-4 h-4 text-white" />,
    badge: "Premium",
  },
  {
    id: 3,
    title: "Just Because",
    description: "Make their ordinary day extraordinary instantly.",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
    color: "from-indigo-500 to-purple-600",
    icon: <Star className="w-4 h-4 text-white" />,
    badge: "Trending",
  },
  {
    id: 4,
    title: "Apology Gifts",
    description: "Say 'I'm sorry' perfectly, delivered right now.",
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80",
    color: "from-teal-500 to-emerald-600",
    icon: <Clock className="w-4 h-4 text-white" />,
    badge: "Fastest",
  }
];

export default function ExpressGiftsSlider() {
  return (
    <section className="py-12 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 mb-6 flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-bold mb-4 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span>
            Same-Day Delivery
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 tracking-tight">
            Forgot a special day? <br/>We've got you. <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-accent-500 italic font-light">Last minute under rs. 700</span>
          </h2>
        </div>
        <div className="flex gap-2">
          <p className="text-gray-500 text-sm hidden md:block">Swipe to explore &rarr;</p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="snap-start shrink-0 w-[85vw] sm:w-[320px] group cursor-pointer"
            >
              {/* Ultra-Premium Card Body */}
              <div className="relative h-[380px] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                
                {/* Edge-to-Edge Background Image */}
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                {/* Sleek Dark Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Top Badges */}
                <div className="absolute top-0 inset-x-0 p-5 flex justify-between items-start z-10">
                  <div className={`bg-gradient-to-br ${card.color} p-2 rounded-full shadow-lg`}>
                    {card.icon}
                  </div>
                  <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-gray-900 shadow-sm uppercase tracking-wider">
                    {card.badge}
                  </div>
                </div>

                {/* Bottom Content Area */}
                <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{card.title}</h3>
                  <p className="text-gray-300 text-sm mb-5 leading-relaxed font-light">{card.description}</p>
                  
                  <div className="w-full h-[1px] bg-white/20 mb-4"></div>
                  
                  <Link href="/discover" className="flex items-center gap-2 text-sm font-bold text-white group/btn w-fit">
                    Shop Now 
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                  </Link>
                </div>

              </div>
            </motion.div>
          ))}
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
