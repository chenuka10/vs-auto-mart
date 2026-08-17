"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/inventory", label: "Inventory" },
  { href: "/customers", label: "Happy Customers" },
  { href: "/sell-your-car", label: "Sell Your Car" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" }
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isHome = pathname === "/";

  return (
    <header
      className={`${
        isHome
          ? "absolute inset-x-0 top-0 bg-gradient-to-b from-black/60 to-transparent border-b border-transparent"
          : "sticky top-0 bg-graphite-950/80 border-b border-brass-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
      } z-50 backdrop-blur-xl transition-all duration-300`}
    >
      <div className="relative flex items-center justify-between px-6 py-4 md:px-10">
        {/* Brand Logo (Left) */}
        <Link href="/" className="relative z-10 flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="VS Auto Mart"
            width={40}
            height={40}
            className="h-9 w-auto"
            priority
          />

          <div className="flex flex-col leading-tight">
            <span className={`font-display text-lg font-semibold tracking-wide ${isHome ? "text-white" : "text-graphite-100"}`}>
              VS Auto Mart
            </span>

            <span className="text-[10px] uppercase tracking-[0.25em] text-brass-400">
              Driven by TRUST
            </span>
          </div>
        </Link>

        {/* Desktop Navigation (Center) */}
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-brass-400 ${
                isHome ? "text-white" : "text-graphite-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions (Right) */}
        <div className="relative z-10 hidden items-center gap-6 md:flex">
          <ThemeToggle />
          <a
            href="tel:+94772500320"
            className="rounded-plate bg-gradient-gold px-5 py-2.5 text-sm font-medium text-graphite-950 transition-all hover:-translate-y-0.5 hover:shadow-glow-gold"
          >
            Call Us
          </a>
        </div>

        {/* Mobile Menu Toggle & Theme */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-plate text-brass-400 transition hover:bg-graphite-800/40"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              className="h-6 w-6"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden border-t border-brass-500/20 bg-graphite-950/95 shadow-[0_20px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all duration-300 ease-in-out ${
          open
            ? "max-h-96 opacity-100"
            : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-plate px-4 py-3.5 text-sm font-medium transition ${
                  active
                    ? "bg-brass-400/10 text-brass-400"
                    : "text-graphite-100 hover:bg-graphite-800/40 hover:text-brass-400"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/inventory"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-plate border border-brass-400/40 px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-brass-400 transition hover:bg-brass-400 hover:text-graphite-950"
          >
            Explore Inventory
          </Link>
        </nav>
      </div>
    </header>
  );
}
