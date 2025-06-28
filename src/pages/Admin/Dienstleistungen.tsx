import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle } from 'lucide-react';

const services = [
  { id: 1, name: 'Gebäudereinigung', price: '25€/h', category: 'Reinigung' },
  { id: 2, name: 'Umzugshilfe', price: '35€/h', category: 'Transport' },
  { id: 3, name: 'Möbelmontage', price: '45€/h', category: 'Service' }
];

export default function Dienstleistungen() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dienstleistungen</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Neue Dienstleistung
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Kategorie</TableHead>
              <TableHead>Preis</TableHead>
              <TableHead className="text-right">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell>{service.category}</TableCell>
                <TableCell>{service.price}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm">Bearbeiten</Button>
                  <Button variant="destructive" size="sm">Löschen</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}