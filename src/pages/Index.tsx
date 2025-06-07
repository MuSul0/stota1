import { Sparkles, Truck, Home, Star, Users, Clock, Award, Shield, Heart, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const services = [
    {
      icon: Sparkles,
      title: 'Reinigungsservice',
      description: 'Professionelle Reinigung für Privat und Gewerbe',
      features: ['Büroreinigung', 'Haushaltsreinigung', 'Fensterreinigung', 'Grundreinigung'],
      imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      price: 'Ab 25€/h',
      popular: false
    },
    {
      icon: Truck,
      title: 'Transport & Kurier',
      description: 'Schnelle und sichere Transportlösungen',
      features: ['Kleintransporte', 'Kurierdienst', 'Möbeltransport', 'Express-Service'],
      imageUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      price: 'Ab 45€/Fahrt',
      popular: true
    },
    {
      icon: Home,
      title: 'Umzugshilfe',
      description: 'Komplette Umzugsbetreuung mit Möbelmontage',
      features: ['Umzugsplanung', 'Verpackungsservice', 'Möbelmontage', 'Entrümpelung'],
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      price: 'Ab 35€/h',
      popular: false
    }
  ];

  const stats = [
    { icon: Users, number: '500+', label: 'Zufriedene Kunden', color: 'from-blue-500 to-cyan-500' },
    { icon: Star, number: '4.9', label: 'Durchschnittsbewertung', color: 'from-yellow-500 to-orange-500' },
    { icon: Clock, number: '24/7', label: 'Erreichbarkeit', color: 'from-green-500 to-emerald-500' },
    { icon: Truck, number: '1000+', label: 'Erfolgreiche Aufträge', color: 'from-purple-500 to-pink-500' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Zuverlässigkeit',
      description: 'Pünktlich, verlässlich und immer zu Ihren Diensten. Darauf können Sie sich verlassen.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Award,
      title: 'Qualität',
      description: 'Höchste Qualitätsstandards bei allen unseren Dienstleistungen. Ihre Zufriedenheit ist unser Anspruch.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Heart,
      title: 'Menschlichkeit',
      description: 'Wir behandeln Ihr Eigentum wie unser eigenes und gehen respektvoll mit Ihren Wünschen um.',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: Zap,
      title: 'Effizienz',
      description: 'Schnell, aber gründlich – wir erledigen Ihre Aufträge termingerecht und in höchster Qualität.',
      color: 'from-yellow-500 to-green-500'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <Hero />

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Unsere Dienstleistungen
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Alles aus einer Hand
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Von der Reinigung bis zum Umzug – wir sind Ihr verlässlicher Partner 
              für alle Dienstleistungen rund um Ihr Zuhause und Ihr Unternehmen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg" asChild>
              <Link to="/leistungen">Alle Leistungen ansehen</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Zahlen, die für sich sprechen</h2>
            <p className="text-blue-200 text-lg">Vertrauen Sie auf unsere Erfahrung</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <stat.icon className="h-10 w-10 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-200 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                Sehen Sie uns in Aktion
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                Professionell und mit Herz bei der Sache
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Überzeugen Sie sich selbst von unserer Arbeitsweise. Unser erfahrenes Team 
                arbeitet schnell, sauber und mit größter Sorgfalt.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                  <span className="text-gray-700">Über 10 Jahre Erfahrung</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                  <span className="text-gray-700">Geschultes Fachpersonal</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <span className="text-gray-700">Modernste Ausrüstung</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Nikolai Transport Team bei der Arbeit"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <button className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200">
                    <div className="w-0 h-0 border-l-[16px] border-l-blue-600 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
                  </button>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-xl shadow-lg">
                <p className="text-sm font-medium">Video: Unser Team in Aktion</p>
                <p className="text-xs opacity-90">2:30 Min</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Warum Nikolai Transport?
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Unsere Stärken
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Vertrauen Sie auf unsere Erfahrung und Professionalität
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className={`w-20 h-20 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <value.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Preview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Unser Team
            </div>
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              Die Menschen hinter Nikolai Transport
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Lernen Sie unser erfahrenes und freundliches Team kennen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Nikolai Müller - Geschäftsführer"
                  className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg group-hover:scale-110 transition-transform duration-200"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Star className="h-4 w-4 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Nikolai Müller</h3>
              <p className="text-blue-600 mb-3 font-medium">Geschäftsführer & Gründer</p>
              <p className="text-gray-600 text-sm">
                15+ Jahre Erfahrung in der Branche
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Maria Schmidt - Teamleiterin"
                  className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg group-hover:scale-110 transition-transform duration-200"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Maria Schmidt</h3>
              <p className="text-green-600 mb-3 font-medium">Teamleiterin Reinigung</p>
              <p className="text-gray-600 text-sm">
                Spezialistin für Hygiene & Sauberkeit
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Thomas Weber - Transport Spezialist"
                  className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg group-hover:scale-110 transition-transform duration-200"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Truck className="h-4 w-4 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Thomas Weber</h3>
              <p className="text-orange-600 mb-3 font-medium">Transport & Umzug</p>
              <p className="text-gray-600 text-sm">
                Experte für sichere Transporte
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white" asChild>
              <Link to="/ueber-uns">Unser komplettes Team kennenlernen</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Bereit für Ihren nächsten Auftrag?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Kontaktieren Sie uns noch heute für ein unverbindliches Angebot. 
            Wir freuen uns darauf, Ihnen zu helfen und Ihre Erwartungen zu übertreffen!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg shadow-lg" asChild>
              <Link to="/kontakt">Jetzt Kontakt aufnehmen</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white hover:text-gray-900 px-8 py-4 text-lg" asChild>
              <a href="tel:+49123456789">Sofort anrufen: +49 123 456 789</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;