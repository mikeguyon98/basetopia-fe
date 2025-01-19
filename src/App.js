import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import UserProfile from "./components/UserProfile";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useAuth } from "./utils/useAuth";

function App() {
  const { user, loading } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-black text-white bg-grid bg-grid-white/[0.02]">
        <div className="p-4 relative">
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
      </div>
    </Router>
  );
}

export default App;