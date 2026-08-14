import { FUEL_OPTIONS, TRANSMISSION_OPTIONS } from "@/lib/validation/sell-car";
import type { SellCarFormState } from "../SellCarForm";
import { inputClass, labelClass, errorClass, fieldError } from "./field-styles";

interface Props {
  data: SellCarFormState;
  errors: Record<string, string>;
  onChange: (patch: Partial<SellCarFormState>) => void;
}

export default function VehicleInformationStep({ data, errors, onChange }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className={labelClass}>
        Make
        <input
          className={inputClass}
          value={data.vehicle_make}
          onChange={(e) => onChange({ vehicle_make: e.target.value })}
          placeholder="Suzuki"
          required
        />
        {fieldError(errors, "vehicle_make") && <span className={errorClass}>{errors.vehicle_make}</span>}
      </label>

      <label className={labelClass}>
        Model
        <input
          className={inputClass}
          value={data.vehicle_model}
          onChange={(e) => onChange({ vehicle_model: e.target.value })}
          placeholder="Celerio"
          required
        />
        {fieldError(errors, "vehicle_model") && <span className={errorClass}>{errors.vehicle_model}</span>}
      </label>

      <label className={labelClass}>
        Year
        <input
          type="number"
          className={inputClass}
          value={data.vehicle_year}
          onChange={(e) => onChange({ vehicle_year: e.target.value })}
          placeholder="2018"
          required
        />
        {fieldError(errors, "vehicle_year") && <span className={errorClass}>{errors.vehicle_year}</span>}
      </label>

      <label className={labelClass}>
        Registration Number
        <input
          className={inputClass}
          value={data.registration_number}
          onChange={(e) => onChange({ registration_number: e.target.value })}
          placeholder="WP CAB-1234"
          required
        />
        {fieldError(errors, "registration_number") && (
          <span className={errorClass}>{errors.registration_number}</span>
        )}
      </label>

      <label className={labelClass}>
        Mileage (km)
        <input
          type="number"
          className={inputClass}
          value={data.mileage}
          onChange={(e) => onChange({ mileage: e.target.value })}
          placeholder="82000"
          required
        />
        {fieldError(errors, "mileage") && <span className={errorClass}>{errors.mileage}</span>}
      </label>

      <label className={labelClass}>
        Fuel Type
        <select
          className={inputClass}
          value={data.fuel_type}
          onChange={(e) => onChange({ fuel_type: e.target.value as SellCarFormState["fuel_type"] })}
          required
        >
          <option value="">Select fuel type</option>
          {FUEL_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {fieldError(errors, "fuel_type") && <span className={errorClass}>{errors.fuel_type}</span>}
      </label>

      <label className={labelClass}>
        Transmission
        <select
          className={inputClass}
          value={data.transmission}
          onChange={(e) =>
            onChange({ transmission: e.target.value as SellCarFormState["transmission"] })
          }
          required
        >
          <option value="">Select transmission</option>
          {TRANSMISSION_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {fieldError(errors, "transmission") && <span className={errorClass}>{errors.transmission}</span>}
      </label>
    </div>
  );
}
