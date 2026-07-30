import { whatsappLink } from "@/lib/utils";

export default function WhatsAppButton({
  message = "Hi, I'm interested in a vehicle from VS Auto Mart.",
  label = "WhatsApp Now",
  variant = "floating",
}: {
  message?: string;
  label?: string;
  variant?: "floating" | "inline";
}) {
  const href = whatsappLink(message);

  if (variant === "inline") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-plate bg-moss-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-moss-600/90"
      >
        {label}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-moss-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-moss-600/90"
      aria-label="Chat on WhatsApp"
    >
      {label}
    </a>
  );
}
