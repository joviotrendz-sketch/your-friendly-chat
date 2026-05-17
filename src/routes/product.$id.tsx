import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Share2, Truck, Shield, RotateCcw, Star, Plus, Minus } from "lucide-react";
import { getProduct, PRODUCTS } from "@/lib/products";
import { useCart } from "@/store/cart";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — JOVIO` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: loaderData.title },
          { property: "og:image", content: loaderData.image },
        ]
      : [],
  }),
  notFoundComponent: () => <div className="p-20 text-center">Product not found</div>,
  errorComponent: () => <div className="p-20 text-center">Couldn't load product.</div>,
  component: PDP,
});

function PDP() {
  const p = Route.useLoaderData();
  const [idx, setIdx] = useState(0);
  const [size, setSize] = useState(p.sizes?.[1] ?? "M");
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const gallery = [p.image, ...(p.images ?? [])];
  const similar = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 8);

  return (
    <div className="mx-auto max-w-[1400px] px-4 pt-8">
      <div className="text-xs text-muted-foreground tracking-luxury">
        <Link to="/">JOVIO</Link> / <Link to="/shop" search={{ cat: p.category } as never}>{p.category}</Link> / {p.brand}
      </div>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="grid grid-cols-[80px_1fr] gap-3">
          <div className="flex flex-col gap-2">
            {gallery.map((g, i) => (
              <button key={i} onClick={() => setIdx(i)} className={`aspect-square rounded-xl overflow-hidden border ${idx===i?"border-primary":"border-border"}`}>
                <img src={g} alt="" className="w-full h-full object-cover"/>
              </button>
            ))}
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden border border-border bg-muted">
            <img src={gallery[idx]} alt={p.title} className="w-full h-full object-cover"/>
          </div>
        </div>

        <div>
          <div className="text-xs tracking-luxury text-muted-foreground">{p.brand} · VERIFIED SELLER</div>
          <h1 className="font-serif text-4xl mt-2">{p.title}</h1>
          <div className="flex items-center gap-3 mt-3 text-sm">
            <span className="flex items-center gap-1 text-primary"><Star size={14} fill="currentColor"/> {p.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">· {p.reviews} reviews</span>
            <span className="text-neon">· In stock</span>
          </div>

          <div className="flex items-baseline gap-3 mt-6">
            <span className="text-4xl font-semibold">${p.price}</span>
            {p.oldPrice && <span className="line-through text-muted-foreground">${p.oldPrice}</span>}
            <span className="text-xs bg-primary/15 text-primary px-2 py-1 rounded-full">EMI from ${Math.round(p.price/12)}/mo</span>
          </div>

          <div className="mt-6">
            <div className="text-xs tracking-luxury text-muted-foreground mb-2">COLOR</div>
            <div className="flex gap-2">
              {p.colors?.map((c) => <button key={c} className="h-7 w-7 rounded-full border border-border" style={{ background: c }}/>)}
            </div>
          </div>

          <div className="mt-5">
            <div className="text-xs tracking-luxury text-muted-foreground mb-2">SIZE</div>
            <div className="flex gap-2">
              {p.sizes?.map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`px-4 py-2 rounded-full border text-sm ${size===s?"bg-primary text-primary-foreground border-primary":"border-border"}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center bg-card border border-border rounded-full">
              <button onClick={() => setQty(Math.max(1, qty-1))} className="p-2"><Minus size={14}/></button>
              <span className="px-3 text-sm">{qty}</span>
              <button onClick={() => setQty(qty+1)} className="p-2"><Plus size={14}/></button>
            </div>
            <button
              onClick={() => add({ id: p.id, title: p.title, price: p.price, image: p.image }, qty)}
              className="flex-1 bg-foreground text-background rounded-full py-3 font-semibold"
            >Add to cart</button>
            <Link to="/checkout" className="flex-1 bg-primary text-primary-foreground rounded-full py-3 font-semibold text-center">Buy now</Link>
          </div>

          <div className="mt-4 flex gap-3 text-xs">
            <button className="flex items-center gap-1 text-muted-foreground"><Heart size={14}/> Wishlist</button>
            <button className="flex items-center gap-1 text-muted-foreground"><Share2 size={14}/> Share</button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-2 text-xs">
            <div className="border border-border rounded-xl p-3"><Truck size={16} className="text-primary"/><div className="mt-2">Free express in 2 days</div></div>
            <div className="border border-border rounded-xl p-3"><Shield size={16} className="text-primary"/><div className="mt-2">2-year warranty</div></div>
            <div className="border border-border rounded-xl p-3"><RotateCcw size={16} className="text-primary"/><div className="mt-2">30-day returns</div></div>
          </div>

          <div className="mt-8">
            <h3 className="font-serif text-xl">About this drop</h3>
            <p className="text-muted-foreground text-sm mt-2">{p.description}</p>
          </div>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="font-serif text-3xl mb-6">Similar drops</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {similar.map((x) => <ProductCard key={x.id} p={x}/>)}
        </div>
      </section>
    </div>
  );
}
