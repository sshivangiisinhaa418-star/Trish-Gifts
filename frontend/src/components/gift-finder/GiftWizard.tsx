"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  RefreshCcw,
  ArrowRight,
  Gift,
  Send,
  ShoppingBag,
  Check,
  Star,
  Truck,
  Heart,
  SlidersHorizontal,
  Flame,
  MessageSquare,
  Sparkle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { allProducts } from "@/lib/data/products";
import { useCart } from "@/lib/context/CartContext";

type Message = {
  id: string;
  sender: "ai" | "user";
  text: string;
  options?: string[];
  type?: "text" | "options" | "result";
  results?: GiftResult[];
  reasoning?: string;
};

type GiftResult = {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
  tags?: string[];
  sameDayDelivery?: boolean;
  matchScore?: number;
};

const DEFAULT_FALLBACK_IMAGE = "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&q=80";

const getValidImage = (p: any): string => {
  if (p?.image && typeof p.image === 'string' && p.image.trim() !== '') return p.image.trim();
  if (p?.image_url && typeof p.image_url === 'string' && p.image_url.trim() !== '') return p.image_url.trim();
  if (Array.isArray(p?.images) && p.images.length > 0 && typeof p.images[0] === 'string' && p.images[0].trim() !== '') return p.images[0].trim();
  return DEFAULT_FALLBACK_IMAGE;
};

export default function GiftWizard({ initialProducts = [] }: { initialProducts?: any[] }) {
  const { addToCart } = useCart();

  // Combine DB products with fallback data
  const catalog = initialProducts && initialProducts.length > 0 ? initialProducts : allProducts;

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0);
  const [inputText, setInputText] = useState("");
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const [customNote, setCustomNote] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const answersRef = useRef<{ occasion?: string; recipient?: string; vibe?: string; budget?: string }>({});

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initial greeting
  useEffect(() => {
    setTimeout(() => {
      setMessages([
        {
          id: "msg_1",
          sender: "ai",
          text: "Welcome to TRISH Concierge ✨ I analyze style, occasion, and budget to pinpoint the one gift that will truly wows them. What is the occasion today?",
          type: "options",
          options: ["Birthday", "Anniversary", "Thank You", "Romance / Date", "Festival / Holiday", "Just Because"]
        }
      ]);
    }, 300);
  }, []);

  const addAiMessage = (msg: Omit<Message, "id">, delay = 750) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { ...msg, id: `ai_${Date.now()}` }]);
    }, delay);
  };

  const handleUserInput = (input: string) => {
    if (!input.trim() || isTyping) return;

    const query = input.trim();

    // Freeze previous option buttons
    setMessages(prev => {
      const newMsgs = [...prev];
      const last = newMsgs[newMsgs.length - 1];
      if (last?.type === "options") last.type = "text";
      return [...newMsgs, { id: `user_${Date.now()}`, sender: "user", text: query, type: "text" }];
    });

    setInputText("");

    // Step-by-step wizard flow
    if (step === 0) {
      answersRef.current.occasion = query;
      setStep(1);
      addAiMessage({
        sender: "ai",
        text: `Splendid choice! Who are we creating this ${query.toLowerCase()} memory for?`,
        type: "options",
        options: ["Partner / Spouse", "Mother", "Father", "Best Friend", "Colleague", "Sibling"]
      });

    } else if (step === 1) {
      answersRef.current.recipient = query;
      setStep(2);
      addAiMessage({
        sender: "ai",
        text: "What vibe or mood fits their taste best?",
        type: "options",
        options: ["Luxury & Glamour", "Romantic & Heartfelt", "Gourmet Indulgence", "Wellness & Spa", "Personalized Keepsake"]
      });

    } else if (step === 2) {
      answersRef.current.vibe = query;
      setStep(3);
      addAiMessage({
        sender: "ai",
        text: "Perfect. What is your comfortable budget range?",
        type: "options",
        options: ["Under ₹1,500", "₹1,500 – ₹3,500", "₹3,500 – ₹7,000", "₹7,000+"]
      });

    } else {
      // Step >= 3 or free text search
      answersRef.current.budget = query;
      setStep(4);

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const { matches, reasoning } = findBestGiftsAdvanced(query);

        setMessages(prev => [
          ...prev,
          {
            id: `ai_res_${Date.now()}`,
            sender: "ai",
            text: `I've analyzed our catalog for your parameters! Here are your bespoke recommendations:`,
            type: "result",
            reasoning,
            results: matches
          }
        ]);
        setShowNoteInput(true);
      }, 1100);
    }
  };

  const findBestGiftsAdvanced = (userQuery: string): { matches: GiftResult[]; reasoning: string } => {
    let minPrice = 0;
    let maxPrice = 999999;

    const lowerQuery = userQuery.toLowerCase();
    const { occasion, recipient, vibe } = answersRef.current;

    // Parse budget bounds
    if (lowerQuery.includes("1,500") || lowerQuery.includes("1500") || lowerQuery.includes("cheap") || lowerQuery.includes("under 1500")) {
      maxPrice = 1500;
    } else if (lowerQuery.includes("3,500") || lowerQuery.includes("3500")) {
      minPrice = 1500; maxPrice = 3500;
    } else if (lowerQuery.includes("7,000") || lowerQuery.includes("7000") || lowerQuery.includes("5000")) {
      minPrice = 3500; maxPrice = 7000;
    } else if (lowerQuery.includes("7,000+") || lowerQuery.includes("luxury")) {
      minPrice = 7000;
    }

    const searchTokens = [
      occasion,
      recipient,
      vibe,
      ...userQuery.split(/\s+/).filter(w => w.length > 2)
    ].filter(Boolean).map(s => s!.toLowerCase());

    const scored = catalog.map(p => {
      let score = 70; // baseline 70% match
      const text = `${p.title} ${p.category} ${(p.tags || []).join(" ")}`.toLowerCase();

      // Check price fit
      if (p.price >= minPrice && p.price <= maxPrice) {
        score += 15;
      }

      // Token matches
      searchTokens.forEach(token => {
        if (text.includes(token)) score += 8;
      });

      // Rating bonus
      score += (p.rating || 4.8) * 2;
      score = Math.min(99, Math.round(score));

      return {
        id: p.id.toString(),
        title: p.title,
        category: p.category || "Luxury Gift",
        price: p.price,
        originalPrice: p.originalPrice || Math.round(p.price * 1.25),
        image: getValidImage(p),
        rating: p.rating || 4.9,
        reviews: p.reviews || 84,
        tags: p.tags || ["BESTSELLER"],
        sameDayDelivery: Boolean(p.sameDayDelivery),
        matchScore: score
      };
    });

    scored.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

    const top = scored.slice(0, 3);
    const reasoning = `Matches ${recipient || 'recipient'} preference with ${vibe || 'bespoke styling'} for ${occasion || 'your occasion'}.`;

    return { matches: top, reasoning };
  };

  const handleAddToCart = (product: GiftResult) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: 1
    });

    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const resetChat = () => {
    setStep(0);
    answersRef.current = {};
    setMessages([]);
    setShowNoteInput(false);
    setNoteSaved(false);
    setCustomNote("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages([
        {
          id: "msg_restart",
          sender: "ai",
          text: "Let's discover something brand new! What is the occasion today?",
          type: "options",
          options: ["Birthday", "Anniversary", "Thank You", "Romance / Date", "Festival / Holiday", "Just Because"]
        }
      ]);
    }, 400);
  };

  const quickPrompts = [
    "💎 Luxury Watches under ₹5,000",
    "🌹 Romantic Floral Arrangements",
    "☕ Gourmet Coffee & Hampers",
    "🚚 Express Same-Day Delivery"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl border border-stone-200/90 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.12)] flex flex-col h-[680px] overflow-hidden relative">

      {/* Glassmorphism Header */}
      <div className="px-6 py-4 border-b border-stone-100 bg-white/95 backdrop-blur-md flex items-center justify-between shrink-0 relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#500000] to-[#800000] flex items-center justify-center shadow-lg shadow-[#500000]/20">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-900 text-sm tracking-wide">TRISH Concierge AI</h3>
              <span className="px-2 py-0.5 bg-amber-50 text-[#500000] text-[9px] font-bold uppercase tracking-widest rounded-full border border-amber-200">
                Pro
              </span>
            </div>
            <p className="text-[11px] text-gray-400 flex items-center gap-1.5 mt-0.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Intelligence Active
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetChat}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-[#500000] bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-200 rounded-xl transition-all shadow-sm"
            title="Reset Search"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* 5-Step Interactive Guided Progress Bar */}
      <div className="px-6 py-2.5 border-b border-stone-100 bg-stone-50/70 shrink-0 flex items-center justify-between text-[11px] font-semibold text-gray-500">
        <div className="flex items-center gap-1.5 sm:gap-3 w-full">
          {[
            { label: "Occasion", idx: 0 },
            { label: "Recipient", idx: 1 },
            { label: "Vibe", idx: 2 },
            { label: "Budget", idx: 3 },
            { label: "Curation", idx: 4 }
          ].map(s => (
            <div key={s.idx} className="flex-1 flex flex-col gap-1 items-center">
              <div
                className={`h-1.5 w-full rounded-full transition-all duration-500 ${
                  step > s.idx ? "bg-[#500000]" : step === s.idx ? "bg-[#500000]/60 animate-pulse" : "bg-stone-200"
                }`}
              />
              <span className={`hidden sm:block text-[10px] ${step >= s.idx ? "text-[#500000] font-bold" : "text-gray-400"}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-8 py-6 space-y-6 bg-gradient-to-b from-[#faf9f6] to-stone-50">
        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
            >
              {/* Sender Label */}
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 px-1">
                {msg.sender === "user" ? "You" : "TRISH Concierge"}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[88%] sm:max-w-[80%] px-5 py-4 rounded-2xl text-[14.5px] leading-relaxed shadow-sm ${
                  msg.sender === "user"
                    ? "bg-[#500000] text-white rounded-br-sm shadow-[#500000]/10"
                    : "bg-white border border-stone-200/80 text-gray-800 rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>

              {/* Quick Option Chips */}
              {msg.type === "options" && msg.options && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex flex-wrap gap-2 mt-3 ml-1 max-w-lg"
                >
                  {msg.options.map((opt, i) => (
                    <button
                      key={i}
                      disabled={isTyping}
                      onClick={() => handleUserInput(opt)}
                      className="px-4 py-2 bg-white hover:bg-[#500000] border border-stone-200 hover:border-[#500000] text-gray-800 hover:text-white rounded-full text-xs font-semibold transition-all active:scale-95 shadow-sm hover:shadow-md disabled:opacity-50 flex items-center gap-1.5 group"
                    >
                      <span>{opt}</span>
                      <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Product Results Grid / Hero Card */}
              {msg.type === "result" && msg.results && (
                <div className="mt-4 w-full space-y-4">
                  {msg.reasoning && (
                    <div className="p-3 bg-amber-50/80 border border-amber-200/60 rounded-xl text-xs text-amber-900 font-medium flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#500000] shrink-0" />
                      <span>{msg.reasoning}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {msg.results.map((product, idx) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.12 }}
                        className={`bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group relative ${
                          idx === 0 ? "ring-2 ring-[#500000]/20 sm:col-span-1" : ""
                        }`}
                      >
                        <div>
                          {/* Image Header */}
                          <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                            <Image
                              src={product.image || DEFAULT_FALLBACK_IMAGE}
                              alt={product.title || "Gift"}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            {idx === 0 && (
                              <div className="absolute top-3 left-3 bg-[#500000] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                                <Flame className="w-3 h-3 text-amber-300" /> {product.matchScore || 98}% Match
                              </div>
                            )}

                            {product.sameDayDelivery && (
                              <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm text-emerald-800 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1 border border-emerald-200">
                                <Truck className="w-3 h-3 text-emerald-600" /> Express 24h
                              </div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] text-[#500000] font-bold uppercase tracking-wider">{product.category}</span>
                              <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                <span>{product.rating}</span>
                              </div>
                            </div>

                            <h4 className="font-semibold text-gray-900 text-sm mb-1.5 line-clamp-1 group-hover:text-[#500000] transition-colors">
                              {product.title}
                            </h4>

                            <div className="flex items-baseline gap-2">
                              <span className="text-gray-900 font-bold text-base">₹{product.price.toLocaleString()}</span>
                              {product.originalPrice && product.originalPrice > product.price && (
                                <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="p-4 pt-0 space-y-2">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className={`w-full py-2.5 px-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 ${
                              addedItems[product.id]
                                ? "bg-emerald-600 text-white shadow-emerald-600/20"
                                : "bg-[#500000] text-white hover:bg-gray-900 shadow-[#500000]/20"
                            }`}
                          >
                            {addedItems[product.id] ? (
                              <>
                                <Check className="w-4 h-4" /> Added to Cart!
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="w-4 h-4" /> Add to Cart
                              </>
                            )}
                          </button>

                          <Link
                            href={`/product/${product.id}`}
                            className="w-full py-1.5 text-center block text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
                          >
                            View Product Details →
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start"
            >
              <div className="bg-white border border-stone-200 px-5 py-3.5 rounded-2xl rounded-bl-sm shadow-sm flex gap-1.5 items-center">
                <span className="w-2 h-2 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Free Custom Handwritten Note Card (Appears after recommendations) */}
        {showNoteInput && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-white border border-stone-200 rounded-2xl shadow-sm space-y-3"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-wider">
              <MessageSquare className="w-4 h-4 text-[#500000]" />
              <span>Complimentary Handwritten Gift Card</span>
            </div>
            <p className="text-xs text-gray-500 font-light">
              Add a personal message to be handwritten in gold calligraphy on premium cardstock:
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={customNote}
                onChange={e => setCustomNote(e.target.value)}
                placeholder="e.g. Happy 30th Birthday, with all my love!"
                className="flex-1 px-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#500000]"
              />
              <button
                onClick={() => {
                  if (customNote.trim()) setNoteSaved(true);
                }}
                className="px-4 py-2 bg-gray-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#500000] transition-colors"
              >
                {noteSaved ? "Saved! ✓" : "Save Note"}
              </button>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} className="h-2 shrink-0" />
      </div>

      {/* Quick Prompt Presets */}
      <div className="px-5 py-2 bg-white border-t border-stone-100 flex gap-2 overflow-x-auto shrink-0 no-scrollbar">
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleUserInput(p.replace(/^[^\s]+\s/, ""))}
            className="px-3 py-1 bg-stone-50 hover:bg-amber-50 text-gray-600 hover:text-[#500000] border border-stone-200 hover:border-amber-200 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Interactive Chat Input Bar */}
      <div className="p-4 border-t border-stone-200/90 bg-white shrink-0">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleUserInput(inputText);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Type any request (e.g., 'Watches under 4000', 'Flowers for mom')..."
            className="flex-1 px-5 py-3.5 bg-stone-50 text-gray-900 font-medium placeholder:text-gray-400 border border-stone-200 rounded-full text-sm focus:outline-none focus:border-[#500000] focus:bg-white focus:ring-1 focus:ring-[#500000] transition-all"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="p-3.5 bg-[#500000] text-white rounded-full hover:bg-gray-900 transition-colors shadow-md shadow-[#500000]/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
