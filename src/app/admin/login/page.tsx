"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-graphite-950 px-6 py-16 text-paper">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brass-500/30 bg-brass-500/10 text-brass-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 10.5h10.5a2.25 2.25 0 002.25-2.25v-6a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </span>
          <h1 className="mt-4 font-display text-2xl font-semibold">Admin Sign In</h1>
          <p className="mt-1 text-sm text-graphite-300">Staff access only.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-charcoal-900 p-6 shadow-2xl shadow-black/30"
        >
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-graphite-300">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="rounded-plate border border-white/10 bg-graphite-950 px-3 py-2.5 text-paper outline-none transition-colors duration-200 placeholder:text-graphite-500 focus:border-brass-500/60 focus:ring-2 focus:ring-brass-500/20"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-graphite-300">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="rounded-plate border border-white/10 bg-graphite-950 px-3 py-2.5 text-paper outline-none transition-colors duration-200 placeholder:text-graphite-500 focus:border-brass-500/60 focus:ring-2 focus:ring-brass-500/20"
            />
          </label>

          {error && (
            <p className="rounded-plate border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-plate bg-brass-500 px-4 py-2.5 text-sm font-semibold text-graphite-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brass-400 hover:shadow-[0_8px_24px_-4px_rgba(200,169,81,0.4)] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}