import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TestimonialForm } from "../../TestimonialForm";
import type { Testimonial } from "@/lib/types";

interface EditTestimonialPageProps {
  params: {
    id: string;
  };
}

export default async function EditTestimonialPage({
  params,
}: EditTestimonialPageProps) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) {
    notFound();
  }

  const testimonial = data as Testimonial;

  return (
    <main className="text-graphite-100">
      <div className="max-w-3xl">
        <div className="mb-4 flex items-center gap-3 text-sm">
          <Link
            href="/admin/testimonials"
            className="flex items-center gap-1 text-graphite-400 hover:text-brass-400 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Reviews
          </Link>
          <span className="text-graphite-600">/</span>
          <span className="text-graphite-300 truncate max-w-[200px]">{testimonial.reviewer_name}</span>
        </div>

        <h1 className="mt-2 font-display text-2xl font-semibold text-graphite-100 sm:text-3xl">
          Edit Testimonial — {testimonial.reviewer_name}
        </h1>

        <p className="mt-2 text-sm text-graphite-400">
          Update the customer review details and publishing status.
        </p>

        <TestimonialForm testimonial={testimonial} />
      </div>
    </main>
  );
}