import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { journalArticles } from "@/lib/data/journal";

export default function JournalArticlePage({ params }: { params: { slug: string } }) {
  const article = journalArticles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-1 pb-24">
        <article>
          {/* Hero Section */}
          <section className="relative w-full h-[60vh] min-h-[500px] flex items-end">
            <div className="absolute inset-0">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>

            <div className="relative z-10 w-full container mx-auto px-4 md:px-8 pb-12 max-w-4xl text-center">
              <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md rounded-full">
                {article.category}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 font-light leading-tight drop-shadow-lg" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                {article.title}
              </h1>
              <div className="flex items-center justify-center gap-4 text-white/80 text-sm font-light">
                <span>By {article.author}</span>
                <span className="w-1 h-1 rounded-full bg-white/50" />
                <span>{article.date}</span>
                <span className="w-1 h-1 rounded-full bg-white/50" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </section>

          {/* Content Section */}
          <section className="container mx-auto px-4 py-16 max-w-3xl">
            <Link href="/journal" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-12 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Journal
            </Link>

            <div 
              className="prose prose-lg max-w-none text-gray-600 prose-headings:font-light prose-headings:text-gray-900 prose-a:text-brand-600 prose-img:rounded-2xl"
              style={{ '--tw-prose-headings': 'var(--font-cormorant), serif' } as any}
            >
              {article.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('## ')) {
                  return <h2 key={idx} className="text-3xl mt-12 mb-6 text-gray-900 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>{paragraph.replace('## ', '')}</h2>;
                }
                if (paragraph.startsWith('* ')) {
                  return (
                    <ul key={idx} className="list-disc pl-6 mb-6 space-y-2">
                      {paragraph.split('\n').map((item, i) => (
                        <li key={i}>{item.replace('* ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={idx} className="mb-6 font-light leading-relaxed">{paragraph}</p>;
              })}
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
