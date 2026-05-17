import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — JOVIO" }] }),
  component: Login,
});

function Login() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const nav = useNavigate();
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
        <form
          onSubmit={(e) => { e.preventDefault(); nav({ to: "/account" }); }}
          className="w-full max-w-md bg-card border border-border rounded-3xl p-8"
        >
          <Link to="/" className="lg:hidden font-serif text-xl tracking-luxury">JOVIO</Link>
          <div className="flex gap-1 mt-4 p-1 bg-background rounded-full text-xs">
            <button type="button" onClick={() => setMode("signin")} className={`flex-1 py-2 rounded-full ${mode==="signin"?"bg-primary text-primary-foreground":"text-muted-foreground"}`}>Sign in</button>
            <button type="button" onClick={() => setMode("signup")} className={`flex-1 py-2 rounded-full ${mode==="signup"?"bg-primary text-primary-foreground":"text-muted-foreground"}`}>Create account</button>
          </div>
          <div className="mt-6 space-y-3">
            {mode === "signup" && <input placeholder="Full name" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm"/>}
            <input placeholder="Email" type="email" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm"/>
            <input placeholder="Password" type="password" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm"/>
          </div>
          <button className="mt-5 w-full bg-primary text-primary-foreground rounded-full py-3 text-sm font-semibold">{mode === "signin" ? "Sign in" : "Create my account"}</button>
          <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground"><div className="flex-1 h-px bg-border"/>or<div className="flex-1 h-px bg-border"/></div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button type="button" className="border border-border rounded-full py-2.5 text-xs">Continue with Google</button>
            <button type="button" className="border border-border rounded-full py-2.5 text-xs">Continue with Apple</button>
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-6 tracking-luxury">PROTECTED BY 2FA · ENCRYPTED · CAPTCHA</p>
        </form>
      </div>
    </div>
  );
}
