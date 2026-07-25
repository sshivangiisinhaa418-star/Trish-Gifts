"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { Sparkles, SlidersHorizontal, ChevronDown, X, Zap, Wallet, Star } from "lucide-react";
import Link from "next/link";
import { CATEGORIES, OCCASIONS, FESTIVALS, SPECIAL_DAYS } from "@/lib/constants/navigation";

interface DiscoverClientProps {
  initialIntent: string;
}

// Robust Mock Database of Products
const allProducts = [
  { id: 1, title: "Luxury Rose Gold Watch", category: "Jewelry", price: 2499, originalPrice: 3999, rating: 4.8, reviews: 124, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80", tags: ["ANNIVERSARY", "WIFE", "PARTNER"], sameDayDelivery: true },
  { id: 2, title: "French Perfume Gift Box", category: "Fragrance", price: 1899, originalPrice: 2499, rating: 4.9, reviews: 89, image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80", tags: ["BIRTHDAY", "MOTHER", "WIFE", "VALENTINE'S DAY"], sameDayDelivery: false },
  { id: 3, title: "Artisan Macaron Hamper", category: "Hampers", price: 999, originalPrice: 1299, rating: 4.7, reviews: 256, image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&q=80", tags: ["THANK YOU", "COLLEAGUE", "FRIEND", "DIWALI", "CHRISTMAS"], sameDayDelivery: true },
  { id: 4, title: "Personalized Leather Wallet", category: "Personalized", price: 1499, originalPrice: 1999, rating: 4.6, reviews: 42, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80", tags: ["FOR HIM", "FATHER", "HUSBAND", "FATHER'S DAY", "BIRTHDAY"], sameDayDelivery: true },
  { id: 5, title: "Signature Floral Arrangement", category: "Flowers", price: 1299, rating: 4.9, reviews: 312, image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80", tags: ["ROMANCE", "PARTNER", "ANNIVERSARY", "VALENTINE'S DAY", "WEDDING"], sameDayDelivery: true },
  { id: 6, title: "Gourmet Coffee Collection", category: "Hampers", price: 899, originalPrice: 1099, rating: 4.8, reviews: 178, image: "https://images.unsplash.com/photo-1498604218671-50e5058fc496?w=800&q=80", tags: ["MISS YOU", "FRIEND", "THANK YOU", "HOUSEWARMING"], sameDayDelivery: false },
  { id: 7, title: "Spa & Relaxation Kit", category: "Hampers", price: 2199, originalPrice: 2999, rating: 4.9, reviews: 88, image: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=80", tags: ["GET WELL SOON", "SISTER", "MOTHER'S DAY", "WOMEN'S DAY"], sameDayDelivery: true },
  { id: 8, title: "Handcrafted Silver Pendant", category: "Jewelry", price: 3499, originalPrice: 4500, rating: 4.7, reviews: 65, image: "https://images.unsplash.com/photo-1599643477874-5c866f5c5a88?w=800&q=80", tags: ["MILESTONE", "DAUGHTER", "BIRTHDAY", "BABY SHOWER"], sameDayDelivery: false },
  { id: 9, title: "Aromatherapy Candle Set", category: "Fragrance", price: 1199, originalPrice: 1499, rating: 4.8, reviews: 142, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80", tags: ["HOUSEWARMING", "DIWALI", "THANK YOU", "I'M SORRY"], sameDayDelivery: true },
  { id: 10, title: "Premium Men's Grooming Kit", category: "Personalized", price: 2799, originalPrice: 3499, rating: 4.7, reviews: 95, image: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=800&q=80", tags: ["FATHER'S DAY", "HUSBAND", "BIRTHDAY", "ANNIVERSARY"], sameDayDelivery: false },
  { id: 11, title: "Custom Engraved Pen", category: "Personalized", price: 599, originalPrice: 899, rating: 4.5, reviews: 34, image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=800&q=80", tags: ["CORPORATE", "COLLEAGUE", "FAREWELL", "GRADUATION"], sameDayDelivery: true },
  { id: 12, title: "Red Roses & Chocolates", category: "Flowers", price: 1599, rating: 4.8, reviews: 450, image: "https://images.unsplash.com/photo-1546842931-886c185b4c8c?w=800&q=80", tags: ["VALENTINE'S DAY", "ANNIVERSARY", "ROMANCE"], sameDayDelivery: true },
  { id: 13, title: "Orchid Elegance Pot", category: "Flowers", price: 1899, originalPrice: 2200, rating: 4.9, reviews: 112, image: "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=800&q=80", tags: ["HOUSEWARMING", "MOTHER'S DAY", "THANK YOU"], sameDayDelivery: false },
  { id: 14, title: "Classic Pearl Necklace", category: "Jewelry", price: 4999, originalPrice: 6500, rating: 4.9, reviews: 76, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80", tags: ["ANNIVERSARY", "WIFE", "MOTHER"], sameDayDelivery: false },
  { id: 15, title: "Artisan Chocolate Truffles", category: "Hampers", price: 799, rating: 4.6, reviews: 230, image: "https://images.unsplash.com/photo-1540331547168-8b63109225b7?w=800&q=80", tags: ["BIRTHDAY", "THANK YOU", "FRIEND", "VALENTINE'S DAY"], sameDayDelivery: true },
  { id: 16, title: "Fresh Lily Bouquet", category: "Flowers", price: 1099, originalPrice: 1299, rating: 4.7, reviews: 155, image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=80", tags: ["SYMPATHY", "GET WELL SOON", "MOTHER'S DAY"], sameDayDelivery: true },
  
  // Dummy products to test "Load More"
  { id: 17, title: "Golden Edge Cufflinks", category: "Jewelry", price: 1299, originalPrice: 1599, rating: 4.5, reviews: 45, image: "https://images.unsplash.com/photo-1616428782635-4299b9fa17fc?w=800&q=80", tags: ["FATHER'S DAY", "HUSBAND", "CORPORATE"], sameDayDelivery: false },
  { id: 18, title: "Vintage Wine Accessory Set", category: "Personalized", price: 1899, rating: 4.8, reviews: 110, image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80", tags: ["HOUSEWARMING", "ANNIVERSARY", "FRIEND"], sameDayDelivery: true },
  { id: 19, title: "Zen Garden Terrarium", category: "Flowers", price: 899, originalPrice: 1200, rating: 4.6, reviews: 88, image: "https://images.unsplash.com/photo-1599725427295-bcecb22fa979?w=800&q=80", tags: ["GET WELL SOON", "THANK YOU", "COLLEAGUE"], sameDayDelivery: false },
  { id: 20, title: "Velvet Oud Eau de Parfum", category: "Fragrance", price: 3499, originalPrice: 4200, rating: 4.9, reviews: 320, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80", tags: ["ROMANCE", "PARTNER", "WIFE", "VALENTINE'S DAY"], sameDayDelivery: true },
  { id: 21, title: "Gourmet Cheese Board", category: "Hampers", price: 2100, rating: 4.7, reviews: 145, image: "https://images.unsplash.com/photo-1631379482811-3e0f9b008d51?w=800&q=80", tags: ["CHRISTMAS", "DIWALI", "HOUSEWARMING"], sameDayDelivery: true },
  { id: 22, title: "Personalized Journal Set", category: "Personalized", price: 699, originalPrice: 899, rating: 4.8, reviews: 75, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80", tags: ["GRADUATION", "FIRST JOB", "COLLEAGUE"], sameDayDelivery: false },
  { id: 23, title: "Opulent Tulip Box", category: "Flowers", price: 1599, rating: 4.9, reviews: 210, image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=800&q=80", tags: ["MOTHER'S DAY", "WOMEN'S DAY", "WIFE"], sameDayDelivery: true },
  { id: 24, title: "Crystal Drop Earrings", category: "Jewelry", price: 2899, originalPrice: 3500, rating: 4.7, reviews: 112, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80", tags: ["ANNIVERSARY", "BIRTHDAY", "DAUGHTER"], sameDayDelivery: false },
  { id: 25, title: "Midnight Jasmine Diffuser", category: "Fragrance", price: 1099, rating: 4.6, reviews: 90, image: "https://images.unsplash.com/photo-1608528577891-eb0559ec5e42?w=800&q=80", tags: ["HOUSEWARMING", "MISS YOU", "SISTER"], sameDayDelivery: true },
  { id: 26, title: "Celebration Champagne Hamper", category: "Hampers", price: 5999, originalPrice: 6500, rating: 4.9, reviews: 54, image: "https://images.unsplash.com/photo-1596450514735-111a2fe02935?w=800&q=80", tags: ["WEDDING", "ENGAGEMENT", "NEW YEAR"], sameDayDelivery: false },
  { id: 27, title: "Monogrammed Silk Tie", category: "Personalized", price: 1499, originalPrice: 1999, rating: 4.8, reviews: 130, image: "https://images.unsplash.com/photo-1595123531649-6e3e5c9b68d4?w=800&q=80", tags: ["FATHER'S DAY", "MEN'S DAY", "HUSBAND"], sameDayDelivery: true },
  { id: 28, title: "Sunset Carnation Bouquet", category: "Flowers", price: 899, rating: 4.5, reviews: 180, image: "https://images.unsplash.com/photo-1562229125-9fa8e7855e96?w=800&q=80", tags: ["CHEER UP", "FRIENDSHIP DAY", "SISTER"], sameDayDelivery: true },
  { id: 29, title: "Gold Plated Bracelet", category: "Jewelry", price: 1799, originalPrice: 2199, rating: 4.8, reviews: 95, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80", tags: ["VALENTINE'S DAY", "GIRLFRIEND", "WIFE"], sameDayDelivery: false },
  { id: 30, title: "Relaxing Bath Bomb Set", category: "Hampers", price: 699, originalPrice: 850, rating: 4.7, reviews: 260, image: "https://images.unsplash.com/photo-1608248593875-2019741e4bc2?w=800&q=80", tags: ["GET WELL SOON", "THANK YOU", "MOTHER"], sameDayDelivery: true },
];

const SORT_OPTIONS = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Top Rated'];

export default function DiscoverClient({ initialIntent }: DiscoverClientProps) {
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
    let result = [...allProducts];

    // 1. Filter by Intent (from URL or selected)
    if (activeIntents.length > 0) {
      result = result.filter(p => p.tags.some(tag => activeIntents.some(intent => tag.includes(intent))));
    }

    // 2. Filter by Category
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
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
