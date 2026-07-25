"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return <div className="w-full aspect-square bg-gray-100 rounded-2xl animate-pulse"></div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full">
      {/* Desktop Thumbnails (Left side) */}
      <div className="hidden md:flex flex-col gap-4 w-24">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`relative w-full aspect-[4/5] rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              activeIndex === idx ? "border-brand-600 opacity-100 scale-105" : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <img src={img} alt={`Thumbnail ${idx + 1}`} className="object-cover w-full h-full" />
          </button>
        ))}
      </div>

      {/* Main Image Container */}
      <div className="relative flex-1 w-full aspect-square md:max-h-[550px] rounded-2xl overflow-hidden bg-gray-50 group shadow-sm border border-gray-100 animate-fade-up mx-auto">
        <img
          src={images[activeIndex]}
          alt="Main Product"
          className="object-cover w-full h-full transition-all duration-1000 ease-out group-hover:scale-105"
        />

        {/* Mobile / Hover Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-sm text-gray-700 hover:text-brand-600 hover:bg-white transition-all opacity-0 md:group-hover:opacity-100 focus:opacity-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-sm text-gray-700 hover:text-brand-600 hover:bg-white transition-all opacity-0 md:group-hover:opacity-100 focus:opacity-100"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Mobile Thumbnails (Bottom) */}
      <div className="flex md:hidden gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`relative flex-shrink-0 w-20 aspect-[4/5] rounded-lg overflow-hidden border-2 snap-start transition-all ${
              activeIndex === idx ? "border-brand-600 opacity-100" : "border-transparent opacity-60"
            }`}
          >
            <img src={img} alt={`Thumbnail ${idx + 1}`} className="object-cover w-full h-full" />
          </button>
        ))}
      </div>
    </div>
  );
}
