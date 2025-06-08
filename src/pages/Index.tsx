import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Truck, Sparkles, Home, Shield, Clock, Award, Heart, Zap, ArrowRight, CheckCircle, Users, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Index = () => {
  // Animation Controls
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
      popular: true
    },
    {
      icon: Truck,
      title: 'Express Transport',
      description: 'Schnell und sicher von A nach B',
      features: ['24/7 Verfügbarkeit', 'Sperrguttransport', 'Kurierdienst'],
      price: 'Ab 45€/Fahrt'
    },
    {
      icon: Home,
      title: 'Umzugsservice',
      description: 'Stressfreie Umzüge mit Rundum-Service',
      features: ['Möbelmontage', 'Verpackung', 'Transport'],
      price: 'Ab 35€/h'
    }
  ];

  const stats = [
    { value: '500+', label: 'Zufriedene Kunden', icon: Users },
    { value: '4.9/5', label: 'Bewertungen', icon: Star },
    { value: '24/7', label: 'Erreichbarkeit', icon: Clock },
    { value: '10+', label: 'Jahre Erfahrung', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* All your JSX content remains exactly the same */}
      {/* ... */}
    </div>
  );
};

export default Index;