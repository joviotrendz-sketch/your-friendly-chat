import { Link } from "@tanstack/react-router";

const COLS = [
  { title: "Shop", links: ["New Arrivals", "Bestsellers", "Luxury", "Gaming", "Beauty"] },
  { title: "Help", links: ["Orders", "Shipping", "Returns", "Contact", "FAQ"] },
  { title: "Company", links: ["About JOVIO", "Careers", "Press", "Sustainability", "Investors"] },
  { title: "For Sellers", links: ["Open a store", "Seller hub", "Logistics", "Ads", "API"] },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-card/40">
      <div className="mx-auto max-w-[1400px] px-6 py-16 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="font-serif text-3xl tracking-luxury">JOVIO</div>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            The future commerce ecosystem. Discover, sell and live the next era of global retail.
          </p>
          <form className="mt-6 flex items-center bg-background rounded-full border border-border max-w-sm">
            <input className="flex-1 bg-transparent px-4 py-3 text-sm outline-none" placeholder="Join the Elite Club" />
            <button className="bg-primary text-primary-foreground rounded-full px-5 py-2 m-1 text-xs font-semibold">Subscribe</button>
          </form>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <div className="text-xs tracking-luxury text-foreground uppercase">{col.title}</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {col.links.map((l) => (
                <li key={l}><Link to="/shop" className="hover:text-foreground">{l}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} JOVIO · Terms · Privacy · Cookies · A futurist marketplace
      </div>
    </footer>
  );
}
