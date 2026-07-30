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
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center justify-between border-b border-graphite-700/10 pb-6">
        <div>
          <p className="font-display text-xl font-semibold">Admin Dashboard</p>
          <p className="text-sm text-graphite-500">{user.email}</p>
        </div>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link href="/admin" className="hover:text-brass-600">Vehicles</Link>
          <Link href="/admin/vehicles/new" className="hover:text-brass-600">Add Vehicle</Link>
          <SignOutButton />
        </nav>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}
