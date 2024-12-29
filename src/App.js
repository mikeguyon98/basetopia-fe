import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SignInButton from "./components/SignInButton";
import LogoutButton from "./components/LogoutButton";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <LogoutButton />
        </div>
      ) : (
        <div>
          <p>Please sign in</p>
          <SignInButton />
        </div>
      )}
    </div>
  );
}

export default App;
