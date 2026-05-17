import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, Tag } from "lucide-react";
import { useCart } from "@/store/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Bag — JOVIO" }] }),
  component: Cart,
});

function Cart() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const subtotal = useCart((s) => s.items.reduce((n, i) => n + i.qty * i.price, 0));
  const shipping = subtotal > 100 ? 0 : 9;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  if (!items.length) {
    return (
      <div className="mx-auto max-w-3xl text-center py-32 px-4">
        <h1 className="font-serif text-5xl">Your bag is empty</h1>
        <p className="text-muted-foreground mt-3">Start exploring the future of commerce.</p>
        <Link to="/shop" className="inline-block mt-8 bg-primary text-primary-foreground rounded-full px-8 py-3 font-semibold">Shop now</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
      <div>
        <h1 className="font-serif text-4xl">Shopping bag</h1>
        <div className="mt-6 space-y-3">
          {items.map((i) => (
            <div key={i.id} className="flex gap-4 bg-card border border-border rounded-2xl p-4">
              <img src={i.image} className="w-24 h-24 rounded-xl object-cover" alt={i.title} />
              <div className="flex-1">
                <div className="font-medium">{i.title}</div>
                <div className="text-xs text-muted-foreground">Ships in 2 days</div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center bg-background border border-border rounded-full">
                    <button onClick={() => setQty(i.id, i.qty-1)} className="p-1.5"><Minus size={12}/></button>
                    <span className="px-2 text-sm">{i.qty}</span>
                    <button onClick={() => setQty(i.id, i.qty+1)} className="p-1.5"><Plus size={12}/></button>
                  </div>
                  <button onClick={() => remove(i.id)} className="text-xs text-muted-foreground flex items-center gap-1"><Trash2 size={12}/> Remove</button>
                  <button className="text-xs text-muted-foreground">Save for later</button>
                </div>
              </div>
              <div className="text-right font-semibold">${i.qty * i.price}</div>
            </div>
          ))}
        </div>
      </div>

      <aside className="space-y-4">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center bg-background border border-border rounded-full">
            <Tag size={14} className="ml-3 text-muted-foreground"/>
            <input placeholder="Coupon code" className="flex-1 bg-transparent px-3 py-2 text-sm outline-none"/>
            <button className="bg-primary text-primary-foreground rounded-full px-4 py-1.5 m-1 text-xs font-semibold">Apply</button>
          </div>
          <div className="mt-6 space-y-2 text-sm">
            <Row label="Subtotal" value={`$${subtotal}`} />
            <Row label="Shipping" value={shipping === 0 ? "Free" : `$${shipping}`} />
            <Row label="Estimated tax" value={`$${tax}`} />
            <div className="h-px bg-border my-3"/>
            <Row label="Total" value={`$${total}`} bold />
          </div>
          <Link to="/checkout" className="mt-6 block text-center bg-primary text-primary-foreground rounded-full py-3 font-semibold">Checkout securely</Link>
          <div className="mt-3 text-[10px] text-muted-foreground text-center tracking-luxury">SECURE · ENCRYPTED · JOVIO PROTECTED</div>
        </div>
      </aside>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "text-lg font-semibold" : "text-muted-foreground"}`}>
      <span>{label}</span><span className={bold ? "text-foreground" : ""}>{value}</span>
    </div>
  );
}
