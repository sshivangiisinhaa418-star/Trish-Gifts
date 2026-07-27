"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Gift, Sparkles, RefreshCcw } from "lucide-react";
import { allProducts, Product } from "@/lib/data/products";
import ProductCard from "@/components/ui/ProductCard";
import Link from "next/link";

type QuizState = {
  recipient: string;
  occasion: string;
  budget: string;
};

const RECIPIENTS = [
  { id: "partner", label: "Partner / Spouse" },
  { id: "parent", label: "Parent" },
  { id: "friend", label: "Friend" },
  { id: "colleague", label: "Colleague" },
  { id: "sibling", label: "Sibling" },
  { id: "self", label: "Myself" },
];

const OCCASIONS = [
  { id: "birthday", label: "Birthday" },
  { id: "anniversary", label: "Anniversary" },
  { id: "wedding", label: "Wedding" },
  { id: "housewarming", label: "Housewarming" },
  { id: "thank you", label: "Thank You" },
  { id: "just because", label: "Just Because" },
];

const BUDGETS = [
  { id: "under_1000", label: "Under ₹1000" },
  { id: "1000_2500", label: "₹1000 - ₹2500" },
  { id: "2500_5000", label: "₹2500 - ₹5000" },
  { id: "over_5000", label: "Over ₹5000" },
];

export default function GiftWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizState>({
    recipient: "",
    occasion: "",
    budget: "",
  });
  const [isCurating, setIsCurating] = useState(false);
  const [results, setResults] = useState<Product[]>([]);

  const handleSelect = (key: keyof QuizState, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (step < 2) {
      setStep((prev) => prev + 1);
    } else {
      curateGifts();
    }
  };

  const prevStep = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  const resetQuiz = () => {
    setAnswers({ recipient: "", occasion: "", budget: "" });
    setStep(0);
    setResults([]);
  };

  const curateGifts = () => {
    setStep(3); // Move to results step
    setIsCurating(true);

    // Simulate AI loading time
    setTimeout(() => {
      let matched = [...allProducts];

      // Filter by Budget
      if (answers.budget) {
        matched = matched.filter((p) => {
          if (answers.budget === "under_1000") return p.price < 1000;
          if (answers.budget === "1000_2500") return p.price >= 1000 && p.price <= 2500;
          if (answers.budget === "2500_5000") return p.price > 2500 && p.price <= 5000;
          if (answers.budget === "over_5000") return p.price > 5000;
          return true;
        });
      }

      // Filter by Tags (Recipient/Occasion)
      const scoredProducts = matched.map((p) => {
        let score = 0;
        const tags = p.tags.map((t) => t.toLowerCase());
        
        if (answers.occasion && tags.includes(answers.occasion.toLowerCase())) score += 2;
        
        // Map recipient to common tags
        let recipientTag = answers.recipient;
        if (recipientTag === "partner") recipientTag = "wife"; // simple mapping for mock data
        if (recipientTag === "parent") recipientTag = "mother";
        
        if (recipientTag && tags.includes(recipientTag.toLowerCase())) score += 2;

        return { product: p, score };
      });

      // Sort by score
      scoredProducts.sort((a, b) => b.score - a.score);
      
      let finalResults = scoredProducts.filter(p => p.score > 0).map(p => p.product);
      if (finalResults.length === 0) {
          finalResults = matched.slice(0, 4);
      }

      setResults(finalResults.slice(0, 4)); // Top 4 results for elegant display
      setIsCurating(false);
    }, 2000);
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <motion.div
            key="step0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <h2 className="text-3xl md:text-5xl text-gray-900 mb-12 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              Who is the recipient?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {RECIPIENTS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect("recipient", item.id)}
                  className={`text-left pb-4 border-b transition-all duration-300 group ${
                    answers.recipient === item.id
                      ? "border-[#500000] text-[#500000]"
                      : "border-gray-200 hover:border-gray-400 text-gray-400 hover:text-gray-900"
                  }`}
                >
                  <span className={`text-2xl font-light tracking-wide transition-all duration-500 inline-block ${answers.recipient === item.id ? 'translate-x-2' : 'group-hover:translate-x-2'}`} style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <h2 className="text-3xl md:text-5xl text-gray-900 mb-12 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              What is the occasion?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {OCCASIONS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect("occasion", item.id)}
                  className={`text-left pb-4 border-b transition-all duration-300 group ${
                    answers.occasion === item.id
                      ? "border-[#500000] text-[#500000]"
                      : "border-gray-200 hover:border-gray-400 text-gray-400 hover:text-gray-900"
                  }`}
                >
                  <span className={`text-2xl font-light tracking-wide transition-all duration-500 inline-block ${answers.occasion === item.id ? 'translate-x-2' : 'group-hover:translate-x-2'}`} style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <h2 className="text-3xl md:text-5xl text-gray-900 mb-12 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              What is your budget?
            </h2>
            <div className="flex flex-col gap-6 max-w-md">
              {BUDGETS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect("budget", item.id)}
                  className={`text-left pb-4 border-b transition-all duration-300 group ${
                    answers.budget === item.id
                      ? "border-[#500000] text-[#500000]"
                      : "border-gray-200 hover:border-gray-400 text-gray-400 hover:text-gray-900"
                  }`}
                >
                  <span className={`text-2xl font-light tracking-wide transition-all duration-500 inline-block ${answers.budget === item.id ? 'translate-x-2' : 'group-hover:translate-x-2'}`} style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full"
          >
            {isCurating ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="relative w-24 h-24 mb-10">
                  <div className="absolute inset-0 border-[1px] border-gray-200 rounded-full"></div>
                  <div className="absolute inset-0 border-[1px] border-[#500000] rounded-full border-t-transparent animate-spin" style={{ animationDuration: '2s' }}></div>
                  <Gift className="absolute inset-0 m-auto text-[#500000] w-6 h-6 animate-pulse" strokeWidth={1} />
                </div>
                <h3 className="text-3xl font-light text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Curating the perfect gifts...</h3>
                <p className="text-gray-400 font-light tracking-wide">Analyzing our premium collection for a flawless match.</p>
              </div>
            ) : (
              <div className="w-full">
                <div className="mb-12">
                  <span className="uppercase tracking-[0.2em] text-[10px] font-bold mb-4 block text-[#500000]">TRISH Selections</span>
                  <h2 className="text-4xl text-gray-900 mb-4 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    Your Curated Results
                  </h2>
                  <p className="text-gray-500 font-light">
                    Based on your preferences, we've hand-picked these extraordinary gifts.
                  </p>
                </div>

                {results.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
                    {results.map((product) => (
                      <ProductCard key={product.id} {...product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-left py-12 border-t border-gray-100 mb-12">
                    <p className="text-gray-400 font-light mb-8">We couldn't find an exact match, but we have many other wonderful options in our catalog.</p>
                    <Link href="/discover" className="inline-block px-8 py-4 border border-gray-200 text-gray-900 uppercase tracking-widest text-xs font-bold hover:bg-gray-900 hover:text-white transition-colors duration-300">
                      Explore Full Collection
                    </Link>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={resetQuiz}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm tracking-widest uppercase font-bold text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <RefreshCcw className="w-3.5 h-3.5" /> Start Over
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        );
      default:
        return null;
    }
  };

  const isCurrentStepValid = () => {
    if (step === 0) return !!answers.recipient;
    if (step === 1) return !!answers.occasion;
    if (step === 2) return !!answers.budget;
    return true;
  };

  return (
    <div className="w-full">
      {/* Progress Bar & Header */}
      {step < 3 && (
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex-1 h-[2px] bg-gray-200 overflow-hidden">
                <motion.div
                  className="h-full bg-[#500000]"
                  initial={{ width: step > i ? '100%' : '0%' }}
                  animate={{ width: step > i ? '100%' : step === i ? '100%' : '0%' }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center text-xs tracking-widest uppercase font-bold text-gray-400">
            <span>Step 0{step + 1}</span>
            <span className="text-[#500000]">
              {step === 0 && "The Recipient"}
              {step === 1 && "The Occasion"}
              {step === 2 && "The Budget"}
            </span>
          </div>
        </div>
      )}

      {/* Quiz Content */}
      <div className="min-h-[350px]">
        <AnimatePresence mode="wait">
          {renderStepContent()}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      {step < 3 && (
        <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={step === 0}
            className={`flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-all ${
              step === 0
                ? "text-gray-300 cursor-not-allowed opacity-0 pointer-events-none"
                : "text-gray-400 hover:text-gray-900"
            }`}
          >
            <ArrowLeft className="w-3 h-3" /> Back
          </button>
          
          <button
            onClick={nextStep}
            disabled={!isCurrentStepValid()}
            className={`flex items-center gap-3 px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-500 ${
              isCurrentStepValid()
                ? "bg-[#500000] text-white hover:bg-gray-900"
                : "bg-gray-100 text-gray-300 cursor-not-allowed"
            }`}
          >
            {step === 2 ? "Discover Gifts" : "Next Step"} 
            {isCurrentStepValid() && <ArrowRight className="w-3 h-3" />}
          </button>
        </div>
      )}
    </div>
  );
}
