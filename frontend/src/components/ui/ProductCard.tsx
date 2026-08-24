'use client';

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/lib/context/WishlistContext";
import { useCart } from "@/lib/context/CartContext";
import { useAuth } from "@/lib/context/AuthContext";

export interface ProductCardProps {
  id?: string | number;
  title?: string; // Old dummy prop
  name?: string;  // New DB prop
  price: number;
  originalPrice?: number; // Old dummy prop
  compare_at_price?: number | null; // New DB prop
  rating?: number;
  reviews?: number;
  image?: string; // Old dummy prop
  images?: string[]; // New DB prop
  tags?: string[];
  intent?: string; // New DB prop
  sameDayDelivery?: boolean;
}

export default function ProductCard(props: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  // Normalize old dummy props vs new DB props
  const id = props.id || "1";
  const title = props.name || props.title || "Untitled Product";
  const price = props.price || 0;
  const originalPrice = props.compare_at_price || props.originalPrice;
  const image = (props.images && props.images.length > 0) ? props.images[0] : (props.image || "");
  const rating = props.rating || 5;
  const reviews = props.reviews || 24;
  const sameDayDelivery = props.sameDayDelivery || false;
  
  // Tags normalization
  let tags = props.tags || [];
  if (props.intent && tags.length === 0) {
    tags = [props.intent];
  }

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const isLiked = isInWishlist(id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();

    toggleWishlist({
      id: id,
      title,
      price,
      originalPrice,
      rating,
      reviews,
      image,
      tags,
      sameDayDelivery,
      category: "Catalog"
    } as any);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();

    addToCart({
      productId: String(id),
      title,
      price,
      image,
      quantity: 1,
      giftingOptions: {
        giftWrap: false,
        greetingCard: false,
        giftMessage: "",
        deliveryDate: ""
      }
    });
  };

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

        {/* Wishlist Button */}
        <button 
          onClick={handleWishlistClick} 
          className={`absolute top-3 right-3 z-20 p-2.5 backdrop-blur-md rounded-full transition-all duration-300 shadow-sm hover:shadow-md ${
            isLiked 
              ? "bg-white text-red-500 opacity-100" 
              : "bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500" : ""}`} />
        </button>

        {image ? (
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-stone-100">No Image</div>
        )}
        
        {/* Soft overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        {/* Quick Add Button */}
        <div className="absolute bottom-4 left-4 right-4 z-20 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={handleQuickAdd}
            className="w-full py-3 bg-white/95 backdrop-blur-md hover:bg-[#500000] text-gray-900 hover:text-white text-xs font-bold uppercase tracking-widest rounded-full flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <ShoppingBag className="w-4 h-4" /> Quick Add
          </button>
        </div>
      </div>

      {/* Content Below Image (Borderless Style) */}
      <div className="flex flex-col flex-1">
        
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex items-center gap-1.5 mb-1.5 overflow-hidden">
            <span className="text-[10px] font-semibold text-brand-600 uppercase tracking-widest truncate">
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
