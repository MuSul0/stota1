CREATE POLICY "Admins can delete services" ON public.services
FOR DELETE
USING (((auth.jwt() -> 'app_metadata'::text) ->> 'role'::text) = 'admin'::text);