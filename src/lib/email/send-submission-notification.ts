import { formatLKR, formatMileage } from "@/lib/utils";
import type { SellCarSubmission } from "@/lib/types";

/**
 * Sends the "new vehicle submission" email to VS Auto Mart staff.
 *
 * Uses Resend (https://resend.com) — no email infrastructure existed in the
 * project before this feature, and Resend needs no SMTP setup, which keeps
 * this simple on Vercel. Requires:
 *   RESEND_API_KEY        — server-only, from the Resend dashboard
 *   SELL_CAR_NOTIFY_EMAIL — where staff notifications are sent
 *   NEXT_PUBLIC_SITE_URL  — e.g. https://vsautomart.lk, used to build the
 *                            "View Submission" link (falls back to the
 *                            metadataBase domain already used in layout.tsx)
 *
 * A failure here is logged and swallowed by the caller (see
 * lib/sell-car/submit.ts) — the submission itself has already been saved
 * successfully by the time this runs, so the customer must still see
 * success even if this email fails.
 */
export async function sendSubmissionNotification(submission: SellCarSubmission): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.SELL_CAR_NOTIFY_EMAIL;

  if (!apiKey || !notifyEmail) {
    throw new Error("Email notification is not configured (RESEND_API_KEY / SELL_CAR_NOTIFY_EMAIL).");
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vsautomart.lk";
  const adminUrl = `${baseUrl}/admin/sell-requests/${submission.id}`;

  const html = `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
      <h2 style="margin-bottom: 4px;">New Vehicle Submission</h2>
      <p style="color: #666; margin-top: 0;">Reference: <strong>${submission.reference_number}</strong></p>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 4px 0; color: #666;">Vehicle</td><td>${submission.vehicle_make} ${submission.vehicle_model}</td></tr>
        <tr><td style="padding: 4px 0; color: #666;">Year</td><td>${submission.vehicle_year}</td></tr>
        <tr><td style="padding: 4px 0; color: #666;">Mileage</td><td>${formatMileage(submission.mileage)}</td></tr>
        <tr><td style="padding: 4px 0; color: #666;">Asking Price</td><td>${formatLKR(submission.asking_price)}</td></tr>
        <tr><td style="padding: 4px 0; color: #666;">Seller</td><td>${submission.seller_name}</td></tr>
        <tr><td style="padding: 4px 0; color: #666;">Phone</td><td>${submission.seller_phone}</td></tr>
      </table>
      <a href="${adminUrl}" style="display: inline-block; margin-top: 16px; padding: 10px 18px; background: #0B0B0B; color: #C8A951; text-decoration: none; border-radius: 6px; font-weight: 600;">
        View Submission
      </a>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "VS Auto Mart <notifications@vsautomart.lk>",
      to: notifyEmail,
      subject: `New Vehicle Submission — ${submission.vehicle_make} ${submission.vehicle_model} (${submission.reference_number})`,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend API error (${res.status}): ${body}`);
  }
}
