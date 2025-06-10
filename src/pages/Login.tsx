// In der Login-Komponente
useEffect(() => {
  const checkSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      console.log('Session check:', session); // Debug log
      
      if (error) {
        console.error('Session error:', error);
        toast.error('Sitzungsfehler');
        return;
      }

      if (session) {
        console.log('User role check for:', session.user.email);
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error('Profile error:', profileError);
          throw profileError;
        }

        console.log('User role:', profile?.role);
        
        if (profile?.role === 'admin') {
          navigate('/admin');
        } else {
          await supabase.auth.signOut();
          toast.error('Keine Admin-Berechtigungen');
        }
      }
    } catch (error) {
      console.error('Check session failed:', error);
      toast.error('Systemfehler');
    } finally {
      setSessionChecked(true);
      setLoading(false);
    }
  };

  checkSession();
}, [navigate]);