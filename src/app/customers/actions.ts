"use server";

import { createClient } from "@/lib/supabase/server";
import { getPublishedTestimonials } from "@/lib/queries";
import { TESTIMONIALS_PAGE_SIZE } from "@/lib/constants";
import type { Testimonial } from "@/lib/types";

export async function loadMoreTestimonials(offset: number): Promise<Testimonial[]> {
  const supabase = await createClient();
  return getPublishedTestimonials(supabase, { limit: TESTIMONIALS_PAGE_SIZE, offset });
}