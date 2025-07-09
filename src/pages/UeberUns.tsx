import { HeartHandshake, Sun, Users2, Flower, TreeDeciduous, Sparkles, SmilePlus, HandHeart, Star, Award, Target } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ParallaxSection from '@/components/ParallaxSection';
import { useMedia } from '@/hooks/useMedia';

const UeberUns = () => {
  const { media: aboutUsMainImage, loading: loadingAboutUsMainImage, error: aboutUsMainError } = useMedia({ title: 'About Us Main Image', type: 'image' });
  const { media: stottaMullerProfile, loading: loadingStottaMullerProfile, error: stottaMullerProfileError } = useMedia({ title: 'Stotta Müller Profile', type: 'image' });
  const { media: mariaSchmidtProfile, loading: loadingMariaSchmidtProfile, error: mariaSchmidtProfileError } = useMedia({ title: 'Maria Schmidt Profile', type: 'image' });
  const { media: thomasWeberProfile, loading: loadingThomasWeberProfile, error: thomasWeberProfileError } = useMedia({ title: 'Thomas Weber Profile', type: 'image' });

  const values = [
    {
      icon: HeartHandshake,
      title: 'Herzlichkeit',
      description: 'Wir begegnen jedem Kunden mit Wärme und Respekt – Ihre Zufriedenheit liegt uns am Herzen.',
      colorFrom: 'from-pink-300',
      colorTo: 'to-yellow-300'
    },
    {
      icon: Sun,
      title: 'Positivität',
      description: 'Mit einem Lächeln und viel Energie sorgen wir für eine angenehme Zusammenarbeit.',
      colorFrom: 'from-yellow-300',
      colorTo: 'to-amber-400'
    },
    {
      icon: Flower,
      title: 'Nachhaltigkeit',
      description: 'Wir achten auf Umweltfreundlichkeit und nachhaltige Lösungen in all unseren Dienstleistungen.',
      colorFrom: 'from-green-300',
      colorTo: 'to-emerald-400'
    },
    {
      icon: Users2,
      title: 'Teamgeist',
      description: 'Unser starkes Team arbeitet Hand in Hand, um Ihre Wünsche bestmöglich umzusetzen.',
      colorFrom: 'from-blue-300',
      colorTo: 'to-indigo-400'
    }
  ];

  const milestones = [
    { year: '2014', title: 'Gründung', description: 'Stotta startet mit einem kleinen Transporter und einer großen Vision.', icon: TreeDeciduous },
    { year: '2016', title: 'Expansion', description: 'Erstes eigenes Büro und ein wachsendes Team von 3 engagierten Mitarbeitern.', icon: Users2 },
    { year: '2018', title: 'Wachstum', description: 'Die Marke Stotta Transport etabliert sich – über 100 zufriedene Kunden erreicht.', icon: Sparkles },
    { year: '2020', title: 'Digitalisierung', description: 'Einführung eines modernen Online-Buchungssystems für mehr Komfort.', icon: Target },
    { year: '2022', title: 'Auszeichnung', description: 'Als bester Dienstleister der Region für herausragenden Service prämiert.', icon: Award },
    { year: '2024', title: 'Heute', description: 'Ein starkes Team von 15 Mitarbeitern, 3 Standorte und über 500 begeisterte Kunden.', icon: SmilePlus }
  ];

  if (loadingAboutUsMainImage || loadingStottaMullerProfile || loadingMariaSchmidtProfile || loadingThomasWeberProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-yellow-50">
        <p className="text-pink-600 text-lg font-semibold">Lade Über uns...</p>
      </div>
    );
  }

  if (aboutUsMainError || stottaMullerProfileError || mariaSchmidtProfileError || thomasWeberProfileError) {
    console.error("Fehler beim Laden der Bilder auf der 'Über uns'-Seite:", aboutUsMainError, stottaMullerProfileError, mariaSchmidtProfileError, thomasWeberProfileError);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-yellow-50 flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-pink-400 via-yellow-300 to-yellow-400 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Über Stotta Transport
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed drop-shadow-sm"
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
                <div className="inline-block bg-pink-100 text-pink-700 px-5 py-3 rounded-full text-base font-semibold mb-6 shadow-md">
                  📖 Unsere Geschichte
                </div>
                <h2 className="text-4xl font-bold mb-8 text-pink-900 tracking-tight">
                  Von der Vision zur Realität
                </h2>
                <div className="space-y-6 text-pink-800 text-lg leading-relaxed">
                  <p>
                    Im Jahr 2014 begann unsere Reise mit einer klaren Vision: Stotta wollte einen Dienstleister schaffen, der nicht nur arbeitet, sondern Werte lebt. Aus einem kleinen Familienunternehmen ist eine feste Größe in der Region geworden, bekannt für <strong className="text-pink-600">ehrliche Arbeit, unerschütterliche Zuverlässigkeit und faire Preise</strong>.
                  </p>
                  <p>
                    Heute blicken wir stolz auf über <strong className="text-yellow-600">500 begeisterte Kunden</strong> und ein Team von <strong className="text-purple-600">passionierten Experten</strong>. Jeder Auftrag, ob Reinigung, Transport oder Umzug, wird mit der Hingabe behandelt, die wir unserer eigenen Familie entgegenbringen würden. <strong className="text-purple-600">Das ist unser unumstößliches Versprechen an Sie.</strong>
                  </p>
                </div>
                <div className="mt-8">
                  <Button size="lg" className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-full px-10 py-4 shadow-lg font-semibold hover:from-pink-600 hover:to-yellow-500 transition-colors" asChild>
                    <Link to="/kontakt">Werden Sie Teil unserer Geschichte</Link>
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl ring-4 ring-pink-300"
              >
                <img 
                  src={aboutUsMainImage?.url || ""} // Fallback image
                  alt="Stotta Müller vor seinem ersten Transporter im Jahr 2014"
                  className="w-full h-96 object-cover rounded-3xl"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-3xl">
                  <p className="text-white font-semibold text-lg">Stotta Müller, 2014</p>
                  <p className="text-white/80 text-sm">Der Anfang einer Erfolgsgeschichte</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-pink-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-block bg-yellow-200 text-yellow-700 px-5 py-3 rounded-full text-base font-semibold mb-4 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              🚀 Unsere Reise
            </motion.div>
            <motion.h2 
              className="text-4xl font-bold mb-6 text-pink-900 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Unsere Evolution: Eine Reise durch die Zeit
            </motion.h2>
            <motion.p 
              className="text-lg text-pink-800 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Von der ersten Idee bis zum Branchenführer – die entscheidenden Momente, die uns geprägt haben.
            </motion.p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-400 to-yellow-400 rounded-full shadow-lg"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div 
                  key={index} 
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="hover:shadow-xl transition-shadow duration-300 rounded-2xl border border-pink-300 bg-yellow-50">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-center mb-4">
                          <milestone.icon className="h-10 w-10 text-pink-500" />
                        </div>
                        <div className="text-2xl font-bold text-pink-600 mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-bold mb-2 text-pink-900">{milestone.title}</h3>
                        <p className="text-pink-800">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10">
                    <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-block bg-pink-100 text-pink-700 px-5 py-3 rounded-full text-base font-semibold mb-4 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              💎 Unser Fundament
            </motion.div>
            <motion.h2 
              className="text-4xl font-bold mb-6 text-pink-900 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Werte, die uns tragen
            </motion.h2>
            <motion.p 
              className="text-lg text-pink-800 max-w-3xl mx-auto leading-relaxed"
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
                className="flex flex-col items-center text-center p-8 rounded-3xl shadow-lg bg-gradient-to-br from-pink-50 to-yellow-50 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className={`w-24 h-24 bg-gradient-to-r ${value.colorFrom} ${value.colorTo} rounded-full flex items-center justify-center mb-8 shadow-lg`}>
                  <value.icon className="h-12 w-12 text-white drop-shadow-md" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-pink-900">{value.title}</h3>
                <p className="text-pink-800 text-lg leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-pink-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-block bg-yellow-200 text-yellow-700 px-5 py-3 rounded-full text-base font-semibold mb-4 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              👨‍👩‍👧‍👦 Unser Team
            </motion.div>
            <motion.h2 
              className="text-4xl font-bold mb-6 text-pink-900 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Das Herz von Stotta Transport: Unser Team
            </motion.h2>
            <motion.p 
              className="text-lg text-pink-800 max-w-3xl mx-auto leading-relaxed"
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
              <Card className="text-center rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ring-2 ring-pink-300">
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <img 
                      src={stottaMullerProfile?.url || ""} // Fallback image
                      alt="Stotta Müller - Geschäftsführer"
                      className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg ring-4 ring-yellow-300"
                    />
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                      <Users2 className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-pink-900">Stotta Müller</h3>
                  <p className="text-yellow-700 mb-3 font-semibold">Geschäftsführer & Gründer</p>
                  <p className="text-pink-800 text-base leading-relaxed">
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
              <Card className="text-center rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ring-2 ring-yellow-300">
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <img 
                      src={mariaSchmidtProfile?.url || ""} // Fallback image
                      alt="Maria Schmidt - Teamleiterin"
                      className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg ring-4 ring-pink-300"
                    />
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-pink-900">Maria Schmidt</h3>
                  <p className="text-yellow-700 mb-3 font-semibold">Teamleiterin Reinigung</p>
                  <p className="text-pink-800 text-base leading-relaxed">
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
              <Card className="text-center rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ring-2 ring-yellow-300">
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <img 
                      src={thomasWeberProfile?.url || ""} // Fallback image
                      alt="Thomas Weber - Transport Spezialist"
                      className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg ring-4 ring-pink-300"
                    />
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-pink-900">Thomas Weber</h3>
                  <p className="text-yellow-700 mb-3 font-semibold">Spezialist Transport & Umzug</p>
                  <p className="text-pink-800 text-base leading-relaxed">
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