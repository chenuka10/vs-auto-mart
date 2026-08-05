"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/inventory", label: "Inventory" },
  { href: "/customers", label: "Happy Customers" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isHome = pathname === "/";

  return (
    <header
      className={`${
        isHome
          ? "absolute inset-x-0 top-0 bg-black/20" 
          : "sticky top-0 bg-graphite-950/90"
      } z-50 border-b border-white/10 backdrop-blur-md transition-colors duration-200`}
    >
      <div className="flex items-center justify-between gap-4 px-6 py-4 md:px-10">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="VS Auto Mart"
            width={40}
            height={40}
            className="h-9 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 text-sm font-medium tracking-wide text-white md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition ${
                  active ? "text-brass-400" : "hover:text-brass-400"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <Link
          href="/inventory"
          className="hidden rounded-plate border border-brass-400/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-brass-400 transition hover:bg-brass-400 hover:text-graphite-950 md:inline-block"
        >
          Explore Inventory
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-plate text-brass-400 transition hover:bg-white/5 md:hidden"
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-black/60 backdrop-blur-md transition-[max-height] duration-300 ease-in-out md:hidden ${
          open ? "max-h-80" : "max-h-0 border-t-0"
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
                className={`rounded-plate px-3 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-brass-400/10 text-brass-400"
                    : "text-graphite-200 hover:bg-white/5 hover:text-brass-400"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/inventory"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-plate border border-brass-400/40 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-brass-400 transition hover:bg-brass-400 hover:text-graphite-950"
          >
            Explore Inventory
          </Link>
        </nav>
      </div>
    </header>
  );
}