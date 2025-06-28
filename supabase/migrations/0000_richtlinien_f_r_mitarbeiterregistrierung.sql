-- Deaktiviere Selbstregistrierung für Mitarbeiter
UPDATE auth.users SET raw_app_meta_data = jsonb_set(
  raw_app_meta_data,
  '{allowed_roles}',
  '["employee"]'
) WHERE email LIKE '%@yourcompany.com';

-- Erstelle RLS-Richtlinien
CREATE POLICY "Nur Admins können Mitarbeiter erstellen" 
ON auth.users FOR INSERT WITH CHECK (
  auth.role() = 'admin'
);

CREATE POLICY "Mitarbeiter können sich nicht selbst registrieren"
ON auth.users FOR INSERT WITH CHECK (
  auth.role() <> 'employee'
);