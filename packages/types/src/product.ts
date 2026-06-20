export interface ProductVariant {
  id: string;
  size?: string;
  color?: string;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  image: string;
  images: string[];
  category: string;
  variants?: ProductVariant[];
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  itemCount?: number;
  icon?: string;
}
