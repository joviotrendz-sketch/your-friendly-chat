import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, DollarSign, Users, TrendingUp, Plus, MessageSquare, ShieldCheck, Megaphone } from "lucide-react";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/seller")({
  head: () => ({ meta: [{ title: "Seller Hub — JOVIO" }] }),
  component: Seller,
});

const STATS = [
  { l: "Revenue (30d)", v: "$48,210", d: "+12.4%", icon: DollarSign },
  { l: "Orders", v: "1,842", d: "+8.1%", icon: Package },
  { l: "Customers", v: "920", d: "+22%", icon: Users },
  { l: "Conversion", v: "4.6%", d: "+0.8%", icon: TrendingUp },
];

function Seller() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 pt-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs tracking-luxury text-neon">SELLER HUB</div>
          <h1 className="font-serif text-4xl">Atelier Maison · Dashboard</h1>
        </div>
        <div className="flex gap-2">
          <Link to="/seller" className="border border-border rounded-full px-5 py-2.5 text-sm flex items-center gap-2"><Megaphone size={14}/> New campaign</Link>
          <Link to="/seller" className="bg-primary text-primary-foreground rounded-full px-5 py-2.5 text-sm flex items-center gap-2 font-semibold"><Plus size={14}/> Add product</Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.l} className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between text-muted-foreground"><span className="text-xs">{s.l}</span><s.icon size={14}/></div>
            <div className="font-serif text-3xl mt-2">{s.v}</div>
            <div className="text-xs text-neon mt-1">{s.d}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <h2 className="font-serif text-xl mb-4">Revenue · last 14 days</h2>
          <div className="flex items-end gap-2 h-48">
            {Array.from({length:14}).map((_,i)=>(
              <div key={i} className="flex-1 rounded-t-lg bg-gradient-to-t from-primary/30 to-primary" style={{height:`${30 + (i*7)%70}%`}}/>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-serif text-xl mb-4">KYC & Trust</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-neon"><ShieldCheck size={16}/> Identity verified</div>
            <div className="flex items-center gap-2 text-neon"><ShieldCheck size={16}/> Bank linked</div>
            <div className="flex items-center gap-2 text-muted-foreground"><ShieldCheck size={16}/> Tax docs · pending</div>
            <button className="mt-3 w-full border border-border rounded-full py-2 text-xs">Complete verification</button>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-card border border-border rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6">
          <h2 className="font-serif text-xl">Inventory</h2>
          <button className="text-xs text-muted-foreground">Manage all →</button>
        </div>
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground border-y border-border">
            <tr><th className="text-left p-3">Product</th><th className="text-left p-3">SKU</th><th className="text-left p-3">Stock</th><th className="text-left p-3">Price</th><th className="text-left p-3">Status</th></tr>
          </thead>
          <tbody>
            {PRODUCTS.slice(0, 6).map((p, i) => (
              <tr key={p.id} className="border-b border-border/40">
                <td className="p-3 flex items-center gap-3"><img src={p.image} className="w-10 h-10 rounded-lg object-cover" alt=""/>{p.title}</td>
                <td className="p-3 font-mono text-xs">SKU-{1000+i}</td>
                <td className="p-3">{(i+1)*23}</td>
                <td className="p-3">${p.price}</td>
                <td className="p-3"><span className={`text-xs px-2 py-1 rounded-full ${i%3?"bg-neon/15 text-neon":"bg-primary/15 text-primary"}`}>{i%3?"Active":"Low stock"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 bg-card border border-border rounded-2xl p-6">
        <h2 className="font-serif text-xl mb-4 flex items-center gap-2"><MessageSquare size={18}/> Customer chats</h2>
        <div className="space-y-3 text-sm">
          {["Sarah · Order JV1004","Liam · Sizing question","Mia · Restock request"].map((t,i)=>(
            <div key={i} className="flex items-center justify-between border border-border rounded-xl p-3">
              <span>{t}</span><button className="text-xs text-primary">Reply →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
