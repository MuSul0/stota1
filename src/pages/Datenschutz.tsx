import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Datenschutz = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Datenschutzerklärung</h1>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Datenschutz auf einen Blick</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold">Allgemeine Hinweise</h3>
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
                  personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene 
                  Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                </p>
                
                <h3 className="font-semibold">Datenerfassung auf dieser Website</h3>
                <p>
                  <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. 
                  Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Hosting und Content Delivery Networks (CDN)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold">Externes Hosting</h3>
                <p>
                  Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die 
                  personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den 
                  Servern des Hosters gespeichert.
                </p>
                <p>
                  Das Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen 
                  und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, 
                  schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen 
                  professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Allgemeine Hinweise und Pflichtinformationen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold">Datenschutz</h3>
                <p>
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. 
                  Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der 
                  gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                </p>
                
                <h3 className="font-semibold">Hinweis zur verantwortlichen Stelle</h3>
                <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                <div className="bg-gray-50 p-4 rounded">
                  <p>Stotta Transport<br />
                  Stotta Müller<br />
                  Musterstraße 123<br />
                  12345 Musterstadt</p>
                  <p className="mt-2">
                  Telefon: +49 123 456 789<br />
                  E-Mail: info@stotta-transport.de</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Datenerfassung auf dieser Website</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold">Kontaktformular</h3>
                <p>
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus 
                  dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks 
                  Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                </p>
                <p>
                  Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, 
                  sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur 
                  Durchführung vorvertraglicher Maßnahmen erforderlich ist.
                </p>
                
                <h3 className="font-semibold">Anfrage per E-Mail, Telefon oder Telefax</h3>
                <p>
                  Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage 
                  inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum 
                  Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Ihre Rechte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Sie haben folgende Rechte:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Recht auf Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten</li>
                  <li>Recht auf Berichtigung unrichtiger oder unvollständiger Daten</li>
                  <li>Recht auf Löschung Ihrer bei uns gespeicherten Daten</li>
                  <li>Recht auf Einschränkung der Datenverarbeitung</li>
                  <li>Recht auf Datenübertragbarkeit</li>
                  <li>Widerspruchsrecht gegen die Verarbeitung Ihrer Daten</li>
                  <li>Recht auf Beschwerde bei einer Aufsichtsbehörde</li>
                </ul>
                
                <h3 className="font-semibold">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
                <p>
                  Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung 
                  möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. 
                  Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom 
                  Widerruf unberührt.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. SSL- bzw. TLS-Verschlüsselung</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung 
                  vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an 
                  uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine 
                  verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers 
                  von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Speicherdauer</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer 
                  genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck 
                  für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen 
                  geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden 
                  Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für 
                  die Speicherung Ihrer personenbezogenen Daten haben.
                </p>
              </CardContent>
            </Card>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Kontakt bei Datenschutzfragen</h3>
              <p>
                Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:
              </p>
              <p className="mt-2">
                <strong>E-Mail:</strong> datenschutz@stotta-transport.de<br />
                <strong>Telefon:</strong> +49 123 456 789
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Datenschutz;