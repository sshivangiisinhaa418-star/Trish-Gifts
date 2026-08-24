'use client'

import { useState } from 'react'
import { Plus, X, Upload, ChevronLeft, Gift, CalendarHeart, PartyPopper, CalendarDays, Minus, Package, MessageSquare, Copy, Check, Phone, Mail, MapPin, User, Calendar, Truck, Sparkles, FileText, Navigation, Info } from 'lucide-react'
import { uploadProduct, updateOrderStatus, updateOrderCourierTracking, updateTicketStatus } from '@/app/actions/admin'
import Image from 'next/image'
import { CATEGORIES, OCCASIONS, FESTIVALS, SPECIAL_DAYS } from '@/lib/constants/navigation'

type Product = {
  id: string
  name: string
  description: string
  price: number
  compare_at_price: number | null
  stock: number
  sku: string | null
  intent: string
  features: string[]
  images: string[]
}

type GroupName = 'Categories' | 'Occasions' | 'Festivals' | 'Special Days' | 'Orders' | 'Concierge'

const GROUPS = [
  { name: 'Categories', icon: <Gift className="w-5 h-5" />, items: CATEGORIES },
  { name: 'Occasions', icon: <CalendarHeart className="w-5 h-5" />, items: OCCASIONS },
  { name: 'Festivals', icon: <PartyPopper className="w-5 h-5" />, items: FESTIVALS },
  { name: 'Special Days', icon: <CalendarDays className="w-5 h-5" />, items: SPECIAL_DAYS },
] as const

export default function AdminClient({ 
  initialProducts, 
  initialOrders = [], 
  initialTickets = [] 
}: { 
  initialProducts: Product[], 
  initialOrders?: any[], 
  initialTickets?: any[] 
}) {
  const [products] = useState<Product[]>(initialProducts)
  const [orders, setOrders] = useState<any[]>(initialOrders)
  const [tickets, setTickets] = useState<any[]>(initialTickets)
  const [activeGroup, setActiveGroup] = useState<GroupName>('Occasions')
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null)
  const [courierInputs, setCourierInputs] = useState<Record<string, { courier: string; tracking: string }>>({})
  const [isSavingCourier, setIsSavingCourier] = useState<Record<string, boolean>>({})
  
  // Upload Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadMessage, setUploadMessage] = useState('')
  const [featureInputs, setFeatureInputs] = useState<string[]>([''])

  const activeGroupData = GROUPS.find(g => g.name === activeGroup)!

  const handleGroupChange = (group: GroupName) => {
    setActiveGroup(group)
    setActiveItem(null) 
  }

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!activeItem) return

    setIsUploading(true)
    setUploadMessage('')
    
    const formData = new FormData(e.currentTarget)
    formData.set('intent', activeItem) 
    
    const result = await uploadProduct(formData)
    
    if (result?.error) {
      setUploadMessage(result.error)
      setIsUploading(false)
    } else {
      window.location.reload()
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-full items-stretch">
      
      {/* LEFT SIDEBAR (Groups) */}
      <div className="w-full lg:w-72 shrink-0 bg-white border-r border-gray-100 p-6 lg:p-10 lg:min-h-[calc(100vh-80px)]">
        <div className="mb-10 px-2">
          <h1 className="text-3xl text-gray-900 mb-2" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Admin Dashboard</h1>
          <p className="text-gray-500 font-light text-sm">Manage store inventory.</p>
        </div>
        <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">Store Sections</h2>
        <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide mb-8">
          {GROUPS.map((group) => (
            <button 
              key={group.name}
              onClick={() => handleGroupChange(group.name as GroupName)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
                activeGroup === group.name 
                  ? 'bg-gray-900 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-white hover:text-gray-900'
              }`}
            >
              {group.icon}
              <span className="text-sm font-medium">{group.name}</span>
            </button>
          ))}
        </nav>

        <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">Operations</h2>
        <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
          <button 
            onClick={() => handleGroupChange('Orders')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
              activeGroup === 'Orders' ? 'bg-[#500000] text-white shadow-md' : 'text-gray-600 hover:bg-white hover:text-gray-900'
            }`}
          >
            <Package className="w-5 h-5" />
            <span className="text-sm font-medium">Orders ({orders.length})</span>
          </button>
          <button 
            onClick={() => handleGroupChange('Concierge')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
              activeGroup === 'Concierge' ? 'bg-[#500000] text-white shadow-md' : 'text-gray-600 hover:bg-white hover:text-gray-900'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-sm font-medium">Concierge Tickets ({tickets.length})</span>
          </button>
        </nav>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 p-6 lg:p-10 xl:p-16 w-full max-w-[1400px]">
        
        {/* LEVEL 1: Grid of items */}
        {!activeItem && activeGroup !== 'Orders' && activeGroup !== 'Concierge' && activeGroupData && (
          <div className="animate-fade-up">
            <h2 className="text-3xl text-gray-900 mb-8" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              Select a {activeGroup === 'Categories' ? 'Category' : activeGroup.slice(0, -1)}
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {activeGroupData.items.map(item => {
                const count = products.filter(p => p.intent === item).length;
                return (
                  <button
                    key={item}
                    onClick={() => setActiveItem(item)}
                    className="group bg-white border border-stone-200 rounded-2xl p-6 text-left hover:border-gray-900 hover:shadow-md transition-all flex flex-col justify-between aspect-square"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center mb-4 group-hover:bg-[#500000]/5 transition-colors">
                        {activeGroupData.icon}
                      </div>
                      <h3 className="font-medium text-gray-900 leading-tight">{item}</h3>
                    </div>
                    <div>
                      <span className="inline-block mt-4 px-2.5 py-1 bg-gray-50 text-gray-500 rounded-full text-[10px] font-bold uppercase tracking-widest">
                        {count} Gifts
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* LEVEL 2: Product Management */}
        {activeItem && (
          <div className="animate-fade-in">
            <button 
              onClick={() => setActiveItem(null)}
              className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 uppercase tracking-widest mb-8 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back to {activeGroup}
            </button>
            
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                {activeItem} Gifts
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              
              <button 
                onClick={() => { 
                  setUploadMessage(''); 
                  setFeatureInputs(['']); 
                  setIsModalOpen(true); 
                }}
                className="group flex flex-col items-center justify-center aspect-square bg-white border-2 border-dashed border-stone-200 rounded-2xl hover:border-gray-900 hover:bg-stone-50 transition-colors cursor-pointer"
              >
                <div className="w-16 h-16 bg-white border border-stone-100 shadow-sm rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6 text-gray-400 group-hover:text-gray-900 transition-colors" />
                </div>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest group-hover:text-gray-900 transition-colors">Add Gift</span>
              </button>

              {products.filter(p => p.intent === activeItem).map(product => (
                <div key={product.id} className="group relative bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative aspect-square overflow-hidden bg-stone-100">
                    {product.images && product.images.length > 0 ? (
                      <Image 
                        src={product.images[0]} 
                        alt={product.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm text-gray-900 font-medium">₹{product.price.toLocaleString()}</p>
                      {product.compare_at_price && (
                        <p className="text-xs text-gray-400 line-through">₹{product.compare_at_price.toLocaleString()}</p>
                      )}
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <span>Stock: {product.stock}</span>
                      {product.sku && <span>SKU: {product.sku}</span>}
                    </div>
                  </div>
                </div>
              ))}
              
            </div>
          </div>
        )}

        {/* ORDERS DASHBOARD */}
        {activeGroup === 'Orders' && (
          <div className="animate-fade-up space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Order Fulfillment & Dispatch Station</h2>
                <p className="text-sm text-gray-500 font-light mt-1">Review complete customer dispatch information for manual packaging, gift card calligraphy, and courier booking.</p>
              </div>
              <div className="px-4 py-2 bg-stone-100 rounded-full text-xs font-bold text-gray-700 uppercase tracking-widest self-start sm:self-auto">
                Total Orders: {orders.length}
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white p-16 text-center rounded-3xl border border-stone-200 text-gray-500 font-light shadow-sm">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl text-gray-800 font-medium mb-1">No customer orders recorded yet.</h3>
                <p className="text-sm text-gray-400">When customers place orders at checkout, their complete shipping details will appear here.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {orders.map((order) => {
                  const fullAddress = order.recipient_address || '';
                  const shippingLabelText = `==============================\nTRISH LUXURY GIFTS - DISPATCH SLIP\n==============================\nORDER ID: #${order.id}\nDATE: ${new Date(order.created_at).toLocaleString()}\nTOTAL: ₹${Number(order.total_amount).toLocaleString()}\n\n[DELIVER TO / RECIPIENT]:\nName: ${order.recipient_name}\nPhone: ${order.recipient_phone || 'N/A'}\nAlt Phone: ${order.recipient_alternate_phone || 'N/A'}\nEmail: ${order.recipient_email}\nStreet: ${fullAddress}\nLandmark: ${order.landmark || 'N/A'}\nCity: ${order.city || 'N/A'}\nState: ${order.state || 'N/A'}\nPIN Code: ${order.pincode || 'N/A'}\nDelivery Notes: ${order.delivery_instructions || 'None'}\n\n[SENDER / INVOICE BILLING]:\nName: ${order.sender_name || 'Customer'}\nPhone: ${order.sender_phone || 'N/A'}\nEmail: ${order.sender_email || order.recipient_email}\nBilling Address: ${order.billing_address || fullAddress}\n\n[ITEMS]:\n${(order.order_items || []).map((i: any, idx: number) => `${idx + 1}. ${i.quantity}x ${i.product_name} - ${i.gift_wrap ? '[Gift Wrapped]' : ''} ${i.greeting_card ? '[Handwritten Card]' : ''}`).join('\n')}\n==============================`;

                  const currentCourier = courierInputs[order.id]?.courier ?? order.courier_name ?? '';
                  const currentTracking = courierInputs[order.id]?.tracking ?? order.tracking_number ?? '';

                  return (
                    <div key={order.id} className="bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden space-y-6">
                      {/* Top Header Row */}
                      <div className="flex flex-col lg:flex-row justify-between lg:items-center pb-6 border-b border-stone-100 gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-stone-100 text-gray-800 rounded-full text-[11px] font-bold tracking-widest uppercase">
                              #{order.id.slice(0, 8).toUpperCase()}
                            </span>
                            <span className="text-xs text-gray-400 font-light flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <h3 className="text-2xl text-gray-900 font-medium pt-1" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                            Order for {order.recipient_name}
                          </h3>
                        </div>

                        {/* Status selector & Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(shippingLabelText);
                              setCopiedOrderId(order.id);
                              setTimeout(() => setCopiedOrderId(null), 3000);
                            }}
                            className="px-4 py-2 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl text-xs font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2 transition-all shadow-sm"
                            title="Copy formatted shipping label to clipboard"
                          >
                            {copiedOrderId === order.id ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-500" />}
                            {copiedOrderId === order.id ? 'Label Copied!' : 'Copy Shipping Label'}
                          </button>

                          <div className="flex items-center gap-2 bg-stone-50 px-4 py-2 rounded-2xl border border-stone-200">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status:</span>
                            <select
                              value={order.status || 'Processing'}
                              onChange={async (e) => {
                                const newStatus = e.target.value;
                                await updateOrderStatus(order.id, newStatus);
                                setOrders(orders.map(o => o.id === order.id ? { ...o, status: newStatus } : o));
                              }}
                              className="bg-transparent text-xs font-bold text-[#500000] focus:outline-none cursor-pointer uppercase tracking-wider"
                            >
                              <option value="Processing">Processing</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Customizing">Customizing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>

                          <span className="text-xl font-bold text-[#500000] pl-2">
                            ₹{Number(order.total_amount).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Customer Details Grid (Recipient & Sender) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 1. Recipient Dispatch Box */}
                        <div className="p-6 bg-stone-50/80 rounded-2xl border border-stone-200/70 space-y-3.5">
                          <div className="flex items-center gap-2 text-[#500000] font-bold text-xs uppercase tracking-widest border-b border-stone-200/60 pb-3">
                            <MapPin className="w-4 h-4" /> Recipient & Delivery Address
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                              <span className="text-gray-400 font-light w-24 shrink-0">Name:</span>
                              <span className="font-semibold text-gray-900">{order.recipient_name}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-gray-400 font-light w-24 shrink-0">Phone:</span>
                              {order.recipient_phone ? (
                                <a href={`tel:${order.recipient_phone}`} className="font-medium text-[#500000] hover:underline flex items-center gap-1.5">
                                  <Phone className="w-3.5 h-3.5" /> {order.recipient_phone}
                                </a>
                              ) : (
                                <span className="text-gray-500 font-light">Not specified</span>
                              )}
                            </div>
                            {order.recipient_alternate_phone && (
                              <div className="flex items-start gap-2">
                                <span className="text-gray-400 font-light w-24 shrink-0">Alt Phone:</span>
                                <a href={`tel:${order.recipient_alternate_phone}`} className="font-medium text-gray-700 hover:underline flex items-center gap-1.5">
                                  <Phone className="w-3.5 h-3.5 text-gray-400" /> {order.recipient_alternate_phone} (WhatsApp)
                                </a>
                              </div>
                            )}
                            <div className="flex items-start gap-2">
                              <span className="text-gray-400 font-light w-24 shrink-0">Email:</span>
                              <a href={`mailto:${order.recipient_email}`} className="text-gray-700 hover:text-gray-900 flex items-center gap-1.5 truncate">
                                <Mail className="w-3.5 h-3.5 text-gray-400" /> {order.recipient_email}
                              </a>
                            </div>
                            <div className="flex items-start gap-2 pt-1 border-t border-stone-200/50">
                              <span className="text-gray-400 font-light w-24 shrink-0">Address:</span>
                              <span className="text-gray-800 leading-relaxed font-light">{fullAddress}</span>
                            </div>
                            {order.landmark && (
                              <div className="flex items-start gap-2">
                                <span className="text-gray-400 font-light w-24 shrink-0">Landmark:</span>
                                <span className="font-medium text-gray-900">{order.landmark}</span>
                              </div>
                            )}
                            {(order.city || order.state || order.pincode) && (
                              <div className="flex items-start gap-2">
                                <span className="text-gray-400 font-light w-24 shrink-0">Location:</span>
                                <span className="font-medium text-gray-900">
                                  {order.city ? `${order.city}, ` : ''}{order.state ? `${order.state} ` : ''}{order.pincode || ''}
                                </span>
                              </div>
                            )}
                            {order.delivery_instructions && (
                              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2 mt-2">
                                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-bold uppercase tracking-wider block text-[10px]">Delivery Instructions:</span>
                                  <span>{order.delivery_instructions}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* 2. Sender / Buyer Details Box */}
                        <div className="p-6 bg-stone-50/80 rounded-2xl border border-stone-200/70 space-y-3.5">
                          <div className="flex items-center gap-2 text-gray-800 font-bold text-xs uppercase tracking-widest border-b border-stone-200/60 pb-3">
                            <User className="w-4 h-4 text-[#500000]" /> Sender & Invoicing Information
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                              <span className="text-gray-400 font-light w-24 shrink-0">Sender:</span>
                              <span className="font-semibold text-gray-900">{order.sender_name || 'Client (Direct Order)'}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-gray-400 font-light w-24 shrink-0">Phone:</span>
                              {order.sender_phone ? (
                                <a href={`tel:${order.sender_phone}`} className="font-medium text-gray-800 hover:underline flex items-center gap-1.5">
                                  <Phone className="w-3.5 h-3.5 text-gray-400" /> {order.sender_phone}
                                </a>
                              ) : (
                                <span className="text-gray-500 font-light">Same as contact</span>
                              )}
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-gray-400 font-light w-24 shrink-0">Email:</span>
                              <span className="text-gray-700">{order.sender_email || order.recipient_email}</span>
                            </div>
                            <div className="flex items-start gap-2 pt-1 border-t border-stone-200/50">
                              <span className="text-gray-400 font-light w-24 shrink-0">Billing Addr:</span>
                              <span className="text-gray-800 leading-relaxed font-light">{order.billing_address || fullAddress}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-gray-400 font-light w-24 shrink-0">Payment:</span>
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-md">
                                <Check className="w-3 h-3" /> Paid Online (Verified)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 3. Courier Booking & Tracking Station */}
                      <div className="p-6 bg-blue-50/40 rounded-2xl border border-blue-100 space-y-4">
                        <div className="flex items-center justify-between border-b border-blue-100 pb-3">
                          <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-widest">
                            <Truck className="w-4 h-4 text-blue-700" /> Courier & Shipment Dispatch
                          </div>
                          {order.courier_name && order.tracking_number && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-800 bg-blue-100/70 px-2.5 py-0.5 rounded-full">
                              <Check className="w-3 h-3" /> Booked & Dispatched
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                          <div>
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1.5">Courier Partner</label>
                            <input 
                              type="text" 
                              placeholder="e.g. Blue Dart, Delhivery, DTDC, Shiprocket"
                              value={currentCourier}
                              onChange={(e) => setCourierInputs(prev => ({
                                ...prev,
                                [order.id]: {
                                  courier: e.target.value,
                                  tracking: prev[order.id]?.tracking ?? order.tracking_number ?? ''
                                }
                              }))}
                              className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1.5">AWB / Tracking Number</label>
                            <input 
                              type="text" 
                              placeholder="e.g. AWB984210342"
                              value={currentTracking}
                              onChange={(e) => setCourierInputs(prev => ({
                                ...prev,
                                [order.id]: {
                                  courier: prev[order.id]?.courier ?? order.courier_name ?? '',
                                  tracking: e.target.value
                                }
                              }))}
                              className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                          </div>
                          <button
                            type="button"
                            disabled={isSavingCourier[order.id] || !currentCourier || !currentTracking}
                            onClick={async () => {
                              setIsSavingCourier(prev => ({ ...prev, [order.id]: true }));
                              const res = await updateOrderCourierTracking(order.id, currentCourier, currentTracking);
                              setIsSavingCourier(prev => ({ ...prev, [order.id]: false }));
                              if (res?.success) {
                                setOrders(orders.map(o => o.id === order.id ? { ...o, courier_name: currentCourier, tracking_number: currentTracking, status: 'Shipped' } : o));
                              }
                            }}
                            className="px-6 py-2.5 bg-[#500000] hover:bg-[#3d0000] text-white rounded-xl text-xs font-bold uppercase tracking-widest disabled:opacity-40 transition-all shadow-sm flex items-center justify-center gap-2"
                          >
                            {isSavingCourier[order.id] ? 'Saving...' : 'Save & Mark as Shipped'}
                          </button>
                        </div>
                      </div>

                      {/* 4. Gift Items & Customizations */}
                      {order.order_items && order.order_items.length > 0 && (
                        <div className="pt-2 space-y-4">
                          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                            <Gift className="w-4 h-4 text-[#500000]" />
                            Items to Pack & Personalize ({order.order_items.length})
                          </h4>

                          <div className="grid grid-cols-1 gap-4">
                            {order.order_items.map((item: any) => (
                              <div key={item.id} className="p-5 bg-white border border-stone-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
                                <div className="flex items-center gap-4">
                                  <div className="w-16 h-20 bg-stone-100 rounded-xl overflow-hidden shrink-0 border border-stone-200 relative flex items-center justify-center">
                                    {item.image ? (
                                      <img src={item.image} alt={item.product_name} className="w-full h-full object-cover" />
                                    ) : (
                                      <Gift className="w-6 h-6 text-gray-400" />
                                    )}
                                  </div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 text-base">{item.product_name}</h5>
                                    <p className="text-xs text-gray-500 font-light mt-1">
                                      Qty: <span className="font-bold text-gray-900">{item.quantity}</span> • Price: ₹{Number(item.price).toLocaleString()}
                                    </p>

                                    {/* Add-on badges */}
                                    <div className="flex flex-wrap items-center gap-2 mt-2">
                                      {item.gift_wrap && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 text-[#500000] text-[10px] font-bold uppercase rounded-md">
                                          <Gift className="w-3 h-3" /> Premium Gift Wrap
                                        </span>
                                      )}
                                      {item.greeting_card && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-50 border border-rose-200 text-[#500000] text-[10px] font-bold uppercase rounded-md">
                                          <FileText className="w-3 h-3" /> Handwritten Card Included
                                        </span>
                                      )}
                                      {item.delivery_date && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-800 text-[10px] font-bold uppercase rounded-md">
                                          <Calendar className="w-3 h-3" /> Target Date: {item.delivery_date}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {/* Custom Gift Message Note */}
                                {item.gift_message && (
                                  <div className="max-w-md w-full p-4 bg-amber-50/60 border-l-4 border-[#500000] rounded-r-xl">
                                    <span className="text-[10px] font-bold text-[#500000] uppercase tracking-widest block mb-1">
                                      Handwritten Note for Card:
                                    </span>
                                    <p className="text-xs text-gray-800 font-serif italic whitespace-pre-wrap leading-relaxed">
                                      "{item.gift_message}"
                                    </p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* CONCIERGE DASHBOARD */}
        {activeGroup === 'Concierge' && (
          <div className="animate-fade-up">
            <h2 className="text-3xl text-gray-900 mb-6" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Concierge & Support Tickets</h2>
            {tickets.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-stone-200 text-gray-500 font-light">No support tickets or concierge inquiries yet.</div>
            ) : (
              <div className="space-y-6">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between md:items-center pb-3 border-b border-stone-100 gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{ticket.inquiry_type || 'General Inquiry'}</span>
                        <h3 className="text-base font-medium text-gray-900 mt-1">{ticket.first_name} {ticket.last_name} ({ticket.email})</h3>
                      </div>
                      <select
                        value={ticket.status || 'Open'}
                        onChange={async (e) => {
                          const newStatus = e.target.value;
                          await updateTicketStatus(ticket.id, newStatus);
                          setTickets(tickets.map(t => t.id === ticket.id ? { ...t, status: newStatus } : t));
                        }}
                        className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-900"
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                    <p className="mt-3 text-sm text-gray-600 font-light whitespace-pre-wrap">{ticket.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Advanced Upload Modal */}
      {isModalOpen && activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl relative animate-fade-up max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors bg-white rounded-full p-1 shadow-sm border border-stone-100 z-10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8">
              <h2 className="text-3xl text-gray-900 mb-2" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Add {activeItem} Gift</h2>
              <p className="text-sm text-gray-500 font-light mb-8">Fill in comprehensive details to optimize sales.</p>
              
              {uploadMessage && (
                <div className="p-4 rounded-xl text-sm font-light mb-6 bg-red-50 text-red-600 border border-red-200">
                  {uploadMessage}
                </div>
              )}

              <form onSubmit={handleUpload} className="space-y-8">
                
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-stone-100 pb-2">Basic Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Product Name</label>
                      <input type="text" name="name" required className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-sm font-light focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">SKU (Optional)</label>
                      <input type="text" name="sku" placeholder="e.g. TR-BDAY-001" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-sm font-light focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Description</label>
                    <textarea name="description" rows={3} required className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-sm font-light focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900" />
                  </div>
                </div>

                {/* Pricing & Inventory */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-stone-100 pb-2">Pricing & Inventory</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Selling Price (₹)</label>
                      <input type="number" name="price" step="0.01" required className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-sm font-light focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Compare at Price (MRP)</label>
                      <input type="number" name="compare_at_price" step="0.01" placeholder="Optional" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-sm font-light focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Stock Quantity</label>
                      <input type="number" name="stock" defaultValue={10} required className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-sm font-light focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900" />
                    </div>
                  </div>
                </div>

                {/* Bullet Points */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-stone-100 pb-2">Key Features</h3>
                  <div className="space-y-3">
                    {featureInputs.map((val, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="flex-1">
                          <input 
                            type="text" 
                            name="features" 
                            placeholder="e.g. Handcrafted with premium materials" 
                            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-sm font-light focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900" 
                          />
                        </div>
                        {featureInputs.length > 1 && (
                          <button 
                            type="button"
                            onClick={() => setFeatureInputs(prev => prev.filter((_, i) => i !== index))}
                            className="p-3 text-gray-400 hover:text-red-500 transition-colors bg-stone-50 rounded-lg border border-stone-200 hover:bg-red-50 hover:border-red-200"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button 
                    type="button"
                    onClick={() => setFeatureInputs(prev => [...prev, ''])}
                    className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-900 uppercase tracking-widest transition-colors mt-2"
                  >
                    <Plus className="w-3 h-3" /> Add another bullet point
                  </button>
                </div>
                
                {/* Images */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-stone-100 pb-2">Product Images</h3>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Upload Multiple Images</label>
                  <div className="relative border-2 border-dashed border-stone-200 rounded-xl p-8 hover:bg-stone-50 transition-colors flex flex-col items-center justify-center gap-2 group">
                    <Upload className="w-8 h-8 text-gray-400 group-hover:text-gray-900 transition-colors" />
                    <span className="text-sm font-light text-gray-500 text-center">Click to browse or drag multiple images here<br/><span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2 block">PNG, JPG up to 5MB</span></span>
                    <input type="file" name="images" multiple accept="image/*" required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-4 sticky bottom-0 bg-white border-t border-stone-100 py-4 mt-8">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-4 text-gray-600 hover:text-gray-900 text-xs font-bold uppercase tracking-widest">Cancel</button>
                  <button type="submit" disabled={isUploading} className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#500000] transition-colors disabled:opacity-50 shadow-md">
                    {isUploading ? 'Uploading & Saving...' : 'Save Product to Category'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
