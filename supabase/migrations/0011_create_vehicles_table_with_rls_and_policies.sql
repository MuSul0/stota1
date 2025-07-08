CREATE TABLE public.vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  status text NOT NULL DEFAULT 'verfuegbar',
  reserved_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select vehicles" ON public.vehicles
  FOR SELECT USING (true);

CREATE POLICY "Users can update vehicles for reservation" ON public.vehicles
  FOR UPDATE USING ((auth.jwt() ->> 'role') = 'mitarbeiter');