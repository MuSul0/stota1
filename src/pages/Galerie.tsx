import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Galerie = () => {
  const projects = [
    {
      title: 'Büroreinigung Innenstadt',
      category: 'Reinigung',
      description: 'Regelmäßige Reinigung eines 500m² Bürokomplexes',
      imageAlt: 'Sauberes modernes Büro mit glänzenden Böden und aufgeräumten Arbeitsplätzen'
    },
    {
      title: 'Familienumzug nach München',
      category: 'Umzug',
      description: 'Kompletter Umzug einer 4-Zimmer-Wohnung mit Möbelmontage',
      imageAlt: 'Umzugsteam beim sorgfältigen Verpacken von Möbeln und Hausrat'
    },
    {
      title: 'Praxisreinigung Zahnarzt',
      category: 'Reinigung',
      description: 'Hygienische Reinigung einer Zahnarztpraxis nach Hygienestandards',
      imageAlt: 'Sterile, blitzsaubere Zahnarztpraxis nach professioneller Reinigung'
    },
    {
      title: 'Klaviertransport',
      category: 'Transport',
      description: 'Sicherer Transport eines Flügels in den 3. Stock',
      imageAlt: 'Professioneller Transport eines Klaviers mit Spezialausrüstung'
    },
    {
      title: 'Grundreinigung nach Renovierung',
      category: 'Reinigung',
      description: 'Komplette Grundreinigung nach Renovierungsarbeiten',
      imageAlt: 'Perfekt gereinigte Wohnung nach Renovierung, staubfrei und glänzend'
    },
    {
      title: 'Firmenumzug IT-Unternehmen',
      category: 'Umzug',
      description: 'Umzug eines IT-Unternehmens mit sensibler Technik',
      imageAlt: 'Sicherer Transport von IT-Equipment und Servern'
    },
    {
      title: 'Fensterreinigung Hochhaus',
      category: 'Reinigung',
      description: 'Professionelle Fensterreinigung an einem 8-stöckigen Gebäude',
      imageAlt: 'Reinigungskraft bei der Fensterreinigung an einem Hochhaus'
    },
    {
      title: 'Antiquitätentransport',
      category: 'Transport',
      description: 'Vorsichtiger Transport wertvoller Antiquitäten',
      imageAlt: 'Sorgfältig verpackte Antiquitäten im Transportfahrzeug'
    },
    {
      title: 'Hotelreinigung',
      category: 'Reinigung',
      description: 'Tägliche Reinigung eines Boutique-Hotels',
      imageAlt: 'Luxuriöses Hotelzimmer nach professioneller Reinigung'
    }
  ];

  const categories = ['Alle', 'Reinigung', 'Transport', 'Umzug'];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Unsere Projekte</h1>
            <p className="text-xl text-blue-100">
              Sehen Sie sich unsere erfolgreich abgeschlossenen Projekte an. 
              Jedes Bild erzählt eine Geschichte von Qualität und Zufriedenheit.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Badge key={category} variant="outline" className="cursor-pointer hover:bg-blue-600 hover:text-white transition-colors">
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="bg-gray-200 h-64 flex items-center justify-center">
                    <span className="text-gray-500 text-center px-4 text-sm">
                      {project.imageAlt}
                    </span>
                  </div>
                  <Badge className="absolute top-4 left-4" variant="secondary">
                    {project.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nikolai Transport in Aktion</h2>
            <p className="text-xl text-gray-600">
              Sehen Sie uns bei der Arbeit und überzeugen Sie sich von unserer Professionalität
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-0">
                <div className="bg-gray-200 h-64 flex items-center justify-center">
                  <span className="text-gray-500 text-center px-4">
                    Video: Zeitraffer einer kompletten Büroreinigung<br />
                    (Dauer: 2 Minuten)
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Büroreinigung im Zeitraffer</h3>
                  <p className="text-gray-600">
                    Sehen Sie, wie unser Team ein 300m² Büro in nur 3 Stunden 
                    perfekt reinigt.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-0">
                <div className="bg-gray-200 h-64 flex items-center justify-center">
                  <span className="text-gray-500 text-center px-4">
                    Video: Professioneller Umzug einer Familie<br />
                    (Dauer: 3 Minuten)
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Familienumzug dokumentiert</h3>
                  <p className="text-gray-600">
                    Von der Planung bis zum letzten Karton – ein kompletter 
                    Umzug dokumentiert.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Vorher & Nachher</h2>
            <p className="text-xl text-gray-600">
              Der Unterschied, den professionelle Arbeit macht
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Büroreinigung</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Vorher</p>
                    <div className="bg-gray-200 h-32 flex items-center justify-center rounded">
                      <span className="text-gray-500 text-xs text-center">
                        Unordentliches Büro
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Nachher</p>
                    <div className="bg-gray-200 h-32 flex items-center justify-center rounded">
                      <span className="text-gray-500 text-xs text-center">
                        Perfekt gereinigtes Büro
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Wohnungsreinigung</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Vorher</p>
                    <div className="bg-gray-200 h-32 flex items-center justify-center rounded">
                      <span className="text-gray-500 text-xs text-center">
                        Verschmutzte Küche
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Nachher</p>
                    <div className="bg-gray-200 h-32 flex items-center justify-center rounded">
                      <span className="text-gray-500 text-xs text-center">
                        Glänzende saubere Küche
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Galerie;