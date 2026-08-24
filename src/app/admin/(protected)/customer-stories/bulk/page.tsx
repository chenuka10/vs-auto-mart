import Link from "next/link";
import BulkCustomerStoryUploader from "@/components/admin/BulkCustomerStoryUploader";

export default function BulkCustomerStoriesPage() {
  return (
    <div className="text-graphite-100">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/customer-stories"
          className="flex items-center gap-1.5 text-sm text-graphite-400 hover:text-brass-400 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Happy Customers
        </Link>
        <span className="text-graphite-600">/</span>
        <span className="text-sm text-graphite-300">Bulk Upload</span>
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-graphite-100 sm:text-3xl">
            Bulk Upload Delivery Photos
          </h1>
          <p className="mt-1 text-sm text-graphite-400">
            Select multiple vehicle delivery photos to automatically create separate customer stories in one batch.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <BulkCustomerStoryUploader />
      </div>
    </div>
  );
}
