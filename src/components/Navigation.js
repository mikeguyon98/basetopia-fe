import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SignInButton from "./SignInButton";
import LogoutButton from "./LogoutButton";
import LanguageSelector from "./LanguageSelector";

function Navigation({ user }) {
  const { t } = useTranslation();
  
  return (
    <nav className="mb-4">
      <ul className="flex gap-4 items-center">
        <li>
          <Link to="/" className="hover:underline">{t('home')}</Link>
        </li>
        {user && (
          <li>
            <Link to="/profile" className="hover:underline">{t('profile')}</Link>
          </li>
        )}
        <li className="ml-auto flex items-center gap-4">
          <LanguageSelector />
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