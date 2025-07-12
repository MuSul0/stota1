-- Zuerst alle bestehenden Medien löschen, um Duplikate zu vermeiden
DELETE FROM public.media;

-- Neue, passende Medien für die gesamte Webseite einfügen
INSERT INTO public.media (type, url, title) VALUES
-- Hero-Hintergrundbild
('image', 'https://images.unsplash.com/photo-1587582423116-ec072937a7ca?q=80&w=1932&auto=format&fit=crop', 'Hero Background'),

-- Über Uns Seite
('image', 'https://images.unsplash.com/photo-1576293233213-93914b5a5544?q=80&w=1740&auto=format&fit=crop', 'About Us Main Image'),
('image', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop', 'Stotta Müller Profile'),
('image', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop', 'Maria Schmidt Profile'),
('image', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop', 'Thomas Weber Profile'),

-- Startseite Teaser
('image', 'https://images.unsplash.com/photo-1579621970795-87f54d5921ba?q=80&w=1740&auto=format&fit=crop', 'Referral Program Teaser'),
('image', 'https://images.unsplash.com/photo-1576293233213-93914b5a5544?q=80&w=1740&auto=format&fit=crop', 'About Us Teaser'),

-- Galerie: Vorher/Nachher & Videos
('image', 'https://images.unsplash.com/photo-1585421997806-44b19b7142ce?q=80&w=1887&auto=format&fit=crop', 'Office Cleaning Before'),
('image', 'https://images.unsplash.com/photo-1600585152225-3582437e8ade?q=80&w=1740&auto=format&fit=crop', 'Office Cleaning After'),
('image', 'https://images.unsplash.com/photo-1604709177595-ee9c2541e8c3?q=80&w=1887&auto=format&fit=crop', 'Kitchen Cleaning Before'),
('image', 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1935&auto=format&fit=crop', 'Kitchen Cleaning After'),
('video', 'https://videos.pexels.com/video-files/854126/854126-hd_1920_1080_25fps.mp4', 'Office Cleaning Timelapse'),
('video', 'https://videos.pexels.com/video-files/5793641/5793641-hd_1920_1080_25fps.mp4', 'Family Move Documented'),

-- Zusätzliche Bilder für die Galerie
('image', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1740&auto=format&fit=crop', 'Grundreinigung einer Wohnung'),
('image', 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1740&auto=format&fit=crop', 'Professioneller Umzugsservice'),
('image', 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=1740&auto=format&fit=crop', 'Sicherer Transport von Waren'),
('image', 'https://images.unsplash.com/photo-1585776433-287534348125?q=80&w=1740&auto=format&fit=crop', 'Gartenpflege und Landschaftsbau'),
('image', 'https://images.unsplash.com/photo-1621905251918-48415bdd7e24?q=80&w=1740&auto=format&fit=crop', 'Entsorgung und Entrümpelung'),
('image', 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1740&auto=format&fit=crop', 'Fahrzeugaufbereitung'),
('image', 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop', 'Treppenhausreinigung');