import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { UserPlus, Gift, CheckCircle, DollarSign, Users, MessageSquare } from 'lucide-react';
import { ReferralForm } from '@/components/ReferralForm';
import { useMedia } from '@/hooks/useMedia';

const Empfehlungsprogramm = () => {
  const { media: bannerImage } = useMedia({ title: 'Empfehlungsprogramm Banner', pageContext: 'empfehlungsprogramm' });

  const howItWorksSteps = [
    {
      icon: UserPlus,
      title: '1. Empfehlen Sie uns weiter',
      description: 'Erzählen Sie Freunden, Familie oder Geschäftspartnern von Stota Transport und unseren erstklassigen Dienstleistungen.'
    },
    {
      icon: CheckCircle,
      title: '2. Ihr Kontakt bucht',
      description: 'Sobald Ihr empfohlener Kontakt einen Service bei uns bucht und dieser abgeschlossen ist, wird die Empfehlung registriert.'
    },
    {
      icon: Gift,
      title: '3. Belohnung erhalten',
      description: 'Sie und Ihr empfohlener Kontakt erhalten eine attraktive Belohnung als Dankeschön für das Vertrauen.'
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: 'Für Sie: Attraktive Prämie',
      description: 'Erhalten Sie eine Gutschrift auf Ihren nächsten Service oder eine direkte Auszahlung für jede erfolgreiche Empfehlung.'
    },
    {
      icon: Users,
      title: 'Für Ihre Freunde: Startvorteil',
      description: 'Ihre Freunde profitieren von einem exklusiven Rabatt auf ihren ersten Service bei Stota Transport.'
    },
    {
      icon: MessageSquare,
      title: 'Win-Win-Situation',
      description: 'Sie helfen Ihren Kontakten, einen zuverlässigen Partner zu finden, und werden dafür belohnt – eine klassische Win-Win-Situation!'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section 
        className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              🤝 Empfehlen & Belohnt werden
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Unser Empfehlungsprogramm
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Teilen Sie Ihre positiven Erfahrungen mit Stota Transport und profitieren Sie gemeinsam mit Ihren Freunden!
            </motion.p>
          </div>
        </div>
      </section>

      {/* Referral Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <ReferralForm />
          </motion.div>
        </div>
      </section>

      {/* Banner Image Section */}
      {bannerImage && (
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <img src={bannerImage.url} alt="Empfehlungsprogramm Banner" className="rounded-lg shadow-lg w-full object-cover" style={{maxHeight: '400px'}} />
            </motion.div>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              💡 So funktioniert's
            </motion.div>
            <motion.h2 
              className="text-4xl font-bold mb-6 text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Einfach weiterempfehlen, doppelt profitieren
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              In nur drei einfachen Schritten zu Ihrer Belohnung.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
              >
                <Card className="text-center h-full hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div 
              className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              🎁 Ihre Vorteile
            </motion.div>
            <motion.h2 
              className="text-4xl font-bold mb-6 text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Warum sich Empfehlen lohnt
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Wir belohnen Ihr Vertrauen und Ihre Unterstützung.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
              >
                <Card className="text-center h-full hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Empfehlungsprogramm;