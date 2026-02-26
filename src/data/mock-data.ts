import { Product, Category, Review } from "@/types";

export const categories: Category[] = [
  { id: "1", name: "Electronics", slug: "electronics", icon: "Laptop", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop", productCount: 1240 },
  { id: "2", name: "Fashion", slug: "fashion", icon: "Shirt", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop", productCount: 3420 },
  { id: "3", name: "Home & Living", slug: "home-living", icon: "Home", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop", productCount: 890 },
  { id: "4", name: "Beauty", slug: "beauty", icon: "Sparkles", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop", productCount: 2100 },
  { id: "5", name: "Sports", slug: "sports", icon: "Dumbbell", image: "https://images.unsplash.com/photo-1461896836934-bd45ba8b2cda?w=400&h=300&fit=crop", productCount: 760 },
  { id: "6", name: "Books", slug: "books", icon: "BookOpen", image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop", productCount: 5300 },
  { id: "7", name: "Groceries", slug: "groceries", icon: "ShoppingBasket", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop", productCount: 1800 },
  { id: "8", name: "Toys", slug: "toys", icon: "Gamepad2", image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=300&fit=crop", productCount: 650 },
];

const sellers = [
  { id: "s1", name: "TechVault", rating: 4.6, verified: true },
  { id: "s2", name: "StyleCraft", rating: 4.8, verified: true },
  { id: "s3", name: "HomeNest", rating: 4.3, verified: false },
  { id: "s4", name: "FitGear Pro", rating: 4.7, verified: true },
];

export const products: Product[] = [
  {
    id: "p1", name: "Premium Wireless Noise-Cancelling Headphones", slug: "premium-wireless-headphones",
    description: "Immerse yourself in pure audio bliss with our flagship noise-cancelling headphones. Featuring 40mm custom drivers, adaptive ANC, and 30-hour battery life.",
    shortDescription: "40mm drivers, ANC, 30hr battery",
    price: 249.99, originalPrice: 349.99, discount: 29, currency: "USD",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop"],
    category: categories[0], brand: "SonicElite", rating: 4.7, reviewCount: 2340, inStock: true,
    tags: ["bestseller", "featured"], seller: sellers[0], isFeatured: true, isBestseller: true,
    variants: [
      { id: "v1", type: "color", label: "Midnight Black", value: "#1a1a2e", inStock: true },
      { id: "v2", type: "color", label: "Silver Frost", value: "#c0c0c0", inStock: true },
      { id: "v3", type: "color", label: "Rose Gold", value: "#b76e79", inStock: false },
    ],
  },
  {
    id: "p2", name: "Ultra-Slim 4K OLED Laptop 15\"", slug: "ultra-slim-4k-laptop",
    description: "Powerhouse performance meets stunning visuals. 4K OLED display, latest gen processor, 32GB RAM, 1TB SSD.",
    shortDescription: "4K OLED, 32GB RAM, 1TB SSD",
    price: 1299.99, originalPrice: 1599.99, discount: 19, currency: "USD",
    images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop"],
    category: categories[0], brand: "NovaTech", rating: 4.8, reviewCount: 876, inStock: true,
    tags: ["new", "featured"], seller: sellers[0], isFeatured: true, isNew: true,
  },
  {
    id: "p3", name: "Italian Leather Messenger Bag", slug: "italian-leather-messenger",
    description: "Handcrafted from premium Italian full-grain leather. Fits 14\" laptops with organized compartments.",
    shortDescription: "Full-grain leather, fits 14\" laptop",
    price: 189.99, originalPrice: 249.99, discount: 24, currency: "USD",
    images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop"],
    category: categories[1], brand: "Artisan & Co", rating: 4.5, reviewCount: 432, inStock: true,
    tags: ["trending"], seller: sellers[1], isBestseller: true,
  },
  {
    id: "p4", name: "Smart Fitness Watch Pro", slug: "smart-fitness-watch-pro",
    description: "Advanced health monitoring with ECG, SpO2, sleep tracking, and 14-day battery life. Water resistant to 50m.",
    shortDescription: "ECG, SpO2, 14-day battery, 50m WR",
    price: 199.99, originalPrice: 299.99, discount: 33, currency: "USD",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop"],
    category: categories[0], brand: "PulseTech", rating: 4.6, reviewCount: 1567, inStock: true,
    tags: ["deal", "bestseller"], seller: sellers[0], isFeatured: true,
  },
  {
    id: "p5", name: "Minimalist Ceramic Vase Set", slug: "minimalist-ceramic-vase",
    description: "Set of 3 handmade ceramic vases with matte finish. Perfect for modern home decor.",
    shortDescription: "Set of 3, handmade, matte finish",
    price: 59.99, originalPrice: 79.99, discount: 25, currency: "USD",
    images: ["https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&h=600&fit=crop"],
    category: categories[2], brand: "CeramicArts", rating: 4.4, reviewCount: 234, inStock: true,
    tags: ["new"], seller: sellers[2], isNew: true,
  },
  {
    id: "p6", name: "Professional Running Shoes", slug: "professional-running-shoes",
    description: "Engineered for speed with carbon-fiber plate, responsive foam, and breathable mesh upper.",
    shortDescription: "Carbon-fiber plate, responsive foam",
    price: 159.99, originalPrice: 199.99, discount: 20, currency: "USD",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop"],
    category: categories[4], brand: "VeloStride", rating: 4.7, reviewCount: 891, inStock: true,
    tags: ["trending"], seller: sellers[3], isBestseller: true,
  },
  {
    id: "p7", name: "Organic Skincare Collection", slug: "organic-skincare-collection",
    description: "Complete 5-step skincare routine with organic, cruelty-free ingredients. Suitable for all skin types.",
    shortDescription: "5-step routine, organic, cruelty-free",
    price: 89.99, originalPrice: 129.99, discount: 31, currency: "USD",
    images: ["https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop"],
    category: categories[3], brand: "PureGlow", rating: 4.5, reviewCount: 678, inStock: true,
    tags: ["deal"], seller: sellers[1],
  },
  {
    id: "p8", name: "Wireless Mechanical Keyboard", slug: "wireless-mechanical-keyboard",
    description: "Premium mechanical keyboard with hot-swappable switches, RGB backlighting, and tri-mode connectivity.",
    shortDescription: "Hot-swappable, RGB, tri-mode",
    price: 129.99, originalPrice: 169.99, discount: 24, currency: "USD",
    images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop"],
    category: categories[0], brand: "KeyCraft", rating: 4.6, reviewCount: 1123, inStock: true,
    tags: ["bestseller"], seller: sellers[0], isBestseller: true,
  },
  {
    id: "p9", name: "The Art of Programming", slug: "art-of-programming",
    description: "A comprehensive guide to clean code practices, algorithms, and software design patterns. Essential reading for every developer.",
    shortDescription: "Clean code & design patterns",
    price: 39.99, originalPrice: 54.99, discount: 27, currency: "USD",
    images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop"],
    category: categories[5], brand: "TechPress", rating: 4.8, reviewCount: 2341, inStock: true,
    tags: ["bestseller"], seller: sellers[0], isBestseller: true,
  },
  {
    id: "p10", name: "Mindful Living: A Modern Guide", slug: "mindful-living-guide",
    description: "Discover practical mindfulness techniques for everyday life. Beautifully illustrated with exercises and meditations.",
    shortDescription: "Mindfulness techniques & exercises",
    price: 24.99, originalPrice: 34.99, discount: 29, currency: "USD",
    images: ["https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=600&fit=crop"],
    category: categories[5], brand: "Zenith Books", rating: 4.5, reviewCount: 876, inStock: true,
    tags: ["new", "featured"], seller: sellers[1], isNew: true, isFeatured: true,
  },
  {
    id: "p11", name: "World History Encyclopedia", slug: "world-history-encyclopedia",
    description: "A stunning visual journey through 5,000 years of human civilization. Over 800 pages of maps, timelines, and photographs.",
    shortDescription: "5,000 years of history, 800+ pages",
    price: 49.99, originalPrice: 69.99, discount: 29, currency: "USD",
    images: ["https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=600&h=600&fit=crop"],
    category: categories[5], brand: "Heritage Press", rating: 4.7, reviewCount: 543, inStock: true,
    tags: ["trending"], seller: sellers[2],
  },
  {
    id: "p12", name: "Creative Photography Masterclass", slug: "creative-photography-masterclass",
    description: "Learn composition, lighting, and post-processing from award-winning photographers. Includes online resources.",
    shortDescription: "Composition, lighting & editing",
    price: 34.99, originalPrice: 44.99, discount: 22, currency: "USD",
    images: ["https://images.unsplash.com/photo-1553729459-afe8f2e2ed65?w=600&h=600&fit=crop"],
    category: categories[5], brand: "ArtVision", rating: 4.4, reviewCount: 321, inStock: true,
    tags: ["new"], seller: sellers[1], isNew: true,
  },
];

export const heroSlides = [
  {
    id: 1,
    title: "Summer Collection",
    subtitle: "Up to 60% off on premium electronics & gadgets",
    cta: "Shop Now",
    gradient: "from-primary/90 to-primary/60",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&h=700&fit=crop&q=80",
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Discover the latest in fashion & lifestyle trends",
    cta: "Explore",
    gradient: "from-accent/90 to-accent/60",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&h=700&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Mega Deals",
    subtitle: "Unbeatable prices on top brands this season",
    cta: "View Deals",
    gradient: "from-success/90 to-success/60",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1400&h=700&fit=crop&q=80",
  },
];

export const trendingSearches = [
  "wireless earbuds", "laptop deals", "skincare", "running shoes", "smart watch", "home decor",
];

export const reviews: Review[] = [
  { id: "r1", userId: "u1", userName: "Alex Thompson", rating: 5, title: "Absolutely amazing quality!", content: "Best headphones I've ever owned. The noise cancellation is incredible and battery lasts forever.", date: "2026-01-15", verified: true, helpful: 42 },
  { id: "r2", userId: "u2", userName: "Sarah Chen", rating: 4, title: "Great value for money", content: "Really good sound quality. Comfortable for long use. Minor gripe with the app but overall fantastic.", date: "2026-01-10", verified: true, helpful: 28 },
  { id: "r3", userId: "u3", userName: "Mike Rivera", rating: 5, title: "Perfect for work from home", content: "Blocks out all background noise. Crystal clear calls. Worth every penny.", date: "2025-12-28", verified: true, helpful: 35 },
  { id: "r4", userId: "u4", userName: "Emily Park", rating: 3, title: "Good but not great", content: "Sound is decent but I expected more at this price point. Build quality is excellent though.", date: "2025-12-20", verified: false, helpful: 12 },
];

export const coupons = [
  { code: "WELCOME20", discount: 20, type: "percent" as const, minOrder: 50, description: "20% off your first order" },
  { code: "SAVE10", discount: 10, type: "flat" as const, minOrder: 100, description: "$10 off on orders above $100" },
];
