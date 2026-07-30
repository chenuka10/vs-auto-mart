import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import type { CustomerStory } from "@/lib/types";

export const metadata = {
  title: "Happy Customers",
  description: "500+ happy customers and counting — real deliveries, real stories.",
};

async function getStories() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("customer_stories")
    .select("*, customer_story_photos(*)")
    .eq("is_published", true)
    .order("delivery_date", { ascending: false });
  return (data ?? []) as CustomerStory[];
}

export default async function CustomersPage() {
  const stories = await getStories();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-3xl font-semibold">500+ Happy Customers</h1>
      <p className="mt-2 max-w-xl text-graphite-500">
        Every delivery here is a real customer, a real vehicle, and real proof —
        this is the trust that keeps VS Auto Mart going.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <article
            key={story.id}
            className="overflow-hidden rounded-lg border border-graphite-700/10 bg-white"
          >
            <div className="relative aspect-[4/3] bg-graphite-100">
              {story.customer_story_photos?.[0] && (
                <Image
                  src={story.customer_story_photos[0].image_url}
                  alt={story.customer_name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="p-5">
              <h2 className="font-display font-semibold">
                Congratulations, {story.customer_name} 🎉
              </h2>
              {story.vehicle_label && (
                <p className="mt-1 text-sm text-graphite-500">{story.vehicle_label}</p>
              )}
              <p className="mt-1 text-xs uppercase tracking-wide text-brass-600">
                Delivered {new Date(story.delivery_date).toLocaleDateString("en-LK", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
              {story.message && (
                <p className="mt-3 text-sm italic text-graphite-700">&ldquo;{story.message}&rdquo;</p>
              )}
              {story.video_url && (
                <a
                  href={story.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-medium text-brass-600 hover:underline"
                >
                  Watch the delivery →
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
