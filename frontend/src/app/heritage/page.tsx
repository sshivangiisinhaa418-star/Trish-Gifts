import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Heart, Star, ShieldCheck, Award, Clock, Feather, Crown, Gift, Palette } from "lucide-react";

export const metadata = {
  title: "Discover Our Heritage | TRISH Luxury Gifting",
  description: "Explore the art, history, and philosophy of intentional luxury gifting behind TRISH.",
};

export default function HeritagePage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col font-sans">
      <Header />
      
      <main className="flex-1">
        {/* 1. HERO SECTION: Dramatic & Luxury */}
        <section className="relative w-full h-[70vh] min-h-[550px] flex items-center justify-center overflow-hidden bg-gray-950">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=1600&q=80"
              alt="Bespoke luxury gifts and packaging"
              fill
              className="object-cover opacity-60 scale-105 animate-pulse-slow transition-transform duration-[10000ms]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-[#500000]/40 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-6 animate-fade-up">
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-amber-300 mb-4 block flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Established in Excellence <Sparkles className="w-3.5 h-3.5" />
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-light mb-6 tracking-wide leading-none" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              The Heritage of <span className="italic font-normal text-amber-200">Emotion & Craft</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed mb-10">
              We did not set out to sell objects. We embarked on a relentless pursuit to bottle human empathy, artistry, and timeless grace into unforgettable moments.
            </p>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
          </div>
        </section>

        {/* 2. OUR GENESIS & PHILOSOPHY: Why TRISH Was Born */}
        <section className="py-24 md:py-36 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-[#500000]/10 text-[#500000] text-xs font-bold uppercase tracking-widest">
                  <Crown className="w-3.5 h-3.5 text-[#500000]" />
                  Our Origin Story
                </div>
                <h2 className="text-4xl md:text-6xl text-gray-900 font-light leading-tight tracking-tight" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                  Reclaiming the Soul of Modern Gifting
                </h2>
                <p className="text-gray-600 font-light leading-relaxed text-lg md:text-xl">
                  In an era defined by instant gratification and impersonal algorithmic recommendations, the sacred ritual of giving had been reduced to a hurried errand. TRISH was born from a radical conviction: <strong>a gift is an intimate sanctuary of unspoken love, respect, and celebration</strong>.
                </p>
                <p className="text-gray-600 font-light leading-relaxed text-lg md:text-xl">
                  We abandoned traditional retail conventions. Rather than cataloging items by utility or demographic trends, we pioneered an empathetic framework centered entirely around emotional resonance—analyzing the profound intersection between the gift-giver’s sentiment and the recipient’s individual spirit.
                </p>
                <div className="p-6 bg-[#faf9f6] border-l-4 border-[#500000] rounded-r-2xl italic text-gray-700 font-light text-lg">
                  &ldquo;To give a truly legendary gift is not an exchange of currency, but an enduring transference of soul.&rdquo;
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 relative">
                <div className="relative z-10 w-full h-[550px] rounded-tl-[100px] rounded-br-[100px] rounded-tr-2xl rounded-bl-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1000&q=80"
                    alt="Artisan craftsmanship and luxury wrapping"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-6 -left-6 z-20 bg-[#500000] text-white p-8 rounded-3xl shadow-xl max-w-xs hidden sm:block border-2 border-amber-300/30">
                  <Feather className="w-8 h-8 text-amber-300 mb-3" />
                  <p className="text-xs uppercase font-bold tracking-widest text-amber-200">Our Credo</p>
                  <p className="text-sm font-light text-white/90 mt-1">Every ribbon tied, every note written by hand with uncompromising dedication.</p>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-tr from-amber-100 to-red-100 rounded-[3rem] -z-10 blur-xl opacity-60" />
              </div>
            </div>
          </div>
        </section>

        {/* 3. TIMELINE OF EXCELLENCE: Our Evolution */}
        <section className="py-24 bg-[#faf9f6] border-y border-stone-200 relative">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="text-center mb-20">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#500000] mb-3 block">Chronicle of Innovation</span>
              <h2 className="text-4xl md:text-5xl text-gray-900 font-light tracking-tight" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                A Timeline of Unyielding Pursuit
              </h2>
              <div className="w-16 h-px bg-[#500000] mx-auto mt-6" />
            </div>

            <div className="relative pl-6 sm:pl-12 border-l-2 border-[#500000]/20 space-y-16 ml-2 sm:ml-20">
              
              {/* Milestone 1 */}
              <div className="relative group">
                <div className="absolute -left-[33px] sm:-left-[57px] top-1 w-5 h-5 sm:w-6 sm:h-6 bg-[#500000] rounded-full border-4 border-[#faf9f6] group-hover:scale-125 transition-transform duration-300 shadow-md" />
                <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-sm font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-widest">2018 — The Atelier Foundation</span>
                  <h3 className="text-2xl sm:text-3xl text-gray-900 font-medium mt-4 mb-3" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    Born in an Artisan Studio
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed text-base sm:text-lg">
                    TRISH started as a secluded salon for private clientele seeking bespoke anniversary and commemorative gifts. Working entirely with French silk ribbons, Italian parchment, and custom fragrance oils, our foundational commitment to uncompromising quality was etched into our heritage.
                  </p>
                </div>
              </div>

              {/* Milestone 2 */}
              <div className="relative group">
                <div className="absolute -left-[33px] sm:-left-[57px] top-1 w-5 h-5 sm:w-6 sm:h-6 bg-[#500000] rounded-full border-4 border-[#faf9f6] group-hover:scale-125 transition-transform duration-300 shadow-md" />
                <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-sm font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-widest">2020 — The Sentiment Matrix</span>
                  <h3 className="text-2xl sm:text-3xl text-gray-900 font-medium mt-4 mb-3" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    Pioneering Emotion-Driven Curation
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed text-base sm:text-lg">
                    Recognizing that conventional gift browsing created fatigue and anxiety, we engineered the first empirical Emotional Curation Matrix. By marrying behavioral psychology with sensory aesthetics, our collections began predicting exact sentimental expressions with unprecedented emotional accuracy.
                  </p>
                </div>
              </div>

              {/* Milestone 3 */}
              <div className="relative group">
                <div className="absolute -left-[33px] sm:-left-[57px] top-1 w-5 h-5 sm:w-6 sm:h-6 bg-[#500000] rounded-full border-4 border-[#faf9f6] group-hover:scale-125 transition-transform duration-300 shadow-md" />
                <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-sm font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-widest">2022 — Global Master Partnerships</span>
                  <h3 className="text-2xl sm:text-3xl text-gray-900 font-medium mt-4 mb-3" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    The Artisan Guild Expansion
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed text-base sm:text-lg">
                    We forged exclusive, ethical alliances with multigenerational craftspeople globally: hand-blown crystal masters in Bohemia, leather whisperers in Florence, and independent perfumers in Grasse. Every artifact inducted into a TRISH collection now carried an authenticated provenance.
                  </p>
                </div>
              </div>

              {/* Milestone 4 */}
              <div className="relative group">
                <div className="absolute -left-[33px] sm:-left-[57px] top-1 w-5 h-5 sm:w-6 sm:h-6 bg-[#500000] rounded-full border-4 border-[#faf9f6] group-hover:scale-125 transition-transform duration-300 shadow-md" />
                <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-white to-red-50/30">
                  <span className="text-sm font-bold text-[#500000] bg-[#500000]/10 px-3.5 py-1.5 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Today & Beyond — Digital Concierge Mastery
                  </span>
                  <h3 className="text-2xl sm:text-3xl text-gray-900 font-medium mt-4 mb-3" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    The Global Landmark of Celebratory Art
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed text-base sm:text-lg">
                    Today, TRISH seamlessly blends our timeless human heritage with state-of-the-art AI customization and hyper-punctual white-glove concierge logistics. Whether orchestrating an anniversary surprise halfway across the world or an intimate heartfelt tribute next door, we stand as the definitive benchmark for luxury gifting.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. THE FOUR PILLARS OF TRISH EXCELLENCE */}
        <section className="py-24 md:py-32 bg-white">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-20">
              <span className="text-xs font-bold text-[#500000] uppercase tracking-[0.3em] mb-3 block">Why We Stand Alone</span>
              <h2 className="text-4xl md:text-6xl text-gray-900 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                The Four Pillars of Our Craft
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto font-light mt-4 text-base md:text-lg">
                Our heritage is anchored by four non-negotiable principles that dictate every curation, design decision, and delivery experience.
              </p>
              <div className="w-20 h-px bg-[#500000] mx-auto mt-8" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
              {/* Pillar 1 */}
              <div className="p-10 rounded-3xl bg-[#faf9f6] border border-stone-200/80 flex flex-col justify-between group hover:border-[#500000]/40 transition-all duration-300 hover:shadow-xl">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-[#500000] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Heart className="w-7 h-7 text-amber-300" />
                    </div>
                    <span className="text-4xl font-light text-stone-300" style={{ fontFamily: 'var(--font-cormorant), serif' }}>01</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    Empathy Over Algorithms
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed text-base md:text-lg">
                    We refuse to automate sentiment. Behind our intuitive AI recommendations and gift finders sit real human empathy specialists who refine every suggestion against deep psychological resonance and occasion nuances.
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-10 rounded-3xl bg-[#faf9f6] border border-stone-200/80 flex flex-col justify-between group hover:border-[#500000]/40 transition-all duration-300 hover:shadow-xl">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-[#500000] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Award className="w-7 h-7 text-amber-300" />
                    </div>
                    <span className="text-4xl font-light text-stone-300" style={{ fontFamily: 'var(--font-cormorant), serif' }}>02</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    Artisanal Integrity
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed text-base md:text-lg">
                    Every piece in our collection is an heirloom of human dedication. From hand-poured soy candles to heirloom-grade crystal preserves, we reject mass production in favor of enduring artisanal excellence and ethical craftsmanship.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="p-10 rounded-3xl bg-[#faf9f6] border border-stone-200/80 flex flex-col justify-between group hover:border-[#500000]/40 transition-all duration-300 hover:shadow-xl">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-[#500000] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Gift className="w-7 h-7 text-amber-300" />
                    </div>
                    <span className="text-4xl font-light text-stone-300" style={{ fontFamily: 'var(--font-cormorant), serif' }}>03</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    The Architecture of Anticipation
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed text-base md:text-lg">
                    The gift occurs long before the contents are unveiled. Our signature packaging—featuring tactile linen boxes, hand-pressed wax seals, and double-sided velvet ribbons—is deliberately engineered to create a breathtaking sensory ceremony upon arrival.
                  </p>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="p-10 rounded-3xl bg-[#faf9f6] border border-stone-200/80 flex flex-col justify-between group hover:border-[#500000]/40 transition-all duration-300 hover:shadow-xl">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-[#500000] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-7 h-7 text-amber-300" />
                    </div>
                    <span className="text-4xl font-light text-stone-300" style={{ fontFamily: 'var(--font-cormorant), serif' }}>04</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    White-Glove Punctuality
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed text-base md:text-lg">
                    An emotional milestone delayed is a moment diminished. Our bespoke delivery network and concierge dispatch operate with clockwork precision, guaranteeing that your celebration is celebrated exactly when the heart intends.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. THE UNBOXING CEREMONY (Dark Immersive Section) */}
        <section className="py-24 md:py-36 bg-gradient-to-br from-[#200000] via-[#100000] to-gray-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          <div className="container mx-auto max-w-6xl px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400 block">The Tactile Experience</span>
                <h2 className="text-4xl md:text-6xl font-light leading-none" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                  An Ode to the <span className="italic font-normal text-amber-200">Unboxing Ceremony</span>
                </h2>
                <p className="text-gray-300 font-light leading-relaxed text-lg">
                  When a TRISH package arrives on a doorstep, time pauses. We have spent over half a decade refining the acoustical rustle of our acid-free parchment, the smooth draw of our satin pull-tabs, and the subtle warmth of our custom wax stampings.
                </p>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                    <span className="text-2xl text-amber-300 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>I.</span>
                    <div>
                      <h4 className="font-medium text-white text-base">Hand-Inscribed Calligraphy</h4>
                      <p className="text-sm font-light text-gray-400">Every message is individually penned with archival ink onto heavy linen cardstock.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                    <span className="text-2xl text-amber-300 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>II.</span>
                    <div>
                      <h4 className="font-medium text-white text-base">Bespoke Olfactory Accents</h4>
                      <p className="text-sm font-light text-gray-400">Box interiors are gently mitted with subtle, non-intrusive botanicals to delight the senses.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl text-amber-300 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>III.</span>
                    <div>
                      <h4 className="font-medium text-white text-base">Heirloom Keepsake Vessels</h4>
                      <p className="text-sm font-light text-gray-400">Our signature presentation chests are crafted to be retained, treasured, and re-purposed for a lifetime.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 relative">
                <div className="relative h-[550px] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(80,0,0,0.4)] border-2 border-white/20 group">
                  <Image
                    src="https://images.unsplash.com/photo-1577998474537-8fa01eebe064?w=1000&q=80"
                    alt="The TRISH Unboxing Ceremony"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-white/15">
                    <p className="text-amber-200 text-sm italic font-light">&ldquo;We do not merely deliver gifts; we deliver moments of profound grace that echo in memory long after the celebration has concluded.&rdquo;</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 6. SUSTAINABLE LUXURY PROMISE */}
        <section className="py-20 bg-[#faf9f6] border-b border-stone-200">
          <div className="container mx-auto max-w-4xl text-center px-4">
            <div className="w-16 h-16 bg-[#500000]/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="w-8 h-8 text-[#500000]" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl md:text-5xl text-gray-900 font-light mb-6" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              The Promise of Sustainable Heritage
            </h2>
            <p className="text-gray-600 font-light text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              True luxury does not compromise tomorrow. We take immense pride in our ecological stewardship: all TRISH gift boxes are produced from 100% recycled Post-Consumer fibers and FSC-certified managed forests. Our ribbons are naturally spun biodegradable silk, ensuring our celebrations bless both your loved ones and the earth we share.
            </p>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">— The TRISH Founders & Artisan Collective</span>
          </div>
        </section>

        {/* 7. GRAND CALL TO ACTION: Become Part of the Story */}
        <section className="py-28 bg-white relative">
          <div className="container mx-auto max-w-5xl px-4 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#500000] mb-3 block">Your Next Chapter</span>
            <h2 className="text-4xl md:text-6xl text-gray-900 font-light mb-6 leading-tight" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              Begin Your Heritage of Meaningful Gifting
            </h2>
            <p className="text-gray-500 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
              Step into our world of intentional expression. Let us curate your next milestone with the grace, artistry, and precision that your loved ones deserve.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link
                href="/discover"
                className="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-[#500000] to-[#700000] text-white font-semibold rounded-full hover:opacity-95 transition-all duration-300 shadow-xl hover:-translate-y-0.5 text-sm uppercase tracking-widest flex items-center justify-center gap-2"
              >
                Explore Gift Catalog →
              </Link>
              <Link
                href="/concierge"
                className="w-full sm:w-auto px-12 py-4 bg-[#faf9f6] text-gray-900 border-2 border-stone-200 font-semibold rounded-full hover:bg-stone-100 transition-all duration-300 text-sm uppercase tracking-widest"
              >
                Connect With Concierge
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
