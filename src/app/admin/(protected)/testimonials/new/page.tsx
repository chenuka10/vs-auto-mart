import Link from "next/link";
import { TestimonialForm } from "../TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <div className="text-graphite-100">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/testimonials"
          className="flex items-center gap-1.5 text-sm text-graphite-400 hover:text-brass-400 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Reviews
        </Link>
        <span className="text-graphite-600">/</span>
        <span className="text-sm text-graphite-300">Add Testimonial</span>
      </div>

      <h1 className="mt-6 font-display text-2xl font-semibold text-graphite-100">Add Testimonial</h1>
      <p className="mt-1 text-sm text-graphite-400">
        Add a customer review or Google testimonial to display on the public website.
      </p>

      <TestimonialForm />
    </div>
  );
}