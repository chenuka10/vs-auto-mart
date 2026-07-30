import Link from "next/link";

const NAV_LINKS = [
  { href: "/inventory", label: "Inventory" },
  { href: "/customers", label: "Happy Customers" },
  { href: "/about", label: "About" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-graphite-700/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight">
          VS <span className="text-brass-500">Auto Mart</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-graphite-700 transition hover:text-graphite-950"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/inventory"
          className="rounded-plate bg-graphite-950 px-4 py-2 text-sm font-semibold text-paper transition hover:bg-graphite-900"
        >
          Browse Vehicles
        </Link>
      </div>
    </header>
  );
}
