import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import UserProfile from "./components/UserProfile";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useAuth } from "./utils/useAuth";

function App() {
  const { user, loading } = useAuth();

  return (
    <Router>
      <div className="p-4">
        <Navigation user={user} />

        <main className="container mx-auto">
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute user={user} loading={loading}>
                  <UserProfile />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;