CREATE TABLE public.invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_email text NOT NULL,
  amount numeric NOT NULL,
  status text NOT NULL DEFAULT 'offen',
  due_date date NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can select and modify invoices" ON public.invoices
  FOR ALL USING ((auth.jwt() ->> 'role') = 'admin');