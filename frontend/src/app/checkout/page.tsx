"use client";

import { useState, useTransition } from "react";
import { useCart } from "@/lib/context/CartContext";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Lock, ChevronRight, Gift, Calendar, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { submitCheckout } from "@/app/actions/forms";

type CheckoutStep = 1 | 2 | 3 | 4;

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const router = useRouter();

  // Form States (Mocked for UI)
  const [email, setEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [senderName, setSenderName] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as CheckoutStep);
    } else {
      // Final submit
      startTransition(async () => {
        const formData = new FormData();
        formData.append('recipient_name', recipientName);
        formData.append('recipient_email', email);
        formData.append('recipient_address', recipientAddress);
        formData.append('total_amount', cartTotal.toString());
        
        const result = await submitCheckout(formData);
        if (result?.error) {
          alert(result.error);
        }
      });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#faf9f6] px-4">
        <h1 className="text-4xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Your bag is empty</h1>
        <p className="text-gray-500 mb-8 font-light">Let's find the perfect gift.</p>
        <Link href="/discover" className="px-8 py-3 bg-[#500000] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#3d0000] transition-colors">
          Start Exploring
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Checkout Header (Minimalist) */}
      <header className="w-full bg-white border-b border-stone-200 h-20 flex items-center justify-between px-4 md:px-8 lg:px-12">
        <Link href="/" className="flex items-center group">
          <ArrowLeft className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-900 transition-colors" />
          <span className="text-xs font-medium text-gray-500 uppercase tracking-widest group-hover:text-gray-900 transition-colors">Back to Shop</span>
        </Link>
        <div className="text-3xl text-[#500000] tracking-[0.05em] transform scale-x-[1.15] scale-y-[1.1] font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
          TRISH
        </div>
        <div className="flex items-center text-gray-400 gap-2">
          <Lock className="w-4 h-4" />
          <span className="text-xs font-medium uppercase tracking-widest hidden md:inline">Secure Checkout</span>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          
          {/* Left Column: Checkout Steps */}
          <div className="flex-1 max-w-2xl">
            
            {/* Breadcrumbs / Step Indicator */}
            <div className="flex items-center gap-2 mb-10 text-xs font-medium uppercase tracking-widest">
              <span className={currentStep >= 1 ? "text-gray-900" : "text-gray-400"}>Contact</span>
              <ChevronRight className="w-3 h-3 text-gray-300" />
              <span className={currentStep >= 2 ? "text-gray-900" : "text-gray-400"}>Recipient</span>
              <ChevronRight className="w-3 h-3 text-gray-300" />
              <span className={currentStep >= 3 ? "text-gray-900" : "text-gray-400"}>Sender</span>
              <ChevronRight className="w-3 h-3 text-gray-300" />
              <span className={currentStep >= 4 ? "text-gray-900" : "text-gray-400"}>Payment</span>
            </div>

            {/* Step 1: Contact Information */}
            <div className={`transition-all duration-500 ${currentStep === 1 ? 'opacity-100' : 'opacity-50 pointer-events-none hidden'}`}>
              <h2 className="text-3xl text-gray-900 mb-6" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Contact Information</h2>
              <form onSubmit={handleNextStep} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all font-light"
                    placeholder="Where should we send your receipt?"
                  />
                </div>
                <button type="submit" className="w-full md:w-auto px-10 py-4 bg-gray-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all">
                  Continue to Delivery
                </button>
              </form>
            </div>

            {/* Step 2: Recipient Details */}
            <div className={`transition-all duration-500 ${currentStep === 2 ? 'opacity-100 block' : 'hidden'}`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Who is receiving this gift?</h2>
                <button onClick={() => setCurrentStep(1)} className="text-xs font-medium text-gray-500 underline hover:text-gray-900 transition-colors">Edit Contact</button>
              </div>
              <p className="text-sm text-gray-500 font-light mb-6">We'll make sure it's wrapped beautifully and delivered safely to them.</p>
              
              <form onSubmit={handleNextStep} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Recipient's Full Name</label>
                    <input type="text" required value={recipientName} onChange={(e) => setRecipientName(e.target.value)} className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg text-sm font-light focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Recipient's Phone</label>
                    <input type="tel" required className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg text-sm font-light focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Delivery Address</label>
                  <input type="text" required value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} placeholder="Street address, apartment, suite, etc." className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg text-sm font-light focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">City</label>
                    <input type="text" required className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg text-sm font-light focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">PIN Code</label>
                    <input type="text" required className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg text-sm font-light focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" />
                  </div>
                </div>
                
                <button type="submit" className="w-full md:w-auto px-10 py-4 bg-gray-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all mt-4">
                  Continue to Sender Details
                </button>
              </form>
            </div>

            {/* Step 3: Sender Details (Billing) */}
            <div className={`transition-all duration-500 ${currentStep === 3 ? 'opacity-100 block' : 'hidden'}`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Who is sending this?</h2>
                <button onClick={() => setCurrentStep(2)} className="text-xs font-medium text-gray-500 underline hover:text-gray-900 transition-colors">Edit Recipient</button>
              </div>
              <p className="text-sm text-gray-500 font-light mb-6">We need this for billing and in case we need to contact you about the order.</p>
              
              <form onSubmit={handleNextStep} className="space-y-6">
                <div className="space-y-4">
                  {/* Option to use same address */}
                  <label className="flex items-center gap-3 cursor-pointer p-4 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors">
                    <input type="radio" name="billing" defaultChecked className="w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900" />
                    <span className="text-sm text-gray-700">Same as delivery address</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-4 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors">
                    <input type="radio" name="billing" className="w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900" />
                    <span className="text-sm text-gray-700">Use a different billing address</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sender's Full Name</label>
                    <input type="text" required value={senderName} onChange={(e) => setSenderName(e.target.value)} className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg text-sm font-light focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sender's Phone</label>
                    <input type="tel" required className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg text-sm font-light focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" />
                  </div>
                </div>

                <button type="submit" className="w-full md:w-auto px-10 py-4 bg-gray-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all mt-4">
                  Continue to Payment
                </button>
              </form>
            </div>

            {/* Step 4: Payment */}
            <div className={`transition-all duration-500 ${currentStep === 4 ? 'opacity-100 block' : 'hidden'}`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Payment</h2>
                <button onClick={() => setCurrentStep(3)} className="text-xs font-medium text-gray-500 underline hover:text-gray-900 transition-colors">Edit Sender</button>
              </div>
              
              <div className="bg-white border border-stone-200 rounded-xl p-6 mb-8 text-center space-y-4 shadow-sm">
                <Lock className="w-8 h-8 text-gray-300 mx-auto" />
                <h3 className="font-medium text-gray-900">Secure Payment Gateway</h3>
                <p className="text-sm text-gray-500 font-light">This is a mockup. Clicking below will simulate a successful payment and complete your luxury gifting experience.</p>
              </div>

              <form onSubmit={handleNextStep}>
                <button type="submit" disabled={isPending} className="w-full py-4 bg-[#500000] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#3d0000] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed">
                  {isPending ? 'Processing...' : `Pay ₹${cartTotal.toLocaleString()} & Send Gift`} {!isPending && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: Order Summary */}
          <div className="flex-1 lg:max-w-md w-full">
            <div className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 sticky top-6 shadow-sm">
              <h3 className="text-xl text-gray-900 mb-6" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Order Summary</h3>
              
              <div className="space-y-6 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 bg-stone-100 rounded-md overflow-hidden flex-shrink-0 border border-stone-100 relative">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-900 text-white rounded-full flex items-center justify-center text-[10px] font-bold z-10 border-2 border-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex flex-col flex-1">
                      <h4 className="font-medium text-sm text-gray-900 line-clamp-1">{item.title}</h4>
                      
                      {/* Gifting Add-ons indicator */}
                      <div className="flex flex-col gap-1 mt-2">
                        {item.giftingOptions?.giftWrap && (
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
                            <Gift className="w-3 h-3" /> Wrap (+₹250)
                          </span>
                        )}
                        {item.giftingOptions?.giftMessage && (
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" /> Note Added
                          </span>
                        )}
                        {item.giftingOptions?.deliveryDate && (
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> Delivery: {item.giftingOptions.deliveryDate}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">₹{item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-100 pt-6 space-y-3">
                <div className="flex justify-between text-sm text-gray-500 font-light">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 font-light">
                  <span>Shipping</span>
                  <span>Calculated at next step</span>
                </div>
                {/* Total */}
                <div className="flex justify-between items-end pt-4 mt-4 border-t border-stone-200">
                  <span className="text-base text-gray-900 font-medium">Total</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-gray-500 uppercase">INR</span>
                    <span className="text-2xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                      ₹{cartTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

