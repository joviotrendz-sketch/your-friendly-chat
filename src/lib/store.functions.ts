import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { dbToProduct, type DbProduct } from "@/lib/db-products";
import type { Product } from "@/lib/products";

export type PublicStore = {
  id: string;
  store_name: string;
  store_slug: string;
  store_description: string | null;
  store_category: string | null;
  country: string | null;
  website_url: string | null;
  avatar_url: string | null;
  seller_onboarded_at: string | null;
  products: Product[];
};

export const getStoreBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) =>
    z.object({ slug: z.string().min(1).max(64).regex(/^[a-z0-9-]+$/) }).parse(input),
  )
  .handler(async ({ data }): Promise<PublicStore | null> => {
    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select(
        "id, store_name, store_slug, store_description, store_category, country, website_url, avatar_url, seller_onboarded_at, is_seller",
      )
      .eq("store_slug", data.slug)
      .eq("is_seller", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!profile || !profile.store_name) return null;

    const { data: products } = await supabaseAdmin
      .from("products")
      .select("*")
      .eq("seller_id", profile.id)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(200);

    return {
      id: profile.id,
      store_name: profile.store_name,
      store_slug: profile.store_slug ?? data.slug,
      store_description: profile.store_description,
      store_category: profile.store_category,
      country: profile.country,
      website_url: profile.website_url,
      avatar_url: profile.avatar_url,
      seller_onboarded_at: profile.seller_onboarded_at,
      products: ((products ?? []) as DbProduct[]).map(dbToProduct),
    };
  });
