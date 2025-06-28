// Am Anfang der Datei den LoginButton importieren
import LoginButton from '@/components/LoginButton';

// In der Header-Komponente (Desktop-Navigation) ersetzen:
// Vorher:
{/* <Button asChild>
  <Link to="/kontakt">Jetzt anfragen</Link>
</Button> */}

// Nachher:
<div className="flex items-center gap-2">
  <LoginButton />
  <Button asChild>
    <Link to="/kontakt">Jetzt anfragen</Link>
  </Button>
</div>

// In der mobilen Navigation ersetzen:
// Vorher:
{/* <Button asChild className="w-fit">
  <Link to="/kontakt" onClick={() => setIsMenuOpen(false)}>
    Jetzt anfragen
  </Link>
</Button> */}

// Nachher:
<div className="flex flex-col gap-2">
  <LoginButton onClick={() => setIsMenuOpen(false)} />
  <Button asChild className="w-fit">
    <Link to="/kontakt" onClick={() => setIsMenuOpen(false)}>
      Jetzt anfragen
    </Link>
  </Button>
</div>