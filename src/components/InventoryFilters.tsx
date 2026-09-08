"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition, useEffect, useRef } from "react";

const BRANDS = ["Suzuki", "Toyota", "Honda", "Nissan", "Renault", "Mitsubishi"];
const FUELS = ["petrol", "diesel", "hybrid", "electric"];
const TRANSMISSIONS = ["automatic", "manual"];

const PRICE_CONFIG = {
  min: 2_000_000,       // 2M floor
  max: 15_000_000,      // 15M ceiling ("Any Price" threshold)
  step: 250_000,        // 0.25M increments for granular filtering around 4M–10M
  defaultMax: "15000000",
};

export default function InventoryFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [brand, setBrand] = useState(searchParams.get("brand") ?? "");
  const [minYear, setMinYear] = useState(searchParams.get("minYear") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? PRICE_CONFIG.defaultMax);
  const [fuel, setFuel] = useState(searchParams.get("fuel") ?? "");
  const [transmission, setTransmission] = useState(searchParams.get("transmission") ?? "");

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (brand) params.set("brand", brand);
      if (minYear) params.set("minYear", minYear);
      if (maxPrice && parseInt(maxPrice, 10) < PRICE_CONFIG.max) {
        params.set("maxPrice", maxPrice);
      }
      if (fuel) params.set("fuel", fuel);
      if (transmission) params.set("transmission", transmission);

      startTransition(() => {
        router.push(`/inventory?${params.toString()}`);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [brand, minYear, maxPrice, fuel, transmission, router]);

  function clearFilters() {
    setBrand("");
    setMinYear("");
    setMaxPrice(PRICE_CONFIG.defaultMax);
    setFuel("");
    setTransmission("");
    startTransition(() => {
      router.push("/inventory");
    });
  }

  const selectClass =
    "rounded-plate border border-brass-500/20 bg-graphite-900/60 px-3 py-2.5 text-sm text-graphite-100 placeholder:text-graphite-500 focus:border-brass-500 focus:outline-none focus:ring-1 focus:ring-brass-500 transition-all backdrop-blur-md";

  const numericMaxPrice = parseInt(maxPrice, 10);

  return (
    <div className="relative flex flex-wrap items-end gap-4 rounded-[24px] border border-brass-500/20 bg-graphite-900/40 p-6 shadow-sm backdrop-blur-md">
      {isPending && (
        <div className="absolute inset-0 z-10 rounded-[24px] bg-graphite-950/20 backdrop-blur-[1px] transition-all" />
      )}

      <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wider text-graphite-400">
        Brand
        <select className={selectClass} value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value="">Any</option>
          {BRANDS.map((b) => (
            <option key={b} value={b} className="bg-graphite-900">{b}</option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wider text-graphite-400">
        Year (from)
        <input
          type="number"
          placeholder="2018"
          className={selectClass}
          value={minYear}
          onChange={(e) => setMinYear(e.target.value)}
        />
      </label>

      <label className="flex flex-col gap-2.5 text-xs font-semibold uppercase tracking-wider text-graphite-400 min-w-[240px]">
        <div className="flex justify-between items-center">
          <span>Max Price</span>
          <span className="text-brass-400 font-mono tracking-normal">
            {numericMaxPrice >= PRICE_CONFIG.max
              ? "Any Price"
              : `Rs. ${(numericMaxPrice / 1_000_000).toFixed(2).replace(/\.00$/, "")}M`}
          </span>
        </div>
        <input
          type="range"
          min={PRICE_CONFIG.min}
          max={PRICE_CONFIG.max}
          step={PRICE_CONFIG.step}
          className="w-full h-1.5 bg-graphite-800 rounded-lg appearance-none cursor-pointer accent-brass-500 hover:accent-brass-400 transition-all"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wider text-graphite-400">
        Fuel
        <select className={selectClass} value={fuel} onChange={(e) => setFuel(e.target.value)}>
          <option value="">Any</option>
          {FUELS.map((f) => (
            <option key={f} value={f} className="capitalize bg-graphite-900">{f}</option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wider text-graphite-400">
        Transmission
        <select
          className={selectClass}
          value={transmission}
          onChange={(e) => setTransmission(e.target.value)}
        >
          <option value="">Any</option>
          {TRANSMISSIONS.map((t) => (
            <option key={t} value={t} className="capitalize bg-graphite-900">{t}</option>
          ))}
        </select>
      </label>

      <div className="flex gap-2 ml-auto">
        <button
          onClick={clearFilters}
          className="rounded-plate border border-graphite-700/50 bg-transparent px-5 py-2.5 text-sm font-medium text-graphite-400 transition-colors hover:bg-graphite-800 hover:text-graphite-100"
        >
          Clear
        </button>
        <div className="flex items-center px-4 text-xs font-medium text-brass-500/70">
          {isPending ? "Updating..." : "Auto-saving filters"}
        </div>
      </div>
    </div>
  );
}