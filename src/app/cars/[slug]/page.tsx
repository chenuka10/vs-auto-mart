import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import StatusBadge from "@/components/StatusBadge";
import WhatsAppButton from "@/components/WhatsAppButton";
import { formatLKR, formatMileage } from "@/lib/utils";
import type { VehicleWithImages } from "@/lib/types";

async function getVehicle(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("vehicles")
    .select("*, vehicle_images(*)")
    .eq("slug", slug)
    .single();
  return data as VehicleWithImages | null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicle(slug);
  if (!vehicle) return { title: "Vehicle not found" };

  const title = `${vehicle.brand} ${vehicle.model} ${vehicle.year} — Used Car Sri Lanka`;
  const description = `${vehicle.brand} ${vehicle.model} ${vehicle.year}, ${formatMileage(
    vehicle.mileage_km
  )}, ${vehicle.transmission}. Priced at ${formatLKR(vehicle.price)}. Located in ${
    vehicle.location ?? "Sri Lanka"
  }.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: vehicle.vehicle_images?.[0]?.image_url ? [vehicle.vehicle_images[0].image_url] : [],
    },
  };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = await getVehicle(slug);
  if (!vehicle) notFound();

  const specs = [
    ["Brand", vehicle.brand],
    ["Model", vehicle.model],
    ["Year", vehicle.year],
    ["Mileage", formatMileage(vehicle.mileage_km)],
    ["Fuel", vehicle.fuel],
    ["Transmission", vehicle.transmission],
    ["Engine", vehicle.engine_capacity ?? "—"],
    ["Colour", vehicle.colour ?? "—"],
    ["Condition", vehicle.condition ?? "—"],
  ] as const;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-10 lg:grid-cols-5">
        {/* Gallery */}
        <div className="lg:col-span-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-graphite-100">
            {vehicle.vehicle_images?.[0] && (
              <Image
                src={vehicle.vehicle_images[0].image_url}
                alt={`${vehicle.brand} ${vehicle.model}`}
                fill
                priority
                className="object-cover"
              />
            )}
          </div>
          {vehicle.vehicle_images?.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {vehicle.vehicle_images.slice(1, 9).map((img) => (
                <div key={img.id} className="relative aspect-square overflow-hidden rounded-md bg-graphite-100">
                  <Image src={img.image_url} alt={img.context} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="lg:col-span-2">
          <StatusBadge status={vehicle.status} />
          <h1 className="mt-3 font-display text-3xl font-semibold">
            {vehicle.brand} {vehicle.model}
          </h1>
          <p className="mt-1 text-graphite-500">
            {vehicle.year} · {vehicle.location ?? "Sri Lanka"}
          </p>
          <p className="mt-4 font-display text-3xl font-semibold text-brass-600">
            {formatLKR(vehicle.price)}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-graphite-700/10 py-6 text-sm">
            {specs.map(([label, value]) => (
              <div key={label}>
                <dt className="text-graphite-500">{label}</dt>
                <dd className="font-medium capitalize">{value}</dd>
              </div>
            ))}
          </dl>

          {vehicle.description && (
            <p className="mt-6 text-sm leading-relaxed text-graphite-700">{vehicle.description}</p>
          )}

          <div className="mt-8 flex flex-col gap-3">
            <WhatsAppButton
              variant="inline"
              label="WhatsApp Inquiry"
              message={`Hi, I'm interested in the ${vehicle.brand} ${vehicle.model} (${vehicle.year}) listed for ${formatLKR(vehicle.price)}.`}
            />
            <a
              href="tel:+94771234567"
              className="rounded-plate border border-graphite-700/15 px-5 py-3 text-center text-sm font-semibold hover:bg-graphite-100"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
