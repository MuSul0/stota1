CREATE TABLE public.settings (
  id int PRIMARY KEY DEFAULT 1,
  company_name text,
  contact_email text,
  phone_number text,
  address text,
  maintenance_mode boolean DEFAULT false,
  analytics_enabled boolean DEFAULT true,
  dark_mode boolean DEFAULT false,
  default_language text DEFAULT 'de',
  timezone text DEFAULT 'Europe/Berlin',
  currency text DEFAULT 'EUR',
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can select and modify settings" ON public.settings
  FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');