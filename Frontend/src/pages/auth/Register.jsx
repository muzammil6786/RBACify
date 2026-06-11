import {
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

import API from "../../api/axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post(
        "/users/register",
        form
      );

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#020617] flex justify-center items-center px-5">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full top-[-100px] left-[-100px]"></div>

      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]"></div>

      {/* Card */}
      <motion.form
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-[500px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-10 shadow-2xl"
      >
        {/* Logo */}
        <div className="mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-3xl font-black text-white shadow-lg">
            T
          </div>

          <h1 className="text-5xl font-black text-white mt-6">
            Create Account
          </h1>

          <p className="text-slate-400 mt-3 text-lg">
            Register to start managing tasks
          </p>
        </div>

        {/* Name */}
        <div className="mb-6">
          <label className="text-slate-300 mb-3 block">
            Full Name
          </label>

          <div className="relative">
            <FiUser
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />

            <input
              type="text"
              value={form.name}
              placeholder="Enter your name"
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full bg-[#0f172a] border border-slate-700 rounded-2xl py-4 pl-14 pr-5 text-white placeholder:text-slate-500 outline-none focus:border-cyan-500 transition-all"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="text-slate-300 mb-3 block">
            Email Address
          </label>

          <div className="relative">
            <FiMail
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />

            <input
              type="email"
              value={form.email}
              placeholder="Enter your email"
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full bg-[#0f172a] border border-slate-700 rounded-2xl py-4 pl-14 pr-5 text-white placeholder:text-slate-500 outline-none focus:border-cyan-500 transition-all"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-8">
          <label className="text-slate-300 mb-3 block">
            Password
          </label>

          <div className="relative">
            <FiLock
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={form.password}
              placeholder="Enter your password"
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="w-full bg-[#0f172a] border border-slate-700 rounded-2xl py-4 pl-14 pr-14 text-white placeholder:text-slate-500 outline-none focus:border-cyan-500 transition-all"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              {showPassword ? (
                <FiEyeOff size={22} />
              ) : (
                <FiEye size={22} />
              )}
            </button>
          </div>
        </div>

        {/* Button */}
        <button
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 py-4 rounded-2xl font-bold text-lg text-white hover:scale-[1.02] transition-all duration-300 shadow-lg disabled:opacity-50"
        >
          {loading
            ? "Creating Account..."
            : "Register"}
        </button>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              Login
            </Link>
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-4 w-full bg-slate-700 hover:bg-slate-600 py-3 rounded-2xl font-semibold text-white transition-all"
          >
            Go to Home
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default Register;