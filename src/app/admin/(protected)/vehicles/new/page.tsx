import { createVehicle } from "../../actions";
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";

const inputClass =
  "rounded-plate border border-graphite-700/40 bg-graphite-900 px-3 py-2 text-sm text-graphite-100 placeholder:text-graphite-500 focus:border-graphite-500 focus:outline-none";
const labelClass = "flex flex-col gap-1 text-sm font-medium text-graphite-200";

export default function AddVehiclePage() {
  return (
    <div className="max-w-2xl text-graphite-100">
      <h1 className="font-display text-2xl font-semibold text-white">Add Vehicle</h1>
      <p className="mt-1 text-sm text-graphite-400">
        Upload the vehicle photos below. The first one becomes the cover photo shown on the
        vehicle card — you can change this later from the edit page.
      </p>

      <form action={createVehicle} className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Brand
          <input name="brand" required className={inputClass} placeholder="Suzuki" />
        </label>
        <label className={labelClass}>
          Model
          <input name="model" required className={inputClass} placeholder="Celerio" />
        </label>
        <label className={labelClass}>
          Year
          <input name="year" type="number" required className={inputClass} placeholder="2018" />
        </label>
        <label className={labelClass}>
          Price (Rs.)
          <input name="price" type="number" required className={inputClass} placeholder="5950000" />
        </label>
        <label className={labelClass}>
          Mileage (km)
          <input name="mileage_km" type="number" required className={inputClass} placeholder="65000" />
        </label>
        <label className={labelClass}>
          Fuel
          <select name="fuel" required className={inputClass}>
            <option value="petrol" className="bg-graphite-900 text-graphite-100">Petrol</option>
            <option value="diesel" className="bg-graphite-900 text-graphite-100">Diesel</option>
            <option value="hybrid" className="bg-graphite-900 text-graphite-100">Hybrid</option>
            <option value="electric" className="bg-graphite-900 text-graphite-100">Electric</option>
          </select>
        </label>
        <label className={labelClass}>
          Transmission
          <select name="transmission" required className={inputClass}>
            <option value="automatic" className="bg-graphite-900 text-graphite-100">Automatic</option>
            <option value="manual" className="bg-graphite-900 text-graphite-100">Manual</option>
          </select>
        </label>
        <label className={labelClass}>
          Engine capacity
          <input name="engine_capacity" className={inputClass} placeholder="998cc" />
        </label>
        <label className={labelClass}>
          Colour
          <input name="colour" className={inputClass} placeholder="Pearl White" />
        </label>
        <label className={labelClass}>
          Plate number <span className="font-normal text-graphite-400">(admin only)</span>
          <input name="registration_no" className={inputClass} placeholder="WP CAB-1234" />
        </label>
        <label className={labelClass}>
          Location
          <input name="location" className={inputClass} placeholder="Kadawatha" />
        </label>
        <label className={labelClass}>
          Condition
          <input name="condition" className={inputClass} placeholder="Excellent" />
        </label>
        <label className={labelClass}>
          Video URL (optional)
          <input name="video_url" className={inputClass} placeholder="https://facebook.com/..." />
        </label>

        <label className={`${labelClass} sm:col-span-2`}>
          Description
          <textarea
            name="description"
            rows={4}
            className={inputClass}
            placeholder="Well maintained Suzuki Celerio with excellent fuel economy..."
          />
        </label>

        <div className="sm:col-span-2">
          <span className="text-sm font-medium text-graphite-200">Vehicle Photos</span>
          <div className="mt-1">
            <CloudinaryUploader name="image_urls" folder="vehicles" label="Upload Vehicle Photos" />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-graphite-200 sm:col-span-2">
          <input type="checkbox" name="is_featured" className="accent-graphite-100" />
          Feature this vehicle on the homepage
        </label>

        <button
          type="submit"
          className="mt-2 rounded-plate bg-white px-5 py-2.5 text-sm font-semibold text-graphite-950 hover:bg-graphite-200 sm:col-span-2 transition-colors"
        >
          Publish Vehicle
        </button>
      </form>
    </div>
  );
}