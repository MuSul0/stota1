-- Tabelle für E-Mail-Warteschlange
CREATE TABLE email_queue (
  id SERIAL PRIMARY KEY,
  to_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  text TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  sent_at TIMESTAMP
);

-- Rollen-basierte Berechtigungen
CREATE POLICY "Kunden können nur ihr Profil sehen" ON profiles
  FOR SELECT USING (auth.uid() = id AND auth.jwt() ->> 'role' = 'kunde');

CREATE POLICY "Mitarbeiter können Kundenprofile sehen" ON profiles
  FOR SELECT USING (auth.jwt() ->> 'role' = 'mitarbeiter');

CREATE POLICY "Admins können alle Profile sehen" ON profiles
  FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');