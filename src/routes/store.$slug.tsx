import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { Globe, MapPin, Store as StoreIcon, BadgeCheck } from "lucide-react";
import { getStoreBySlug } from "@/lib/store.functions";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/store/$slug")({
  loader: async ({ params }) => {
    const store = await getStoreBySlug({ data: { slug: params.slug } });
    if (!store) throw notFound();
    return store;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.store_name} — JOVIO Store` },
          {
            name: "description",
            content:
              loaderData.store_description?.slice(0, 155) ??
              `Shop ${loaderData.store_name} on JOVIO.`,
          },
          { property: "og:title", content: `${loaderData.store_name} — JOVIO` },
          {
            property: "og:description",
            content:
              loaderData.store_description?.slice(0, 155) ??
              `Shop ${loaderData.store_name} on JOVIO.`,
          },
        ]
      : [{ title: "Store — JOVIO" }],
  }),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>
        <p className="text-muted-foreground mb-6">{error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="px-4 py-2 rounded-full bg-primary text-primary-foreground"
        >
          Retry
        </button>
      </div>
    );
  },
  notFoundComponent: () => {
    const { slug } = Route.useParams();
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-semibold mb-2">Store not found</h1>
        <p className="text-muted-foreground mb-6">
          No store with slug “{slug}” exists.
        </p>
        <Link to="/shop" className="px-4 py-2 rounded-full bg-primary text-primary-foreground">
          Browse Shop
        </Link>
      </div>
    );
  },
  component: StorePage,
});

function StorePage() {
  const store = Route.useLoaderData();
  const since = store.seller_onboarded_at
    ? new Date(store.seller_onboarded_at).getFullYear()
    : null;

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border bg-gradient-to-b from-muted/40 to-background">
        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row md:items-end gap-6">
          <div className="size-20 md:size-24 rounded-2xl bg-card border border-border overflow-hidden flex items-center justify-center">
            {store.avatar_url ? (
              <img src={store.avatar_url} alt={store.store_name} className="w-full h-full object-cover" />
            ) : (
              <StoreIcon className="text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-luxury">
              {store.store_category ?? "Store"}
              <BadgeCheck size={14} className="text-primary" />
              <span className="normal-case tracking-normal">Verified seller</span>
            </div>
            <h1 className="mt-1 text-3xl md:text-4xl font-semibold">{store.store_name}</h1>
            {store.store_description && (
              <p className="mt-2 text-muted-foreground max-w-2xl">{store.store_description}</p>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              {store.country && (
                <span className="inline-flex items-center gap-1"><MapPin size={12} />{store.country}</span>
              )}
              {store.website_url && (
                <a
                  href={store.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-foreground"
                >
                  <Globe size={12} />{new URL(store.website_url).hostname}
                </a>
              )}
              {since && <span>On JOVIO since {since}</span>}
              <span>{store.products.length} {store.products.length === 1 ? "product" : "products"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        {store.products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
            This seller hasn’t published any products yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {store.products.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
