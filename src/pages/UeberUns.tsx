import { Heart, Shield, Clock, Award, Users, Target, Lightbulb, Handshake } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ParallaxSection from '@/components/ParallaxSection';
import { useMedia } from '@/hooks/useMedia';

const UeberUns = () => {
  const { media: aboutUsMainImage, loading: loadingAboutUsMainImage, error: aboutUsMainError } = useMedia({ title: 'About Us Main Image' });
  const { media: stottaMullerProfile, loading: loadingStottaMullerProfile, error: stottaMullerProfileError } = useMedia({ title: 'Stotta Müller Profile' });
  const { media: mariaSchmidtProfile, loading: loadingMariaSchmidtProfile, error: mariaSchmidtProfileError } = useMedia({ title: 'Maria Schmidt Profile' });
  const { media: thomasWeberProfile, loading: loadingThomasWeberProfile, error: thomasWeberProfileError } = useMedia({ title: 'Thomas Weber Profile' });

  const values = [
    {
      icon: Shield,
      title: 'Zuverlässigkeit',
      description: 'Ihre Termine sind uns heilig. Pünktlichkeit und absolute Verlässlichkeit sind nicht nur Versprechen, sondern unser täglicher Standard.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Heart,
      title: 'Menschlichkeit',
      description: 'Hinter jedem Auftrag steht ein Mensch. Wir hören zu, verstehen und handeln mit Empathie, um Ihre individuellen Wünsche zu erfüllen.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Clock,
      title: 'Effizienz',
      description: 'Zeit ist Geld – und Ihre Zeit ist uns kostbar. Wir arbeiten zügig, präzise und ohne Kompromisse bei der Qualität.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Qualität',
      description: 'Wir streben nach Perfektion. Jeder Handgriff, jede Lösung ist darauf ausgelegt, Ihre Erwartungen nicht nur zu erfüllen, sondern zu übertreffen.',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  if (loadingAboutUsMainImage || loadingStottaMullerProfile || loadingMariaSchmidtProfile || loadingThomasWeberProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Lade Über uns...</p>
      </div>
    );
  }

  if (aboutUsMainError || stottaMullerProfileError || mariaSchmidtProfileError || thomasWeberProfileError) {
    console.error("Fehler beim Laden der Bilder auf der 'Über uns'-Seite:", aboutUsMainError, stottaMullerProfileError, mariaSchmidtProfileError, thomasWeberProfileError);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Über Stotta Transport
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Seit über einem Jahrzehnt gestalten wir Räume neu und bewegen Leben vorwärts. 
            Entdecken Sie die Geschichte hinter Stotta Transport – wo Leidenschaft auf Präzision trifft und jeder Auftrag ein Versprechen ist.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <ParallaxSection speed={0.05}>
        <section className="py-20 bg-white rounded-3xl shadow-lg mx-6 md:mx-12 lg:mx-24">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-block bg-blue-100 text-blue-600 px-5 py-3 rounded-full text-base font-semibold mb-6">
                  📖 Unsere Geschichte
                </div>
                <h2 className="text-4xl font-bold mb-8 text-gray-900">
                  Von der Vision zur Realität
                </h2>
                <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                  <p>
                    Im Jahr 2014 begann unsere Reise mit einer klaren Vision: Stotta wollte einen Dienstleister schaffen, der nicht nur arbeitet, sondern Werte lebt. Aus einem kleinen Familienunternehmen ist eine feste Größe in der Region geworden, bekannt für <strong className="text-blue-600">ehrliche Arbeit, unerschütterliche Zuverlässigkeit und faire Preise</strong>.
                  </p>
                  <p>
                    Heute blicken wir stolz auf über <strong className="text-green-600">500 begeisterte Kunden</strong> und ein Team von <strong className="text-purple-600">passionierten Experten</strong>. Jeder Auftrag, ob Reinigung, Transport oder Umzug, wird mit der Hingabe behandelt, die wir unserer eigenen Familie entgegenbringen würden. <strong className="text-purple-600">Das ist unser unumstößliches Versprechen an Sie.</strong>
                  </p>
                </div>
                <div className="mt-8">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-10 py-4 shadow-lg font-semibold" asChild>
                    <Link to="/kontakt">Werden Sie Teil unserer Geschichte</Link>
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl"
              >
                <img 
                  src={aboutUsMainImage?.url || "https://placehold.co/600x400/dbeafe/2563eb?text=Über+Uns"}
                  alt="Stotta Müller vor seinem ersten Transporter im Jahr 2014"
                  className="w-full h-96 object-cover rounded-3xl"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-3xl">
                  <p className="text-white font-medium">Stotta Müller, 2014</p>
                  <p className="text-white/80 text-sm">Der Anfang einer Erfolgsgeschichte</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-block bg-green-100 text-green-600 px-5 py-3 rounded-full text-base font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              💎 Unser Fundament
            </motion.div>
            <motion.h2 
              className="text-4xl font-bold mb-6 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Werte, die uns tragen
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Diese Prinzipien sind der Herzschlag unserer Arbeit und garantieren Ihre Zufriedenheit.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-col items-center text-center p-8 border rounded-3xl shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`w-24 h-24 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mb-8 shadow-lg`}>
                  <value.icon className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{value.title}</h3>
                <p className="text-gray-700 text-lg leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-block bg-orange-100 text-orange-600 px-5 py-3 rounded-full text-base font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              👨‍👩‍👧‍👦 Unser Team
            </motion.div>
            <motion.h2 
              className="text-4xl font-bold mb-6 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Das Herz von Stotta Transport: Unser Team
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Treffen Sie die Gesichter, die Ihre Projekte zum Erfolg führen.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <Card className="text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <img 
                      src={stottaMullerProfile?.url || "https://placehold.co/128x128/e0e7ff/4338ca?text=SM"}
                      alt="Stotta Müller - Geschäftsführer"
                      className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Stotta Müller</h3>
                  <p className="text-blue-600 mb-3 font-medium">Geschäftsführer & Gründer</p>
                  <p className="text-gray-700 text-base leading-relaxed">
                    Als Visionär und treibende Kraft hinter Stotta Transport führt Stotta das Unternehmen mit über 15 Jahren Branchenerfahrung. Seine unermüdliche Leidenschaft für exzellenten Service ist der Funke, der jedes Projekt zum Leuchten bringt.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.30 }}
            >
              <Card className="text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <img 
                      src={mariaSchmidtProfile?.url || "https://placehold.co/128x128/dcfce7/16a34a?text=MS"}
                      alt="Maria Schmidt - Teamleiterin"
                      className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Maria Schmidt</h3>
                  <p className="text-green-600 mb-3 font-medium">Teamleiterin Reinigung</p>
                  <p className="text-gray-700 text-base leading-relaxed">
                    Mit 8 Jahren Expertise ist Maria unsere Meisterin der Sauberkeit. Ihre akribische Detailverliebtheit und ihr ansteckendes Lächeln machen sie zur unverzichtbaren Teamleiterin im Reinigungsbereich.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <Card className="text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <img 
                      src={thomasWeberProfile?.url || "https://placehold.co/128x128/ffedd5/f97316?text=TW"}
                      alt="Thomas Weber - Transport Spezialist"
                      className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Thomas Weber</h3>
                  <p className="text-orange-600 mb-3 font-medium">Spezialist Transport & Umzug</p>
                  <p className="text-gray-700 text-base leading-relaxed">
                    Wenn es um Transport und Umzug geht, ist Thomas Ihr Mann. Mit ruhiger Hand und tiefgreifendem Fachwissen navigiert er selbst die komplexesten Herausforderungen sicher ans Ziel.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UeberUns;