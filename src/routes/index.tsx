import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Flame, Sparkles, Timer, Tv, Zap } from "lucide-react";
import { PRODUCTS, CATEGORIES, byCategory } from "@/lib/products";
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
  { tag: "Fall · Drop 04", title: "Wear the future.", sub: "Limited atelier capsule, signed and numbered.", img: "https://picsum.photos/seed/jovio-hero-1/1600/900", cta: "Shop the drop" },
  { tag: "JOVIO Live", title: "Live shopping is here.", sub: "Creators going live every hour. Bid, chat, buy.", img: "https://picsum.photos/seed/jovio-hero-2/1600/900", cta: "Enter the stream" },
  { tag: "Festival", title: "Festival of Lights · 60% off.", sub: "Millions of products. Free express shipping over $50.", img: "https://picsum.photos/seed/jovio-hero-3/1600/900", cta: "See deals" },
];

function useCountdown(target: number) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const s = Math.max(0, Math.floor((target - now) / 1000));
  return {
    h: String(Math.floor(s / 3600)).padStart(2, "0"),
    m: String(Math.floor((s % 3600) / 60)).padStart(2, "0"),
    s: String(s % 60).padStart(2, "0"),
  };
}

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % HEROS.length), 6000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative mx-auto max-w-[1400px] px-4 pt-6">
      <div className="relative aspect-[21/9] md:aspect-[21/8] rounded-3xl overflow-hidden border border-border">
        {HEROS.map((h, idx) => (
          <div
            key={h.title}
            className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
          >
            <img src={h.img} alt={h.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center gap-4 p-8 md:p-16 max-w-2xl">
              <span className="text-[10px] tracking-luxury text-neon">{h.tag}</span>
              <h1 className="font-serif text-4xl md:text-7xl leading-[0.95] text-foreground">{h.title}</h1>
              <p className="text-muted-foreground max-w-md">{h.sub}</p>
              <div className="flex items-center gap-3 pt-2">
                <Link to="/shop" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold">
                  {h.cta} <ArrowRight size={16} />
                </Link>
                <button className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-full text-sm">Explore</button>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-5 right-6 flex gap-2">
          {HEROS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-primary" : "w-4 bg-border"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function DealOfDay() {
  const target = useRef(Date.now() + 1000 * 60 * 60 * 7).current;
  const { h, m, s } = useCountdown(target);
  const p = PRODUCTS[3];
  return (
    <section className="mx-auto max-w-[1400px] px-4 mt-16">
      <div className="rounded-3xl border border-border bg-card overflow-hidden grid md:grid-cols-2">
        <img src={p.image} alt={p.title} className="aspect-square md:aspect-auto md:h-full object-cover" />
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-neon text-xs tracking-luxury"><Flame size={14}/> DEAL OF THE DAY</div>
          <h2 className="font-serif text-3xl md:text-5xl mt-3">{p.title}</h2>
          <p className="text-muted-foreground mt-3 max-w-md">{p.description}</p>
          <div className="flex items-baseline gap-3 mt-6">
            <span className="text-4xl font-semibold text-primary">${p.price}</span>
            <span className="line-through text-muted-foreground">${p.oldPrice}</span>
            <span className="text-xs bg-primary/15 text-primary px-2 py-1 rounded-full">-40%</span>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <Timer size={16} className="text-muted-foreground" />
            {[h, m, s].map((v, idx) => (
              <div key={idx} className="bg-background border border-border rounded-lg px-3 py-2 font-mono text-lg">{v}</div>
            ))}
          </div>
          <div className="mt-8 flex gap-3">
            <Link to="/product/$id" params={{ id: p.id }} className="bg-primary text-primary-foreground rounded-full px-6 py-3 text-sm font-semibold">Buy now</Link>
            <Link to="/shop" className="border border-border rounded-full px-6 py-3 text-sm">More deals</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ title, icon, items }: { title: string; icon?: React.ReactNode; items: typeof PRODUCTS }) {
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

function CategoryGrid() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 mt-20">
      <h2 className="font-serif text-3xl md:text-4xl mb-6">Shop every universe</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CATEGORIES.map((c, i) => (
          <Link
            key={c}
            to="/shop"
            search={{ cat: c } as never}
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-border"
          >
            <img src={`https://picsum.photos/seed/jovio-cat-${i}/600/800`} alt={c} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-xs text-muted-foreground tracking-luxury">EXPLORE</div>
              <div className="font-serif text-2xl">{c}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function LiveStrip() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 mt-20">
      <div className="flex items-center gap-2 mb-5">
        <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75 animate-ping"/><span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"/></span>
        <h2 className="font-serif text-2xl md:text-3xl">Live shopping now</h2>
        <Tv size={18} className="ml-2 text-muted-foreground"/>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[0,1,2,3].map((i) => (
          <div key={i} className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-border">
            <img src={`https://picsum.photos/seed/jovio-live-${i}/400/600`} alt="" className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"/>
            <span className="absolute top-3 left-3 text-[10px] bg-destructive text-white px-2 py-1 rounded-full tracking-luxury">LIVE</span>
            <span className="absolute top-3 right-3 text-[10px] bg-black/60 text-white px-2 py-1 rounded-full">{(i+1)*342} watching</span>
            <div className="absolute bottom-3 left-3 right-3 text-sm">
              <div className="font-medium">Drop @ Atelier {i+1}</div>
              <div className="text-xs text-muted-foreground">Hosted by @creator{i+1}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Home() {
  return (
    <div className="pb-20">
      <Hero />
      <Row title="Trending now" icon={<Zap size={18} className="text-neon"/>} items={PRODUCTS.slice(0, 10)} />
      <DealOfDay />
      <Row title="Electronics" items={byCategory("Electronics").slice(0, 10)} />
      <Row title="Luxury Atelier" icon={<Sparkles size={18} className="text-primary"/>} items={byCategory("Luxury").slice(0, 10)} />
      <Row title="Sneakers & Streetwear" items={byCategory("Shoes").slice(0, 10)} />
      <CategoryGrid />
      <Row title="Gaming gear" items={byCategory("Gaming").slice(0, 10)} />
      <Row title="Watches" items={byCategory("Watches").slice(0, 10)} />
      <LiveStrip />
      <Row title="AI Recommendations" icon={<Sparkles size={18} className="text-neon"/>} items={PRODUCTS.slice(20, 30)} />
    </div>
  );
}
