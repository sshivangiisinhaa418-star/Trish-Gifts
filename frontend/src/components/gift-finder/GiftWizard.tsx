"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCcw, ArrowRight, Gift, Send, ShoppingBag, Check } from "lucide-react";
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
};

type GiftResult = {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
  rating?: number;
  tags?: string[];
};

export default function GiftWizard({ initialProducts = [] }: { initialProducts?: any[] }) {
  const { addToCart, openCart } = useCart();

  // Combine DB products with fallback data
  const catalog = initialProducts && initialProducts.length > 0 ? initialProducts : allProducts;

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0);
  const [inputText, setInputText] = useState("");
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const answersRef = useRef<{ occasion?: string; recipient?: string; budget?: string }>({});

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
          text: "Welcome to TRISH Concierge! 🎁 I can find the ideal gift in seconds. What is the special occasion?",
          type: "options",
          options: ["Birthday", "Anniversary", "Thank You", "Romantic / Date", "Festival / Holiday", "Just Because"]
        }
      ]);
    }, 300);
  }, []);

  const addAiMessage = (msg: Omit<Message, "id">, delay = 800) => {
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
        text: `Splendid! Who are we celebrating for this ${query.toLowerCase()}?`,
        type: "options",
        options: ["Partner / Spouse", "Mother", "Father", "Friend", "Colleague", "Sibling"]
      });

    } else if (step === 1) {
      answersRef.current.recipient = query;
      setStep(2);
      addAiMessage({
        sender: "ai",
        text: "Understood. What price range or budget do you have in mind?",
        type: "options",
        options: ["Under ₹1,500", "₹1,500 – ₹3,000", "₹3,000 – ₹6,000", "₹6,000+"]
      });

    } else {
      // Step >= 2 or direct free text search
      answersRef.current.budget = query;
      setStep(3);

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const matches = findBestGifts(query);

        if (matches.length > 0) {
          setMessages(prev => [
            ...prev,
            {
              id: `ai_res_${Date.now()}`,
              sender: "ai",
              text: `Here are our top curated recommendations matching "${query}":`,
              type: "result",
              results: matches
            }
          ]);
        } else {
          setMessages(prev => [
            ...prev,
            {
              id: `ai_res_${Date.now()}`,
              sender: "ai",
              text: "I couldn't find an exact match for that specific filter, but here are our signature bestsellers!",
              type: "result",
              results: catalog.slice(0, 3).map(p => ({
                id: p.id.toString(),
                title: p.title,
                category: p.category || "Luxury Gift",
                price: p.price,
                image: p.image,
                rating: p.rating,
                tags: p.tags
              }))
            }
          ]);
        }
      }, 1000);
    }
  };

  const findBestGifts = (userQuery: string): GiftResult[] => {
    let minPrice = 0;
    let maxPrice = 999999;

    const lowerQuery = userQuery.toLowerCase();
    const { occasion, recipient } = answersRef.current;

    // Parse budget bounds
    if (lowerQuery.includes("1,500") || lowerQuery.includes("1500") || lowerQuery.includes("cheap") || lowerQuery.includes("under 1500")) {
      maxPrice = 1500;
    } else if (lowerQuery.includes("3,000") || lowerQuery.includes("3000")) {
      minPrice = 1500; maxPrice = 3500;
    } else if (lowerQuery.includes("6,000") || lowerQuery.includes("6000") || lowerQuery.includes("5000")) {
      minPrice = 3000; maxPrice = 6000;
    } else if (lowerQuery.includes("6,000+") || lowerQuery.includes("luxury")) {
      minPrice = 5000;
    }

    const searchTokens = [
      occasion,
      recipient,
      ...userQuery.split(/\s+/).filter(w => w.length > 2)
    ].filter(Boolean).map(s => s!.toLowerCase());

    const scored = catalog.map(p => {
      let score = 0;
      const text = `${p.title} ${p.category} ${(p.tags || []).join(" ")}`.toLowerCase();

      // Check price fit
      if (p.price >= minPrice && p.price <= maxPrice) {
        score += 5;
      }

      // Token matches
      searchTokens.forEach(token => {
        if (text.includes(token)) score += 3;
      });

      // Rating bonus
      score += (p.rating || 4.5) * 0.5;

      return {
        id: p.id.toString(),
        title: p.title,
        category: p.category || "Curated Gift",
        price: p.price,
        image: p.image,
        rating: p.rating,
        tags: p.tags,
        score
      };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 3);
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
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages([
        {
          id: "msg_restart",
          sender: "ai",
          text: "Restarted! What occasion are we shopping for today?",
          type: "options",
          options: ["Birthday", "Anniversary", "Thank You", "Romantic / Date", "Festival / Holiday", "Just Because"]
        }
      ]);
    }, 400);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl border border-stone-200/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] flex flex-col h-[650px] overflow-hidden">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-stone-100 bg-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#500000] flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm tracking-wide">TRISH AI Gift Concierge</h3>
            <p className="text-[11px] text-gray-400 flex items-center gap-1.5 mt-0.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Active & Ready
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetChat}
            className="p-2 text-gray-400 hover:text-gray-700 transition-colors rounded-xl hover:bg-stone-100"
            title="Reset Conversation"
          >
            <RefreshCcw className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center gap-2 justify-center py-2.5 border-b border-stone-100 bg-stone-50/50 shrink-0">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              step > i ? "w-8 bg-[#500000]" : step === i ? "w-5 bg-[#500000]/40" : "w-3 bg-stone-200"
            }`}
          />
        ))}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6 space-y-5 bg-[#faf9f6]/60">
        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
            >
              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] px-5 py-3.5 rounded-2xl text-[14.5px] leading-relaxed shadow-sm ${
                  msg.sender === "user"
                    ? "bg-[#500000] text-white rounded-br-sm"
                    : "bg-white border border-stone-200/60 text-gray-800 rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>

              {/* Quick Option Chips */}
              {msg.type === "options" && msg.options && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex flex-wrap gap-2 mt-3 ml-1 max-w-md"
                >
                  {msg.options.map((opt, i) => (
                    <button
                      key={i}
                      disabled={isTyping}
                      onClick={() => handleUserInput(opt)}
                      className="px-4 py-2 bg-white border border-stone-200 text-gray-700 rounded-full text-xs font-semibold hover:border-[#500000] hover:text-[#500000] transition-all active:scale-95 shadow-sm disabled:opacity-50"
                    >
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Product Results Grid */}
              {msg.type === "result" && msg.results && (
                <div className="mt-4 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {msg.results.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        <div className="relative h-40 w-full overflow-hidden bg-stone-100">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {idx === 0 && (
                            <div className="absolute top-2 right-2 bg-[#500000] text-amber-200 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md">
                              Top Match
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <p className="text-[10px] text-[#500000] font-bold uppercase tracking-wider mb-1">{product.category}</p>
                          <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">{product.title}</h4>
                          <p className="text-gray-900 font-bold text-sm">₹{product.price.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="p-4 pt-0 space-y-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className={`w-full py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                            addedItems[product.id]
                              ? "bg-emerald-600 text-white"
                              : "bg-[#500000] text-white hover:bg-gray-900"
                          }`}
                        >
                          {addedItems[product.id] ? (
                            <>
                              <Check className="w-3.5 h-3.5" /> Added!
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                            </>
                          )}
                        </button>

                        <Link
                          href={`/product/${product.id}`}
                          className="w-full py-1.5 text-center block text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
                        >
                          View Details →
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}

          {/* Typing Animation */}
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
        <div ref={messagesEndRef} className="h-2 shrink-0" />
      </div>

      {/* Interactive Input Form */}
      <div className="p-4 border-t border-stone-200/80 bg-white shrink-0">
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
            placeholder="Type a recipient, occasion, or request (e.g. 'Watches under 3000')..."
            className="flex-1 px-5 py-3 bg-stone-50 text-gray-900 font-medium placeholder:text-gray-400 border border-stone-200 rounded-full text-sm focus:outline-none focus:border-[#500000] focus:bg-white focus:ring-1 focus:ring-[#500000] transition-all"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="p-3 bg-[#500000] text-white rounded-full hover:bg-gray-900 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-2.5 flex items-center justify-between text-[11px] text-gray-400 font-medium px-2">
          <span>Ask anything or select option pills above</span>
          <button onClick={resetChat} className="text-[#500000] hover:underline font-semibold">
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}
