import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Grid3x3, List, SlidersHorizontal, Loader2, Store } from "lucide-react";
import { CATEGORIES, type Product } from "@/lib/products";
import { fetchActiveProducts } from "@/lib/db-products";
import { ProductCard } from "@/components/ProductCard";

type Search = { q?: string; cat?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : undefined,
    cat: typeof s.cat === "string" ? s.cat : undefined,
  }),
  head: () => ({ meta: [{ title: "Shop — JOVIO" }, { name: "description", content: "Browse live products from independent sellers across the JOVIO marketplace." }] }),
  component: Shop,
});

function Shop() {
  const { q, cat } = Route.useSearch();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("trending");
  const [maxPrice, setMaxPrice] = useState(3000);
  const [activeCat, setActiveCat] = useState<string | undefined>(cat);
  const [activeBrands, setActiveBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);

  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [loadingDb, setLoadingDb] = useState(true);

  useEffect(() => {
    fetchActiveProducts()
      .then(setDbProducts)
      .catch(() => setDbProducts([]))
      .finally(() => setLoadingDb(false));
  }, []);

  const brandOptions = useMemo(
    () => Array.from(new Set(dbProducts.map((p) => p.brand))).sort(),
    [dbProducts],
  );

  const filtered = useMemo(() => {
    let r = dbProducts.filter((p) => p.price <= maxPrice && p.rating >= minRating);
    if (activeCat) r = r.filter((p) => p.category === activeCat);
    if (q) r = r.filter((p) => (p.title + p.brand).toLowerCase().includes(q.toLowerCase()));
    if (activeBrands.length) r = r.filter((p) => activeBrands.includes(p.brand));
    if (sort === "low") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "high") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [dbProducts, q, activeCat, activeBrands, maxPrice, minRating, sort]);

  return (
    <div className="mx-auto max-w-[1400px] px-4 pt-8">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs tracking-luxury text-muted-foreground">CATALOG</div>
          <h1 className="font-serif text-4xl">{activeCat ?? "All products"}</h1>
          {q && <p className="text-sm text-muted-foreground mt-1">Results for "{q}"</p>}
          {!loadingDb && (
            <p className="text-xs text-neon mt-1">{dbProducts.length} live listing{dbProducts.length === 1 ? "" : "s"}</p>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm">
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-card border border-border rounded-full px-4 py-2 text-xs">
            <option value="trending">Trending</option>
            <option value="low">Price: low → high</option>
            <option value="high">Price: high → low</option>
            <option value="rating">Top rated</option>
          </select>
          <div className="flex bg-card border border-border rounded-full p-1">
            <button onClick={() => setView("grid")} className={`p-1.5 rounded-full ${view==="grid"?"bg-primary text-primary-foreground":""}`}><Grid3x3 size={14}/></button>
            <button onClick={() => setView("list")} className={`p-1.5 rounded-full ${view==="list"?"bg-primary text-primary-foreground":""}`}><List size={14}/></button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-6 text-sm">
          <div className="flex items-center gap-2 text-xs tracking-luxury text-muted-foreground"><SlidersHorizontal size={14}/> FILTERS</div>
          <div>
            <div className="font-medium mb-2">Category</div>
            <div className="space-y-1">
              <button onClick={() => setActiveCat(undefined)} className={`block text-left text-sm ${!activeCat?"text-primary":"text-muted-foreground"}`}>All</button>
              {CATEGORIES.map((c) => (
                <button key={c} onClick={() => setActiveCat(c)} className={`block text-left text-sm ${activeCat===c?"text-primary":"text-muted-foreground hover:text-foreground"}`}>{c}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="font-medium mb-2">Price · up to ${maxPrice}</div>
            <input type="range" min={50} max={3000} step={50} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-[color:var(--primary)]" />
          </div>
          {brandOptions.length > 0 && (
            <div>
              <div className="font-medium mb-2">Brand</div>
              <div className="grid grid-cols-2 gap-1.5">
                {brandOptions.map((b) => {
                  const on = activeBrands.includes(b);
                  return (
                    <button
                      key={b}
                      onClick={() => setActiveBrands((s) => on ? s.filter(x=>x!==b) : [...s, b])}
                      className={`text-xs px-3 py-1.5 rounded-full border ${on?"bg-primary text-primary-foreground border-primary":"border-border text-muted-foreground"}`}
                    >{b}</button>
                  );
                })}
              </div>
            </div>
          )}
          <div>
            <div className="font-medium mb-2">Rating · {minRating}+</div>
            <input type="range" min={0} max={5} step={0.5} value={minRating} onChange={(e) => setMinRating(+e.target.value)} className="w-full accent-[color:var(--primary)]" />
          </div>
          <div>
            <div className="font-medium mb-2">Delivery</div>
            {["Same day","Express 2-day","Standard","International"].map(d=>(
              <label key={d} className="flex items-center gap-2 text-muted-foreground text-sm"><input type="checkbox"/> {d}</label>
            ))}
          </div>
          <div>
            <div className="font-medium mb-2">Seller</div>
            <label className="flex items-center gap-2 text-muted-foreground text-sm"><input type="checkbox"/> Verified only</label>
            <label className="flex items-center gap-2 text-muted-foreground text-sm"><input type="checkbox"/> JOVIO Fulfilled</label>
          </div>
        </aside>

        <div>
          <div className="text-xs text-muted-foreground mb-3 flex items-center gap-2">
            {loadingDb && <Loader2 size={12} className="animate-spin"/>}
            {filtered.length} results
          </div>
          {filtered.length === 0 && !loadingDb ? (
            <div className="bg-card border border-dashed border-border rounded-2xl p-12 text-center">
              <Store size={28} className="mx-auto text-muted-foreground"/>
              <div className="font-serif text-2xl mt-3">No products match these filters yet</div>
              <p className="text-sm text-muted-foreground mt-2">
                {dbProducts.length === 0
                  ? "JOVIO is brand new — be the first seller to list a product."
                  : "Try widening your filters or clearing the search."}
              </p>
              {dbProducts.length === 0 && (
                <Link to="/seller" className="inline-block mt-5 bg-primary text-primary-foreground rounded-full px-5 py-2 text-sm font-semibold">Open a store</Link>
              )}
            </div>
          ) : view === "grid" ? (
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((p) => (
                <div key={p.id} className="flex gap-4 bg-card border border-border rounded-2xl p-3">
                  <img src={p.image} alt={p.title} className="w-32 h-32 rounded-xl object-cover"/>
                  <div className="flex-1 flex flex-col">
                    <div className="text-xs text-muted-foreground tracking-luxury">{p.brand}</div>
                    <div className="font-medium">{p.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-2">{p.description}</div>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-primary font-semibold">${p.price}</span>
                      <span className="text-xs text-muted-foreground">{p.reviews > 0 ? `★ ${p.rating.toFixed(1)} · ${p.reviews} reviews` : "New"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
