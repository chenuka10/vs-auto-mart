import { CONDITION_OPTIONS } from "@/lib/validation/sell-car";
import type { SellCarFormState } from "../SellCarForm";
import { inputClass, selectClass, labelClass, errorClass, fieldError } from "./field-styles";

interface Props {
  data: SellCarFormState;
  errors: Record<string, string>;
  onChange: (patch: Partial<SellCarFormState>) => void;
}

export default function VehicleDetailsStep({ data, errors, onChange }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className={labelClass}>
        Colour <span className="font-normal text-graphite-400">(optional)</span>
        <input
          className={inputClass}
          value={data.colour}
          onChange={(e) => onChange({ colour: e.target.value })}
          placeholder="Pearl White"
        />
      </label>

      <label className={labelClass}>
        Engine Capacity <span className="font-normal text-graphite-400">(optional)</span>
        <input
          className={inputClass}
          value={data.engine_capacity}
          onChange={(e) => onChange({ engine_capacity: e.target.value })}
          placeholder="998cc"
        />
      </label>

      <label className={labelClass}>
        Number of Owners <span className="font-normal text-graphite-400">(optional)</span>
        <input
          type="number"
          className={inputClass}
          value={data.owners_count}
          onChange={(e) => onChange({ owners_count: e.target.value })}
          placeholder="1"
        />
      </label>

      <label className={labelClass}>
        Condition
        <select
          className={selectClass}
          value={data.condition}
          onChange={(e) => onChange({ condition: e.target.value as SellCarFormState["condition"] })}
          required
        >
          <option value="">Select condition</option>
          {CONDITION_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="text-xs font-normal text-graphite-400">
          This is your own assessment — it doesn&apos;t guarantee we&apos;ll accept the vehicle at
          this condition.
        </span>
        {fieldError(errors, "condition") && <span className={errorClass}>{errors.condition}</span>}
      </label>

      <label className={`${labelClass} sm:col-span-2`}>
        Expected / Asking Price (LKR / Rs.)
        <input
          type="number"
          className={inputClass}
          value={data.asking_price}
          onChange={(e) => onChange({ asking_price: e.target.value })}
          placeholder="5850000"
          required
        />
        {fieldError(errors, "asking_price") && (
          <span className={errorClass}>{errors.asking_price}</span>
        )}
      </label>

      <label className={`${labelClass} sm:col-span-2`}>
        Tell us anything important about the vehicle{" "}
        <span className="font-normal text-graphite-400">(optional)</span>
        <textarea
          rows={5}
          maxLength={4000}
          className={inputClass}
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Accident history, service history, modifications, known issues, recent repairs, ownership history…"
        />
        {fieldError(errors, "description") && (
          <span className={errorClass}>{errors.description}</span>
        )}
      </label>
    </div>
  );
}