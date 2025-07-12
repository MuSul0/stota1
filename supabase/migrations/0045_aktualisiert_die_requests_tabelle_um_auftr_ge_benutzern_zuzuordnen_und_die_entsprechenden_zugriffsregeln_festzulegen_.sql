-- Fügt eine Spalte für die Benutzer-ID hinzu, falls sie noch nicht existiert.
ALTER TABLE public.requests ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Entfernt alte Zugriffsregeln, um Konflikte zu vermeiden.
DROP POLICY IF EXISTS "Users can view their own requests." ON public.requests;
DROP POLICY IF EXISTS "Users can insert their own requests." ON public.requests;
DROP POLICY IF EXISTS "Users can update their own requests." ON public.requests;

-- Erstellt neue Zugriffsregeln.
-- Benutzer können ihre eigenen Aufträge sehen.
CREATE POLICY "Users can view their own requests." ON public.requests FOR SELECT USING (auth.uid() = user_id);
-- Benutzer können neue Aufträge für sich selbst erstellen.
CREATE POLICY "Users can insert their own requests." ON public.requests FOR INSERT WITH CHECK (auth.uid() = user_id);
-- Benutzer können ihre eigenen Aufträge aktualisieren (z.B. stornieren).
CREATE POLICY "Users can update their own requests." ON public.requests FOR UPDATE USING (auth.uid() = user_id);