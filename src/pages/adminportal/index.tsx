import { useSession } from '@/components/SessionProvider';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart2, Users, Settings, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const { session, user, loading } = useSession();
  const navigate = useNavigate();

  // Redirect to login if not admin
  React.useEffect(() => {
    if (!loading) {
      if (!session || user?.user_metadata?.role !== 'admin') {
        navigate('/login');
      }
    }
  }, [session, user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Lade Admin-Dashboard...</p>
      </div>
    );
  }

  if (!session || user?.user_metadata?.role !== 'admin') {
    return null; // Während Navigation nichts rendern
  }

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
      title: 'Statistiken',
      description: 'Unternehmensstatistiken und Berichte',
      icon: BarChart2,
      buttonText: 'Statistiken anzeigen',
      buttonAction: () => navigate('/adminportal/dashboard'),
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
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <motion.main 
        className="flex-grow container mx-auto px-4 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold mb-10 text-gray-900 text-center">Adminportal</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map(({ title, description, icon: Icon, buttonText, buttonAction, gradientFrom, gradientTo }) => (
            <motion.div 
              key={title}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.12)' }}
              className="rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <Card className="h-full flex flex-col justify-between border-0 shadow-none">
                <CardContent className="flex flex-col items-center text-center p-8">
                  <div className={`w-16 h-16 mb-6 rounded-full bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center text-white shadow-lg`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-2xl font-semibold mb-2 text-gray-900">{title}</CardTitle>
                  <p className="text-gray-600 mb-6">{description}</p>
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
      </motion.main>
      <Footer />
    </div>
  );
}