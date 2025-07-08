-- Enable row level security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Jeder kann sein eigenes Profil lesen und bearbeiten
CREATE POLICY "Users can select their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Policy: Admins können alle Profile lesen
CREATE POLICY "Admins can select all profiles" ON public.profiles
  FOR SELECT USING ((auth.jwt() ->> 'role') = 'admin');

-- Policy: Mitarbeiter können Kundenprofile lesen
CREATE POLICY "Mitarbeiter können Kundenprofile lesen" ON public.profiles
  FOR SELECT USING ((auth.jwt() ->> 'role') = 'mitarbeiter');

-- Policy: Kunden können nur ihr eigenes Profil lesen
CREATE POLICY "Kunden können nur ihr Profil lesen" ON public.profiles
  FOR SELECT USING ((auth.uid() = id) AND ((auth.jwt() ->> 'role') = 'kunde'));

-- Policy: Authenticated users can insert their own profile
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);