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
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/dashboard/users"
              element={
                <ProtectedRoute>
                  <Layout>
                    <UsersPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/favourites"
              element={
                <ProtectedRoute>
                  <Layout>
                    <FavoritesPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/users/:userId"
              element={
                <ProtectedRoute>
                  <Layout>
                    <UserDetailPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </PreferencesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
