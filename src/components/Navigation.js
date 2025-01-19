import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import SignInButton from "./SignInButton";
import LogoutButton from "./LogoutButton";
import LanguageSelector from "./LanguageSelector";

function Navigation({ user }) {
  const { t } = useTranslation();
  
  return (
    <nav className="mb-4">
      <ul className="flex gap-4 items-center">
        <li>
          <Link to="/" className="hover:text-gray-300">
            <span className="font-bold text-lg">Basetopia</span>
          </Link>
        </li>
        <li className="ml-auto flex items-center gap-4">
          <LanguageSelector />
          {user && (
            <Link to="/profile" className="hover:text-gray-300 relative group">
              <UserCircleIcon className="h-6 w-6" />
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {t('profile')}
              </span>
            </Link>
          )}
          {user ? (
            <LogoutButton />
          ) : (
            <SignInButton />
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;