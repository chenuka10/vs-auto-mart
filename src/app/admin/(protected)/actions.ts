"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { vehicleSlug } from "@/lib/utils";
import type { VehicleStatus } from "@/lib/types";

function parseImageUrls(raw: string): string[] {
  return raw
    .split(/\n|,/)
    .map((url) => url.trim())
    .filter(Boolean);
}

export async function createVehicle(formData: FormData) {
  const supabase = await createClient();

  const brand = String(formData.get("brand"));
  const model = String(formData.get("model"));
  const year = Number(formData.get("year"));
  const imageUrls = parseImageUrls(String(formData.get("image_urls") ?? ""));

  const { data: vehicle, error } = await supabase
    .from("vehicles")
    .insert({
      brand,
      model,
      year,
      slug: vehicleSlug(brand, model, year),
      price: Number(formData.get("price")),
      mileage_km: Number(formData.get("mileage_km")),
      fuel: String(formData.get("fuel")),
      transmission: String(formData.get("transmission")),
      engine_capacity: String(formData.get("engine_capacity") ?? "") || null,
      colour: String(formData.get("colour") ?? "") || null,
      condition: String(formData.get("condition") ?? "") || null,
      description: String(formData.get("description") ?? "") || null,
      location: String(formData.get("location") ?? "") || null,
      is_featured: formData.get("is_featured") === "on",
      video_url: String(formData.get("video_url") ?? "") || null,
    })
    .select("id")
    .single();

  if (error || !vehicle) {
    throw new Error(error?.message ?? "Failed to create vehicle");
  }

  if (imageUrls.length > 0) {
    await supabase.from("vehicle_images").insert(
      imageUrls.map((image_url, index) => ({
        vehicle_id: vehicle.id,
        image_url,
        sort_order: index,
      }))
    );
  }

  revalidatePath("/admin");
  revalidatePath("/inventory");
  revalidatePath("/");
  redirect("/admin");
}

export async function updateVehicleStatus(id: string, status: VehicleStatus) {
  const supabase = await createClient();
  await supabase.from("vehicles").update({ status }).eq("id", id);

  revalidatePath("/admin");
  revalidatePath("/inventory");
  revalidatePath("/");
}

export async function deleteVehicle(id: string) {
  const supabase = await createClient();
  await supabase.from("vehicles").delete().eq("id", id);

  revalidatePath("/admin");
  revalidatePath("/inventory");
}

export async function updateVehicle(id: string, formData: FormData) {
  const supabase = await createClient();

  await supabase
    .from("vehicles")
    .update({
      price: Number(formData.get("price")),
      mileage_km: Number(formData.get("mileage_km")),
      description: String(formData.get("description") ?? "") || null,
      is_featured: formData.get("is_featured") === "on",
      condition: String(formData.get("condition") ?? "") || null,
    })
    .eq("id", id);

  const newImageUrls = parseImageUrls(String(formData.get("image_urls") ?? ""));
  if (newImageUrls.length > 0) {
    await supabase.from("vehicle_images").insert(
      newImageUrls.map((image_url, index) => ({
        vehicle_id: id,
        image_url,
        sort_order: 100 + index,
      }))
    );
  }

  revalidatePath("/admin");
  revalidatePath("/inventory");
  redirect("/admin");
}
