"use client";

import { useState } from "react";
import Link from "next/link";
import { createVehicle } from "../../actions";
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";

const inputClass =
  "rounded-plate border border-graphite-700/40 bg-graphite-900 px-3 py-2 text-sm text-graphite-100 placeholder:text-graphite-500 focus:border-graphite-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
const labelClass = "flex flex-col gap-1 text-sm font-medium text-graphite-200";

export default function AddVehiclePage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  // We don't use `useFormState` because we need to intercept the submission to manually append the image URLs.
  // The hidden input from CloudinaryUploader is not reliable if the user clicks submit before it syncs.

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("image_urls", imageUrls.join("\n"));

    const result = await createVehicle(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
    // If successful, the action will redirect, so no need to stop loading.
  }

  return (
    <div className="max-w-2xl text-graphite-100">
      <div className="flex items-center gap-2 text-sm">
        <Link
          href="/admin"
          className="flex items-center gap-1 text-graphite-400 hover:text-brass-400 transition-colors"
        >
          ← Vehicles
        </Link>
        <span className="text-graphite-600">/</span>
        <span className="text-graphite-300">Add Vehicle</span>
      </div>

      <h1 className="mt-4 font-display text-2xl font-semibold text-graphite-100">Add Vehicle</h1>
      <p className="mt-1 text-sm text-graphite-400">
        Upload the vehicle photos below. The first one becomes the cover photo shown on the
        vehicle card — you can change this later from the edit page.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Brand
          <input name="brand" required disabled={loading} className={inputClass} placeholder="Suzuki" />
        </label>
        <label className={labelClass}>
          Model
          <input name="model" required disabled={loading} className={inputClass} placeholder="Celerio" />
        </label>
        <label className={labelClass}>
          Year
          <input name="year" type="number" required disabled={loading} className={inputClass} placeholder="2018" />
        </label>
        <label className={labelClass}>
          Price (Rs.)
          <input name="price" type="number" required disabled={loading} className={inputClass} placeholder="5950000" />
        </label>
        <label className={labelClass}>
          Mileage (km)
          <input name="mileage_km" type="number" required disabled={loading} className={inputClass} placeholder="65000" />
        </label>
        <label className={labelClass}>
          Fuel
          <select name="fuel" required disabled={loading} className={inputClass}>
            <option value="petrol" className="bg-graphite-900 text-graphite-100">Petrol</option>
            <option value="diesel" className="bg-graphite-900 text-graphite-100">Diesel</option>
            <option value="hybrid" className="bg-graphite-900 text-graphite-100">Hybrid</option>
            <option value="electric" className="bg-graphite-900 text-graphite-100">Electric</option>
          </select>
        </label>
        <label className={labelClass}>
          Transmission
          <select name="transmission" required disabled={loading} className={inputClass}>
            <option value="automatic" className="bg-graphite-900 text-graphite-100">Automatic</option>
            <option value="manual" className="bg-graphite-900 text-graphite-100">Manual</option>
          </select>
        </label>
        <label className={labelClass}>
          Engine capacity
          <input name="engine_capacity" disabled={loading} className={inputClass} placeholder="998cc" />
        </label>
        <label className={labelClass}>
          Colour
          <input name="colour" disabled={loading} className={inputClass} placeholder="Pearl White" />
        </label>
        <label className={labelClass}>
          Plate number <span className="font-normal text-graphite-400">(admin only)</span>
          <input name="registration_no" disabled={loading} className={inputClass} placeholder="WP CAB-1234" />
        </label>
        <label className={labelClass}>
          Location
          <input name="location" disabled={loading} className={inputClass} placeholder="Kadawatha" />
        </label>
        <label className={labelClass}>
          Condition
          <input name="condition" disabled={loading} className={inputClass} placeholder="Excellent" />
        </label>
        <label className={labelClass}>
          Video URL (optional)
          <input name="video_url" disabled={loading} className={inputClass} placeholder="https://facebook.com/..." />
        </label>

        <label className={`${labelClass} sm:col-span-2`}>
          Description
          <textarea
            name="description"
            rows={4}
            disabled={loading}
            className={inputClass}
            placeholder="Well maintained Suzuki Celerio with excellent fuel economy..."
          />
        </label>

        <div className="sm:col-span-2">
          <span className="text-sm font-medium text-graphite-200">Vehicle Photos</span>
          <div className="mt-1">
            <CloudinaryUploader
              folder="vehicles"
              label="Upload Vehicle Photos"
              onChange={setImageUrls}
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-graphite-200 sm:col-span-2">
          <input type="checkbox" name="is_featured" disabled={loading} className="accent-graphite-100" />
          Feature this vehicle on the homepage
        </label>

        {error && (
          <div className="rounded-plate border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 sm:col-span-2">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-plate bg-brass-500 px-5 py-2.5 text-sm font-semibold text-graphite-950 transition-colors hover:bg-brass-400 disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-2"
        >
          {loading ? "Publishing..." : "Publish Vehicle"}
        </button>
      </form>
    </div>
  );
}