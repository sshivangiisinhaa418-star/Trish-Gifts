import Image from "next/image";
import { Heart, Star } from "lucide-react";

interface ProductCardProps {
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  tags?: string[];
  sameDayDelivery?: boolean;
}

export default function ProductCard({
  title,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  tags = [],
  sameDayDelivery = false,
}: ProductCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="group relative flex flex-col h-full cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100 mb-4">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border border-white/20">
              {discount}% OFF
            </span>
          )}
          {sameDayDelivery && (
            <span className="bg-gray-900/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border border-gray-700/50">
              Same Day
            </span>
          )}
        </div>

        {/* Wishlist Button - Fades in on hover for a cleaner resting state */}
        <button className="absolute top-3 right-3 z-20 p-2.5 bg-white/60 backdrop-blur-md rounded-full text-gray-600 hover:text-brand-500 hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 shadow-sm">
          <Heart className="w-4 h-4" />
        </button>

        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Soft overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none"></div>
      </div>

      {/* Content Below Image (Borderless Style) */}
      <div className="flex flex-col flex-1 px-1">
        
        {/* Tags */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">
            {tags.join(" • ")}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-medium text-lg text-gray-900 leading-snug mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
          <span className="text-sm font-semibold text-gray-700">{rating}</span>
          <span className="text-xs text-gray-400 font-light">({reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-1">
          <span className="font-sans font-medium text-lg text-gray-900">₹{price.toLocaleString('en-IN')}</span>
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through font-light decoration-gray-300">₹{originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>
      </div>
    </div>
  );
}
