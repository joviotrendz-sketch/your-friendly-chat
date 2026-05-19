import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Package,
  DollarSign,
  Users,
  TrendingUp,
  Plus,
  MessageSquare,
  ShieldCheck,
  Megaphone,
  Store,
  Loader2,
} from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/seller")({
  head: () => ({ meta: [{ title: "Seller Hub — JOVIO" }] }),
  component: SellerPage,
});

const CATEGORIES = [
  "Fashion & Apparel",
  "Beauty & Cosmetics",
  "Home & Living",
  "Electronics",
  "Jewelry & Accessories",
  "Sports & Outdoors",
  "Art & Collectibles",
  "Other",
];

const onboardingSchema = z.object({
  store_name: z
    .string()
    .trim()
    .min(2, "Store name must be at least 2 characters")
    .max(60, "Store name must be 60 characters or fewer"),
  store_slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "Slug must be at least 3 characters")
    .max(40, "Slug must be 40 characters or fewer")
    .regex(/^[a-z0-9-]+$/, "Use only lowercase letters, numbers, and hyphens"),
  store_category: z.string().min(1, "Pick a category"),
  store_description: z
    .string()
    .trim()
    .min(20, "Tell buyers a bit more — at least 20 characters")
    .max(500, "Keep it under 500 characters"),
  contact_email: z.string().trim().email("Enter a valid email").max(255),
  contact_phone: z
    .string()
    .trim()
    .min(6, "Enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(/^[+0-9 ()\-]+$/, "Only digits, spaces, +, -, and parentheses"),
  country: z.string().trim().min(2, "Country is required").max(56),
  website_url: z
    .union([z.literal(""), z.string().trim().url("Enter a valid URL")])
    .optional(),
});

type OnboardingValues = z.infer<typeof onboardingSchema>;

type ProfileRow = {
  is_seller: boolean | null;
  store_name: string | null;
  store_slug: string | null;
  store_description: string | null;
  store_category: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  country: string | null;
  website_url: string | null;
};

function SellerPage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!active) return;
      const user = userData.user;
      if (!user) return;
      setUserEmail(user.email ?? "");
      const { data } = await supabase
        .from("profiles")
        .select(
          "is_seller, store_name, store_slug, store_description, store_category, contact_email, contact_phone, country, website_url",
        )
        .eq("id", user.id)
        .maybeSingle();
      if (!active) return;
      setProfile(data as ProfileRow | null);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 pt-20 flex items-center gap-2 text-muted-foreground">
        <Loader2 className="animate-spin" size={16} /> Loading seller hub…
      </div>
    );
  }

  if (!profile?.is_seller) {
    return <Onboarding defaultEmail={userEmail} onDone={(p) => setProfile(p)} />;
  }

  return <Dashboard profile={profile} />;
}

function Onboarding({
  defaultEmail,
  onDone,
}: {
  defaultEmail: string;
  onDone: (p: ProfileRow) => void;
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      contact_email: defaultEmail,
      store_category: CATEGORIES[0],
    },
  });

  const onSubmit = async (values: OnboardingValues) => {
    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData.user) {
      toast.error("Session expired — please sign in again.");
      return;
    }

    const payload = {
      is_seller: true,
      store_name: values.store_name,
      store_slug: values.store_slug,
      store_description: values.store_description,
      store_category: values.store_category,
      contact_email: values.contact_email,
      contact_phone: values.contact_phone,
      country: values.country,
      website_url: values.website_url ? values.website_url : null,
      seller_onboarded_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("profiles")
      .update(payload)
      .eq("id", userData.user.id)
      .select(
        "is_seller, store_name, store_slug, store_description, store_category, contact_email, contact_phone, country, website_url",
      )
      .single();

    if (error) {
      if (error.code === "23505") {
        setError("store_slug", { message: "That store URL is already taken" });
      } else {
        toast.error(error.message);
      }
      return;
    }

    toast.success("Welcome to JOVIO Sellers");
    onDone(data as ProfileRow);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 pb-20">
      <div className="text-xs tracking-luxury text-neon">SELLER ONBOARDING</div>
      <h1 className="font-serif text-4xl mt-1">Open your storefront</h1>
      <p className="text-muted-foreground mt-2">
        A few details and your store goes live on JOVIO.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 bg-card border border-border rounded-2xl p-6 space-y-5"
        noValidate
      >
        <Field label="Store name" error={errors.store_name?.message}>
          <input
            type="text"
            {...register("store_name")}
            className="input"
            placeholder="Atelier Maison"
            maxLength={60}
          />
        </Field>

        <Field
          label="Store URL"
          hint="jovio.com/store/your-slug"
          error={errors.store_slug?.message}
        >
          <input
            type="text"
            {...register("store_slug")}
            className="input"
            placeholder="atelier-maison"
            maxLength={40}
          />
        </Field>

        <Field label="Category" error={errors.store_category?.message}>
          <select {...register("store_category")} className="input">
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="About your store"
          error={errors.store_description?.message}
        >
          <textarea
            {...register("store_description")}
            className="input min-h-28"
            placeholder="What makes your brand worth a customer's attention?"
            maxLength={500}
          />
        </Field>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Contact email" error={errors.contact_email?.message}>
            <input
              type="email"
              {...register("contact_email")}
              className="input"
              placeholder="hello@brand.com"
              maxLength={255}
            />
          </Field>
          <Field label="Contact phone" error={errors.contact_phone?.message}>
            <input
              type="tel"
              {...register("contact_phone")}
              className="input"
              placeholder="+1 555 123 4567"
              maxLength={20}
            />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Country" error={errors.country?.message}>
            <input
              type="text"
              {...register("country")}
              className="input"
              placeholder="United States"
              maxLength={56}
            />
          </Field>
          <Field
            label="Website (optional)"
            error={errors.website_url?.message}
          >
            <input
              type="url"
              {...register("website_url")}
              className="input"
              placeholder="https://brand.com"
            />
          </Field>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-primary-foreground rounded-full py-3 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <Store size={16} />
          )}
          Launch my store
        </button>
      </form>

      <style>{`
        .input {
          width: 100%;
          background: transparent;
          border: 1px solid hsl(var(--border));
          border-radius: 0.75rem;
          padding: 0.65rem 0.9rem;
          font-size: 0.875rem;
          outline: none;
          color: inherit;
        }
        .input:focus { border-color: hsl(var(--primary)); }
      `}</style>
    </div>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-xs tracking-luxury text-muted-foreground uppercase">
          {label}
        </span>
        {hint && <span className="text-[10px] text-muted-foreground">{hint}</span>}
      </div>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </label>
  );
}

const STATS = [
  { l: "Revenue (30d)", v: "$48,210", d: "+12.4%", icon: DollarSign },
  { l: "Orders", v: "1,842", d: "+8.1%", icon: Package },
  { l: "Customers", v: "920", d: "+22%", icon: Users },
  { l: "Conversion", v: "4.6%", d: "+0.8%", icon: TrendingUp },
];

function Dashboard({ profile }: { profile: ProfileRow }) {
  return (
    <div className="mx-auto max-w-[1400px] px-4 pt-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs tracking-luxury text-neon">SELLER HUB</div>
          <h1 className="font-serif text-4xl">{profile.store_name} · Dashboard</h1>
          <p className="text-xs text-muted-foreground mt-1">
            jovio.com/store/{profile.store_slug}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/seller"
            className="border border-border rounded-full px-5 py-2.5 text-sm flex items-center gap-2"
          >
            <Megaphone size={14} /> New campaign
          </Link>
          <Link
            to="/seller"
            className="bg-primary text-primary-foreground rounded-full px-5 py-2.5 text-sm flex items-center gap-2 font-semibold"
          >
            <Plus size={14} /> Add product
          </Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.l} className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs">{s.l}</span>
              <s.icon size={14} />
            </div>
            <div className="font-serif text-3xl mt-2">{s.v}</div>
            <div className="text-xs text-neon mt-1">{s.d}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <h2 className="font-serif text-xl mb-4">Revenue · last 14 days</h2>
          <div className="flex items-end gap-2 h-48">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-lg bg-gradient-to-t from-primary/30 to-primary"
                style={{ height: `${30 + (i * 7) % 70}%` }}
              />
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-serif text-xl mb-4">KYC & Trust</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-neon">
              <ShieldCheck size={16} /> Identity verified
            </div>
            <div className="flex items-center gap-2 text-neon">
              <ShieldCheck size={16} /> Bank linked
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck size={16} /> Tax docs · pending
            </div>
            <button className="mt-3 w-full border border-border rounded-full py-2 text-xs">
              Complete verification
            </button>
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
            <tr>
              <th className="text-left p-3">Product</th>
              <th className="text-left p-3">SKU</th>
              <th className="text-left p-3">Stock</th>
              <th className="text-left p-3">Price</th>
              <th className="text-left p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.slice(0, 6).map((p, i) => (
              <tr key={p.id} className="border-b border-border/40">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={p.image}
                    className="w-10 h-10 rounded-lg object-cover"
                    alt=""
                  />
                  {p.title}
                </td>
                <td className="p-3 font-mono text-xs">SKU-{1000 + i}</td>
                <td className="p-3">{(i + 1) * 23}</td>
                <td className="p-3">${p.price}</td>
                <td className="p-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${i % 3 ? "bg-neon/15 text-neon" : "bg-primary/15 text-primary"}`}
                  >
                    {i % 3 ? "Active" : "Low stock"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 bg-card border border-border rounded-2xl p-6">
        <h2 className="font-serif text-xl mb-4 flex items-center gap-2">
          <MessageSquare size={18} /> Customer chats
        </h2>
        <div className="space-y-3 text-sm">
          {["Sarah · Order JV1004", "Liam · Sizing question", "Mia · Restock request"].map(
            (t, i) => (
              <div
                key={i}
                className="flex items-center justify-between border border-border rounded-xl p-3"
              >
                <span>{t}</span>
                <button className="text-xs text-primary">Reply →</button>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
