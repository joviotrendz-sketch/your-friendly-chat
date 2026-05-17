import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShieldCheck, Hammer, Plane, Instagram, Twitter, Youtube } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "JovioTrendz — Exclusivity is Earned" },
      {
        name: "description",
        content:
          "JovioTrendz crafts limited-edition luxury pieces for the few who understand quiet power. Reserve your masterpiece.",
      },
      { property: "og:title", content: "JovioTrendz — Quiet Luxury, Limited Edition" },
      {
        property: "og:description",
        content: "Only 100 pieces worldwide. Exclusivity is not bought, it is earned.",
      },
    ],
  }),
});

function Landing() {
  useReveal();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <FontLink />
      <Header scrolled={scrolled} />
      <Hero />
      <Story />
      <Showcase />
      <Trust />
      <Footer />
    </div>
  );
}

function FontLink() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500&display=swap"
      />
    </>
  );
}

function Header({ scrolled }: { scrolled: boolean }) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 py-5 grid grid-cols-3 items-center">
        <div className="text-xs tracking-luxury text-muted-foreground uppercase hidden md:block">
          Est. MMXXV
        </div>
        <a
          href="#top"
          className="font-serif text-2xl md:text-3xl text-center tracking-wide text-foreground"
        >
          Jovio<span className="text-gold">Trendz</span>
        </a>
        <ul className="flex justify-end gap-6 md:gap-10 text-[11px] md:text-xs tracking-[0.25em] uppercase text-muted-foreground">
          <li>
            <a href="#collection" className="hover:text-gold transition-colors">
              Collection
            </a>
          </li>
          <li>
            <a href="#story" className="hover:text-gold transition-colors">
              The Story
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-gold transition-colors">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center">
      <img
        src={heroImg}
        alt="A sculpted obsidian form with a thread of gold, illuminated in cinematic darkness"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />

      <div className="relative z-10 max-w-5xl px-6 text-center reveal">
        <p className="text-[10px] md:text-xs tracking-luxury text-gold uppercase mb-8">
          — A Private Maison —
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] text-foreground">
          Exclusivity is not bought,
          <br />
          <span className="italic gold-gradient-text">it is earned.</span>
        </h1>
        <p className="mt-8 max-w-xl mx-auto text-sm md:text-base text-muted-foreground font-light leading-relaxed">
          A clandestine atelier devoted to the few who understand silence,
          shadow, and singular craftsmanship.
        </p>
        <div className="mt-12">
          <a
            href="#collection"
            className="group inline-flex items-center gap-3 border border-gold/60 px-10 py-4 text-[11px] tracking-luxury uppercase text-foreground hover:bg-gold hover:text-primary-foreground transition-all duration-500"
          >
            Discover the Mystery
            <span className="block w-6 h-px bg-current transition-all duration-500 group-hover:w-10" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-luxury text-muted-foreground uppercase animate-pulse">
        Scroll
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="relative py-32 md:py-48 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="reveal text-[10px] tracking-luxury text-gold uppercase mb-8">
          Chapter I — The Story
        </p>
        <h2 className="reveal font-serif text-3xl md:text-5xl lg:text-6xl leading-tight text-foreground">
          Some things are not made to be seen.
          <br />
          <span className="italic text-muted-foreground">They are made to be felt.</span>
        </h2>
        <div className="hairline w-24 mx-auto my-12" />
        <div className="reveal space-y-6 text-base md:text-lg text-muted-foreground font-light leading-loose">
          <p>
            In a quiet room without address, a small circle of artisans bend
            metal, leather, and obsidian to a single, exacting standard. They
            do not sign their work. They do not advertise. They wait — for the
            ones who will recognise it.
          </p>
          <p>
            JovioTrendz is not a brand to be worn. It is a confidence to be
            carried. A whisper among those who have already arrived, and a
            silence to those who have not.
          </p>
          <p className="font-serif italic text-foreground/80 text-xl md:text-2xl pt-4">
            "We do not pursue the loud. The loud will never find us."
          </p>
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  const items = [
    {
      img: product1,
      eyebrow: "Object N° 001",
      name: "L'Encre Noire",
      desc: "An obsidian-cast vessel finished with a single seam of 24k. Hand-numbered.",
      price: "€ 4,800",
    },
    {
      img: product2,
      eyebrow: "Object N° 002",
      name: "Heure Silencieuse",
      desc: "A blackened steel chronograph. Movement assembled in a single workshop.",
      price: "€ 12,400",
    },
  ];

  return (
    <section id="collection" className="relative py-32 md:py-48 px-6 bg-card/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 reveal">
          <p className="text-[10px] tracking-luxury text-gold uppercase mb-6">
            The Limited Edition
          </p>
          <h2 className="font-serif text-4xl md:text-6xl">
            Only one hundred will exist.
          </h2>
          <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-xl mx-auto font-light">
            Once they are claimed, they are gone. There will be no second pressing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          {items.map((it, i) => (
            <article
              key={it.name}
              className="reveal group"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="relative overflow-hidden bg-background">
                <img
                  src={it.img}
                  alt={it.name}
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="w-full h-[520px] md:h-[640px] object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                />
                <div className="absolute top-5 left-5 flex items-center gap-2 border border-gold/70 bg-background/70 backdrop-blur-sm px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  <span className="text-[10px] tracking-luxury text-gold uppercase">
                    Limited — 100 Worldwide
                  </span>
                </div>
              </div>

              <div className="pt-8">
                <p className="text-[10px] tracking-luxury text-muted-foreground uppercase">
                  {it.eyebrow}
                </p>
                <h3 className="font-serif text-3xl md:text-4xl mt-3">{it.name}</h3>
                <p className="mt-4 text-sm text-muted-foreground font-light leading-relaxed max-w-md">
                  {it.desc}
                </p>
                <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                  <span className="font-serif text-xl text-foreground">{it.price}</span>
                  <a
                    href="#contact"
                    className="group/btn inline-flex items-center gap-3 text-[11px] tracking-luxury uppercase text-gold hover:text-foreground transition-colors"
                  >
                    {i === 0 ? "Reserve Your Masterpiece" : "Pre-Order Now"}
                    <span className="block w-6 h-px bg-current transition-all duration-500 group-hover/btn:w-12" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Trust() {
  const pillars = [
    { icon: Hammer, title: "100% Premium Craftsmanship", desc: "Hand-finished in a single atelier" },
    { icon: ShieldCheck, title: "Secure Checkout", desc: "Discreet, encrypted, anonymous" },
    { icon: Plane, title: "Global Elite Shipping", desc: "White-glove delivery, worldwide" },
  ];
  return (
    <section className="py-24 px-6 border-y border-border">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 md:gap-6">
        {pillars.map((p, i) => (
          <div
            key={p.title}
            className="reveal flex flex-col items-center text-center"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <p.icon className="text-gold mb-5" strokeWidth={1} size={32} />
            <h4 className="font-serif text-lg text-foreground">{p.title}</h4>
            <p className="mt-2 text-xs tracking-wider text-muted-foreground uppercase">
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-background pt-24 pb-10 px-6">
      <div className="max-w-5xl mx-auto text-center reveal">
        <p className="text-[10px] tracking-luxury text-gold uppercase mb-6">
          By Invitation
        </p>
        <h3 className="font-serif text-3xl md:text-5xl text-foreground">
          Join the Elite Club.
        </h3>
        <p className="mt-4 text-sm text-muted-foreground font-light max-w-md mx-auto">
          A private correspondence. Sent rarely. Read carefully.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-10 max-w-md mx-auto flex items-center border-b border-border focus-within:border-gold transition-colors"
        >
          <input
            type="email"
            required
            placeholder="your@private.email"
            className="flex-1 bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            className="text-[11px] tracking-luxury uppercase text-gold hover:text-foreground transition-colors py-3 pl-4"
          >
            Request →
          </button>
        </form>
      </div>

      <div className="hairline max-w-6xl mx-auto my-16" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="font-serif text-xl">
          Jovio<span className="text-gold">Trendz</span>
        </div>
        <div className="flex gap-6 text-muted-foreground">
          <a href="#" aria-label="Instagram" className="hover:text-gold transition-colors">
            <Instagram size={16} strokeWidth={1.25} />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-gold transition-colors">
            <Twitter size={16} strokeWidth={1.25} />
          </a>
          <a href="#" aria-label="Youtube" className="hover:text-gold transition-colors">
            <Youtube size={16} strokeWidth={1.25} />
          </a>
        </div>
        <ul className="flex gap-6 text-[10px] tracking-luxury uppercase text-muted-foreground">
          <li><a href="#" className="hover:text-gold transition-colors">Terms</a></li>
          <li><a href="#" className="hover:text-gold transition-colors">Privacy</a></li>
          <li><a href="#" className="hover:text-gold transition-colors">Pre-Order Policy</a></li>
        </ul>
      </div>

      <p className="mt-10 text-center text-[10px] tracking-luxury text-muted-foreground/60 uppercase">
        © MMXXV JovioTrendz — All Whispers Reserved
      </p>
    </footer>
  );
}
