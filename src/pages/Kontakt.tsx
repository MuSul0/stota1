import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
// import { useMedia } from '@/hooks/useMedia'; // Nicht mehr benötigt

const Kontakt = () => {
  // const { media: heroBackground, loading: loadingHeroBackground } = useMedia({ title: 'Kontakt Hero Background' }); // Nicht mehr benötigt
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.service.trim() || !formData.message.trim()) {
      toast.error('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }

    setLoading(true);

    try {
      const name = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
      const { data, error } = await supabase
        .from('contact_requests')
        .insert([
          {
            name: name,
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            service: formData.service.trim(),
            message: formData.message.trim()
          }
        ]);

      if (error) {
        throw error;
      }

      // E-Mail-Benachrichtigung zur Warteschlange hinzufügen
      const emailSubject = `Neue Kontaktanfrage von ${name}`;
      const emailText = `
        Eine neue Kontaktanfrage wurde über die Webseite gesendet.

        Details:
        Name: ${name}
        E-Mail: ${formData.email.trim()}
        Telefon: ${formData.phone.trim()}
        Leistung: ${formData.service.trim()}
        Nachricht:
        ${formData.message.trim()}
      `;

      const { error: emailError } = await supabase.from('email_queue').insert({
        to_email: 'kontakt@info-stota.de',
        subject: emailSubject,
        text: emailText,
      });

      if (emailError) {
        console.error('Fehler beim Eintragen der E-Mail-Benachrichtigung:', emailError);
        toast.warning('Ihre Anfrage wurde gespeichert, aber die Benachrichtigung konnte nicht sofort versendet werden.');
      }


      toast.success("Ihre Nachricht wurde erfolgreich gesendet!", {
        description: "Wir melden uns schnellstmöglich bei Ihnen zurück.",
      });
      setFormData({ firstName: '', lastName: '', email: '', phone: '', service: '', message: '' });
    } catch (error: any) {
      toast.error('Fehler beim Senden der Nachricht: ' + error.message);
      console.error('Fehler beim Senden der Nachricht:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section 
        className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden"
        // style={{ backgroundImage: `url(${heroBackground?.url || 'https://placehold.co/1920x600/2563eb/ffffff?text=Kontakt'})`, backgroundSize: 'cover', backgroundPosition: 'center' }} // Hintergrundbild entfernt
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Kontaktieren Sie uns
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Haben Sie Fragen, benötigen Sie ein unverbindliches Angebot oder möchten Sie einen Termin vereinbaren? 
              Wir sind gerne für Sie da und freuen uns auf Ihre Nachricht.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl">Ihre Nachricht an uns</CardTitle>
                  <CardDescription>
                    Füllen Sie das Formular aus und wir melden uns schnellstmöglich bei Ihnen zurück.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Vorname *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required
                          placeholder="Ihr Vorname"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nachname *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required
                          placeholder="Ihr Nachname"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">E-Mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          placeholder="Ihre E-Mail-Adresse"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefon *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                          placeholder="Ihre Telefonnummer"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="service">Gewünschte Leistung *</Label>
                      <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Wählen Sie eine Leistung" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="transporte">Transporte</SelectItem>
                          <SelectItem value="garten-landschaftsbau">Garten- & Landschaftsbau</SelectItem>
                          <SelectItem value="reinigung">Reinigung</SelectItem>
                          <SelectItem value="entsorgung">Entsorgung</SelectItem>
                          <SelectItem value="sonstiges">Sonstiges</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Nachricht *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                        placeholder="Beschreiben Sie Ihr Anliegen..."
                        rows={5}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" disabled={loading}>
                      <Send className="mr-2 h-4 w-4" />
                      {loading ? 'Senden...' : 'Nachricht senden'}
                    </Button>

                    <p className="text-sm text-gray-600">
                      * Pflichtfelder. Ihre Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl">Direkter Kontakt</CardTitle>
                  <CardDescription>
                    Erreichen Sie uns schnell und unkompliziert über diese Kanäle.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Telefon</h3>
                      <p className="text-gray-700">+49 123 456 789</p>
                      <p className="text-sm text-gray-500">Mo-Fr: 7:00-18:00 Uhr</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">E-Mail</h3>
                      <p className="text-gray-700">kontakt@info-stota.de</p>
                      <p className="text-sm text-gray-500">Antwort innerhalb von 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Adresse</h3>
                      <p className="text-gray-700">
                        Schalker Str. 143<br />
                        45881 Gelsenkirchen<br />
                        Deutschland
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Öffnungszeiten</h3>
                      <div className="text-gray-700 text-sm space-y-1">
                        <p>Montag - Freitag: 7:00 - 18:00</p>
                        <p>Samstag: 8:00 - 16:00</p>
                        <p className="text-blue-600 font-medium">Notfall-Service: 24/7</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>WhatsApp</CardTitle>
                  <CardDescription>Schnelle Kommunikation über WhatsApp</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-green-500 hover:bg-green-600 text-white">
                    <a href="https://wa.me/49123456789" target="_blank" rel="noopener noreferrer">
                      WhatsApp Chat starten
                    </a>
                  </Button>
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4">
                    <a href="tel:+49123456789">Sofort anrufen</a>
                  </Button>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Unser Standort</CardTitle>
                  <CardDescription>Finden Sie uns auf der Karte</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center overflow-hidden">
                    {/* Hier könnte eine tatsächliche Google Maps Einbettung erfolgen */}
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.4700000000003!2d7.041111!3d51.511111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8e1f1f1f1f1f1%3A0x123456789abcdef!2sSchalker%20Str.%20143%2C%2045881%20Gelsenkirchen%2C%20Germany!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen={true} 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Google Maps Standort"
                    ></iframe>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Standort: Schalker Str. 143, 45881 Gelsenkirchen
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Kontakt;