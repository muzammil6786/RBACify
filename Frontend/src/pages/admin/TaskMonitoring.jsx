import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import API from "../../api/axios";

import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const TaskMonitoring = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/admin/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = response.data;
        const tasksData = Array.isArray(json) ? json : json.tasks || json.data || [];

        setTasks(tasksData);
      } catch (err) {
        setError(err.message || "Unable to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const statuses = ["PENDING", "IN_PROGRESS", "COMPLETED"];
  const data = statuses.map((name) => ({
    name,
    value: tasks.filter((task) => {
      const status = typeof task.status === "string" ? task.status.trim().toLowerCase() : "";
      return status === name.toLowerCase();
    }).length,
  }));

  const COLORS = {
    PENDING: "#F59E0B", // Yellow
    IN_PROGRESS: "#3B82F6", // Blue
    COMPLETED: "#22C55E", // Green
  };

  return (
   
      <div className="p-8">

        <h1 className="text-3xl font-bold mb-8">
          Task Monitoring
        </h1>

        <div className="bg-white rounded-xl shadow p-6">
          {loading ? (
            <div className="text-center text-gray-500">Loading task status...</div>
          ) : error ? (
            <div className="text-center text-red-500">Error: {error}</div>
          ) : (
            <div className="h-[450px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={90}
                    outerRadius={150}
                    label
                  >
                    {data.map((entry) => (
                      <Cell key={entry.name} fill={COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              
            </div>
          )}
        </div>
        {/* Stats Section */}
<div className="grid grid-cols-4 gap-4 mt-8">

  <div className="bg-gray-50 rounded-lg p-4 text-center shadow-sm">
    <h3 className="text-gray-500 text-sm">Total Tasks</h3>
    <p className="text-2xl font-bold text-gray-900">
      {tasks.length}
    </p>
  </div>

  <div className="bg-yellow-50 rounded-lg p-4 text-center shadow-sm">
    <h3 className="text-yellow-600 text-sm">Pending</h3>
    <p className="text-2xl font-bold text-yellow-700">
      {data.find(d => d.name === "PENDING")?.value || 0}
    </p>
  </div>

  <div className="bg-blue-50 rounded-lg p-4 text-center shadow-sm">
    <h3 className="text-blue-600 text-sm">In Progress</h3>
    <p className="text-2xl font-bold text-blue-700">
      {data.find(d => d.name === "IN_PROGRESS")?.value || 0}
    </p>
  </div>

  <div className="bg-green-50 rounded-lg p-4 text-center shadow-sm">
    <h3 className="text-green-600 text-sm">Completed</h3>
    <p className="text-2xl font-bold text-green-700">
      {data.find(d => d.name === "COMPLETED")?.value || 0}
    </p>
  </div>

</div>

      </div>
   
  );
};

export default TaskMonitoring;