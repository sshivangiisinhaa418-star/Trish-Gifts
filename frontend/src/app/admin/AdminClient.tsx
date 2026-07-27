'use client'

import { useState } from 'react'
import { Plus, X, Upload, ChevronLeft, Gift, CalendarHeart, PartyPopper, CalendarDays, Minus } from 'lucide-react'
import { uploadProduct } from '@/app/actions/admin'
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

type GroupName = 'Categories' | 'Occasions' | 'Festivals' | 'Special Days'

const GROUPS = [
  { name: 'Categories', icon: <Gift className="w-5 h-5" />, items: CATEGORIES },
  { name: 'Occasions', icon: <CalendarHeart className="w-5 h-5" />, items: OCCASIONS },
  { name: 'Festivals', icon: <PartyPopper className="w-5 h-5" />, items: FESTIVALS },
  { name: 'Special Days', icon: <CalendarDays className="w-5 h-5" />, items: SPECIAL_DAYS },
] as const

export default function AdminClient({ initialProducts }: { initialProducts: Product[] }) {
  const [products] = useState<Product[]>(initialProducts)
  const [activeGroup, setActiveGroup] = useState<GroupName>('Occasions')
  const [activeItem, setActiveItem] = useState<string | null>(null)
  
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
        <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
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
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 p-6 lg:p-10 xl:p-16 w-full max-w-[1400px]">
        
        {/* LEVEL 1: Grid of items */}
        {!activeItem && (
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
