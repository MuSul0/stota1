import { Heart, Shield, Clock, Award, Users, Target } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ParallaxSection from '@/components/ParallaxSection';
import { useMedia, MediaItem } from '@/hooks/useMedia';

const UeberUns = () => {
  // Hole alle Bilder mit pageContext "ueber-uns"
  const { media: ueberUnsBilder, loading, error } = useMedia({ pageContext: 'ueber-uns', type: 'image' });

  // Hilfsfunktion: Bild anhand des Titels finden
  const getBild = (titel: string) =>
    ueberUnsBilder.find((m: MediaItem) => m.title?.toLowerCase().includes(titel.toLowerCase()));

  const aboutUsMainImage = getBild('Hauptbild') || getBild('Main') || ueberUnsBilder[0];
  const nicolaeTurcituProfile = getBild('Nicolae') || getBild('Turcitu');
  const mariaSchmidtProfile = getBild('Maria');
  const thomasWeberProfile = getBild('Thomas');

  // ... (Rest wie gehabt, siehe vorherige Version) ...
  // (Der gesamte JSX-Code bleibt gleich wie in der letzten Version)
  // ... (siehe vorherige Antwort) ...
};

export default UeberUns;