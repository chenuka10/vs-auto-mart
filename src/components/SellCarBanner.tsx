import Link from "next/link";

export default function SellCarBanner() {
  return (
    <section className="border-y border-graphite-700/10 bg-graphite-950 px-6 py-10 text-center text-paper">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brass-400">
        Have A Car To Sell?
      </p>
      <h2 className="mx-auto mt-2 max-w-lg font-display text-2xl font-semibold sm:text-3xl">
        Get Your Car Valued
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-graphite-300">
        Submit your vehicle details and photos — our team will review it and reach out about a
        potential purchase.
      </p>
      <Link
        href="/sell-your-car"
        className="mt-5 inline-block rounded-plate bg-brass-500 px-6 py-2.5 text-sm font-semibold text-graphite-950 transition-colors hover:bg-brass-400"
      >
        Start Your Submission
      </Link>
    </section>
  );
}
