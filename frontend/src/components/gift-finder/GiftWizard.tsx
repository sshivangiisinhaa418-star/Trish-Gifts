"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Gift, RefreshCcw, CheckCircle } from "lucide-react";
import Image from "next/image";

type Message = {
  id: string;
  sender: "ai" | "user";
  text: string;
  options?: string[];
  type?: "text" | "options" | "results" | "success";
};

// Mock curated results
const MOCK_RESULTS = [
  {
    id: "opt_1",
    title: "The Signature Collection",
    description: "Elegant and timeless arrangement.",
    price: 3500,
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&q=80",
  },
  {
    id: "opt_2",
    title: "The Luxe Edit",
    description: "Premium selection with premium accents.",
    price: 4800,
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=500&q=80",
  },
  {
    id: "opt_3",
    title: "The Minimalist Touch",
    description: "Clean, modern, and beautifully presented.",
    price: 2800,
    image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=500&q=80",
  }
];

export default function GiftWizard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState("");
  const [step, setStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Initial greeting
    setTimeout(() => {
      setMessages([
        {
          id: "msg_1",
          sender: "ai",
          text: "Hello! I'm your TRISH Concierge. Let's customize the perfect gift. To begin, what is the occasion?",
          type: "options",
          options: ["Birthday", "Anniversary", "Wedding", "Thank You", "Just Because"]
        }
      ]);
    }, 500);
  }, []);

  const handleOptionSelect = (option: string) => {
    // Add user message
    const userMsg: Message = {
      id: `msg_user_${Date.now()}`,
      sender: "user",
      text: option,
      type: "text"
    };
    
    // Remove options from previous AI message to prevent re-clicking
    setMessages(prev => {
      const newMsgs = [...prev];
      const lastMsg = newMsgs[newMsgs.length - 1];
      if (lastMsg && lastMsg.type === "options") {
        lastMsg.type = "text";
      }
      return [...newMsgs, userMsg];
    });

    setIsTyping(true);

    // AI Response logic based on step
    setTimeout(() => {
      setIsTyping(false);
      let nextAiMsg: Message;

      if (step === 0) {
        nextAiMsg = {
          id: `msg_ai_${Date.now()}`,
          sender: "ai",
          text: `Wonderful. For a ${option}, which color themes would you prefer for the packaging?`,
          type: "options",
          options: ["Gold & Crimson", "Pastel Pink & White", "Monochrome Black", "Emerald & Silver", "Earthy Tones"]
        };
        setStep(1);
      } else if (step === 1) {
        nextAiMsg = {
          id: `msg_ai_${Date.now()}`,
          sender: "ai",
          text: "A beautiful choice. What kind of basket or container would you like to use for presenting the products?",
          type: "options",
          options: ["Wicker Basket", "Velvet Box", "Wooden Crate", "Leather Trunk", "Minimalist Tray"]
        };
        setStep(2);
      } else if (step === 2) {
        // Generating results step
        setMessages(prev => [...prev, {
          id: `msg_ai_${Date.now()}_curating`,
          sender: "ai",
          text: "Curating your custom gift based on these preferences... Please wait a moment.",
          type: "text"
        }]);
        
        setIsTyping(true);
        
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            id: `msg_ai_${Date.now()}`,
            sender: "ai",
            text: "Here are 3 exquisite options we've designed for you. Which arrangement do you prefer?",
            type: "results"
          }]);
          setStep(3);
        }, 2500);
        return;
      }
      
      setMessages(prev => [...prev, nextAiMsg]);
    }, 1200);
  };

  const handleResultSelect = (resultId: string) => {
    const selected = MOCK_RESULTS.find(r => r.id === resultId);
    if (!selected) return;

    setMessages(prev => {
      const newMsgs = [...prev];
      const lastMsg = newMsgs[newMsgs.length - 1];
      if (lastMsg && lastMsg.type === "results") {
        lastMsg.type = "text"; // Hide results to prevent re-selection
      }
      return [...newMsgs, {
        id: `msg_user_${Date.now()}`,
        sender: "user",
        text: `I choose "${selected.title}"`,
        type: "text"
      }];
    });

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: `msg_ai_${Date.now()}`,
        sender: "ai",
        text: `Excellent choice! "${selected.title}" is a stunning arrangement. We will prepare this beautiful gift for you. You can now proceed to checkout.`,
        type: "success"
      }]);
    }, 1000);
  };

  const resetChat = () => {
    setStep(0);
    setMessages([]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages([
        {
          id: "msg_1",
          sender: "ai",
          text: "Hello again! Let's start over. What is the occasion for the gift?",
          type: "options",
          options: ["Birthday", "Anniversary", "Wedding", "Thank You", "Just Because"]
        }
      ]);
    }, 800);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-none md:rounded-3xl border-none md:border md:border-gray-100 shadow-none md:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col h-full md:h-[700px]">
      
      {/* Chat Header */}
      <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#500000] flex items-center justify-center shadow-md">
            <Sparkles className="w-6 h-6 text-amber-200" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 tracking-wide">TRISH Custom Studio</h3>
            <p className="text-xs text-gray-500 font-light flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              AI Concierge Online
            </p>
          </div>
        </div>
        <button 
          onClick={resetChat}
          className="p-2.5 text-gray-400 hover:text-gray-900 transition-colors rounded-full hover:bg-white border border-transparent hover:border-gray-200"
          title="Restart Conversation"
        >
          <RefreshCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-gradient-to-b from-transparent to-gray-50/30">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
            >
              {/* Message Bubble */}
              <div 
                className={`max-w-[85%] md:max-w-[75%] p-5 rounded-2xl ${
                  msg.sender === "user" 
                    ? "bg-[#500000] text-white rounded-br-sm shadow-md" 
                    : "bg-white border border-gray-100 text-gray-800 rounded-bl-sm shadow-sm"
                }`}
              >
                <p className={`text-[15px] leading-relaxed ${msg.sender === "user" ? "font-light" : "font-light"}`}>
                  {msg.text}
                </p>
              </div>

              {/* Options */}
              {msg.type === "options" && msg.options && (
                <motion.div 
                  initial={{ opacity: 0, marginTop: 0 }}
                  animate={{ opacity: 1, marginTop: 16 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2 mt-4 ml-2 max-w-2xl"
                >
                  {msg.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleOptionSelect(opt)}
                      className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:border-[#500000] hover:text-[#500000] transition-all hover:shadow-sm"
                    >
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Results Gallery */}
              {msg.type === "results" && (
                <motion.div 
                  initial={{ opacity: 0, marginTop: 0 }}
                  animate={{ opacity: 1, marginTop: 24 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 w-full max-w-3xl"
                >
                  {MOCK_RESULTS.map((result, i) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      key={result.id} 
                      className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                    >
                      <div className="relative h-48 w-full overflow-hidden bg-gray-50">
                        <Image src={result.image} alt={result.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '1.2rem' }}>
                            {result.title}
                          </h4>
                          <p className="text-xs text-gray-500 font-light mb-4 line-clamp-2">{result.description}</p>
                        </div>
                        <div className="flex flex-col gap-2 mt-auto">
                          <span className="text-sm font-bold text-gray-900">₹{result.price}</span>
                          <button 
                            onClick={() => handleResultSelect(result.id)}
                            className="w-full py-2 bg-gray-900 text-white text-[11px] font-bold tracking-widest uppercase rounded-full hover:bg-[#500000] transition-colors"
                          >
                            Select
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Success State */}
              {msg.type === "success" && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="mt-6 flex flex-col items-start gap-4"
                >
                  <button className="flex items-center gap-3 px-8 py-4 bg-[#500000] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
                    <Gift className="w-4 h-4" />
                    Proceed to Checkout
                  </button>
                </motion.div>
              )}

            </motion.div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-start"
            >
              <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-sm shadow-sm flex gap-1.5 items-center h-12">
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-6 py-4 bg-white border-t border-gray-100">
        <div className="relative flex items-center">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && inputText.trim() && !isTyping && messages[messages.length - 1]?.type !== 'results' && messages[messages.length - 1]?.type !== 'success') {
                handleOptionSelect(inputText.trim());
                setInputText('');
              }
            }}
            placeholder="Type your answer or select an option above..." 
            disabled={isTyping || messages[messages.length - 1]?.type === 'results' || messages[messages.length - 1]?.type === 'success'} 
            className="w-full pl-5 pr-12 py-3.5 bg-gray-50 border border-gray-100 rounded-full text-sm focus:outline-none disabled:opacity-60"
          />
          <button 
            onClick={() => {
              if (inputText.trim() && !isTyping && messages[messages.length - 1]?.type !== 'results' && messages[messages.length - 1]?.type !== 'success') {
                handleOptionSelect(inputText.trim());
                setInputText('');
              }
            }}
            disabled={isTyping || !inputText.trim() || messages[messages.length - 1]?.type === 'results' || messages[messages.length - 1]?.type === 'success'}
            className="absolute right-2 p-2 text-gray-400 hover:text-[#500000] disabled:opacity-50 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>
  );
}
