import { Link } from 'react-router-dom';

const Logo = ({ monochrome = false }: { monochrome?: boolean }) => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={monochrome ? "text-white" : "text-primary"}
      >
        <path
          d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 7L12 12L22 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 22V12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={`text-2xl font-bold ${monochrome ? 'text-white' : 'text-gray-900'}`}>
        Stotta
      </span>
    </Link>
  );
};

export default Logo;