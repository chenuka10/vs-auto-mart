import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { toggleStoryPublish, deleteCustomerStory } from "./actions";
import type { CustomerStory } from "@/lib/types";

async function getAllStories(): Promise<CustomerStory[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("customer_stories")
    .select("*, customer_story_photos(*)")
    .order("delivery_date", { ascending: false });
  return (data ?? []) as CustomerStory[];
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-LK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminCustomerStoriesPage() {
  const stories = await getAllStories();
  const published = stories.filter((s) => s.is_published).length;
  const drafts = stories.length - published;

  return (
    <main className="min-h-screen p-6 sm:p-8 lg:p-10">
      <div className="mx-auto max-w-7xl">

        {/* ── Header ── */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brass-600">
              Content Management
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold text-zinc-100">
              Happy Customers
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              Manage customer delivery stories, photos, and videos shown on the public{" "}
              <Link href="/customers" target="_blank" className="text-brass-400 hover:underline">
                Happy Customers
              </Link>{" "}
              page.
            </p>
          </div>

          <Link
            href="/admin/customer-stories/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brass-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brass-700 hover:shadow-md"
          >
            <span className="text-base leading-none">+</span>
            Add Customer Story
          </Link>
        </div>

        {/* ── Stats ── */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total Stories", value: stories.length, color: "text-white" },
            { label: "Published", value: published, color: "text-emerald-400", border: "border-emerald-500/10 bg-emerald-500/[0.04]" },
            { label: "Drafts", value: drafts, color: "text-zinc-300" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 ${stat.border ?? ""}`}
            >
              <p className={`text-xs uppercase tracking-[0.16em] ${stat.color === "text-emerald-400" ? "text-emerald-400/70" : "text-zinc-500"}`}>
                {stat.label}
              </p>
              <p className={`mt-2 font-display text-2xl font-semibold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* ── Desktop Table ── */}
        {stories.length > 0 ? (
          <>
            <div className="mt-8 hidden overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/70 md:block">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-zinc-800 bg-zinc-900/60 text-xs uppercase tracking-[0.12em] text-zinc-500">
                    <tr>
                      <th className="px-5 py-4">Customer</th>
                      <th className="px-5 py-4">Vehicle</th>
                      <th className="px-5 py-4">Delivered</th>
                      <th className="px-5 py-4">Media</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stories.map((story) => {
                      const cover = (story.customer_story_photos ?? [])[0];
                      const photoCount = (story.customer_story_photos ?? []).length;
                      return (
                        <tr
                          key={story.id}
                          className="border-b border-zinc-800/70 last:border-0 transition-colors hover:bg-white/[0.02]"
                        >
                          {/* Customer */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                                {cover ? (
                                  <Image src={cover.image_url} alt="" fill sizes="44px" className="object-cover" />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center font-display text-sm font-semibold text-zinc-500">
                                    {story.customer_name[0]?.toUpperCase()}
                                  </div>
                                )}
                              </div>
                              <p className="font-medium text-zinc-100">{story.customer_name}</p>
                            </div>
                          </td>

                          {/* Vehicle */}
                          <td className="px-5 py-4 text-zinc-400">
                            {story.vehicle_label ?? <span className="text-zinc-600">—</span>}
                          </td>

                          {/* Date */}
                          <td className="px-5 py-4 text-xs text-zinc-500">
                            {formatDate(story.delivery_date)}
                          </td>

                          {/* Media badges */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              {photoCount > 0 && (
                                <span className="rounded-full bg-zinc-800 px-2.5 py-1 text-[10px] font-medium text-zinc-300">
                                  📷 {photoCount}
                                </span>
                              )}
                              {story.video_url && (
                                <span className="rounded-full bg-zinc-800 px-2.5 py-1 text-[10px] font-medium text-zinc-300">
                                  🎥 Video
                                </span>
                              )}
                              {photoCount === 0 && !story.video_url && (
                                <span className="text-zinc-600 text-xs">None</span>
                              )}
                            </div>
                          </td>

                          {/* Publish toggle */}
                          <td className="px-5 py-4">
                            <form action={toggleStoryPublish.bind(null, story.id, !story.is_published)}>
                              <button
                                type="submit"
                                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                                  story.is_published
                                    ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                                }`}
                              >
                                {story.is_published ? "Published" : "Draft"}
                              </button>
                            </form>
                          </td>

                          {/* Actions */}
                          <td className="px-5 py-4">
                            <div className="flex items-center justify-end gap-4">
                              <Link
                                href={`/admin/customer-stories/${story.id}/edit`}
                                className="text-sm font-medium text-brass-500 hover:text-brass-400 transition-colors"
                              >
                                Edit
                              </Link>
                              <form action={deleteCustomerStory.bind(null, story.id)}>
                                <button
                                  type="submit"
                                  className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
                                >
                                  Delete
                                </button>
                              </form>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Mobile Cards ── */}
            <div className="mt-8 space-y-4 md:hidden">
              {stories.map((story) => {
                const cover = (story.customer_story_photos ?? [])[0];
                const photoCount = (story.customer_story_photos ?? []).length;
                return (
                  <article key={story.id} className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
                    <div className="flex items-start gap-3">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-zinc-800">
                        {cover ? (
                          <Image src={cover.image_url} alt="" fill sizes="56px" className="object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center font-display text-lg font-semibold text-zinc-500">
                            {story.customer_name[0]?.toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-zinc-100">{story.customer_name}</p>
                        {story.vehicle_label && <p className="mt-0.5 text-sm text-zinc-400">{story.vehicle_label}</p>}
                        <p className="mt-1 text-xs text-zinc-500">{formatDate(story.delivery_date)}</p>
                        <div className="mt-2 flex gap-2">
                          {photoCount > 0 && <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-300">📷 {photoCount}</span>}
                          {story.video_url && <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-300">🎥 Video</span>}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-4">
                      <form action={toggleStoryPublish.bind(null, story.id, !story.is_published)}>
                        <button type="submit" className={`rounded-full px-3 py-1.5 text-xs font-medium ${story.is_published ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-800 text-zinc-400"}`}>
                          {story.is_published ? "Published" : "Draft"}
                        </button>
                      </form>
                      <div className="flex gap-4">
                        <Link href={`/admin/customer-stories/${story.id}/edit`} className="text-sm font-medium text-brass-500">Edit</Link>
                        <form action={deleteCustomerStory.bind(null, story.id)}>
                          <button type="submit" className="text-sm font-medium text-red-400">Delete</button>
                        </form>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        ) : (
          /* Empty state */
          <div className="mt-8 rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/40 px-6 py-20 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900">
              <svg className="h-7 w-7 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="font-display text-lg font-semibold text-zinc-200">No stories yet</p>
            <p className="mt-2 text-sm text-zinc-500">Add your first customer delivery story to get started.</p>
            <Link href="/admin/customer-stories/new" className="mt-5 inline-flex rounded-lg bg-brass-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brass-700 transition-colors">
              + Add Customer Story
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
