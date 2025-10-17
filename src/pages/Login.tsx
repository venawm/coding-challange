import React, { useState } from "react";
import type { FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const { login, user } = useAuth();
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // 3. If user is already logged in, redirect them to the profile page
  //   if (user) {
  //     return <Navigate to="/profile" replace />;
  //   }

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
    <div className="min-h-screen flex items-center justify-center p-6 bg-base-200">
      <div className="w-full max-w-md p-8 rounded-2xl bg-base-100 shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-base-content mb-2">
            Sign In
          </h1>
          <p className="text-sm text-neutral">Welcome back</p>
        </div>

        {/* Form with onSubmit handler */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-base-content">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-2.5 rounded-lg border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary transition"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-base-content">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2.5 rounded-lg border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary transition"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-primary"
              />
              <span className="text-neutral">Remember me</span>
            </label>
            <button
              type="button"
              className="text-sm font-medium text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* errors section */}
          {error && (
            <div role="alert" className="alert alert-error text-sm p-3">
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full py-2.5 rounded-lg font-medium bg-primary text-primary-content hover:brightness-110 transition disabled:opacity-50"
          >
            {isLoggingIn ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Sign Up Link */}
          <div className="text-center text-sm pt-4 text-neutral">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
