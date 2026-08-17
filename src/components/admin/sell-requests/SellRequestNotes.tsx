"use client";

import { useState, useTransition } from "react";
import { updateSubmissionNotes } from "@/app/admin/(protected)/sell-requests/actions";

export default function SellRequestNotes({
  id,
  initialNotes,
}: {
  id: string;
  initialNotes: string | null;
}) {
  const [notes, setNotes] = useState(initialNotes ?? "");
  const [saved, setSaved] = useState(true);
  const [isPending, startTransition] = useTransition();

  function handleSave() {
    startTransition(async () => {
      await updateSubmissionNotes(id, notes);
      setSaved(true);
    });
  }

  return (
    <div>
      <textarea
        rows={5}
        value={notes}
        onChange={(e) => {
          setNotes(e.target.value);
          setSaved(false);
        }}
        placeholder="Internal notes — not visible to the seller…"
        className="w-full rounded-plate border border-graphite-700/40 bg-graphite-900 px-3 py-2 text-sm text-graphite-100 placeholder:text-graphite-500 focus:border-graphite-500 focus:outline-none"
      />
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-graphite-500">
          {saved ? "Saved" : "Unsaved changes"} · Internal only, never shown to the seller
        </span>
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending || saved}
          className="rounded-plate bg-graphite-700 px-4 py-1.5 text-xs font-semibold text-graphite-100 transition-colors hover:bg-graphite-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Saving…" : "Add Note"}
        </button>
      </div>
    </div>
  );
}
