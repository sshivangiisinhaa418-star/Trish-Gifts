"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCcw, ArrowRight, Gift } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Message = {
  id: string;
  sender: "ai" | "user";
  text: string;
  options?: string[];
  type?: "text" | "options" | "result" | "success";
};

type GiftResult = {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
};

export default function GiftWizard({ initialProducts = [] }: { initialProducts?: any[] }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [result, setResult] = useState<GiftResult | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Collected answers
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
          text: "Hi! I'm your gift concierge. Let me find the perfect gift in 3 quick questions. What's the occasion?",
          type: "options",
          options: ["Birthday", "Anniversary", "Congratulations", "Thank You", "Festival", "Just Because"]
        }
      ]);
    }, 400);
  }, []);

  const addAiMessage = (msg: Omit<Message, "id">, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { ...msg, id: `ai_${Date.now()}` }]);
    }, delay);
  };

  const handleUserInput = (input: string) => {
    // Append user bubble
    setMessages(prev => {
      const newMsgs = [...prev];
      const last = newMsgs[newMsgs.length - 1];
      if (last?.type === "options") last.type = "text"; // freeze options
      return [...newMsgs, { id: `user_${Date.now()}`, sender: "user", text: input, type: "text" }];
    });

    if (step === 0) {
      answersRef.current.occasion = input;
      setStep(1);
      addAiMessage({
        sender: "ai",
        text: "Lovely! Who is this gift for?",
        type: "options",
        options: ["Mom", "Dad", "Partner", "Friend", "Sibling", "Colleague", "Child"]
      });

    } else if (step === 1) {
      answersRef.current.recipient = input;
      setStep(2);
      addAiMessage({
        sender: "ai",
        text: "Almost there! What's your budget?",
        type: "options",
        options: ["Under ₹3,000", "₹3,000 – ₹5,000", "₹5,000 – ₹8,000", "₹8,000+"]
      });

    } else if (step === 2) {
      answersRef.current.budget = input;
      setStep(3);

      // Show "curating" message then result
      setIsTyping(true);
      setMessages(prev => [...prev, {
        id: `ai_curating_${Date.now()}`,
        sender: "ai",
        text: "Perfect! Let me find the best match for you...",
        type: "text"
      }]);

      setTimeout(() => {
        setIsTyping(false);
        const best = findBestGift(input);
        setResult(best);
        setMessages(prev => [...prev, {
          id: `ai_result_${Date.now()}`,
          sender: "ai",
          text: best
            ? `I found the perfect gift for you! 🎁`
            : "I'm curating our finest selections — check our full collection below.",
          type: "result"
        }]);
        setStep(4);
      }, 1800);
    }
  };

  const findBestGift = (budgetStr: string): GiftResult | null => {
    if (!initialProducts.length) return null;

    // Parse budget
    let min = 0, max = 999999;
    if (budgetStr.includes("Under ₹3,000")) { max = 3000; }
    else if (budgetStr.includes("₹3,000")) { min = 3000; max = 5000; }
    else if (budgetStr.includes("₹5,000")) { min = 5000; max = 8000; }
    else if (budgetStr.includes("₹8,000")) { min = 8000; }

    const { occasion, recipient } = answersRef.current;
    const keywords = [occasion, recipient].filter(Boolean).map(s => s!.toLowerCase());

    let filtered = initialProducts.filter(p => p.price >= min && p.price <= max);
    if (filtered.length === 0) filtered = initialProducts; // fallback

    // Score by keyword matches in title/category/tags
    const scored = filtered.map(p => {
      let score = 0;
      const text = `${p.title} ${p.category} ${(p.tags || []).join(" ")}`.toLowerCase();
      keywords.forEach(kw => { if (text.includes(kw)) score += 2; });
      score += (p.rating || 0) * 0.3;
      score += Math.random() * 0.1; // tiny tie-breaker
      return { ...p, score };
    });

    scored.sort((a, b) => b.score - a.score);
    const top = scored[0];
    return top
      ? { id: top.id.toString(), title: top.title, category: top.category || "Curated Gift", price: top.price, image: top.image }
      : null;
  };

  const resetChat = () => {
    setStep(0);
    setResult(null);
    answersRef.current = {};
    setMessages([]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages([{
        id: "msg_restart",
        sender: "ai",
        text: "Let's start fresh! What's the occasion this time?",
        type: "options",
        options: ["Birthday", "Anniversary", "Congratulations", "Thank You", "Festival", "Just Because"]
      }]);
    }, 600);
  };

  const lastMsgType = messages[messages.length - 1]?.type;
  const isInputDisabled = isTyping || step >= 3;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-none md:rounded-3xl border-none md:border md:border-gray-100 shadow-none md:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] flex flex-col min-h-screen md:min-h-0 md:h-full overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 bg-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#500000] flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm tracking-wide">TRISH Gift Concierge</h3>
            <p className="text-[11px] text-gray-400 flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Online
            </p>
          </div>
        </div>
        <button
          onClick={resetChat}
          className="p-2 text-gray-400 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-50"
          title="Start over"
        >
          <RefreshCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Step progress dots */}
      <div className="flex items-center gap-2 justify-center py-3 border-b border-gray-50 shrink-0">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              step > i ? "w-8 bg-[#500000]" : step === i ? "w-5 bg-[#500000]/40" : "w-3 bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto px-5 py-6 space-y-5 bg-[#faf9f6]/40">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
            >
              {/* Bubble */}
              <div className={`max-w-[80%] px-5 py-3.5 rounded-2xl text-[14.5px] leading-relaxed ${
                msg.sender === "user"
                  ? "bg-[#500000] text-white rounded-br-sm"
                  : "bg-white border border-gray-100 text-gray-800 rounded-bl-sm shadow-sm"
              }`}>
                {msg.text}
              </div>

              {/* Option chips */}
              {msg.type === "options" && msg.options && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap gap-2 mt-3 ml-1 max-w-sm"
                >
                  {msg.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleUserInput(opt)}
                      className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-sm hover:border-[#500000] hover:text-[#500000] transition-all active:scale-95 shadow-sm"
                    >
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Gift Result Card */}
              {msg.type === "result" && (
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.25, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="mt-4 ml-1 w-full max-w-xs"
                >
                  {result ? (
                    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
                      {/* Image */}
                      <div className="relative h-52 w-full overflow-hidden bg-gray-50">
                        <Image
                          src={result.image}
                          alt={result.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#500000] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                          Best Match
                        </div>
                      </div>
                      {/* Info */}
                      <div className="p-5">
                        <p className="text-[10px] text-[#500000] font-bold uppercase tracking-widest mb-1">{result.category}</p>
                        <h4 className="font-semibold text-gray-900 text-base mb-1 leading-snug" style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.25rem' }}>
                          {result.title}
                        </h4>
                        <p className="text-gray-900 font-bold text-sm mb-4">₹{result.price.toLocaleString()}</p>
                        <Link
                          href={`/product/${result.id}`}
                          className="flex items-center justify-center gap-2 w-full py-3 bg-[#500000] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-gray-900 transition-colors shadow-sm"
                        >
                          <Gift className="w-3.5 h-3.5" />
                          View This Gift
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={resetChat}
                          className="mt-2 w-full py-2.5 text-xs text-gray-400 hover:text-gray-700 transition-colors"
                        >
                          Show me something else →
                        </button>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href="/discover"
                      className="flex items-center gap-2 px-6 py-3 bg-[#500000] text-white rounded-full text-sm font-bold hover:bg-gray-900 transition-colors"
                    >
                      Browse All Gifts <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start"
            >
              <div className="bg-white border border-gray-100 px-5 py-3.5 rounded-2xl rounded-bl-sm shadow-sm flex gap-1.5 items-center">
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} className="h-2 shrink-0" />
      </div>

      {/* Hint text at bottom when done */}
      <div className="px-5 py-4 border-t border-gray-100 bg-white shrink-0">
        {step >= 3 ? (
          <p className="text-center text-xs text-gray-400">
            Not what you're looking for?{" "}
            <button onClick={resetChat} className="text-[#500000] font-semibold hover:underline">
              Start again
            </button>{" "}
            or{" "}
            <Link href="/discover" className="text-[#500000] font-semibold hover:underline">
              browse all gifts
            </Link>
          </p>
        ) : (
          <p className="text-center text-xs text-gray-400">
            {step === 0 ? "Step 1 of 3 — Occasion" : step === 1 ? "Step 2 of 3 — Recipient" : "Step 3 of 3 — Budget"}
          </p>
        )}
      </div>
    </div>
  );
}
