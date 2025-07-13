import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Impressum = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Impressum</h1>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Angaben gemäß § 5 TMG</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Stota Transport</h3>
                  <p>Inhaber: Nicolae Bogdanel Turcitu</p>
                  <p>Schalker Str. 143</p>
                  <p>45881 Gelsenkirchen</p>
                  <p>Deutschland</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kontakt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Telefon:</strong> +49 176 41171386</p>
                <p><strong>E-Mail:</strong> kontakt@info-stota.de</p>
                <p><strong>Website:</strong> www.stota.de</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Umsatzsteuer-ID</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
                <p><strong>DE123456789</strong></p>
                <p className="text-sm text-gray-500 mt-2">Bitte hier Ihre korrekte USt-IdNr. eintragen, falls vorhanden.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Berufsbezeichnung und berufsrechtliche Regelungen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Berufsbezeichnung:</strong> Dienstleistungsunternehmen (Verlegung von Glasfaserleitungen, Garten- und Landschaftsbau, Kleintransporte)</p>
                <p><strong>Zuständige Aufsichtsbehörde:</strong> Stadt Gelsenkirchen, Der Oberbürgermeister, Referat Öffentliche Sicherheit und Ordnung</p>
                <p><strong>Verliehen durch:</strong> Deutschland</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>EU-Streitschlichtung</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                  <a href="https://ec.europa.eu/consumers/odr/" className="text-blue-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                    https://ec.europa.eu/consumers/odr/
                  </a>
                </p>
                <p className="mt-2">Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verbraucherstreitbeilegung/Universalschlichtungsstelle</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Haftung für Inhalte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                  nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
                  Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte 
                  fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine 
                  rechtswidrige Tätigkeit hinweisen.
                </p>
                <p>
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den 
                  allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch 
                  erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei 
                  Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Haftung für Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
                  Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                  Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
                  Seiten verantwortlich.
                </p>
                <p>
                  Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße 
                  überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. 
                  Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete 
                  Anhaltspunkte einer Rechtsverletzung nicht zumutbar.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Urheberrecht</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                  dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
                  der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
                  Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
                <p>
                  Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch 
                  gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden 
                  die Urheberrechte Dritter als solche 
                  gekennzeichnet.
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

export default Impressum;