import { formatLKR, formatMileage } from "@/lib/utils";
import { FUEL_OPTIONS, TRANSMISSION_OPTIONS, CONDITION_OPTIONS } from "@/lib/validation/sell-car";
import type { SellCarFormState } from "../SellCarForm";

function optionLabel(options: { value: string; label: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}

const rowClass = "flex items-baseline justify-between gap-4 py-1.5 text-sm";
const labelSpanClass = "text-graphite-500";
const valueSpanClass = "font-medium text-graphite-100 text-right";
const sectionClass = "rounded-plate border border-graphite-700/30 bg-graphite-900/30 p-4 backdrop-blur-md";

interface Props {
  data: SellCarFormState;
  consent: boolean;
  onConsentChange: (value: boolean) => void;
  consentError?: string;
}

export default function ReviewStep({ data, consent, onConsentChange, consentError }: Props) {
  return (
    <div className="space-y-5">
      <section className={sectionClass}>
        <p className="text-xs font-semibold uppercase tracking-wider text-brass-600">Seller</p>
        <div className="mt-1 divide-y divide-graphite-700/5">
          <div className={rowClass}>
            <span className={labelSpanClass}>Name</span>
            <span className={valueSpanClass}>{data.seller_name || "—"}</span>
          </div>
          <div className={rowClass}>
            <span className={labelSpanClass}>Mobile</span>
            <span className={valueSpanClass}>{data.seller_phone || "—"}</span>
          </div>
          <div className={rowClass}>
            <span className={labelSpanClass}>WhatsApp</span>
            <span className={valueSpanClass}>{data.seller_whatsapp || "—"}</span>
          </div>
          {data.seller_email && (
            <div className={rowClass}>
              <span className={labelSpanClass}>Email</span>
              <span className={valueSpanClass}>{data.seller_email}</span>
            </div>
          )}
        </div>
      </section>

      <section className={sectionClass}>
        <p className="text-xs font-semibold uppercase tracking-wider text-brass-600">Vehicle</p>
        <div className="mt-1 divide-y divide-graphite-700/5">
          <div className={rowClass}>
            <span className={labelSpanClass}>Vehicle</span>
            <span className={valueSpanClass}>
              {data.vehicle_make} {data.vehicle_model} {data.vehicle_year}
            </span>
          </div>
          <div className={rowClass}>
            <span className={labelSpanClass}>Registration</span>
            <span className={valueSpanClass}>{data.registration_number || "—"}</span>
          </div>
          <div className={rowClass}>
            <span className={labelSpanClass}>Mileage</span>
            <span className={valueSpanClass}>
              {data.mileage ? formatMileage(Number(data.mileage)) : "—"}
            </span>
          </div>
          <div className={rowClass}>
            <span className={labelSpanClass}>Fuel</span>
            <span className={valueSpanClass}>{optionLabel(FUEL_OPTIONS, data.fuel_type)}</span>
          </div>
          <div className={rowClass}>
            <span className={labelSpanClass}>Transmission</span>
            <span className={valueSpanClass}>
              {optionLabel(TRANSMISSION_OPTIONS, data.transmission)}
            </span>
          </div>
          {data.colour && (
            <div className={rowClass}>
              <span className={labelSpanClass}>Colour</span>
              <span className={valueSpanClass}>{data.colour}</span>
            </div>
          )}
          <div className={rowClass}>
            <span className={labelSpanClass}>Condition</span>
            <span className={valueSpanClass}>{optionLabel(CONDITION_OPTIONS, data.condition)}</span>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <p className="text-xs font-semibold uppercase tracking-wider text-brass-600">Pricing</p>
        <p className="mt-1 font-display text-2xl font-semibold text-graphite-100">
          {data.asking_price ? formatLKR(Number(data.asking_price)) : "—"}
        </p>
      </section>

      <section className={sectionClass}>
        <p className="text-xs font-semibold uppercase tracking-wider text-brass-600">Photos</p>
        <p className="mt-1 text-sm text-graphite-300">
          {data.photo_urls.length} photo{data.photo_urls.length === 1 ? "" : "s"} uploaded
        </p>
        {data.photo_urls.length > 0 && (
          <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
            {data.photo_urls.slice(0, 12).map((url) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={url} src={url} alt="" className="aspect-square rounded object-cover" />
            ))}
          </div>
        )}
      </section>

      <label className="flex items-start gap-2.5 text-sm text-graphite-300">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => onConsentChange(e.target.checked)}
          className="mt-0.5 accent-brass-500"
        />
        <span>
          I agree that VS Auto Mart may contact me regarding the vehicle submitted through this
          form.
        </span>
      </label>
      {consentError && <p className="text-xs font-medium text-rose-400">{consentError}</p>}
    </div>
  );
}
