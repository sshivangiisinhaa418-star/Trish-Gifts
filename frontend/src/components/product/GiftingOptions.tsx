"use client";

import { useState } from "react";
import { Gift, Calendar, Plus, Minus, MessageSquare, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";

export default function GiftingOptions() {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [giftWrap, setGiftWrap] = useState(false);
  const [greetingCard, setGreetingCard] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  const handleAddToCart = () => {
    addToCart({
      title: "The Midnight Velvet Perfume Set", // Hardcoded for demo
      price: 3499,
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800",
      quantity,
      giftingOptions: {
        giftWrap,
        greetingCard,
        giftMessage,
        deliveryDate
      }
    });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Intent-Based Gifting Features */}
      <div className="bg-stone-50 border border-stone-200/60 rounded-xl p-8 shadow-sm flex flex-col gap-6">
        <div className="flex items-center gap-4 border-b border-stone-200 pb-6">
          <div className="w-12 h-12 rounded-full bg-white border border-stone-200 flex items-center justify-center text-gray-900 shadow-sm">
            <Gift className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Make it a Gift</h3>
            <p className="text-sm text-gray-500 font-light mt-1">Personalize your experience</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-b border-gray-100 pb-5">
          {/* Gift Wrapping Toggle */}
          <label className="flex items-start justify-between cursor-pointer group">
            <div className="flex flex-col gap-1">
              <span className="font-medium text-gray-900 group-hover:text-brand-600 transition-colors">
                Premium Gift Wrap
              </span>
              <span className="text-sm text-gray-500 font-light">
                Add our signature luxury ribbon & box (+₹250)
              </span>
            </div>
            <div className="relative inline-flex items-center cursor-pointer mt-1">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={giftWrap}
                onChange={(e) => setGiftWrap(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
            </div>
          </label>

          {/* Greeting Card Toggle */}
          <label className="flex items-start justify-between cursor-pointer group pt-2">
            <div className="flex flex-col gap-1">
              <span className="font-medium text-gray-900 group-hover:text-brand-600 transition-colors">
                Physical Greeting Card
              </span>
              <span className="text-sm text-gray-500 font-light">
                Print your note on a premium card (+₹150)
              </span>
            </div>
            <div className="relative inline-flex items-center cursor-pointer mt-1">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={greetingCard}
                onChange={(e) => setGreetingCard(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
            </div>
          </label>
        </div>

        {/* Personalized Note */}
        <div className="flex flex-col gap-3 mt-2">
          <label className="flex items-center gap-2 font-medium text-gray-900 uppercase tracking-widest text-[10px]">
            Add a Note
          </label>
          <textarea
            value={giftMessage}
            onChange={(e) => setGiftMessage(e.target.value)}
            placeholder="Type your heartfelt message here..."
            className="w-full p-4 bg-white border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all resize-none h-24 font-light"
            maxLength={250}
          />
          <div className="text-xs text-gray-400 text-right">{giftMessage.length} / 250</div>
        </div>

        {/* Delivery Date Selection */}
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 font-medium text-gray-900 uppercase tracking-widest text-[10px]">
            When should we deliver?
          </label>
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all cursor-pointer font-light"
          />
        </div>
      </div>

      {/* Cart Actions */}
      <div className="flex items-center gap-4 mt-4">
        {/* Quantity Selector */}
        <div className="flex items-center bg-white border border-stone-200 rounded-full h-14 px-2 shadow-sm">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-stone-100 transition-colors"
          >
            <Minus className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <span className="w-8 text-center font-medium text-gray-900">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-stone-100 transition-colors"
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          className="flex-1 h-14 bg-[#500000] text-white rounded-full font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-3 hover:bg-[#3d0000] transition-all group shadow-[0_10px_20px_-10px_rgba(80,0,0,0.5)] hover:shadow-[0_15px_25px_-10px_rgba(80,0,0,0.6)] hover:-translate-y-0.5"
        >
          <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
