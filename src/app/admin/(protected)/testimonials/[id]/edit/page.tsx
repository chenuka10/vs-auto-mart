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
    <main className="min-h-screen p-6 sm:p-8 lg:p-10">
      <div className="mx-auto max-w-3xl">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brass-600">
            Testimonials
          </p>

          <h1 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
            Edit Testimonial
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Update the customer review details and publishing status.
          </p>
        </div>

        <TestimonialForm testimonial={testimonial} />
      </div>
    </main>
  );
}