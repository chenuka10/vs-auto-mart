"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { SellCarStatus } from "@/lib/types";

const VALID_STATUSES: SellCarStatus[] = [
  "NEW",
  "REVIEWING",
  "CONTACTED",
  "INSPECTION",
  "OFFER_MADE",
  "PURCHASED",
  "REJECTED",
  "CLOSED",
];

/**
 * Every mutation here relies on the authenticated Supabase client + RLS
 * (see supabase/sell_car_submissions.sql — only `authenticated` role can
 * update/delete these rows), so an unauthenticated caller's update is
 * rejected at the database, not just hidden in the UI. The middleware/
 * layout auth check is defense-in-depth on top of that, matching the
 * existing vehicles admin actions.
 */

export async function updateSubmissionStatus(id: string, status: SellCarStatus) {
  if (!VALID_STATUSES.includes(status)) {
    throw new Error("Invalid status.");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("sell_car_submissions").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/sell-requests");
  revalidatePath(`/admin/sell-requests/${id}`);
}

export async function updateSubmissionNotes(id: string, admin_notes: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("sell_car_submissions")
    .update({ admin_notes: admin_notes.trim() || null })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath(`/admin/sell-requests/${id}`);
}

export async function deleteSubmission(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("sell_car_submissions").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/sell-requests");
}
