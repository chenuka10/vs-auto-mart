import { z } from "zod";

/**
 * Single source of truth for "Sell Your Car" validation. The multi-step
 * form validates each step against its slice on the client (fast feedback),
 * and the server action re-validates the full object before touching the
 * database — never trust the client alone (see lib/sell-car/submit.ts).
 */

// Sri Lankan mobile numbers: 07XXXXXXXX or +947XXXXXXXX (with optional
// spaces/dashes, which we strip before validating).
const LK_PHONE_REGEX = /^(?:\+94|0)7\d{8}$/;

function normalizePhone(raw: string): string {
  const digitsAndPlus = raw.replace(/[\s-]/g, "");
  return digitsAndPlus;
}

const phoneSchema = z
  .string()
  .trim()
  .transform(normalizePhone)
  .refine((v) => LK_PHONE_REGEX.test(v), {
    message: "Enter a valid Sri Lankan mobile number (e.g. 0771234567).",
  })
  .transform((v) => (v.startsWith("+94") ? "0" + v.slice(3) : v));

export const sellerInfoSchema = z.object({
  seller_name: z.string().trim().min(1, "Full name is required.").max(120),
  seller_phone: phoneSchema,
  seller_whatsapp: phoneSchema,
  seller_email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(255)
    .optional()
    .or(z.literal("")),
});

const currentYear = new Date().getFullYear();

export const vehicleInfoSchema = z.object({
  vehicle_make: z.string().trim().min(1, "Make is required.").max(60),
  vehicle_model: z.string().trim().min(1, "Model is required.").max(60),
  vehicle_year: z.coerce
    .number()
    .int()
    .min(1980, "Enter a valid year.")
    .max(currentYear + 1, "Enter a valid year."),
  registration_number: z.string().trim().min(1, "Registration number is required.").max(20),
  mileage: z.coerce.number().int().min(0, "Mileage can't be negative.").max(2_000_000),
  fuel_type: z.enum(["petrol", "diesel", "hybrid", "electric", "other"]),
  transmission: z.enum(["automatic", "manual", "amt", "cvt", "other"]),
});

export const vehicleDetailsSchema = z.object({
  colour: z.string().trim().max(60).optional().or(z.literal("")),
  engine_capacity: z.string().trim().max(30).optional().or(z.literal("")),
  // Empty string (from a blank optional number input) must become
  // "not provided" rather than coerce to 0 and fail the min(1) check below.
  owners_count: z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? undefined : v),
    z.coerce.number().int().min(1).max(20).optional()
  ),
  condition: z.enum(["excellent", "good", "fair", "needs_repairs"]),
  asking_price: z.coerce.number().positive("Enter an asking price greater than 0."),
  description: z.string().trim().max(4000).optional().or(z.literal("")),
});

export const photosSchema = z
  .array(z.string().url())
  .min(1, "Add at least one photo.")
  .max(15, "You can upload up to 15 photos.");

export const consentSchema = z.object({
  consent_given: z.literal(true, {
    errorMap: () => ({ message: "You must agree before submitting." }),
  }),
});

export const sellCarSubmissionSchema = sellerInfoSchema
  .merge(vehicleInfoSchema)
  .merge(vehicleDetailsSchema)
  .merge(consentSchema)
  .extend({
    photo_urls: photosSchema,
  });

export type SellerInfoInput = z.infer<typeof sellerInfoSchema>;
export type VehicleInfoInput = z.infer<typeof vehicleInfoSchema>;
export type VehicleDetailsInput = z.infer<typeof vehicleDetailsSchema>;
export type SellCarSubmissionInput = z.infer<typeof sellCarSubmissionSchema>;

export const FUEL_OPTIONS: { value: VehicleInfoInput["fuel_type"]; label: string }[] = [
  { value: "petrol", label: "Petrol" },
  { value: "diesel", label: "Diesel" },
  { value: "hybrid", label: "Hybrid" },
  { value: "electric", label: "Electric" },
  { value: "other", label: "Other" },
];

export const TRANSMISSION_OPTIONS: { value: VehicleInfoInput["transmission"]; label: string }[] = [
  { value: "automatic", label: "Automatic" },
  { value: "manual", label: "Manual" },
  { value: "amt", label: "AMT" },
  { value: "cvt", label: "CVT" },
  { value: "other", label: "Other" },
];

export const CONDITION_OPTIONS: { value: VehicleDetailsInput["condition"]; label: string }[] = [
  { value: "excellent", label: "Excellent" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "needs_repairs", label: "Needs Repairs" },
];
