import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import { formatLKR } from "@/lib/utils";

function getAdminSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase configuration (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Verifies webhook payload against Meta's HMAC-SHA256 signature header.
 */
function verifySignature(rawBody: string, signatureHeader: string | null, appSecret: string): boolean {
  if (!signatureHeader || !signatureHeader.startsWith("sha256=")) {
    return false;
  }

  const signatureHex = signatureHeader.slice(7);
  const expectedHex = crypto
    .createHmac("sha256", appSecret)
    .update(rawBody, "utf8")
    .digest("hex");

  const sigBuffer = Buffer.from(signatureHex, "utf8");
  const expBuffer = Buffer.from(expectedHex, "utf8");

  if (sigBuffer.length !== expBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(sigBuffer, expBuffer);
}

/**
 * Helper to send a text message via Meta Graph API.
 */
export async function sendText(to: string, bodyText: string): Promise<void> {
  await sendWhatsAppMessage({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to,
    type: "text",
    text: {
      preview_url: true,
      body: bodyText,
    },
  });
}

/**
 * Helper to send an image/media message via Meta Graph API.
 */
export async function sendMedia(to: string, imageUrl: string, caption?: string): Promise<void> {
  await sendWhatsAppMessage({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to,
    type: "image",
    image: {
      link: imageUrl,
      ...(caption ? { caption } : {}),
    },
  });
}

async function sendWhatsAppMessage(payload: Record<string, unknown>): Promise<void> {
  const phoneNumberId = process.env.WA_PHONE_NUMBER_ID;
  const accessToken = process.env.WA_ACCESS_TOKEN;

  if (!phoneNumberId || !accessToken) {
    console.error("WhatsApp Cloud API configuration missing (WA_PHONE_NUMBER_ID / WA_ACCESS_TOKEN)");
    return;
  }

  const url = `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`WhatsApp API error (${res.status}):`, errorBody);
    }
  } catch (err) {
    console.error("Failed to send WhatsApp message via Meta Graph API:", err);
  }
}

/**
 * 1. GET Handler — Responds to Meta's webhook verification challenge.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const verifyToken = process.env.WA_VERIFY_TOKEN;

  if (mode === "subscribe" && token && verifyToken && token === verifyToken) {
    return new Response(challenge ?? "", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return new Response("Forbidden", { status: 403 });
}

/**
 * 2. POST Handler — Processes incoming WhatsApp webhook messages.
 */
export async function POST(request: Request) {
  let rawBody = "";

  try {
    // 1. Read the raw request body as text FIRST before JSON parsing
    rawBody = await request.text();
  } catch (err) {
    console.error("Failed to read raw request body:", err);
    return new Response("OK", { status: 200 });
  }

  // 2. Verify against the x-hub-signature-256 header using HMAC-SHA256
  const appSecret = process.env.WA_APP_SECRET;
  const signatureHeader = request.headers.get("x-hub-signature-256");

  if (!appSecret || !verifySignature(rawBody, signatureHeader, appSecret)) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // 3. Parse the verified body and extract the incoming message
    const body = JSON.parse(rawBody);
    const message = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    // Meta sends status updates (delivery, read receipts) without a message object
    if (!message) {
      return new Response("OK", { status: 200 });
    }

    const messageId = String(message.id ?? "").trim();
    const from = String(message.from ?? "").trim();

    if (!messageId || !from) {
      return new Response("OK", { status: 200 });
    }

    const supabase = getAdminSupabase();

    // 4. Deduplicate message ID against processed_messages table
    const { error: dedupError } = await supabase
      .from("processed_messages")
      .insert({ message_id: messageId });

    if (dedupError) {
      // If already processed (unique violation), return 200 immediately
      if (dedupError.code === "23505" || dedupError.message?.toLowerCase().includes("duplicate")) {
        return new Response("OK", { status: 200 });
      }
    }

    // 5. Handle non-text messages gracefully
    if (message.type !== "text" || !message.text?.body) {
      await sendText(
        from,
        "Thank you for contacting VS Auto Mart! 🚗\n\nPlease send us a text message with the vehicle model name (e.g. 'Celerio', 'Aqua', 'Grace') or type 'cars' to view our inventory."
      );
      return new Response("OK", { status: 200 });
    }

    const userText = message.text.body.toLowerCase().trim();

    // 6. Build the list of matchable models by querying available vehicles dynamically
    const { data: modelRows, error: modelError } = await supabase
      .from("vehicles")
      .select("model")
      .ilike("status", "available");

    if (modelError) {
      console.error("Error querying available vehicle models:", modelError);
    }

    const distinctModels = Array.from(
      new Set(
        (modelRows ?? [])
          .map((row: { model: string }) => row.model?.trim())
          .filter((m: string): m is string => Boolean(m))
      )
    );

    // 7. Match customer's message text against the live model list or 'cars'/'photo' keywords
    const matchedModel = distinctModels.find((m) =>
      userText.includes(m.toLowerCase())
    );

    const isKeywordMatch = userText.includes("cars") || userText.includes("photo");

    if (matchedModel || isKeywordMatch) {
      let query = supabase
        .from("vehicles")
        .select("id, brand, model, year, price, slug, status, vehicle_images(image_url, is_cover, sort_order)")
        .ilike("status", "available");

      if (matchedModel) {
        query = query.ilike("model", `%${matchedModel}%`);
      }

      query = query.order("date_added", { ascending: false }).limit(1);

      const { data: vehicles, error: vehicleError } = await query;

      if (vehicleError) {
        console.error("Error querying vehicle:", vehicleError);
      }

      const car = vehicles?.[0];

      // Fallback if no matching car is available
      if (!car) {
        await sendText(
          from,
          "Sorry, we don't currently have that vehicle in stock.\n\nYou can explore our latest available inventory online at https://www.vsautomart.lk/inventory"
        );
        return new Response("OK", { status: 200 });
      }

      // Extract image URL from primary_image, images[0], or sorted vehicle_images
      const sortedImages = Array.isArray(car.vehicle_images)
        ? [...car.vehicle_images].sort((a, b) =>
            a.is_cover === b.is_cover ? a.sort_order - b.sort_order : a.is_cover ? -1 : 1
          )
        : [];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rawCar = car as any;
      const imageUrl: string | null =
        rawCar.primary_image ||
        rawCar.images?.[0] ||
        sortedImages[0]?.image_url ||
        null;

      const formattedPrice = car.price ? formatLKR(car.price) : "";
      const carTitle = `${car.brand ?? ""} ${car.model ?? ""} (${car.year ?? ""})`.trim();
      const caption = `${carTitle}${formattedPrice ? ` — ${formattedPrice}` : ""}\nAvailable at VS Auto Mart, Kadawatha.`;

      // If image is present, send media message; otherwise, fallback to text-only summary
      if (imageUrl) {
        await sendMedia(from, imageUrl, caption);
      } else {
        await sendText(
          from,
          `🚗 *${carTitle}*\n💰 Price: ${formattedPrice || "Contact for price"}\n📍 Location: Kadawatha\nStatus: Available`
        );
      }

      // Follow up with a text message linking to the vehicle details or inventory page
      const detailLink = car.slug
        ? `https://www.vsautomart.lk/cars/${car.slug}`
        : "https://www.vsautomart.lk/inventory";

      await sendText(from, `View full details, specs & photos here:\n${detailLink}`);
    } else {
      // 8. Generic welcome message if no model/keyword matched
      await sendText(
        from,
        "Hello! Welcome to VS Auto Mart (Kadawatha) 🚗\n\nLooking for a vehicle? Send us a model name (e.g. 'Celerio', 'Aqua', 'Grace') or type 'cars' to view available vehicles.\n\nYou can also explore our full inventory online at https://www.vsautomart.lk/inventory"
      );
    }
  } catch (error) {
    // Log any internal error, but ALWAYS return 200 to Meta to avoid infinite retry loops
    console.error("WhatsApp webhook internal error:", error);
  }

  return new Response("OK", { status: 200 });
}
