import SellCarForm from "@/components/sell-car/SellCarForm";

export const metadata = {
  title: "Sell Your Car",
  description:
    "Submit your vehicle details and photos to VS Auto Mart for a potential valuation or purchase offer.",
};

export default function SellYourCarPage() {
  return (
    <div>
      <section className="border-b border-graphite-700/10 bg-graphite-950 px-6 py-16 text-center text-paper sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brass-400">
          Sell Your Car
        </p>
        <h1 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
          Thinking About Selling Your Car?
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-graphite-300 sm:text-base">
          Submit your vehicle details and photos. Our team will review your vehicle and contact
          you regarding a potential valuation or purchase offer.
        </p>
        <a
          href="#sell-car-form"
          className="mt-7 inline-block rounded-plate bg-brass-500 px-7 py-3 text-sm font-semibold text-graphite-950 transition-colors hover:bg-brass-400"
        >
          Start Your Submission
        </a>
        <p className="mx-auto mt-5 max-w-md text-xs text-graphite-500">
          This is not an instant guaranteed valuation. Final valuation is subject to vehicle
          inspection and verification.
        </p>
      </section>

      <section id="sell-car-form" className="px-6 py-12 sm:py-16">
        <SellCarForm />
      </section>
    </div>
  );
}
