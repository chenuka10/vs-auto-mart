import { createVehicle } from "../../actions";

const inputClass = "rounded-plate border border-graphite-700/15 px-3 py-2 text-sm";
const labelClass = "flex flex-col gap-1 text-sm font-medium text-graphite-700";

export default function AddVehiclePage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold">Add Vehicle</h1>
      <p className="mt-1 text-sm text-graphite-500">
        Paste image URLs from Cloudinary, one per line, in the order you want them shown.
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
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="hybrid">Hybrid</option>
            <option value="electric">Electric</option>
          </select>
        </label>
        <label className={labelClass}>
          Transmission
          <select name="transmission" required className={inputClass}>
            <option value="automatic">Automatic</option>
            <option value="manual">Manual</option>
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

        <label className={`${labelClass} sm:col-span-2`}>
          Photo URLs (one per line)
          <textarea name="image_urls" rows={4} className={inputClass} placeholder="https://res.cloudinary.com/..." />
        </label>

        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input type="checkbox" name="is_featured" />
          Feature this vehicle on the homepage
        </label>

        <button
          type="submit"
          className="mt-2 rounded-plate bg-graphite-950 px-5 py-2.5 text-sm font-semibold text-paper hover:bg-graphite-900 sm:col-span-2"
        >
          Publish Vehicle
        </button>
      </form>
    </div>
  );
}
