import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";

import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

import Dashboard from "../pages/dashboard/Dashboard";
import MyTasks from "../pages/dashboard/MyTasks";

import AdminTasks from "../pages/admin/AdminTasks";
import Users from "../pages/admin/Users";
import TaskMonitoring from "../pages/admin/TaskMonitoring";
import ActivityLogs from "../pages/admin/ActivityLogs";

import ProtectedRoute from "../components/common/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public */}
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <MyTasks />
          </ProtectedRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute adminOnly>
            <Users />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/tasks"
        element={
          <ProtectedRoute adminOnly>
            <AdminTasks />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/monitoring"
        element={
          <ProtectedRoute adminOnly>
            <TaskMonitoring />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/logs"
        element={
          <ProtectedRoute adminOnly>
            <ActivityLogs />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default AppRoutes;