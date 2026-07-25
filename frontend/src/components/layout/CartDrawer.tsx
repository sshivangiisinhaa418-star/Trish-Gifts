"use client";

import { useCart } from "@/lib/context/CartContext";
import { X, ShoppingBag, Gift, Calendar, MessageSquare, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const { isCartOpen, closeCart, cartItems, removeFromCart, cartTotal } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#faf9f6] z-[101] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-stone-200 bg-white">
          <h2 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            Your Gift Bag
          </h2>
          <button 
            onClick={closeCart}
            className="p-2 -mr-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full hover:bg-stone-100"
          >
            <X className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 hide-scrollbar">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 opacity-50">
              <ShoppingBag className="w-12 h-12 text-gray-400" strokeWidth={1} />
              <p className="text-gray-500 font-light">Your bag is currently empty.</p>
              <button 
                onClick={closeCart}
                className="mt-4 text-xs font-medium uppercase tracking-widest text-gray-900 border-b border-gray-900 pb-1"
              >
                Continue Exploring
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="bg-white border border-stone-200/60 rounded-xl p-4 shadow-sm flex flex-col gap-4 relative group">
                
                {/* Remove Button */}
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Product Info */}
                <div className="flex gap-4">
                  <div className="w-20 h-24 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0 border border-stone-100">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col pt-1 pr-6">
                    <h4 className="font-medium text-gray-900 leading-tight">{item.title}</h4>
                    <p className="text-sm text-gray-500 font-light mt-1">₹{item.price.toLocaleString()} × {item.quantity}</p>
                  </div>
                </div>

                {/* Gifting Add-ons */}
                {(item.giftingOptions.giftWrap || item.giftingOptions.greetingCard || item.giftingOptions.deliveryDate) && (
                  <div className="bg-[#faf9f6] rounded-lg p-3 flex flex-col gap-2 border border-stone-200">
                    {item.giftingOptions.giftWrap && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Gift className="w-3.5 h-3.5 text-gray-400" /> Premium Wrap (+₹250)
                      </div>
                    )}
                    {item.giftingOptions.greetingCard && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <MessageSquare className="w-3.5 h-3.5 text-gray-400" /> Physical Card (+₹150)
                      </div>
                    )}
                    {item.giftingOptions.deliveryDate && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" /> Deliver on: {item.giftingOptions.deliveryDate}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Custom Note Preview */}
                {item.giftingOptions.giftMessage && (
                  <div className="px-3 py-2 border-l-2 border-brand-200 bg-white">
                    <p className="text-xs text-gray-500 font-light italic line-clamp-2">"{item.giftingOptions.giftMessage}"</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {cartItems.length > 0 && (
          <div className="bg-white border-t border-stone-200 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-light">Subtotal</span>
              <span className="text-xl font-medium text-gray-900">₹{cartTotal.toLocaleString()}</span>
            </div>
            
            <Link 
              href="/checkout" 
              onClick={closeCart}
              className="w-full h-14 bg-[#500000] text-white rounded-full font-bold tracking-widest uppercase text-xs flex items-center justify-center hover:bg-[#3d0000] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
