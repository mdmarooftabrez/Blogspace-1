import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Mail, Lock } from "lucide-react";
import api from "../api";
import AuthContext from "../context/auth-context";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { saveUser } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });
      saveUser(res.data.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="flex justify-center px-4 py-6 sm:px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="flex items-center justify-center gap-2 text-2xl font-extrabold">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-700 text-white">
            <BookOpen size={24} />
          </span>
          BlogSpace
        </div>
        <h1 className="mt-4 text-center text-xl font-bold">Login to your account</h1>
        <p className="mt-1 text-center text-sm text-gray-500">Welcome back! Please login to continue.</p>

        {error && <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <div className="relative mt-4">
          <Mail size={18} className="absolute left-4 top-3.5 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-200 py-2.5 pl-11 pr-4 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            required
          />
        </div>

        <div className="relative mt-3">
          <Lock size={18} className="absolute left-4 top-3.5 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-200 py-2.5 pl-11 pr-4 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            required
          />
        </div>

        <button className="mt-4 w-full rounded-lg bg-violet-700 py-2.5 text-sm font-bold text-white transition-colors hover:bg-violet-800">
          Login
        </button>

        <p className="mt-5 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="font-bold text-[#6841e8]">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;