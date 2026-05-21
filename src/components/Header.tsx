import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, User, Bell, Mic, Camera, Globe, Store, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/store/cart";
import { CATEGORIES } from "@/lib/products";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function Header() {
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const wish = useCart((s) => s.wishlist.length);
  const [q, setQ] = useState("");
  const [authed, setAuthed] = useState(false);
  const nav = useNavigate();
  const router = useRouter();

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(!!session);
    });
    supabase.auth.getSession().then(({ data }) => setAuthed(!!data.session));
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    nav({ to: "/shop", search: { q } as never });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    router.invalidate();
    nav({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-50 bg-glass border-b border-border">
      <div className="mx-auto max-w-[1400px] px-4 py-3 flex items-center gap-4">
        <div className="flex flex-col items-start gap-1.5 shrink-0">
          <Link to="/" className="font-serif text-2xl tracking-luxury text-foreground leading-none">
            JOVIO
          </Link>
          <Link
            to="/seller"
            className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground rounded-full px-3 py-1 text-[11px] font-semibold whitespace-nowrap hover:opacity-90 transition"
            aria-label="Open a store on JOVIO"
          >
            <Store size={12} /> Open a Store
          </Link>
        </div>

        <form onSubmit={submit} className="flex-1 hidden md:flex items-center bg-card rounded-full border border-border focus-within:neon-border transition">
          <select className="bg-transparent text-xs px-4 py-2.5 border-r border-border outline-none">
            <option>All</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search the future of commerce…"
            className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button type="button" className="p-2 text-muted-foreground hover:text-neon" aria-label="Voice search"><Mic size={16}/></button>
          <button type="button" className="p-2 text-muted-foreground hover:text-neon" aria-label="Image search"><Camera size={16}/></button>
          <button type="submit" className="bg-primary text-primary-foreground rounded-full px-4 py-2 m-1 text-xs font-semibold flex items-center gap-1">
            <Search size={14}/> AI Search
          </button>
        </form>

        <nav className="flex items-center gap-1 text-xs">
          <button className="hidden lg:flex items-center gap-1 px-2 py-2 text-muted-foreground hover:text-foreground"><Globe size={14}/> EN · USD</button>
          <Link to="/seller" className="hidden lg:flex items-center gap-1 px-3 py-2 text-muted-foreground hover:text-foreground"><Store size={14}/> Sell</Link>
          {authed ? (
            <>
              <Link to="/account" className="flex items-center gap-1 px-3 py-2 text-muted-foreground hover:text-foreground" aria-label="My account"><User size={16}/></Link>
              <button onClick={signOut} className="flex items-center gap-1 px-3 py-2 text-muted-foreground hover:text-foreground" aria-label="Sign out"><LogOut size={16}/></button>
            </>
          ) : (
            <Link to="/login" className="flex items-center gap-1 px-3 py-2 text-muted-foreground hover:text-foreground"><User size={16}/> Sign in</Link>
          )}
          <button className="relative p-2 text-muted-foreground hover:text-foreground"><Bell size={16}/><span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-neon" /></button>
          <Link to="/account" className="relative p-2 text-muted-foreground hover:text-foreground"><Heart size={16}/>{wish > 0 && <span className="absolute -top-0 -right-0 text-[10px] bg-primary text-primary-foreground rounded-full px-1.5">{wish}</span>}</Link>
          <Link to="/cart" className="relative p-2 text-foreground"><ShoppingBag size={18}/>{count > 0 && <span className="absolute -top-1 -right-1 text-[10px] bg-primary text-primary-foreground rounded-full px-1.5 font-bold">{count}</span>}</Link>
        </nav>
      </div>

      <div className="border-t border-border/60 overflow-x-auto scrollbar-none">
        <div className="mx-auto max-w-[1400px] px-4 py-2 flex items-center gap-5 text-xs text-muted-foreground whitespace-nowrap">
          {CATEGORIES.map((c) => (
            <Link key={c} to="/shop" search={{ cat: c } as never} className="hover:text-foreground transition">
              {c}
            </Link>
          ))}
          <span className="text-neon">· Live Drops</span>
          <span className="text-primary">· Today's Deals</span>
          <span>· Influencer Picks</span>
          <span>· Auctions</span>
        </div>
      </div>
    </header>
  );
}
