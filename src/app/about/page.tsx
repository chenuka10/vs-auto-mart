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

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 text-graphite-900">
      {/* Intro Header */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-graphite-900 via-graphite-800 to-black p-8 text-white shadow-xl sm:p-12">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-brass-400">
            About Us
          </p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            VS Auto Mart
          </h1>
          <p className="mt-6 text-base leading-relaxed text-graphite-300 sm:text-lg">
            VS Auto Mart is a trusted vehicle dealership based in Kadawatha, Sri
            Lanka, dedicated to providing quality vehicles with honest service
            and competitive pricing. Since our beginnings in 2012, we have
            focused on building long-term relationships with our customers by
            offering reliable vehicles and a transparent buying experience.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="mt-16 rounded-2xl bg-slate-50 p-8 sm:p-10">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-graphite-900">
            Our Story
          </h2>
          <div className="mt-4 space-y-4 leading-relaxed text-graphite-700">
            <p>
              Our journey began in 2012, not as a dealership, but by simply
              buying and selling our own vehicles. What started as a passion for
              automobiles gradually grew through hard work, dedication, and the
              trust of our customers.
            </p>
            <p>
              As demand increased, we expanded our operations and transformed
              into VS Auto Mart. Today, we continue to grow while staying true
              to the values that helped us get here — honesty, reliability, and
              customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="mt-16 overflow-hidden rounded-2xl border border-graphite-700/10 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="grid gap-8 p-8 sm:grid-cols-3 sm:items-center sm:p-10">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-graphite-100 shadow-inner sm:col-span-1">
            <Image
              src="/founder-photo.jpg"
              alt="Founder of VS Auto Mart"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="sm:col-span-2">
            <p className="text-xs font-bold uppercase tracking-widest text-brass-600">
              Meet the Founder
            </p>
            <h2 className="mt-1 font-display text-3xl font-bold text-graphite-900">
              Sumindaka Kariyapperuma
            </h2>
            <p className="mt-4 text-base leading-relaxed text-graphite-700">
              With years of hands-on experience in the automotive trade, our
              founder built VS Auto Mart on a simple principle: sell vehicles
              you&apos;d be comfortable putting your own family in. That
              philosophy still shapes every vehicle we take on today.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mt-16 grid gap-8 sm:grid-cols-2">
        <div className="rounded-2xl border border-graphite-700/10 bg-white p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brass-500/10 text-brass-600 font-bold">
            01
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold">Our Mission</h2>
          <p className="mt-3 leading-relaxed text-graphite-700">
            To provide high-quality vehicles and an outstanding customer
            experience through honesty, transparency, professionalism, and
            exceptional service.
          </p>
        </div>
        <div className="rounded-2xl border border-graphite-700/10 bg-white p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brass-500/10 text-brass-600 font-bold">
            02
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold">Our Vision</h2>
          <p className="mt-3 leading-relaxed text-graphite-700">
            To become one of Sri Lanka&apos;s most trusted and respected
            automotive dealerships by continuously providing quality vehicles,
            building lasting customer relationships, and embracing innovation
            within the automotive industry.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="mt-16">
        <h2 className="font-display text-3xl font-bold text-graphite-900">
          Our Core Values
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {values.map((value) => (
            <li
              key={value}
              className="rounded-xl border border-graphite-700/10 bg-white px-4 py-4 text-center font-medium text-graphite-800 shadow-sm transition-colors hover:border-brass-600/30 hover:bg-brass-50/20"
            >
              {value}
            </li>
          ))}
        </ul>
      </section>

      {/* Why Choose Us */}
      <section className="mt-16">
        <h2 className="font-display text-3xl font-bold text-graphite-900">
          Why Choose VS Auto Mart
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {whyChooseUs.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl border border-graphite-700/10 bg-white p-4 shadow-sm"
            >
              <svg
                className="mt-0.5 h-5 w-5 shrink-0 text-brass-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span className="text-sm font-medium text-graphite-700 leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Services */}
      <section className="mt-16">
        <h2 className="font-display text-3xl font-bold text-graphite-900">
          Services
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {services.map((service) => (
            <li
              key={service}
              className="flex items-center gap-3 rounded-xl border border-graphite-700/10 bg-white p-4 shadow-sm transition-all hover:border-brass-600/40 hover:shadow-md"
            >
              <div className="h-2 w-2 rounded-full bg-brass-600" />
              <span className="text-sm font-semibold text-graphite-800">
                {service}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Finance & Sell Callouts */}
      <section className="mt-16 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-graphite-700/10 bg-white p-8 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-graphite-900">
            Finance & Leasing
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-graphite-700">
            We assist customers with leasing and financing options through
            trusted financial institutions, helping make vehicle ownership
            more affordable and convenient.
          </p>
        </div>
        <div className="rounded-2xl border border-graphite-700/10 bg-white p-8 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-graphite-900">
            Sell Your Vehicle
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-graphite-700">
            Customers can contact VS Auto Mart if they wish to sell or trade
            in their vehicle. We aim to provide fair evaluations and a smooth,
            transparent process.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="mt-16 overflow-hidden rounded-2xl border border-graphite-700/10 bg-white shadow-md">
        <div className="border-b border-graphite-700/10 bg-slate-50 px-8 py-6">
          <h2 className="font-display text-2xl font-bold text-graphite-900">
            Contact Information
          </h2>
        </div>
        <dl className="grid gap-6 p-8 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs font-bold uppercase tracking-wider text-graphite-500">Phone</dt>
            <dd className="mt-1 text-base font-medium text-graphite-900">077 250 0320</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wider text-graphite-500">WhatsApp</dt>
            <dd className="mt-1 text-base font-medium text-graphite-900">077 250 0320</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wider text-graphite-500">Email</dt>
            <dd className="mt-1 text-base font-medium text-graphite-900">vsautomart@gmail.com</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wider text-graphite-500">Business Hours</dt>
            <dd className="mt-1 text-base font-medium text-graphite-900">
              Monday – Sunday | 8:00 AM – 6:00 PM
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-bold uppercase tracking-wider text-graphite-500">Address</dt>
            <dd className="mt-1 text-base font-medium text-graphite-900">
              158, Pushparama Road, Pahala Biyanwila, Kadawatha, Sri Lanka
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
