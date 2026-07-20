import Header from "@/components/layout/Header";
import IntentSelector from "@/components/home/IntentSelector";
import ProductCard from "@/components/ui/ProductCard";
import { CardStack, CardStackItem } from "@/components/ui/card-stack";
import OccasionsBanner from "@/components/home/OccasionsBanner";
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
      imageSrc: "https://images.unsplash.com/photo-1594035910387-fea47714263f?w=800&q=80",
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
    },
    {
      id: 5,
      title: "Signature Floral Arrangement",
      description: "Fresh orchids and roses arranged by master florists.",
      imageSrc: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80",
      tag: "ROMANCE",
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-white">
          {/* Animated Background Elements - Clean White with Color Wave */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            
            {/* The waving gradient container */}
            <div className="absolute w-[150vw] h-full flex items-center justify-center animate-wave-line mix-blend-multiply opacity-90">
              {/* Vibrant Blobs creating the colorful wave */}
              <div className="absolute w-[60vw] max-w-[800px] h-[300px] bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-[100px] -translate-x-1/4 animate-blob"></div>
              <div className="absolute w-[60vw] max-w-[800px] h-[300px] bg-gradient-to-l from-violet-600 to-blue-500 rounded-full blur-[100px] translate-x-1/4 animate-blob animation-delay-2000"></div>
              <div className="absolute w-[40vw] max-w-[600px] h-[200px] bg-gradient-to-t from-fuchsia-500 to-pink-500 rounded-full blur-[80px] animate-blob animation-delay-4000"></div>
              
              {/* The continuous flowing wave line */}
              <div className="absolute w-[200vw] h-[200px] flex items-center justify-center -rotate-12 z-10 mix-blend-overlay">
                <svg className="absolute w-full h-full animate-wave-slide drop-shadow-[0_0_10px_rgba(255,255,255,1)]" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <path d="M 0,50 Q 50,0 100,50 T 200,50 T 300,50 T 400,50" fill="none" stroke="white" strokeWidth="2" />
                </svg>
              </div>
            </div>
            
            {/* White vignette over edges to ensure they fade seamlessly into the white background */}
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

        {/* Intent Selector (Who & Why) */}
        <section className="px-4 animate-fade-up delay-400">
          <IntentSelector />
        </section>

        {/* Recommended Gifts */}
        <section className="py-20 container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900">Curated For You</h2>
              <p className="text-gray-500 mt-2">Based on current trends and upcoming occasions</p>
            </div>
            <button className="hidden sm:block text-primary font-medium hover:text-brand-700 transition-colors">
              View All
            </button>
          </div>
          
          <div className="w-full flex justify-center pb-12 overflow-hidden pt-10">
            <CardStack
              items={curatedItems}
              initialIndex={0}
              autoAdvance
              intervalMs={3000}
              pauseOnHover
              showDots
              cardWidth={280}
              cardHeight={360}
            />
          </div>
        </section>
        
        {/* Occasions Banner */}
        <OccasionsBanner />
      </main>
      
      <Footer />
    </div>
  );
}
