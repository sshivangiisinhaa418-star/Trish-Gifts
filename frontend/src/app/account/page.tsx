"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar as CalendarIcon, Package, User, Heart, Plus, Bell, ChevronRight, Gift } from "lucide-react";
import GlobalNav from "@/components/layout/GlobalNav";

// Mock Data
const upcomingEvents = [
  { id: 1, name: "Sarah's Anniversary", date: "Oct 28, 2026", daysLeft: 3, relation: "Wife", intent: "Anniversary" },
  { id: 2, name: "Mom's Birthday", date: "Nov 15, 2026", daysLeft: 21, relation: "Mother", intent: "Birthday" },
];

const orderHistory = [
  { id: "QUM-892410", date: "Oct 24, 2026", status: "Processing", recipient: "Sarah", item: "The Midnight Velvet Perfume Set", total: 3899 },
  { id: "QUM-771234", date: "May 12, 2026", status: "Delivered", recipient: "David", item: "Personalized Leather Wallet", total: 1499 },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"calendar" | "orders" | "profile">("calendar");

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col">
      {/* Reusing Global Header styling but keeping it simple for the dashboard */}
      <header className="w-full bg-white border-b border-gray-100 hidden lg:block relative z-40">
        <GlobalNav />
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-16 flex-1 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-64 shrink-0">
            <h1 className="text-3xl text-gray-900 mb-8" style={{ fontFamily: 'var(--font-cormorant), serif' }}>My Account</h1>
            
            <nav className="flex flex-col gap-2">
              <button 
                onClick={() => setActiveTab("calendar")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "calendar" ? 'bg-gray-900 text-white shadow-md' : 'text-gray-600 hover:bg-white hover:text-gray-900'}`}
              >
                <CalendarIcon className="w-4 h-4" />
                <span className="text-sm font-medium">Gifting Calendar</span>
              </button>
              <button 
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "orders" ? 'bg-gray-900 text-white shadow-md' : 'text-gray-600 hover:bg-white hover:text-gray-900'}`}
              >
                <Package className="w-4 h-4" />
                <span className="text-sm font-medium">Order History</span>
              </button>
              <button 
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "profile" ? 'bg-gray-900 text-white shadow-md' : 'text-gray-600 hover:bg-white hover:text-gray-900'}`}
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Profile & Settings</span>
              </button>
              
              <Link href="/wishlist" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-white hover:text-gray-900 transition-all mt-4 border border-stone-200 bg-white">
                <Heart className="w-4 h-4" />
                <span className="text-sm font-medium">My Wishlist</span>
              </Link>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            
            {/* Calendar Tab */}
            {activeTab === "calendar" && (
              <div className="animate-fade-up">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Your Gifting Calendar</h2>
                    <p className="text-sm text-gray-500 font-light mt-1">Never miss an important moment again.</p>
                  </div>
                  <button className="px-5 py-2.5 bg-[#500000] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#3d0000] transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Event
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-50 rounded-bl-full -z-0 opacity-50 group-hover:scale-110 transition-transform"></div>
                      
                      <div className="flex justify-between items-start relative z-10 mb-6">
                        <div className="flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
                          <Bell className="w-3 h-3" /> In {event.daysLeft} Days
                        </div>
                        <span className="text-sm font-medium text-gray-400">{event.date}</span>
                      </div>
                      
                      <div className="relative z-10">
                        <h3 className="text-xl text-gray-900 font-medium mb-1">{event.name}</h3>
                        <p className="text-sm text-gray-500 font-light mb-6">{event.relation} • {event.intent}</p>
                        
                        <Link href={`/discover?intent=${event.intent.toLowerCase()}`} className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 uppercase tracking-widest hover:text-brand-700 transition-colors">
                          Find a Gift <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="animate-fade-up">
                <h2 className="text-2xl text-gray-900 mb-8" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Order History</h2>
                
                <div className="flex flex-col gap-4">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center border border-stone-200 shrink-0">
                          <Gift className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Order {order.id}</p>
                          <h4 className="font-medium text-gray-900">{order.item}</h4>
                          <p className="text-sm text-gray-500 font-light mt-0.5">Sent to {order.recipient} on {order.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between md:flex-col md:items-end gap-2 shrink-0">
                        <span className="font-medium text-gray-900">₹{order.total.toLocaleString()}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="animate-fade-up">
                <h2 className="text-2xl text-gray-900 mb-8" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Profile Settings</h2>
                <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
                  <p className="text-gray-500 font-light">Account details, addresses, and payment methods will be managed here.</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
