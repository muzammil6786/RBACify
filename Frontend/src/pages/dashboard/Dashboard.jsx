import Layout from "../../components/layout/Layout";

import {
  FiUsers,
  FiCheckCircle,
  FiClock,
  FiClipboard,
} from "react-icons/fi";

const stats = [
  {
    title: "Total Users",
    value: "1,240",
    icon: <FiUsers />,
    color: "from-violet-500 to-purple-500",
  },

  {
    title: "Tasks",
    value: "3,560",
    icon: <FiClipboard />,
    color: "from-blue-500 to-cyan-500",
  },

  {
    title: "Completed",
    value: "2,120",
    icon: <FiCheckCircle />,
    color: "from-green-500 to-emerald-500",
  },

  {
    title: "Pending",
    value: "1,440",
    icon: <FiClock />,
    color: "from-orange-500 to-red-500",
  },
];

const Dashboard = () => {
  return (
    <Layout>
      <div className="w-full space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-5xl font-black text-white">
            Dashboard
          </h1>

          <p className="text-slate-400 mt-2 text-lg">
            Monitor users, tasks and analytics
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
          {stats.map((item, index) => (
            <div
              key={index}
              className={`w-full rounded-3xl p-7 bg-gradient-to-br ${item.color} shadow-2xl relative overflow-hidden`}
            >
              <div className="absolute right-0 top-0 opacity-10 text-[120px]">
                {item.icon}
              </div>

              <div className="relative z-10">
                <div className="text-3xl mb-6">
                  {item.icon}
                </div>

                <p className="text-white/80 text-lg">
                  {item.title}
                </p>

                <h2 className="text-5xl font-black mt-3 text-white">
                  {item.value}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">
          {/* Recent Activity */}
          <div className="xl:col-span-2 bg-[#111827] rounded-3xl p-8 border border-slate-800">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">
                Recent Activity
              </h2>

              <button className="bg-slate-800 px-4 py-2 rounded-xl text-sm">
                View All
              </button>
            </div>

            <div className="space-y-5">
              {[
                "Admin updated task status",
                "New user registered",
                "Task marked completed",
                "User deleted task",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-[#1e293b] p-5 rounded-2xl"
                >
                  <div>
                    <h3 className="text-white font-medium">
                      {item}
                    </h3>

                    <p className="text-slate-400 text-sm mt-1">
                      2 mins ago
                    </p>
                  </div>

                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-[#111827] rounded-3xl p-8 border border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-8">
              Analytics
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">
                    Completed
                  </span>

                  <span className="text-white">
                    78%
                  </span>
                </div>

                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full w-[78%] bg-green-500 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">
                    Pending
                  </span>

                  <span className="text-white">
                    42%
                  </span>
                </div>

                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full w-[42%] bg-orange-500 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">
                    Productivity
                  </span>

                  <span className="text-white">
                    91%
                  </span>
                </div>

                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full w-[91%] bg-cyan-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;