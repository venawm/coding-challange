import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/protected-route";
import Layout from "./components/dashboard/layout";
import UsersPage from "./pages/Users";
import UserDetailPage from "./pages/UserDetail";
import { PreferencesProvider } from "./context/UserPreferencesContext";
import FavoritesPage from "./pages/Favourites";
import ThemeSwitcher from "./components/ui/theme-switch";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeSwitcher />
        <PreferencesProvider>
          <Routes>
            {/* Public */}
            <Route path="/" element={<LoginPage />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="favourites" element={<FavoritesPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="users/:userId" element={<UserDetailPage />} />
            </Route>
          </Routes>
        </PreferencesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
