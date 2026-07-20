import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f5] pt-16 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Our Company */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Our Company</h3>
            <ul className="space-y-3 text-sm text-gray-600 font-light">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Use</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">California Supply Chain Act</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Supplier Code of Conduct</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Patents</Link></li>
            </ul>
          </div>

          {/* Column 2: Help */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Help</h3>
            <ul className="space-y-3 text-sm text-gray-600 font-light">
              <li><Link href="#" className="hover:text-primary transition-colors">Apparel Size Charts</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Frequently Asked Questions</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">How to Order</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Manage Personal Information</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Site Map</Link></li>
            </ul>
          </div>

          {/* Column 3: Info */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Info</h3>
            <ul className="space-y-3 text-sm text-gray-600 font-light">
              <li><Link href="#" className="hover:text-primary transition-colors">My Account</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Order Tracking</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Shipping, Returns & Fees</Link></li>
              <li className="pt-4"><Link href="#" className="hover:text-primary transition-colors">Get Gifts.com App</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Socials */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Sign Up For Email Savings</h3>
            <div className="flex mb-8">
              <input 
                type="email" 
                placeholder="Email" 
                className="flex-1 min-w-0 px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:border-gray-500 rounded-none bg-white"
              />
              <button className="px-6 py-2 bg-[#4a6b8c] text-white text-xs font-bold tracking-wider hover:bg-[#3a5b7c] transition-colors rounded-none">
                SUBMIT
              </button>
            </div>
            
            <h3 className="font-bold text-gray-900 mb-4">Stay Connected</h3>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Legal / Copyright Bottom Section */}
        <div className="text-center text-[10px] sm:text-xs text-gray-500 font-light leading-relaxed space-y-4 pt-8 border-t border-gray-200">
          <p>Copyright©. All Rights Reserved.</p>
          <p>
            *Our Comparable Value (or Comp. Value) prices are based on the prices at which similar items have been previously offered for sale by TRISH and/or other retailers. Some exclusions apply. Without promo code, customer can currently save 30%.
          </p>
        </div>
      </div>
    </footer>
  );
}
