import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import api from "../api";
import { CATEGORIES } from "../utils";
import AuthContext from "../context/auth-context";

function BlogForm() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    if (!id) return;

    async function loadBlog() {
      try {
        const res = await api.get("/blogs/" + id);
        const blog = res.data.data;
        setTitle(blog.title);
        setCategory(blog.category);
        setImage(blog.image || "");
        setDescription(blog.description);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      }
    }
    loadBlog();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const body = { title, description, category, author: user.name, image };

    try {
      if (id) {
        await api.put("/blogs/" + id, body);
      } else {
        await api.post("/blogs", body);
      }
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  }

  if (!user) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 md:px-8">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6841e8]">
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      <form onSubmit={handleSubmit} className="mt-4 rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
        <h1 className="text-2xl font-extrabold">{id ? "Edit Blog" : "Create New Blog"}</h1>

        {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <label className="mb-1.5 mt-4 block text-sm font-semibold">Title</label>
        <input
          type="text"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          required
        />

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-semibold">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              required
            >
              <option value="">Select category</option>
              {CATEGORIES.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold">Author</label>
            <input type="text" value={user.name} readOnly className="w-full rounded-lg border border-gray-200 bg-gray-100 px-3.5 py-2.5 text-sm outline-none focus:border-violet-500" />
          </div>
        </div>

        <label className="mb-1.5 mt-4 block text-sm font-semibold">Image URL</label>
        <input
          type="text"
          placeholder="Paste image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
        />

        <label className="mb-1.5 mt-4 block text-sm font-semibold">Description</label>
        <textarea
          placeholder="Write your blog content..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="8"
          className="w-full resize-y rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          required
        />

        <button className="mt-5 inline-flex items-center gap-2 rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-violet-800">
          <Save size={18} />
          {id ? "Update Blog" : "Create Blog"}
        </button>
      </form>
    </div>
  );
}

export default BlogForm;