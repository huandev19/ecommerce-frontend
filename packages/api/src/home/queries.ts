import { Product, Category } from "@v8n/types";

// TODO: Use axios/fetch to call backend API endpoints when ready.

export const mockCategories: Category[] = [
  { id: "cat_1", name: "Clothing", slug: "clothing", itemCount: 89, icon: "👕" },
  { id: "cat_2", name: "Shoes", slug: "shoes", itemCount: 54, icon: "👟" },
  { id: "cat_3", name: "Accessories", slug: "accessories", itemCount: 67, icon: "👜" },
  { id: "cat_4", name: "Outerwear", slug: "outerwear", itemCount: 32, icon: "🧥" },
  { id: "cat_5", name: "Electronics", slug: "electronics", itemCount: 124, icon: "💻" },
  { id: "cat_6", name: "Fashion", slug: "fashion", itemCount: 210, icon: "🛍️" },
  { id: "cat_7", name: "Home & Garden", slug: "home-garden", itemCount: 78, icon: "🏠" },
  { id: "cat_8", name: "Sports", slug: "sports", itemCount: 42, icon: "⚽" },
  { id: "cat_9", name: "Toys", slug: "toys", itemCount: 36, icon: "🧸" },
  { id: "cat_10", name: "Beauty", slug: "beauty", itemCount: 55, icon: "💄" }
];

export const mockProducts: Product[] = [
  {
    id: "prod_1",
    name: "Classic White T-Shirt",
    slug: "classic-white-t-shirt",
    description: "A timeless classic. Made from 100% organic cotton, this t-shirt features a relaxed fit and a crew neckline.",
    price: 29.99,
    comparePrice: 39.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80",
    ],
    variants: [
      { id: "var_1", size: "S", color: "White", price: 29.99, stock: 10 },
      { id: "var_2", size: "M", color: "White", price: 29.99, stock: 15 },
      { id: "var_3", size: "L", color: "White", price: 29.99, stock: 5 },
    ],
    inStock: true,
    rating: 4.5,
    reviewCount: 28,
  },
  {
    id: "prod_2",
    name: "Denim Jacket",
    slug: "denim-jacket",
    description: "Vintage wash denim jacket with a classic collar, button-up front, and multiple pockets. Perfect for layering.",
    price: 89.99,
    comparePrice: 129.99,
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&q=80",
      "https://images.unsplash.com/photo-1576871337633-19a666d16efa?w=500&q=80",
    ],
    variants: [
      { id: "var_4", size: "M", color: "Blue", price: 89.99, stock: 8 },
      { id: "var_5", size: "L", color: "Blue", price: 89.99, stock: 12 },
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 45,
  },
  {
    id: "prod_3",
    name: "Running Sneakers",
    slug: "running-sneakers",
    description: "Lightweight and breathable running shoes designed for ultimate comfort and performance on any terrain.",
    price: 120.00,
    category: "Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80",
    ],
    variants: [
      { id: "var_6", size: "8", color: "Red", price: 120.00, stock: 5 },
      { id: "var_7", size: "9", color: "Red", price: 120.00, stock: 7 },
      { id: "var_8", size: "10", color: "Red", price: 120.00, stock: 2 },
    ],
    inStock: true,
    rating: 4.6,
    reviewCount: 128,
  },
  {
    id: "prod_4",
    name: "Minimalist Watch",
    slug: "minimalist-watch",
    description: "Sleek and modern timepiece featuring a genuine leather strap and a clean dial design.",
    price: 150.00,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80",
    ],
    variants: [
      { id: "var_9", size: "One Size", color: "Black", price: 150.00, stock: 20 },
    ],
    inStock: true,
    rating: 4.7,
    reviewCount: 67,
  },
  {
    id: "prod_5",
    name: "Canvas Tote Bag",
    slug: "canvas-tote-bag",
    description: "Durable and spacious canvas tote bag, perfect for everyday use, groceries, or carrying essentials.",
    price: 25.00,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80",
    ],
    variants: [
      { id: "var_10", size: "One Size", color: "Beige", price: 25.00, stock: 50 },
    ],
    inStock: true,
    rating: 4.3,
    reviewCount: 19,
  },
  {
    id: "prod_6",
    name: "Casual Chinos",
    slug: "casual-chinos",
    description: "Comfortable and versatile chino pants. Tailored fit, ideal for both casual and semi-formal occasions.",
    price: 65.00,
    comparePrice: 85.00,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80",
    ],
    variants: [
      { id: "var_11", size: "32", color: "Khaki", price: 65.00, stock: 10 },
      { id: "var_12", size: "34", color: "Khaki", price: 65.00, stock: 8 },
    ],
    inStock: true,
    rating: 4.4,
    reviewCount: 32,
  },
  {
    id: "prod_7",
    name: "Leather Boots",
    slug: "leather-boots",
    description: "Premium leather boots with a rugged sole for durability. Handcrafted for style and comfort.",
    price: 180.00,
    category: "Shoes",
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&q=80",
    ],
    variants: [
      { id: "var_13", size: "9", color: "Brown", price: 180.00, stock: 3 },
      { id: "var_14", size: "10", color: "Brown", price: 180.00, stock: 4 },
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 56,
  },
  {
    id: "prod_8",
    name: "Sunglasses",
    slug: "sunglasses",
    description: "Classic aviator sunglasses with UV protection. A must-have accessory for sunny days.",
    price: 45.00,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80",
    ],
    variants: [
      { id: "var_15", size: "One Size", color: "Gold/Black", price: 45.00, stock: 15 },
    ],
    inStock: true,
    rating: 4.2,
    reviewCount: 24,
  }
];

export const getFeaturedCategories = async (): Promise<Category[]> => {
  return mockCategories.filter(c => 
    ["electronics", "fashion", "home-garden", "sports", "toys", "beauty"].includes(c.slug)
  );
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  return [
    { id: "1", name: "Wireless Headphones", slug: "wireless-headphones", description: "High-quality wireless headphones.", price: 199.99, comparePrice: 249.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"], category: "Electronics", inStock: true, rating: 4.5, reviewCount: 84 },
    { id: "2", name: "Smart Watch", slug: "smart-watch", description: "Feature-packed smart watch.", price: 299.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"], category: "Electronics", inStock: true, rating: 5, reviewCount: 152 },
    { id: "3", name: "Running Shoes", slug: "running-shoes", description: "Comfortable running shoes.", price: 89.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"], category: "Fashion", inStock: true, rating: 4, reviewCount: 41 },
    { id: "4", name: "Coffee Maker", slug: "coffee-maker", description: "Programmable coffee maker.", price: 79.99, image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&q=80", images: ["https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&q=80"], category: "Home & Garden", inStock: true, rating: 4.3, reviewCount: 38 }
  ];
};

export const getNewArrivals = async (): Promise<Product[]> => {
  return [
    { id: "5", name: "Gaming Mouse", slug: "gaming-mouse", description: "Precision gaming mouse.", price: 59.99, image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80", images: ["https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80"], category: "Electronics", inStock: true, rating: 4.6, reviewCount: 73 },
    { id: "6", name: "Mechanical Keyboard", slug: "mechanical-keyboard", description: "Clicky mechanical keyboard.", price: 129.99, image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80", images: ["https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80"], category: "Electronics", inStock: true, rating: 4.8, reviewCount: 96 },
    { id: "7", name: "Backpack", slug: "backpack", description: "Durable daily backpack.", price: 49.99, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80", images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80"], category: "Fashion", inStock: true, rating: 4.1, reviewCount: 27 },
    { id: "8", name: "Water Bottle", slug: "water-bottle", description: "Insulated water bottle.", price: 24.99, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80", images: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80"], category: "Sports", inStock: true, rating: 4.4, reviewCount: 33 }
  ];
};

export const getProducts = async (): Promise<Product[]> => {
  const featured = await getFeaturedProducts();
  const newArrivals = await getNewArrivals();
  return [...mockProducts, ...featured, ...newArrivals];
};

export const getProductBySlug = async (slug: string): Promise<Product | undefined> => {
  const allProducts = await getProducts();
  return allProducts.find(p => p.slug === slug);
};

export const getCategories = async (): Promise<Category[]> => {
  return mockCategories;
};
