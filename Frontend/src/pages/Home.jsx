import {
  FiShield,
  FiUsers,
  FiActivity,
  FiBarChart2,
  FiLock,
  FiCheckCircle,
  FiGithub,
  FiLinkedin,
  FiInstagram,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Role Based Access",
    icon: <FiShield size={28} />,
    desc: "Admin and User access control with protected routes.",
  },

  {
    title: "User Management",
    icon: <FiUsers size={28} />,
    desc: "Manage users and update active status.",
  },

  {
    title: "Activity Tracking",
    icon: <FiActivity size={28} />,
    desc: "Track login, task creation, updates and deletions.",
  },

  {
    title: "Analytics Dashboard",
    icon: <FiBarChart2 size={28} />,
    desc: "Monitor tasks and users visually.",
  },

  {
    title: "Authorization",
    icon: <FiLock size={28} />,
    desc: "Secure middleware and protected APIs.",
  },

  {
    title: "Task Management",
    icon: <FiCheckCircle size={28} />,
    desc: "Create, update and delete tasks efficiently.",
  },
];

const deliverables = [
  "Working role authentication",
  "Admin dashboard",
  "Responsive UI",
  "API integration",
  "Analytics",
  "Activity logs",
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Navbar */}

      <nav className="flex justify-between items-center px-12 py-6 bg-[#0f172a] border-b border-slate-800">
        <h1 className="text-4xl font-black">TaskFlow</h1>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 rounded-2xl border border-slate-700 hover:bg-slate-800 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 transition"
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero */}

      <section className="py-28 px-10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-7xl font-black leading-tight">
            Build. Track. Deliver.
            <br />
            with TaskFlow
          </h1>

          <p className="mt-8 text-slate-400 text-xl max-w-3xl mx-auto">
            Role-based authentication, task monitoring, analytics and secure
            user management.
          </p>

          <div className="mt-12 flex justify-center gap-5">
            <button
              onClick={() => navigate("/register")}
              className="px-10 py-5 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold hover:opacity-90"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-10 py-5 rounded-3xl border border-slate-700 hover:bg-slate-800"
            >
              Login
            </button>
          </div>
        </div>
      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-10 pb-28">
        <h2 className="text-5xl font-black text-center mb-14">
          Platform Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item) => (
            <div
              key={item.title}
              className="bg-[#111827] border border-slate-800 rounded-3xl p-8 hover:border-cyan-500/30 transition"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mb-6">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold">{item.title}</h3>

              <p className="mt-4 text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Project Scope */}

      <section className="max-w-7xl mx-auto px-10 pb-24">
        <div className="bg-[#111827] border border-slate-800 rounded-3xl p-12">
          <h2 className="text-5xl font-black mb-10">Project Scope</h2>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl mb-6 text-cyan-400">Admin Permissions</h3>

              <ul className="space-y-4 text-slate-300">
                <li>✓ View all users</li>

                <li>✓ View all tasks</li>

                <li>✓ Delete any task</li>

                <li>✓ Manage users</li>

                <li>✓ Activity tracking</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl mb-6 text-blue-400">User Permissions</h3>

              <ul className="space-y-4 text-slate-300">
                <li>✓ Create own tasks</li>

                <li>✓ View own tasks</li>

                <li>✓ Update own tasks</li>

                <li>✓ Delete own tasks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

   {/* Deliverables */}

<section className="pb-20 px-10">

  <div className="max-w-6xl mx-auto">

    <div className="mb-10">

      <h2 className="text-4xl font-bold text-white">

        Expected Deliverables

      </h2>

      <p className="mt-2 text-slate-400">

        Features implemented in TaskFlow.

      </p>

    </div>

    <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8">

      <div className="grid md:grid-cols-2 gap-6">

        {[
          "Role Based Authentication",
          "Admin Dashboard",
          "User Management",
          "Task Monitoring",
          "Activity Logs",
          "Protected Routes",
          "Access Control",
          "API Integration",
        ].map((item) => (
          <div
            key={item}
            className="
              flex
              items-center
              gap-3
              p-4
              rounded-2xl
              bg-[#0f172a]
            "
          >

            <span className="text-cyan-400 text-lg">
              ✓
            </span>

            <span className="text-slate-300">

              {item}

            </span>

          </div>
        ))}

      </div>

    </div>

  </div>

</section>


      {/* Footer */}

      <footer className="bg-[#0f172a] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-10 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h2 className="text-3xl font-black">TaskFlow</h2>

              <p className="mt-3 text-slate-400">
                Made with ❤️ by
                <span className="ml-1 text-cyan-400 font-semibold">
                  Muzammil Raza Khan
                </span>
              </p>

              <p className="text-sm text-slate-500 mt-2">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>

            <div className="flex gap-4">
              <a
                href="#"
                className="w-14 h-14 rounded-2xl bg-[#111827] hover:bg-cyan-500 transition flex items-center justify-center"
              >
                <FiGithub size={22} />
              </a>

              <a
                href="#"
                className="w-14 h-14 rounded-2xl bg-[#111827] hover:bg-cyan-500 transition flex items-center justify-center"
              >
                <FiLinkedin size={22} />
              </a>

              <a
                href="#"
                className="w-14 h-14 rounded-2xl bg-[#111827] hover:bg-cyan-500 transition flex items-center justify-center"
              >
                <FiInstagram size={22} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
