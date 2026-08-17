import Link from "next/link";

export default function SellCarBanner() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-graphite-700/30 bg-graphite-900/40 px-6 py-14 text-center shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-3xl sm:px-12 sm:py-16">
      {/* Ambient glow */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brass-500/[0.12] blur-[100px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-brass-500/[0.04] blur-[110px]" />

      <p className="relative text-xs font-semibold uppercase tracking-[0.24em] text-brass-500">
        Have A Car To Sell?
      </p>
      <h2 className="relative mx-auto mt-3 max-w-lg font-display text-2xl font-bold text-graphite-100 sm:text-3xl">
        Get Your Car Valued
      </h2>
      <p className="relative mx-auto mt-3 max-w-md text-sm leading-7 text-graphite-400">
        Submit your vehicle details and photos — our team will review it and reach out about a
        potential purchase.
      </p>
      <Link
        href="/sell-your-car"
        className="relative mt-7 inline-flex items-center gap-2 rounded-plate bg-gradient-gold px-7 py-3 text-sm font-semibold text-graphite-950 transition-all hover:shadow-glow-gold hover:-translate-y-0.5"
      >
        Start Your Submission
        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </Link>
    </div>
  );
}
