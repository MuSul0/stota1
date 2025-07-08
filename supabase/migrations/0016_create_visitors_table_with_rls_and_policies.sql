CREATE TABLE public.visitors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  user_agent text NOT NULL,
  visited_at timestamp with time zone DEFAULT now(),
  country text,
  city text
);

ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can select visitors" ON public.visitors
  FOR SELECT USING ((auth.jwt() ->> 'role') = 'admin');