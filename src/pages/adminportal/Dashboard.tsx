import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart2, Users, Settings, FileText, Layers, Bell, Download, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Benutzerverwaltung',
      description: 'Verwalten Sie Benutzerkonten und Rollen',
      icon: Users,
      buttonText: 'Benutzer anzeigen',
      buttonAction: () => navigate('/adminportal/users'),
      gradientFrom: 'from-blue-600',
      gradientTo: 'to-purple-600',
    },
    {
      title: 'Analytics',
      description: 'Unternehmensstatistiken und Berichte',
      icon: BarChart2,
      buttonText: 'Analytics anzeigen',
      buttonAction: () => navigate('/adminportal/analytics'),
      gradientFrom: 'from-green-600',
      gradientTo: 'to-emerald-600',
    },
    {
      title: 'Rechnungen',
      description: 'Rechnungen verwalten und einsehen',
      icon: FileText,
      buttonText: 'Rechnungen verwalten',
      buttonAction: () => navigate('/adminportal/invoices'),
      gradientFrom: 'from-purple-600',
      gradientTo: 'to-indigo-600',
    },
    {
      title: 'Einstellungen',
      description: 'System- und Anwendungseinstellungen',
      icon: Settings,
      buttonText: 'Einstellungen konfigurieren',
      buttonAction: () => navigate('/adminportal/settings'),
      gradientFrom: 'from-orange-500',
      gradientTo: 'to-yellow-500',
    },
    {
      title: 'Services',
      description: 'Leistungen verwalten',
      icon: Layers,
      buttonText: 'Services verwalten',
      buttonAction: () => navigate('/adminportal/services'),
      gradientFrom: 'from-pink-600',
      gradientTo: 'to-red-600',
    },
    {
      title: 'Seiteninhalte',
      description: 'Bilder und Videos verwalten',
      icon: ImageIcon,
      buttonText: 'Inhalte verwalten',
      buttonAction: () => navigate('/adminportal/seiteninhalte'),
      gradientFrom: 'from-yellow-600',
      gradientTo: 'to-orange-600',
    },
    {
      title: 'Benachrichtigungen',
      description: 'Kundenanfragen und Nachrichten',
      icon: Bell,
      buttonText: 'Benachrichtigungen ansehen',
      buttonAction: () => navigate('/adminportal/notifications'),
      gradientFrom: 'from-cyan-600',
      gradientTo: 'to-blue-600',
    },
    {
      title: 'Berichte',
      description: 'Daten exportieren und auswerten',
      icon: Download,
      buttonText: 'Berichte exportieren',
      buttonAction: () => navigate('/adminportal/reports'),
      gradientFrom: 'from-teal-600',
      gradientTo: 'to-green-600',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-10 text-white text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map(({ title, description, icon: Icon, buttonText, buttonAction, gradientFrom, gradientTo }) => (
          <motion.div
            key={title}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.25)' }}
            className="rounded-xl bg-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Card className="h-full flex flex-col justify-between border-0 shadow-none bg-transparent text-white">
              <CardContent className="flex flex-col items-center text-center p-8">
                <div className={`w-16 h-16 mb-6 rounded-full bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center text-white shadow-lg`}>
                  <Icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl font-semibold mb-2">{title}</CardTitle>
                <p className="text-gray-300 mb-6">{description}</p>
                <Button
                  className={`w-full bg-gradient-to-r ${gradientFrom} ${gradientTo} hover:from-opacity-90 hover:to-opacity-90 text-white`}
                  onClick={buttonAction}
                >
                  {buttonText}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}