import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Package, Heart, Bell, CreditCard, MapPin, Star, TrendingUp, Award } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { useCart } from "@/store/cart";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/account")({
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
  const wishItems = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-[1400px] px-4 pt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="bg-card border border-border rounded-2xl p-6 h-fit">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-serif text-xl">J</div>
          <div>
            <div className="font-semibold">Jordan Vex</div>
            <div className="text-xs text-primary tracking-luxury">JOVIO ELITE · TIER III</div>
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
            <div className="space-y-3">
              {PRODUCTS.slice(0, 4).map((p, i) => (
                <div key={p.id} className="flex gap-4 bg-card border border-border rounded-2xl p-4">
                  <img src={p.image} alt="" className="w-20 h-20 rounded-xl object-cover"/>
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">Order #JV{1000+i}</div>
                    <div className="font-medium">{p.title}</div>
                    <div className="text-xs mt-1 text-neon">{["Delivered","In transit","Out for delivery","Processing"][i]}</div>
                  </div>
                  <button className="text-xs border border-border rounded-full px-4 py-1.5 self-center">Track</button>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === "wish" && (
          <div>
            <h1 className="font-serif text-3xl mb-6">Wishlist</h1>
            {wishItems.length ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{wishItems.map(p => <ProductCard key={p.id} p={p}/>)}</div>
            ) : <p className="text-muted-foreground">Tap the heart on any product to save it here.</p>}
          </div>
        )}
        {tab === "loyalty" && (
          <div>
            <h1 className="font-serif text-3xl mb-6">JOVIO Elite</h1>
            <div className="bg-card border border-border rounded-2xl p-8 bg-hero-grad">
              <div className="text-xs tracking-luxury text-primary">TIER III · OBSIDIAN</div>
              <div className="font-serif text-4xl mt-2">12,480 points</div>
              <div className="h-2 rounded-full bg-background mt-4 overflow-hidden"><div className="h-full bg-primary" style={{width:"68%"}}/></div>
              <div className="text-xs text-muted-foreground mt-2">5,520 points to TIER IV · DIAMOND</div>
            </div>
          </div>
        )}
        {tab === "stats" && (
          <div>
            <h1 className="font-serif text-3xl mb-6">Spending analytics</h1>
            <div className="grid grid-cols-3 gap-4">
              {[{l:"This month",v:"$1,240"},{l:"Year",v:"$8,910"},{l:"Lifetime",v:"$34,200"}].map(s=>(
                <div key={s.l} className="bg-card border border-border rounded-2xl p-5"><div className="text-xs text-muted-foreground">{s.l}</div><div className="font-serif text-3xl mt-1">{s.v}</div></div>
              ))}
            </div>
          </div>
        )}
        {!["orders","wish","loyalty","stats"].includes(tab) && (
          <div>
            <h1 className="font-serif text-3xl mb-6 capitalize">{tab}</h1>
            <div className="bg-card border border-border rounded-2xl p-12 text-center text-muted-foreground">Coming soon — JOVIO is launching this surface for you.</div>
          </div>
        )}
      </section>
    </div>
  );
}
