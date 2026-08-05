import slugify from "slugify";
import type { VehicleImage } from "./types";

/** Cover photo first, then the rest in their chosen order. */
export function sortVehicleImages<T extends Pick<VehicleImage, "is_cover" | "sort_order">>(
  images: T[]
): T[] {
  return [...images].sort((a, b) => {
    if (a.is_cover !== b.is_cover) return a.is_cover ? -1 : 1;
    return a.sort_order - b.sort_order;
  });
}

export function formatLKR(amount: number): string {
  return `Rs. ${new Intl.NumberFormat("en-LK").format(Math.round(amount))}`;
}

export function formatMileage(km: number): string {
  return `${new Intl.NumberFormat("en-LK").format(km)} km`;
}

export function vehicleSlug(brand: string, model: string, year: number): string {
  const base = slugify(`${brand} ${model} ${year}`, { lower: true, strict: true });
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${base}-${suffix}`;
}

export function whatsappLink(message: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function statusLabel(status: string): string {
  return { available: "Available", reserved: "Reserved", sold: "Sold" }[status] ?? status;
}
