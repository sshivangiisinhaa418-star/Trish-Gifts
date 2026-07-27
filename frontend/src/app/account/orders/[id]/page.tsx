"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Package, Truck, CheckCircle2, Gift } from "lucide-react";

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  // Mock data for the order
  const order = {
    id: params.id || "TR-892410",
    date: "Oct 24, 2026",
    status: "In Transit",
    estimatedDelivery: "Oct 27, 2026",
    recipient: "Eleanor Sterling",
    address: "124 Luxury Lane, Beverly Hills, CA 90210",
    total: "₹24,500",
    items: [
      {
        name: "Bespoke Engraved Watch",
        price: "₹18,500",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80",
        personalization: "Engraving: E.S."
      },
      {
        name: "Silk Ribbon Gift Wrapping",
        price: "₹6,000",
        image: "https://images.unsplash.com/photo-1549439602-43ebca2327af?w=400&q=80",
        personalization: "Handwritten Note Included"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Header Spacer */}
      <div className="h-20 bg-white border-b border-gray-100 w-full hidden lg:block"></div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <Link href="/account" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl text-gray-900 mb-2" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Order {order.id}</h1>
            <p className="text-gray-500 font-light">Placed on {order.date}</p>
          </div>
          <div className="text-left md:text-right">
            <span className="inline-block px-4 py-1.5 bg-[#500000]/10 text-[#500000] text-xs font-bold uppercase tracking-widest rounded-full mb-2">
              {order.status}
            </span>
            <p className="text-gray-900 font-medium">Estimated Delivery: {order.estimatedDelivery}</p>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-stone-200 shadow-sm mb-12">
          <h2 className="text-2xl text-gray-900 mb-10" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Tracking Timeline</h2>
          
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-6 left-6 right-6 h-0.5 bg-stone-100 hidden md:block z-0"></div>
            <div className="absolute top-6 left-6 w-[50%] h-0.5 bg-[#500000] hidden md:block z-0 transition-all duration-1000"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {/* Step 1: Placed */}
              <div className="flex md:flex-col items-center md:text-center gap-4 md:gap-0">
                <div className="w-12 h-12 rounded-full bg-[#500000] text-white flex items-center justify-center shrink-0 mb-4 shadow-lg ring-4 ring-white">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Order Placed</h4>
                  <p className="text-xs text-gray-500 font-light">Oct 24, 10:42 AM</p>
                </div>
              </div>

              {/* Step 2: Crafted */}
              <div className="flex md:flex-col items-center md:text-center gap-4 md:gap-0">
                <div className="w-12 h-12 rounded-full bg-[#500000] text-white flex items-center justify-center shrink-0 mb-4 shadow-lg ring-4 ring-white">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Bespoke Crafting</h4>
                  <p className="text-xs text-gray-500 font-light">Oct 25, 2:15 PM</p>
                </div>
              </div>

              {/* Step 3: Shipped */}
              <div className="flex md:flex-col items-center md:text-center gap-4 md:gap-0">
                <div className="w-12 h-12 rounded-full bg-stone-100 text-gray-400 border-2 border-stone-200 flex items-center justify-center shrink-0 mb-4 ring-4 ring-white animate-pulse">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#500000] text-sm mb-1">In Transit</h4>
                  <p className="text-xs text-gray-500 font-light">Currently En Route</p>
                </div>
              </div>

              {/* Step 4: Delivered */}
              <div className="flex md:flex-col items-center md:text-center gap-4 md:gap-0">
                <div className="w-12 h-12 rounded-full bg-stone-100 text-gray-300 border-2 border-stone-200 flex items-center justify-center shrink-0 mb-4 ring-4 ring-white">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-400 text-sm mb-1">Delivered</h4>
                  <p className="text-xs text-gray-400 font-light">Pending</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Items List */}
          <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 md:p-10 border border-stone-200 shadow-sm">
            <h2 className="text-2xl text-gray-900 mb-8" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Bespoke Items</h2>
            <div className="space-y-6">
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-6 pb-6 border-b border-stone-100 last:border-0 last:pb-0">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden relative shrink-0 bg-stone-50">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg text-gray-900 font-medium mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500 font-light mb-3">{item.personalization}</p>
                    <p className="text-[#500000] font-medium">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping & Summary */}
          <div className="space-y-8">
            <div className="bg-white rounded-[2rem] p-8 border border-stone-200 shadow-sm">
              <h2 className="text-xl text-gray-900 mb-6" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Delivery Details</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-400 font-light mb-1 uppercase tracking-widest text-xs">Recipient</p>
                  <p className="text-gray-900 font-medium">{order.recipient}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-light mb-1 uppercase tracking-widest text-xs">Address</p>
                  <p className="text-gray-600 font-light leading-relaxed max-w-[200px]">{order.address}</p>
                </div>
                <div className="pt-4 border-t border-stone-100">
                  <Link href={`/reveal?order=${order.id}`} className="block w-full text-center py-3 bg-[#500000] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#3d0000] transition-colors">
                    Send Digital Reveal
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-8 border border-stone-200 shadow-sm">
              <h2 className="text-xl text-gray-900 mb-6" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Summary</h2>
              <div className="space-y-3 text-sm text-gray-600 font-light border-b border-stone-100 pb-4 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{order.total}</span>
                </div>
                <div className="flex justify-between">
                  <span>White-Glove Shipping</span>
                  <span>Complimentary</span>
                </div>
              </div>
              <div className="flex justify-between text-lg font-medium text-gray-900">
                <span>Total</span>
                <span>{order.total}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
