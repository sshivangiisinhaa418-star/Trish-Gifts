"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Gift, CalendarHeart, PartyPopper, CalendarDays, Sparkles } from "lucide-react";
import { CATEGORIES, OCCASIONS, FESTIVALS, SPECIAL_DAYS } from "@/lib/constants/navigation";
import { EXTRA_EXPLORE_ITEMS } from "@/lib/constants/extraExplore";

const NAV_ITEMS = [
  {
    title: "Categories",
    icon: <Gift className="w-4 h-4" />,
    items: CATEGORIES,
    type: "category"
  },
  {
    title: "Occasions",
    icon: <CalendarHeart className="w-4 h-4" />,
    items: OCCASIONS,
    type: "intent"
  },
  {
    title: "Festivals",
    icon: <PartyPopper className="w-4 h-4" />,
    items: FESTIVALS,
    type: "intent"
  },
  {
    title: "Special Days",
    icon: <CalendarDays className="w-4 h-4" />,
    items: SPECIAL_DAYS,
    type: "intent"
  }
];

export default function GlobalNav() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [expandedExplore, setExpandedExplore] = useState<string | null>(null);
  let timeoutId: NodeJS.Timeout;

  const handleMouseEnter = (title: string) => {
    clearTimeout(timeoutId);
    setActiveTab(title);
    setExpandedExplore(null);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setActiveTab(null);
    }, 150); // slight delay to prevent flickering
  };

  return (
    <nav className="w-full bg-white border-b border-gray-100 hidden lg:block relative z-40">
      <div className="container mx-auto px-4 lg:px-8">
        <ul className="flex items-center justify-center gap-8 xl:gap-12 h-12">
          {NAV_ITEMS.map((nav) => (
            <li
              key={nav.title}
              className="h-full"
              onMouseEnter={() => handleMouseEnter(nav.title)}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`h-full flex items-center gap-2 text-xs font-medium transition-colors duration-300 uppercase tracking-widest ${activeTab === nav.title ? 'text-[#500000] border-b-2 border-[#500000]' : 'text-gray-500 hover:text-gray-900 border-b-2 border-transparent'}`}>
                {nav.icon}
                {nav.title}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeTab === nav.title ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu Dropdown */}
              <div
                className={`absolute left-0 w-full bg-white border-b border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 origin-top overflow-hidden
                  ${activeTab === nav.title ? 'opacity-100 translate-y-0 pointer-events-auto visible' : 'opacity-0 -translate-y-2 pointer-events-none invisible'}
                `}
                style={{ top: '100%' }}
              >
                <div className="container mx-auto px-4 lg:px-8 py-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {nav.items.map((item) => {
                      const slug = item.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                      const href = `/discover?${nav.type}=${slug}`;
                      return (
                        <Link
                          key={item}
                          href={href}
                          onClick={() => setActiveTab(null)}
                          className="group flex items-center py-2.5 relative overflow-hidden transition-all"
                        >
                          {/* Animated line that appears on hover */}
                          <span className="absolute left-0 w-0 h-[1px] bg-[#500000] transition-all duration-300 group-hover:w-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"></span>
                          
                          {/* Text that slides right on hover */}
                          <span className="text-[15px] font-light tracking-wide text-gray-600 group-hover:text-gray-900 transition-all duration-300 group-hover:translate-x-6">
                            {item}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                  
                  {/* View All Button at bottom of mega menu */}
                  <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        setExpandedExplore(expandedExplore === nav.title ? null : nav.title);
                      }}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gray-900 text-white text-sm font-bold uppercase tracking-widest group hover:bg-brand-600 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                    >
                      <Sparkles className={`w-4 h-4 transition-transform duration-500 ${expandedExplore === nav.title ? 'rotate-180 text-brand-300' : 'text-brand-400 group-hover:scale-110'}`} />
                      Explore More {nav.title}
                    </button>
                    
                    {/* Dynamic Expandable Grid */}
                    <div className={`w-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${expandedExplore === nav.title ? 'max-h-[500px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'}`}>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50/80 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-inner">
                        {EXTRA_EXPLORE_ITEMS[nav.title]?.map((extra, idx) => (
                          <Link 
                            key={idx}
                            href={`/discover?${nav.type}=${extra.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                            onClick={() => { setActiveTab(null); setExpandedExplore(null); }}
                            className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg ${extra.color}`}
                          >
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-lg">
                              {extra.icon}
                            </div>
                            <span className="text-sm font-bold tracking-tight">{extra.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
