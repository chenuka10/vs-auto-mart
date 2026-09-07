-- =========================================================
-- PROCESSED MESSAGES (WhatsApp Webhook Deduplication)
-- =========================================================

create table if not exists public.processed_messages (
  message_id text primary key,
  processed_at timestamptz not null default now()
);

create index if not exists idx_processed_messages_processed_at 
  on public.processed_messages (processed_at desc);

-- Enable Row Level Security
alter table public.processed_messages enable row level security;

-- Allow service role full access for backend webhook processing
create policy "service role manages processed_messages"
  on public.processed_messages
  for all
  using (true)
  with check (true);
