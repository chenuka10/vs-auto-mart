import SellCarForm from "@/components/sell-car/SellCarForm";

export const metadata = {
  title: "Sell Your Car",
  description:
    "Submit your vehicle details and photos to VS Auto Mart for a potential valuation or purchase offer.",
};

export default function SellYourCarPage() {
  return (
    <main className="relative overflow-hidden">
      {/* ── ambient bg ── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -right-32 top-10 h-[36rem] w-[36rem] rounded-full bg-brass-500/[0.08] blur-[140px]" />
        <div className="absolute left-0 top-[36rem] h-[28rem] w-[28rem] rounded-full bg-white/[0.03] blur-[130px]" />
      </div>

      <section className="mx-auto max-w-3xl px-6 pt-16 pb-10 text-center sm:pt-20 sm:pb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brass-500">
          Sell Your Car
        </p>
        <h1 className="mx-auto mt-4 font-display text-4xl font-bold tracking-tight text-graphite-100 sm:text-5xl">
          Thinking About Selling Your Car?
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-graphite-400 sm:text-lg">
          Submit your vehicle details and photos. Our team will review your vehicle and contact
          you regarding a potential valuation or purchase offer.
        </p>
        <a
          href="#sell-car-form"
          className="mt-8 inline-block rounded-plate bg-gradient-gold px-7 py-3 text-sm font-semibold text-graphite-950 transition-all hover:shadow-glow-gold hover:-translate-y-0.5"
        >
          Start Your Submission
        </a>
        <p className="mx-auto mt-5 max-w-md text-xs text-graphite-500">
          This is not an instant guaranteed valuation. Final valuation is subject to vehicle
          inspection and verification.
        </p>
      </section>

      <section id="sell-car-form" className="px-6 pb-16 pt-4 sm:pb-24">
        <SellCarForm />
      </section>
    </main>
  );
}
