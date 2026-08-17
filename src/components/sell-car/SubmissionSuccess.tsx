import Link from "next/link";
import { whatsappLink } from "@/lib/utils";

export default function SubmissionSuccess({ referenceNumber }: { referenceNumber: string }) {
  return (
    <div className="glass-panel mx-auto max-w-lg rounded-[24px] p-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-3xl text-emerald-400">
        ✓
      </div>
      <h2 className="mt-4 font-display text-2xl font-semibold text-graphite-100">
        Submission Received
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-graphite-300">
        Thank you for submitting your vehicle to VS Auto Mart. Our team will review the
        information provided and contact you regarding the next steps.
      </p>

      <div className="mt-6 rounded-plate border border-brass-500/25 bg-brass-500/[0.06] px-4 py-3">
        <p className="text-xs uppercase tracking-wider text-graphite-400">Your reference number</p>
        <p className="mt-1 font-display text-xl font-semibold text-brass-400">
          {referenceNumber}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="rounded-plate bg-gradient-gold px-5 py-2.5 text-sm font-semibold text-graphite-950 transition-all hover:shadow-glow-gold hover:-translate-y-0.5"
        >
          Back to VS Auto Mart
        </Link>
        <a
          href={whatsappLink(`Hi, I just submitted my vehicle (ref: ${referenceNumber}) for valuation.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-plate border border-graphite-700/40 px-5 py-2.5 text-sm font-semibold text-graphite-200 transition-colors hover:bg-graphite-800/50"
        >
          WhatsApp VS Auto Mart
        </a>
      </div>
    </div>
  );
}
