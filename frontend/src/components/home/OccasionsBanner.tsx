"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const expressImages = [
  "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800&q=80",
  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
  "https://images.unsplash.com/photo-1583847268964-b28e51136b34?w=800&q=80",
  "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80"
];

export default function OccasionsBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % expressImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="relative rounded-[2rem] bg-[#0a0a0a] overflow-hidden shadow-xl group">
          
          {/* Premium Light Bar Effect (Pure CSS Guaranteed to render) */}
          <div className="absolute top-0 left-0 right-0 w-full flex flex-col items-center z-0 pointer-events-none">
            <div 
              className="h-[2px] w-[60%] md:w-[40%] bg-gradient-to-r from-transparent via-white to-transparent opacity-90"
              style={{ boxShadow: "0 0 20px 3px rgba(255,255,255,0.8)" }}
            />
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-gradient-to-b from-white/30 via-white/5 to-transparent blur-[40px] mix-blend-screen opacity-80"
            />
          </div>

          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-500/20 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-1000 ease-out"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent-500/20 rounded-full blur-[100px] group-hover:scale-125 transition-transform duration-1000 delay-100 ease-out"></div>
          </div>

          <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            
            {/* Text Content */}
            <div className="w-full md:w-[55%] text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold mb-4 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse"></span>
                Express Delivery
              </div>
              
              <h2 className="text-3xl md:text-4xl font-heading font-medium mb-3 tracking-tight text-white leading-tight">
                Forgot a special day?<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-accent-400 font-sans font-light italic">We've got you.</span>
              </h2>
              
              <p className="text-gray-400 text-sm md:text-base font-light mb-6 leading-relaxed max-w-sm mx-auto md:mx-0">
                Experience the magic of same-day delivery. Premium gifts, perfectly packaged and delivered within hours in select cities.
              </p>
              
              <button className="px-5 py-2.5 bg-white hover:bg-gray-100 text-gray-900 rounded-full text-sm font-medium transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-1">
                Explore Same-Day Gifts
              </button>
            </div>
            
            {/* Smooth Sliding Carousel Composition */}
            <div className="w-full md:w-[45%] flex justify-center md:justify-end relative z-10">
              <div className="relative w-full max-w-[220px] lg:max-w-[260px] aspect-[4/5] mt-6 md:mt-0">
                {/* Offset Color Frame */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-500 to-accent-500 rounded-2xl translate-x-3 translate-y-3 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-700 ease-out"></div>
                
                {/* Image Slider Container */}
                <div className="relative z-10 rounded-2xl w-full h-full shadow-xl border border-white/10 overflow-hidden bg-gray-900 group-hover:-translate-y-1 group-hover:-translate-x-1 transition-transform duration-700 ease-out">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={currentIndex}
                      src={expressImages[currentIndex]}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      alt="Premium Gifts" 
                      className="absolute inset-0 object-cover w-full h-full" 
                    />
                  </AnimatePresence>
                  
                  {/* Slider Dots */}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-30">
                    {expressImages.map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? "w-5 bg-white" : "w-1.5 bg-white/40"}`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Floating tags */}
                <div className="absolute -left-4 md:-left-6 top-6 z-20 bg-white text-gray-900 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-xl animate-float">
                  ⚡ 2-Hour
                </div>
                <div className="absolute -right-4 md:-right-4 bottom-8 z-20 bg-gray-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-xl animate-float-delayed border border-gray-700">
                  Premium
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
