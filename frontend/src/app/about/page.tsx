import Image from "next/image";
import Link from "next/link";
import { Sparkles, Heart, Star, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "About Us | TRISH",
  description: "Learn about TRISH and our philosophy of intent-based gifting.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1577998474537-8fa01eebe064?w=1600&q=80"
            alt="Beautifully wrapped gifts"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#500000]/60 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10 animate-fade-up">
          <h1 className="text-4xl md:text-6xl text-white font-light mb-6 tracking-wide" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            The TRISH Story
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
            Redefining the art of gifting through emotion, elegance, and intentionality.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 md:py-32 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-5 h-5 text-[#500000]" />
                <span className="text-xs font-bold text-[#500000] uppercase tracking-widest">Our Philosophy</span>
              </div>
              <h2 className="text-3xl md:text-5xl text-gray-900 font-light leading-tight" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                Intent-Based Gifting
              </h2>
              <p className="text-gray-600 font-light leading-relaxed text-lg">
                At TRISH, we believe that the best gifts aren't just objects—they are vessels of emotion. We moved away from the traditional model of shopping by product category and instead focus on the <strong>'Who'</strong> and the <strong>'Why'</strong>.
              </p>
              <p className="text-gray-600 font-light leading-relaxed text-lg">
                Whether you're expressing gratitude, celebrating a milestone, or offering comfort, our curated collections are designed to perfectly articulate your feelings when words fall short.
              </p>
            </div>
            
            <div className="w-full md:w-1/2 relative h-[500px] rounded-bl-[100px] rounded-tr-[100px] overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&q=80"
                alt="Curated gift box"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Artisans Section */}
      <section className="py-20 bg-[#f5f5f5]">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="flex flex-col-reverse md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2 relative h-[450px] group">
              {/* Glowing Background / Shine */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-amber-200 via-transparent to-amber-100 opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-700 rounded-[2rem]" />
              
              {/* Classic Border Frame */}
              <div className="relative w-full h-full p-3 bg-white border-2 border-[#500000]/20 rounded-tl-[80px] rounded-br-[80px] rounded-tr-xl rounded-bl-xl shadow-2xl">
                <div className="relative w-full h-full overflow-hidden rounded-tl-[68px] rounded-br-[68px] rounded-tr-lg rounded-bl-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80"
                    alt="Artisan crafting a gift"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Subtle shine overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent mix-blend-overlay" />
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-5 h-5 text-[#500000]" />
                <span className="text-xs font-bold text-[#500000] uppercase tracking-widest">Our Partners</span>
              </div>
              <h2 className="text-3xl md:text-4xl text-gray-900 font-light leading-tight" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                Artisan Craftsmanship
              </h2>
              <p className="text-gray-600 font-light leading-relaxed text-lg">
                We travel the world to partner with independent artisans, luxury designers, and master craftsmen. Every product that makes it into a TRISH box has a story of its own.
              </p>
              <p className="text-gray-600 font-light leading-relaxed text-lg">
                By focusing on sustainable, ethical sourcing and unparalleled attention to detail, we ensure that your gift is not only beautiful but also ethically made.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white border-y border-stone-200">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-gray-900 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              The TRISH Standard
            </h2>
            <div className="w-16 h-px bg-[#500000] mx-auto mt-6" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 text-left">
            {/* Value 1 */}
            <div className="flex flex-col group cursor-default">
              <div className="pb-6 border-b border-gray-200 mb-6 flex justify-between items-end group-hover:border-[#500000] transition-colors duration-700">
                <span className="text-5xl text-gray-200 font-light transition-colors duration-700 group-hover:text-gray-300" style={{ fontFamily: 'var(--font-cormorant), serif' }}>01</span>
                <Star className="w-6 h-6 text-[#500000]/40 group-hover:text-[#500000] transition-colors duration-700" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl text-gray-900 mb-4 tracking-wide" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Curated Excellence</h3>
              <p className="text-gray-500 font-light leading-relaxed text-[15px]">
                Every item is rigorously selected for uncompromising quality, aesthetic appeal, and deep emotional resonance.
              </p>
            </div>
            
            {/* Value 2 */}
            <div className="flex flex-col group cursor-default">
              <div className="pb-6 border-b border-gray-200 mb-6 flex justify-between items-end group-hover:border-[#500000] transition-colors duration-700">
                <span className="text-5xl text-gray-200 font-light transition-colors duration-700 group-hover:text-gray-300" style={{ fontFamily: 'var(--font-cormorant), serif' }}>02</span>
                <ShieldCheck className="w-6 h-6 text-[#500000]/40 group-hover:text-[#500000] transition-colors duration-700" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl text-gray-900 mb-4 tracking-wide" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Signature Packaging</h3>
              <p className="text-gray-500 font-light leading-relaxed text-[15px]">
                The unboxing experience is crucial. Our bespoke TRISH packaging ensures a breathtaking first impression.
              </p>
            </div>
            
            {/* Value 3 */}
            <div className="flex flex-col group cursor-default">
              <div className="pb-6 border-b border-gray-200 mb-6 flex justify-between items-end group-hover:border-[#500000] transition-colors duration-700">
                <span className="text-5xl text-gray-200 font-light transition-colors duration-700 group-hover:text-gray-300" style={{ fontFamily: 'var(--font-cormorant), serif' }}>03</span>
                <Heart className="w-6 h-6 text-[#500000]/40 group-hover:text-[#500000] transition-colors duration-700" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl text-gray-900 mb-4 tracking-wide" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Meaningful Connection</h3>
              <p className="text-gray-500 font-light leading-relaxed text-[15px]">
                We are dedicated to helping you forge deeper connections with loved ones through the profound power of giving.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 text-center px-4">
        <h2 className="text-3xl text-gray-900 font-light mb-8" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
          Ready to find the perfect expression?
        </h2>
        <Link 
          href="/discover" 
          className="inline-flex items-center justify-center px-8 py-3.5 border border-[#500000] text-[#500000] font-medium tracking-widest uppercase hover:bg-[#500000] hover:text-white transition-all duration-300 shadow-sm"
        >
          Explore Our Collection
        </Link>
      </section>
    </div>
  );
}
