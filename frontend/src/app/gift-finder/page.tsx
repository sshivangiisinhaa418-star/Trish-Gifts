import Header from "@/components/layout/Header";
import GiftWizard from "@/components/gift-finder/GiftWizard";
import Image from "next/image";
import { getAllProducts } from "@/app/actions/store";

export const metadata = {
  title: "AI Gift Finder | TRISH",
  description: "Find the perfect gift in seconds with our AI Gift Concierge.",
};

export default async function GiftFinderPage() {
  const products = await getAllProducts();

  return (
    <div className="min-h-[100dvh] md:h-[100dvh] bg-[#faf9f6] flex flex-col overflow-x-hidden md:overflow-hidden">
      <Header />

      <main className="flex-1 min-h-0 flex flex-col md:flex-row">

        {/* Left Side: Editorial Panel (desktop only) */}
        <div className="hidden md:flex w-full md:w-5/12 p-10 lg:p-16 items-center justify-center h-full">
          <div className="relative w-full h-full max-h-[680px] min-h-[480px] rounded-[2.5rem] overflow-hidden shadow-2xl group flex flex-col justify-end p-10">

            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&q=80"
                alt="Luxury Gifting"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/5" />
            </div>

            {/* Elegant inner borders */}
            <div className="absolute inset-4 border border-white/20 rounded-[2rem] pointer-events-none z-10" />

            <div className="relative z-20 text-white">
              <span className="uppercase tracking-[0.3em] text-[10px] font-bold mb-5 block text-[#E2C792]">
                TRISH Concierge
              </span>
              <h1
                className="text-5xl lg:text-6xl mb-5 font-light leading-tight drop-shadow-lg"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                The Perfect Gift,
                <br />
                <span className="italic text-white/85">Found in Seconds.</span>
              </h1>
              <p className="text-white/75 max-w-xs text-base font-light leading-relaxed">
                Just 3 quick questions. Our AI picks the one gift that will genuinely delight them.
              </p>

              {/* Stats row */}
              <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/15">
                <div>
                  <p className="text-white text-xl font-bold">3</p>
                  <p className="text-white/50 text-xs font-light">Questions</p>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div>
                  <p className="text-white text-xl font-bold">1</p>
                  <p className="text-white/50 text-xs font-light">Perfect Gift</p>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div>
                  <p className="text-white text-xl font-bold">30s</p>
                  <p className="text-white/50 text-xs font-light">That's all</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Chat Wizard */}
        <div className="w-full md:w-7/12 flex items-center justify-center md:p-8 lg:px-16 h-full">
          <div className="w-full h-full md:max-h-[700px] max-w-2xl flex flex-col">
            <GiftWizard initialProducts={products} />
          </div>
        </div>

      </main>
    </div>
  );
}
