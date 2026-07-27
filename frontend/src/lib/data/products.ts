export type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  tags: string[];
  sameDayDelivery: boolean;
};

export const allProducts: Product[] = [
  { id: 1, title: "Luxury Rose Gold Watch", category: "Jewelry", price: 2499, originalPrice: 3999, rating: 4.8, reviews: 124, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80", tags: ["ANNIVERSARY", "WIFE", "PARTNER"], sameDayDelivery: true },
  { id: 2, title: "French Perfume Gift Box", category: "Fragrance", price: 1899, originalPrice: 2499, rating: 4.9, reviews: 89, image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80", tags: ["BIRTHDAY", "MOTHER", "WIFE", "VALENTINE'S DAY"], sameDayDelivery: false },
  { id: 3, title: "Artisan Macaron Hamper", category: "Hampers", price: 999, originalPrice: 1299, rating: 4.7, reviews: 256, image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&q=80", tags: ["THANK YOU", "COLLEAGUE", "FRIEND", "DIWALI", "CHRISTMAS"], sameDayDelivery: true },
  { id: 4, title: "Personalized Leather Wallet", category: "Personalized", price: 1499, originalPrice: 1999, rating: 4.6, reviews: 42, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80", tags: ["FOR HIM", "FATHER", "HUSBAND", "FATHER'S DAY", "BIRTHDAY"], sameDayDelivery: true },
  { id: 5, title: "Signature Floral Arrangement", category: "Flowers", price: 1299, rating: 4.9, reviews: 312, image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80", tags: ["ROMANCE", "PARTNER", "ANNIVERSARY", "VALENTINE'S DAY", "WEDDING"], sameDayDelivery: true },
  { id: 6, title: "Gourmet Coffee Collection", category: "Hampers", price: 899, originalPrice: 1099, rating: 4.8, reviews: 178, image: "https://images.unsplash.com/photo-1498604218671-50e5058fc496?w=800&q=80", tags: ["MISS YOU", "FRIEND", "THANK YOU", "HOUSEWARMING"], sameDayDelivery: false },
  { id: 7, title: "Spa & Relaxation Kit", category: "Hampers", price: 2199, originalPrice: 2999, rating: 4.9, reviews: 88, image: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=80", tags: ["GET WELL SOON", "SISTER", "MOTHER'S DAY", "WOMEN'S DAY"], sameDayDelivery: true },
  { id: 8, title: "Handcrafted Silver Pendant", category: "Jewelry", price: 3499, originalPrice: 4500, rating: 4.7, reviews: 65, image: "https://images.unsplash.com/photo-1599643477874-5c866f5c5a88?w=800&q=80", tags: ["MILESTONE", "DAUGHTER", "BIRTHDAY", "BABY SHOWER"], sameDayDelivery: false },
  { id: 9, title: "Aromatherapy Candle Set", category: "Fragrance", price: 1199, originalPrice: 1499, rating: 4.8, reviews: 142, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80", tags: ["HOUSEWARMING", "DIWALI", "THANK YOU", "I'M SORRY"], sameDayDelivery: true },
  { id: 10, title: "Premium Men's Grooming Kit", category: "Personalized", price: 2799, originalPrice: 3499, rating: 4.7, reviews: 95, image: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=800&q=80", tags: ["FATHER'S DAY", "HUSBAND", "BIRTHDAY", "ANNIVERSARY"], sameDayDelivery: false },
  { id: 11, title: "Custom Engraved Pen", category: "Personalized", price: 599, originalPrice: 899, rating: 4.5, reviews: 34, image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=800&q=80", tags: ["CORPORATE", "COLLEAGUE", "FAREWELL", "GRADUATION"], sameDayDelivery: true },
  { id: 12, title: "Red Roses & Chocolates", category: "Flowers", price: 1599, rating: 4.8, reviews: 450, image: "https://images.unsplash.com/photo-1546842931-886c185b4c8c?w=800&q=80", tags: ["VALENTINE'S DAY", "ANNIVERSARY", "ROMANCE"], sameDayDelivery: true },
  { id: 13, title: "Orchid Elegance Pot", category: "Flowers", price: 1899, originalPrice: 2200, rating: 4.9, reviews: 112, image: "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=800&q=80", tags: ["HOUSEWARMING", "MOTHER'S DAY", "THANK YOU"], sameDayDelivery: false },
  { id: 14, title: "Classic Pearl Necklace", category: "Jewelry", price: 4999, originalPrice: 6500, rating: 4.9, reviews: 76, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80", tags: ["ANNIVERSARY", "WIFE", "MOTHER"], sameDayDelivery: false },
  { id: 15, title: "Artisan Chocolate Truffles", category: "Hampers", price: 799, rating: 4.6, reviews: 230, image: "https://images.unsplash.com/photo-1540331547168-8b63109225b7?w=800&q=80", tags: ["BIRTHDAY", "THANK YOU", "FRIEND", "VALENTINE'S DAY"], sameDayDelivery: true },
  { id: 16, title: "Fresh Lily Bouquet", category: "Flowers", price: 1099, originalPrice: 1299, rating: 4.7, reviews: 155, image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=80", tags: ["SYMPATHY", "GET WELL SOON", "MOTHER'S DAY"], sameDayDelivery: true },
  
  // Dummy products to test "Load More"
  { id: 17, title: "Golden Edge Cufflinks", category: "Jewelry", price: 1299, originalPrice: 1599, rating: 4.5, reviews: 45, image: "https://images.unsplash.com/photo-1616428782635-4299b9fa17fc?w=800&q=80", tags: ["FATHER'S DAY", "HUSBAND", "CORPORATE"], sameDayDelivery: false },
  { id: 18, title: "Vintage Wine Accessory Set", category: "Personalized", price: 1899, rating: 4.8, reviews: 110, image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80", tags: ["HOUSEWARMING", "ANNIVERSARY", "FRIEND"], sameDayDelivery: true },
  { id: 19, title: "Zen Garden Terrarium", category: "Flowers", price: 899, originalPrice: 1200, rating: 4.6, reviews: 88, image: "https://images.unsplash.com/photo-1599725427295-bcecb22fa979?w=800&q=80", tags: ["GET WELL SOON", "THANK YOU", "COLLEAGUE"], sameDayDelivery: false },
  { id: 20, title: "Velvet Oud Eau de Parfum", category: "Fragrance", price: 3499, originalPrice: 4200, rating: 4.9, reviews: 320, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80", tags: ["ROMANCE", "PARTNER", "WIFE", "VALENTINE'S DAY"], sameDayDelivery: true },
  { id: 21, title: "Gourmet Cheese Board", category: "Hampers", price: 2100, rating: 4.7, reviews: 145, image: "https://images.unsplash.com/photo-1631379482811-3e0f9b008d51?w=800&q=80", tags: ["CHRISTMAS", "DIWALI", "HOUSEWARMING"], sameDayDelivery: true },
  { id: 22, title: "Personalized Journal Set", category: "Personalized", price: 699, originalPrice: 899, rating: 4.8, reviews: 75, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80", tags: ["GRADUATION", "FIRST JOB", "COLLEAGUE"], sameDayDelivery: false },
  { id: 23, title: "Opulent Tulip Box", category: "Flowers", price: 1599, rating: 4.9, reviews: 210, image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=800&q=80", tags: ["MOTHER'S DAY", "WOMEN'S DAY", "WIFE"], sameDayDelivery: true },
  { id: 24, title: "Crystal Drop Earrings", category: "Jewelry", price: 2899, originalPrice: 3500, rating: 4.7, reviews: 112, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80", tags: ["ANNIVERSARY", "BIRTHDAY", "DAUGHTER"], sameDayDelivery: false },
  { id: 25, title: "Midnight Jasmine Diffuser", category: "Fragrance", price: 1099, rating: 4.6, reviews: 90, image: "https://images.unsplash.com/photo-1608528577891-eb0559ec5e42?w=800&q=80", tags: ["HOUSEWARMING", "MISS YOU", "SISTER"], sameDayDelivery: true },
  { id: 26, title: "Celebration Champagne Hamper", category: "Hampers", price: 5999, originalPrice: 6500, rating: 4.9, reviews: 54, image: "https://images.unsplash.com/photo-1596450514735-111a2fe02935?w=800&q=80", tags: ["WEDDING", "ENGAGEMENT", "NEW YEAR"], sameDayDelivery: false },
  { id: 27, title: "Monogrammed Silk Tie", category: "Personalized", price: 1499, originalPrice: 1999, rating: 4.8, reviews: 130, image: "https://images.unsplash.com/photo-1595123531649-6e3e5c9b68d4?w=800&q=80", tags: ["FATHER'S DAY", "MEN'S DAY", "HUSBAND"], sameDayDelivery: true },
  { id: 28, title: "Sunset Carnation Bouquet", category: "Flowers", price: 899, rating: 4.5, reviews: 180, image: "https://images.unsplash.com/photo-1562229125-9fa8e7855e96?w=800&q=80", tags: ["CHEER UP", "FRIENDSHIP DAY", "SISTER"], sameDayDelivery: true },
  { id: 29, title: "Gold Plated Bracelet", category: "Jewelry", price: 1799, originalPrice: 2199, rating: 4.8, reviews: 95, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80", tags: ["VALENTINE'S DAY", "GIRLFRIEND", "WIFE"], sameDayDelivery: false },
  { id: 30, title: "Relaxing Bath Bomb Set", category: "Hampers", price: 699, originalPrice: 850, rating: 4.7, reviews: 260, image: "https://images.unsplash.com/photo-1608248593875-2019741e4bc2?w=800&q=80", tags: ["GET WELL SOON", "THANK YOU", "MOTHER"], sameDayDelivery: true },
];
