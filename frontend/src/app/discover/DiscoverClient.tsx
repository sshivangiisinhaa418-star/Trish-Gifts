"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { Sparkles, SlidersHorizontal, ChevronDown, X, Zap, Wallet, Star } from "lucide-react";
import Link from "next/link";
import { CATEGORIES, OCCASIONS, FESTIVALS, SPECIAL_DAYS } from "@/lib/constants/navigation";

interface DiscoverClientProps {
  initialIntent: string;
  searchQuery?: string;
  initialProducts: any[];
}

const SORT_OPTIONS = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Top Rated'];

export default function DiscoverClient({ initialIntent, searchQuery = "", initialProducts }: DiscoverClientProps) {
  // Filters State
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sameDayOnly, setSameDayOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  
  // Sorting State
  const [sortBy, setSortBy] = useState('Recommended');
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Pagination State
  const [visibleCount, setVisibleCount] = useState(15);

  // Intents State
  const [selectedIntents, setSelectedIntents] = useState<string[]>(initialIntent ? [initialIntent.toUpperCase().replace(/-/g, ' ')] : []);


  // Mobile Filter Drawer State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Toggle Category
  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleIntent = (intent: string) => {
    const upper = intent.toUpperCase();
    setSelectedIntents(prev => 
      prev.includes(upper) ? prev.filter(i => i !== upper) : [...prev, upper]
    );
  };

  const activeIntents = selectedIntents.length > 0 ? selectedIntents : (initialIntent ? [initialIntent.toUpperCase().replace(/-/g, ' ')] : []);

  // Memoized Filtered & Sorted Products
  const displayProducts = useMemo(() => {
    let result = [...initialProducts];

    // 0. Filter by Search Query
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => {
        const title = (p.name || p.title || '').toLowerCase();
        const desc = (p.description || '').toLowerCase();
        const intent = (p.intent || p.category || '').toLowerCase();
        const tagMatch = Array.isArray(p.tags) && p.tags.some((t: string) => t.toLowerCase().includes(q));
        return title.includes(q) || desc.includes(q) || intent.includes(q) || tagMatch;
      });
    }

    // 1. Filter by Intent (from URL or selected)
    if (activeIntents.length > 0) {
      result = result.filter(p => {
        const intentMatch = p.intent && activeIntents.includes(p.intent.toUpperCase());
        const tagMatch = p.tags && p.tags.some((tag: string) => activeIntents.some(intent => tag.includes(intent)));
        return intentMatch || tagMatch;
      });
    }

    // 2. Filter by Category (using intent as category for DB items, or category for dummy items)
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category || p.intent));
    }

    // 3. Filter by Same Day Delivery
    if (sameDayOnly) {
      result = result.filter(p => p.sameDayDelivery);
    }

    // 4. Filter by Price
    if (priceRange === 'under1000') {
      result = result.filter(p => p.price < 1000);
    } else if (priceRange === '1000to3000') {
      result = result.filter(p => p.price >= 1000 && p.price <= 3000);
    } else if (priceRange === 'over3000') {
      result = result.filter(p => p.price > 3000);
    }

    // 5. Sorting
    switch (sortBy) {
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Top Rated':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'Recommended' - keep original or intent-based order
        break;
    }

    return result;
  }, [initialIntent, selectedCategories, sameDayOnly, priceRange, sortBy, activeIntents]);

  const displayIntent = initialIntent ? initialIntent.replace("-", " ") : "Any Occasion";
  const hasIntentFilter = !!initialIntent;

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 2xl:px-16">
      
      {/* Page Header (Intent Context) */}
      {/* Page Header (Intent Context) */}
      <div className="mb-8 md:mb-12 animate-fade-up flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        
        {/* Left Side: Text Content */}
        <div className="flex-1 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-brand-500 animate-pulse" />
            <span className="text-sm font-bold text-brand-500 uppercase tracking-widest">
              {initialIntent ? `Curated for ${displayIntent}` : "Curated For You"}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-heading font-medium text-gray-900 mb-4 tracking-tight capitalize">
            {initialIntent ? `Gifts for ${displayIntent}` : "Gifts that speak volumes."}
          </h1>
          
          <p className="text-lg text-gray-500 font-sans leading-relaxed">
            Based on your intent, we've curated a selection of premium gifts sure to create an unforgettable moment.
          </p>
        </div>

        {/* Right Side: Quick Action Filters */}
        <div className="flex flex-wrap items-center xl:justify-end gap-3 shrink-0">
          
          <button 
            onClick={() => setSameDayOnly(!sameDayOnly)}
            className={`group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 active:scale-95 ${sameDayOnly ? 'bg-gray-900 text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
          >
            <Zap className={`w-4 h-4 transition-colors ${sameDayOnly ? 'text-brand-400' : 'text-gray-400 group-hover:text-brand-500'}`} />
            Same-Day
          </button>

          <button 
            onClick={() => setPriceRange(priceRange === 'under1000' ? null : 'under1000')}
            className={`group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 active:scale-95 ${priceRange === 'under1000' ? 'bg-gray-900 text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
          >
            <Wallet className={`w-4 h-4 transition-colors ${priceRange === 'under1000' ? 'text-brand-400' : 'text-gray-400 group-hover:text-brand-500'}`} />
            Under ₹1K
          </button>

          <button 
            onClick={() => setSortBy(sortBy === 'Top Rated' ? 'Recommended' : 'Top Rated')}
            className={`group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 active:scale-95 ${sortBy === 'Top Rated' ? 'bg-gray-900 text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
          >
            <Star className={`w-4 h-4 transition-colors ${sortBy === 'Top Rated' ? 'text-brand-400' : 'text-gray-400 group-hover:text-brand-500'}`} />
            Top Rated
          </button>

          {activeIntents.length > 0 && (
            <button 
              onClick={() => {
                setSelectedIntents([]);
                // Optionally push to router without intent, but for client state this works
              }}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-300 active:scale-95 ml-2"
            >
              <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" /> Clear Intent
            </button>
          )}

        </div>
      </div>

      {/* Desktop Toolbar (Full Width Alignment) */}
      <div className="hidden lg:flex items-center justify-between mb-0 pb-4 border-b border-gray-100 animate-fade-up delay-200">
        <div className="text-sm text-gray-500 font-medium bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
          Showing <span className="font-bold text-gray-900">{displayProducts.length}</span> curated gifts
        </div>
        
        <div className="relative z-30">
          <button 
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 cursor-pointer group hover:border-gray-900 hover:shadow-sm transition-all duration-300"
          >
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              Sort by: {sortBy}
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Sort Dropdown */}
          <div className={`absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] py-2 transition-all duration-300 origin-top-right ${isSortOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            {SORT_OPTIONS.map(option => (
              <button
                key={option}
                onClick={() => {
                  setSortBy(option);
                  setIsSortOpen(false);
                }}
                className={`w-full text-left px-5 py-2.5 text-sm transition-all duration-200 flex items-center gap-2 group ${sortBy === option ? 'font-bold text-gray-900 bg-gray-50' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${sortBy === option ? 'bg-brand-500 scale-100' : 'bg-gray-300 scale-0 group-hover:scale-100'}`}></span>
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6 flex justify-between items-center border-y border-gray-100 py-3">
        <button 
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-widest hover:text-brand-600 transition-colors group"
        >
          <SlidersHorizontal className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" /> Filters
        </button>
        <span className="text-sm text-gray-500 font-medium">{displayProducts.length} Results</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Filters Sidebar */}
        <div className={`
          fixed inset-0 z-50 bg-white p-6 overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:static lg:bg-transparent lg:p-0 lg:z-auto lg:w-56 lg:shrink-0 lg:translate-x-0
          ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="lg:sticky lg:top-32">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
              <h3 className="font-heading font-medium text-lg text-gray-900">Filters</h3>
              <button className="lg:hidden hover:rotate-90 transition-transform duration-300" onClick={() => setIsMobileFilterOpen(false)}>
                <X className="w-6 h-6 text-gray-900" />
              </button>
              <SlidersHorizontal className="hidden lg:block w-4 h-4 text-gray-400" />
            </div>
            
            <div className="space-y-8">
              {/* Filter Group: Category */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Category</h4>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2 hide-scrollbar">
                  {CATEGORIES.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-300 ${selectedCategories.includes(cat) ? 'bg-gray-900 border-gray-900 shadow-sm scale-110' : 'border-gray-300 group-hover:border-gray-900 group-hover:shadow-sm'}`}>
                        <svg className={`w-3 h-3 text-white transition-transform duration-300 ${selectedCategories.includes(cat) ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className={`text-sm transition-all duration-300 ${selectedCategories.includes(cat) ? 'text-gray-900 font-bold translate-x-1' : 'text-gray-600 group-hover:text-gray-900'}`}>
                        {cat}
                      </span>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter Group: Occasions */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Occasions</h4>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2 hide-scrollbar">
                  {[...OCCASIONS, ...FESTIVALS, ...SPECIAL_DAYS].map((intent) => {
                    const upper = intent.toUpperCase();
                    return (
                      <label key={intent} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-300 ${selectedIntents.includes(upper) ? 'bg-gray-900 border-gray-900 shadow-sm scale-110' : 'border-gray-300 group-hover:border-gray-900 group-hover:shadow-sm'}`}>
                          <svg className={`w-3 h-3 text-white transition-transform duration-300 ${selectedIntents.includes(upper) ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span className={`text-sm transition-all duration-300 ${selectedIntents.includes(upper) ? 'text-gray-900 font-bold translate-x-1' : 'text-gray-600 group-hover:text-gray-900'}`}>
                          {intent}
                        </span>
                        <input 
                          type="checkbox" 
                          className="hidden" 
                          checked={selectedIntents.includes(upper)}
                          onChange={() => toggleIntent(intent)}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Filter Group: Price */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Price</h4>
                <div className="space-y-3">
                  {[
                    { id: 'under1000', label: 'Under ₹1,000' },
                    { id: '1000to3000', label: '₹1,000 - ₹3,000' },
                    { id: 'over3000', label: 'Over ₹3,000' },
                  ].map((range) => (
                    <label key={range.id} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-4 h-4">
                        <div className={`absolute inset-0 rounded-full border transition-all duration-300 ${priceRange === range.id ? 'border-gray-900 scale-110 shadow-sm' : 'border-gray-300 group-hover:border-gray-900'}`}></div>
                        <div className={`w-2 h-2 rounded-full bg-gray-900 transition-all duration-300 ${priceRange === range.id ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}></div>
                        <input 
                          type="radio" 
                          name="price_range"
                          checked={priceRange === range.id}
                          onChange={() => setPriceRange(priceRange === range.id ? null : range.id)}
                          onClick={() => { if(priceRange === range.id) setPriceRange(null) }}
                          className="hidden"
                        />
                      </div>
                      <span className={`text-sm transition-all duration-300 ${priceRange === range.id ? 'text-gray-900 font-bold translate-x-1' : 'text-gray-600 group-hover:text-gray-900'}`}>
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter Group: Delivery */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Delivery</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-300 ${sameDayOnly ? 'bg-gray-900 border-gray-900 shadow-sm scale-110' : 'border-gray-300 group-hover:border-gray-900 group-hover:shadow-sm'}`}>
                      <svg className={`w-3 h-3 text-white transition-transform duration-300 ${sameDayOnly ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className={`text-sm transition-all duration-300 ${sameDayOnly ? 'text-gray-900 font-bold translate-x-1' : 'text-gray-600 group-hover:text-gray-900'}`}>Same Day Delivery</span>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={sameDayOnly}
                      onChange={() => setSameDayOnly(!sameDayOnly)}
                    />
                  </label>
                </div>
              </div>
              
              {/* Reset Filters Mobile Button */}
              <div className="lg:hidden mt-8 pt-8 border-t border-gray-100">
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-4 bg-gray-900 text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-gray-800 hover:shadow-lg transition-all active:scale-95"
                >
                  View {displayProducts.length} Results
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid Area */}
        <div className="flex-1">
          
          {/* Grid */}
          {displayProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 md:gap-x-6 xl:gap-x-8 gap-y-10 md:gap-y-12">
              {displayProducts.slice(0, visibleCount).map((product, index) => (
                <div key={product.id} className="animate-fade-up" style={{ animationDelay: `${(index % 4) * 100}ms` }}>
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 animate-fade-up">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 mb-6 shadow-inner">
                <Sparkles className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-2xl font-heading font-medium text-gray-900 mb-3">No gifts found</h3>
              <p className="text-gray-500 max-w-md mx-auto">Try adjusting your filters to discover more premium gifts tailored to your needs.</p>
              <button 
                onClick={() => {
                  setSelectedCategories([]);
                  setSameDayOnly(false);
                  setPriceRange(null);
                }}
                className="mt-8 px-6 py-3 bg-brand-50 text-brand-700 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-brand-100 hover:shadow-md transition-all duration-300 active:scale-95"
              >
                Clear all filters
              </button>
            </div>
          )}
          
          {/* Load More */}
          {displayProducts.length > visibleCount && (
            <div className="mt-20 flex justify-center">
              <button 
                onClick={() => setVisibleCount(prev => prev + 10)}
                className="group relative px-8 py-3.5 border border-gray-200 overflow-hidden rounded-full text-sm font-bold text-gray-900 uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow-2xl hover:border-transparent hover:text-white active:scale-95 cursor-pointer"
              >
                
                {/* Main Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-20"></div>
                
                {/* Glass Reflection Sweep Effect */}
                <div className="absolute top-0 -left-[100%] h-full w-[50%] -z-10 transform -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:left-[200%] transition-all duration-1000 ease-in-out"></div>
                
                <span className="relative z-10 flex items-center gap-2">
                  Load More <ChevronDown className="w-4 h-4 group-hover:animate-bounce" />
                </span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
