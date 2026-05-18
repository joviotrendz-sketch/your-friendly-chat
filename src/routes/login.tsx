import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — JOVIO" }] }),
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === "string" ? search.redirect : "/account",
  }),
  beforeLoad: async ({ search }) => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      throw redirect({ to: search.redirect || "/account" });
    }
  },
  component: Login,
});

function Login() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const search = Route.useSearch();
  const nav = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}${search.redirect || "/account"}`,
            data: { display_name: name || email.split("@")[0] },
          },
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back.");
        nav({ to: search.redirect || "/account" });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Authentication failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error(result.error.message || "Google sign-in failed");
      setLoading(false);
      return;
    }
    if (result.redirected) return;
    nav({ to: search.redirect || "/account" });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background bg-hero-grad">
      <div className="hidden lg:flex flex-col justify-between p-12 border-r border-border">
        <Link to="/" className="font-serif text-2xl tracking-luxury">JOVIO</Link>
        <div>
          <h1 className="font-serif text-5xl leading-tight">Welcome to the<br/>future of commerce.</h1>
          <p className="text-muted-foreground mt-4 max-w-md">Join 12M+ members shopping the world's most exclusive marketplace.</p>
        </div>
        <div className="text-xs text-muted-foreground tracking-luxury">© JOVIO · ELITE MEMBERSHIP</div>
      </div>
      <div className="flex items-center justify-center p-6 lg:p-12">
        <form onSubmit={onSubmit} className="w-full max-w-md bg-card border border-border rounded-3xl p-8">
          <Link to="/" className="lg:hidden font-serif text-xl tracking-luxury">JOVIO</Link>
          <div className="flex gap-1 mt-4 p-1 bg-background rounded-full text-xs">
            <button type="button" onClick={() => setMode("signin")} className={`flex-1 py-2 rounded-full ${mode==="signin"?"bg-primary text-primary-foreground":"text-muted-foreground"}`}>Sign in</button>
            <button type="button" onClick={() => setMode("signup")} className={`flex-1 py-2 rounded-full ${mode==="signup"?"bg-primary text-primary-foreground":"text-muted-foreground"}`}>Create account</button>
          </div>
          <div className="mt-6 space-y-3">
            {mode === "signup" && (
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm"/>
            )}
            <input value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" type="email" autoComplete="email" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm"/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} placeholder="Password" type="password" autoComplete={mode==="signin"?"current-password":"new-password"} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm"/>
          </div>
          <button disabled={loading} className="mt-5 w-full bg-primary text-primary-foreground rounded-full py-3 text-sm font-semibold disabled:opacity-60">
            {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create my account"}
          </button>
          <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground"><div className="flex-1 h-px bg-border"/>or<div className="flex-1 h-px bg-border"/></div>
          <div className="mt-4">
            <button type="button" onClick={onGoogle} disabled={loading} className="w-full border border-border rounded-full py-2.5 text-xs hover:bg-background/50 disabled:opacity-60">
              Continue with Google
            </button>
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-6 tracking-luxury">PROTECTED BY ENCRYPTED SESSIONS</p>
        </form>
      </div>
    </div>
  );
}
