# TRISH — FULL SYSTEM DESIGN & ARCHITECTURE

## 1. PRODUCT VISION
TRISH is an online gifting platform where users can discover, personalize, purchase, and send gifts based on:
- Occasions
- Festivals
- Special Days
- Sentiments
- Home & Living
- Fragrance
- Fashion & Jewellery
- Toys & Games
- Skincare & Makeup
- Corporate Gifting
- Same-Day Delivery

The key differentiator is:
Instead of asking users "What product do you want?", TRISH asks "Why are you gifting?"

Example:
Birthday → For Mother → Under ₹2,000 → Same-Day Delivery
TRISH then recommends suitable products.

## 2. OVERALL SYSTEM ARCHITECTURE
                         USERS
                Web / Mobile Application
                         |
                         v
                  CDN / WAF
              Cloudflare / AWS
                         |
                         v
                  LOAD BALANCER
                         |
                         v
                    API GATEWAY
       Authentication / Routing / Rate Limiting
                         |
        +----------------+----------------+
        |                |                |
        v                v                v
   User Service     Product Service   Catalog Service
        |                |                |
        +----------------+----------------+
                         |
        +----------------+----------------+
        |                |                |
        v                v                v
   Order Service    Payment Service   Delivery Service
        |                |                |
        +----------------+----------------+
                         |
        +----------------+----------------+
        |                |                |
        v                v                v
   Cart/Wishlist     Coupon/Offers   Notification
                         |
                         v
              Recommendation / AI
                    Search Engine
                         |
                         v
                    DATA LAYER
                         |
       PostgreSQL | Redis | OpenSearch
       Object Storage | Analytics Database

## 3. FRONTEND ARCHITECTURE
WEB APPLICATION
Next.js
React
TypeScript
Tailwind CSS
Server-Side Rendering

MOBILE APPLICATION — FUTURE
Flutter
Android
iOS

Frontend communicates with backend using:
REST APIs

Recommended approach for initial development:
Next.js + TypeScript + REST API

## 4. TRISH WEBSITE STRUCTURE
HOME
- Logo, Delivery Location, Search Bar, Cart, Wishlist, Account

CATEGORIES
- Home & Living, Fragrance, Fashion & Jewellery, Toys & Games, Corporate, Skincare & Makeup, Same-Day Delivery

OCCASIONS
- Birthday, Milestone Birthday, New Born, Baby Shower, Graduation, Milestone Retirement, First Job, Engagement, Anniversary, Wedding, Housewarming, Corporate

FESTIVALS
- New Year, Lohri, Makar Sankranti, Pongal, Holi, Gudi Padwa, Ramadan / Eid, Easter, Akshaya Tritiya, Eid al-Adha, Raksha Bandhan, Janmashtami, Ganesh Chaturthi, Dussehra, Diwali, Bhai Dooj, Christmas

SPECIAL DAYS
- Valentine's Day, Women's Day, Mother's Day, Father's Day, Friendship Day, Wife Appreciation Day, Husband Appreciation Day, Sister's Day, Independence Day, Republic Day, Teachers' Day, Grandparents' Day, Men's Day, Children's Day, April Fool's Day, Karva Chauth

SENTIMENTS
- Thank You, I'm Sorry, Breakup Comfort, Get Well Soon, Thinking of You, Long-Distance Comfort, Congratulations, Miss You, Best Wishes, Sympathy

## 5. HOMEPAGE ARCHITECTURE
HEADER
- TRISH Logo, Delivery Location, Search, Cart, Wishlist, Account

HOMEPAGE SECTIONS
1. Hero Banner
2. "Who are you gifting for?"
3. Relationship Selection
4. Occasion Selection
5. Budget Selection
6. Recommended Gifts
7. Same-Day Delivery
8. Best Sellers
9. Trending Gifts
10. Occasion-Based Collections
11. Festival Collections
12. Special Days
13. Sentiments
14. Offers
15. Recently Viewed
16. Footer

GIFT DISCOVERY FLOW
Who is this gift for?
- Partner, Mother, Father, Sister, Brother, Friend, Baby, Grandparent, Colleague, Corporate
Example: Mother → Birthday → Budget ₹1,000–₹2,000 → Same-Day Delivery → Recommended Gifts

## 6. PRODUCT CATALOG ARCHITECTURE
Each product should contain:
- Product ID, Name, Description, Brand, Category, Subcategory, Price, Discount, GST, Images, Videos, Stock, SKU, Weight, Dimensions

GIFT TAGS: Birthday, Anniversary, Mother's Day, Valentine's Day, etc.
RECIPIENT TAGS: Mother, Father, Partner, Friend, Wife, Husband, Sister, Brother, Colleague
SENTIMENT TAGS: Thank You, Sorry, Miss You, Love, Congratulations, Best Wishes
DELIVERY: Same-Day, Next-Day, Standard
PERSONALIZATION: Name, Message, Photo, Custom Text

## 7. SEARCH ARCHITECTURE
Users should be able to search:
- Gift for mother, Birthday gift under 1000, Gift for girlfriend, Same-day gift Mumbai, Anniversary gift, Sorry gift

SEARCH FLOW: User Search → Search API → Search Engine → Keyword Matching → Category Matching → Occasion Matching → Recipient Matching → Price Filtering → Location Availability → Ranking Algorithm → Products

Recommended Search Technology: OpenSearch / Elasticsearch

## 8. USER ACCOUNT SYSTEM
- Profile: Name, Phone, Email, Profile Photo
- Saved Addresses
- Wishlist
- Cart
- Orders: Active, Delivered, Cancelled
- Wallet, Coupons, Reviews, Notifications

## 9. GIFT RECIPIENT SYSTEM
BUYER: Name, Phone, Email
RECIPIENT: Name, Phone, Address, Delivery Date, Delivery Time, Gift Message

## 10. CART ARCHITECTURE
- Product, Quantity, Price, Gift Wrap, Personalization, Gift Message, Recipient, Delivery Date, Delivery Slot, Coupon
FUTURE FEATURE: One Cart can contain multiple gifts for multiple recipients.

## 11. CHECKOUT FLOW
Cart → Login / Guest Checkout → Select Recipient → Delivery Address → Delivery Date → Delivery Slot → Gift Wrap → Gift Message → Coupon → Payment → Order Confirmation → Order Tracking

## 12. PAYMENT ARCHITECTURE
Payment Gateways: Razorpay, Cashfree, PhonePe Payment Gateway (Webhooks to verify payment status)

## 13. ORDER MANAGEMENT SYSTEM
ORDER STATES: CREATED → PAYMENT_PENDING → PAYMENT_SUCCESS → CONFIRMED → PROCESSING → PACKED → SHIPPED → OUT_FOR_DELIVERY → DELIVERED
OTHER STATES: CANCELLED, REFUND_INITIATED, REFUNDED, RETURN_REQUESTED, RETURNED

## 14. DELIVERY ARCHITECTURE
User Location → Location Service → Find Nearby Warehouse → Check Inventory → Check Delivery Radius → Calculate ETA → Check Delivery Partner Availability → Show Same-Day Delivery Eligibility

## 15. NOTIFICATION ARCHITECTURE
Services: Email, SMS, WhatsApp, Push Notification, In-App Notification
TRIGGERS: Order Placed, Payment Successful, Order Confirmed, Order Packed, Order Shipped, Out for Delivery, Delivered, Refund, Cancellation

## 16. RECOMMENDATION ENGINE
PHASE 1 — RULE-BASED RECOMMENDATION: Occasion + Recipient + Budget + Location + Delivery Date = Relevant Products
PHASE 2 — AI RECOMMENDATION: User Behaviour → Recommendation Engine → Personalized Gifts

## 17. ADMIN PANEL
Dashboard, Products, Categories, Occasions, Festivals, Special Days, Sentiments, Orders, Customers, Inventory, Warehouses, Delivery, Coupons, Offers, Reviews, Payments, Refunds, Reports, Settings

## 18. DATABASE ARCHITECTURE
PRIMARY DATABASE: PostgreSQL
CORE TABLES: users, addresses, products, product_variants, categories, subcategories, occasions, festivals, special_days, sentiments, product_tags, product_images, inventory, warehouses, carts, cart_items, wishlists, wishlist_items, orders, order_items, order_addresses, payments, refunds, coupons, offers, reviews, notifications, delivery_slots, delivery_tracking, gift_messages, gift_wraps

## 19. RECOMMENDED TECHNOLOGY STACK
FRONTEND: Next.js, React, TypeScript, Tailwind CSS
BACKEND: Spring Boot, Java, REST APIs
DATABASE: PostgreSQL
CACHE: Redis
SEARCH: OpenSearch
STORAGE: AWS S3
CDN: AWS CloudFront
AUTHENTICATION: JWT, OAuth 2.0, Google Login, Apple Login, Phone OTP
PAYMENTS: Razorpay, Cashfree
NOTIFICATIONS: Firebase Cloud Messaging, Twilio / WhatsApp, Email Service
MONITORING: Prometheus, Grafana, Sentry

## 20. DEPLOYMENT ARCHITECTURE
MODULAR MONOLITH: Next.js (Frontend) <-> Spring Boot (Backend) <-> PostgreSQL, Redis, S3, OpenSearch <-> CDN/WAF
SPRING BOOT MODULES: Auth, User, Product, Catalog, Search, Cart, Wishlist, Order, Payment, Delivery, Inventory, Coupon, Review, Notification, Recommendation

## 21. FINAL TRISH ARCHITECTURE
CORE TRISH CUSTOMER JOURNEY: WHO? → WHY? → BUDGET? → WHEN? → WHERE? → WHAT? → PERSONALIZE → PAY → TRACK → DELIVER ❤️
CORE TRISH DIFFERENTIATOR:
1. GIFT DISCOVERY: "Who are you gifting for?"
2. GIFT INTENT: "Why are you gifting?"
3. GIFT FULFILLMENT: "Where and when should it be delivered?"

## 22. UI/UX SPECIFICATION (LLM RECREATION PROMPT)

# Website Recreation Prompt: TRISH Premium Gifting Platform

**Act as an award-winning UI/UX designer and expert frontend web developer.** Your task is to accurately recreate a premium, modern, and highly interactive landing page for an intent-based gifting platform called "TRISH".

You must strictly follow the highly detailed specifications below to ensure 100% accuracy in visual design, layout, responsiveness, technical implementation, and motion design.

---

### 1. Visual Design System

#### Exact Color Palette
- **Background (`brand-bg`)**: `#FFFFFF` (Pure White for an ultra-clean, high-contrast aesthetic)
- **Text Primary (`brand-primary`)**: `#030712` (Gray-950, deep black for elegant contrast)
- **Text Secondary (`brand-secondary`)**: `#4B5563` (Gray-600)
- **Brand Accent (`brand-accent`)**: `#14b8a6` (Teal / Brand-500)
- **Secondary Accent (`accent-secondary`)**: `#0ea5e9` (Sky Blue / Accent-500)
- **Primary Gradient**: `linear-gradient(to right, #14b8a6, #0ea5e9)`
- **Glassmorphism / White Overlays**: `rgba(255, 255, 255, 0.9)` with heavy backdrop blur (`backdrop-blur-2xl` or `3xl`).

#### Typography
- **Primary Font Family**: `Inter`, sans-serif (Weights: 300, 400, 500)
- **Secondary / Heading Font Family**: `Outfit`, sans-serif (Weights: 500, 600, 800)
- **Hero Heading**: 
  - Size: `6xl` (mobile) to `10rem` (desktop)
  - Weight: Medium (`500`)
  - Line Height: `leading-none`
  - Letter Spacing: Tight (`tracking-tighter`)
- **Body Paragraph**: 
  - Size: `base` to `lg`
  - Weight: Light to Regular
  - Line Height: Relaxed (`leading-relaxed`)

---

### 2. Layout Structure & Grid System

- **Global Container**: Max-width constraints, horizontally centered (`mx-auto px-4`).
- **Hero Section Constraint**: Minimum height `80vh` or `600px`, `overflow-hidden`, relative positioning.
- **Header Structure**: Flexbox layout with space between items (`justify-between`), items centered vertically. Fixed or sticky at the top with a glassmorphism effect.

---

### 3. Section-by-Section Content & Hierarchy

#### A. Header (Navigation)
- **Logo**: "TRISH" (Bold, elegant, dark text).
- **Desktop Navigation**: Links for Categories, Occasions, Same-Day Delivery, etc. Hover states should subtly highlight the active section.
- **Actions**: Search, Wishlist (Heart icon), Cart, Profile.

#### B. Hero Section (Animated Waving Gradient)
- **Background**: Pure white (`bg-white`).
- **Animated Wave Elements**:
  - A massive, continuous flowing SVG sine wave slicing diagonally across the screen, rendered via an animated `transform: translateX` for seamless looping.
  - Vibrant blurred color orbs (orange, rose, violet, indigo, pink) using `blur-[100px]` that slowly spin and animate behind the wave line.
  - A white vignette overlay fading in from the edges to ensure the gradient smoothly dissipates into pure white.
- **Hero Content**:
  - **Main Heading**: "give a feeling." where "give" is styled with `font-sans font-light italic text-gray-800`.
  - **Sub-headline**: "Stop searching for products. Start sharing emotions. Meaningful gifting, made effortless."
  - **Intent Selector (The Search Bar)**:
    - An Airbnb-style floating pill container located below the hero text.
    - Deep, elegant drop shadow `shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]`.
    - Three divided horizontal sections: "For Who?", "Why?", and "Budget".
    - A prominent dark pill-shaped "Discover" button on the right edge featuring a `Gift` icon that rotates on hover.

#### C. Curated Products Section
- **Card Design**: Ultra-premium, editorial-style borderless design.
- **Image**: Aspect ratio `4/5`, rounded corners (`rounded-2xl`). Soft scale-up animation on hover (`group-hover:scale-110`).
- **Badges**: Frosted glass pills overlaying the top left of the image (e.g., `bg-white/90 backdrop-blur-md` for discounts, `bg-gray-900/90` for Same-Day).
- **Wishlist Button**: A minimalist circle that fades and slides up into view only when hovering over the card.
- **Content**: Cleanly aligned below the image. Tags are elegant colored text strings (e.g., "ANNIVERSARY • WIFE") instead of blocky badges.

#### D. Same-Day Delivery Banner
- **Container**: Dark theme (`bg-[#0a0a0a]`), massive rounded corners (`rounded-[3rem]`), overflowing hidden, with glowing ambient orbs inside that expand on hover.
- **Content**: Express Delivery pulsing badge, stunning italic gradient typography.
- **Media**: An offset frame composition. The image itself sits in a `4/5` portrait box, and a vibrant teal-to-sky gradient frame sits underneath it, sliding further out during hover. Floating, animated delivery badges overlap the borders.

---

### 4. Animations & Micro-Interactions
- **Continuous Wave**: Seamless `translateX` SVG loop.
- **Blob Orbs**: `translate` and `scale` keyframes (`@keyframes blob`) animating over 10 seconds.
- **Hover Transitions**: `duration-500` or `duration-700` with `ease-out` for all image scales and card lifts.
- **Parallax Offset**: Background elements and frames sliding in opposite directions on hover to create depth.

### 5. Technical Implementation Details
- **Framework**: Next.js 14+ (App Router).
- **Styling**: Tailwind CSS v4 using `@theme inline` for custom colors and custom `@keyframes` in `globals.css`.
- **Icons**: `lucide-react`.
- **Design Philosophy**: High contrast, white space, smooth elegant motion, avoiding unnecessary borders, focusing heavily on glassmorphism, soft drop shadows, and editorial image presentation.
