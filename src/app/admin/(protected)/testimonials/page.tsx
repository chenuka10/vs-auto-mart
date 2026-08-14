import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { togglePublish, deleteTestimonial } from "./actions";
import type { Testimonial } from "@/lib/types";

async function getAllTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load testimonials:", error);
    return [];
  }

  return (data ?? []) as Testimonial[];
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-LK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function renderStars(rating: number | null) {
  if (!rating) return "—";

  return (
    <span
      className="text-amber-500"
      aria-label={`${rating} out of 5 stars`}
    >
      {"★".repeat(rating)}
      <span className="text-zinc-300">
        {"★".repeat(5 - rating)}
      </span>
    </span>
  );
}

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonials();

  const publishedCount = testimonials.filter(
    (testimonial) => testimonial.is_published
  ).length;

  const draftCount = testimonials.length - publishedCount;

  return (
    <main className="min-h-screen p-6 sm:p-8 lg:p-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brass-600">
              Content Management
            </p>

            <h1 className="mt-2 font-display text-3xl font-semibold text-zinc-100">
              Testimonials
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Manage customer reviews shown across the VS Auto Mart website.
            </p>
          </div>

          <Link
            href="/admin/testimonials/new"
            className="
              inline-flex items-center justify-center gap-2
              rounded-lg bg-brass-600 px-4 py-2.5
              text-sm font-medium text-white
              shadow-sm
              transition-all duration-200
              hover:-translate-y-0.5
              hover:bg-brass-700
              hover:shadow-md
            "
          >
            <span className="text-base leading-none">+</span>
            Add Testimonial
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
              Total
            </p>
            <p className="mt-2 font-display text-2xl font-semibold text-white">
              {testimonials.length}
            </p>
          </div>

          <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/[0.04] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-emerald-400/70">
              Published
            </p>
            <p className="mt-2 font-display text-2xl font-semibold text-emerald-400">
              {publishedCount}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
              Drafts
            </p>
            <p className="mt-2 font-display text-2xl font-semibold text-zinc-300">
              {draftCount}
            </p>
          </div>
        </div>

        {/* Desktop table */}
        <div className="mt-8 hidden overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/70 md:block">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-800 bg-zinc-900/60 text-xs uppercase tracking-[0.12em] text-zinc-500">
                <tr>
                  <th className="px-5 py-4">Reviewer</th>
                  <th className="px-5 py-4">Rating</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Created</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {testimonials.map((testimonial) => (
                  <tr
                    key={testimonial.id}
                    className="border-b border-zinc-800/70 last:border-0 transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                          {testimonial.photo_url ? (
                            <Image
                              src={testimonial.photo_url}
                              alt=""
                              fill
                              sizes="44px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center font-display text-sm font-semibold text-zinc-500">
                              {testimonial.reviewer_name
                                .split(" ")
                                .slice(0, 2)
                                .map((name) => name[0])
                                .join("")
                                .toUpperCase()}
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="font-medium text-zinc-100">
                            {testimonial.reviewer_name}
                          </p>

                          {testimonial.review_text && (
                            <p className="mt-0.5 max-w-md truncate text-xs text-zinc-500">
                              {testimonial.review_text}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      {renderStars(testimonial.rating)}
                    </td>

                    <td className="px-5 py-4">
                      <form
                        action={togglePublish.bind(
                          null,
                          testimonial.id,
                          !testimonial.is_published
                        )}
                      >
                        <button
                          type="submit"
                          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                            testimonial.is_published
                              ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                          }`}
                        >
                          {testimonial.is_published
                            ? "Published"
                            : "Draft"}
                        </button>
                      </form>
                    </td>

                    <td className="px-5 py-4 text-xs text-zinc-500">
                      {formatDate(testimonial.created_at)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-4">
                        <Link
                          href={`/admin/testimonials/${testimonial.id}/edit`}
                          className="text-sm font-medium text-brass-500 transition-colors hover:text-brass-400"
                        >
                          Edit
                        </Link>

                        <form
                          action={deleteTestimonial.bind(
                            null,
                            testimonial.id
                          )}
                        >
                          <button
                            type="submit"
                            className="text-sm font-medium text-red-400 transition-colors hover:text-red-300"
                          >
                            Delete
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="mt-8 space-y-4 md:hidden">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4"
            >
              <div className="flex gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                  {testimonial.photo_url ? (
                    <Image
                      src={testimonial.photo_url}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-display text-sm font-semibold text-zinc-500">
                      {testimonial.reviewer_name
                        .split(" ")
                        .slice(0, 2)
                        .map((name) => name[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-medium text-zinc-100">
                        {testimonial.reviewer_name}
                      </h2>

                      <p className="mt-1 text-xs text-zinc-500">
                        {formatDate(testimonial.created_at)}
                      </p>
                    </div>

                    {testimonial.rating && (
                      <span className="text-xs text-amber-500">
                        {"★".repeat(testimonial.rating)}
                      </span>
                    )}
                  </div>

                  {testimonial.review_text && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-400">
                      {testimonial.review_text}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-4">
                <form
                  action={togglePublish.bind(
                    null,
                    testimonial.id,
                    !testimonial.is_published
                  )}
                >
                  <button
                    type="submit"
                    className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                      testimonial.is_published
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {testimonial.is_published ? "Published" : "Draft"}
                  </button>
                </form>

                <div className="flex items-center gap-4">
                  <Link
                    href={`/admin/testimonials/${testimonial.id}/edit`}
                    className="text-sm font-medium text-brass-500"
                  >
                    Edit
                  </Link>

                  <form
                    action={deleteTestimonial.bind(
                      null,
                      testimonial.id
                    )}
                  >
                    <button
                      type="submit"
                      className="text-sm font-medium text-red-400"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {testimonials.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/40 px-6 py-16 text-center">
            <p className="font-display text-lg font-semibold text-zinc-200">
              No testimonials yet
            </p>

            <p className="mt-2 text-sm text-zinc-500">
              Add your first customer testimonial to get started.
            </p>

            <Link
              href="/admin/testimonials/new"
              className="mt-5 inline-flex rounded-lg bg-brass-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brass-700"
            >
              Add Testimonial
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}