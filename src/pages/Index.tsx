"use client";

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ParallaxSection from '@/components/ParallaxSection';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, Leaf, Sparkles, Home } from 'lucide-react';

const Index = () => {
  const serviceCategories = [
    {
      icon: Truck,
      title: 'Transporte',
      description: 'Sicherer und pünktlicher Transport Ihrer Güter – von empfindlichen Hightech-Waren bis zu kompletten Umzügen für Privat- und Firmenkunden.',
      link: '/leistungen/transporte',
      colorClass: 'from-blue-600 to-blue-800',
    },
    {
      icon: Leaf,
      title: 'Garten- & Landschaftsbau',
      description: 'Regelmäßige Gartenpflege, Rasen mähen, Heckenschnitt, Baumfällungen und Neugestaltung Ihrer Außenanlagen.',
      link: '/leistungen/garten-landschaftsbau',
      colorClass: 'from-orange-600 to-red-700',
    },
    {
      icon: Sparkles,
      title: 'Reinigung',
      description: 'Professionelle Reinigungsdienste für Privat- und Gewerbekunden – von Grundreinigung bis Fahrzeugaufbereitung.',
      link: '/leistungen/reinigung',
      colorClass: 'from-purple-600 to-indigo-800',
    },
    {
      icon: Home,
      title: 'Entsorgung',
      description: 'Fachgerechte Entsorgung von Möbeln, Elektrogeräten, Gartenabfällen und Renovierungsresten – schnell und zuverlässig.',
      link: '/leistungen/entsorgung',
      colorClass: 'from-green-600 to-emerald-800',
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <Header />
      <Hero />

      {/* Verbesserter Services Abschnitt */}
      <ParallaxSection speed={0.1}>
        <section className="py-20 bg-white rounded-3xl shadow-lg mx-6 md:mx-12 lg:mx-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <motion.h2 
                className="text-4xl font-extrabold mb-4 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Unsere Top-Leistungen
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Professionelle Dienstleistungen für Privat- und Geschäftskunden – zuverlässig, kompetent und individuell auf Sie zugeschnitten.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {serviceCategories.map(({ icon: Icon, title, description, link, colorClass }, index) => (
                <motion.div
                  key={title}
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <Card className="h-full rounded-3xl shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col border border-transparent group-hover:border-blue-400">
                    <CardHeader className={`flex items-center space-x-4 pb-4 bg-gradient-to-br ${colorClass} rounded-t-3xl text-white`}>
                      <div className="w-14 h-14 flex items-center justify-center bg-white/20 rounded-full shadow-lg">
                        <Icon className="w-7 h-7" />
                      </div>
                      <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow text-gray-700 text-base leading-relaxed">
                      {description}
                    </CardContent>
                    <div className="p-6 pt-0">
                      <Button 
                        asChild 
                        className={`w-full bg-gradient-to-r ${colorClass} hover:from-opacity-90 hover:to-opacity-90 text-white rounded-xl shadow-md font-semibold text-lg transition-transform transform group-hover:scale-105`}
                      >
                        <Link to={link} aria-label={`Mehr erfahren über ${title}`}>
                          Mehr erfahren
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ParallaxSection>

      <Footer />
    </div>
  );
};

export default Index;