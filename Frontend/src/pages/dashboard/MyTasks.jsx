import { useEffect, useState } from "react";

import {
  FiPlus,
  FiX,
} from "react-icons/fi";

import API from "../../api/axios";

import Layout from "../../components/layout/Layout";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);

  const [showForm, setShowForm] =
    useState(false);

  const [editingTask, setEditingTask] =
    useState(null);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      status: "PENDING",
    });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "PENDING",
    });
    setEditingTask(null);
  };

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveTask = async () => {
    try {
      if (editingTask) {
        await API.put(`/tasks/${editingTask._id}`, formData);
      } else {
        await API.post("/tasks", formData);
      }

      resetForm();
      setShowForm(false);

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await API.delete(`/tasks/${taskId}`);
        fetchTasks();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Layout>
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-black text-white">
              My Tasks
            </h1>

            <p className="text-slate-400 mt-2">
              Manage all your tasks
            </p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-500 px-7 py-4 rounded-2xl font-bold hover:scale-105 transition-all"
          >
            <FiPlus size={20} />
            Add New Task
          </button>
        </div>

        {/* Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="w-[700px] bg-[#111827] border border-slate-700 rounded-3xl p-8 relative">
              {/* Close */}
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                className="absolute top-5 right-5 text-slate-400 hover:text-white"
              >
                <FiX size={26} />
              </button>

              <h2 className="text-3xl font-bold mb-8">
                {editingTask ? "Edit Task" : "Create Task"}
              </h2>

              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block mb-2 text-slate-300">
                    Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Task title"
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-2xl p-4 text-white outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block mb-2 text-slate-300">
                    Description
                  </label>

                  <textarea
                    rows="5"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Task description"
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-2xl p-4 text-white outline-none focus:border-cyan-500 resize-none"
                  ></textarea>
                </div>

                {/* Status */}
                <div>
                  <label className="block mb-2 text-slate-300">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-2xl p-4 text-white outline-none focus:border-cyan-500"
                  >
                    <option value="PENDING">
                      PENDING
                    </option>

                    <option value="IN_PROGRESS">
                      IN_PROGRESS
                    </option>

                    <option value="COMPLETED">
                      COMPLETED
                    </option>
                  </select>
                </div>

                {/* Button */}
                <button
                  onClick={saveTask}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-all"
                >
                  {editingTask ? "Update Task" : "Create Task"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Task Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-[#111827] border border-slate-800 rounded-3xl p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {task.title}
                  </h2>

                  <p className="text-slate-400 mt-3">
                    {task.description}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-xl text-sm font-semibold ${
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

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => {
                    setFormData({
                      title: task.title,
                      description: task.description,
                      status: task.status,
                    });
                    setEditingTask(task);
                    setShowForm(true);
                  }}
                  className="bg-blue-500 px-5 py-3 rounded-2xl hover:opacity-80 transition"
                >
                  Edit
                </button>

                <button 
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-500 px-5 py-3 rounded-2xl hover:opacity-80 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MyTasks;