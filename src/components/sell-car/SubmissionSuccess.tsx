import Link from "next/link";
import { whatsappLink } from "@/lib/utils";

export default function SubmissionSuccess({ referenceNumber }: { referenceNumber: string }) {
  return (
    <div className="mx-auto max-w-lg rounded-plate border border-graphite-700/10 bg-white p-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-3xl text-emerald-600">
        ✓
      </div>
      <h2 className="mt-4 font-display text-2xl font-semibold text-graphite-900">
        Submission Received
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-graphite-600">
        Thank you for submitting your vehicle to VS Auto Mart. Our team will review the
        information provided and contact you regarding the next steps.
      </p>

      <div className="mt-6 rounded-plate border border-brass-500/30 bg-brass-500/5 px-4 py-3">
        <p className="text-xs uppercase tracking-wider text-graphite-500">Your reference number</p>
        <p className="mt-1 font-display text-xl font-semibold text-graphite-900">
          {referenceNumber}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="rounded-plate bg-graphite-950 px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-graphite-800"
        >
          Back to VS Auto Mart
        </Link>
        <a
          href={whatsappLink(`Hi, I just submitted my vehicle (ref: ${referenceNumber}) for valuation.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-plate border border-graphite-700/20 px-5 py-2.5 text-sm font-semibold text-graphite-800 transition-colors hover:bg-graphite-700/5"
        >
          WhatsApp VS Auto Mart
        </a>
      </div>
    </div>
  );
}
