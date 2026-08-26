import { whatsappLink } from "@/lib/utils";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.885.52 3.65 1.425 5.159L2 22l4.945-1.398A9.947 9.947 0 0012.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.062a7.995 7.995 0 01-4.075-1.117l-.293-.174-3.03.857.86-2.955-.19-.303A7.996 7.996 0 014 12c0-4.411 3.589-8 8.001-8C16.412 4 20 7.589 20 12s-3.588 8.001-7.999 8.062z" />
    </svg>
  );
}

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
      <a href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-plate bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-[0_8px_24px_-4px_rgba(16,185,129,0.4)]"
      >
        <WhatsAppIcon className="h-4 w-4" />
        {label}
      </a>
    );
  }

  return (
    <a href={href}
      target="_blank"
      rel="noopener noreferrer"
      // Added justify-center, consolidated padding to p-3.5, and changed gap to transition on hover
      className="group fixed bottom-5 right-5 z-50 flex items-center justify-center gap-0 p-3.5 rounded-full bg-emerald-600 text-sm font-semibold text-white shadow-lg shadow-black/30 transition-all duration-300 hover:bg-emerald-500 group-hover:gap-2 group-hover:pr-5 sm:bottom-6 sm:right-6"
      aria-label="Chat on WhatsApp">
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-emerald-500/50" />
      <WhatsAppIcon className="h-6 w-6 shrink-0" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[10rem] group-hover:opacity-100">
        {label}
      </span>
    </a>
  );
}