import { useEffect, useState } from "react";

import {
  FiClipboard,
  FiTrash2,
  FiUser,
} from "react-icons/fi";

import API from "../../api/axios";

import Layout from "../../components/layout/Layout";

const AdminTasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await API.get(
        "/admin/tasks"
      );

      setTasks(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    try {
      await API.delete(`/admin/tasks/${taskId}`);
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Layout>
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-5xl font-black text-white">
              All Tasks
            </h1>

            <p className="text-slate-400 mt-2 text-lg">
              Monitor all user tasks
            </p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-lg">
            <FiClipboard size={28} />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-[#111827] border border-slate-800 rounded-3xl p-7 hover:border-cyan-500/30 transition-all"
            >
              {/* Top */}
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {task.title}
                  </h2>

                  <p className="text-slate-400 mt-3 leading-7">
                    {task.description}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-2xl text-sm font-semibold whitespace-nowrap ${
                    task.status === "COMPLETED"
                      ? "bg-green-500/20 text-green-400"
                      : task.status ===
                        "IN_PROGRESS"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {task.status}
                </span>
              </div>

              {/* User */}
              <div className="mt-6 flex items-center gap-3 bg-slate-800/50 p-4 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white">
                  <FiUser size={20} />
                </div>

                <div>
                  <h3 className="text-white font-semibold">
                    {task.createdBy?.name ||
                      "Unknown User"}
                  </h3>

                  <p className="text-slate-400 text-sm">
                    {task.createdBy?.email}
                  </p>
                  
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-6">
                <p className="text-slate-500 text-sm">
                  Task ID:{" "}
                  {task._id?.slice(0, 8)}
                </p>

                <button
                  onClick={() => handleDelete(task._id)}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 transition-all px-5 py-3 rounded-2xl text-white font-medium"
                >
                  <FiTrash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* Empty */}
          {tasks.length === 0 && (
            <div className="col-span-full py-24 flex flex-col items-center justify-center">
              <FiClipboard
                size={70}
                className="text-slate-600 mb-5"
              />

              <h2 className="text-3xl font-bold text-white">
                No Tasks Found
              </h2>

              <p className="text-slate-400 mt-3">
                Tasks created by users
                will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminTasks;