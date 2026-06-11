import {
  FiGrid,
  FiUsers,
  FiClipboard,
  FiActivity,
  FiLogOut,
} from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

   const handleLogout = async () => {
    try {
      await API.post("/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <div className="w-[280px] min-h-screen bg-[#0f172a] border-r border-slate-800 p-7 flex flex-col flex-shrink-0">
      {/* Logo */}
      <h1 className="text-4xl font-black text-white mb-12">TaskFlow</h1>

      {/* Menu */}
      <div className="flex flex-col gap-3 flex-1">
        <Link
          className="flex items-center gap-4 bg-slate-800 text-white p-4 rounded-2xl"
          to="/dashboard"
        >
          <FiGrid size={20} />
          Dashboard
        </Link>

        <Link
          className="flex items-center gap-4 hover:bg-slate-800 text-slate-300 p-4 rounded-2xl transition"
          to="/tasks"
        >
          <FiClipboard size={20} />
          Tasks
        </Link>

        {user?.role === "Admin" && (
          <>
            <Link
              className="flex items-center gap-4 hover:bg-slate-800 text-slate-300 p-4 rounded-2xl transition"
              to="/admin/users"
            >
              <FiUsers size={20} />
              Users
            </Link>

            <Link
              className="flex items-center gap-4 hover:bg-slate-800 text-slate-300 p-4 rounded-2xl transition"
              to="/admin/logs"
            >
              <FiActivity size={20} />
              Activity
            </Link>
            <Link
              className="flex items-center gap-4 hover:bg-slate-800 text-slate-300 p-4 rounded-2xl transition"
              to="/admin/tasks"
            >
              <FiClipboard />
              All Tasks
            </Link>
          </>
        )}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 transition-all text-white p-4 rounded-2xl"
      >
        <FiLogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
