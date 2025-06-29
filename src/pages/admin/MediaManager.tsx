import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Image, Video, Upload, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const MediaManager = () => {
  const [media, setMedia] = useState<{
    images: Array<{ id: string; url: string; title: string }>;
    videos: Array<{ id: string; url: string; title: string }>;
  }>({ images: [], videos: [] });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newMedia, setNewMedia] = useState({
    type: 'image',
    title: '',
    file: null as File | null
  });

  // ... (rest of your existing component logic)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Medienverwaltung</h1>
      
      {/* Your existing JSX */}
    </div>
  );
};

export default MediaManager;  // Wichtig: Default Export hinzufügen