import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TestimonialForm } from "../../TestimonialForm";
import type { Testimonial } from "@/lib/types";

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data } = await supabase.from("testimonials").select("*").eq("id", params.id).single();
  if (!data) notFound();

  return (
    <div className="p-6">
      <h1 className="font-display text-2xl font-semibold">Edit Testimonial</h1>
      <TestimonialForm testimonial={data as Testimonial} />
    </div>
  );
}