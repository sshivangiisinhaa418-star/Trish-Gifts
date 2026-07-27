const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const products = [
  { id: 1, title: "Luxury Rose Gold Watch", category: "Jewelry", price: 2499, original_price: 3999, rating: 4.8, reviews: 124, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80", tags: ["ANNIVERSARY", "WIFE", "PARTNER"], same_day_delivery: true },
  { id: 2, title: "French Perfume Gift Box", category: "Fragrance", price: 1899, original_price: 2499, rating: 4.9, reviews: 89, image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80", tags: ["BIRTHDAY", "MOTHER", "WIFE", "VALENTINE'S DAY"], same_day_delivery: false },
  { id: 3, title: "Artisan Macaron Hamper", category: "Hampers", price: 999, original_price: 1299, rating: 4.7, reviews: 256, image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&q=80", tags: ["THANK YOU", "COLLEAGUE", "FRIEND", "DIWALI", "CHRISTMAS"], same_day_delivery: true },
  { id: 4, title: "Personalized Leather Wallet", category: "Personalized", price: 1499, original_price: 1999, rating: 4.6, reviews: 42, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80", tags: ["FOR HIM", "FATHER", "HUSBAND", "FATHER'S DAY", "BIRTHDAY"], same_day_delivery: true },
  { id: 5, title: "Signature Floral Arrangement", category: "Flowers", price: 1299, rating: 4.9, original_price: null, reviews: 312, image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80", tags: ["ROMANCE", "PARTNER", "ANNIVERSARY", "VALENTINE'S DAY", "WEDDING"], same_day_delivery: true },
  { id: 6, title: "Gourmet Coffee Collection", category: "Hampers", price: 899, original_price: 1099, rating: 4.8, reviews: 178, image: "https://images.unsplash.com/photo-1498604218671-50e5058fc496?w=800&q=80", tags: ["MISS YOU", "FRIEND", "THANK YOU", "HOUSEWARMING"], same_day_delivery: false },
  { id: 7, title: "Spa & Relaxation Kit", category: "Hampers", price: 2199, original_price: 2999, rating: 4.9, reviews: 88, image: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=80", tags: ["GET WELL SOON", "SISTER", "MOTHER'S DAY", "WOMEN'S DAY"], same_day_delivery: true },
  { id: 8, title: "Handcrafted Silver Pendant", category: "Jewelry", price: 3499, original_price: 4500, rating: 4.7, reviews: 65, image: "https://images.unsplash.com/photo-1599643477874-5c866f5c5a88?w=800&q=80", tags: ["MILESTONE", "DAUGHTER", "BIRTHDAY", "BABY SHOWER"], same_day_delivery: false },
  { id: 9, title: "Aromatherapy Candle Set", category: "Fragrance", price: 1199, original_price: 1499, rating: 4.8, reviews: 142, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80", tags: ["HOUSEWARMING", "DIWALI", "THANK YOU", "I'M SORRY"], same_day_delivery: true },
  { id: 10, title: "Premium Men's Grooming Kit", category: "Personalized", price: 2799, original_price: 3499, rating: 4.7, reviews: 95, image: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=800&q=80", tags: ["FATHER'S DAY", "HUSBAND", "BIRTHDAY", "ANNIVERSARY"], same_day_delivery: false },
  { id: 11, title: "Custom Engraved Pen", category: "Personalized", price: 599, original_price: 899, rating: 4.5, reviews: 34, image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=800&q=80", tags: ["CORPORATE", "COLLEAGUE", "FAREWELL", "GRADUATION"], same_day_delivery: true },
  { id: 12, title: "Decadent Truffle Assortment", category: "Hampers", price: 1599, original_price: 1999, rating: 4.9, reviews: 201, image: "https://images.unsplash.com/photo-1540331547168-8b63109225b7?w=800&q=80", tags: ["ANNIVERSARY", "ROMANCE", "MOTHER'S DAY", "VALENTINE'S DAY"], same_day_delivery: true }
];

const journalArticles = [
  {
    id: "1",
    slug: "the-ultimate-anniversary-guide",
    title: "The Ultimate Anniversary Guide: Gifts That Speak Volumes",
    excerpt: "Discover how to move beyond the traditional anniversary gifts and find something that truly encapsulates your unique love story.",
    content: `An anniversary isn't just a marker of time; it's a celebration of a shared journey...`,
    cover_image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=1200&q=80",
    author: "Eleanor Sterling",
    date: "July 15, 2026",
    category: "Guides",
    read_time: "4 min read"
  },
  {
    id: "2",
    slug: "curating-corporate-gifts",
    title: "The Fine Art of Curating Corporate Gifts",
    excerpt: "Corporate gifting doesn't have to be uninspired. Learn how to select premium, memorable gifts.",
    content: `For decades, the phrase "corporate gift" has conjured images of uninspired branded pens...`,
    cover_image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=80",
    author: "Julian Vance",
    date: "July 02, 2026",
    category: "Business",
    read_time: "3 min read"
  },
  {
    id: "3",
    slug: "the-art-of-giving",
    title: "The Art of Giving: Why Presentation Matters",
    excerpt: "A beautifully wrapped gift builds anticipation and elevates the entire experience.",
    content: `There is a profound psychological difference between receiving an item in a standard brown shipping box...`,
    cover_image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&q=80",
    author: "Clara Hughes",
    date: "June 18, 2026",
    category: "Lifestyle",
    read_time: "5 min read"
  }
];

async function seed() {
  console.log("Seeding products...");
  const { data: pData, error: pError } = await supabase.from('products').upsert(products);
  if (pError) console.error("Error inserting products:", pError.message);
  else console.log("Products seeded successfully.");

  console.log("Seeding journal articles...");
  const { data: jData, error: jError } = await supabase.from('journal_articles').upsert(journalArticles);
  if (jError) console.error("Error inserting articles:", jError.message);
  else console.log("Journal articles seeded successfully.");

  console.log("Done!");
}

seed();
