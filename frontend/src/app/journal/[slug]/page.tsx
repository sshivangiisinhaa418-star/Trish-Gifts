import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { journalArticles } from "@/lib/data/journal";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Gifting Journal | TRISH",
};

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = journalArticles.find(a => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  // Very basic parser for our dummy markdown content
  const renderContent = (content: string) => {
    return content.trim().split('\n\n').map((block, i) => {
      if (block.startsWith('## ')) {
        return (
          <h2 key={i} className="text-3xl font-light text-gray-900 mt-12 mb-6" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            {block.replace('## ', '')}
          </h2>
        );
      }
      if (block.startsWith('* ')) {
        const items = block.split('\n').filter(l => l.startsWith('* ')).map(l => l.replace('* ', ''));
        return (
          <ul key={i} className="list-disc pl-6 my-8 space-y-4 text-gray-600 font-light text-lg leading-relaxed">
            {items.map((item, j) => (
              <li key={j}>
                {/* Highlight bold text if it exists (e.g. **Text:**) */}
                <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={i} className="text-gray-600 font-light text-lg leading-relaxed mb-8">
          {block}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Article Header */}
        <div className="container mx-auto px-4 pt-32 pb-16 max-w-4xl text-center">
          <Link href="/journal" className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-gray-400 hover:text-gray-900 uppercase transition-colors mb-12">
            <ArrowLeft className="w-3 h-3" /> Back to Journal
          </Link>
          
          <div className="mb-6">
            <span className="text-[#500000] text-xs font-bold tracking-widest uppercase">
              {article.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl text-gray-900 mb-8 font-light leading-tight" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            {article.title}
          </h1>
          
          <div className="flex items-center justify-center gap-6 text-gray-500 text-sm font-light tracking-wide">
            <span>By {article.author}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>{article.date}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full max-w-6xl mx-auto px-4 mb-16 md:mb-24">
          <div className="relative w-full aspect-[21/9] min-h-[400px] overflow-hidden rounded-xl">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Article Body */}
        <div className="container mx-auto px-4 pb-32 max-w-3xl">
          <div className="prose prose-lg max-w-none">
            {renderContent(article.content)}
          </div>
          
          <div className="mt-16 pt-16 border-t border-gray-100 text-center">
            <p className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-8">Share this article</p>
            <div className="flex items-center justify-center gap-4">
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors">
                {/* SVG for Twitter */}
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors">
                {/* SVG for Facebook */}
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors">
                {/* SVG for Link/Copy */}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
