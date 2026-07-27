import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, Clock, Heart, Share2, ShieldCheck, Truck } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getProductById } from "@/app/actions/store";
import AddToCartForm from "./AddToCartForm";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  // Handle both DB and legacy dummy product formats for rendering
  const title = product.name || product.title;
  const image = (product.images && product.images.length > 0) ? product.images[0] : (product.image || "");
  const price = product.price;
  const originalPrice = product.compare_at_price || product.originalPrice;
  const category = product.intent || product.category || "Gift";
  const rating = product.rating || 5;
  const reviews = product.reviews || 24;
  const tags = product.tags || (product.intent ? [product.intent] : []);
  const sameDayDelivery = product.sameDayDelivery || false;
  
  // Format description & features
  const description = product.description || `A carefully curated ${category.toLowerCase()} perfect for gifting. Elegantly packaged and ready to create a memorable unboxing experience. Give a feeling, not just a product.`;
  const features = product.features || [];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <Link href="/discover" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Discover
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Column - Images */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-stone-50">
              {image ? (
                <Image 
                  src={image} 
                  alt={title} 
                  fill 
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-stone-100">No Image Available</div>
              )}
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {sameDayDelivery && (
                  <span className="bg-gray-900/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                    Same-Day Delivery
                  </span>
                )}
                {originalPrice && (
                  <span className="bg-red-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                    Save ₹{(originalPrice - price).toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>
            
            {/* Multiple Images Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {product.images.map((img: string, idx: number) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-stone-50 border border-stone-200">
                    <Image src={img} alt={`${title} view ${idx+1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
            
            {/* Guarantee features */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-2xl">
                <ShieldCheck className="w-6 h-6 text-brand-600" />
                <span className="text-xs font-medium text-gray-700">Premium Quality Assured</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-2xl">
                <Truck className="w-6 h-6 text-brand-600" />
                <span className="text-xs font-medium text-gray-700">White-Glove Delivery</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Product Info & Actions */}
          <div className="w-full lg:w-1/2 flex flex-col justify-start pt-4">
            
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
                  {category}
                </span>
                {product.stock !== undefined && (
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400 bg-gray-50 px-2 py-1 rounded">
                    Stock: {product.stock}
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-900 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              {title}
            </h1>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-sm font-bold text-amber-700">{rating}</span>
              </div>
              <span className="text-sm text-gray-500 font-light underline">{reviews} reviews</span>
            </div>
            
            <div className="flex items-end gap-4 mb-10">
              <span className="text-3xl font-medium text-gray-900">₹{price.toLocaleString('en-IN')}</span>
              {originalPrice && (
                <span className="text-lg text-gray-400 line-through mb-1">₹{originalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>
            
            <p className="text-gray-600 font-light leading-relaxed mb-6">
              {description}
            </p>

            {features.length > 0 && (
              <ul className="mb-10 space-y-2">
                {features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 font-light">
                    <span className="text-brand-600 mt-1">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}
            
            {/* Client Component for Interactive Add to Cart & Gifting Options */}
            <AddToCartForm product={{ title, price, image }} />
            
            <div className="mt-12 border-t border-gray-100 pt-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4">Great For</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
