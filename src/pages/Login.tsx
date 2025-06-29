// ... (vorheriger Import-Block bleibt gleich)

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<'kunde' | 'mitarbeiter' | 'admin' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) throw error;

      // Überprüfen ob es sich um Admin handelt
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user?.email === 'muhamadsuleiman2@gmail.com') {
        await supabase.auth.updateUser({ data: { role: 'admin' } });
        navigate('/adminportal');
        toast.success('Admin-Login erfolgreich!');
      } else {
        await supabase.auth.signOut();
        toast.error('Zugang nur für autorisierte Administratoren');
      }
    } catch (error) {
      toast.error('Anmeldung fehlgeschlagen: Ungültige Anmeldedaten');
    }
  };

  // ... (restlicher Code bleibt gleich bis zum Admin-Formular)

  {selectedRole === 'admin' ? (
    <form onSubmit={handleAdminLogin}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
            placeholder="muhamadsuleiman2@gmail.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Passwort</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
            placeholder="MOsulcan1"
          />
        </div>
        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
          Als Admin anmelden
        </Button>
      </div>
    </form>
  ) : /* ... */}