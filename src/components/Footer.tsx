export default function Footer() {
  return (
    <footer className="border-t border-graphite-700/10 bg-graphite-950 text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold">VS Auto Mart</p>
          <p className="mt-3 text-sm text-graphite-300">
            Your trusted partner for quality vehicles in Sri Lanka.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">
            Visit &amp; Contact
          </p>
          <ul className="mt-3 space-y-2 text-sm text-graphite-300">
            <li>Kadawatha, Sri Lanka</li>
            <li>+94 77 123 4567</li>
            <li>Mon – Sat, 9am – 6pm</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">
            Follow Along
          </p>
          <ul className="mt-3 space-y-2 text-sm text-graphite-300">
            <li>Facebook</li>
            <li>Instagram</li>
            <li>TikTok</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-graphite-300">
        © {new Date().getFullYear()} VS Auto Mart. All rights reserved.
      </div>
    </footer>
  );
}
