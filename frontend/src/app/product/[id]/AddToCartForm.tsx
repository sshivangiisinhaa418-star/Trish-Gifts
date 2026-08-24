"use client";

import { useState } from "react";
import { Plus, Minus, Gift } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
export default function AddToCartForm({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  
  // Gifting Options
  const [giftWrap, setGiftWrap] = useState(false);
  const [greetingCard, setGreetingCard] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  const handleAddToCart = () => {
    setIsAdding(true);
    
    addToCart({
      productId: product.id ? String(product.id) : undefined,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity,
      giftingOptions: {
        giftWrap,
        greetingCard,
        giftMessage,
        deliveryDate
      }
    });

    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="space-y-6">
      {/* Gifting Personalization Options */}
      <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2 text-[#500000]">
          <Gift className="w-5 h-5" />
          <h3 className="font-bold uppercase tracking-widest text-xs">Gift Packaging & Personalization</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className={`flex items-center justify-between cursor-pointer p-3.5 rounded-xl border transition-all ${giftWrap ? 'bg-amber-50/80 border-[#500000] text-[#500000]' : 'bg-white border-stone-200 text-gray-800 hover:border-stone-400'}`}>
            <div className="flex items-center gap-2.5">
              <input 
                type="checkbox" 
                checked={giftWrap}
                onChange={(e) => setGiftWrap(e.target.checked)}
                className="w-4 h-4 text-[#500000] rounded focus:ring-[#500000]" 
              />
              <span className="text-xs font-semibold">🎁 Premium Gift Wrap</span>
            </div>
            <span className="text-xs font-bold">+₹250</span>
          </label>
          
          <label className={`flex items-center justify-between cursor-pointer p-3.5 rounded-xl border transition-all ${greetingCard ? 'bg-amber-50/80 border-[#500000] text-[#500000]' : 'bg-white border-stone-200 text-gray-800 hover:border-stone-400'}`}>
            <div className="flex items-center gap-2.5">
              <input 
                type="checkbox" 
                checked={greetingCard}
                onChange={(e) => setGreetingCard(e.target.checked)}
                className="w-4 h-4 text-[#500000] rounded focus:ring-[#500000]" 
              />
              <span className="text-xs font-semibold">✍️ Calligraphy Card</span>
            </div>
            <span className="text-xs font-bold">+₹150</span>
          </label>
        </div>

        {/* Custom Handwritten Calligraphy Card Note */}
        <div className="pt-2">
          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1.5">
            Handwritten Greeting Card Message (Optional)
          </label>
          <textarea 
            value={giftMessage}
            onChange={(e) => setGiftMessage(e.target.value)}
            placeholder="Write your heartfelt message here... Our calligraphy team will handwrite it on a physical luxury gift card." 
            className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-sm font-serif text-black placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 h-24 resize-none shadow-xs"
          ></textarea>
        </div>
        
        {/* Preferred Delivery Date */}
        <div>
          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1.5">
            Preferred Target Delivery Date (Optional)
          </label>
          <input 
            type="date" 
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-sm text-black font-semibold focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 shadow-xs" 
          />
        </div>
      </div>
      
      {/* Add to Cart Area */}
      <div className="flex items-center gap-4 pt-4">
        <div className="flex items-center bg-stone-50 rounded-full border border-stone-200 p-1 shrink-0">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-white hover:shadow-sm transition-all"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-10 text-center font-medium text-gray-900">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-white hover:shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <button 
          onClick={handleAddToCart}
          disabled={isAdding}
          className="flex-1 py-4 bg-gray-900 text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#500000] transition-colors shadow-lg hover:shadow-xl disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
