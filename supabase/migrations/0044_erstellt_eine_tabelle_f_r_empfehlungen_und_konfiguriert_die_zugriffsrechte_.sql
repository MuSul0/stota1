CREATE TABLE public.referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  referrer_name TEXT NOT NULL,
  referrer_email TEXT NOT NULL,
  referred_name TEXT NOT NULL,
  referred_email TEXT NOT NULL,
  referred_phone TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
);

ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert referrals" ON public.referrals FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all referrals" ON public.referrals FOR SELECT USING (((auth.jwt() ->> 'role'::text) = 'admin'::text));
CREATE POLICY "Admins can update referrals" ON public.referrals FOR UPDATE USING (((auth.jwt() ->> 'role'::text) = 'admin'::text));
CREATE POLICY "Admins can delete referrals" ON public.referrals FOR DELETE USING (((auth.jwt() ->> 'role'::text) = 'admin'::text));