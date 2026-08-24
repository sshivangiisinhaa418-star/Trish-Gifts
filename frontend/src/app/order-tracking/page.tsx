"use client";

import GlobalNav from "@/components/layout/GlobalNav";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { CheckCircle2, Gift, Truck, Clock, Package, AlertCircle } from "lucide-react";

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [orderResult, setOrderResult] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const queryId = params.get("orderId") || params.get("tracking");
      if (queryId) {
        setOrderNumber(queryId);
        autoLookupOrder(queryId);
      }
    }
  }, []);

  const autoLookupOrder = async (cleanQuery: string) => {
    setIsSearching(true);
    setErrorMessage(null);
    setOrderResult(null);

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      let query = supabase.from("orders").select("*, order_items(*)");
      if (cleanQuery.includes("-") || cleanQuery.length > 20) {
        query = query.eq("id", cleanQuery);
      } else {
        query = query.ilike("id", `${cleanQuery}%`);
      }

      const { data, error } = await query.limit(1).maybeSingle();

      if (error || !data) {
        setErrorMessage("No order found matching these details. Please check your order ID.");
      } else {
        setOrderResult(data);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred while looking up your order.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    setIsSearching(true);
    setErrorMessage(null);
    setOrderResult(null);

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const cleanQuery = orderNumber.trim();

      // Search by exact ID or match
      let query = supabase.from("orders").select("*, order_items(*)");
      if (cleanQuery.includes("-") || cleanQuery.length > 20) {
        query = query.eq("id", cleanQuery);
      } else {
        query = query.ilike("id", `${cleanQuery}%`);
      }

      if (email.trim()) {
        query = query.ilike("recipient_email", email.trim());
      }

      const { data, error } = await query.limit(1).maybeSingle();

      if (error || !data) {
        setErrorMessage("No order found matching these details. Please check your order ID and email.");
      } else {
        setOrderResult(data);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred while looking up your order.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col">
      <header className="w-full bg-white border-b border-gray-100 hidden lg:block relative z-40">
        <GlobalNav />
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=1600&q=80"
            alt="Order Tracking"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-[#500000]/70 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10 animate-fade-up">
          <span className="text-sm font-bold text-white/70 uppercase tracking-widest mb-6 block drop-shadow-md">Help & Support</span>
          <h1 className="text-5xl md:text-7xl text-white font-light mb-6 tracking-wide drop-shadow-lg" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            Order Tracking
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 bg-[#faf9f6]">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl text-gray-600 font-light leading-relaxed mb-12">
              Enter your order details below to receive real-time updates on your luxury shipment.
            </p>
            
            <div className="bg-white p-8 md:p-14 rounded-[2.5rem] border border-stone-200 shadow-2xl text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#500000]/5 rounded-bl-full"></div>
              
              <form onSubmit={handleTrack} className="space-y-6 relative z-10">
                {errorMessage && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-light flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-widest block mb-3">Order Number or ID</label>
                  <input 
                    type="text" 
                    required 
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="e.g. 5ca26880 or QUM-892410" 
                    className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-gray-700 font-light focus:outline-none focus:border-[#500000] focus:ring-1 focus:ring-[#500000] transition-colors text-sm" 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-widest block mb-3">Billing Email (Optional)</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter the recipient or billing email" 
                    className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-gray-700 font-light focus:outline-none focus:border-[#500000] focus:ring-1 focus:ring-[#500000] transition-colors text-sm" 
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSearching}
                  className="w-full py-5 bg-[#500000] text-white rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-[#3d0000] transition-all shadow-lg hover:shadow-xl mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSearching ? 'Looking up shipment...' : 'Track Package'}
                </button>
              </form>

              {/* Order Tracking Status Visualizer */}
              {orderResult && (
                <div className="mt-12 pt-10 border-t border-stone-100 animate-fade-up">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Status Report</span>
                      <h3 className="text-2xl text-gray-900 font-medium">Order #{orderResult.id.slice(0, 8).toUpperCase()}</h3>
                    </div>
                    <span className="px-4 py-1.5 bg-amber-50 border border-amber-200 text-[#500000] rounded-full text-xs font-bold uppercase tracking-widest">
                      {orderResult.status || "Processing"}
                    </span>
                  </div>

                  {/* Visual Steps */}
                  <div className="grid grid-cols-3 gap-2 text-center my-8">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shadow-sm">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">Confirmed</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${orderResult.status === 'Delivered' ? 'bg-green-500 text-white' : 'bg-white border-2 border-green-500 text-green-500'}`}>
                        <Gift className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">Customizing</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${orderResult.status === 'Delivered' ? 'bg-green-500 text-white' : 'bg-stone-100 text-gray-400'}`}>
                        <Truck className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Shipped</span>
                    </div>
                  </div>

                  <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-3 text-sm font-light text-gray-600">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Recipient:</span>
                      <span className="font-medium text-gray-900">{orderResult.recipient_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Delivery Address:</span>
                      <span className="font-medium text-gray-900 text-right">{orderResult.recipient_address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Amount:</span>
                      <span className="font-medium text-gray-900">₹{orderResult.total_amount?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
