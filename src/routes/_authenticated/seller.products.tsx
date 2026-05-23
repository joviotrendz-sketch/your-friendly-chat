import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Upload, ArrowLeft, Pencil, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { DbProduct } from "@/lib/db-products";

export const Route = createFileRoute("/_authenticated/seller/products")({
  head: () => ({ meta: [{ title: "Products — Seller Hub — JOVIO" }] }),
  component: SellerProducts,
});

const CATEGORIES = [
  "Fashion",
  "Electronics",
  "Luxury",
  "Beauty",
  "Shoes",
  "Watches",
  "Home & Living",
  "Sports",
  "Gadgets",
  "Other",
];

const productSchema = z.object({
  title: z.string().trim().min(2).max(160),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(3)
    .max(80)
    .regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, hyphens"),
  brand: z.string().trim().max(60).optional().or(z.literal("")),
  category: z.string().min(1),
  description: z.string().trim().min(10).max(4000),
  price: z.coerce.number().min(0).max(1_000_000),
  compare_at_price: z.coerce.number().min(0).max(1_000_000).optional().or(z.nan()),
  stock: z.coerce.number().int().min(0).max(1_000_000),
  sku: z.string().trim().max(60).optional().or(z.literal("")),
  status: z.enum(["draft", "active", "archived"]),
});

type FormValues = z.infer<typeof productSchema>;

function SellerProducts() {
  const [items, setItems] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<DbProduct | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [isSeller, setIsSeller] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    setUserId(u.user.id);
    const { data: prof } = await supabase
      .from("profiles")
      .select("is_seller")
      .eq("id", u.user.id)
      .maybeSingle();
    setIsSeller(!!prof?.is_seller);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("seller_id", u.user.id)
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setItems((data as DbProduct[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Product deleted");
    load();
  };

  if (!isSeller && !loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 pt-20 text-center">
        <h1 className="font-serif text-3xl">Become a seller first</h1>
        <p className="text-muted-foreground mt-2">Complete seller onboarding to list products.</p>
        <Link to="/seller" className="inline-block mt-6 bg-primary text-primary-foreground rounded-full px-6 py-2.5 text-sm font-semibold">
          Go to Seller Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-10 pb-20">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <Link to="/seller" className="text-xs text-muted-foreground flex items-center gap-1 tracking-luxury">
            <ArrowLeft size={12} /> SELLER HUB
          </Link>
          <h1 className="font-serif text-4xl mt-1">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">{items.length} listing{items.length === 1 ? "" : "s"}</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="bg-primary text-primary-foreground rounded-full px-5 py-2.5 text-sm font-semibold flex items-center gap-2"
        >
          <Plus size={14} /> Add product
        </button>
      </div>

      {loading ? (
        <div className="mt-10 flex items-center gap-2 text-muted-foreground"><Loader2 className="animate-spin" size={16}/> Loading…</div>
      ) : items.length === 0 ? (
        <div className="mt-10 bg-card border border-dashed border-border rounded-2xl p-12 text-center">
          <div className="font-serif text-2xl">No products yet</div>
          <p className="text-muted-foreground text-sm mt-2">Launch your first drop and start selling on JOVIO.</p>
        </div>
      ) : (
        <div className="mt-8 bg-card border border-border rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground border-b border-border">
              <tr>
                <th className="text-left p-3">Product</th>
                <th className="text-left p-3">Category</th>
                <th className="text-left p-3">Price</th>
                <th className="text-left p-3">Stock</th>
                <th className="text-left p-3">Status</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-b border-border/40">
                  <td className="p-3 flex items-center gap-3">
                    <img src={p.images[0] ?? "https://picsum.photos/seed/" + p.slug + "/80"} className="w-10 h-10 rounded-lg object-cover" alt="" />
                    <div>
                      <div className="font-medium">{p.title}</div>
                      <div className="text-xs text-muted-foreground">/{p.slug}</div>
                    </div>
                  </td>
                  <td className="p-3 text-muted-foreground">{p.category}</td>
                  <td className="p-3">${Number(p.price).toFixed(2)}</td>
                  <td className="p-3">{p.stock}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      p.status === "active" ? "bg-neon/15 text-neon"
                        : p.status === "draft" ? "bg-muted text-muted-foreground"
                          : "bg-destructive/15 text-destructive"
                    }`}>{p.status}</span>
                  </td>
                  <td className="p-3 text-right">
                    <button onClick={() => { setEditing(p); setShowForm(true); }} className="p-2 text-muted-foreground hover:text-primary"><Pencil size={14}/></button>
                    <button onClick={() => handleDelete(p.id)} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 size={14}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <ProductForm
          userId={userId}
          editing={editing}
          onClose={() => { setShowForm(false); setEditing(null); }}
          onSaved={() => { setShowForm(false); setEditing(null); load(); }}
        />
      )}
    </div>
  );
}

function ProductForm({
  userId,
  editing,
  onClose,
  onSaved,
}: {
  userId: string;
  editing: DbProduct | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [images, setImages] = useState<string[]>(editing?.images ?? []);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: editing
      ? {
          title: editing.title,
          slug: editing.slug,
          brand: editing.brand ?? "",
          category: editing.category,
          description: editing.description,
          price: Number(editing.price),
          compare_at_price: editing.compare_at_price ? Number(editing.compare_at_price) : undefined,
          stock: editing.stock,
          sku: editing.sku ?? "",
          status: editing.status,
        }
      : {
          status: "active",
          category: CATEGORIES[0],
          price: 0,
          stock: 1,
        },
  });

  const uploadFiles = async (files: File[]) => {
    if (!files.length) return;
    setUploading(true);
    const uploaded: string[] = [];
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image`);
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is larger than 5MB`);
        continue;
      }
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${userId}/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("product-images").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) {
        toast.error(error.message);
        continue;
      }
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      uploaded.push(data.publicUrl);
    }
    setImages((s) => [...s, ...uploaded]);
    setUploading(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await uploadFiles(Array.from(e.target.files ?? []));
    e.target.value = "";
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    await uploadFiles(Array.from(e.dataTransfer.files));
  };

  const onSubmit = async (values: FormValues) => {
    if (!images.length) {
      toast.error("Add at least one product image");
      return;
    }
    const payload = {
      seller_id: userId,
      title: values.title,
      slug: values.slug,
      brand: values.brand || null,
      category: values.category,
      description: values.description,
      price: values.price,
      compare_at_price: values.compare_at_price && !isNaN(values.compare_at_price) ? values.compare_at_price : null,
      stock: values.stock,
      sku: values.sku || null,
      status: values.status,
      images,
    };

    const op = editing
      ? supabase.from("products").update(payload).eq("id", editing.id)
      : supabase.from("products").insert(payload);

    const { error } = await op;
    if (error) {
      if (error.code === "23505") {
        setError("slug", { message: "That URL slug is already taken" });
      } else {
        toast.error(error.message);
      }
      return;
    }
    toast.success(editing ? "Product updated" : "Product created");
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur flex items-start justify-center overflow-y-auto p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-card border border-border rounded-2xl p-6 my-10 space-y-5"
        noValidate
      >
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl">{editing ? "Edit product" : "New product"}</h2>
          <button type="button" onClick={onClose} className="p-1.5 rounded-full hover:bg-muted"><X size={16}/></button>
        </div>

        <Field label="Title" error={errors.title?.message}>
          <input className="input" {...register("title")} maxLength={160}/>
        </Field>

        <Field label="URL slug" hint="jovio.com/product/your-slug" error={errors.slug?.message}>
          <input className="input" {...register("slug")} maxLength={80}/>
        </Field>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Brand" error={errors.brand?.message}>
            <input className="input" {...register("brand")}/>
          </Field>
          <Field label="Category" error={errors.category?.message}>
            <select className="input" {...register("category")}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Description" error={errors.description?.message}>
          <textarea className="input min-h-28" {...register("description")} maxLength={4000}/>
        </Field>

        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Price ($)" error={errors.price?.message}>
            <input className="input" type="number" step="0.01" {...register("price")}/>
          </Field>
          <Field label="Compare-at price" error={errors.compare_at_price?.message}>
            <input className="input" type="number" step="0.01" {...register("compare_at_price")}/>
          </Field>
          <Field label="Stock" error={errors.stock?.message}>
            <input className="input" type="number" {...register("stock")}/>
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="SKU (optional)" error={errors.sku?.message}>
            <input className="input" {...register("sku")}/>
          </Field>
          <Field label="Status" error={errors.status?.message}>
            <select className="input" {...register("status")}>
              <option value="draft">Draft</option>
              <option value="active">Active (live)</option>
              <option value="archived">Archived</option>
            </select>
          </Field>
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`rounded-2xl border-2 border-dashed transition-colors p-3 ${dragOver ? "border-primary bg-primary/5" : "border-border"}`}
        >
          <div className="text-xs tracking-luxury text-muted-foreground uppercase mb-2 px-1">Images · drag & drop</div>
          <div className="grid grid-cols-4 gap-2">
            {images.map((url, i) => (
              <div key={url} className="relative aspect-square rounded-xl overflow-hidden border border-border">
                <img src={url} alt="" className="w-full h-full object-cover"/>
                <button type="button" onClick={() => setImages((s) => s.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 p-1 bg-background/80 rounded-full"><X size={10}/></button>
                {i === 0 && <span className="absolute bottom-1 left-1 text-[9px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">COVER</span>}
              </div>
            ))}
            <label className="aspect-square rounded-xl border border-dashed border-border flex flex-col items-center justify-center text-xs text-muted-foreground cursor-pointer hover:border-primary">
              {uploading ? <Loader2 className="animate-spin" size={16}/> : <><Upload size={16}/> Add</>}
              <input type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" disabled={uploading}/>
            </label>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 px-1">Drop images anywhere in this box · up to 5MB each · first image is the cover.</p>
        </div>

        <div className="flex gap-2 pt-2">
          <button type="button" onClick={onClose} className="flex-1 border border-border rounded-full py-2.5 text-sm">Cancel</button>
          <button type="submit" disabled={isSubmitting || uploading} className="flex-1 bg-primary text-primary-foreground rounded-full py-2.5 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60">
            {isSubmitting && <Loader2 className="animate-spin" size={14}/>}
            {editing ? "Save changes" : "Publish product"}
          </button>
        </div>

        <style>{`
          .input { width: 100%; background: transparent; border: 1px solid hsl(var(--border)); border-radius: 0.75rem; padding: 0.6rem 0.85rem; font-size: 0.875rem; outline: none; color: inherit; }
          .input:focus { border-color: hsl(var(--primary)); }
        `}</style>
      </form>
    </div>
  );
}

function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-xs tracking-luxury text-muted-foreground uppercase">{label}</span>
        {hint && <span className="text-[10px] text-muted-foreground">{hint}</span>}
      </div>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </label>
  );
}
