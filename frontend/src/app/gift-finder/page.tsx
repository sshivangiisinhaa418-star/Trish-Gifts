import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GiftWizard from "@/components/gift-finder/GiftWizard";
import Image from "next/image";
import { getAllProducts } from "@/app/actions/store";

export const metadata = {
  title: "AI Gift Finder | TRISH",
  description: "Find the perfect gift in seconds with our AI Gift Finder.",
};

export default async function GiftFinderPage() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col md:flex-row">
        {/* Left Side: Visual/Editorial Card */}
        <div className="w-full md:w-5/12 p-8 md:p-12 lg:p-20 flex items-center justify-center min-h-[40vh] md:min-h-[calc(100vh-80px)]">
          <div className="relative w-full h-full max-h-[650px] min-h-[450px] rounded-[2rem] overflow-hidden shadow-2xl border border-gray-200 group flex flex-col justify-end p-8 md:p-10">
            
            <div className="absolute inset-0">
              <Image 
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&q=80" 
                alt="Luxury Gifting" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />
              {/* Elegant dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10" />
            </div>
            
            {/* Inner elegant border */}
            <div className="absolute inset-4 border border-white/20 rounded-[1.5rem] pointer-events-none z-10" />
            <div className="absolute inset-5 border border-white/10 rounded-[1.25rem] pointer-events-none z-10" />

            <div className="relative z-20 text-white mt-auto">
            <span className="uppercase tracking-[0.25em] text-[10px] font-bold mb-6 block text-[#E2C792]">TRISH Concierge</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 font-light leading-tight drop-shadow-lg" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              The Perfect Gift,<br />
              <span className="italic text-white/90">Curated for You.</span>
            </h1>
            <p className="text-white/80 max-w-sm text-base md:text-lg font-light leading-relaxed drop-shadow-md">
              Answer three simple questions and let our AI curate a highly personalized selection of extraordinary gifts guaranteed to leave a lasting impression.
            </p>
          </div>
        </div>
      </div>

        {/* Right Side: Quiz */}
        <div className="w-full md:w-7/12 bg-[#faf9f6] px-6 py-16 md:py-24 md:px-12 lg:px-24 flex items-center justify-center min-h-[60vh] md:min-h-[calc(100vh-80px)] relative">
          
          {/* Classic Double Frame Border */}
          <div className="absolute inset-4 md:inset-8 border-[1px] border-[#500000]/15 pointer-events-none rounded-xl" />
          <div className="absolute inset-5 md:inset-10 border-[1px] border-[#500000]/5 pointer-events-none rounded-lg" />
          
          <div className="w-full max-w-3xl relative z-10 bg-white/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
            <GiftWizard />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
