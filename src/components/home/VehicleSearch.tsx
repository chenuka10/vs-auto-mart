"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const BRANDS = ["Any Brand", "Toyota", "Honda", "Suzuki", "Nissan", "Mitsubishi", "BMW"];
const PRICE_RANGES = [
  { label: "Any Price", value: "" },
  { label: "Under Rs. 5M", value: "0-5000000" },
  { label: "Rs. 5M – 10M", value: "5000000-10000000" },
  { label: "Rs. 10M – 20M", value: "10000000-20000000" },
  { label: "Rs. 20M+", value: "20000000-" },
];
const FUEL_TYPES = ["Any Fuel", "Petrol", "Diesel", "Hybrid", "Electric"];
const YEARS = ["Any Year", ...Array.from({ length: 15 }, (_, i) => String(2025 - i))];

export default function VehicleSearch() {
  const router = useRouter();
  const [brand, setBrand] = useState(BRANDS[0]);
  const [price, setPrice] = useState(PRICE_RANGES[0].value);
  const [year, setYear] = useState(YEARS[0]);
  const [fuel, setFuel] = useState(FUEL_TYPES[0]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (brand !== "Any Brand") params.set("brand", brand);
    if (price) params.set("price", price);
    if (year !== "Any Year") params.set("year", year);
    if (fuel !== "Any Fuel") params.set("fuel", fuel);
    router.push(`/inventory?${params.toString()}`);
  };

  const selectClass =
    "w-full appearance-none rounded-plate border border-white/15 bg-white/5 px-4 py-3 text-sm text-paper backdrop-blur-sm outline-none transition focus:border-brass-400";

  return (
    <section className="bg-[#18181B] py-20 text-paper">
      <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Find the vehicle that fits your journey.
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-10 rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-lg md:p-8"
        >
          <div className="grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-xs uppercase tracking-wider text-graphite-400">
              Brand
              <select className={`mt-2 ${selectClass}`} value={brand} onChange={(e) => setBrand(e.target.value)}>
                {BRANDS.map((b) => (
                  <option key={b} value={b} className="bg-graphite-950">
                    {b}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs uppercase tracking-wider text-graphite-400">
              Price Range
              <select className={`mt-2 ${selectClass}`} value={price} onChange={(e) => setPrice(e.target.value)}>
                {PRICE_RANGES.map((p) => (
                  <option key={p.label} value={p.value} className="bg-graphite-950">
                    {p.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs uppercase tracking-wider text-graphite-400">
              Year
              <select className={`mt-2 ${selectClass}`} value={year} onChange={(e) => setYear(e.target.value)}>
                {YEARS.map((y) => (
                  <option key={y} value={y} className="bg-graphite-950">
                    {y}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs uppercase tracking-wider text-graphite-400">
              Fuel Type
              <select className={`mt-2 ${selectClass}`} value={fuel} onChange={(e) => setFuel(e.target.value)}>
                {FUEL_TYPES.map((f) => (
                  <option key={f} value={f} className="bg-graphite-950">
                    {f}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button
            onClick={handleSearch}
            className="mt-6 w-full rounded-plate bg-brass-500 py-3.5 text-sm font-semibold text-graphite-950 transition hover:bg-brass-400 sm:w-auto sm:px-10"
          >
            Search Inventory
          </button>
        </motion.div>
      </div>
    </section>
  );
}
