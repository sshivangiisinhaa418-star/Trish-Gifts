"use client";

import { useState } from "react";
import { useCart } from "@/lib/context/CartContext";
import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, ArrowRight, Check, Lock, ChevronRight, Gift, Calendar, MessageSquare, ShieldCheck, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { createRazorpayOrder, verifyAndCreateOrder } from "@/app/actions/payment";
import { validateCoupon } from "@/app/actions/store";

type CheckoutStep = 1 | 2 | 3 | 4;

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && (window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const router = useRouter();

  // Form States (Complete Delivery & Courier Logistics)
  const [email, setEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [recipientAlternatePhone, setRecipientAlternatePhone] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [billingType, setBillingType] = useState<"same" | "different">("same");
  const [billingAddress, setBillingAddress] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Promo Code State
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponError, setCouponError] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const finalAmount = appliedCoupon ? appliedCoupon.netTotal : cartTotal;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    setIsApplyingCoupon(true);
    setCouponError("");

    const res = await validateCoupon(couponInput, cartTotal);
    if (res.error) {
      setCouponError(res.error);
      setAppliedCoupon(null);
    } else {
      setAppliedCoupon(res);
      setCouponError("");
    }
    setIsApplyingCoupon(false);
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as CheckoutStep);
    } else {
      handleRazorpayPayment();
    }
  };

  const handleRazorpayPayment = async () => {
    setIsProcessing(true);
    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        alert("Failed to load Razorpay payment gateway. Please check your internet connection.");
        setIsProcessing(false);
        return;
      }

      const orderRes = await createRazorpayOrder(finalAmount);
      if (orderRes.error || !orderRes.orderId) {
        alert(orderRes.error || "Failed to initialize payment.");
        setIsProcessing(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_TTXMeDPbyMc0pU",
        amount: orderRes.amount,
        currency: orderRes.currency,
        name: "TRISH Luxury Gifts",
        description: "Artisanal Luxury Gift Order",
        order_id: orderRes.orderId,
        prefill: {
          name: senderName || recipientName,
          email: senderEmail || email,
          contact: senderPhone || recipientPhone
        },
        theme: {
          color: "#500000"
        },
        handler: async function (response: any) {
          // Cryptographic server-side verification and order placement
          const verifyRes = await verifyAndCreateOrder({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            shippingDetails: {
              recipient_name: recipientName,
              recipient_email: email,
              recipient_phone: recipientPhone,
              recipient_alternate_phone: recipientAlternatePhone,
              recipient_address: recipientAddress,
              landmark: landmark,
              city: city,
              state: state,
              pincode: pincode,
              delivery_instructions: deliveryInstructions,
              sender_name: senderName,
              sender_phone: senderPhone,
              sender_email: senderEmail || email,
              billing_address: billingType === 'same' ? `${recipientAddress}, ${landmark ? `Near ${landmark}, ` : ''}${city}, ${state} - ${pincode}` : (billingAddress || recipientAddress),
              total_amount: finalAmount
            },
            cartItems: cartItems
          });

          if (verifyRes?.success && verifyRes.orderId) {
            clearCart();
            router.push(`/checkout/success?orderId=${encodeURIComponent(verifyRes.orderId)}`);
          } else {
            alert(verifyRes?.error || "Payment verification failed.");
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (resp: any) {
        alert(`Payment Failed: ${resp.error?.description || resp.error?.reason || 'Transaction could not be completed'}`);
        setIsProcessing(false);
      });
      rzp.open();
    } catch (err: any) {
      console.error("Payment initiation error:", err);
      alert("An unexpected error occurred during payment initialization.");
      setIsProcessing(false);
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
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
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
                  <label className="text-[10px] font-bold text-gray-700 uppercase tracking-widest block">Order Receipt & Tracking Email *</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 bg-white border border-stone-300 rounded-xl text-base text-black font-semibold placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all shadow-sm"
                    placeholder="Where should we send your receipt & tracking?"
                  />
                </div>
                <button type="submit" className="w-full md:w-auto px-10 py-4 bg-gray-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-md">
                  Continue to Delivery &rarr;
                </button>
              </form>
            </div>

            {/* Step 2: Recipient Details */}
            <div className={`transition-all duration-500 ${currentStep === 2 ? 'opacity-100 block' : 'hidden'}`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Who is receiving this gift?</h2>
                <button type="button" onClick={() => setCurrentStep(1)} className="text-xs font-semibold text-gray-600 underline hover:text-gray-900 transition-colors">Edit Contact</button>
              </div>
              <p className="text-sm text-gray-600 font-normal mb-6">Please provide accurate address and phone details so the courier partner can deliver smoothly.</p>
              
              <form onSubmit={handleNextStep} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-widest block">Recipient's Full Name *</label>
                    <input type="text" required value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Full Name" className="w-full px-4 py-3.5 bg-white border border-stone-300 rounded-xl text-base text-black font-semibold placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-widest block">Primary Phone Number *</label>
                    <input type="tel" required value={recipientPhone} onChange={(e) => setRecipientPhone(e.target.value)} placeholder="+91 98765 43210 (For courier delivery)" className="w-full px-4 py-3.5 bg-white border border-stone-300 rounded-xl text-base text-black font-semibold placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all shadow-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-widest block">Alternate Phone / WhatsApp (Optional)</label>
                    <input type="tel" value={recipientAlternatePhone} onChange={(e) => setRecipientAlternatePhone(e.target.value)} placeholder="+91 98765 00000" className="w-full px-4 py-3.5 bg-white border border-stone-300 rounded-xl text-base text-black font-semibold placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-widest block">Nearby Landmark (Optional)</label>
                    <input type="text" value={landmark} onChange={(e) => setLandmark(e.target.value)} placeholder="e.g. Near Apollo Pharmacy / Opp. Central Mall" className="w-full px-4 py-3.5 bg-white border border-stone-300 rounded-xl text-base text-black font-semibold placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all shadow-sm" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-700 uppercase tracking-widest block">Complete Street Address (Flat / House No, Building, Street) *</label>
                  <input type="text" required value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} placeholder="Flat 402, Royal Palms, 5th Main Road" className="w-full px-4 py-3.5 bg-white border border-stone-300 rounded-xl text-base text-black font-semibold placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all shadow-sm" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-widest block">City *</label>
                    <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Mumbai" className="w-full px-4 py-3.5 bg-white border border-stone-300 rounded-xl text-base text-black font-semibold placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-widest block">State *</label>
                    <input type="text" required value={state} onChange={(e) => setState(e.target.value)} placeholder="e.g. Maharashtra" className="w-full px-4 py-3.5 bg-white border border-stone-300 rounded-xl text-base text-black font-semibold placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-widest block">PIN Code *</label>
                    <input type="text" required value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="e.g. 400001" className="w-full px-4 py-3.5 bg-white border border-stone-300 rounded-xl text-base text-black font-semibold placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all shadow-sm" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-700 uppercase tracking-widest block">Special Delivery Instructions (Optional)</label>
                  <input type="text" value={deliveryInstructions} onChange={(e) => setDeliveryInstructions(e.target.value)} placeholder="e.g. Please do not call recipient before 11 AM / Surprise delivery" className="w-full px-4 py-3.5 bg-white border border-stone-300 rounded-xl text-base text-black font-semibold placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all shadow-sm" />
                </div>
                
                <button type="submit" className="w-full md:w-auto px-10 py-4 bg-gray-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all mt-4 shadow-md">
                  Continue to Sender Details &rarr;
                </button>
              </form>
            </div>

            {/* Step 3: Sender Details (Billing) */}
            <div className={`transition-all duration-500 ${currentStep === 3 ? 'opacity-100 block' : 'hidden'}`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Who is sending this?</h2>
                <button type="button" onClick={() => setCurrentStep(2)} className="text-xs font-semibold text-gray-600 underline hover:text-gray-900 transition-colors">Edit Recipient</button>
              </div>
              <p className="text-sm text-gray-600 font-normal mb-6">We need your sender details for billing and in case the courier needs to contact you.</p>
              
              <form onSubmit={handleNextStep} className="space-y-6">
                <div className="space-y-4">
                  {/* Option to use same address */}
                  <label className="flex items-center gap-3 cursor-pointer p-4 border border-stone-300 bg-white rounded-xl hover:bg-stone-50 transition-colors shadow-sm">
                    <input 
                      type="radio" 
                      name="billing" 
                      checked={billingType === 'same'} 
                      onChange={() => setBillingType('same')}
                      className="w-4 h-4 text-gray-900 border-gray-400 focus:ring-gray-900" 
                    />
                    <span className="text-sm font-semibold text-gray-900">Same as delivery address</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-4 border border-stone-300 bg-white rounded-xl hover:bg-stone-50 transition-colors shadow-sm">
                    <input 
                      type="radio" 
                      name="billing" 
                      checked={billingType === 'different'} 
                      onChange={() => setBillingType('different')}
                      className="w-4 h-4 text-gray-900 border-gray-400 focus:ring-gray-900" 
                    />
                    <span className="text-sm font-semibold text-gray-900">Use a different billing address</span>
                  </label>
                </div>

                {billingType === 'different' && (
                  <div className="space-y-2 animate-fade-up">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-widest block">Billing Address *</label>
                    <input 
                      type="text" 
                      required 
                      value={billingAddress} 
                      onChange={(e) => setBillingAddress(e.target.value)} 
                      placeholder="Billing street address, city, state, pin code" 
                      className="w-full px-4 py-3.5 bg-white border border-stone-300 rounded-xl text-base text-black font-semibold placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all shadow-sm" 
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-widest block">Sender's Full Name *</label>
                    <input type="text" required value={senderName} onChange={(e) => setSenderName(e.target.value)} placeholder="Your Full Name" className="w-full px-4 py-3.5 bg-white border border-stone-300 rounded-xl text-base text-black font-semibold placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-widest block">Sender's Phone *</label>
                    <input type="tel" required value={senderPhone} onChange={(e) => setSenderPhone(e.target.value)} placeholder="+91 98765 43210" className="w-full px-4 py-3.5 bg-white border border-stone-300 rounded-xl text-base text-black font-semibold placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-widest block">Sender's Email (Optional)</label>
                    <input type="email" value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} placeholder="sender@example.com" className="w-full px-4 py-3.5 bg-white border border-stone-300 rounded-xl text-base text-black font-semibold placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all shadow-sm" />
                  </div>
                </div>

                <button type="submit" className="w-full md:w-auto px-10 py-4 bg-gray-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all mt-4 shadow-md">
                  Continue to Payment Options &rarr;
                </button>
              </form>
            </div>

            {/* Step 4: Payment */}
            <div className={`transition-all duration-500 ${currentStep === 4 ? 'opacity-100 block' : 'hidden'}`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Payment & Confirmation</h2>
                <button type="button" onClick={() => setCurrentStep(3)} className="text-xs font-semibold text-gray-600 underline hover:text-gray-900 transition-colors">Edit Sender</button>
              </div>
              
              <div className="bg-white border border-stone-300 rounded-2xl p-6 md:p-8 mb-8 space-y-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-[#500000]">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">Razorpay Live Verified Gateway</h3>
                      <p className="text-xs text-gray-500 font-normal">Instant Authorization & 256-bit SSL Security</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                    Active Test Mode
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-gray-900 shadow-2xs">
                    📱 UPI / QR (GPay, PhonePe)
                  </div>
                  <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-gray-900 shadow-2xs">
                    💳 Cards (Visa, Mastercard)
                  </div>
                  <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-gray-900 shadow-2xs">
                    🏦 Net Banking (All Banks)
                  </div>
                  <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-gray-900 shadow-2xs">
                    👛 Wallets (Paytm, Mobikwik)
                  </div>
                </div>

                <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
                  <Lock className="w-4 h-4 text-[#500000] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    Clicking below will launch the official Razorpay payment window. Choose UPI, QR, Card, or Net Banking to complete payment.
                  </span>
                </div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleRazorpayPayment(); }}>
                <button 
                  type="submit" 
                  disabled={isProcessing} 
                  className="w-full py-4 bg-[#500000] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#3d0000] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <span>Opening Payment Gateway...</span>
                  ) : (
                    <>
                      <span>Pay ₹{cartTotal.toLocaleString()} via Razorpay</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
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

              {/* Promo Code / Coupon Section */}
              <div className="border-t border-stone-200 pt-5 mt-4">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Have a Promo Code?</p>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input 
                    type="text" 
                    value={couponInput} 
                    onChange={(e) => setCouponInput(e.target.value)} 
                    placeholder="e.g. WELCOME10 / TRISH500" 
                    className="flex-1 px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-semibold uppercase text-black focus:outline-none focus:border-gray-900" 
                  />
                  <button 
                    type="submit" 
                    disabled={isApplyingCoupon || !couponInput.trim()} 
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#500000] transition-colors disabled:opacity-50"
                  >
                    {isApplyingCoupon ? '...' : 'Apply'}
                  </button>
                </form>

                {couponError && (
                  <p className="text-xs text-red-600 mt-2 font-medium">{couponError}</p>
                )}

                {appliedCoupon && (
                  <div className="mt-2.5 p-2.5 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between text-xs text-green-800">
                    <span className="font-semibold">🎟️ Coupon {appliedCoupon.code} Applied</span>
                    <span className="font-bold">-₹{appliedCoupon.discountAmount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-stone-200 pt-4 mt-4 space-y-2.5 text-sm">
                <div className="flex justify-between text-gray-600 font-normal">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-green-700 font-medium">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-₹{appliedCoupon.discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600 font-normal">
                  <span>Shipping & Delivery</span>
                  <span className="text-green-700 font-semibold">Free</span>
                </div>

                {/* Net Total */}
                <div className="flex justify-between items-end pt-4 mt-2 border-t border-stone-200">
                  <span className="text-base text-gray-900 font-semibold">Payable Total</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-gray-500 uppercase font-mono">INR</span>
                    <span className="text-3xl font-bold text-[#500000]">
                      ₹{finalAmount.toLocaleString()}
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

