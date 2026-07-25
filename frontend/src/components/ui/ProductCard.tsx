import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";

interface ProductCardProps {
  id?: string | number;
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
  id = "1",
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
    <Link href={`/product/${id}`} className="group relative flex flex-col h-full cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-50 mb-3 border border-gray-100 transition-all duration-500 group-hover:shadow-lg group-hover:-translate-y-1">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="bg-white/95 backdrop-blur-sm text-gray-900 text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest shadow-sm">
              {discount}% OFF
            </span>
          )}
          {sameDayDelivery && (
            <span className="bg-gray-900/95 backdrop-blur-sm text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest shadow-sm">
              Same Day
            </span>
          )}
        </div>

        {/* Wishlist Button - Fades in on hover for a cleaner resting state */}
        <button 
          onClick={(e) => e.preventDefault()} 
          className="absolute top-3 right-3 z-20 p-2.5 bg-white/80 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 shadow-sm hover:shadow-md"
        >
          <Heart className="w-4 h-4" />
        </button>

        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Soft overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>

      {/* Content Below Image (Borderless Style) */}
      <div className="flex flex-col flex-1">
        
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-[10px] font-semibold text-brand-600 uppercase tracking-widest">
              {tags.join(" • ")}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="font-sans font-medium text-[16px] text-gray-900 leading-tight mb-1.5 group-hover:text-brand-600 transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
          <span className="text-[13px] font-medium text-gray-700">{rating}</span>
          <span className="text-[12px] text-gray-400">({reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-auto pt-1">
          <span className="font-sans font-semibold text-[15px] text-gray-900">₹{price.toLocaleString('en-IN')}</span>
          {originalPrice && (
            <span className="text-[13px] text-gray-400 line-through">₹{originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
