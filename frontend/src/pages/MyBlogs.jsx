import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import AuthContext from "../context/auth-context";
import BlogCard from "../components/BlogCard";

function MyBlogs() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    async function loadBlogs() {
      try {
        const res = await api.get("/blogs");
        setBlogs(res.data.data.filter((blog) => Number(blog.user_id) === Number(user.id)));
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, [user, navigate]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 md:px-8">
      <h1 className="mb-4 text-2xl font-extrabold">My Blogs</h1>

      {error && (
        <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading && <p className="text-sm text-gray-500">Loading your stories...</p>}
        {!loading &&
          !error &&
          blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
      </div>

      {!loading && !error && blogs.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white px-5 py-8 text-center">
          <h2 className="text-lg font-bold text-gray-900">Your stories will appear here</h2>
          <p className="mt-1 text-sm text-gray-600">You have not published a blog yet.</p>
          <button
            onClick={() => navigate("/create")}
            className="mt-4 rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-violet-800"
          >
            Create a blog
          </button>
        </div>
      )}
    </div>
  );
}

export default MyBlogs;
