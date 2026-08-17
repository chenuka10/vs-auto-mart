// Reuses the existing signed-upload component from components/admin — its
// logic isn't actually admin-specific (folder/name/onChange props), and the
// alternative (a second Cloudinary upload implementation) would duplicate
// exactly what the spec says to avoid. The signature action itself is what
// gates access per-folder now (see lib/cloudinary/actions.ts).
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";
import type { SellCarFormState } from "../SellCarForm";
import { errorClass, fieldError } from "./field-styles";

const SUGGESTED_SHOTS = [
  "Front",
  "Rear",
  "Left side",
  "Right side",
  "Interior",
  "Dashboard",
  "Odometer",
  "Engine bay",
  "Tyres",
  "Any damage/scratches",
];

interface Props {
  data: SellCarFormState;
  errors: Record<string, string>;
  onChange: (patch: Partial<SellCarFormState>) => void;
}

export default function PhotoUploadStep({ data, errors, onChange }: Props) {
  return (
    <div>
      <div className="rounded-plate border border-graphite-700/30 bg-graphite-900/30 p-4 text-sm text-graphite-300">
        <p className="font-medium text-graphite-100">For a better valuation, include photos of:</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {SUGGESTED_SHOTS.map((shot) => (
            <span
              key={shot}
              className="rounded-full border border-graphite-700/40 bg-graphite-900/50 px-2.5 py-1 text-xs text-graphite-300"
            >
              {shot}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <CloudinaryUploader
          folder="sell-requests"
          label="Upload Vehicle Photos"
          maxFiles={15}
          maxSizeMB={10}
          acceptedTypes={["image/jpeg", "image/jpg", "image/png", "image/webp"]}
          initialUrls={data.photo_urls}
          onChange={(urls) => onChange({ photo_urls: urls })}
        />
        <p className="mt-2 text-xs text-graphite-500">
          Up to 15 photos · JPG, PNG or WEBP · 10 MB max per photo
        </p>
        {fieldError(errors, "photo_urls") && (
          <span className={errorClass}>{errors.photo_urls}</span>
        )}
      </div>
    </div>
  );
}
