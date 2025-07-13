import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MediaUploadSlot } from "@/components/admin/MediaUploadSlot";
import { FileImage, Loader2 } from "lucide-react";
import { useAllMedia } from "@/hooks/useAllMedia";

const mediaSlots = {
  startseite: [
    { title: "Hero Background", description: "Großes Hintergrundbild auf der Startseite.", type: "image" as const },
    { title: "Referral Program Teaser", description: "Bild im Abschnitt 'Empfehlungsprogramm' auf der Startseite.", type: "image" as const },
    { title: "About Us Teaser", description: "Bild im Abschnitt 'Über Uns' auf der Startseite.", type: "image" as const },
  ],
  ueberUns: [
    { title: "About Us Main Image", description: "Hauptbild oben auf der 'Über Uns'-Seite.", type: "image" as const },
    { title: "Nicolae Bogdanel Turcitu Profile", description: "Profilbild von Nicolae Bogdanel Turcitu.", type: "image" as const },
    { title: "Maria Schmidt Profile", description: "Profilbild von Maria Schmidt.", type: "image" as const },
    { title: "Thomas Weber Profile", description: "Profilbild von Thomas Weber.", type: "image" as const },
  ],
  galerie: [
    { title: "Office Cleaning Before", description: "Vorher-Bild der Büroreinigung.", type: "image" as const },
    { title: "Office Cleaning After", description: "Nachher-Bild der Büroreinigung.", type: "image" as const },
    { title: "Kitchen Cleaning Before", description: "Vorher-Bild der Küchenreinigung.", type: "image" as const },
    { title: "Kitchen Cleaning After", description: "Nachher-Bild der Küchenreinigung.", type: "image" as const },
    { title: "Office Cleaning Timelapse", description: "Zeitraffer-Video der Büroreinigung.", type: "video" as const },
    { title: "Family Move Documented", description: "Video-Dokumentation eines Familienumzugs.", type: "video" as const },
  ],
  weitere: [
    { title: "Leistungen Hero Background", description: "Hintergrundbild für die Haupt-Leistungsseite.", type: "image" as const },
    { title: "Reinigung Hero Background", description: "Hintergrundbild für die Reinigungs-Leistungsseite.", type: "image" as const },
    { title: "GartenLandschaftsbau Hero Background", description: "Hintergrundbild für die Garten- & Landschaftsbau-Leistungsseite.", type: "image" as const },
    { title: "Entsorgung Hero Background", description: "Hintergrundbild für die Entsorgungs-Leistungsseite.", type: "image" as const },
    { title: "Transporte Hero Background", description: "Hintergrundbild für die Transporte-Leistungsseite.", type: "image" as const },
    { title: "Empfehlungsprogramm Hero Background", description: "Hintergrundbild für die Empfehlungsseite.", type: "image" as const },
    { title: "Kontakt Hero Background", description: "Hintergrundbild für die Kontaktseite.", type: "image" as const },
  ]
};

const Seiteninhalte = () => {
  const { media: allMediaItems, loading, error, mutate: refetchAllMedia } = useAllMedia();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Fehler beim Laden der Medien: {error}</p>;
  }

  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center gap-3">
        <FileImage className="h-8 w-8 text-blue-400" />
        <h1 className="text-3xl font-bold">Seiteninhalte verwalten</h1>
      </div>
      <p className="text-gray-300">
        Hier können Sie die Bilder und Videos für die verschiedenen Bereiche Ihrer Webseite zentral verwalten. 
        Laden Sie neue Medien hoch, um bestehende zu ersetzen.
      </p>

      <Accordion type="single" collapsible className="w-full" defaultValue="startseite">
        <AccordionItem value="startseite" className="border-gray-600">
          <AccordionTrigger className="text-xl hover:no-underline">Startseite</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {mediaSlots.startseite.map(slot => (
              <MediaUploadSlot 
                key={slot.title} 
                {...slot} 
                pageContext="Startseite" 
                allMediaItems={allMediaItems}
                refetchAllMedia={refetchAllMedia}
              />
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ueber-uns" className="border-gray-600">
          <AccordionTrigger className="text-xl hover:no-underline">Über Uns</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {mediaSlots.ueberUns.map(slot => (
              <MediaUploadSlot 
                key={slot.title} 
                {...slot} 
                pageContext="Über Uns" 
                allMediaItems={allMediaItems}
                refetchAllMedia={refetchAllMedia}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="galerie" className="border-gray-600">
          <AccordionTrigger className="text-xl hover:no-underline">Galerie (Spezifische Inhalte)</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {mediaSlots.galerie.map(slot => (
              <MediaUploadSlot 
                key={slot.title} 
                {...slot} 
                pageContext="Galerie" 
                allMediaItems={allMediaItems}
                refetchAllMedia={refetchAllMedia}
              />
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="weitere" className="border-gray-600">
          <AccordionTrigger className="text-xl hover:no-underline">Weitere Seiten (Hero-Bilder)</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {mediaSlots.weitere.map(slot => (
              <MediaUploadSlot 
                key={slot.title} 
                {...slot} 
                pageContext="Hero-Sektionen" 
                allMediaItems={allMediaItems}
                refetchAllMedia={refetchAllMedia}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="mt-8 p-6 bg-gray-700 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Allgemeine Galerie-Medien</h2>
        <p className="text-gray-300 mb-4">
          Medien, die hier hochgeladen werden, erscheinen in der allgemeinen Galerie-Ansicht. 
          Diese Funktion wird in Kürze überarbeitet, um das Hinzufügen und Verwalten zu vereinfachen.
        </p>
        <p className="text-yellow-400 text-sm">Hinweis: Die allgemeine Galerie-Verwaltung befindet sich in Entwicklung.</p>
      </div>
    </div>
  );
};

export default Seiteninhalte;