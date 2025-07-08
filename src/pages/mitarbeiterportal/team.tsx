import { useSession } from '@/components/SessionProvider';
import { useNavigate } from 'react-router-dom';
// Header und Footer entfernt, da sie vom AdminLayout bereitgestellt werden
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar_url: string | null;
}

export default function Team() {
  const { session, user, loading } = useSession();
  const navigate = useNavigate();
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const subscriptionRef = useRef<any>(null);

  useEffect(() => {
    if (!loading) {
      if (!session || user?.user_metadata?.role !== 'mitarbeiter') {
        navigate('/login');
      } else {
        fetchTeam();
        setupRealtimeSubscription();
      }
    }
    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
        subscriptionRef.current = null;
      }
    };
  }, [session, user, loading, navigate]);

  const fetchTeam = async () => {
    setLoadingData(true);
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      toast.error('Fehler beim Laden des Teams');
      console.error(error);
    } else {
      setTeam(data || []);
    }
    setLoadingData(false);
  };

  const setupRealtimeSubscription = () => {
    if (subscriptionRef.current) {
      supabase.removeChannel(subscriptionRef.current);
      subscriptionRef.current = null;
    }
    const channel = supabase
      .channel('public:team_members')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'team_members' }, () => {
        fetchTeam();
      })
      .subscribe();
    subscriptionRef.current = channel;
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Lade Team...</p>
      </div>
    );
  }

  if (!session || user?.user_metadata?.role !== 'mitarbeiter') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header entfernt */}
      <motion.main 
        className="flex-grow container mx-auto px-6 py-12 max-w-5xl space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold">Teamübersicht</h1>
        <p className="mb-6 text-gray-700">Lernen Sie Ihre Kollegen kennen und bleiben Sie vernetzt.</p>

        {team.length === 0 ? (
          <p className="text-gray-600">Keine Teammitglieder gefunden.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {team.map((member) => (
              <Card key={member.id} className="flex items-center space-x-4 p-4">
                <Avatar className="w-16 h-16">
                  {member.avatar_url ? (
                    <img src={member.avatar_url} alt={member.name} />
                  ) : (
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                  <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline text-sm">
                    {member.email}
                  </a>
                </div>
              </Card>
            ))}
          </div>
        )}
      </motion.main>
      {/* Footer entfernt */}
    </div>
  );
}