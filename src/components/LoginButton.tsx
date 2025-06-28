import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginButton = () => {
  return (
    <Button asChild variant="outline" className="gap-2">
      <Link to="/login">
        <LogIn className="h-4 w-4" />
        Anmelden
      </Link>
    </Button>
  );
};

export default LoginButton;