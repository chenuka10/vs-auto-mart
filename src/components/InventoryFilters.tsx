"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const BRANDS = ["Suzuki", "Toyota", "Honda", "Nissan", "Renault", "Mitsubishi"];
const FUELS = ["petrol", "diesel", "hybrid", "electric"];
const TRANSMISSIONS = ["automatic", "manual"];

export default function InventoryFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [brand, setBrand] = useState(searchParams.get("brand") ?? "");
  const [minYear, setMinYear] = useState(searchParams.get("minYear") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");
  const [fuel, setFuel] = useState(searchParams.get("fuel") ?? "");
  const [transmission, setTransmission] = useState(searchParams.get("transmission") ?? "");

  function applyFilters() {
    const params = new URLSearchParams();
    if (brand) params.set("brand", brand);
    if (minYear) params.set("minYear", minYear);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (fuel) params.set("fuel", fuel);
    if (transmission) params.set("transmission", transmission);
    router.push(`/inventory?${params.toString()}`);
  }

  function clearFilters() {
    setBrand("");
    setMinYear("");
    setMaxPrice("");
    setFuel("");
    setTransmission("");
    router.push("/inventory");
  }

  const selectClass =
    "rounded-plate border border-graphite-700/15 bg-white px-3 py-2 text-sm text-graphite-950";

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-lg border border-graphite-700/10 bg-white p-4">
      <label className="flex flex-col gap-1 text-xs font-medium text-graphite-500">
        Brand
        <select className={selectClass} value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value="">Any</option>
          {BRANDS.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-xs font-medium text-graphite-500">
        Year (from)
        <input
          type="number"
          placeholder="2018"
          className={selectClass}
          value={minYear}
          onChange={(e) => setMinYear(e.target.value)}
        />
      </label>

      <label className="flex flex-col gap-1 text-xs font-medium text-graphite-500">
        Max price (Rs.)
        <input
          type="number"
          placeholder="6000000"
          className={selectClass}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </label>

      <label className="flex flex-col gap-1 text-xs font-medium text-graphite-500">
        Fuel
        <select className={selectClass} value={fuel} onChange={(e) => setFuel(e.target.value)}>
          <option value="">Any</option>
          {FUELS.map((f) => (
            <option key={f} value={f} className="capitalize">{f}</option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-xs font-medium text-graphite-500">
        Transmission
        <select
          className={selectClass}
          value={transmission}
          onChange={(e) => setTransmission(e.target.value)}
        >
          <option value="">Any</option>
          {TRANSMISSIONS.map((t) => (
            <option key={t} value={t} className="capitalize">{t}</option>
          ))}
        </select>
      </label>

      <button
        onClick={applyFilters}
        className="rounded-plate bg-graphite-950 px-4 py-2 text-sm font-semibold text-paper hover:bg-graphite-900"
      >
        Search
      </button>
      <button
        onClick={clearFilters}
        className="rounded-plate border border-graphite-700/15 px-4 py-2 text-sm font-medium text-graphite-500 hover:bg-graphite-100"
      >
        Clear
      </button>
    </div>
  );
}
