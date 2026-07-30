import Image from "next/image";

export const metadata = {
  title: "About Us",
  description: "The story behind VS Auto Mart and the founder who built it.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-display text-3xl font-semibold">Our Story</h1>
      <p className="mt-4 leading-relaxed text-graphite-700">
        VS Auto Mart started as a small, word-of-mouth operation and grew into a
        trusted name for quality used vehicles — built one honest sale at a time.
        Every car that leaves our care is inspected, priced fairly, and backed by
        a team that treats every customer like a repeat one.
      </p>

      <div className="mt-14 grid gap-8 rounded-lg border border-graphite-700/10 bg-white p-8 sm:grid-cols-3">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-graphite-100 sm:col-span-1">
          <Image src="/founder-photo.jpg" alt="Founder of VS Auto Mart" fill className="object-cover" />
        </div>
        <div className="sm:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-brass-600">Meet the Founder</p>
          <h2 className="mt-1 font-display text-2xl font-semibold">Founder Name</h2>
          <p className="mt-3 text-sm leading-relaxed text-graphite-700">
            With years of hands-on experience in the automotive trade, our founder
            built VS Auto Mart on a simple principle: sell vehicles you'd be
            comfortable putting your own family in. That philosophy still shapes
            every vehicle we take on today.
          </p>
        </div>
      </div>
    </div>
  );
}
