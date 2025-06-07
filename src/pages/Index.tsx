import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Truck, Sparkles, Home, Shield, Clock, Award, Heart, Zap, ArrowRight, CheckCircle, Users, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';

const Index = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [serviceRef, serviceInView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const services = [
    {
      icon: Sparkles,
      title: 'Premium Reinigung',
      description: 'Professionelle Reinigung für höchste Ansprüche',
      features: ['Büroreinigung', 'Grundreinigung', 'Fensterreinigung'],
      price: 'Ab 25€/h',
      popular: true,
      imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      icon: Truck,
      title: 'Express Transport',
      description: 'Schnell und sicher von A nach B',
      features: ['24/7 Verfügbarkeit', 'Sperrguttransport', 'Kurierdienst'],
      price: 'Ab 45€/Fahrt',
      imageUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      icon: Home,
      title: 'Umzugsservice',
      description: 'Stressfreie Umzüge mit Rundum-Service',
      features: ['Möbelmontage', 'Verpackung', 'Transport'],
      price: 'Ab 35€/h',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ];

  const stats = [
    { value: '500+', label: 'Zufriedene Kunden', icon: Users },
    { value: '4.9/5', label: 'Bewertungen', icon: Star },
    { value: '24/7', label: 'Erreichbarkeit', icon: Clock },
    { value: '10+', label: 'Jahre Erfahrung', icon: Award }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Zuverlässigkeit',
      description: 'Pünktlichkeit und Verlässlichkeit sind unsere Grundpfeiler'
    },
    {
      icon: Heart,
      title: 'Menschlichkeit',
      description: 'Wir behandeln jeden Kunden mit Respekt und Empathie'
    },
    {
      icon: Zap,
      title: 'Effizienz',
      description: 'Schnelle und qualitativ hochwertige Dienstleistungen'
    },
    {
      icon: Award,
      title: 'Qualität',
      description: 'Höchste Standards bei allen unseren Arbeiten'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <Hero />

      {/* Services Section */}
      <section ref={serviceRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Unsere Leistungen</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professionelle Dienstleistungen für Privat- und Geschäftskunden
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Unsere Werte</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Was uns antreibt und von anderen unterscheidet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Bereit für Ihren Service?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie uns für ein kostenloses und unverbindliches Angebot
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
            <Link to="/kontakt">Jetzt anfragen</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;