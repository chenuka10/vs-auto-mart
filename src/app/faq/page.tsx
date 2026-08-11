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
    intro: "අපගේ පාරිභෝගිකයින් නිතර අසන ප්‍රශ්න සඳහා පිළිතුරු මෙහිදී ලබාගත හැකිය.",
    stillHave: "තවමත් ප්‍රශ්නයක් තිබේද? අපව සම්බන්ධ කරගන්න:",
  },
  en: {
    support: "Support",
    heading: "Frequently Asked Questions",
    intro:
      "Answers to some of the most common questions we get from customers. Can't find what you're looking for? Reach out to us directly and we'll be happy to help.",
    stillHave: "Still have questions? Contact us at",
  },
} as const;

export default function FaqPage() {
  const [language, setLanguage] = useState<"si" | "en">("en");
  const t = copy[language];

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brass-600">
            {t.support}
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold">
            {t.heading}
          </h1>
        </div>

        <div
          role="group"
          aria-label="Language"
          className="mt-1 flex shrink-0 items-center gap-0.5 rounded-full border border-graphite-700/15 bg-white p-0.5 text-xs font-medium shadow-sm"
        >
          <button
            type="button"
            onClick={() => setLanguage("si")}
            aria-pressed={language === "si"}
            className={`rounded-full px-3 py-1.5 transition-colors ${
              language === "si"
                ? "bg-graphite-950 text-paper"
                : "text-graphite-700 hover:text-graphite-900"
            }`}
          >
            සිංහල
          </button>
          <button
            type="button"
            onClick={() => setLanguage("en")}
            aria-pressed={language === "en"}
            className={`rounded-full px-3 py-1.5 transition-colors ${
              language === "en"
                ? "bg-graphite-950 text-paper"
                : "text-graphite-700 hover:text-graphite-900"
            }`}
          >
            English
          </button>
        </div>
      </div>

      <p className="mt-4 leading-relaxed text-graphite-700">{t.intro}</p>

      <div className="mt-10 divide-y divide-graphite-700/10 rounded-lg border border-graphite-700/10 bg-white">
        {faqs.map((faq, index) => (
          <details key={faq.question.en} className="group px-6 py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-sm font-semibold text-graphite-900 sm:text-base">
              <span>
                <span className="mr-2 text-graphite-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {faq.question[language]}
              </span>
              <span className="shrink-0 text-brass-600 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-graphite-700">
              {faq.answer[language]}
            </p>
          </details>
        ))}
      </div>

      <div className="mt-10 rounded-lg border border-graphite-700/10 bg-white p-6 text-center">
        <p className="text-sm text-graphite-700">
          {t.stillHave}{" "}
          <a href="tel:0772500320" className="font-medium text-brass-600">
            077 250 0320
          </a>{" "}
          {language === "en" ? "or" : "හෝ"}{" "}
          <a
            href="mailto:vsautomart@gmail.com"
            className="font-medium text-brass-600"
          >
            vsautomart@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}