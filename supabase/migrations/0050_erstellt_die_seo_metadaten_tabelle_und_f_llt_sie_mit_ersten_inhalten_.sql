-- Create the table
CREATE TABLE public.seo_metadata (
  path TEXT PRIMARY KEY,
  title TEXT,
  description TEXT,
  keywords TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE public.seo_metadata ENABLE ROW LEVEL SECURITY;

-- Policy for public read access
CREATE POLICY "Public can read SEO metadata" ON public.seo_metadata FOR SELECT USING (true);

-- Policy for admin full access
CREATE POLICY "Admins can manage SEO metadata" ON public.seo_metadata FOR ALL
USING (((auth.jwt() -> 'app_metadata'::text) ->> 'role'::text) = 'admin'::text)
WITH CHECK (((auth.jwt() -> 'app_metadata'::text) ->> 'role'::text) = 'admin'::text);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to call the function
CREATE TRIGGER update_seo_metadata_updated_at
BEFORE UPDATE ON public.seo_metadata
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial SEO data
INSERT INTO public.seo_metadata (path, title, description, keywords) VALUES
('/', 'Stota Transport | Zuverlässige Transporte, Reinigung & Gartenbau', 'Ihr Partner für professionelle Transporte, gründliche Reinigung, kreativen Garten- & Landschaftsbau und umweltgerechte Entsorgung. Fordern Sie jetzt Ihr Angebot an!', 'Transport, Umzug, Reinigung, Gartenbau, Entsorgung, Gelsenkirchen, Dienstleister'),
('/leistungen', 'Unsere Leistungen | Stota Transport', 'Entdecken Sie unsere vielfältigen Dienstleistungen: Transporte, Garten- & Landschaftsbau, professionelle Reinigung und fachgerechte Entsorgung. Qualität und Zuverlässigkeit aus einer Hand.', 'Dienstleistungen, Transporte, Gartenpflege, Reinigungsservice, Entsorgung, Stota Transport'),
('/ueber-uns', 'Über uns | Die Geschichte von Stota Transport', 'Lernen Sie das Team und die Werte von Stota Transport kennen. Seit 2014 Ihr zuverlässiger Partner für Transporte, Reinigung und mehr. Menschlichkeit und Qualität stehen bei uns im Fokus.', 'Über Stota, Team, Geschichte, Werte, Zuverlässigkeit, Familienunternehmen'),
('/galerie', 'Galerie | Unsere Projekte in Bildern | Stota Transport', 'Sehen Sie die Ergebnisse unserer Arbeit. Unsere Galerie zeigt erfolgreich abgeschlossene Projekte aus den Bereichen Transport, Gartenbau und Reinigung. Überzeugen Sie sich von unserer Qualität.', 'Projekte, Referenzen, Bilder, Galerie, Vorher-Nachher, Stota Transport'),
('/empfehlungsprogramm', 'Empfehlungsprogramm | Stota Transport', 'Empfehlen Sie Stota Transport weiter und sichern Sie sich attraktive Prämien! Profitieren Sie und Ihre Freunde von unserem Dankeschön für Ihr Vertrauen.', 'Empfehlung, Prämie, Freunde werben, Rabatt, Bonus, Stota Transport'),
('/kontakt', 'Kontakt | Nehmen Sie Kontakt mit Stota Transport auf', 'Haben Sie Fragen oder wünschen ein Angebot? Kontaktieren Sie uns per Telefon, E-Mail oder Kontaktformular. Wir freuen uns auf Ihre Anfrage!', 'Kontakt, Anfrage, Angebot, Telefon, E-Mail, Adresse, Stota Transport'),
('/leistungen/transporte', 'Transporte & Umzüge | Sicher und pünktlich | Stota Transport', 'Professionelle Transportlösungen für Privat- und Firmenkunden. Von Hightech-Waren bis zum kompletten Umzug – wir bringen Ihre Güter sicher ans Ziel.', 'Transport, Umzug, Expressversand, Firmenumzug, Möbeltransport, Gelsenkirchen'),
('/leistungen/garten-landschaftsbau', 'Garten- & Landschaftsbau | Ihr Traumgarten | Stota Transport', 'Wir gestalten und pflegen Ihre grüne Oase. Von der Gartenpflege über Heckenschnitt bis zur kompletten Neugestaltung – Ihr Experte für Garten- & Landschaftsbau.', 'Gartenbau, Landschaftsbau, Gartenpflege, Heckenschnitt, Baumfällung, Terrassenbau'),
('/leistungen/reinigung', 'Professionelle Reinigung | Für Privat & Gewerbe | Stota Transport', 'Makellose Sauberkeit für Ihr Zuhause oder Büro. Wir bieten Grundreinigung, Unterhaltsreinigung, Fahrzeugaufbereitung und mehr. Buchen Sie unseren Reinigungsservice!', 'Reinigung, Büroreinigung, Grundreinigung, Fahrzeugaufbereitung, Reinigungsservice'),
('/leistungen/entsorgung', 'Fachgerechte Entsorgung | Schnell & Umweltbewusst | Stota Transport', 'Wir entsorgen für Sie Möbel, Elektroschrott, Gartenabfälle und Renovierungsreste. Schnell, zuverlässig und umweltgerecht. Schaffen Sie Platz mit unserem Entsorgungsservice.', 'Entsorgung, Entrümpelung, Sperrmüll, Bauschutt, Gartenabfälle, Recycling')
ON CONFLICT (path) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  keywords = EXCLUDED.keywords;