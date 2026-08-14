"use server";

import crypto from "crypto";
import { createClient } from "@/lib/supabase/server";

interface CloudinarySignature {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder: string;
}

/**
 * Folders this action will ever sign for, mapped to whether an
 * authenticated (admin) session is required. `sell-requests` is public on
 * purpose — sellers submitting the "Sell Your Car" form aren't logged in —
 * everything else (existing inventory/testimonials uploads) stays
 * admin-only, matching how those upload flows already work.
 */
const FOLDER_RULES: Record<string, { requiresAuth: boolean }> = {
  vehicles: { requiresAuth: true },
  testimonials: { requiresAuth: true },
  "sell-requests": { requiresAuth: false },
};

export async function getCloudinarySignature(folder: string): Promise<CloudinarySignature> {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!apiSecret || !apiKey || !cloudName) {
    throw new Error("Cloudinary environment variables are not configured.");
  }

  const rule = FOLDER_RULES[folder];
  if (!rule) {
    throw new Error("Unrecognized upload folder.");
  }

  if (rule.requiresAuth) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("Not authorized.");
    }
  }

  // Only the new sell-requests flow gets the "vs-auto-mart/" prefix (see
  // spec: keep acquisition photos in a dedicated folder, separate from
  // inventory). Existing vehicles/testimonials uploads keep their current
  // path unchanged so this doesn't move where those images land.
  const resolvedFolder = folder === "sell-requests" ? `vs-auto-mart/${folder}` : folder;
  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = `folder=${resolvedFolder}&timestamp=${timestamp}`;

  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign + apiSecret)
    .digest("hex");

  return { signature, timestamp, apiKey, cloudName, folder: resolvedFolder };
}