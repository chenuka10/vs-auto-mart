import type { SellCarFormState } from "../SellCarForm";
import { inputClass, labelClass, errorClass, fieldError } from "./field-styles";

interface Props {
  data: SellCarFormState;
  errors: Record<string, string>;
  onChange: (patch: Partial<SellCarFormState>) => void;
}

export default function SellerInformationStep({ data, errors, onChange }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className={`${labelClass} sm:col-span-2`}>
        Full Name
        <input
          className={inputClass}
          value={data.seller_name}
          onChange={(e) => onChange({ seller_name: e.target.value })}
          placeholder="e.g. Nimal Perera"
          required
        />
        {fieldError(errors, "seller_name") && (
          <span className={errorClass}>{errors.seller_name}</span>
        )}
      </label>

      <label className={labelClass}>
        Mobile Number
        <input
          className={inputClass}
          value={data.seller_phone}
          onChange={(e) => onChange({ seller_phone: e.target.value })}
          placeholder="0771234567"
          inputMode="tel"
          required
        />
        {fieldError(errors, "seller_phone") && (
          <span className={errorClass}>{errors.seller_phone}</span>
        )}
      </label>

      <label className={labelClass}>
        WhatsApp Number
        <input
          className={inputClass}
          value={data.seller_whatsapp}
          onChange={(e) => onChange({ seller_whatsapp: e.target.value })}
          placeholder="0771234567"
          inputMode="tel"
          required
        />
        {fieldError(errors, "seller_whatsapp") && (
          <span className={errorClass}>{errors.seller_whatsapp}</span>
        )}
      </label>

      <label className={`${labelClass} sm:col-span-2`}>
        Email Address <span className="font-normal text-graphite-400">(optional)</span>
        <input
          type="email"
          className={inputClass}
          value={data.seller_email}
          onChange={(e) => onChange({ seller_email: e.target.value })}
          placeholder="you@example.com"
        />
        {fieldError(errors, "seller_email") && (
          <span className={errorClass}>{errors.seller_email}</span>
        )}
      </label>
    </div>
  );
}
