-- Aktiviere Row Level Security auf der Tabelle profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy für INSERT: Nur Admins dürfen Mitarbeiter-Profile anlegen
CREATE POLICY "Admins can insert Mitarbeiter profiles" ON profiles
FOR INSERT
WITH CHECK (
  auth.role() = 'authenticated' AND
  (
    (role != 'mitarbeiter') OR
    (role = 'mitarbeiter' AND EXISTS (
      SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    ))
  )
);

-- Policy für UPDATE: Nur Admins dürfen Mitarbeiter-Profile ändern
CREATE POLICY "Admins can update Mitarbeiter profiles" ON profiles
FOR UPDATE
USING (
  auth.role() = 'authenticated' AND
  (
    (role != 'mitarbeiter') OR
    (role = 'mitarbeiter' AND EXISTS (
      SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    ))
  )
);