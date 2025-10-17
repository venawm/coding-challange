import React, { useState } from "react";
import type { FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AlertCircle, Loader } from "lucide-react";
import Card from "../components/ui/card";

const LoginPage: React.FC = () => {
  const { login, user } = useAuth();
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  if (user) {
    return <Navigate to="/dashboard/users" replace />;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoggingIn(true);

    const result = await login(username, password);

    if (!result.success) {
      setError(result.message || "An unexpected error occurred.");
    }

    setIsLoggingIn(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-base-200">
      <div className="w-full max-w-md">
        <Card>
          <div className="bg-primary text-primary-content px-6 sm:px-8 py-8 sm:py-10 rounded-md">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Sign In</h1>
            <p className="text-primary-content/80 text-sm">
              Welcome back to User Portal
            </p>
          </div>

          {/* Form content */}
          <form
            onSubmit={handleSubmit}
            className="px-6 sm:px-8 py-8 sm:py-10 space-y-6"
          >
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-base-content">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-3 rounded border border-base-300 bg-base-100 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-base-content">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded border border-base-300 bg-base-100 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-base-300 text-primary focus:ring-primary cursor-pointer"
                />
                <span className="text-base-content group-hover:opacity-80 transition">
                  Remember me
                </span>
              </label>
              <a
                href="/"
                className="text-primary hover:opacity-80 font-medium transition"
              >
                Forgot password?
              </a>
            </div>

            {error && (
              <div className="flex items-start gap-3 p-4 rounded bg-error/10 border border-error/30">
                <AlertCircle className="w-5 h-5 text-error mt-0.5 flex-shrink-0" />
                <p className="text-sm text-error">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded font-semibold bg-primary text-primary-content hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center text-sm pt-2 border-t border-base-300">
              <span className="text-base-content/70">
                Don't have an account?{" "}
              </span>
              <button
                type="button"
                className="text-primary font-semibold hover:opacity-80 transition"
              >
                Sign up
              </button>
            </div>
          </form>
        </Card>

        <p className="text-center text-xs mt-6 px-4 text-base-content/50">
          Demo credentials: emilys / emilyspass
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
