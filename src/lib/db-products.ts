import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/lib/products";

export type DbProduct = {
  id: string;
  seller_id: string;
  title: string;
  slug: string;
  description: string;
  brand: string | null;
  category: string;
  price: number;
  compare_at_price: number | null;
  currency: string;
  stock: number;
  sku: string | null;
  images: string[];
  colors: string[];
  sizes: string[];
  rating: number;
  review_count: number;
  status: "draft" | "active" | "archived";
  is_featured: boolean;
  created_at: string;
  updated_at: string;
};

export function dbToProduct(p: DbProduct): Product {
  return {
    id: p.id,
    title: p.title,
    brand: p.brand ?? "JOVIO",
    category: p.category,
    price: Number(p.price),
    oldPrice: p.compare_at_price ? Number(p.compare_at_price) : undefined,
    rating: Number(p.rating) || 4.5,
    reviews: p.review_count || 0,
    image: p.images[0] ?? `https://picsum.photos/seed/${p.slug}/800/800`,
    images: p.images.slice(1),
    badge: p.is_featured ? "Featured" : undefined,
    colors: p.colors,
    sizes: p.sizes,
    description: p.description,
  };
}

export async function fetchActiveProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) throw error;
  return (data as DbProduct[]).map(dbToProduct);
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("status", "active")
    .maybeSingle();
  return data ? dbToProduct(data as DbProduct) : null;
}
