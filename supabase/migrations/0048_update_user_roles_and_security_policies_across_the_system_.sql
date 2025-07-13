-- Step 1: Backfill the 'role' into app_metadata for all existing users.
DO $$
DECLARE
    user_record RECORD;
BEGIN
    FOR user_record IN SELECT id, role FROM public.profiles LOOP
        UPDATE auth.users
        SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) || jsonb_build_object('role', user_record.role)
        WHERE id = user_record.id;
    END LOOP;
END $$;

-- Step 2: Update the handle_new_user function to also populate app_metadata.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER SET search_path = 'public'
AS $$
DECLARE
  user_role TEXT;
BEGIN
  user_role := COALESCE(new.raw_user_meta_data->>'role', 'kunde');

  INSERT INTO public.profiles (id, first_name, last_name, role, email)
  VALUES (new.id, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name', user_role, new.email);

  UPDATE auth.users
  SET raw_app_meta_data = raw_app_meta_data || jsonb_build_object('role', user_role)
  WHERE id = new.id;
  
  RETURN new;
END;
$$;

-- Step 3: Update all relevant RLS policies to check app_metadata for the role.
ALTER POLICY "Admins can modify media" ON public.media RENAME TO "Admins can modify media (old)";
CREATE POLICY "Admins can modify media" ON public.media FOR ALL
  USING (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'admin'::text))
  WITH CHECK (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'admin'::text));

ALTER POLICY "Admins can view all referrals" ON public.referrals USING (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'admin'::text));
ALTER POLICY "Admins can update referrals" ON public.referrals USING (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'admin'::text));
ALTER POLICY "Admins can delete referrals" ON public.referrals USING (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'admin'::text));
ALTER POLICY "Enable read access for admins" ON public.contact_requests USING (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'admin'::text));
ALTER POLICY "Admins can view all requests." ON public.requests USING (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'admin'::text));
ALTER POLICY "Admins can update requests." ON public.requests USING (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'admin'::text));
ALTER POLICY "Admins can delete requests." ON public.requests USING (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'admin'::text));
ALTER POLICY "Admins can view all profiles" ON public.profiles USING (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'admin'::text));
ALTER POLICY "Employees can view all profiles" ON public.profiles USING (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'mitarbeiter'::text));
ALTER POLICY "Admins can select all profiles" ON public.profiles USING (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'admin'::text));

ALTER POLICY "Admins can modify services" ON public.services RENAME TO "Admins can modify services (old)";
CREATE POLICY "Admins can modify services" ON public.services FOR ALL
  USING (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'admin'::text))
  WITH CHECK (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'admin'::text));

ALTER POLICY "Admins and Mitarbeiter can select all appointments" ON public.appointments USING (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = ANY (ARRAY['admin'::text, 'mitarbeiter'::text])));
ALTER POLICY "Admins and Mitarbeiter can select all messages" ON public.messages USING (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = ANY (ARRAY['admin'::text, 'mitarbeiter'::text])));
ALTER POLICY "Admins can select all work_times" ON public.work_times USING (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'admin'::text));
ALTER POLICY "Admins can select all tasks" ON public.tasks USING (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'admin'::text));
ALTER POLICY "Users can update vehicles for reservation" ON public.vehicles USING (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'mitarbeiter'::text));
ALTER POLICY "Users can select team_members" ON public.team_members USING (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = ANY (ARRAY['admin'::text, 'mitarbeiter'::text])));

ALTER POLICY "Admins can select and modify settings" ON public.settings RENAME TO "Admins can select and modify settings (old)";
CREATE POLICY "Admins can select and modify settings" ON public.settings FOR ALL
  USING (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'admin'::text))
  WITH CHECK (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'admin'::text));

ALTER POLICY "Admins can select and modify invoices" ON public.invoices RENAME TO "Admins can select and modify invoices (old)";
CREATE POLICY "Admins can select and modify invoices" ON public.invoices FOR ALL
  USING (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'admin'::text))
  WITH CHECK (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'admin'::text));

ALTER POLICY "Admins can select visitors" ON public.visitors USING (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'admin'::text));

ALTER POLICY "Admins can manage email queue" ON public.email_queue RENAME TO "Admins can manage email queue (old)";
CREATE POLICY "Admins can manage email queue" ON public.email_queue FOR ALL
  USING (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'admin'::text))
  WITH CHECK (((auth.jwt() -> 'app_metadata' ->> 'role'::text) = 'admin'::text));