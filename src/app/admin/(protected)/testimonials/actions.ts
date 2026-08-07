"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

interface TestimonialInput {
  reviewer_name: string;
  rating: number | null;
  review_text: string | null;
  photo_url: string | null;
  video_url: string | null;
  is_published: boolean;
}

export async function createTestimonial(input: TestimonialInput) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").insert(input);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/testimonials");
  revalidatePath("/reviews");
}

export async function updateTestimonial(id: string, input: TestimonialInput) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").update(input).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/testimonials");
  revalidatePath("/reviews");
}

export async function togglePublish(id: string, is_published: boolean) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").update({ is_published }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/testimonials");
  revalidatePath("/reviews");
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/testimonials");
  revalidatePath("/reviews");
}