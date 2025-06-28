// ... (vorheriger Code bleibt gleich)

const handleAuthStateChange = async (event: string, session: any) => {
  if (event === 'SIGNED_IN') {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user?.email?.endsWith('@nikolai-transport.de')) {
      // Mitarbeiter Login
      if (user?.user_metadata?.role === 'employee') {
        toast.success('Erfolgreich als Mitarbeiter angemeldet!');
        navigate('/mitarbeiterportal');
      } 
      // Admin Login
      else {
        navigate('/admin');
      }
    } else {
      // Customer Login
      toast.success('Erfolgreich angemeldet!');
      navigate('/kundenportal');
    }
  }
};

// ... (restlicher Code bleibt gleich)