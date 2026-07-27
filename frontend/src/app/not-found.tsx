import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Home } from "lucide-react";
import GlobalNav from "@/components/layout/GlobalNav";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col">
      <header className="w-full bg-white border-b border-gray-100 hidden lg:block relative z-40">
        <GlobalNav />
      </header>

      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1600&q=80"
            alt="Missing Gift"
            fill
            className="object-cover opacity-80 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#500000]/80 mix-blend-multiply" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto animate-fade-up">
          <span className="text-sm font-bold text-white/50 uppercase tracking-[0.3em] mb-6 block">Error 404</span>
          
          <h1 className="text-6xl md:text-8xl text-white font-light mb-6 tracking-wide drop-shadow-lg" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            Lost in Transit
          </h1>
          
          <p className="text-xl text-white/80 font-light mb-12 leading-relaxed">
            The bespoke page you are searching for seems to have been misplaced. Allow our concierge to guide you back.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href="/"
              className="flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-full hover:bg-stone-100 transition-colors shadow-lg hover:shadow-xl font-bold uppercase tracking-widest text-sm"
            >
              <Home className="w-4 h-4" />
              Return Home
            </Link>
            <Link 
              href="/concierge"
              className="flex items-center gap-3 px-8 py-4 bg-transparent border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors font-bold uppercase tracking-widest text-sm"
            >
              Contact Concierge
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
