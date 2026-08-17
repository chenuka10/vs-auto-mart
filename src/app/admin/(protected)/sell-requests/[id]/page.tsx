import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatLKR, formatMileage } from "@/lib/utils";
import { FUEL_OPTIONS, TRANSMISSION_OPTIONS, CONDITION_OPTIONS } from "@/lib/validation/sell-car";
import SellRequestStatusControl from "@/components/admin/sell-requests/SellRequestStatusControl";
import SellRequestNotes from "@/components/admin/sell-requests/SellRequestNotes";
import SellRequestPhotoGallery from "@/components/admin/sell-requests/SellRequestPhotoGallery";
import type { SellCarSubmissionWithPhotos } from "@/lib/types";

function optionLabel(options: { value: string; label: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}

/** wa.me link to the seller (not the dealership's own WhatsApp number). */
function sellerWhatsappLink(number: string, message: string): string {
  const digitsOnly = number.replace(/\D/g, "");
  const withCountryCode = digitsOnly.startsWith("0") ? `94${digitsOnly.slice(1)}` : digitsOnly;
  return `https://wa.me/${withCountryCode}?text=${encodeURIComponent(message)}`;
}

export default async function SellRequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("sell_car_submissions")
    .select("*, sell_car_submission_photos(*)")
    .eq("id", id)
    .single();

  if (error || !data) notFound();

  const submission = data as SellCarSubmissionWithPhotos;
  const photos = [...submission.sell_car_submission_photos].sort((a, b) => a.sort_order - b.sort_order);

  const infoRows: [string, string | number | null][] = [
    ["Make", submission.vehicle_make],
    ["Model", submission.vehicle_model],
    ["Year", submission.vehicle_year],
    ["Registration", submission.registration_number],
    ["Mileage", formatMileage(submission.mileage)],
    ["Fuel", optionLabel(FUEL_OPTIONS, submission.fuel_type)],
    ["Transmission", optionLabel(TRANSMISSION_OPTIONS, submission.transmission)],
    ["Colour", submission.colour],
    ["Engine Capacity", submission.engine_capacity],
    ["Owners", submission.owners_count],
    ["Condition", optionLabel(CONDITION_OPTIONS, submission.condition)],
    ["Asking Price", formatLKR(submission.asking_price)],
  ];

  return (
    <div className="text-graphite-100">
      <div className="flex items-center gap-2 text-sm">
        <Link
          href="/admin/sell-requests"
          className="flex items-center gap-1 text-graphite-400 hover:text-brass-400 transition-colors"
        >
          ← Sell Requests
        </Link>
        <span className="text-graphite-600">/</span>
        <span className="text-graphite-300">
          {submission.vehicle_make} {submission.vehicle_model}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-graphite-100">
            {submission.vehicle_make} {submission.vehicle_model} {submission.vehicle_year}
          </h1>
          <p className="mt-1 text-sm text-graphite-400">{submission.reference_number}</p>
        </div>
        <SellRequestStatusControl id={submission.id} status={submission.status} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-plate border border-graphite-800 bg-graphite-900/50 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-graphite-400">
              Photos
            </h2>
            <div className="mt-3">
              <SellRequestPhotoGallery photos={photos} />
            </div>
          </section>

          <section className="rounded-plate border border-graphite-800 bg-graphite-900/50 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-graphite-400">
              Vehicle Information
            </h2>
            <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
              {infoRows
                .filter(([, value]) => value !== null && value !== "")
                .map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-graphite-500">{label}</dt>
                    <dd className="font-medium text-graphite-100">{value}</dd>
                  </div>
                ))}
            </dl>
            {submission.description && (
              <div className="mt-4 border-t border-graphite-800 pt-4">
                <dt className="text-xs text-graphite-500">Additional Information</dt>
                <dd className="mt-1 whitespace-pre-wrap text-sm text-graphite-200">
                  {submission.description}
                </dd>
              </div>
            )}
          </section>

          <section className="rounded-plate border border-graphite-800 bg-graphite-900/50 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-graphite-400">
              Internal Notes
            </h2>
            <div className="mt-3">
              <SellRequestNotes id={submission.id} initialNotes={submission.admin_notes} />
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-plate border border-graphite-800 bg-graphite-900/50 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-graphite-400">
              Seller
            </h2>
            <p className="mt-2 font-medium text-graphite-100">{submission.seller_name}</p>
            <div className="mt-4 space-y-2">
              <a
                href={`tel:${submission.seller_phone}`}
                className="block rounded-plate border border-graphite-700 px-3 py-2 text-center text-sm font-semibold text-graphite-100 transition-colors hover:bg-graphite-800"
              >
                Call {submission.seller_phone}
              </a>
              <a
                href={sellerWhatsappLink(
                  submission.seller_whatsapp,
                  `Hi ${submission.seller_name}, this is VS Auto Mart regarding your vehicle submission ${submission.reference_number}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-plate border border-graphite-700 px-3 py-2 text-center text-sm font-semibold text-graphite-100 transition-colors hover:bg-graphite-800"
              >
                WhatsApp {submission.seller_whatsapp}
              </a>
              {submission.seller_email && (
                <a
                  href={`mailto:${submission.seller_email}`}
                  className="block rounded-plate border border-graphite-700 px-3 py-2 text-center text-sm font-semibold text-graphite-100 transition-colors hover:bg-graphite-800"
                >
                  Email {submission.seller_email}
                </a>
              )}
            </div>
          </section>

          <section className="rounded-plate border border-graphite-800 bg-graphite-900/50 p-5 text-sm text-graphite-400">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-graphite-500">
              Submitted
            </h2>
            <p className="mt-2 text-graphite-200">
              {new Date(submission.created_at).toLocaleString("en-LK")}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
