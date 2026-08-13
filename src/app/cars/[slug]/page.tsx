import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import StatusBadge from "@/components/StatusBadge";
import WhatsAppButton from "@/components/WhatsAppButton";
import { formatLKR, formatMileage, sortVehicleImages } from "@/lib/utils";
import { PUBLIC_VEHICLE_WITH_IMAGES_COLUMNS } from "@/lib/queries";
import type { PublicVehicleWithImages } from "@/lib/types";
import VehicleGallery from "@/components/VehicleGallery";

async function getVehicle(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("vehicles")
    .select(PUBLIC_VEHICLE_WITH_IMAGES_COLUMNS)
    .eq("slug", slug)
    .single();
  return data as PublicVehicleWithImages | null;
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
  const cover = sortVehicleImages(vehicle.vehicle_images ?? [])[0]?.image_url;

  return {
    title,
    description,
    openGraph: { title, description, images: cover ? [cover] : [] },
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

  const images = sortVehicleImages(vehicle.vehicle_images ?? []);

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
      {/* Back button: plain <a> with lowercase "onclick" (not React's onClick) so this
         works inside a Server Component. It's a real HTML attribute the browser
         executes directly. href="/inventory" is the fallback if there's no history
         (e.g. someone opened this page from a shared link in a new tab). */}
      
       <a href="/inventory"
        onClick={undefined}
        // @ts-expect-error -- intentionally using the raw DOM attribute, not React's synthetic handler
        onclick="if(window.history.length>1){event.preventDefault();window.history.back();}"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-graphite-500 hover:text-graphite-700"
      >
        ← Back to Inventory
      </a>

      <div className="grid gap-10 lg:grid-cols-5">
        {/* Gallery */}
        <div className="lg:col-span-3">
          <VehicleGallery
            images={images}
            vehicleName={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
          />
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
            
             <a href="tel:+94771234567"
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