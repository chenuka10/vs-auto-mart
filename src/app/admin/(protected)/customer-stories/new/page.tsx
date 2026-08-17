import Link from "next/link";
import { CustomerStoryForm } from "../CustomerStoryForm";
import { createCustomerStory } from "../actions";

export default function NewCustomerStoryPage() {
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
        <span className="text-sm text-graphite-300">New Story</span>
      </div>

      <h1 className="mt-6 font-display text-2xl font-semibold text-graphite-100">
        Add Customer Story
      </h1>
      <p className="mt-1 text-sm text-graphite-400">
        Upload delivery photos to Cloudinary and save the customer details. The story will appear on the public{" "}
        <a href="/customers" target="_blank" className="text-brass-400 hover:underline">Happy Customers</a> page once published.
      </p>

      <CustomerStoryForm onSave={createCustomerStory} />
    </div>
  );
}
