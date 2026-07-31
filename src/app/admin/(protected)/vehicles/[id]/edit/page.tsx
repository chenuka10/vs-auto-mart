import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateVehicle } from "../../../actions";
import type { Vehicle } from "@/lib/types";

const inputClass =
  "rounded-plate border border-white/10 bg-graphite-950 px-3 py-2.5 text-sm text-paper outline-none transition-colors duration-200 placeholder:text-graphite-500 focus:border-brass-500/60 focus:ring-2 focus:ring-brass-500/20";
const labelClass = "flex flex-col gap-1.5 text-sm font-medium text-graphite-300";

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("vehicles").select("*").eq("id", id).single();
  const vehicle = data as Vehicle | null;
  if (!vehicle) notFound();

  const updateWithId = updateVehicle.bind(null, id);

  return (
    <div className="min-h-screen bg-graphite-950 px-6 py-10 text-paper">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-400">
          Inventory
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold">
          Edit {vehicle.brand} {vehicle.model} ({vehicle.year})
        </h1>
        <p className="mt-1 text-sm text-graphite-300">
          Brand, model, and year are fixed after creation. Add new photo URLs to append to the gallery.
        </p>

        <form
          action={updateWithId}
          className="mt-6 grid gap-4 rounded-2xl border border-white/10 bg-charcoal-900 p-6 shadow-2xl shadow-black/30 sm:grid-cols-2"
        >
          <label className={labelClass}>
            Price (Rs.)
            <input name="price" type="number" required defaultValue={vehicle.price} className={inputClass} />
          </label>
          <label className={labelClass}>
            Mileage (km)
            <input
              name="mileage_km"
              type="number"
              required
              defaultValue={vehicle.mileage_km}
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Condition
            <input name="condition" defaultValue={vehicle.condition ?? ""} className={inputClass} />
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

          <label className={`${labelClass} sm:col-span-2`}>
            Add more photo URLs (one per line)
            <textarea
              name="image_urls"
              rows={3}
              className={inputClass}
              placeholder="https://res.cloudinary.com/..."
            />
          </label>

          <label className="flex items-center gap-2 text-sm text-graphite-300 sm:col-span-2">
            <input
              type="checkbox"
              name="is_featured"
              defaultChecked={vehicle.is_featured}
              className="h-4 w-4 rounded border-white/20 bg-graphite-950 text-brass-500 focus:ring-brass-500/40"
            />
            Feature this vehicle on the homepage
          </label>

          <button
            type="submit"
            className="mt-2 rounded-plate bg-brass-500 px-5 py-2.5 text-sm font-semibold text-graphite-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brass-400 hover:shadow-[0_8px_24px_-4px_rgba(200,169,81,0.4)] sm:col-span-2"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}