import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
  price: string;
  popular?: boolean;
}

const ServiceCard = ({ icon: Icon, title, description, features, imageUrl, price, popular }: ServiceCardProps) => {
  return (
    <Card className={`h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group ${popular ? 'ring-2 ring-orange-500 relative' : ''}`}>
      {popular && (
        <Badge className="absolute top-4 right-4 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          Beliebt
        </Badge>
      )}
      
      <div className="relative overflow-hidden">
        <img 
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>

      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl mb-2">{title}</CardTitle>
            <CardDescription className="text-gray-600">{description}</CardDescription>
          </div>
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            {price}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex-shrink-0"></div>
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          className={`w-full transition-all duration-200 ${
            popular 
              ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white' 
              : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
          }`}
        >
          Mehr erfahren
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;