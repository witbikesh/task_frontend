import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/dashboard/Dashboard";
import Register from "../pages/auth/Register";
import GuestRoute from "./GuestRoute";
import { TaskProvider } from "../context/TaskContext";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
        <Route
          path="/forget-password"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <TaskProvider>
                <Dashboard />
              </TaskProvider>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
