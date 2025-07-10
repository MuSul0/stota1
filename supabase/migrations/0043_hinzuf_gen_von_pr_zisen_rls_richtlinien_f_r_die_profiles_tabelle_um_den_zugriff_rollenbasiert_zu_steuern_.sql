-- RLS auf der Tabelle aktivieren
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Richtlinie für SELECT: Benutzer können ihr eigenes Profil sehen
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

-- Richtlinie für SELECT: Admins können alle Profile sehen
CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
USING ((auth.jwt() ->> 'role'::text) = 'admin');

-- Richtlinie für SELECT: Mitarbeiter können alle Profile sehen
CREATE POLICY "Employees can view all profiles"
ON public.profiles FOR SELECT
USING ((auth.jwt() ->> 'role'::text) = 'mitarbeiter');

-- Richtlinie für UPDATE: Benutzer können ihr eigenes Profil aktualisieren
CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- Für INSERT ist keine explizite ALLOW-Richtlinie erforderlich, da der Datenbank-Trigger die Profilerstellung übernimmt und RLS umgeht.
-- Direkte Client-Side-Inserts werden standardmäßig verweigert, wenn keine passende ALLOW-Richtlinie existiert.