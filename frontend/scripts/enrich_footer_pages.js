const fs = require('fs');
const path = require('path');

const pageContents = {
  'terms': {
    title: 'Terms of Use',
    category: 'Legal',
    heroImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1600&q=80',
    content: `
      <div className="max-w-4xl mx-auto space-y-16">
        <section>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl text-[#500000]/20 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>01</span>
            <h2 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Introduction</h2>
          </div>
          <p className="text-lg text-gray-600 font-light leading-relaxed">Welcome to TRISH. By accessing or using our website, services, and luxury bespoke offerings, you agree to be bound by these Terms of Use. Please read them carefully.</p>
        </section>
        
        <section>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl text-[#500000]/20 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>02</span>
            <h2 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Intellectual Property Rights</h2>
          </div>
          <p className="text-lg text-gray-600 font-light leading-relaxed">All content published and made available on our site is the property of TRISH and the site's creators. This includes, but is not limited to images, text, logos, documents, downloadable files and anything that contributes to the composition of our site.</p>
        </section>
        
        <section>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl text-[#500000]/20 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>03</span>
            <h2 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Acceptable Use</h2>
          </div>
          <p className="text-lg text-gray-600 font-light leading-relaxed">As a user of our site, you agree to use our site legally, not to use our site for illegal purposes, and not to violate the intellectual property rights of the site owners or any third party to the site.</p>
        </section>
        
        <section>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl text-[#500000]/20 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>04</span>
            <h2 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Limitation of Liability</h2>
          </div>
          <p className="text-lg text-gray-600 font-light leading-relaxed">TRISH and our directors, officers, agents, employees, subsidiaries, and affiliates will not be liable for any actions, claims, losses, damages, liabilities and expenses including legal fees from your use of the site.</p>
        </section>
      </div>
    `
  },
  'privacy': {
    title: 'Privacy Policy',
    category: 'Legal',
    heroImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&q=80',
    content: `
      <div className="max-w-4xl mx-auto space-y-16">
        <p className="text-xl text-gray-600 font-light leading-relaxed border-l-4 border-[#500000] pl-6 italic">At TRISH, we prioritize the protection of your personal and financial data with the highest industry standards. This Privacy Policy details how we handle your information.</p>
        
        <section>
          <h2 className="text-3xl text-gray-900 mb-8" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Information We Collect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-white border border-stone-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Personal Information</h3>
              <p className="text-gray-600 font-light">Name, email address, billing and shipping addresses, and phone numbers provided during account creation or checkout.</p>
            </div>
            <div className="p-8 bg-white border border-stone-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Payment Details</h3>
              <p className="text-gray-600 font-light">Encrypted credit card information processed securely via Stripe. We do not store raw card numbers.</p>
            </div>
            <div className="p-8 bg-white border border-stone-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Usage Data</h3>
              <p className="text-gray-600 font-light">Browsing history, IP addresses, and interaction with our GiftWizard to provide personalized recommendations.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl text-gray-900 mb-6" style={{ fontFamily: 'var(--font-cormorant), serif' }}>How We Use Your Information</h2>
          <p className="text-lg text-gray-600 font-light leading-relaxed">Your data is strictly used to process orders, enhance your bespoke shopping experience, and communicate important updates regarding your luxury shipments.</p>
        </section>
      </div>
    `
  },
  'supply-chain': {
    title: 'California Supply Chain Act',
    category: 'Corporate Responsibility',
    heroImage: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=1600&q=80',
    content: `
      <div className="max-w-5xl mx-auto space-y-20">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xl text-gray-600 font-light leading-relaxed">TRISH is deeply committed to ethical sourcing, sustainable manufacturing, and strict compliance with the California Transparency in Supply Chains Act of 2010 (SB 657).</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Verification of Supply Chains</h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed">We conduct rigorous preliminary assessments of our suppliers to verify their compliance with international labor laws and to ensure the total eradication of human trafficking and slavery from our product lifecycles.</p>
          </div>
          <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl">
            <Image src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80" alt="Supply Chain" fill className="object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center flex-col-reverse md:flex-row-reverse">
          <div className="space-y-6">
            <h2 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Audits & Certification</h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed">Our global partners are subjected to unannounced, independent third-party audits. Furthermore, all direct suppliers must certify that materials incorporated into our bespoke products comply with the laws regarding slavery and human trafficking.</p>
          </div>
          <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl">
            <Image src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" alt="Audits" fill className="object-cover" />
          </div>
        </div>
      </div>
    `
  },
  'supplier-code': {
    title: 'Supplier Code of Conduct',
    category: 'Corporate Responsibility',
    heroImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80',
    content: `
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xl text-gray-600 font-light leading-relaxed">We expect all our partners to share our commitment to ethical practices. The TRISH Supplier Code of Conduct strictly mandates the following core tenets:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group p-10 bg-white border border-stone-200 rounded-3xl shadow-sm hover:shadow-xl hover:border-[#500000]/30 transition-all duration-500">
            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#500000]/10 transition-colors">
              <svg className="w-6 h-6 text-gray-600 group-hover:text-[#500000]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <h3 className="text-2xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Fair Labor Practices</h3>
            <p className="text-gray-500 font-light leading-relaxed">Suppliers must provide safe working environments, fair compensation, and adhere to all local labor laws regarding working hours and conditions.</p>
          </div>
          
          <div className="group p-10 bg-white border border-stone-200 rounded-3xl shadow-sm hover:shadow-xl hover:border-[#500000]/30 transition-all duration-500">
            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#500000]/10 transition-colors">
              <svg className="w-6 h-6 text-gray-600 group-hover:text-[#500000]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-2xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Environmental Stewardship</h3>
            <p className="text-gray-500 font-light leading-relaxed">We require the minimization of ecological footprints, responsible waste management, and the prioritization of sustainable materials.</p>
          </div>
          
          <div className="group p-10 bg-white border border-stone-200 rounded-3xl shadow-sm hover:shadow-xl hover:border-[#500000]/30 transition-all duration-500">
            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#500000]/10 transition-colors">
              <svg className="w-6 h-6 text-gray-600 group-hover:text-[#500000]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 className="text-2xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Anti-Corruption</h3>
            <p className="text-gray-500 font-light leading-relaxed">Zero tolerance for bribery, extortion, or embezzlement in any form. Business must be conducted with the utmost transparency.</p>
          </div>
          
          <div className="group p-10 bg-white border border-stone-200 rounded-3xl shadow-sm hover:shadow-xl hover:border-[#500000]/30 transition-all duration-500">
            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#500000]/10 transition-colors">
              <svg className="w-6 h-6 text-gray-600 group-hover:text-[#500000]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h3 className="text-2xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Non-Discrimination</h3>
            <p className="text-gray-500 font-light leading-relaxed">Employment must be based on ability, not on race, color, gender, religion, or sexual orientation.</p>
          </div>
        </div>
      </div>
    `
  },
  'patents': {
    title: 'Patents & Trademarks',
    category: 'Legal',
    heroImage: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1600&q=80',
    content: `
      <div className="max-w-4xl mx-auto space-y-12">
        <p className="text-lg text-gray-600 font-light leading-relaxed text-center">TRISH products, technologies, and bespoke gifting mechanisms are protected by patents in the U.S. and elsewhere. This page is provided to satisfy the virtual patent marking provisions of various jurisdictions.</p>
        
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#fcfbf9] text-gray-900 uppercase tracking-widest text-xs border-b border-stone-200">
              <tr>
                <th className="px-8 py-6 font-bold">Product / Technology</th>
                <th className="px-8 py-6 font-bold">Patent Numbers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-gray-600">
              <tr className="hover:bg-stone-50 transition-colors">
                <td className="px-8 py-6 font-medium text-gray-900 text-lg">GiftWizard AI Engine</td>
                <td className="px-8 py-6">US Pat. 10,489,123, EP 3,456,789</td>
              </tr>
              <tr className="hover:bg-stone-50 transition-colors">
                <td className="px-8 py-6 font-medium text-gray-900 text-lg">Bespoke Jewelry Clasp Mech.</td>
                <td className="px-8 py-6">US Pat. 9,876,543</td>
              </tr>
              <tr className="hover:bg-stone-50 transition-colors">
                <td className="px-8 py-6 font-medium text-gray-900 text-lg">Luxury Fragrance Atomizer</td>
                <td className="px-8 py-6">US Pat. D876,543, CN 202130123456.7</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `
  },
  'size-charts': {
    title: 'Apparel Size Charts',
    category: 'Help & Support',
    heroImage: 'https://images.unsplash.com/photo-1558769132-cb1fac08c04b?w=1600&q=80',
    content: `
      <div className="max-w-4xl mx-auto space-y-12 text-center">
        <p className="text-lg text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">Ensure the perfect fit for your luxury apparel gifts. Measurements below reflect standard TRISH bespoke sizing (in inches).</p>
        
        <h3 className="text-3xl text-gray-900 mb-8" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Women's Apparel</h3>
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xl text-left">
          <table className="w-full text-center text-sm">
            <thead className="bg-[#fcfbf9] text-gray-900 uppercase tracking-widest text-xs border-b border-stone-200">
              <tr>
                <th className="px-6 py-6 font-bold">Size</th>
                <th className="px-6 py-6 font-bold">Bust</th>
                <th className="px-6 py-6 font-bold">Waist</th>
                <th className="px-6 py-6 font-bold">Hip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-gray-600">
              <tr className="hover:bg-stone-50 transition-colors"><td className="px-6 py-6 font-bold text-gray-900">XS (0-2)</td><td className="px-6 py-6">32 - 33</td><td className="px-6 py-6">24 - 25</td><td className="px-6 py-6">34.5 - 35.5</td></tr>
              <tr className="hover:bg-stone-50 transition-colors"><td className="px-6 py-6 font-bold text-gray-900">S (4-6)</td><td className="px-6 py-6">34 - 35</td><td className="px-6 py-6">26 - 27</td><td className="px-6 py-6">36.5 - 37.5</td></tr>
              <tr className="hover:bg-stone-50 transition-colors"><td className="px-6 py-6 font-bold text-gray-900">M (8-10)</td><td className="px-6 py-6">36 - 37</td><td className="px-6 py-6">28 - 29</td><td className="px-6 py-6">38.5 - 39.5</td></tr>
              <tr className="hover:bg-stone-50 transition-colors"><td className="px-6 py-6 font-bold text-gray-900">L (12-14)</td><td className="px-6 py-6">38.5 - 40</td><td className="px-6 py-6">30.5 - 32</td><td className="px-6 py-6">41 - 42.5</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `
  },
  'faq': {
    title: 'Frequently Asked Questions',
    category: 'Help & Support',
    heroImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80',
    content: `
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-stone-200 shadow-sm hover:shadow-lg transition-shadow">
          <h3 className="text-2xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>How long does bespoke customization take?</h3>
          <p className="text-lg text-gray-600 font-light leading-relaxed">Standard personalization (engraving, monogramming) adds 2-3 business days to your order processing time. For fully custom bespoke creations, a concierge will contact you with a specific timeline.</p>
        </div>
        
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-stone-200 shadow-sm hover:shadow-lg transition-shadow">
          <h3 className="text-2xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Do you ship internationally?</h3>
          <p className="text-lg text-gray-600 font-light leading-relaxed">Yes, TRISH offers luxury white-glove international shipping to over 150 countries. All customs and import duties are calculated and paid at checkout to ensure seamless delivery.</p>
        </div>
        
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-stone-200 shadow-sm hover:shadow-lg transition-shadow">
          <h3 className="text-2xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>What is your return policy for gifted items?</h3>
          <p className="text-lg text-gray-600 font-light leading-relaxed">Gift recipients may return items for store credit within 30 days of delivery. The original purchaser will not be notified of the return to preserve the gifting experience.</p>
        </div>
      </div>
    `
  },
  'how-to-order': {
    title: 'How to Order',
    category: 'Help & Support',
    heroImage: 'https://images.unsplash.com/photo-1466041185449-34da7175be92?w=1600&q=80',
    content: `
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xl text-gray-600 font-light leading-relaxed">The TRISH ordering experience is designed to be as effortless and luxurious as the gifts themselves.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            <Image src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800&q=80" alt="Discover" fill className="object-cover" />
          </div>
          <div className="order-1 md:order-2 space-y-4">
            <span className="text-6xl text-[#500000]/20 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>01</span>
            <h3 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Discover & Personalize</h3>
            <p className="text-lg text-gray-600 font-light leading-relaxed">Browse our catalog or use the AI GiftWizard. Select your item and add complimentary monogramming or custom gift wrapping.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-6xl text-[#500000]/20 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>02</span>
            <h3 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Secure Checkout</h3>
            <p className="text-lg text-gray-600 font-light leading-relaxed">Enter the recipient's shipping address. You can choose to delay delivery for a specific future date (like a birthday) using our concierge system.</p>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            <Image src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80" alt="Checkout" fill className="object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            <Image src="https://images.unsplash.com/photo-1512418490979-92798cec1380?w=800&q=80" alt="Reveal" fill className="object-cover" />
          </div>
          <div className="order-1 md:order-2 space-y-4">
            <span className="text-6xl text-[#500000]/20 font-light" style={{ fontFamily: 'var(--font-cormorant), serif' }}>03</span>
            <h3 className="text-3xl text-gray-900" style={{ fontFamily: 'var(--font-cormorant), serif' }}>The Digital Reveal</h3>
            <p className="text-lg text-gray-600 font-light leading-relaxed">Instantly send an animated "Digital Reveal" to the recipient's email while the physical luxury gift is en route.</p>
          </div>
        </div>
      </div>
    `
  },
  'manage-info': {
    title: 'Manage Personal Information',
    category: 'Information & Privacy',
    heroImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66cb85?w=1600&q=80',
    content: `
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xl text-gray-600 font-light leading-relaxed mb-12">You have complete control over your data. Use the form below to request a copy of your personal data or to request account deletion in accordance with global regulations.</p>
        
        <div className="bg-white p-10 md:p-16 rounded-[2.5rem] border border-stone-200 shadow-2xl text-left">
          <form className="space-y-8">
            <div>
              <label className="text-xs font-bold text-gray-900 uppercase tracking-widest block mb-4">Request Type</label>
              <select className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-gray-700 font-light focus:outline-none focus:border-[#500000] focus:ring-1 focus:ring-[#500000] transition-colors">
                <option>Download My Data (Takeout)</option>
                <option>Delete My Account & Data</option>
                <option>Opt-out of Targeted Advertising</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-900 uppercase tracking-widest block mb-4">Email Address</label>
              <input type="email" required placeholder="Enter the email associated with your account" className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-gray-700 font-light focus:outline-none focus:border-[#500000] focus:ring-1 focus:ring-[#500000] transition-colors" />
            </div>
            <button type="button" className="w-full py-5 bg-gray-900 text-white rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl mt-4">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    `
  },
  'sitemap': {
    title: 'Site Map',
    category: 'Information',
    heroImage: 'https://images.unsplash.com/photo-1508614999368-9260051292e5?w=1600&q=80',
    content: `
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="bg-white p-10 rounded-3xl border border-stone-100 shadow-sm">
            <h3 className="text-2xl text-gray-900 mb-6 border-b border-stone-200 pb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Shopping</h3>
            <ul className="space-y-4 text-lg text-gray-600 font-light">
              <li><a href="/discover" className="hover:text-[#500000] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#500000]/50 block"></span>All Products</a></li>
              <li><a href="/discover?intent=birthday" className="hover:text-[#500000] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#500000]/50 block"></span>Birthday Gifts</a></li>
              <li><a href="/discover?intent=anniversary" className="hover:text-[#500000] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#500000]/50 block"></span>Anniversary Gifts</a></li>
              <li><a href="/corporate" className="hover:text-[#500000] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#500000]/50 block"></span>Corporate Bulk Gifting</a></li>
            </ul>
          </div>
          
          <div className="bg-white p-10 rounded-3xl border border-stone-100 shadow-sm">
            <h3 className="text-2xl text-gray-900 mb-6 border-b border-stone-200 pb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Experience</h3>
            <ul className="space-y-4 text-lg text-gray-600 font-light">
              <li><a href="/gift-finder" className="hover:text-[#500000] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#500000]/50 block"></span>AI Gift Wizard</a></li>
              <li><a href="/journal" className="hover:text-[#500000] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#500000]/50 block"></span>The Gifting Journal</a></li>
              <li><a href="/concierge" className="hover:text-[#500000] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#500000]/50 block"></span>Private Concierge</a></li>
              <li><a href="/app" className="hover:text-[#500000] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#500000]/50 block"></span>Mobile Application</a></li>
            </ul>
          </div>
          
          <div className="bg-white p-10 rounded-3xl border border-stone-100 shadow-sm">
            <h3 className="text-2xl text-gray-900 mb-6 border-b border-stone-200 pb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Account</h3>
            <ul className="space-y-4 text-lg text-gray-600 font-light">
              <li><a href="/account" className="hover:text-[#500000] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#500000]/50 block"></span>My Dashboard</a></li>
              <li><a href="/wishlist" className="hover:text-[#500000] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#500000]/50 block"></span>My Wishlist</a></li>
              <li><a href="/order-tracking" className="hover:text-[#500000] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#500000]/50 block"></span>Track an Order</a></li>
            </ul>
          </div>
        </div>
      </div>
    `
  },
  'order-tracking': {
    title: 'Order Tracking',
    category: 'Help & Support',
    heroImage: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=1600&q=80',
    content: `
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xl text-gray-600 font-light leading-relaxed mb-12">Enter your order details below to receive real-time updates on your luxury shipment.</p>
        
        <div className="bg-white p-10 md:p-16 rounded-[2.5rem] border border-stone-200 shadow-2xl text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#500000]/5 rounded-bl-full"></div>
          <form className="space-y-8 relative z-10">
            <div>
              <label className="text-xs font-bold text-gray-900 uppercase tracking-widest block mb-4">Order Number</label>
              <input type="text" required placeholder="e.g. QUM-892410" className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-gray-700 font-light focus:outline-none focus:border-[#500000] focus:ring-1 focus:ring-[#500000] transition-colors" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-900 uppercase tracking-widest block mb-4">Billing Email or Phone</label>
              <input type="text" required placeholder="Email or Phone Number" className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-gray-700 font-light focus:outline-none focus:border-[#500000] focus:ring-1 focus:ring-[#500000] transition-colors" />
            </div>
            <button type="button" className="w-full py-5 bg-[#500000] text-white rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-[#3d0000] transition-all shadow-lg hover:shadow-xl mt-4">
              Track Package
            </button>
          </form>
        </div>
      </div>
    `
  },
  'shipping-returns': {
    title: 'Shipping & Returns',
    category: 'Help & Support',
    heroImage: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=1600&q=80',
    content: `
      <div className="max-w-4xl mx-auto space-y-16">
        <section className="bg-white p-10 md:p-12 rounded-3xl border border-stone-200 shadow-sm flex flex-col md:flex-row gap-8 items-center">
          <div className="w-20 h-20 shrink-0 bg-[#500000]/5 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-[#500000]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
          </div>
          <div>
            <h2 className="text-3xl text-gray-900 mb-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Complimentary White-Glove Shipping</h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed">All TRISH orders over ₹10,000 qualify for our complimentary white-glove delivery service. Your gift will arrive in pristine condition, hand-delivered by a premium courier.</p>
          </div>
        </section>
        
        <section>
          <h2 className="text-3xl text-gray-900 mb-8" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Delivery Timelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 border border-stone-200 rounded-2xl bg-stone-50">
              <h3 className="font-bold text-gray-900 mb-2">Standard</h3>
              <p className="text-gray-600 font-light">3-5 Business Days</p>
            </div>
            <div className="p-8 border border-stone-200 rounded-2xl bg-stone-50">
              <h3 className="font-bold text-gray-900 mb-2">Express</h3>
              <p className="text-gray-600 font-light">1-2 Business Days</p>
            </div>
            <div className="p-8 border border-stone-200 rounded-2xl bg-stone-50">
              <h3 className="font-bold text-gray-900 mb-2">Same-Day Courier</h3>
              <p className="text-gray-600 font-light">Select Metro Areas</p>
            </div>
          </div>
        </section>

        <section className="border-t border-stone-200 pt-16">
          <h2 className="text-3xl text-gray-900 mb-6" style={{ fontFamily: 'var(--font-cormorant), serif' }}>The 30-Day Return Promise</h2>
          <p className="text-lg text-gray-600 font-light leading-relaxed mb-6">If the recipient is not entirely thrilled with their gift, they may return it within 30 days of delivery. Returns are free, and we process refunds or exchanges within 48 hours of receiving the returned item.</p>
          <p className="text-sm text-gray-500 font-light italic">*Note: Bespoke engraved items are non-refundable.</p>
        </section>
      </div>
    `
  },
  'app': {
    title: 'Get the TRISH App',
    category: 'Experience',
    heroImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&q=80',
    content: `
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 order-2 md:order-1 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'var(--font-cormorant), serif' }}>The Art of Gifting, <br/>In Your Pocket.</h2>
          <p className="mb-10 text-xl text-gray-600 font-light leading-relaxed">
            Download the TRISH iOS or Android app to unlock exclusive mobile-only features. Manage your Gifting Calendar on the go, receive push notifications for upcoming anniversaries, and chat live with your dedicated concierge directly from your phone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl flex items-center justify-center gap-4 hover:bg-gray-800 transition-colors shadow-xl">
              <svg viewBox="0 0 384 512" width="24" height="24" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
              <div className="text-left">
                <div className="text-[11px] leading-tight text-white/80">Download on the</div>
                <div className="text-base font-bold leading-tight">App Store</div>
              </div>
            </button>
            <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl flex items-center justify-center gap-4 hover:bg-gray-800 transition-colors shadow-xl">
              <svg viewBox="0 0 512 512" width="24" height="24" fill="currentColor"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
              <div className="text-left">
                <div className="text-[11px] leading-tight text-white/80">GET IT ON</div>
                <div className="text-base font-bold leading-tight">Google Play</div>
              </div>
            </button>
          </div>
        </div>
        
        <div className="flex-1 order-1 md:order-2 flex justify-center md:justify-end">
          <div className="w-64 h-[500px] bg-stone-100 rounded-[3rem] border-[12px] border-gray-900 shadow-2xl relative overflow-hidden flex flex-col">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-full z-10"></div>
            <div className="w-full h-1/2 bg-[#500000] flex items-end justify-center pb-8">
              <span className="font-serif tracking-widest text-white text-xl">TRISH</span>
            </div>
            <div className="w-full h-1/2 bg-white flex flex-col gap-4 p-6">
              <div className="w-full h-16 bg-stone-100 rounded-xl"></div>
              <div className="w-full h-16 bg-stone-100 rounded-xl"></div>
              <div className="w-full h-16 bg-stone-100 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    `
  }
};

const template = (slug, data) => `"use client";

import GlobalNav from "@/components/layout/GlobalNav";
import Image from "next/image";

export default function EditorialPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col">
      <header className="w-full bg-white border-b border-gray-100 hidden lg:block relative z-40">
        <GlobalNav />
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="${data.heroImage}"
            alt="${data.title}"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-[#500000]/70 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10 animate-fade-up">
          <span className="text-sm font-bold text-white/70 uppercase tracking-widest mb-6 block drop-shadow-md">${data.category}</span>
          <h1 className="text-5xl md:text-7xl text-white font-light mb-6 tracking-wide drop-shadow-lg" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            ${data.title}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 bg-[#faf9f6]">
        <div className="container mx-auto">
          ${data.content}
        </div>
      </section>
    </div>
  );
}
`;

const appDir = path.join(__dirname, '..', 'src', 'app');

Object.entries(pageContents).forEach(([slug, data]) => {
  const pageDir = path.join(appDir, slug);
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
  }
  
  const pagePath = path.join(pageDir, 'page.tsx');
  fs.writeFileSync(pagePath, template(slug, data));
  console.log(`Redesigned page: ${slug}`);
});

console.log('All footer pages successfully redesigned with editorial layouts!');
