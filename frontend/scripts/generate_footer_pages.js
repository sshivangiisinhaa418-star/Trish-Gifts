const fs = require('fs');
const path = require('path');

const pages = [
  { slug: 'terms', title: 'Terms of Use' },
  { slug: 'privacy', title: 'Privacy Policy' },
  { slug: 'supply-chain', title: 'California Supply Chain Act' },
  { slug: 'supplier-code', title: 'Supplier Code of Conduct' },
  { slug: 'patents', title: 'Patents' },
  { slug: 'size-charts', title: 'Apparel Size Charts' },
  { slug: 'faq', title: 'Frequently Asked Questions' },
  { slug: 'how-to-order', title: 'How to Order' },
  { slug: 'manage-info', title: 'Manage Personal Information' },
  { slug: 'sitemap', title: 'Site Map' },
  { slug: 'order-tracking', title: 'Order Tracking' },
  { slug: 'shipping-returns', title: 'Shipping, Returns & Fees' },
  { slug: 'app', title: 'Get TRISH App' },
];

const template = (title) => `"use client";

import GlobalNav from "@/components/layout/GlobalNav";

export default function DummyPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col">
      <header className="w-full bg-white border-b border-gray-100 hidden lg:block relative z-40">
        <GlobalNav />
      </header>

      <div className="container mx-auto px-4 py-20 flex-1 max-w-4xl animate-fade-up">
        <span className="text-xs font-bold text-[#500000] uppercase tracking-widest mb-4 block">Information</span>
        <h1 className="text-4xl md:text-5xl text-gray-900 mb-8" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
          ${title}
        </h1>
        
        <div className="bg-white border border-stone-200 rounded-3xl p-8 md:p-12 shadow-sm text-gray-600 font-light leading-relaxed space-y-6">
          <p>
            Welcome to the ${title} page. This is a beautifully structured placeholder.
          </p>
          <p>
            We are deeply committed to ensuring transparency, quality, and a luxury experience for all of our clients. 
            The full details regarding this topic will be populated here shortly. 
          </p>
          <div className="h-px w-16 bg-stone-200 my-8"></div>
          <p className="text-sm italic text-gray-400">
            Check back later for the complete legal and informational documentation.
          </p>
        </div>
      </div>
    </div>
  );
}
`;

const appDir = path.join(__dirname, '..', 'src', 'app');

pages.forEach(page => {
  const pageDir = path.join(appDir, page.slug);
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
  }
  
  const pagePath = path.join(pageDir, 'page.tsx');
  fs.writeFileSync(pagePath, template(page.title));
  console.log(`Created page: ${page.slug}`);
});

console.log('All dummy pages generated successfully.');
