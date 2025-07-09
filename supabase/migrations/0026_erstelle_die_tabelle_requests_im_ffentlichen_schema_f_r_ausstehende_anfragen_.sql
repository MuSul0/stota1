CREATE TABLE public.requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  subject TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
);

-- RLS-Richtlinien für die requests-Tabelle
alter table public.requests enable row level security;

create policy "Admins can view all requests." on requests for select using ( (auth.jwt() ->> 'role'::text) = 'admin'::text );
create policy "Admins can insert requests." on requests for insert with check ( (auth.jwt() ->> 'role'::text) = 'admin'::text );
create policy "Admins can update requests." on requests for update using ( (auth.jwt() ->> 'role'::text) = 'admin'::text );
create policy "Admins can delete requests." on requests for delete using ( (auth.jwt() ->> 'role'::text) = 'admin'::text );