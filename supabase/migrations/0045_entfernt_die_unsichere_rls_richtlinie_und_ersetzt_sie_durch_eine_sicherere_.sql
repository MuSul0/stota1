-- Entfernen der unsicheren, öffentlichen Leseregel
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;

-- Neue, sicherere Regel: Nur authentifizierte Benutzer können Profile lesen.
CREATE POLICY "Authenticated users can view profiles." ON public.profiles
FOR SELECT
TO authenticated
USING (true);