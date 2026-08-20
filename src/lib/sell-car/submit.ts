"use server";

import { createClient } from "@/lib/supabase/server";
import { sellCarSubmissionSchema } from "@/lib/validation/sell-car";
import { generateReferenceNumber, UNIQUE_VIOLATION_CODE } from "./reference-number";
import { sendSubmissionNotification } from "@/lib/email/send-submission-notification";
import type { SellCarSubmission } from "@/lib/types";

export interface SubmitSellCarResult {
  success: boolean;
  referenceNumber?: string;
  fieldErrors?: Record<string, string>;
  formError?: string;
}

const MAX_REFERENCE_ATTEMPTS = 5;

// Simple abuse guard: cap submissions per phone number per day. This runs
// against the table itself rather than an in-memory map, so it works
// correctly across Vercel's serverless instances without needing an
// external rate-limit service. It's not IP-based — a determined abuser
// could still rotate numbers — but it stops accidental double-submits and
// casual spam without adding infrastructure. Revisit with Upstash/Vercel
// KV if abuse becomes a real problem.
const MAX_SUBMISSIONS_PER_PHONE_PER_DAY = 3;

export async function submitSellCarForm(rawInput: unknown): Promise<SubmitSellCarResult> {
  const parsed = sellCarSubmissionSchema.safeParse(rawInput);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString() ?? "form";
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { success: false, fieldErrors };
  }

  const data = parsed.data;
  const supabase = await createClient();

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count: recentCount } = await supabase
    .from("sell_car_submissions")
    .select("id", { count: "exact", head: true })
    .eq("seller_phone", data.seller_phone)
    .gte("created_at", since);

  if ((recentCount ?? 0) >= MAX_SUBMISSIONS_PER_PHONE_PER_DAY) {
    return {
      success: false,
      formError: "You've already submitted a few vehicles today. Our team will be in touch — please wait before submitting again.",
    };
  }

  const submissionRow = {
    seller_name: data.seller_name,
    seller_phone: data.seller_phone,
    seller_whatsapp: data.seller_whatsapp,
    seller_email: data.seller_email || null,

    vehicle_make: data.vehicle_make,
    vehicle_model: data.vehicle_model,
    vehicle_year: data.vehicle_year,
    registration_number: data.registration_number ? data.registration_number.trim() : null,
    mileage: data.mileage,

    fuel_type: data.fuel_type,
    transmission: data.transmission,
    colour: data.colour || null,
    engine_capacity: data.engine_capacity || null,
    owners_count: data.owners_count ?? null,
    condition: data.condition,

    asking_price: data.asking_price,
    description: data.description || null,

    status: "NEW" as const,
    admin_notes: null,
    assigned_to: null,

    consent_given: true,
    consent_at: new Date().toISOString(),
  };

  let submission: SellCarSubmission | null = null;
  let lastError: { code?: string; message: string } | null = null;

  for (let attempt = 0; attempt < MAX_REFERENCE_ATTEMPTS; attempt++) {
    const reference_number = generateReferenceNumber();
    // NOTE: pre-generate the id and DON'T chain .select() here. The anon
    // role only has an INSERT policy on this table (no SELECT — it holds
    // seller PII), and Postgres RLS applies the table's SELECT policy to
    // an INSERT's RETURNING clause, not the INSERT policy. Chaining
    // .select() makes supabase-js request `Prefer: return=representation`
    // (INSERT ... RETURNING *), which Postgres then blocks with 42501
    // even though the row itself satisfies the INSERT WITH CHECK. Without
    // .select(), supabase-js sends `Prefer: return=minimal`, so no
    // RETURNING/SELECT check ever happens — we already have everything we
    // need (id, reference_number) since we generated them ourselves.
    const id = crypto.randomUUID();
    const { error } = await supabase
      .from("sell_car_submissions")
      .insert({ id, ...submissionRow, reference_number });

    if (!error) {
      submission = { id, reference_number, ...submissionRow } as unknown as SellCarSubmission;
      break;
    }

    lastError = { code: error.code, message: error.message };
    if (error.code !== UNIQUE_VIOLATION_CODE) break; // not a collision — stop retrying
  }

  if (!submission) {
    console.error("Failed to create sell-car submission:", lastError);
    return {
      success: false,
      formError: "We couldn't submit your request. Please try again.",
    };
  }

  if (data.photo_urls.length > 0) {
    const { error: photosError } = await supabase.from("sell_car_submission_photos").insert(
      data.photo_urls.map((image_url, index) => ({
        submission_id: submission!.id,
        image_url,
        sort_order: index,
      }))
    );
    // Photos failing to attach shouldn't block the submission the seller
    // already successfully created — log it so staff can follow up, but
    // still report success (the reference number and core details exist).
    if (photosError) {
      console.error(`Failed to attach photos to submission ${submission.reference_number}:`, photosError);
    }
  }

  try {
    await sendSubmissionNotification(submission);
  } catch (err) {
    // Never fail the customer's submission because the notification email
    // didn't send — the record is already safely in Supabase.
    console.error(`Failed to send notification email for ${submission.reference_number}:`, err);
  }

  return { success: true, referenceNumber: submission.reference_number };
}