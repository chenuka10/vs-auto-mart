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

/**
 * Make sure the current user is allowed to manage testimonials.
 *
 * IMPORTANT:
 * Replace this with however your app actually identifies admins.
 * This example assumes a `profiles` table containing `role`.
 */
async function requireAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Unauthorized.");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !["admin", "owner", "staff"].includes(profile?.role)) {
    throw new Error("Forbidden.");
  }

  return supabase;
}

/**
 * Validate and normalize testimonial input on the server.
 */
function validateInput(input: TestimonialInput): TestimonialInput {
  const reviewer_name = input.reviewer_name.trim();
  const review_text = input.review_text?.trim() || null;
  const photo_url = input.photo_url?.trim() || null;
  const video_url = input.video_url?.trim() || null;

  if (!reviewer_name) {
    throw new Error("Reviewer name is required.");
  }

  if (reviewer_name.length > 120) {
    throw new Error("Reviewer name is too long.");
  }

  if (
    input.rating !== null &&
    (!Number.isInteger(input.rating) ||
      input.rating < 1 ||
      input.rating > 5)
  ) {
    throw new Error("Rating must be a whole number from 1 to 5.");
  }

  if (review_text && review_text.length > 5000) {
    throw new Error("Review text is too long.");
  }

  if (video_url) {
    try {
      const url = new URL(video_url);

      if (!["http:", "https:"].includes(url.protocol)) {
        throw new Error();
      }
    } catch {
      throw new Error("Invalid video URL.");
    }
  }

  if (photo_url) {
    try {
      const url = new URL(photo_url);

      if (!["http:", "https:"].includes(url.protocol)) {
        throw new Error();
      }
    } catch {
      throw new Error("Invalid photo URL.");
    }
  }

  return {
    reviewer_name,
    rating: input.rating,
    review_text,
    photo_url,
    video_url,
    is_published: Boolean(input.is_published),
  };
}

export async function createTestimonial(input: TestimonialInput) {
  const supabase = await requireAdmin();
  const validated = validateInput(input);

  const { error } = await supabase
    .from("testimonials")
    .insert(validated);

  if (error) {
    console.error("Failed to create testimonial:", error);
    throw new Error("Failed to create testimonial.");
  }

  revalidatePath("/admin/testimonials");
  revalidatePath("/reviews");
}

export async function updateTestimonial(
  id: string,
  input: TestimonialInput
) {
  const supabase = await requireAdmin();
  const validated = validateInput(input);

  if (!id) {
    throw new Error("Testimonial ID is required.");
  }

  const { data, error } = await supabase
    .from("testimonials")
    .update(validated)
    .eq("id", id)
    .select("id")
    .single();

  if (error || !data) {
    console.error("Failed to update testimonial:", error);
    throw new Error("Testimonial not found or update failed.");
  }

  revalidatePath("/admin/testimonials");
  revalidatePath(`/admin/testimonials/${id}/edit`);
  revalidatePath("/reviews");
}

export async function togglePublish(
  id: string,
  is_published: boolean
) {
  const supabase = await requireAdmin();

  if (!id) {
    throw new Error("Testimonial ID is required.");
  }

  const { data, error } = await supabase
    .from("testimonials")
    .update({
      is_published: Boolean(is_published),
    })
    .eq("id", id)
    .select("id")
    .single();

  if (error || !data) {
    console.error("Failed to toggle testimonial:", error);
    throw new Error("Testimonial not found or update failed.");
  }

  revalidatePath("/admin/testimonials");
  revalidatePath("/reviews");
}

export async function deleteTestimonial(id: string) {
  const supabase = await requireAdmin();

  if (!id) {
    throw new Error("Testimonial ID is required.");
  }

  // Get the image URL before deleting the row.
  const { data: testimonial, error: fetchError } = await supabase
    .from("testimonials")
    .select("photo_url")
    .eq("id", id)
    .single();

  if (fetchError || !testimonial) {
    throw new Error("Testimonial not found.");
  }

  const { error } = await supabase
    .from("testimonials")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Failed to delete testimonial:", error);
    throw new Error("Failed to delete testimonial.");
  }

  /*
   * IMPORTANT:
   * If you're storing Cloudinary assets, delete the corresponding
   * Cloudinary asset here as well.
   *
   * Do NOT try to do this from the browser with Cloudinary secrets.
   */

  revalidatePath("/admin/testimonials");
  revalidatePath("/reviews");
}