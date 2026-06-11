import { useEffect, useState } from "react";
import API from "../../api/axios";
import Layout from "../../components/layout/Layout";
import TaskMonitoring from "./TaskMonitoring";

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(
        `/admin/logs?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLogs(res.data.logs);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page]);

  return (
    <Layout>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden text-gray-900">

  <div className="px-6 py-5 border-b bg-gray-50">
    <h2 className="text-xl font-semibold text-gray-800">
      Recent Activity
    </h2>
  </div>

  <div className="overflow-x-auto">

    <table className="w-full text-gray-900">

      <thead className="bg-gray-200 text-gray-800">

        <tr>

          <th className="px-6 py-4 text-left">
            User
          </th>

          <th className="px-6 py-4 text-left">
            Action
          </th>

          <th className="px-6 py-4 text-left">
            Time
          </th>

        </tr>

      </thead>

      <tbody>

        {logs.length > 0 ? (
          logs.map((log) => (
            <tr
              key={log._id}
              className="border-b hover:bg-gray-50 text-gray-800"
            >
              <td className="px-6 py-4">
                {log.user?.name || "-"}
              </td>

              <td className="px-6 py-4">

                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">

                  {log.action}

                </span>

              </td>

              <td className="px-6 py-4 text-gray-700">

                {new Date(log.createdAt).toLocaleString()}

              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="3"
              className="text-center py-10 text-gray-500"
            >
              No activity found
            </td>
          </tr>
        )}

      </tbody>

    </table>

  </div>
  {/* Pagination */}
<div className="flex items-center justify-between px-6 py-5 border-t bg-gray-50">

  <button
    disabled={page === 1}
    onClick={() =>
      setPage((prev) => prev - 1)
    }
    className={`
      px-5 py-2 rounded-xl border
      transition
      ${
        page === 1
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-gray-100 text-gray-800"
      }
    `}
  >
    ← Previous
  </button>

  <div className="flex gap-2">

    {Array.from(
      { length: totalPages },
      (_, i) => (
        <button
          key={i + 1}
          onClick={() =>
            setPage(i + 1)
          }
          className={`
            w-10 h-10 rounded-lg
            font-medium transition
            ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }
          `}
        >
          {i + 1}
        </button>
      )
    )}

  </div>

  <button
    disabled={page === totalPages}
    onClick={() =>
      setPage((prev) => prev + 1)
    }
    className={`
      px-5 py-2 rounded-xl border
      transition
      ${
        page === totalPages
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-gray-100 text-gray-800"
      }
    `}
  >
    Next →
  </button>

</div>

<div className="mt-8">
  <TaskMonitoring />
</div>
</div>
    </Layout>
       
  );
};

export default ActivityLogs;