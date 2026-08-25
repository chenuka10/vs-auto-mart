"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error("Unauthorized.");
  return supabase;
}

function parseUrls(raw: string): string[] {
  return raw.split(/\n|,/).map((u) => u.trim()).filter(Boolean);
}

export interface CustomerStoryInput {
  customer_name: string;
  vehicle_label: string | null;
  delivery_date: string;
  message: string | null;
  video_url: string | null;
  is_published: boolean;
  photo_urls: string[];
}

export interface BulkStoryItem {
  image_url: string;
  customer_name?: string;
  vehicle_label?: string;
  delivery_date?: string;
  is_published?: boolean;
}

export async function createBulkCustomerStories(items: BulkStoryItem[]) {
  const supabase = await requireAdmin();

  if (!items || items.length === 0) {
    return { error: "No photos provided." };
  }

  const today = new Date().toISOString().slice(0, 10);

  const storiesToInsert = items.map((item) => ({
    id: crypto.randomUUID(),
    customer_name: item.customer_name?.trim() || "Happy Customer",
    vehicle_label: item.vehicle_label?.trim() || null,
    delivery_date: item.delivery_date?.trim() || today,
    message: null,
    video_url: null,
    is_published: item.is_published !== false,
  }));

  const { error: storiesErr } = await supabase
    .from("customer_stories")
    .insert(storiesToInsert);

  if (storiesErr) {
    console.error("Failed to bulk create customer stories:", storiesErr);
    return { error: storiesErr.message };
  }

  const photosToInsert = items.map((item, idx) => ({
    story_id: storiesToInsert[idx].id,
    image_url: item.image_url,
    sort_order: 0,
  }));

  const { error: photosErr } = await supabase
    .from("customer_story_photos")
    .insert(photosToInsert);

  if (photosErr) {
    console.error("Failed to insert customer story photos:", photosErr);
  }

  revalidatePath("/admin/customer-stories");
  revalidatePath("/customers");
  revalidatePath("/");
  return { success: true, count: storiesToInsert.length };
}

export async function createCustomerStory(formData: FormData) {
  const supabase = await requireAdmin();

  const customer_name = String(formData.get("customer_name") ?? "").trim() || "Happy Customer";
  const delivery_date = String(formData.get("delivery_date") ?? "").trim() || new Date().toISOString().slice(0, 10);

  const photo_urls = parseUrls(String(formData.get("photo_urls") ?? ""));

  const { data: story, error: storyErr } = await supabase
    .from("customer_stories")
    .insert({
      customer_name,
      vehicle_label: String(formData.get("vehicle_label") ?? "").trim() || null,
      delivery_date,
      message: String(formData.get("message") ?? "").trim() || null,
      video_url: String(formData.get("video_url") ?? "").trim() || null,
      is_published: formData.get("is_published") === "on",
    })
    .select("id")
    .single();

  if (storyErr || !story) {
    return { error: storyErr?.message ?? "Failed to create story." };
  }

  if (photo_urls.length > 0) {
    await supabase.from("customer_story_photos").insert(
      photo_urls.map((image_url, sort_order) => ({
        story_id: story.id,
        image_url,
        sort_order,
      }))
    );
  }

  revalidatePath("/admin/customer-stories");
  revalidatePath("/customers");
  revalidatePath("/");
  return { success: true };
}

export async function updateCustomerStory(id: string, formData: FormData) {
  const supabase = await requireAdmin();

  const customer_name = String(formData.get("customer_name") ?? "").trim() || "Happy Customer";
  const delivery_date = String(formData.get("delivery_date") ?? "").trim() || new Date().toISOString().slice(0, 10);

  await supabase
    .from("customer_stories")
    .update({
      customer_name,
      vehicle_label: String(formData.get("vehicle_label") ?? "").trim() || null,
      delivery_date,
      message: String(formData.get("message") ?? "").trim() || null,
      video_url: String(formData.get("video_url") ?? "").trim() || null,
      is_published: formData.get("is_published") === "on",
    })
    .eq("id", id);

  /* Replace photos: delete old ones then insert fresh list */
  const new_urls = parseUrls(String(formData.get("photo_urls") ?? ""));
  await supabase.from("customer_story_photos").delete().eq("story_id", id);
  if (new_urls.length > 0) {
    await supabase.from("customer_story_photos").insert(
      new_urls.map((image_url, sort_order) => ({
        story_id: id,
        image_url,
        sort_order,
      }))
    );
  }

  revalidatePath("/admin/customer-stories");
  revalidatePath(`/admin/customer-stories/${id}/edit`);
  revalidatePath("/customers");
  revalidatePath("/");
  return { success: true };
}

export async function toggleStoryPublish(id: string, is_published: boolean) {
  const supabase = await requireAdmin();
  await supabase
    .from("customer_stories")
    .update({ is_published })
    .eq("id", id);

  revalidatePath("/admin/customer-stories");
  revalidatePath("/customers");
  revalidatePath("/");
}

export async function deleteCustomerStory(id: string) {
  const supabase = await requireAdmin();
  await supabase.from("customer_story_photos").delete().eq("story_id", id);
  await supabase.from("customer_stories").delete().eq("id", id);

  revalidatePath("/admin/customer-stories");
  revalidatePath("/customers");
  revalidatePath("/");
}
