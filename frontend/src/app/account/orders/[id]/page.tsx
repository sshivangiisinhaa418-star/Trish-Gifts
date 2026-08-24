import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, MapPin, CreditCard, Clock, Gift, Truck, Calendar, Sparkles, CheckCircle2, ChevronRight, Download, ExternalLink } from "lucide-react";
import GlobalNav from "@/components/layout/GlobalNav";
import { createClient } from "@/lib/supabase/server";

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const orderId = resolvedParams.id;

  const supabase = await createClient();
  const { data: orderData } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', orderId)
    .single();

  const order = orderData || null;

  if (!order) {
    notFound();
  }

  const items = order.order_items || [];
  const status = order.status || "Processing";

  // Amazon/Flipkart 5-Stage Status Logic
  const stages = [
    { name: "Order Placed", key: "Placed", done: true },
    { name: "Confirmed", key: "Confirmed", done: ["Confirmed", "Customizing", "Shipped", "Delivered"].includes(status) || status === "Processing" },
    { name: "Customizing", key: "Customizing", done: ["Customizing", "Shipped", "Delivered"].includes(status) },
    { name: "Shipped", key: "Shipped", done: ["Shipped", "Delivered"].includes(status) },
    { name: "Delivered", key: "Delivered", done: status === "Delivered" },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col">
      <header className="w-full bg-white border-b border-gray-100 hidden lg:block relative z-40">
        <GlobalNav />
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-16 max-w-5xl flex-1">
        
        <Link href="/account?tab=orders" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Order History
        </Link>
        
        {/* Amazon/Flipkart Order Header Banner */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Order Identifier</span>
              <h1 className="text-2xl text-gray-900 font-semibold font-mono">#{order.id.slice(0, 13).toUpperCase()}</h1>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-gray-600">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Order Date</span>
                <span>{new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="h-8 w-px bg-stone-200"></div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Total Amount</span>
                <span className="font-bold text-gray-900">₹{Number(order.total_amount).toLocaleString()}</span>
              </div>
              <div className="h-8 w-px bg-stone-200"></div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Ship To</span>
                <span className="font-semibold text-gray-900">{order.recipient_name}</span>
              </div>
            </div>
            <Link 
              href={`/order-tracking?orderId=${order.id}`}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-gray-800 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
            >
              <Truck className="w-3.5 h-3.5 text-[#500000]" /> Live Tracking
            </Link>
          </div>

          {/* Amazon 5-Stage Visual Progress Bar */}
          <div className="pt-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Package Shipment Progress</h3>
            <div className="relative flex items-center justify-between max-w-3xl mx-auto px-4">
              <div className="absolute top-1/2 left-8 right-8 h-1 bg-stone-200 -translate-y-1/2 -z-0"></div>
              <div 
                className="absolute top-1/2 left-8 h-1 bg-green-600 -translate-y-1/2 transition-all duration-700 -z-0"
                style={{ width: `${(stages.filter(s => s.done).length - 1) * 25}%` }}
              ></div>

              {stages.map((st, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${st.done ? 'bg-green-600 text-white ring-4 ring-green-100' : 'bg-stone-200 text-gray-400'}`}>
                    {st.done ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                  </div>
                  <span className={`text-[11px] font-semibold mt-2 text-center ${st.done ? 'text-gray-900' : 'text-gray-400'}`}>
                    {st.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            
            {/* Amazon Style Line Items Card */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-6 flex items-center justify-between border-b border-stone-100 pb-4">
                <span className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#500000]" /> Purchased Items ({items.length})
                </span>
                <span className="text-xs font-normal text-gray-500 font-sans">Delivered by TRISH Express Logistics</span>
              </h3>
              
              <div className="space-y-6">
                {items.length > 0 ? items.map((item: any) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-stone-100 last:border-0 last:pb-0">
                    <div className="w-24 h-28 bg-stone-50 rounded-xl flex items-center justify-center shrink-0 border border-stone-200 overflow-hidden relative">
                      {item.image ? (
                        <img src={item.image} alt={item.product_name} className="w-full h-full object-cover" />
                      ) : (
                        <Gift className="w-8 h-8 text-gray-300" />
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-gray-900 text-base">{item.product_name}</h4>
                          <span className="font-bold text-gray-900 text-base">₹{Number(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 font-light">Quantity: <span className="font-semibold text-gray-700">{item.quantity}</span></p>
                        
                        {item.gift_wrap && (
                          <span className="inline-block mt-2 text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                            🎁 Premium Gift Wrap Included
                          </span>
                        )}
                        {item.gift_message && (
                          <p className="mt-3 text-xs italic text-gray-700 font-serif bg-stone-50 p-3 rounded-xl border border-stone-200">
                            Custom Card Note: "{item.gift_message}"
                          </p>
                        )}
                      </div>

                      <div className="flex gap-3 mt-4">
                        <Link 
                          href={`/discover`} 
                          className="px-4 py-1.5 bg-stone-100 hover:bg-stone-200 text-gray-800 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                        >
                          Buy Again
                        </Link>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-6 text-gray-400 font-light text-sm">
                    Luxury Gift Box Order
                  </div>
                )}
              </div>
            </div>
            
            {/* Shipping Address Details */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-6 flex items-center gap-2 border-b border-stone-100 pb-4">
                <MapPin className="w-4 h-4 text-[#500000]" /> Shipping & Logistics Address
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Recipient Contact</p>
                  <p className="font-semibold text-gray-900 text-base">{order.recipient_name}</p>
                  <p className="text-gray-600 font-normal mt-0.5">📞 {order.recipient_phone || 'Phone on parcel'}</p>
                  <p className="text-gray-500 text-xs mt-0.5">✉️ {order.recipient_email}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Delivery Destination</p>
                  <p className="text-gray-800 font-normal leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-200">
                    {order.recipient_address}
                  </p>
                </div>
              </div>

              {order.tracking_number && (
                <div className="mt-6 pt-4 border-t border-stone-100 bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs font-bold text-gray-900">{order.courier_name || 'Partner Courier'}</p>
                      <p className="text-xs text-blue-700 font-mono font-medium">AWB: {order.tracking_number}</p>
                    </div>
                  </div>
                  <Link 
                    href={`/order-tracking?orderId=${order.id}`}
                    className="px-3.5 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-colors flex items-center gap-1"
                  >
                    Track <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
            
          </div>
          
          {/* Order Summary Right Panel */}
          <div className="space-y-8">
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-6 flex items-center gap-2 border-b border-stone-100 pb-4">
                <CreditCard className="w-4 h-4 text-[#500000]" /> Payment Breakdown
              </h3>
              
              <div className="space-y-3 text-sm font-normal text-gray-600 mb-4 pb-4 border-b border-stone-100">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{Number(order.total_amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping & Delivery</span>
                  <span className="text-green-700 font-semibold">Complimentary</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method</span>
                  <span className="font-semibold text-gray-800">Razorpay Prepaid</span>
                </div>
              </div>
              
              <div className="flex justify-between font-bold text-gray-900 text-xl">
                <span>Grand Total</span>
                <span className="text-[#500000]">₹{Number(order.total_amount).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

