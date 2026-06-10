import { Routes, Route } from "react-router-dom";

import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import AdminTasks from "../pages/admin/AdminTasks";
import MyTasks from "../pages/dashboard/MyTasks";
import Users from "../pages/admin/Users";
import TaskMonitoring from "../pages/admin/TaskMonitoring";
import ActivityLogs from "../pages/admin/ActivityLogs";
import ProtectedRoute from "../components/common/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
  path="/register"
  element={<Register />}
/>

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
  path="/admin/tasks"
  element={<AdminTasks />}
/>

      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <MyTasks />
          </ProtectedRoute>
        }
      />

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
