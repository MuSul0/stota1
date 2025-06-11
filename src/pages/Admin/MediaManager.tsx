// Zuerst sicherstellen, dass Badge importiert ist (am Anfang der Datei)
import { Badge } from '@/components/ui/badge';

// Dann die Tabelle korrigieren:
<TableCell>
  <Badge 
    variant={item.type === 'image' ? 'default' : 'secondary'}
    className={item.type === 'image' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-purple-100 text-purple-800'}
  >
    {item.type === 'image' ? 'Bild' : 'Video'}
  </Badge>
</TableCell>