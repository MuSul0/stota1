import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError, showLoading, dismissToast } from '@/utils/toast';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Gift, CheckCircle, DollarSign, Users, MessageSquare, Send } from 'lucide-react';

const referralSchema = z.object({
  referrerName: z.string().min(2, { message: "Ihr Name ist erforderlich." }),
  referrerEmail: z.string().email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein." }),
  referredName: z.string().min(2, { message: "Der Name der empfohlenen Person ist erforderlich." }),
  referredEmail: z.string().email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse für die empfohlene Person ein." }),
  referredPhone: z.string().optional(),
  message: z.string().max(500, { message: "Die Nachricht darf maximal 500 Zeichen lang sein." }).optional(),
});

const Empfehlungsprogramm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof referralSchema>>({
    resolver: zodResolver(referralSchema),
    defaultValues: {
      referrerName: "",
      referrerEmail: "",
      referredName: "",
      referredEmail: "",
      referredPhone: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof referralSchema>) {
    setIsSubmitting(true);
    const toastId = showLoading("Empfehlung wird gesendet...");

    const { error } = await supabase.from('referrals').insert({
      referrer_name: values.referrerName,
      referrer_email: values.referrerEmail,
      referred_name: values.referredName,
      referred_email: values.referredEmail,
      referred_phone: values.referredPhone,
      message: values.message,
    });

    dismissToast(toastId);
    setIsSubmitting(false);

    if (error) {
      showError(`Fehler: ${error.message}`);
    } else {
      showSuccess("Vielen Dank! Ihre Empfehlung wurde erfolgreich gesendet.");
      form.reset();
    }
  }

  const howItWorksSteps = [
    {
      icon: UserPlus,
      title: '1. Empfehlen Sie uns weiter',
      description: 'Nutzen Sie das Formular unten oder erzählen Sie Freunden von unseren erstklassigen Dienstleistungen.'
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
      description: 'Ihre Freunde profitieren von einem exklusiven Rabatt auf ihren ersten Service bei Stotta Transport.'
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
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('')] bg-cover bg-center opacity-20"></div>
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
              Teilen Sie Ihre positiven Erfahrungen mit Stotta Transport und profitieren Sie gemeinsam mit Ihren Freunden!
            </motion.p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
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

      {/* Referral Form Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <Card className="max-w-4xl mx-auto shadow-xl">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-3xl font-bold">Jetzt direkt empfehlen</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Füllen Sie das Formular aus, um einen Freund oder Kollegen zu empfehlen.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-700 border-b pb-2">Ihre Daten (Empfehler)</h4>
                        <FormField
                          control={form.control}
                          name="referrerName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ihr Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Max Mustermann" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="referrerEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ihre E-Mail-Adresse</FormLabel>
                              <FormControl>
                                <Input placeholder="max.mustermann@email.de" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-700 border-b pb-2">Daten des Empfohlenen</h4>
                        <FormField
                          control={form.control}
                          name="referredName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name des Kontakts</FormLabel>
                              <FormControl>
                                <Input placeholder="Erika Musterfrau" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="referredEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>E-Mail des Kontakts</FormLabel>
                              <FormControl>
                                <Input placeholder="erika.musterfrau@email.de" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Persönliche Nachricht (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="z.B. 'Hallo, ich habe Stotta Transport für meinen Umzug genutzt und war sehr zufrieden. Vielleicht ist das auch etwas für dich!'"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="text-center">
                      <Button type="submit" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? 'Wird gesendet...' : 'Empfehlung absenden'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Häufig gestellte Fragen</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Wie kann ich jemanden empfehlen?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Ganz einfach! Nutzen Sie das Formular oben auf dieser Seite. Alternativ kann Ihr empfohlener Kontakt bei seiner Anfrage oder Buchung auch einfach Ihren Namen als Empfehlungsgeber angeben.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Wann erhalte ich meine Belohnung?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Die Belohnung wird ausgezahlt oder gutgeschrieben, sobald der von Ihnen empfohlene Service vollständig abgeschlossen und bezahlt wurde.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Gibt es Einschränkungen?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Das Empfehlungsprogramm gilt für Neukunden. Die genauen Bedingungen der Prämie können variieren und werden Ihnen bei der Empfehlung mitgeteilt.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Empfehlungsprogramm;