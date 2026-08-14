import Image from "next/image";

export const metadata = {
  title: "About Us",
  description:
    "VS Auto Mart is a trusted vehicle dealership in Kadawatha, Sri Lanka, offering quality vehicles with honest service since 2012.",
};

const values = [
  "Honesty",
  "Trust",
  "Transparency",
  "Customer Satisfaction",
  "Professionalism",
  "Reliability",
  "Quality",
];

const whyChooseUs = [
  "Trusted dealership with years of experience",
  "Carefully selected quality vehicles",
  "Honest and transparent customer service",
  "Competitive market pricing",
  "Friendly and knowledgeable team",
  "Smooth and hassle-free purchasing experience",
  "Commitment to long-term customer satisfaction",
];

const services = [
  "Vehicle Sales",
  "Vehicle Sourcing",
  "Vehicle Imports",
  "Leasing & Finance Assistance",
  "Trade-In Assistance",
  "Vehicle Consultation",
  "After-Sales Customer Support",
];

const contactItems = [
  {
    label: "Phone",
    value: "077 250 0320",
  },
  {
    label: "WhatsApp",
    value: "077 250 0320",
  },
  {
    label: "Email",
    value: "vsautomart@gmail.com",
  },
  {
    label: "Business Hours",
    value: "Monday – Sunday · 8:00 AM – 6:00 PM",
  },
  {
    label: "Address",
    value: "158, Pushparama Road, Pahala Biyanwila, Kadawatha, Sri Lanka",
  },
];

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* =====================================================
            HERO
        ===================================================== */}
        <section className="animate-fade-up relative overflow-hidden rounded-[28px] border border-white/10 bg-graphite-950 text-white shadow-2xl">
          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brass-500/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/[0.03] blur-3xl"
          />

          <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:p-14">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brass-400">
                Since 2012 · Kadawatha · Sri Lanka
              </p>

              <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Built on trust.
                <br />
                Driven by cars.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
                VS Auto Mart is a trusted vehicle dealership based in Kadawatha,
                Sri Lanka, dedicated to providing quality vehicles with honest
                service, competitive pricing, and a buying experience built
                around transparency.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="glass-shine rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-xl">
                  500+ Happy Customers
                </div>

                <div className="glass-shine rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-xl">
                  Quality Used Vehicles
                </div>

                <div className="glass-shine rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-xl">
                  Honest Service
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="glass-panel rounded-3xl border-white/10 bg-white/[0.05] p-6 text-white/80 backdrop-blur-xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brass-400">
                  What matters to us
                </p>

                <p className="mt-4 font-display text-2xl leading-tight text-white">
                  “Sell vehicles you&apos;d be comfortable putting your own
                  family in.”
                </p>

                <div className="mt-6 h-px bg-white/10" />

                <p className="mt-4 text-xs uppercase tracking-[0.16em] text-white/40">
                  The principle behind VS Auto Mart
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            OUR STORY
        ===================================================== */}
        <section className="mt-20 grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div className="animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-600">
              The beginning
            </p>

            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-graphite-100 sm:text-4xl">
              Our Story
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-7 text-graphite-400">
              What began as a passion for automobiles grew into a dealership
              built around trust, reputation, and long-term relationships.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-brass-500 via-graphite-700/10 to-transparent" />

            <div className="space-y-8 pl-8 sm:pl-10">
              <div className="animate-fade-up">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brass-600">
                  2012
                </span>

                <p className="mt-3 text-base leading-8 text-graphite-300">
                  Our journey began in 2012, not as a dealership, but by simply
                  buying and selling our own vehicles. What started as a passion
                  for automobiles gradually grew through hard work, dedication,
                  and the trust of our customers.
                </p>
              </div>

              <div className="animate-fade-up animation-delay-100">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brass-600">
                  Today
                </span>

                <p className="mt-3 text-base leading-8 text-graphite-300">
                  As demand increased, we expanded our operations and
                  transformed into VS Auto Mart. Today, we continue to grow while
                  staying true to the values that helped us get here — honesty,
                  reliability, and customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            FOUNDER
        ===================================================== */}
        <section className="mt-20 overflow-hidden rounded-[28px] glass-card-dark bg-graphite-900/40">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative flex flex-col items-center justify-center overflow-hidden bg-graphite-950 min-h-[420px]">
              <Image
                src="/founder-photo.jpg"
                alt="Founder of VS Auto Mart"
                width={1254}
                height={1254}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="w-full h-full object-contain transition-transform duration-[900ms] ease-out hover:scale-[1.02]"
                style={{ maxHeight: "560px" }}
              />

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="inline-flex rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-xl">
                  Founder · VS Auto Mart
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-600">
                The person behind the journey
              </p>

              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-graphite-100 sm:text-4xl">
                Sumindaka Kariyapperuma
              </h2>

              <p className="mt-6 text-base leading-8 text-graphite-300">
                With years of hands-on experience in the automotive trade, our
                founder built VS Auto Mart on a simple principle: sell vehicles
                you&apos;d be comfortable putting your own family in.
              </p>

              <p className="mt-4 text-base leading-8 text-graphite-300">
                That philosophy still shapes every vehicle we take on today —
                from what we select to how we serve the customer after the
                sale.
              </p>

              <div className="mt-8 h-px w-20 bg-brass-500" />
            </div>
          </div>
        </section>

        {/* =====================================================
            MISSION / VISION
        ===================================================== */}
        <section className="mt-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-600">
              Direction
            </p>

            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-graphite-100 sm:text-4xl">
              Mission & Vision
            </h2>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {[
              {
                number: "01",
                title: "Our Mission",
                text: "To provide high-quality vehicles and an outstanding customer experience through honesty, transparency, professionalism, and exceptional service.",
              },
              {
                number: "02",
                title: "Our Vision",
                text: "To become one of Sri Lanka's most trusted and respected automotive dealerships by continuously providing quality vehicles, building lasting customer relationships, and embracing innovation within the automotive industry.",
              },
            ].map((item, index) => (
              <article
                key={item.number}
                className={`glass-card-dark bg-graphite-900/40 animate-fade-up rounded-[24px] p-7 sm:p-9 ${
                  index === 1 ? "animation-delay-100" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="font-mono text-xs font-semibold tracking-[0.2em] text-brass-600">
                    {item.number}
                  </span>

                  <span className="font-serif text-4xl leading-none text-brass-500/20">
                    “
                  </span>
                </div>

                <h3 className="mt-6 font-display text-2xl font-semibold text-graphite-100">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-graphite-400">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* =====================================================
            VALUES
        ===================================================== */}
        <section className="mt-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-600">
                What we stand for
              </p>

              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-graphite-100 sm:text-4xl">
                Our Core Values
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-graphite-400">
              The standards that shape how we select vehicles, work with
              customers, and build the business.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={value}
                className="group rounded-2xl glass-card-dark bg-graphite-900/40 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brass-500/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                style={{
                  animationDelay: `${Math.min(index * 60, 400)}ms`,
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-graphite-100 group-hover:text-brass-400 transition-colors">
                    {value}
                  </span>

                  <span className="h-2 w-2 rounded-full bg-brass-500 transition-transform duration-300 group-hover:scale-150" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            WHY CHOOSE US
        ===================================================== */}
        <section className="mt-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-600">
              The difference
            </p>

            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-graphite-100 sm:text-4xl">
              Why Choose VS Auto Mart
            </h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {whyChooseUs.map((item, index) => (
              <div
                key={item}
                className={`group flex items-start gap-4 rounded-2xl glass-card-dark bg-graphite-900/40 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brass-500/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${
                  index === whyChooseUs.length - 1
                    ? "sm:col-span-2"
                    : ""
                }`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brass-500/10 text-brass-500 transition-transform duration-300 group-hover:scale-110">
                  <CheckIcon />
                </div>

                <span className="pt-1 text-sm font-medium leading-6 text-graphite-300 group-hover:text-white transition-colors">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            SERVICES
        ===================================================== */}
        <section className="mt-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-600">
              Beyond the sale
            </p>

            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-graphite-100 sm:text-4xl">
              Services
            </h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service}
                className="group rounded-2xl glass-card-dark bg-graphite-900/40 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brass-500/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brass-500/10">
                    <div className="h-2 w-2 rounded-full bg-brass-500 transition-transform duration-300 group-hover:scale-150" />
                  </div>

                  <span className="text-sm font-semibold text-graphite-100 group-hover:text-brass-400 transition-colors">
                    {service}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            FINANCE / SELL
        ===================================================== */}
        <section className="mt-20 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[24px] glass-card-dark bg-graphite-900/40 p-7 shadow-sm sm:p-9 transition-colors hover:border-brass-500/50">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-600">
              Make ownership easier
            </p>

            <h2 className="mt-3 font-display text-2xl font-semibold text-graphite-100 sm:text-3xl">
              Finance & Leasing
            </h2>

            <p className="mt-4 text-sm leading-7 text-graphite-400">
              We assist customers with leasing and financing options through
              trusted financial institutions, helping make vehicle ownership
              more affordable and convenient.
            </p>

            <div className="mt-7 h-px w-14 bg-brass-500" />
          </article>

          <article className="rounded-[24px] glass-card-dark bg-graphite-900/40 p-7 shadow-sm sm:p-9 transition-colors hover:border-brass-500/50">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-600">
              Ready for your next move
            </p>

            <h2 className="mt-3 font-display text-2xl font-semibold text-graphite-100 sm:text-3xl">
              Sell Your Vehicle
            </h2>

            <p className="mt-4 text-sm leading-7 text-graphite-400">
              Customers can contact VS Auto Mart if they wish to sell or trade
              in their vehicle. We aim to provide fair evaluations and a smooth,
              transparent process.
            </p>

            <div className="mt-7 h-px w-14 bg-brass-500" />
          </article>
        </section>

        {/* =====================================================
            CONTACT
        ===================================================== */}
        <section className="mt-20 overflow-hidden rounded-[28px] bg-graphite-950 text-white shadow-2xl">
          <div className="grid lg:grid-cols-[0.75fr_1.25fr]">
            <div className="border-b border-white/10 p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-400">
                Visit or contact us
              </p>

              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Let&apos;s talk cars.
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/55">
                Whether you&apos;re looking to buy, sell, trade, finance, or
                simply understand your options, the team at VS Auto Mart is
                here to help.
              </p>
            </div>

            <dl className="grid sm:grid-cols-2">
              {contactItems.map((item, index) => (
                <div
                  key={item.label}
                  className={`border-white/10 p-6 sm:p-7 ${
                    index >= 2 ? "border-t" : ""
                  } ${index % 2 === 1 ? "sm:border-l" : ""} ${
                    item.label === "Address"
                      ? "sm:col-span-2"
                      : ""
                  }`}
                >
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    {item.label}
                  </dt>

                  <dd className="mt-2 text-sm font-medium leading-6 text-white/85">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </div>
    </main>
  );
}