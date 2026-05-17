import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, CreditCard, Wallet, Banknote, Smartphone } from "lucide-react";
import { useCart } from "@/store/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — JOVIO" }] }),
  component: Checkout,
});

const STEPS = ["Address", "Delivery", "Payment", "Review"];

function Checkout() {
  const [step, setStep] = useState(0);
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.items.reduce((n, i) => n + i.qty * i.price, 0));
  const clear = useCart((s) => s.clear);
  const nav = useNavigate();
  const [pay, setPay] = useState("card");

  const place = () => {
    clear();
    nav({ to: "/account" });
  };

  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
      <div>
        <h1 className="font-serif text-4xl">Checkout</h1>
        <div className="mt-6 flex items-center gap-2 text-xs">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`h-7 w-7 rounded-full flex items-center justify-center ${i <= step ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground"}`}>{i<step?<Check size={12}/>:i+1}</div>
              <span className={i<=step?"text-foreground":"text-muted-foreground"}>{s}</span>
              {i < STEPS.length-1 && <div className="w-8 h-px bg-border"/>}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-card border border-border rounded-2xl p-6">
          {step === 0 && (
            <div className="grid md:grid-cols-2 gap-3">
              {["Full name","Phone","Address line 1","Address line 2","City","Postal code","Country","State"].map((f) => (
                <input key={f} placeholder={f} className="bg-background border border-border rounded-xl px-4 py-3 text-sm"/>
              ))}
            </div>
          )}
          {step === 1 && (
            <div className="space-y-3">
              {[
                {n:"Same-day · $19", d:"Order before 2pm"},
                {n:"Express 2-day · Free", d:"Carbon-neutral courier"},
                {n:"Standard 5-day · Free", d:"Eco shipping"},
                {n:"International · $39", d:"DDP — duties prepaid"},
              ].map((o) => (
                <label key={o.n} className="flex items-center gap-3 bg-background border border-border rounded-xl p-4 cursor-pointer">
                  <input type="radio" name="d" defaultChecked={o.n.includes("Express")}/>
                  <div className="flex-1"><div className="font-medium text-sm">{o.n}</div><div className="text-xs text-muted-foreground">{o.d}</div></div>
                </label>
              ))}
            </div>
          )}
          {step === 2 && (
            <div className="space-y-3">
              {[
                {id:"card", n:"Credit / Debit Card", icon:<CreditCard size={16}/>},
                {id:"upi", n:"UPI / Wallet", icon:<Smartphone size={16}/>},
                {id:"paypal", n:"PayPal", icon:<Wallet size={16}/>},
                {id:"cod", n:"Cash on Delivery", icon:<Banknote size={16}/>},
              ].map((o) => (
                <label key={o.id} className="flex items-center gap-3 bg-background border border-border rounded-xl p-4 cursor-pointer">
                  <input type="radio" name="p" checked={pay===o.id} onChange={() => setPay(o.id)}/>
                  <span className="text-muted-foreground">{o.icon}</span>
                  <span className="text-sm">{o.n}</span>
                </label>
              ))}
              {pay === "card" && (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <input placeholder="Card number" className="col-span-2 bg-background border border-border rounded-xl px-4 py-3 text-sm"/>
                  <input placeholder="MM/YY" className="bg-background border border-border rounded-xl px-4 py-3 text-sm"/>
                  <input placeholder="CVC" className="bg-background border border-border rounded-xl px-4 py-3 text-sm"/>
                </div>
              )}
            </div>
          )}
          {step === 3 && (
            <div>
              <div className="text-sm text-muted-foreground">Order review</div>
              <div className="mt-3 space-y-2 text-sm">
                {items.map((i) => (
                  <div key={i.id} className="flex justify-between">
                    <span>{i.title} × {i.qty}</span><span>${i.qty*i.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <button onClick={() => setStep(Math.max(0, step-1))} className="text-sm text-muted-foreground">← Back</button>
            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep(step+1)} className="bg-primary text-primary-foreground rounded-full px-8 py-3 font-semibold text-sm">Continue</button>
            ) : (
              <button onClick={place} className="bg-primary text-primary-foreground rounded-full px-8 py-3 font-semibold text-sm">Place order</button>
            )}
          </div>
        </div>
      </div>

      <aside className="bg-card border border-border rounded-2xl p-6 h-fit">
        <h3 className="font-serif text-xl">Order summary</h3>
        <div className="mt-4 space-y-3 text-sm max-h-72 overflow-auto">
          {items.map((i) => (
            <div key={i.id} className="flex gap-3">
              <img src={i.image} className="w-14 h-14 rounded-lg object-cover" alt=""/>
              <div className="flex-1"><div className="line-clamp-1">{i.title}</div><div className="text-xs text-muted-foreground">Qty {i.qty}</div></div>
              <div>${i.qty*i.price}</div>
            </div>
          ))}
        </div>
        <div className="h-px bg-border my-4"/>
        <div className="flex justify-between text-lg font-semibold"><span>Total</span><span>${subtotal}</span></div>
        <Link to="/cart" className="block text-center text-xs text-muted-foreground mt-3">← Edit bag</Link>
      </aside>
    </div>
  );
}
