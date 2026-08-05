"use client";

import { motion } from "framer-motion";

const WHATSAPP_LINK = "https://wa.me/94771234567";

export default function WhatsAppButton({
  variant = "floating",
  label = "Need help finding your car?",
}: {
  variant?: "floating" | "inline";
  label?: string;
}) {
  if (variant === "inline") {
    return (
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-plate border border-white/20 px-6 py-3 text-sm font-semibold transition hover:bg-white/5"
      >
        {label}
      </a>
    );
  }

  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-3"
    >
      <span className="hidden whitespace-nowrap rounded-plate bg-graphite-950/90 px-3 py-2 text-xs font-medium text-paper opacity-0 shadow-lg backdrop-blur-sm transition group-hover:opacity-100 md:inline-block">
        {label}
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
        <motion.span
          animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-[#25D366]"
        />
        <svg viewBox="0 0 24 24" className="relative h-7 w-7 fill-white">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.47 3.47 1.29 4.92L2 22l5.31-1.39a9.86 9.86 0 0 0 4.73 1.2h.01c5.46 0 9.91-4.45 9.91-9.9 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.19 0 4.25.85 5.79 2.4a8.2 8.2 0 0 1 2.42 5.84c0 4.55-3.7 8.24-8.23 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.15.83.84-3.07-.2-.32a8.18 8.18 0 0 1-1.26-4.37c0-4.55 3.7-8.22 8.28-8.22Zm-3.1 4.36c-.16 0-.42.06-.64.31-.22.25-.85.83-.85 2.02s.87 2.35.99 2.51c.12.16 1.7 2.6 4.13 3.64 2.02.86 2.43.69 2.87.65.44-.04 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.44-1.34-1.68-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.32-.75-1.8-.2-.47-.4-.4-.55-.4h-.44Z" />
        </svg>
      </span>
    </a>
  );
}
