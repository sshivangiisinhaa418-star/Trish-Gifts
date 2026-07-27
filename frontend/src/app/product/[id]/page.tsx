import Link from "next/link";
import { ChevronRight, Star, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import ProductGallery from "@/components/product/ProductGallery";
import GiftingOptions from "@/components/product/GiftingOptions";
import GlobalNav from "@/components/layout/GlobalNav";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

// Mock data fetching based on ID
const getProductDetails = (id: string) => {
  return {
    id,
    title: "The Midnight Velvet Perfume Set",
    description: "An incredibly sophisticated fragrance paired with a moisturizing body lotion, presented in an elegant velvet keepsake box. Perfect for leaving a lasting, memorable impression on an anniversary or milestone birthday.",
    price: 3499,
    originalPrice: 4999,
    rating: 4.8,
    reviews: 124,
    images: [
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615397323862-5883d65a39cb?q=80&w=1200&auto=format&fit=crop",
    ],
    features: [
      "100ml Eau De Parfum",
      "250ml Body Lotion",
      "Velvet Keepsake Box",
      "Handcrafted in France"
    ],
    tags: ["ANNIVERSARY", "WIFE", "PREMIUM"],
    sameDayDelivery: true,
  };
};

export default async function ProductPage({ params }: { params: { id: string } }) {
  // Await params as required in Next.js 15+ dynamic routes (standard practice)
  const id = params.id;
  const product = getProductDetails(id);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pb-24">
        <div className="w-full px-4 pt-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-8 overflow-x-auto whitespace-nowrap hide-scrollbar">
            <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/discover" className="hover:text-brand-600 transition-colors">Gifts</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="#" className="hover:text-brand-600 transition-colors">{product.tags[0]}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 line-clamp-1">{product.title}</span>
          </nav>

          {/* Product Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            
            {/* Left: Product Gallery (Takes up 6 columns on desktop) */}
            <div className="lg:col-span-6 lg:sticky lg:top-32 h-fit">
              <ProductGallery images={product.images} />
            </div>

            {/* Right: Product Info & Actions (Takes up 6 columns on desktop) */}
            <div className="lg:col-span-6 flex flex-col pt-2 md:pt-4 animate-fade-up">
              
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4">
                {discount > 0 && (
                  <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {discount}% OFF
                  </span>
                )}
                {product.sameDayDelivery && (
                  <span className="bg-gray-900 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                    <Truck className="w-3 h-3" /> Same Day
                  </span>
                )}
              </div>

              {/* Title & Reviews */}
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight mb-4 tracking-tight"
                style={{ fontFamily: 'var(--font-cormorant), serif' }}
              >
                {product.title}
              </h1>
              
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500 opacity-50" />
                </div>
                <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                <span className="text-sm text-brand-600 hover:underline cursor-pointer">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3 mb-6">
                <span className="text-4xl font-sans font-medium text-gray-900 tracking-tight">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through mb-1 font-light">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-gray-500 mb-1.5 ml-2">Inclusive of all taxes</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 font-light leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Gifting Features Component */}
              <div className="mb-12">
                <GiftingOptions />
              </div>

              {/* Premium Accordions */}
              <div className="flex flex-col border-t border-gray-200">
                <details className="group border-b border-gray-200 cursor-pointer">
                  <summary className="flex items-center justify-between py-5 text-sm font-medium text-gray-900 group-open:text-brand-600 transition-colors uppercase tracking-widest list-none">
                    The Story
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="text-gray-500 font-light leading-relaxed pb-5 text-sm">
                    Crafted in the historic perfume houses of Grasse, France. This exquisite blend requires over 200 hours of delicate maceration, resulting in a scent that is both deeply personal and universally enchanting.
                  </p>
                </details>

                <details className="group border-b border-gray-200 cursor-pointer">
                  <summary className="flex items-center justify-between py-5 text-sm font-medium text-gray-900 group-open:text-brand-600 transition-colors uppercase tracking-widest list-none">
                    Shipping & Returns
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="text-gray-500 font-light leading-relaxed pb-5 text-sm">
                    Complimentary express shipping on all orders above ₹2000. Delivered in our signature TRISH premium packaging. For hygiene reasons, fragrance products cannot be returned once the seal is broken.
                  </p>
                </details>
              </div>

              {/* Product Trust Signals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100 opacity-60">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-brand-600" />
                  <span className="text-sm font-medium text-gray-900">100% Authentic Quality</span>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-brand-600" />
                  <span className="text-sm font-medium text-gray-900">Easy Returns in 7 Days</span>
                </div>
              </div>

            </div>
          </div>
          
          {/* The Perfect Pairing (Cross-Sell) */}
          <div className="mt-32 pt-16 border-t border-gray-100 animate-fade-up delay-300">
            <h2 
              className="text-3xl md:text-4xl text-center text-gray-900 mb-12"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              The Perfect Pairing
            </h2>
            <div className="flex overflow-x-auto gap-6 lg:gap-8 pb-8 snap-x hide-scrollbar">
              {[
                { img: "1549465220-1a8b9238cd48", name: "Pink Silk Gift Box", price: "₹899" },
                { img: "1607344645866-009c320b63e0", name: "Premium Gift Wrapping", price: "₹250" },
                { img: "1577900232427-18219b9166a0", name: "Scented Soy Candle", price: "₹1,299" },
                { img: "1544967082-d9d25d867d66", name: "Organic Skincare Set", price: "₹2,499" },
                { img: "1583394834720-ebaf9a245976", name: "Luxury Perfume", price: "₹3,999" },
                { img: "1608248543803-ba4f8c70ae0b", name: "Velvet Sleep Mask", price: "₹699" }
              ].map((item, idx) => (
                <Link key={idx} href={`/product/${idx + 10}`} className="group cursor-pointer w-[260px] md:w-[280px] lg:w-[320px] flex-shrink-0 snap-start">
                  <div className="relative aspect-[4/5] mb-4 overflow-hidden rounded-xl bg-gray-50 shadow-sm">
                    <img 
                      src={`https://images.unsplash.com/photo-${item.img}?auto=format&fit=crop&q=80&w=600`} 
                      alt={item.name} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-1000 ease-out" 
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 uppercase tracking-widest text-xs mb-1 group-hover:text-brand-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 font-light text-sm">{item.price}</p>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
