"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton";

const NAV_ITEMS = [
  {
    href: "/admin",
    label: "Vehicles",
    isActive: (pathname: string) =>
      pathname === "/admin" || (pathname.startsWith("/admin/vehicles") && pathname !== "/admin/vehicles/new"),
  },
  {
    href: "/admin/sell-requests",
    label: "Sell Requests",
    isActive: (pathname: string) => pathname.startsWith("/admin/sell-requests"),
  },
  {
    href: "/admin/customer-stories",
    label: "Happy Customers",
    isActive: (pathname: string) => pathname.startsWith("/admin/customer-stories"),
  },
  {
    href: "/admin/testimonials",
    label: "Reviews",
    isActive: (pathname: string) => pathname.startsWith("/admin/testimonials"),
  },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm font-medium">
      {NAV_ITEMS.map((item) => {
        const active = item.isActive(pathname);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-plate px-3 py-2 transition-all duration-200 ${
              active
                ? "bg-brass-400/10 text-brass-400 font-semibold shadow-sm"
                : "text-graphite-300 hover:bg-graphite-800/40 hover:text-brass-400"
            }`}
          >
            {item.label}
          </Link>
        );
      })}

      <Link
        href="/admin/vehicles/new"
        className="rounded-plate bg-brass-500 px-3.5 py-2 font-semibold text-graphite-950 transition-all duration-200 hover:bg-brass-400 hover:shadow-glow-gold hover:-translate-y-0.5"
      >
        + Add Vehicle
      </Link>

      <SignOutButton />
    </nav>
  );
}
