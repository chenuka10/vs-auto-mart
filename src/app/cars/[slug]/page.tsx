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

  const canonicalUrl = `https://vsautomart.lk/cars/${slug}`;
  const title = `${vehicle.brand} ${vehicle.model} ${vehicle.year} for sale in Kadawatha — VS Auto Mart`;
  const description = `${vehicle.brand} ${vehicle.model} ${vehicle.year}, ${formatMileage(
    vehicle.mileage_km
  )}, ${vehicle.transmission}. Priced at ${formatLKR(vehicle.price)}. Buy from the trusted Kadawatha car sale: VS Auto Mart.`;

  const sortedImages = sortVehicleImages(vehicle.vehicle_images ?? []);
  const coverUrl = sortedImages[0]?.image_url;
  const imageAlt = `${vehicle.brand} ${vehicle.model} ${vehicle.year} for sale at VS Auto Mart Kadawatha`;

  // Structured Open Graph / Twitter image payload
  const ogImages = coverUrl
    ? [
        {
          url: coverUrl,
          secureUrl: coverUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
          type: "image/jpeg",
        },
      ]
    : [
        {
          url: "https://vsautomart.lk/og-default.jpg", // Fallback branded image
          width: 1200,
          height: 630,
          alt: "VS Auto Mart Kadawatha",
        },
      ];

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: [
      `${vehicle.brand} ${vehicle.model} ${vehicle.year}`,
      `${vehicle.brand} ${vehicle.model} for sale Kadawatha`,
      `${vehicle.brand} for sale Sri Lanka`,
      `buy ${vehicle.brand} ${vehicle.model} Kadawatha`,
      "used cars Sri Lanka",
      "VS Auto Mart Kadawatha",
      "Kadawatha car sale",
    ],
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "VS Auto Mart",
      locale: "en_LK",
      type: "website",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages.map((img) => img.url),
    },
    robots: {
      index: vehicle.status === "available",
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
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

  const images = sortVehicleImages(vehicle.vehicle_images ?? []);
  const cover = images[0]?.image_url;

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

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${vehicle.brand} ${vehicle.model} ${vehicle.year}`,
    image: cover ? [cover] : [],
    description: vehicle.description || `${vehicle.brand} ${vehicle.model} ${vehicle.year} in ${vehicle.condition ?? "excellent"} condition.`,
    brand: {
      "@type": "Brand",
      name: vehicle.brand,
    },
    offers: {
      "@type": "Offer",
      url: `https://vsautomart.lk/cars/${slug}`,
      priceCurrency: "LKR",
      price: vehicle.price,
      itemCondition: "https://schema.org/UsedCondition",
      availability: vehicle.status === "available" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "AutoDealer",
        name: "VS Auto Mart Kadawatha",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Back button: plain <a> with lowercase "onclick" (not React's onClick) so this
           works inside a Server Component. It's a real HTML attribute the browser
           executes directly. href="/inventory" is the fallback if there's no history
           (e.g. someone opened this page from a shared link in a new tab). */}
                 <a href="/inventory"
          onClick={undefined}
          // @ts-expect-error -- intentionally using the raw DOM attribute, not React's synthetic handler
          onclick="if(window.history.length>1){event.preventDefault();window.history.back();}"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-graphite-400 hover:text-brass-400 transition-colors"
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
            <h1 className="mt-3 font-display text-3xl font-semibold text-graphite-100">
              {vehicle.brand} {vehicle.model}
            </h1>
            <p className="mt-1 text-graphite-400">
              {vehicle.year} · {vehicle.location ?? "Kadawatha, Sri Lanka"}
            </p>
            <p className="mt-4 font-display text-3xl font-semibold text-brass-400">
              {formatLKR(vehicle.price)}
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-graphite-700/20 py-6 text-sm">
              {specs.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-graphite-500">{label}</dt>
                  <dd className="font-medium capitalize text-graphite-200">{value}</dd>
                </div>
              ))}
            </dl>

            {vehicle.description && (
              <p className="mt-6 text-sm leading-relaxed text-graphite-300">{vehicle.description}</p>
            )}

            <div className="mt-8 flex flex-col gap-3">
              <WhatsAppButton
                variant="inline"
                label="WhatsApp Inquiry"
                message={`Hi, I'm interested in the ${vehicle.brand} ${vehicle.model} (${vehicle.year}) listed for ${formatLKR(vehicle.price)}.`}
              />
              
               <a href="tel:+94772500320"
                className="rounded-plate border border-graphite-700/40 px-5 py-3 text-center text-sm font-semibold text-graphite-200 transition-colors hover:bg-graphite-800/50 hover:text-graphite-50"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}