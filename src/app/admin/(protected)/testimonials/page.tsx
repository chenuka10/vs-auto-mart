import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { togglePublish, deleteTestimonial } from "./actions";
import type { Testimonial } from "@/lib/types";

async function getAllTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });
  return (data ?? []) as Testimonial[];
}

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonials();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Testimonials</h1>
        <Link
          href="/admin/testimonials/new"
          className="rounded-lg bg-brass-600 px-4 py-2 text-sm font-medium text-white hover:bg-brass-700"
        >
          Add Testimonial
        </Link>
      </div>

      <table className="mt-6 w-full text-left text-sm">
        <thead className="border-b border-graphite-700/10 text-graphite-500">
          <tr>
            <th className="py-2">Reviewer</th>
            <th className="py-2">Rating</th>
            <th className="py-2">Status</th>
            <th className="py-2">Created</th>
            <th className="py-2" />
          </tr>
        </thead>
        <tbody>
          {testimonials.map((t) => (
            <tr key={t.id} className="border-b border-graphite-700/10">
              <td className="py-3">{t.reviewer_name}</td>
              <td className="py-3">{t.rating ?? "—"}</td>
              <td className="py-3">
                <form action={togglePublish.bind(null, t.id, !t.is_published)}>
                  <button
                    type="submit"
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      t.is_published ? "bg-green-100 text-green-700" : "bg-graphite-100 text-graphite-500"
                    }`}
                  >
                    {t.is_published ? "Published" : "Draft"}
                  </button>
                </form>
              </td>
              <td className="py-3 text-graphite-500">
                {new Date(t.created_at).toLocaleDateString("en-LK")}
              </td>
              <td className="py-3 text-right">
                <Link href={`/admin/testimonials/${t.id}/edit`} className="text-brass-600 hover:underline">
                  Edit
                </Link>
                <form action={deleteTestimonial.bind(null, t.id)} className="inline">
                  <button type="submit" className="ml-4 text-red-600 hover:underline">
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}