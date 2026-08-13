import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/inventory", label: "Inventory" },
  { href: "/reviews", label: "Customer Stories" },
  { href: "/about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/people/VS-auto-mart/100063609908658/", label: "Facebook" },
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://www.tiktok.com/@vs_auto_mart", label: "TikTok" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] py-14 text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.2fr_1fr_1fr] md:px-10">
        <div>
          <Image src="/logo.png" alt="VS Auto Mart" width={40} height={40} className="h-9 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-graphite-400">
            Premium used vehicles, inspected and sold with transparency —
            Kadawatha, Sri Lanka.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-graphite-500">Navigate</p>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-graphite-300 transition hover:text-brass-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-graphite-500">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-graphite-300">
            <li className="font-mono">+94 77 250 0320</li>
            <li>Kadawatha, Sri Lanka</li>
          </ul>
          <div className="mt-4 flex gap-4 text-sm">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-graphite-400 transition hover:text-brass-400"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-6 pt-6 text-xs text-graphite-600 md:px-10">
        © {new Date().getFullYear()} VS Auto Mart. All rights reserved.
      </div>
    </footer>
  );
}
