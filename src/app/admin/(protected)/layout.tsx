import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Defense in depth — middleware already redirects, this covers direct
  // server-side renders and future route changes.
  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-graphite-950 text-graphite-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-graphite-700/20 pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-400">
              VS Auto Mart
            </p>
            <p className="mt-1 font-display text-xl font-semibold">Admin Dashboard</p>
            <p className="text-sm text-graphite-300">{user.email}</p>
          </div>
          <AdminNav />
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}