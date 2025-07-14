CREATE POLICY "Admins have full access to services"
ON public.services
FOR ALL
TO authenticated
USING (public.get_user_role(auth.uid()) = 'admin'::text)
WITH CHECK (public.get_user_role(auth.uid()) = 'admin'::text);