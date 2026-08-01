import Header from "@/components/layout/Header";
import ExpressGiftsSlider from "@/components/home/ExpressGiftsSlider";
import ProductCarousel from "@/components/home/ProductCarousel";
import CollectionsGrid from "@/components/home/CollectionsGrid";
import OffersBanner from "@/components/home/OffersBanner";
import Footer from "@/components/layout/Footer";
import { getAllProducts } from "@/app/actions/store";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getAllProducts();

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
            <p className="text-base md:text-lg text-gray-500 max-w-md font-sans tracking-wide leading-relaxed mb-10 animate-fade-up delay-300">
              Stop searching for products. Start sharing emotions. Meaningful gifting, made effortless.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-300">
              <Link
                href="/discover"
                className="px-8 py-4 bg-[#500000] text-white font-semibold rounded-full hover:bg-[#600000] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm md:text-base tracking-wide flex items-center gap-2 group"
              >
                Explore Gift Catalog
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/gift-finder"
                className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-sm md:text-base tracking-wide flex items-center gap-2"
              >
                ✨ AI Gift Customizer
              </Link>
            </div>
          </div>
        </section>

        {/* 2. Trending Gifts (ProductCarousel) */}
        <div className="mt-8">
          <ProductCarousel 
            title="Trending Now" 
            subtitle="Handpicked premium gifts for upcoming occasions" 
            products={products} 
          />
        </div>

        {/* 7. Collections Grid (Occasions, Festivals, Special Days, Sentiments) */}
        <CollectionsGrid />

        {/* 8. Offers Banner (Sleek & Premium) */}
        <OffersBanner />

        {/* 9. Same-Day Delivery Banner */}
        <ExpressGiftsSlider />

        {/* 10. Luxury Brand Heritage & Concierge Banner */}
        <section className="py-20 bg-gradient-to-br from-gray-900 via-[#2a0000] to-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-300 mb-4 block">The TRISH Experience</span>
            <h2 className="text-4xl md:text-6xl font-heading font-light mb-6 leading-tight" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              Elevate Every Occasion into a Masterpiece of Emotion.
            </h2>
            <p className="text-gray-300 text-base md:text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              Experience our white-glove concierge delivery, sentiment-curated recommendations, and handcrafted luxury packaging designed to turn simple gestures into lifelong memories.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/concierge"
                className="w-full sm:w-auto px-10 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-amber-50 hover:text-[#500000] transition-all duration-300 shadow-xl text-sm uppercase tracking-widest"
              >
                Explore Bespoke Concierge
              </Link>
              <Link
                href="/heritage"
                className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-white/40 text-white font-bold rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 text-sm uppercase tracking-widest"
              >
                Discover Our Heritage
              </Link>
            </div>
          </div>
        </section>
        
      </main>
      
      <Footer />
    </div>
  );
}

