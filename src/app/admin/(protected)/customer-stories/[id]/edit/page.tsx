import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CustomerStoryForm } from "../../CustomerStoryForm";
import { updateCustomerStory } from "../../actions";
import type { CustomerStory } from "@/lib/types";

interface Props {
  params: { id: string };
}

async function getStory(id: string): Promise<CustomerStory | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("customer_stories")
    .select("*, customer_story_photos(*)")
    .eq("id", id)
    .single();
  return data as CustomerStory | null;
}

export default async function EditCustomerStoryPage({ params }: Props) {
  const story = await getStory(params.id);
  if (!story) notFound();

  const saveAction = updateCustomerStory.bind(null, story.id);

  return (
    <div className="text-graphite-100">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/customer-stories"
          className="flex items-center gap-1.5 text-sm text-graphite-400 hover:text-brass-400 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Happy Customers
        </Link>
        <span className="text-graphite-600">/</span>
        <span className="text-sm text-graphite-300 truncate max-w-[200px]">{story.customer_name}</span>
      </div>

      <h1 className="mt-6 font-display text-2xl font-semibold text-graphite-100">
        Edit Story — {story.customer_name}
      </h1>
      <p className="mt-1 text-sm text-graphite-400">
        Update delivery details, swap photos, or change the video link. Changes go live instantly on{" "}
        <a href="/customers" target="_blank" className="text-brass-400 hover:underline">Happy Customers</a>.
      </p>

      <CustomerStoryForm story={story} onSave={saveAction} />
    </div>
  );
}
