import { useEffect, useState } from "react";

import {
  FiUsers,
  FiTrash2,
  FiShield,
} from "react-icons/fi";

import API from "../../api/axios";

import Layout from "../../components/layout/Layout";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await API.get(
        "/admin/users"
      );

      setUsers(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = (userId) => {
    setDeleteConfirm(userId);
  };

  const handleConfirmDelete = async (userId) => {
    try {
      await API.delete(`/admin/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      setDeleteConfirm(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(null);
  };

  const handleToggleStatus = async (userId, currentStatus) => {
  try {
    const token = localStorage.getItem("token");

    const updatedStatus =
      currentStatus === "Active"
        ? "Inactive"
        : "Active";

    await API.put(
      `/admin/users/${userId}/status`,
      {
        status: updatedStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUsers((prev) =>
      prev.map((user) =>
        user._id === userId
          ? {
              ...user,
              status: updatedStatus,
            }
          : user
      )
    );
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-5xl font-black text-white">
              Users
            </h1>

            <p className="text-slate-400 mt-2 text-lg">
              Manage all registered users
            </p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-lg">
            <FiUsers size={28} />
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-[#111827] border border-slate-800 rounded-3xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 px-8 py-5 bg-[#0f172a] border-b border-slate-800 text-slate-400 font-semibold text-sm uppercase tracking-wider">
            <div>User</div>

            <div>Email</div>

            <div>Role</div>

            <div className="text-center">
              Actions
            </div>
          </div>

          {/* Table Body */}
          <div>
            {users.map((user, index) => (
              <div
                key={user._id}
                className={`grid grid-cols-5 gap-4 items-center px-8 py-6 border-b border-slate-800 hover:bg-slate-800/40 transition-all ${
                  index === users.length - 1
                    ? "border-none"
                    : ""
                }`}
              >
                {/* User */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center font-bold text-lg">
                    {user.name?.charAt(0)}
                  </div>

                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {user.name}
                    </h3>

                    <p className="text-slate-400 text-sm">
                      ID: {user._id?.slice(0, 8)}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="text-slate-300 break-all">
                  {user.email}
                </div>

                {/* Role */}
                <div>
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold ${
                      user.role === "Admin"
                        ? "bg-purple-500/20 text-purple-400"
                        : "bg-cyan-500/20 text-cyan-400"
                    }`}
                  >
                    <FiShield size={16} />

                    {user.role}
                  </span>
                </div>

                                <div className="flex items-center">

  <button
    onClick={() =>
      handleToggleStatus(
        user._id,
        user.status
      )
    }
    className={`
      relative w-16 h-9 rounded-full transition-all
      ${
        user.status === "Active"
          ? "bg-green-500"
          : "bg-gray-600"
      }
    `}
  >
    <div
      className={`
        absolute top-1 left-1
        w-7 h-7 rounded-full bg-white
        transition-all
        ${
          user.status === "Active"
            ? "translate-x-7"
            : ""
        }
      `}
    />

  </button>

  <span
    className={`
      ml-3 text-sm font-medium
      ${
        user.status === "Active"
          ? "text-green-400"
          : "text-red-400"
      }
    `}
  >
    {user.status}
  </span>

</div>

                {/* Actions */}
                <div className="flex justify-center">
                  <button
                    onClick={() => handleDeleteClick(user._id)}
      
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 transition-all px-5 py-3 rounded-2xl text-white font-medium"
                  >
                    <FiTrash2 size={18} />
                    Delete
                  </button>
                </div>

              </div>
            ))}

            {/* Empty State */}
            {users.length === 0 && (
              <div className="py-20 flex flex-col items-center justify-center">
                <FiUsers
                  size={70}
                  className="text-slate-600 mb-5"
                />

                <h2 className="text-2xl font-bold text-white">
                  No Users Found
                </h2>

                <p className="text-slate-400 mt-2">
                  Users will appear here
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8 max-w-sm mx-4">
              <h2 className="text-2xl font-bold text-white mb-4">
                Delete User?
              </h2>
              
              <p className="text-slate-400 mb-8">
                Are you sure you want to delete this user? This action cannot be undone.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={handleCancelDelete}
                  className="flex-1 px-4 py-3 rounded-2xl bg-slate-700 hover:bg-slate-600 text-white font-medium transition-all"
                >
                  Cancel
                </button>

                <button
                  onClick={() => handleConfirmDelete(deleteConfirm)}
                  className="flex-1 px-4 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-medium transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Users;