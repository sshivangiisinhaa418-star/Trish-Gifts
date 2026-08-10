"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type CollectionCategory = "Occasions" | "Festivals" | "Special Days" | "Sentiments";

interface CollectionItem {
  id: number;
  title: string;
  image: string;
}

const collectionsData: Record<CollectionCategory, CollectionItem[]> = {
  Occasions: [
    { id: 1, title: "Birthday", image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600&q=80" },
    { id: 2, title: "Anniversary", image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80" },
    { id: 3, title: "Wedding", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80" },
    { id: 4, title: "Housewarming", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80" },
    { id: 5, title: "Baby Shower", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80" },
    { id: 6, title: "Corporate", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80" },
  ],
  Festivals: [
    { id: 1, title: "Diwali", image: "https://images.unsplash.com/photo-1607083206968-13611e3d76ba?w=600&q=80" },
    { id: 2, title: "Christmas", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80" },
    { id: 3, title: "Holi", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80" },
    { id: 4, title: "Eid", image: "https://images.unsplash.com/photo-1564759077036-3def242e69c5?w=600&q=80" },
    { id: 5, title: "Raksha Bandhan", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80" },
    { id: 6, title: "New Year", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80" },
  ],
  "Special Days": [
    { id: 1, title: "Valentine's Day", image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80" },
    { id: 2, title: "Mother's Day", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80" },
    { id: 3, title: "Father's Day", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80" },
    { id: 4, title: "Women's Day", image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&q=80" },
  ],
  Sentiments: [
    { id: 1, title: "Thank You", image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600&q=80" },
    { id: 2, title: "I'm Sorry", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80" },
    { id: 3, title: "Get Well Soon", image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&q=80" },
    { id: 4, title: "Congratulations", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80" },
  ]
};

export default function CollectionsGrid() {
  const [activeTab, setActiveTab] = useState<CollectionCategory>("Occasions");
  const tabs: CollectionCategory[] = ["Occasions", "Festivals", "Special Days", "Sentiments"];

  return (
    <section className="pt-12 pb-8 bg-gray-50">
      <div className="container mx-auto px-4">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">Shop by Intent</h2>
            <p className="text-gray-500">Discover handpicked gifts for every moment.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 bg-white p-1.5 rounded-full shadow-sm border border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab ? "text-white" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-gray-900 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid Area */}
        <div className="min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
            >
              {collectionsData[activeTab].map((item) => (
                <Link href={`/discover?intent=${item.title.toLowerCase()}`} key={item.id}>
                  <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Gradient Overlay for Text Visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                    
                    <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col items-center text-center">
                      <h3 className="text-white font-sans font-medium text-[15px] mb-2">{item.title}</h3>
                      <div className="w-8 h-[2px] bg-white/50 group-hover:w-12 group-hover:bg-brand-400 transition-all duration-300"></div>
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 text-center">
          <Link href="/discover">
            <button className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest hover:text-brand-600 transition-colors group">
              View All {activeTab}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}
