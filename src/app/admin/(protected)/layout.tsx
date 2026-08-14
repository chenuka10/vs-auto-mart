import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/admin/SignOutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Defense in depth — middleware already redirects, this covers direct
  // server-side renders and future route changes.
  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-graphite-950 text-paper">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-400">
              VS Auto Mart
            </p>
            <p className="mt-1 font-display text-xl font-semibold">Admin Dashboard</p>
            <p className="text-sm text-graphite-300">{user.email}</p>
          </div>
          <nav className="flex flex-wrap items-center gap-2 text-sm font-medium">
            <Link
              href="/admin"
              className="rounded-plate px-3 py-2 text-graphite-300 transition-colors duration-200 hover:bg-white/5 hover:text-brass-400"
            >
              Vehicles
            </Link>
            <Link
              href="/admin/customer-stories"
              className="rounded-plate px-3 py-2 text-graphite-300 transition-colors duration-200 hover:bg-white/5 hover:text-brass-400"
            >
              Happy Customers
            </Link>
            <Link
              href="/admin/testimonials"
              className="rounded-plate px-3 py-2 text-graphite-300 transition-colors duration-200 hover:bg-white/5 hover:text-brass-400"
            >
              Reviews
            </Link>
            <Link
              href="/admin/vehicles/new"
              className="rounded-plate bg-brass-500 px-3 py-2 font-semibold text-graphite-950 transition-all duration-200 hover:bg-brass-400"
            >
              + Add Vehicle
            </Link>
            <SignOutButton />
          </nav>
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}