import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Package, Heart, Bell, CreditCard, MapPin, Star, TrendingUp, Award, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/store/cart";
import { ProductCard } from "@/components/ProductCard";
import { dbToProduct, type DbProduct } from "@/lib/db-products";
import type { Product } from "@/lib/products";

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({ meta: [{ title: "My JOVIO" }] }),
  component: Account,
});

const TABS = [
  { id: "orders", label: "Orders", icon: Package },
  { id: "wish", label: "Wishlist", icon: Heart },
  { id: "notif", label: "Notifications", icon: Bell },
  { id: "pay", label: "Payment", icon: CreditCard },
  { id: "addr", label: "Addresses", icon: MapPin },
  { id: "rev", label: "Reviews", icon: Star },
  { id: "loyalty", label: "Loyalty", icon: Award },
  { id: "stats", label: "Spend", icon: TrendingUp },
];

function Account() {
  const [tab, setTab] = useState("orders");
  const wishlist = useCart((s) => s.wishlist);
  const [wishItems, setWishItems] = useState<Product[]>([]);
  const [loadingWish, setLoadingWish] = useState(false);

  useEffect(() => {
    if (tab !== "wish" || wishlist.length === 0) {
      setWishItems([]);
      return;
    }
    setLoadingWish(true);
    supabase
      .from("products")
      .select("*")
      .in("id", wishlist)
      .eq("status", "active")
      .then(({ data }) => {
        setWishItems(((data ?? []) as DbProduct[]).map(dbToProduct));
        setLoadingWish(false);
      });
  }, [tab, wishlist]);

  return (
    <div className="mx-auto max-w-[1400px] px-4 pt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="bg-card border border-border rounded-2xl p-6 h-fit">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-serif text-xl">J</div>
          <div>
            <div className="font-semibold">My account</div>
            <div className="text-xs text-primary tracking-luxury">JOVIO MEMBER</div>
          </div>
        </div>
        <nav className="mt-6 space-y-1">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm ${tab===t.id?"bg-primary/15 text-primary":"text-muted-foreground hover:text-foreground"}`}>
              <t.icon size={14}/> {t.label}
            </button>
          ))}
        </nav>
      </aside>

      <section>
        {tab === "orders" && (
          <div>
            <h1 className="font-serif text-3xl mb-6">My orders</h1>
            <div className="bg-card border border-dashed border-border rounded-2xl p-12 text-center">
              <Package size={28} className="mx-auto text-muted-foreground"/>
              <div className="font-serif text-2xl mt-3">No orders yet</div>
              <p className="text-sm text-muted-foreground mt-2">Your purchases will appear here once you check out.</p>
              <Link to="/shop" className="inline-block mt-5 bg-primary text-primary-foreground rounded-full px-5 py-2 text-sm font-semibold">Start shopping</Link>
            </div>
          </div>
        )}
        {tab === "wish" && (
          <div>
            <h1 className="font-serif text-3xl mb-6">Wishlist</h1>
            {loadingWish ? (
              <div className="flex items-center gap-2 text-muted-foreground"><Loader2 size={14} className="animate-spin"/> Loading…</div>
            ) : wishItems.length ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{wishItems.map((p) => <ProductCard key={p.id} p={p}/>)}</div>
            ) : (
              <p className="text-muted-foreground">Tap the heart on any product to save it here.</p>
            )}
          </div>
        )}
        {!["orders","wish"].includes(tab) && (
          <div>
            <h1 className="font-serif text-3xl mb-6 capitalize">{tab}</h1>
            <div className="bg-card border border-border rounded-2xl p-12 text-center text-muted-foreground">Coming soon — JOVIO is launching this surface for you.</div>
          </div>
        )}
      </section>
    </div>
  );
}
