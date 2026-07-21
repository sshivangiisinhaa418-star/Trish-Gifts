import Header from "@/components/layout/Header";
import IntentSelector from "@/components/home/IntentSelector";
import { CardStack, CardStackItem } from "@/components/ui/card-stack";
import ExpressGiftsSlider from "@/components/home/ExpressGiftsSlider";
import ProductCarousel from "@/components/home/ProductCarousel";
import CollectionsGrid from "@/components/home/CollectionsGrid";
import OffersBanner from "@/components/home/OffersBanner";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const curatedItems: CardStackItem[] = [
    {
      id: 1,
      title: "Luxury Rose Gold Watch",
      description: "A timeless piece for a timeless bond. Complete with a stunning matching bracelet.",
      imageSrc: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
      tag: "ANNIVERSARY",
    },
    {
      id: 2,
      title: "French Perfume Gift Box",
      description: "Signature floral notes beautifully packaged in an elegant velvet box.",
      imageSrc: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80",
      tag: "BIRTHDAY",
    },
    {
      id: 3,
      title: "Artisan Macaron Hamper",
      description: "Handcrafted Belgian chocolates paired with authentic French macarons.",
      imageSrc: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&q=80",
      tag: "THANK YOU",
    },
    {
      id: 4,
      title: "Personalized Leather Wallet",
      description: "Genuine Italian leather with custom monogramming for that special someone.",
      imageSrc: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
      tag: "FOR HIM",
    }
  ];

  // Dummy data for carousels
  const dummyProducts = [
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
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* 1. Hero Section */}
        <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-white">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute w-[150vw] h-full flex items-center justify-center animate-wave-line mix-blend-multiply opacity-90">
              <div className="absolute w-[60vw] max-w-[800px] h-[300px] bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-[100px] -translate-x-1/4 animate-blob"></div>
              <div className="absolute w-[60vw] max-w-[800px] h-[300px] bg-gradient-to-l from-violet-600 to-blue-500 rounded-full blur-[100px] translate-x-1/4 animate-blob animation-delay-2000"></div>
              <div className="absolute w-[40vw] max-w-[600px] h-[200px] bg-gradient-to-t from-fuchsia-500 to-pink-500 rounded-full blur-[80px] animate-blob animation-delay-4000"></div>
              <div className="absolute w-[200vw] h-[200px] flex items-center justify-center -rotate-12 z-10 mix-blend-overlay">
                <svg className="absolute w-full h-full animate-wave-slide drop-shadow-[0_0_10px_rgba(255,255,255,1)]" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <path d="M 0,50 Q 50,0 100,50 T 200,50 T 300,50 T 400,50" fill="none" stroke="white" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white pointer-events-none"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-heading font-medium text-gray-900 mb-6 leading-none max-w-6xl tracking-tighter animate-fade-up delay-200">
              <span className="font-sans font-light italic text-gray-800">give</span> a feeling.
            </h1>
            <p className="text-base md:text-lg text-gray-500 max-w-md font-sans tracking-wide leading-relaxed mb-12 animate-fade-up delay-300">
              Stop searching for products. Start sharing emotions. Meaningful gifting, made effortless.
            </p>
          </div>
        </section>

        {/* 2-5. Intent Selector */}
        <section className="px-4 animate-fade-up delay-400 relative z-20">
          <IntentSelector />
        </section>

        {/* 6. Trending Gifts (ProductCarousel) - Replaces CuratedForYou Stack to look more like a real e-commerce site */}
        <div className="mt-8">
          <ProductCarousel 
            title="Trending Now" 
            subtitle="Handpicked premium gifts for upcoming occasions" 
            products={dummyProducts} 
          />
        </div>

        {/* 7. Collections Grid (Occasions, Festivals, Special Days, Sentiments) */}
        <CollectionsGrid />

        {/* 8. Offers Banner (Sleek & Premium) */}
        <OffersBanner />

        {/* 9. Same-Day Delivery Banner */}
        <ExpressGiftsSlider />
        
      </main>
      
      <Footer />
    </div>
  );
}
