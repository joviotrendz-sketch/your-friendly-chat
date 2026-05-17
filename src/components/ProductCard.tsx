import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import { useCart } from "@/store/cart";
import type { Product } from "@/lib/products";

export function ProductCard({ p }: { p: Product }) {
  const toggleWish = useCart((s) => s.toggleWish);
  const wished = useCart((s) => s.wishlist.includes(p.id));
  return (
    <Link
      to="/product/$id"
      params={{ id: p.id }}
      className="group block rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/60 transition"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        {p.badge && <span className="absolute top-3 left-3 text-[10px] tracking-luxury bg-primary text-primary-foreground px-2 py-1 rounded-full">{p.badge}</span>}
        <button
          onClick={(e) => { e.preventDefault(); toggleWish(p.id); }}
          aria-label="Wishlist"
          className={`absolute top-3 right-3 p-2 rounded-full bg-background/70 backdrop-blur ${wished ? "text-primary" : "text-foreground"}`}
        >
          <Heart size={14} fill={wished ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="p-4">
        <div className="text-[10px] uppercase tracking-luxury text-muted-foreground">{p.brand}</div>
        <div className="mt-1 text-sm font-medium line-clamp-1">{p.title}</div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-foreground font-semibold">${p.price}</span>
          {p.oldPrice && <span className="text-xs text-muted-foreground line-through">${p.oldPrice}</span>}
          <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
            <Star size={12} className="text-primary" fill="currentColor" /> {p.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
