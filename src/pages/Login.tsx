// ... bestehender Code

const handleAuthStateChange = async (event: string, session: any) => {
  if (event === 'SIGNED_IN') {
    const { data: userData } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (!userData) {
      toast.error('Ihr Konto wurde nicht gefunden');
      return;
    }

    // Rollenbasierte Weiterleitung
    switch(userData.role) {
      case 'admin':
        navigate('/adminportal');
        break;
      case 'mitarbeiter':
        navigate('/mitarbeiterportal');
        break;
      case 'kunde':
        navigate('/kundenportal');
        break;
      default:
        navigate('/');
    }

    toast.success('Erfolgreich angemeldet!');
  }
};

// ... restlicher Code