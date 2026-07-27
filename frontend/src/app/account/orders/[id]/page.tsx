import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, MapPin, CreditCard, Clock, Gift } from "lucide-react";
import GlobalNav from "@/components/layout/GlobalNav";

// Mock data to match account page
const orderHistory = [
  { id: "QUM-892410", date: "Oct 24, 2026", status: "Processing", recipient: "Sarah", item: "The Midnight Velvet Perfume Set", total: 3899, trackingNumber: "TRK-9831412" },
  { id: "QUM-771234", date: "May 12, 2026", status: "Delivered", recipient: "David", item: "Personalized Leather Wallet", total: 1499, trackingNumber: "TRK-5512391" },
];

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const order = orderHistory.find(o => o.id === params.id);

  if (!order) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col">
      <header className="w-full bg-white border-b border-gray-100 hidden lg:block relative z-40">
        <GlobalNav />
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-16 max-w-4xl flex-1">
        
        <Link href="/account" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Account
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl text-gray-900 mb-2" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Order {order.id}</h1>
            <p className="text-gray-500 font-light">Placed on {order.date}</p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
            {order.status}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            
            {/* Items */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-6 flex items-center gap-2">
                <Package className="w-4 h-4" /> Item Details
              </h3>
              
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-stone-50 rounded-xl flex items-center justify-center shrink-0 border border-stone-200">
                  <Gift className="w-8 h-8 text-gray-300" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{order.item}</h4>
                  <p className="text-sm text-gray-500 mt-1 font-light">Qty: 1</p>
                  <p className="text-sm text-gray-900 mt-2 font-medium">₹{order.total.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            {/* Delivery */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Delivery Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Recipient</p>
                  <p className="text-sm text-gray-900 font-light">{order.recipient}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Address</p>
                  <p className="text-sm text-gray-900 font-light">123 Gifting Lane, Mumbai, MH 400001</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Tracking Number</p>
                  <p className="text-sm text-brand-600 font-medium hover:underline cursor-pointer">{order.trackingNumber}</p>
                </div>
              </div>
            </div>
            
          </div>
          
          <div className="space-y-8">
            {/* Order Summary */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-6 flex items-center gap-2">
                <CreditCard className="w-4 h-4" /> Payment Summary
              </h3>
              
              <div className="space-y-3 text-sm font-light text-gray-600 mb-4 pb-4 border-b border-stone-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{order.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              </div>
              
              <div className="flex justify-between font-medium text-gray-900 text-lg">
                <span>Total</span>
                <span>₹{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
