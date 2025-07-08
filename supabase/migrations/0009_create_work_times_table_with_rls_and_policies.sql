CREATE TABLE public.work_times (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  start_time timestamp with time zone NOT NULL,
  end_time timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.work_times ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select own work_times" ON public.work_times
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own work_times" ON public.work_times
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own work_times" ON public.work_times
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can select all work_times" ON public.work_times
  FOR SELECT USING ((auth.jwt() ->> 'role') = 'admin');