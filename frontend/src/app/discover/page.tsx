import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { Sparkles, SlidersHorizontal, ChevronDown } from "lucide-react";

export default function DiscoverPage() {
  const products = [
    {
      id: 1,
      title: "Luxury Rose Gold Watch",
      price: 2499,
      originalPrice: 3999,
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
      tags: ["ANNIVERSARY", "WIFE"],
      sameDayDelivery: true,
    },
    {
      id: 2,
      title: "French Perfume Gift Box",
      price: 1899,
      originalPrice: 2499,
      rating: 4.9,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80",
      tags: ["BIRTHDAY", "MOTHER"],
      sameDayDelivery: false,
    },
    {
      id: 3,
      title: "Artisan Macaron Hamper",
      price: 999,
      originalPrice: 1299,
      rating: 4.7,
      reviews: 256,
      image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&q=80",
      tags: ["THANK YOU", "COLLEAGUE"],
      sameDayDelivery: true,
    },
    {
      id: 4,
      title: "Personalized Leather Wallet",
      price: 1499,
      originalPrice: 1999,
      rating: 4.6,
      reviews: 42,
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
      tags: ["FOR HIM", "FATHER"],
      sameDayDelivery: true,
    },
    {
      id: 5,
      title: "Signature Floral Arrangement",
      price: 1299,
      rating: 4.9,
      reviews: 312,
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80",
      tags: ["ROMANCE", "PARTNER"],
      sameDayDelivery: true,
    },
    {
      id: 6,
      title: "Gourmet Coffee Collection",
      price: 899,
      originalPrice: 1099,
      rating: 4.8,
      reviews: 178,
      image: "https://images.unsplash.com/photo-1498604218671-50e5058fc496?w=800&q=80",
      tags: ["MISS YOU", "FRIEND"],
      sameDayDelivery: false,
    },
    {
      id: 7,
      title: "Spa & Relaxation Kit",
      price: 2199,
      originalPrice: 2999,
      rating: 4.9,
      reviews: 88,
      image: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=80",
      tags: ["GET WELL", "SISTER"],
      sameDayDelivery: true,
    },
    {
      id: 8,
      title: "Handcrafted Silver Pendant",
      price: 3499,
      originalPrice: 4500,
      rating: 4.7,
      reviews: 65,
      image: "https://images.unsplash.com/photo-1599643477874-5c866f5c5a88?w=800&q=80",
      tags: ["MILESTONE", "DAUGHTER"],
      sameDayDelivery: false,
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-1 pt-8 pb-20">
        <div className="container mx-auto px-4">
          
          {/* Page Header (Intent Context) */}
          <div className="mb-12 animate-fade-up">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-brand-500 animate-pulse" />
              <span className="text-sm font-bold text-brand-500 uppercase tracking-widest">Recommended For You</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-medium text-gray-900 mb-4 tracking-tight">
              Gifts that speak volumes.
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl font-sans leading-relaxed">
              Based on your intent, we've curated a selection of premium gifts sure to create an unforgettable moment.
            </p>

            {/* Active Intent Pills */}
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
                <span className="text-gray-400">For:</span> Any Recipient
              </div>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
                <span className="text-gray-400">Why:</span> Any Occasion
              </div>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
                <span className="text-gray-400">Budget:</span> Any Budget
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Filters Sidebar - Hidden on mobile, visible on lg */}
            <div className="hidden lg:block w-64 shrink-0 animate-fade-up delay-100">
              <div className="sticky top-32">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading font-medium text-xl text-gray-900">Filters</h3>
                  <SlidersHorizontal className="w-5 h-5 text-gray-400" />
                </div>
                
                <div className="space-y-8">
                  {/* Filter Group: Category */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Category</h4>
                    <div className="space-y-3">
                      {['All Gifts', 'Flowers & Plants', 'Jewelry & Watches', 'Fragrance', 'Gourmet & Hampers', 'Personalized'].map((cat, i) => (
                        <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-5 h-5 rounded border ${i === 0 ? 'bg-gray-900 border-gray-900' : 'border-gray-300 group-hover:border-gray-900'} flex items-center justify-center transition-colors`}>
                            {i === 0 && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                          </div>
                          <span className={`text-sm ${i === 0 ? 'text-gray-900 font-medium' : 'text-gray-600'} group-hover:text-gray-900 transition-colors`}>{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Filter Group: Delivery */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Delivery</h4>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-5 h-5 rounded border border-gray-300 group-hover:border-gray-900 flex items-center justify-center transition-colors"></div>
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Same Day Delivery</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid Area */}
            <div className="flex-1">
              
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100 animate-fade-up delay-200">
                <div className="text-sm text-gray-500 font-medium">Showing {products.length} curated gifts</div>
                
                <div className="flex items-center gap-2 cursor-pointer group">
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Sort by: Recommended</span>
                  <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors" />
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                {products.map((product, index) => (
                  <div key={product.id} className="animate-fade-up" style={{ animationDelay: `${(index % 4) * 150 + 200}ms` }}>
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>
              
              {/* Load More */}
              <div className="mt-20 flex justify-center">
                <button className="px-8 py-3.5 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors shadow-sm hover:shadow-md">
                  Discover More Gifts
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
