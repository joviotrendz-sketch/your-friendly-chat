// Live marketplace types + shared constants.
// All product data is loaded from Supabase via `src/lib/db-products.ts`.
// There is intentionally no hardcoded catalog here — JOVIO is fully DB-driven.

export type Product = {
  id: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  badge?: string;
  colors?: string[];
  sizes?: string[];
  description: string;
};

export const CATEGORIES = [
  "Fashion",
  "Electronics",
  "Luxury",
  "Beauty",
  "Shoes",
  "Watches",
  "Home & Living",
  "Sports",
  "Gadgets",
  "Gaming",
] as const;
