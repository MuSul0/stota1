import { Heart, Shield, Clock, Award } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const UeberUns = () => {
  const values = [
    {
      icon: Shield,
      title: 'Zuverlässigkeit',
      description: 'Auf uns können Sie sich verlassen. Pünktlichkeit und Verlässlichkeit sind die Grundpfeiler unserer Arbeit.'
    },
    {
      icon: Heart,
      title: 'Menschlichkeit',
      description: 'Wir behandeln jeden Kunden mit Respekt und gehen individuell auf Ihre Bedürfnisse ein.'
    },
    {
      icon: Clock,
      title: 'Effizienz',
      description: 'Schnell, aber gründlich – wir erledigen Ihre Aufträge termingerecht und in höchster Qualität.'
    },
    {
      icon: Award,
      title: 'Qualität',
      description: 'Höchste Standards bei allen unseren Dienstleistungen. Ihre Zufriedenheit ist unser Erfolg.'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Über Nikolai Transport</h1>
            <p className="text-xl text-blue-100">
              Seit über 10 Jahren Ihr vertrauensvoller Partner für Reinigung, 
              Transport und Umzugshilfe in der Region.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Unsere Geschichte</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Was 2014 als kleines Familienunternehmen begann, hat sich zu einem 
                  der vertrauenswürdigsten Dienstleister in der Region entwickelt. 
                  Nikolai gründete das Unternehmen mit einer einfachen Vision: 
                  ehrliche, zuverlässige Arbeit zu fairen Preisen.
                </p>
                <p>
                  Heute sind wir stolz darauf, über 500 zufriedene Kunden zu haben 
                  und täglich neue Herausforderungen anzunehmen. Unser Team besteht 
                  aus erfahrenen Fachkräften, die mit Leidenschaft und Professionalität 
                  bei der Sache sind.
                </p>
                <p>
                  Ob Reinigung, Transport oder Umzug – wir behandeln jeden Auftrag 
                  mit der gleichen Sorgfalt und dem gleichen Engagement, als wäre 
                  es für unsere eigene Familie.
                </p>
              </div>
            </div>
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <span className="text-gray-500 text-center px-4">
                Bild: Nikolai vor seinem ersten Transporter im Jahr 2014, 
                stolz und motiviert für die Zukunft
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Unsere Werte</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Diese Grundsätze leiten uns bei allem, was wir tun
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center h-full">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Unser Team</h2>
            <p className="text-xl text-gray-600">
              Lernen Sie die Menschen hinter Nikolai Transport kennen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Foto: Nikolai</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Nikolai Müller</h3>
                <p className="text-blue-600 mb-3">Geschäftsführer & Gründer</p>
                <p className="text-gray-600 text-sm">
                  Mit über 15 Jahren Erfahrung in der Branche leitet Nikolai 
                  das Unternehmen mit Herz und Verstand. Seine Leidenschaft 
                  für exzellenten Service spiegelt sich in jedem Projekt wider.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Foto: Maria</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Maria Schmidt</h3>
                <p className="text-blue-600 mb-3">Teamleiterin Reinigung</p>
                <p className="text-gray-600 text-sm">
                  Maria bringt 8 Jahre Erfahrung in der professionellen Reinigung mit. 
                  Ihre Aufmerksamkeit für Details und ihr freundliches Wesen 
                  machen sie zu einer geschätzten Teamleiterin.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Foto: Thomas</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Thomas Weber</h3>
                <p className="text-blue-600 mb-3">Spezialist Transport & Umzug</p>
                <p className="text-gray-600 text-sm">
                  Thomas ist unser Experte für alle Transport- und Umzugsangelegenheiten. 
                  Mit seiner ruhigen Art und seinem technischen Know-how 
                  meistert er jede Herausforderung.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Unsere Mission</h2>
            <p className="text-xl text-blue-100 mb-8">
              "Wir möchten das Leben unserer Kunden einfacher machen, indem wir 
              zuverlässige, qualitativ hochwertige Dienstleistungen anbieten. 
              Jeder Kunde verdient unsere volle Aufmerksamkeit und unser Bestes."
            </p>
            <div className="text-lg text-blue-200">
              - Nikolai Müller, Gründer
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UeberUns;