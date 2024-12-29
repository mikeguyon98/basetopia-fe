import { Link } from "react-router-dom";
import SignInButton from "./SignInButton";
import LogoutButton from "./LogoutButton";

function Navigation({ user }) {
  return (
    <nav className="mb-4">
      <ul className="flex gap-4 items-center">
        <li>
          <Link to="/" className="hover:underline">Home</Link>
        </li>
        {user && (
          <li>
            <Link to="/profile" className="hover:underline">Profile</Link>
          </li>
        )}
        <li className="ml-auto">
          {user ? (
            <div className="flex items-center gap-4">
              <span>Welcome, {user.email}!</span>
              <LogoutButton />
            </div>
          ) : (
            <SignInButton />
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;