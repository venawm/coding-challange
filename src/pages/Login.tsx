import React, { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("Login attempt:", { username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-base-200">
      <div className="w-full max-w-md p-8 rounded-2xl bg-base-100 shadow">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-base-content mb-2">
            Sign In
          </h1>
          <p className="text-sm text-neutral">Welcome back</p>
        </div>

        {/* Form */}
        <div className="space-y-5">
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
            <button className="text-sm font-medium text-primary hover:underline">
              Forgot password?
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-2.5 rounded-lg font-medium bg-primary text-primary-content hover:brightness-110 transition"
          >
            Sign In
          </button>

          <div className="text-center text-sm pt-4 text-neutral">
            Don&apos;t have an account?{" "}
            <button className="font-medium text-primary hover:underline">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
