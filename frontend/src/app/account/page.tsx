"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar as CalendarIcon, Package, User, Heart, Plus, Bell, ChevronRight, Gift, LogOut, CheckCircle2, Sparkles, ShieldCheck, Award } from "lucide-react";
import GlobalNav from "@/components/layout/GlobalNav";
import { logout } from "@/app/actions/auth";
import { createBrowserClient } from "@supabase/ssr";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { useCart } from "@/lib/context/CartContext";
import { useWishlist } from "@/lib/context/WishlistContext";

const initialEvents = [
  { id: 1, name: "Sarah's Anniversary", date: "Oct 28, 2026", daysLeft: 3, relation: "Wife", intent: "Anniversary" },
  { id: 2, name: "Mom's Birthday", date: "Nov 15, 2026", daysLeft: 21, relation: "Mother", intent: "Birthday" },
];

const orderHistory = [
  { id: "QUM-892410", date: "Oct 24, 2026", status: "Processing", recipient: "Sarah", item: "The Midnight Velvet Perfume Set", total: 3899 },
  { id: "QUM-771234", date: "May 12, 2026", status: "Delivered", recipient: "David", item: "Personalized Leather Wallet", total: 1499 },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"calendar" | "orders" | "profile">("calendar");
  const [events, setEvents] = useState<any[]>([]);
  const [dbOrders, setDbOrders] = useState<any[]>([]);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [supabase, setSupabase] = useState<any>(null);
  const { clearCart } = useCart();
  const { clearWishlist } = useWishlist();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam === 'profile' || tabParam === 'orders' || tabParam === 'calendar') {
      setActiveTab(tabParam as any);
    }

    const init = async () => {
      const supabaseClient = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      setSupabase(supabaseClient);
      
      const { data: { user } } = await supabaseClient.auth.getUser();
      setUser(user);

      if (user) {
        // Fetch events
        const { data: eventsData } = await supabaseClient
          .from('calendar_events')
          .select('*')
          .order('date', { ascending: true });
        
        if (eventsData) {
          const formatted = eventsData.map(e => {
            const diffTime = Math.max(0, new Date(e.date).getTime() - new Date().getTime());
            return {
              id: e.id,
              name: e.title,
              date: new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              daysLeft: Math.ceil(diffTime / (1000 * 60 * 60 * 24)),
              relation: e.relation || 'Gift',
              intent: e.intent || 'Event'
            };
          });
          setEvents(formatted);
        }

        // Fetch orders
        const { data: ordersData } = await supabaseClient
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (ordersData) {
          setDbOrders(ordersData);
        }
      }
    };
    init();
  }, []);
  
  // New Event Form State
  const [newEventName, setNewEventName] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventRelation, setNewEventRelation] = useState("Friend");
  const [newEventIntent, setNewEventIntent] = useState("Birthday");

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventName || !newEventDate || !user || !supabase) return;

    const { data, error } = await supabase.from('calendar_events').insert({
      user_id: user.id,
      title: newEventName,
      date: newEventDate,
      relation: newEventRelation,
      intent: newEventIntent
    }).select().single();

    if (!error && data) {
      const diffTime = Math.max(0, new Date(data.date).getTime() - new Date().getTime());
      const newEv = {
        id: data.id,
        name: data.title,
        date: new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        daysLeft: Math.ceil(diffTime / (1000 * 60 * 60 * 24)),
        relation: data.relation || newEventRelation,
        intent: data.intent || newEventIntent
      };
      setEvents(prev => [newEv, ...prev].sort((a,b) => a.daysLeft - b.daysLeft));
    }

    // Reset and close
    setNewEventName("");
    setNewEventDate("");
    setIsAddingEvent(false);
  };

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
              <form action={logout} onSubmit={() => {
                clearCart();
                clearWishlist();
                localStorage.removeItem('trish_cart');
                localStorage.removeItem('trish_wishlist');
                if (supabase) {
                  supabase.auth.signOut();
                }
              }} className="mt-8">
                <button type="submit" className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all w-full text-left">
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </form>
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
                  <button onClick={() => setIsAddingEvent(!isAddingEvent)} className="px-5 py-2.5 bg-[#500000] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#3d0000] transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Event
                  </button>
                </div>

                {/* Add Event Form */}
                {isAddingEvent && (
                  <form onSubmit={handleAddEvent} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm mb-8 animate-fade-up">
                    <h3 className="text-xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>New Gifting Event</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Event Name</label>
                        <input type="text" required value={newEventName} onChange={(e) => setNewEventName(e.target.value)} placeholder="e.g. Dad's Retirement" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-sm font-light focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Date</label>
                        <input type="date" required value={newEventDate} onChange={(e) => setNewEventDate(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-sm font-light focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Recipient Relation</label>
                        <select value={newEventRelation} onChange={(e) => setNewEventRelation(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-sm font-light focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900">
                          <option>Wife</option>
                          <option>Husband</option>
                          <option>Mother</option>
                          <option>Father</option>
                          <option>Friend</option>
                          <option>Colleague</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Occasion</label>
                        <select value={newEventIntent} onChange={(e) => setNewEventIntent(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-sm font-light focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900">
                          <option>Birthday</option>
                          <option>Anniversary</option>
                          <option>Wedding</option>
                          <option>Thank You</option>
                          <option>Congratulations</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <button type="button" onClick={() => setIsAddingEvent(false)} className="px-5 py-2.5 text-gray-600 hover:text-gray-900 text-xs font-bold uppercase tracking-widest">Cancel</button>
                      <button type="submit" className="px-5 py-2.5 bg-gray-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">Save Event</button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {events.map((event) => (
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
                  {dbOrders.length > 0 ? dbOrders.map((order) => (
                    <div key={order.id} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center border border-stone-200 shrink-0">
                          <Gift className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Order {order.id.split('-')[0]}</p>
                          <h4 className="font-medium text-gray-900">Gift Order</h4>
                          <p className="text-sm text-gray-500 font-light mt-0.5">Sent to {order.recipient_name} on {new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between md:flex-col md:items-end gap-2 shrink-0">
                        <span className="font-medium text-gray-900">₹{order.total_amount.toLocaleString()}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  )) : (
                    <p className="text-gray-500 font-light">No orders found.</p>
                  )}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="animate-fade-up space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-[#500000] border border-amber-200 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 shadow-sm">
                    <Sparkles className="w-3 h-3" /> Verified Member Dossier
                  </div>
                  <h2 className="text-3xl text-gray-900 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Your Profile & Concierge Details</h2>
                  <p className="text-gray-500 font-light text-sm mt-1">All details provided upon registration are preserved and secured in our private client registry.</p>
                </div>

                <div className="bg-white border border-stone-200 rounded-[2rem] p-8 md:p-10 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-stone-50 rounded-bl-full -z-0 opacity-50 pointer-events-none"></div>
                  
                  {user ? (
                    <div className="relative z-10 space-y-8">
                      {/* Personal Identity */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">First Name</label>
                          <p className="text-gray-900 font-bold text-lg capitalize">
                            {user.user_metadata?.first_name || user.user_metadata?.full_name?.split(' ')[0] || 'Valued'}
                          </p>
                        </div>
                        <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Last Name</label>
                          <p className="text-gray-900 font-bold text-lg capitalize">
                            {user.user_metadata?.last_name || user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || 'Client'}
                          </p>
                        </div>
                        <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Full Registered Name</label>
                          <p className="text-[#500000] font-bold text-lg capitalize">
                            {user.user_metadata?.full_name || `${user.user_metadata?.first_name || ''} ${user.user_metadata?.last_name || ''}`.trim() || 'Valued Client'}
                          </p>
                        </div>
                      </div>

                      <div className="h-px bg-stone-100 w-full"></div>

                      {/* Contact & Verification Status */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Registered Email Address</label>
                          <div className="flex items-center gap-3">
                            <span className="text-gray-900 font-medium text-lg">{user.email}</span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-green-50 border border-green-200 text-green-700 font-semibold text-[11px] rounded-full">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                            </span>
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Authentication & Security</label>
                          <p className="text-gray-900 font-medium capitalize flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-[#500000]" />
                            Protected via {user.app_metadata?.provider || 'Secure Email & Password'}
                          </p>
                        </div>
                      </div>

                      <div className="h-px bg-stone-100 w-full"></div>

                      {/* Membership & Preferences */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-amber-50/50 border border-amber-200/60 rounded-2xl">
                          <div className="flex items-center gap-2 text-[#500000] font-bold text-xs uppercase tracking-widest mb-1">
                            <Award className="w-4 h-4" /> Client Status
                          </div>
                          <h4 className="text-xl font-light text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>TRISH Sovereign Tier</h4>
                          <p className="text-xs text-gray-500 font-light mt-1">Full access to Bespoke Concierge white-glove curation and artisan commissions.</p>
                        </div>
                        <div className="p-6 bg-stone-50 border border-stone-200 rounded-2xl">
                          <div className="text-gray-900 font-bold text-xs uppercase tracking-widest mb-1">
                            Concierge Bulletins & Shortlists
                          </div>
                          <p className="text-sm font-medium text-[#500000] mt-2">
                            {user.user_metadata?.newsletter ? '✓ Subscribed to Private Shortlists & Event Briefings' : 'Standard Communications & Order Updates Only'}
                          </p>
                        </div>
                      </div>
                      
                      {user.email?.toLowerCase() === 'mayankrajdto@gmail.com' && (
                        <>
                          <div className="h-px bg-stone-100 w-full my-4"></div>
                          <div className="pt-4">
                            <Link 
                              href="/admin"
                              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#500000] text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#3d0000] transition-all w-full md:w-auto shadow-lg"
                            >
                              Open Admin Dashboard
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <div className="w-8 h-8 border-2 border-[#500000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-500 font-light text-sm">Loading your bespoke client dossier...</p>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
