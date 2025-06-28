import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Clock, ThumbsUp, Image, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function Mitarbeiterportal() {
  const navigate = useNavigate();
  const [hours, setHours] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [recommendation, setRecommendation] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
      }
    };
    checkSession();
  }, [navigate]);

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const fileExt = selectedFile.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `job-images/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      toast.success('Bild erfolgreich hochgeladen!');
      setSelectedFile(null);
    } catch (error) {
      toast.error('Fehler beim Hochladen des Bildes');
      console.error(error);
    }
  };

  const submitHours = async () => {
    if (!hours) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('work_hours')
        .insert([
          { 
            employee_id: user?.id,
            hours: parseFloat(hours),
            date: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      toast.success('Stunden erfolgreich eingetragen!');
      setHours('');
    } catch (error) {
      toast.error('Fehler beim Speichern der Stunden');
      console.error(error);
    }
  };

  const submitRecommendation = async () => {
    if (!recommendation) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('recommendations')
        .insert([
          { 
            employee_id: user?.id,
            text: recommendation,
            date: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      toast.success('Empfehlung erfolgreich abgegeben!');
      setRecommendation('');
    } catch (error) {
      toast.error('Fehler beim Speichern der Empfehlung');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Mitarbeiterportal</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bild Upload */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-6 w-6 text-blue-500" />
                Arbeitsbilder hochladen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                type="file" 
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              />
              <Button 
                onClick={handleFileUpload}
                disabled={!selectedFile}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                Hochladen
              </Button>
            </CardContent>
          </Card>

          {/* Zeiterfassung */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-6 w-6 text-green-500" />
                Zeiterfassung
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                type="number" 
                placeholder="Gearbeitete Stunden"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
              <Button 
                onClick={submitHours}
                disabled={!hours}
                className="w-full"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Stunden eintragen
              </Button>
            </CardContent>
          </Card>

          {/* Empfehlungen */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ThumbsUp className="h-6 w-6 text-purple-500" />
                Verbesserungsvorschläge
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                type="text" 
                placeholder="Ihre Empfehlung..."
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value)}
              />
              <Button 
                onClick={submitRecommendation}
                disabled={!recommendation}
                className="w-full"
              >
                <ThumbsUp className="mr-2 h-4 w-4" />
                Empfehlung senden
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}