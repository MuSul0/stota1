CREATE TABLE public.media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  url text NOT NULL,
  title text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can select media" ON public.media
  FOR SELECT USING (true);

CREATE POLICY "Admins can modify media" ON public.media
  FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');