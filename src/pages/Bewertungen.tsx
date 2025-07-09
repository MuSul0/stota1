import { Star, Quote, Users, ThumbsUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ParallaxSection from '@/components/ParallaxSection';

const Bewertungen = () => {
  const testimonials = [
    {
      name: 'Maria Schneider',
      location: 'München',
      service: 'Haushaltsreinigung',
      rating: 5,
      text: 'Stotta und sein Team sind einfach fantastisch! Seit 2 Jahren reinigen sie wöchentlich unsere Wohnung und wir sind jedes Mal begeistert. Zuverlässig, gründlich und sehr freundlich. Kann ich nur weiterempfehlen!',
      initials: 'MS',
      date: 'vor 1 Woche'
    },
    {
      name: 'Thomas Weber',
      location: 'Augsburg',
      service: 'Umzugshilfe',
      rating: 5,
      text: 'Unser Umzug war dank Stotta Transport stressfrei und perfekt organisiert. Das Team war pünktlich, professionell und sehr vorsichtig mit unseren Möbeln. Sogar die Möbelmontage wurde perfekt erledigt. Top Service!',
      initials: 'TW',
      date: 'vor 2 Wochen'
    },
    {
      name: 'Dr. Andrea Müller',
      location: 'München',
      service: 'Praxisreinigung',
      rating: 5,
      text: 'Als Zahnärztin sind Sauberkeit und Hygiene für mich essentiell. Stotta Transport reinigt unsere Praxis seit über einem Jahr und erfüllt alle Hygienestandards perfekt. Sehr zuverlässig und diskret.',
      initials: 'AM',
      date: 'vor 3 Wochen'
    },
    {
      name: 'Stefan Richter',
      location: 'Nürnberg',
      service: 'Transport',
      rating: 5,
      text: 'Musste kurzfristig ein Klavier transportieren lassen. Stotta hat das super schnell und professionell organisiert. Das Klavier kam ohne einen Kratzer an. Faire Preise und excellenter Service!',
      initials: 'SR',
      date: 'vor 1 Monat'
    },
    {
      name: 'Familie Hoffmann',
      location: 'Regensburg',
      service: 'Komplettservice',
      rating: 5,
      text: 'Von der Entrümpelung der alten Wohnung über den Umzug bis zur Grundreinigung - alles aus einer Hand und perfekt koordiniert. Das Team ist super freundlich und arbeitet sehr gewissenhaft.',
      initials: 'FH',
      date: 'vor 1 Monat'
    },
    {
      name: 'Markus Klein',
      location: 'Ingolstadt',
      service: 'Büroreinigung',
      rating: 5,
      text: 'Unser Büro wird seit 6 Monaten von Stotta Transport gereinigt. Immer pünktlich, immer gründlich. Die Mitarbeiter sind sehr freundlich und arbeiten auch außerhalb der Geschäftszeiten. Sehr empfehlenswert!',
      initials: 'MK',
      date: 'vor 6 Wochen'
    }
  ];

  const stats = [
    { label: 'Durchschnittsbewertung', value: '4.9/5', icon: Star },
    { label: 'Anzahl Bewertungen', value: '127+', icon: Quote },
    { label: 'Weiterempfehlungsrate', value: '98%', icon: ThumbsUp },
    { label: 'Stammkunden', value: '85%', icon: Users }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Was unsere Kunden wirklich sagen
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Ihre Zufriedenheit ist unser größter Erfolg. Entdecken Sie authentische Stimmen, die unsere Arbeit bestätigen.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-700 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <ParallaxSection speed={0.05}>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
              >
                Echte Stimmen, echte Ergebnisse
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Lesen Sie, wie wir das Leben unserer Kunden positiv verändert haben.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index} 
                  className="h-full"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Avatar className="mr-4 w-12 h-12">
                          <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                            {testimonial.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-800">{testimonial.name}</h3>
                          <p className="text-sm text-gray-600">{testimonial.location}</p>
                        </div>
                      </div>

                      <div className="flex items-center mb-3">
                        <div className="flex mr-2">
                          {renderStars(testimonial.rating)}
                        </div>
                        <span className="text-sm text-gray-500">{testimonial.date}</span>
                      </div>

                      <div className="mb-4">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full font-medium">
                          {testimonial.service}
                        </span>
                      </div>

                      <Quote className="h-8 w-8 text-blue-200 mb-3" />
                      <p className="text-gray-700 italic leading-relaxed">"{testimonial.text}"</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Review Platforms */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              Ihre Meinung zählt!
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Teilen Sie Ihre Erfahrung und helfen Sie uns, noch besser zu werden.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <Card className="text-center h-full hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Google Bewertungen</h3>
                  <p className="text-gray-600 mb-4">
                    Bewerten Sie uns auf Google und helfen Sie anderen Kunden bei ihrer Entscheidung.
                  </p>
                  <div className="flex justify-center mb-2">
                    {renderStars(5)}
                  </div>
                  <p className="text-sm text-gray-500">4.9/5 Sterne (89 Bewertungen)</p>
                  <Button variant="outline" className="mt-4 text-blue-600 border-blue-600 hover:bg-blue-50" asChild>
                    <a href="https://www.google.com/search?q=Stotta+Transport+reviews" target="_blank" rel="noopener noreferrer">
                      Jetzt bewerten
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Card className="text-center h-full hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Trustpilot</h3>
                  <p className="text-gray-600 mb-4">
                    Teilen Sie Ihre Erfahrung auf Trustpilot und helfen Sie uns, noch besser zu werden.
                  </p>
                  <div className="flex justify-center mb-2">
                    {renderStars(5)}
                  </div>
                  <p className="text-sm text-gray-500">4.8/5 Sterne (23 Bewertungen)</p>
                  <Button variant="outline" className="mt-4 text-green-600 border-green-600 hover:bg-green-50" asChild>
                    <a href="https://www.trustpilot.com/review/stotta-transport.de" target="_blank" rel="noopener noreferrer">
                      Jetzt bewerten
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Card className="text-center h-full hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Facebook</h3>
                  <p className="text-gray-600 mb-4">
                    Folgen Sie uns auf Facebook und bewerten Sie unsere Dienstleistungen.
                  </p>
                  <div className="flex justify-center mb-2">
                    {renderStars(5)}
                  </div>
                  <p className="text-sm text-gray-500">5.0/5 Sterne (15 Bewertungen)</p>
                  <Button variant="outline" className="mt-4 text-yellow-600 border-yellow-600 hover:bg-yellow-50" asChild>
                    <a href="https://www.facebook.com/stottatransport" target="_blank" rel="noopener noreferrer">
                      Jetzt bewerten
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            Werden Sie unser nächster zufriedener Kunde!
          </motion.h2>
          <motion.p 
            className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Überzeugen Sie sich selbst von unserem erstklassigen Service. Kontaktieren Sie uns für ein kostenloses Angebot.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button size="lg" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors" asChild>
              <Link to="/kontakt">Jetzt anfragen</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors" asChild>
              <a href="tel:+49123456789">Sofort anrufen</a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Bewertungen;