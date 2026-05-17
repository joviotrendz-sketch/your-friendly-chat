export type Product = {
  id: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  badge?: string;
  colors?: string[];
  sizes?: string[];
  description: string;
};

const img = (seed: string, w = 800, h = 800) =>
  `https://picsum.photos/seed/jovio-${seed}/${w}/${h}`;

const make = (i: number, category: string, brand: string, base: number): Product => ({
  id: `${category}-${i}`,
  title: `${brand} ${category} Edition ${i.toString().padStart(2, "0")}`,
  brand,
  category,
  price: base + i * 37,
  oldPrice: base + i * 37 + 120,
  rating: 3.8 + ((i * 7) % 12) / 10,
  reviews: 120 + i * 33,
  image: img(`${category}-${i}`),
  images: [img(`${category}-${i}-a`), img(`${category}-${i}-b`), img(`${category}-${i}-c`)],
  badge: i % 5 === 0 ? "Flash" : i % 3 === 0 ? "New" : undefined,
  colors: ["#0a0a0a", "#c9a84c", "#e5e5e5", "#1e3a5f"],
  sizes: ["S", "M", "L", "XL"],
  description:
    "Crafted with obsessive detail. Premium materials, futurist silhouette and a finish that ages beautifully. Limited run, signed and numbered.",
});

const CATS = [
  { cat: "Electronics", brand: "Nova", base: 299 },
  { cat: "Fashion", brand: "Atelier", base: 89 },
  { cat: "Luxury", brand: "Maison", base: 1499 },
  { cat: "Gaming", brand: "Hexa", base: 199 },
  { cat: "Shoes", brand: "Velox", base: 159 },
  { cat: "Beauty", brand: "Lume", base: 39 },
  { cat: "Watches", brand: "Orbis", base: 899 },
  { cat: "Gadgets", brand: "Kairo", base: 129 },
];

export const PRODUCTS: Product[] = CATS.flatMap(({ cat, brand, base }) =>
  Array.from({ length: 12 }, (_, i) => make(i + 1, cat, brand, base)),
);

export const CATEGORIES = CATS.map((c) => c.cat);

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
export const byCategory = (cat: string) =>
  PRODUCTS.filter((p) => p.category.toLowerCase() === cat.toLowerCase());
