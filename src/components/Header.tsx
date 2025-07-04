import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>
        <nav>
          <Link to="/login" className="px-4 py-2 rounded hover:bg-gray-100">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}