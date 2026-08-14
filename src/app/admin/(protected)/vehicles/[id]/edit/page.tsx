import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateVehicle } from "../../../actions";
import PhotoManager from "@/components/admin/PhotoManger";
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";
import { sortVehicleImages } from "@/lib/utils";
import type { VehicleWithImages } from "@/lib/types";

const inputClass =
  "mt-1 w-full rounded-lg border border-zinc-800 bg-white px-3 py-2.5 text-sm text-graphite-900 placeholder:text-graphite-400 outline-none transition-all duration-200 focus:border-brass-500 focus:ring-1 focus:ring-brass-500";

const labelClass =
  "flex flex-col gap-1 text-sm font-medium text-graphite-700";

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select("*, vehicle_images(*)")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const vehicle = data as VehicleWithImages;
  const sortedImages = sortVehicleImages(vehicle.vehicle_images ?? []);

  const updateWithId = updateVehicle.bind(null, id);

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl">
        {/* Header */}
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brass-600">
            Vehicle Management
          </p>

          <h1 className="mt-2 font-display text-2xl font-semibold text-graphite-950 sm:text-3xl">
            Edit {vehicle.brand} {vehicle.model} ({vehicle.year})
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-graphite-500">
            Update pricing, mileage, condition, registration details, and
            vehicle media. Brand, model, and year remain fixed after creation.
          </p>
        </div>

        {/* Photo Management */}
        <section className="mt-8 rounded-2xl border border-graphite-700/10 bg-white p-5 shadow-sm sm:p-6">
          <div>
            <h2 className="font-display text-lg font-semibold text-graphite-900">
              Vehicle Photos
            </h2>

            <p className="mt-1 text-xs leading-5 text-graphite-500">
              Click a photo to make it the cover image shown on vehicle cards.
              The selected cover is highlighted in brass.
            </p>
          </div>

          <div className="mt-4">
            <PhotoManager
              vehicleId={vehicle.id}
              images={sortedImages}
            />
          </div>
        </section>

        {/* Vehicle Details */}
        <section className="mt-6 rounded-2xl border border-graphite-700/10 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="font-display text-lg font-semibold text-graphite-900">
              Vehicle Details
            </h2>

            <p className="mt-1 text-xs text-graphite-500">
              Update the information displayed to customers.
            </p>
          </div>

          <form action={updateWithId} className="grid gap-5 sm:grid-cols-2">
            {/* Price */}
            <label className={labelClass}>
              Price (Rs.)
              <input
                name="price"
                type="number"
                min="0"
                step="1"
                required
                defaultValue={vehicle.price}
                className={inputClass}
              />
            </label>

            {/* Mileage */}
            <label className={labelClass}>
              Mileage (km)
              <input
                name="mileage_km"
                type="number"
                min="0"
                step="1"
                required
                defaultValue={vehicle.mileage_km}
                className={inputClass}
              />
            </label>

            {/* Condition */}
            <label className={labelClass}>
              Condition
              <input
                name="condition"
                defaultValue={vehicle.condition ?? ""}
                placeholder="Excellent"
                className={inputClass}
              />
            </label>

            {/* Registration */}
            <label className={labelClass}>
              Plate number
              <span className="font-normal text-graphite-400">
                Admin only · never shown publicly
              </span>

              <input
                name="registration_no"
                defaultValue={vehicle.registration_no ?? ""}
                placeholder="WP CAB-1234"
                autoComplete="off"
                className={inputClass}
              />
            </label>

            {/* Description */}
            <label className={`${labelClass} sm:col-span-2`}>
              Description

              <textarea
                name="description"
                rows={5}
                defaultValue={vehicle.description ?? ""}
                placeholder="Describe the vehicle, condition, service history, features, and other important details..."
                className={`${inputClass} resize-y`}
              />
            </label>

            {/* Add Photos */}
            <div className="sm:col-span-2">
              <div>
                <p className="text-sm font-medium text-graphite-700">
                  Add More Photos
                </p>

                <p className="mt-1 text-xs text-graphite-500">
                  Newly uploaded images will be added to the existing vehicle
                  gallery.
                </p>
              </div>

              <div className="mt-3">
                <CloudinaryUploader
                  name="image_urls"
                  folder="vehicles"
                  label="Upload New Photos"
                />
              </div>
            </div>

            {/* Featured */}
            <label
              className="
                sm:col-span-2 flex cursor-pointer items-start gap-3
                rounded-xl border border-graphite-700/10
                bg-graphite-50 p-4
                transition-colors
                hover:bg-graphite-100
              "
            >
              <input
                type="checkbox"
                name="is_featured"
                defaultChecked={vehicle.is_featured}
                className="mt-0.5 h-4 w-4 rounded border-graphite-700/30 accent-brass-600"
              />

              <span>
                <span className="block text-sm font-medium text-graphite-800">
                  Feature this vehicle
                </span>

                <span className="mt-1 block text-xs leading-5 text-graphite-500">
                  Display this vehicle prominently on the homepage.
                </span>
              </span>
            </label>

            {/* Submit */}
            <div className="flex justify-end sm:col-span-2">
              <button
                type="submit"
                className="
                  inline-flex items-center justify-center
                  rounded-lg bg-graphite-950
                  px-6 py-2.5
                  text-sm font-semibold text-paper
                  shadow-sm
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:bg-graphite-900
                  hover:shadow-md
                  focus:outline-none
                  focus:ring-2
                  focus:ring-brass-500
                  focus:ring-offset-2
                "
              >
                Save Changes
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}