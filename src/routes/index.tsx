import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Sparkles, Tv, Zap, Loader2, Store } from "lucide-react";
import { CATEGORIES, type Product } from "@/lib/products";
import { fetchActiveProducts } from "@/lib/db-products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JOVIO — The Future Marketplace" },
      { name: "description", content: "Shop futuristic luxury, fashion, electronics, gaming and more on JOVIO — a global next-gen marketplace." },
    ],
  }),
  component: Home,
});

const HEROS = [
  { tag: "JOVIO · Drop 04", title: "Wear the future.", sub: "Independent sellers, signed and numbered.", cta: "Shop the drop" },
  { tag: "JOVIO Live", title: "Live shopping is here.", sub: "Creators going live every hour. Bid, chat, buy.", cta: "Enter the stream" },
  { tag: "Global", title: "A real marketplace, built for sellers.", sub: "Open your own store in minutes. No middlemen.", cta: "Become a seller" },
];

function Hero({ cover }: { cover?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % HEROS.length), 6000);
    return () => clearInterval(t);
  }, []);
  const h = HEROS[i];
  return (
    <section className="relative mx-auto max-w-[1400px] px-4 pt-6">
      <div className="relative aspect-[21/9] md:aspect-[21/8] rounded-3xl overflow-hidden border border-border bg-card">
        {cover && <img src={cover} alt="" className="w-full h-full object-cover opacity-60"/>}
        <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center gap-4 p-8 md:p-16 max-w-2xl">
          <span className="text-[10px] tracking-luxury text-neon">{h.tag}</span>
          <h1 className="font-serif text-4xl md:text-7xl leading-[0.95] text-foreground">{h.title}</h1>
          <p className="text-muted-foreground max-w-md">{h.sub}</p>
          <div className="flex items-center gap-3 pt-2">
            <Link to="/shop" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold">
              {h.cta} <ArrowRight size={16} />
            </Link>
            <Link to="/seller" className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-full text-sm">Open a store</Link>
          </div>
        </div>
        <div className="absolute bottom-5 right-6 flex gap-2">
          {HEROS.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-primary" : "w-4 bg-border"}`}/>
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({ title, icon, items }: { title: string; icon?: React.ReactNode; items: Product[] }) {
  if (!items.length) return null;
  return (
    <section className="mx-auto max-w-[1400px] px-4 mt-16">
      <div className="flex items-end justify-between mb-5">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="font-serif text-2xl md:text-3xl">{title}</h2>
        </div>
        <Link to="/shop" className="text-xs text-muted-foreground hover:text-foreground tracking-luxury">VIEW ALL →</Link>
      </div>
      <div className="flex gap-4 overflow-x-auto scrollbar-none -mx-4 px-4 pb-2 snap-x">
        {items.map((p) => (
          <div key={p.id} className="min-w-[240px] md:min-w-[280px] snap-start">
            <ProductCard p={p} />
          </div>
        ))}
      </div>
    </section>
  );
}

function CategoryGrid({ counts }: { counts: Record<string, number> }) {
  return (
    <section className="mx-auto max-w-[1400px] px-4 mt-20">
      <h2 className="font-serif text-3xl md:text-4xl mb-6">Shop every universe</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CATEGORIES.map((c) => (
          <Link
            key={c}
            to="/shop"
            search={{ cat: c } as never}
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-card flex flex-col justify-end p-5"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-neon/10 opacity-0 group-hover:opacity-100 transition-opacity"/>
            <div className="text-xs text-muted-foreground tracking-luxury">EXPLORE</div>
            <div className="font-serif text-2xl">{c}</div>
            <div className="text-xs text-primary mt-1">{counts[c] ?? 0} listing{(counts[c] ?? 0) === 1 ? "" : "s"}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function EmptyMarketplace() {
  return (
    <section className="mx-auto max-w-[900px] px-4 mt-20 text-center">
      <div className="rounded-3xl border border-dashed border-border bg-card p-14">
        <Store size={36} className="mx-auto text-primary"/>
        <h2 className="font-serif text-4xl mt-4">A new marketplace is being born.</h2>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto">
          No live drops yet. Be the first seller on JOVIO and your products will appear here in real-time.
        </p>
        <div className="mt-6 flex items-center gap-3 justify-center">
          <Link to="/seller" className="bg-primary text-primary-foreground rounded-full px-6 py-3 text-sm font-semibold">Open a store</Link>
          <Link to="/login" className="border border-border rounded-full px-6 py-3 text-sm">Sign in</Link>
        </div>
      </div>
    </section>
  );
}

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveProducts(200)
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const byCat = useMemo(() => {
    const map: Record<string, Product[]> = {};
    for (const p of products) (map[p.category] ??= []).push(p);
    return map;
  }, [products]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const p of products) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, [products]);

  const cover = products[0]?.image;

  return (
    <div className="pb-20">
      <Hero cover={cover} />

      {loading ? (
        <div className="mx-auto max-w-[1400px] px-4 mt-16 flex items-center gap-2 text-muted-foreground">
          <Loader2 className="animate-spin" size={16}/> Loading live marketplace…
        </div>
      ) : products.length === 0 ? (
        <EmptyMarketplace/>
      ) : (
        <>
          <Row title="New on JOVIO" icon={<Zap size={18} className="text-neon"/>} items={products.slice(0, 12)} />
          {CATEGORIES.map((c) =>
            byCat[c]?.length ? (
              <Row key={c} title={c} icon={<Sparkles size={16} className="text-primary"/>} items={byCat[c].slice(0, 12)} />
            ) : null,
          )}
          <CategoryGrid counts={counts} />
        </>
      )}

      <section className="mx-auto max-w-[1400px] px-4 mt-20">
        <div className="flex items-center gap-2 mb-5">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75 animate-ping"/><span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"/></span>
          <h2 className="font-serif text-2xl md:text-3xl">Live shopping</h2>
          <Tv size={18} className="ml-2 text-muted-foreground"/>
          <span className="text-xs text-muted-foreground ml-auto">Going live soon</span>
        </div>
        <div className="bg-card border border-dashed border-border rounded-2xl p-10 text-center text-muted-foreground text-sm">
          Live shopping streams launch with our first creator partners. Stay tuned.
        </div>
      </section>
    </div>
  );
}
