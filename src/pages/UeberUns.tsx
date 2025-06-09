import { Heart, Shield, Clock, Award, Users, Target, Lightbulb, Handshake } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ParallaxSection from '@/components/ParallaxSection';

const UeberUns = () => {
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

  const milestones = [
    { year: '2014', title: 'Gründung', description: 'Nikolai startet mit einem kleinen Transporter und einer großen Vision.' },
    { year: '2016', title: 'Expansion', description: 'Erstes eigenes Büro und ein wachsendes Team von 3 engagierten Mitarbeitern.' },
    { year: '2018', title: 'Wachstum', description: 'Die Marke Nikolai Transport etabliert sich – über 100 zufriedene Kunden erreicht.' },
    { year: '2020', title: 'Digitalisierung', description: 'Einführung eines modernen Online-Buchungssystems für mehr Komfort.' },
    { year: '2022', title: 'Auszeichnung', description: 'Als bester Dienstleister der Region für herausragenden Service prämiert.' },
    { year: '2024', title: 'Heute', description: 'Ein starkes Team von 15 Mitarbeitern, 3 Standorte und über 500 begeisterte Kunden.' }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              👥 Lernen Sie uns kennen
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Über Nikolai Transport
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Seit über einem Jahrzehnt gestalten wir Räume neu und bewegen Leben vorwärts. 
              Entdecken Sie die Geschichte hinter Nikolai Transport – wo Leidenschaft auf Präzision trifft und jeder Auftrag ein Versprechen ist.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <ParallaxSection speed={0.05}>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  📖 Unsere Geschichte
                </div>
                <h2 className="text-4xl font-bold mb-8 text-gray-800">Von der Vision zur Realität</h2>
                <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                  <p>
                    Im Jahr 2014 begann unsere Reise mit einer klaren Vision: Nikolai wollte einen Dienstleister schaffen, der nicht nur arbeitet, sondern Werte lebt. Aus einem kleinen Familienunternehmen ist eine feste Größe in der Region geworden, bekannt für <strong className="text-blue-600">ehrliche Arbeit, unerschütterliche Zuverlässigkeit und faire Preise</strong>.
                  </p>
                  <p>
                    Heute blicken wir stolz auf über <strong className="text-green-600">500 begeisterte Kunden</strong> und ein Team von <strong className="text-purple-600">passionierten Experten</strong>. Jeder Auftrag, ob Reinigung, Transport oder Umzug, wird mit der Hingabe behandelt, die wir unserer eigenen Familie entgegenbringen würden. <strong className="text-purple-600">Das ist unser unumstößliches Versprechen an Sie.</strong>
                  </p>
                </div>
                <div className="mt-8">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white" asChild>
                    <Link to="/kontakt">Werden Sie Teil unserer Geschichte</Link>
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Nikolai Müller vor seinem ersten Transporter im Jahr 2014"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <p className="text-white font-medium">Nikolai Müller, 2014</p>
                    <p className="text-white/80 text-sm">Der Anfang einer Erfolgsgeschichte</p>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
              </motion.div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-block bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              🚀 Unsere Reise
            </motion.div>
            <motion.h2 
              className="text-4xl font-bold mb-6 text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Unsere Evolution: Eine Reise durch die Zeit
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Von der ersten Idee bis zum Branchenführer – die entscheidenden Momente, die uns geprägt haben.
            </motion.p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
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
                    <Card className="hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-bold mb-2 text-gray-800">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white shadow-lg"></div>
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
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              💎 Unser Fundament
            </motion.div>
            <motion.h2 
              className="text-4xl font-bold mb-6 text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Werte, die uns tragen
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Diese Prinzipien sind der Herzschlag unserer Arbeit und garantieren Ihre Zufriedenheit.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
              >
                <Card className="text-center h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="p-8">
                    <div className={`w-20 h-20 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                      <value.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              👨‍👩‍👧‍👦 Unser Team
            </motion.div>
            <motion.h2 
              className="text-4xl font-bold mb-6 text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Das Herz von Nikolai Transport: Unser Team
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Treffen Sie die Gesichter, die Ihre Projekte zum Erfolg führen.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <Card className="text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Nikolai Müller - Geschäftsführer"
                      className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Nikolai Müller</h3>
                  <p className="text-blue-600 mb-3 font-medium">Geschäftsführer & Gründer</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Als Visionär und treibende Kraft hinter Nikolai Transport führt Nikolai das Unternehmen mit über 15 Jahren Branchenerfahrung. Seine unermüdliche Leidenschaft für exzellenten Service ist der Funke, der jedes Projekt zum Leuchten bringt.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.30 }}
            >
              <Card className="text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Maria Schmidt - Teamleiterin"
                      className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Maria Schmidt</h3>
                  <p className="text-green-600 mb-3 font-medium">Teamleiterin Reinigung</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Mit 8 Jahren Expertise ist Maria unsere Meisterin der Sauberkeit. Ihre akribische Detailverliebtheit und ihr ansteckendes Lächeln machen sie zur unverzichtbaren Teamleiterin im Reinigungsbereich.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <Card className="text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      alt="Thomas Weber - Transport Spezialist"
                      className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Thomas Weber</h3>
                  <p className="text-orange-600 mb-3 font-medium">Spezialist Transport & Umzug</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Wenn es um Transport und Umzug geht, ist Thomas Ihr Mann. Mit ruhiger Hand und tiefgreifendem Fachwissen navigiert er selbst die komplexesten Herausforderungen sicher ans Ziel.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-gray-600 mb-6">Und viele weitere talentierte Mitarbeiter, die täglich ihr Bestes geben, um Ihre Erwartungen zu übertreffen.</p>
            <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white" asChild>
              <Link to="/kontakt">Lernen Sie unser Team persönlich kennen</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              🎯 Unsere Mission
            </motion.div>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Was uns jeden Tag antreibt: Ihre Zufriedenheit
            </motion.h2>
            <motion.blockquote 
              className="text-2xl text-blue-100 mb-8 leading-relaxed italic"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              "Wir sind angetreten, um das Leben unserer Kunden spürbar zu erleichtern. Durch zuverlässige, erstklassige Dienstleistungen schaffen wir Freiräume und sorgen für ein Lächeln. Jeder Kunde ist für uns einzigartig und verdient unsere volle Hingabe."
            </motion.blockquote>
            <motion.div 
              className="flex items-center justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                alt="Nikolai Müller"
                className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
              />
              <div className="text-left">
                <p className="text-lg font-medium">Nikolai Müller</p>
                <p className="text-blue-200">Gründer & Geschäftsführer</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UeberUns;