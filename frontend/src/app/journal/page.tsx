import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { journalArticles } from "@/lib/data/journal";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Gifting Journal | TRISH",
  description: "Read curated gift guides, style tips, and brand stories from TRISH.",
};

export default function JournalPage() {
  const featuredArticle = journalArticles[0];
  const gridArticles = journalArticles.slice(1);

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col">
      <Header />
      
      <main className="flex-1 pb-24">
        {/* Featured Post Hero */}
        <section className="relative w-full h-[70vh] min-h-[600px] flex items-end">
          <div className="absolute inset-0">
            <Image
              src={featuredArticle.coverImage}
              alt={featuredArticle.title}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 w-full">
            <div className="container mx-auto px-4 md:px-8 pb-16 md:pb-24 max-w-7xl">
              <div className="max-w-3xl">
                <span className="inline-block px-3 py-1 border border-white/30 text-white/90 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
                  {featuredArticle.category}
                </span>
                <Link href={`/journal/${featuredArticle.slug}`} className="group block">
                  <h1 className="text-4xl md:text-5xl lg:text-7xl text-white mb-6 font-light leading-tight group-hover:text-amber-100 transition-colors duration-300" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    {featuredArticle.title}
                  </h1>
                </Link>
                <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-2xl">
                  {featuredArticle.excerpt}
                </p>
                
                <div className="flex items-center gap-6 text-white/70 text-sm font-light tracking-wide">
                  <span>By {featuredArticle.author}</span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span>{featuredArticle.date}</span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span>{featuredArticle.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Grid */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="flex items-end justify-between mb-16 pb-8 border-b border-gray-100">
              <h2 className="text-3xl md:text-4xl text-gray-900 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                Latest Editorials
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
              {gridArticles.map((article) => (
                <article key={article.id} className="group cursor-pointer flex flex-col h-full">
                  <Link href={`/journal/${article.slug}`} className="block relative w-full aspect-[4/3] overflow-hidden mb-8">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">
                      <span className="text-[#500000]">{article.category}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                    
                    <Link href={`/journal/${article.slug}`} className="block mb-4">
                      <h3 className="text-2xl md:text-3xl text-gray-900 font-light group-hover:text-[#500000] transition-colors" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                        {article.title}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-500 font-light leading-relaxed mb-8 flex-1">
                      {article.excerpt}
                    </p>
                    
                    <Link href={`/journal/${article.slug}`} className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-900 group-hover:text-[#500000] transition-colors mt-auto">
                      Read Article <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
