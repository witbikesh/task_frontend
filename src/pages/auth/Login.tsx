import React from "react";
import { Button, Input, WelcomeSide } from "../../components/ui";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex bg-indigo-600 p-8">
          <WelcomeSide />
        </div>

        <div className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold">Sign in to your account</h1>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded" />
                <span className="text-gray-600">Remember me</span>
              </label>

              <a href="#" className="text-indigo-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            <Button type="submit">Sign In</Button>
          </form>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button variant="outline">Google</Button>
            <Button variant="outline">GitHub</Button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{" "}
            <a href="#" className="text-indigo-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
