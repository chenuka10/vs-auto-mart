"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition, useEffect, useRef } from "react";

const BRANDS = ["Suzuki", "Toyota", "Honda", "Nissan", "Renault", "Mitsubishi"];
const FUELS = ["petrol", "diesel", "hybrid", "electric"];
const TRANSMISSIONS = ["automatic", "manual"];

export default function InventoryFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [brand, setBrand] = useState(searchParams.get("brand") ?? "");
  const [minYear, setMinYear] = useState(searchParams.get("minYear") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "100000000");
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
      if (maxPrice && parseInt(maxPrice) < 100000000) params.set("maxPrice", maxPrice);
      if (fuel) params.set("fuel", fuel);
      if (transmission) params.set("transmission", transmission);
      
      startTransition(() => {
        router.push(`/inventory?${params.toString()}`);
      });
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [brand, minYear, maxPrice, fuel, transmission, router]);

  function clearFilters() {
    setBrand("");
    setMinYear("");
    setMaxPrice("100000000");
    setFuel("");
    setTransmission("");
    startTransition(() => {
      router.push("/inventory");
    });
  }

  const selectClass =
    "rounded-plate border border-brass-500/20 bg-graphite-900/60 px-3 py-2.5 text-sm text-graphite-100 placeholder:text-graphite-500 focus:border-brass-500 focus:outline-none focus:ring-1 focus:ring-brass-500 transition-all backdrop-blur-md";

  return (
    <div className="relative flex flex-wrap items-end gap-4 rounded-[24px] border border-brass-500/20 bg-graphite-900/40 p-6 shadow-sm backdrop-blur-md">
      {/* Loading overlay for instant search */}
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

      <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wider text-graphite-400">
        Max Price
        <select className={selectClass} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
          <option value="100000000" className="bg-graphite-900">Any Price</option>
          <option value="3000000" className="bg-graphite-900">Under Rs. 3M</option>
          <option value="5000000" className="bg-graphite-900">Under Rs. 5M</option>
          <option value="7000000" className="bg-graphite-900">Under Rs. 7M</option>
          <option value="10000000" className="bg-graphite-900">Under Rs. 10M</option>
          <option value="15000000" className="bg-graphite-900">Under Rs. 15M</option>
          <option value="20000000" className="bg-graphite-900">Under Rs. 20M</option>
          <option value="30000000" className="bg-graphite-900">Under Rs. 30M</option>
          <option value="50000000" className="bg-graphite-900">Under Rs. 50M</option>
        </select>
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
