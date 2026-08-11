"use server";

import crypto from "crypto";

interface CloudinarySignature {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder: string;
}

export async function getCloudinarySignature(folder: string): Promise<CloudinarySignature> {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!apiSecret || !apiKey || !cloudName) {
    throw new Error("Cloudinary environment variables are not configured.");
  }

  // NOTE: this route sits behind your existing /admin auth. If you have a
  // shared session/role check helper, call it here too for defense-in-depth
  // before issuing a signature.

  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;

  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign + apiSecret)
    .digest("hex");

  return { signature, timestamp, apiKey, cloudName, folder };
}