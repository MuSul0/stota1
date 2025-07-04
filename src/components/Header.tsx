import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import Logo from './Logo';

// Convert named export to default export
const Header = () => {
  const LoginButton = ({ onClick }: { onClick?: () => void }) => (
    <Button asChild variant="outline" className="gap-2">
      <Link to="/login" onClick={onClick}>
        <LogIn className="h-4 w-4" />
        Anmelden
      </Link>
    </Button>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <LoginButton />
        </div>
      </div>
    </header>
  );
};

export default Header;  // Changed from named export to default export