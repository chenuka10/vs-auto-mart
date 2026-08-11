import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateVehicle } from "../../../actions";
import PhotoManager from "@/components/admin/PhotoManger";
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";
import { sortVehicleImages } from "@/lib/utils";
import type { VehicleWithImages } from "@/lib/types";

const inputClass = "rounded-plate border border-graphite-700/15 px-3 py-2 text-sm";
const labelClass = "flex flex-col gap-1 text-sm font-medium text-graphite-700";

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("vehicles")
    .select("*, vehicle_images(*)")
    .eq("id", id)
    .single();
  const vehicle = data as VehicleWithImages | null;
  if (!vehicle) notFound();

  const updateWithId = updateVehicle.bind(null, id);

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold">
        Edit {vehicle.brand} {vehicle.model} ({vehicle.year})
      </h1>
      <p className="mt-1 text-sm text-graphite-500">
        Brand, model, and year are fixed after creation. Upload new photos to append to the gallery.
      </p>

      <div className="mt-6">
        <p className="text-sm font-medium text-graphite-700">Photos</p>
        <p className="text-xs text-graphite-500">
          Click a photo to make it the cover shown on the vehicle card. The cover photo is outlined in brass.
        </p>
        <div className="mt-3">
          <PhotoManager vehicleId={vehicle.id} images={sortVehicleImages(vehicle.vehicle_images ?? [])} />
        </div>
      </div>

      <form action={updateWithId} className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Price (Rs.)
          <input name="price" type="number" required defaultValue={vehicle.price} className={inputClass} />
        </label>
        <label className={labelClass}>
          Mileage (km)
          <input name="mileage_km" type="number" required defaultValue={vehicle.mileage_km} className={inputClass} />
        </label>
        <label className={labelClass}>
          Condition
          <input name="condition" defaultValue={vehicle.condition ?? ""} className={inputClass} />
        </label>
        <label className={labelClass}>
          Plate number <span className="font-normal text-graphite-400">(admin only, never shown publicly)</span>
          <input
            name="registration_no"
            defaultValue={vehicle.registration_no ?? ""}
            placeholder="WP CAB-1234"
            className={inputClass}
          />
        </label>

        <label className={`${labelClass} sm:col-span-2`}>
          Description
          <textarea
            name="description"
            rows={4}
            defaultValue={vehicle.description ?? ""}
            className={inputClass}
          />
        </label>

        <div className="sm:col-span-2">
          <span className="text-sm font-medium text-graphite-700">Add More Photos</span>
          <div className="mt-1">
            <CloudinaryUploader name="image_urls" folder="vehicles" label="Upload New Photos" />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input type="checkbox" name="is_featured" defaultChecked={vehicle.is_featured} />
          Feature this vehicle on the homepage
        </label>

        <button
          type="submit"
          className="mt-2 rounded-plate bg-graphite-950 px-5 py-2.5 text-sm font-semibold text-paper hover:bg-graphite-900 sm:col-span-2"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}