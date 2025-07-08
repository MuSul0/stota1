ALTER TABLE public.email_queue ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage email queue" ON public.email_queue;

CREATE POLICY "Admins can manage email queue" ON public.email_queue
  FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');