"use client";

import { useState } from "react";

type FaqItem = {
  question: {
    si: string;
    en: string;
  };
  answer: {
    si: string;
    en: string;
  };
};

const faqs: FaqItem[] = [
  {
    question: {
      si: "VS Auto Mart විශේෂයෙන්ම අලෙවි කරන්නේ කුමන වාහනද?",
      en: "What vehicles does VS Auto Mart specialize in?",
    },
    answer: {
      si: "VS Auto Mart විශේෂයෙන්ම Suzuki Celerio වාහන සඳහා අවධානය යොමු කරයි. Celerio මාදිලි සොයාගැනීම, අලෙවි කිරීම සහ පාරිභෝගිකයින්ට අවශ්‍ය සහය ලබාදීම පිළිබඳ අපට විශේෂ අවබෝධයක් ඇත. ඒ නිසා අපි Celerio වාහන සඳහා විශේෂඥ අලෙවිකරුවෙකු ලෙස හඳුනාගෙන ඇත.",
      en: "VS Auto Mart specializes in Suzuki Celerio vehicles. We have built our reputation around sourcing, selling, and assisting customers with Celerio models, making us widely recognized as the Grand Sellers of Suzuki Celerio.",
    },
  },
  {
    question: {
      si: "Leasing සහ Financing පහසුකම් ලබා දෙනවාද?",
      en: "Do you offer leasing and financing facilities?",
    },
    answer: {
      si: "ඔව්. අපි ප්‍රමුඛ පෙළේ බැංකු සහ Leasing ආයතන සමඟ සෘජුව කටයුතු කරමින් පාරිභෝගිකයින්ට පහසු Financing විකල්ප ලබාදෙමු. අපගේ හවුල්කාර ආයතනවල නියෝජිතයින්ට අපගේ dealership එක තුළදීම Leasing ක්‍රියාවලිය සම්බන්ධයෙන් ඔබට උපදෙස් සහ සහාය ලබාදිය හැක.",
      en: "Yes. We work directly with leading banks and leasing companies to provide customers with convenient financing options. Representatives from our partner institutions can assist with the leasing process directly through our dealership.",
    },
  },
  {
    question: {
      si: "Financing කටයුතු සඳහා බැංකුවකට හෝ Leasing ආයතනයකට යාම අවශ්‍යද?",
      en: "Do I need to visit a bank or leasing company to arrange financing?",
    },
    answer: {
      si: "බොහෝ අවස්ථාවලදී අවශ්‍ය නොවේ. අපි බැංකු සහ Leasing හවුල්කරුවන් සමඟ සෘජුව කටයුතු කරන බැවින්, අවශ්‍ය ලේඛන, අයදුම්පත් සහ Financing ක්‍රියාවලිය සම්බන්ධයෙන් ඔවුන්ගේ නියෝජිතයින්ට අපගේ dealership එක තුළදීම ඔබට සහාය විය හැක.",
      en: "In many cases, no. Since we work directly with our banking and leasing partners, their representatives can assist customers with the necessary documentation, applications, and financing process at our dealership.",
    },
  },
  {
    question: {
      si: "Leasing සඳහා අවශ්‍ය ලේඛන මොනවාද?",
      en: "What documents are required for leasing?",
    },
    answer: {
      si: "අවශ්‍ය ලේඛන ඔබගේ රැකියා තත්ත්වය, ආදායම සහ තෝරාගන්නා Financing ආයතනය අනුව වෙනස් විය හැක. ඔබට අවශ්‍ය ලේඛන මොනවාද යන්න පිළිබඳව අපගේ කණ්ඩායම සහ අදාළ බැංකු හෝ Leasing නියෝජිතයා ඔබට පැහැදිලිව උපදෙස් ලබාදෙනු ඇත.",
      en: "Required documents vary depending on the customer's employment status, income, and the financing institution. Our team and the relevant bank or leasing representative will guide you through exactly what is required.",
    },
  },
  {
    question: {
      si: "මිලදී ගැනීමට පෙර වාහනය පරීක්ෂා කරන්න පුළුවන්ද?",
      en: "Can I inspect a vehicle before purchasing it?",
    },
    answer: {
      si: "අනිවාර්යයෙන්ම. වාහනයක් මිලදී ගැනීමට පෙර එය හොඳින් පරීක්ෂා කරන ලෙස අපි පාරිභෝගිකයින්ට උපදෙස් දෙමු. අවශ්‍ය නම්, කලින් අප සමඟ සාකච්ඡා කර ස්වාධීන Vehicle Inspection එකක් සිදු කිරීමට හෝ ඔබ විශ්වාස කරන Mechanic කෙනෙකු රැගෙන ඒමටද හැකිය.",
      en: "Absolutely. We encourage customers to thoroughly inspect any vehicle before making a purchase. Customers may also arrange an independent inspection or bring a trusted mechanic, subject to prior arrangements.",
    },
  },
  {
    question: {
      si: "වාහන සඳහා Inspection Reports ලබා දෙනවාද?",
      en: "Do you provide vehicle inspection reports?",
    },
    answer: {
      si: "Inspection Report එකක් ලබාගත හැකි වාහන සඳහා අදාළ තොරතුරු පාරිභෝගිකයින්ට ලබාදෙමු. එවැනි Reports වල Engine, Transmission, Suspension, Brakes, Electrical Systems, Body Condition, Tyres සහ Interior වැනි වැදගත් අංශ පිළිබඳ තොරතුරු ඇතුළත් විය හැක.",
      en: "Yes, where an inspection report is available, we provide the relevant information to customers. Reports may cover important areas such as the engine, transmission, suspension, brakes, electrical systems, body condition, tyres, and interior.",
    },
  },
  {
    question: {
      si: "වාහනයක් Test Drive කරන්න පුළුවන්ද?",
      en: "Can I test drive a vehicle?",
    },
    answer: {
      si: "ඔව්. Available වාහන සඳහා Test Drive එකක් කලින් වේලාවක් වෙන්කරගෙන සිදු කළ හැකිය. සුදුසු වේලාවක් වෙන්කර ගැනීමට අපගේ කණ්ඩායම අමතන්න. අවශ්‍ය Driving Documents ද රැගෙන පැමිණෙන්න.",
      en: "Yes. Test drives can be arranged for available vehicles. Please contact our team to arrange a suitable time and bring the required driving documentation.",
    },
  },
  {
    question: {
      si: "මගේ වර්තමාන වාහනය Trade-in කරන්න පුළුවන්ද?",
      en: "Can I trade in my current vehicle?",
    },
    answer: {
      si: "ඔව්. ඔබගේ වර්තමාන වාහනය වෙනුවට වෙනත් වාහනයකට මාරුවීමට අදහස් කරන්නේ නම්, Trade-in අවස්ථාව පිළිබඳව අපගේ කණ්ඩායම සමඟ සාකච්ඡා කළ හැකිය. වාහනයේ තත්ත්වය, වයස, Mileage, ලේඛන සහ වර්තමාන වෙළඳපොළ වටිනාකම වැනි කරුණු මත එහි වටිනාකම තක්සේරු කරනු ලැබේ.",
      en: "Yes. If you're looking to upgrade or change your vehicle, you can speak with our team about a potential trade-in. The vehicle will be assessed based on factors such as its condition, age, mileage, documentation, and current market value.",
    },
  },
  {
    question: {
      si: "වාහනවල අවශ්‍ය ලේඛන නිසි ලෙස තිබෙනවාද?",
      en: "Are the vehicles properly documented?",
    },
    answer: {
      si: "සෑම වාහනයකටම අදාළව ලබාදිය හැකි අවශ්‍ය වාහන ලේඛන පාරිභෝගිකයින්ට ලබාදෙමු. අවශ්‍ය ලේඛන පරීක්ෂා කිරීම සහ Ownership Transfer ක්‍රියාවලිය සම්පූර්ණ කිරීම සඳහා අපගේ කණ්ඩායම ඔබට සහාය වනු ඇත.",
      en: "We provide customers with the relevant vehicle documentation available for each vehicle. Our team will assist you in reviewing the necessary documents and completing the required ownership-transfer procedures.",
    },
  },
  {
    question: {
      si: "මිලදී ගැනීමට පෙර Suzuki Celerio එකක් Reserve කරන්න පුළුවන්ද?",
      en: "Can I reserve a Suzuki Celerio before purchasing?",
    },
    answer: {
      si: "Reservation පහසුකම වාහනයෙන් වාහනයට වෙනස් විය හැක. ඔබ කැමති Celerio වාහනයක් සොයාගෙන ඇත්නම්, එහි වර්තමාන Availability එක සහ අදාළ Reservation Terms පිළිබඳව දැනගැනීමට අපගේ කණ්ඩායම අමතන්න.",
      en: "Reservation availability depends on the individual vehicle. If you have found a Celerio you are interested in, contact our team to check its availability and discuss the applicable reservation terms.",
    },
  },
  {
    question: {
      si: "මගේ Suzuki Celerio එක VS Auto Mart වෙතින් මිලදී ගත යුත්තේ ඇයි?",
      en: "Why should I buy my Suzuki Celerio from VS Auto Mart?",
    },
    answer: {
      si: "Suzuki Celerio පිළිබඳ අපගේ විශේෂ අවධානය නිසා එහි මාදිලි, Variants, Specifications, Market Value සහ මිලදී ගැනීමේදී සලකා බැලිය යුතු කරුණු පිළිබඳව අපට හොඳ අවබෝධයක් ඇත. Celerio වාහන පිළිබඳ අපගේ දිගුකාලීන අවධානය හේතුවෙන් අපි Celerio සඳහා විශේෂඥ අලෙවිකරුවෙකු ලෙස අපගේ නම ගොඩනගාගෙන ඇත.",
      en: "Our specialization in the Suzuki Celerio means we understand the model, its variants, specifications, market value, and what customers should look for when purchasing one. With our extensive focus on Celerio vehicles, we have earned our reputation as the Grand Sellers.",
    },
  },
  {
    question: {
      si: "වාහනය මිලදී ගත් පසුවත් VS Auto Mart සහාය ලබා දෙනවාද?",
      en: "Does VS Auto Mart assist customers after the sale?",
    },
    answer: {
      si: "ඔව්. වාහනය මිලදී ගැනීමෙන් පසුවද අදාළ ලේඛන, Ownership Transfer, Financing සම්බන්ධ කටයුතු සහ මිලදී ගැනීමෙන් පසුව ඇතිවන වෙනත් ප්‍රශ්න සඳහා අපගේ කණ්ඩායම ඔබට අවශ්‍ය සහාය ලබාදීමට සූදානම්.",
      en: "Yes. Our team remains available to assist with relevant documentation, ownership transfers, financing coordination, and other questions that may arise during or after the purchasing process.",
    },
  },
];

const copy = {
  si: {
    support: "සහාය",
    heading: "නිතර අසන ප්‍රශ්න",
    intro:
      "වාහන මිලදී ගැනීම, Financing, Inspection, Trade-ins සහ අපගේ සේවාවන් පිළිබඳ පාරිභෝගිකයින් නිතර අසන ප්‍රශ්න සඳහා පිළිතුරු.",
    stillHave: "තවමත් ප්‍රශ්නයක් තිබේද?",
    contact: "අපගේ කණ්ඩායම සමඟ කතා කරන්න",
    phone: "අමතන්න",
    email: "විද්‍යුත් තැපෑල",
  },
  en: {
    support: "Support",
    heading: "Frequently Asked Questions",
    intro:
      "Answers to common questions about vehicles, financing, inspections, trade-ins, and the buying experience at VS Auto Mart.",
    stillHave: "Still have a question?",
    contact: "Talk to our team",
    phone: "Call us",
    email: "Email us",
  },
} as const;

export default function FaqPage() {
  const [language, setLanguage] = useState<"si" | "en">("en");
  const t = copy[language];

  return (
    <main className="overflow-hidden">
      <div className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Hero */}
        <section className="animate-fade-up relative overflow-hidden rounded-[28px] border border-graphite-700/20 bg-graphite-950 px-7 py-9 text-graphite-100 shadow-2xl sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brass-500/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-brass-500/[0.03] blur-3xl"
          />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brass-400">
                {t.support}
              </p>

              <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-graphite-100 sm:text-5xl">
                {t.heading}
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-graphite-400 sm:text-base">
                {t.intro}
              </p>
            </div>

            {/* Language switcher */}
            <div
              role="group"
              aria-label="Language"
              className="inline-flex self-start rounded-full border border-graphite-700/30 bg-graphite-900/60 p-1 shadow-lg backdrop-blur-xl lg:self-auto"
            >
              <button
                type="button"
                onClick={() => setLanguage("si")}
                aria-pressed={language === "si"}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
                  language === "si"
                    ? "bg-graphite-100 text-graphite-950 shadow-sm font-semibold"
                    : "text-graphite-400 hover:text-graphite-100"
                }`}
              >
                සිංහල
              </button>

              <button
                type="button"
                onClick={() => setLanguage("en")}
                aria-pressed={language === "en"}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
                  language === "en"
                    ? "bg-graphite-100 text-graphite-950 shadow-sm font-semibold"
                    : "text-graphite-400 hover:text-graphite-100"
                }`}
              >
                English
              </button>
            </div>
          </div>
        </section>

        {/* FAQ list */}
        <section className="mt-10 sm:mt-12">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-graphite-400">
              {String(faqs.length).padStart(2, "0")} Questions
            </p>

            <div className="h-px flex-1 bg-graphite-700/[0.08] ml-4" />
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details
                key={faq.question.en}
                className="
                  group
                  animate-fade-up
                  overflow-hidden
                  rounded-2xl
                  border border-brass-500/10
                  bg-graphite-900/40
                  shadow-[0_8px_30px_rgba(0,0,0,0.5)]
                  backdrop-blur-xl
                  transition-all duration-500
                  open:border-brass-500/30
                  open:bg-graphite-900/60
                  open:shadow-[0_16px_40px_rgba(0,0,0,0.6)]
                "
                style={{
                  animationDelay: `${Math.min(index * 55, 550)}ms`,
                }}
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-5 sm:px-6 sm:py-6">
                  {/* Number */}
                  <span className="shrink-0 font-mono text-[10px] font-semibold tracking-[0.15em] text-brass-600/80 sm:text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Question */}
                  <span className="flex-1 font-display text-sm font-semibold leading-6 text-graphite-100 sm:text-base group-hover:text-brass-400 transition-colors">
                    {faq.question[language]}
                  </span>

                  {/* Icon */}
                  <span
                    aria-hidden="true"
                    className="
                      flex h-8 w-8 shrink-0 items-center justify-center
                      rounded-full
                      border border-brass-500/10
                      bg-graphite-950/50
                      text-lg leading-none text-brass-400
                      shadow-sm
                      transition-all duration-400
                      group-open:rotate-45
                      group-open:border-brass-500/20
                      group-open:bg-brass-500/[0.05]
                    "
                  >
                    +
                  </span>
                </summary>

                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-open:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <div className="border-t border-brass-500/10 px-5 pb-6 pt-4 sm:px-6">
                      <p className="max-w-3xl text-sm leading-7 text-graphite-300 sm:text-[15px]">
                        {faq.answer[language]}
                      </p>
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="mt-12 overflow-hidden rounded-[24px] border border-graphite-700/20 bg-graphite-950 text-graphite-100 shadow-2xl sm:mt-14">
          <div className="grid lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-400">
                {t.stillHave}
              </p>

              <h2 className="mt-2 font-display text-2xl font-semibold text-graphite-100 sm:text-3xl">
                {t.contact}
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-graphite-400">
                {language === "en"
                  ? "Our team can help with vehicle availability, inspections, financing, trade-ins, and anything else you need before making a decision."
                  : "වාහන Availability, Inspection, Financing, Trade-in සහ මිලදී ගැනීමේ ක්‍රියාවලිය සම්බන්ධයෙන් ඔබට අවශ්‍ය සහාය සඳහා අපගේ කණ්ඩායම අමතන්න."}
              </p>
            </div>

            <div className="grid border-t border-graphite-700/20 sm:grid-cols-2 lg:border-l lg:border-t-0">
              <a
                href="tel:0772500320"
                className="group p-6 transition-colors hover:bg-graphite-900/40 sm:p-7"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-graphite-500">
                  {t.phone}
                </span>

                <span className="mt-2 block text-sm font-semibold text-graphite-100">
                  077 250 0320
                </span>

                <span className="mt-1 block text-xs text-brass-400 transition-transform duration-300 group-hover:translate-x-1">
                  Call →
                </span>
              </a>

              <a
                href="mailto:vsautomart@gmail.com"
                className="group border-t border-graphite-700/20 p-6 transition-colors hover:bg-graphite-900/40 sm:border-l sm:border-t-0 sm:p-7"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-graphite-500">
                  {t.email}
                </span>

                <span className="mt-2 block text-sm font-semibold text-graphite-100">
                  vsautomart@gmail.com
                </span>

                <span className="mt-1 block text-xs text-brass-400 transition-transform duration-300 group-hover:translate-x-1">
                  Email →
                </span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}