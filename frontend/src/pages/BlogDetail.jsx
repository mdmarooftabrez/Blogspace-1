import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2, User, Calendar } from "lucide-react";
import api from "../api";
import { formatDate } from "../utils";
import AuthContext from "../context/auth-context";
import BlogImage from "../components/BlogImage";

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBlog() {
      try {
        const res = await api.get("/blogs/" + id);
        setBlog(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      }
    }
    loadBlog();
  }, [id]);

  async function handleDelete() {
    if (!window.confirm("Delete this blog?")) return;

    try {
      await api.delete("/blogs/" + id);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  }

  if (error && !blog) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 md:px-8">
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        <Link to="/" className="mt-4 inline-block font-semibold text-[#6841e8]">← Back to Home</Link>
      </div>
    );
  }

  if (!blog) return <p className="mx-auto max-w-3xl px-4 py-6 text-gray-500 sm:px-6 md:px-8">Loading...</p>;

  const isOwner = user && Number(user.id) === Number(blog.user_id);

  return (
    <article className="mx-auto min-w-0 max-w-3xl px-4 py-5 sm:px-6 md:px-8">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6841e8]">
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      <span className="mt-4 block w-fit rounded-full bg-violet-50 px-2.5 py-1 text-xs font-bold text-violet-800">
        {blog.category}
      </span>

      <h1 className="mt-3 break-words text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl">{blog.title}</h1>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
        <span className="flex items-center gap-1.5">
          <User size={15} />
          {blog.author}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar size={15} />
          {formatDate(blog.created_at)}
        </span>
      </div>

      {blog.image && (
        <BlogImage
          src={blog.image}
          alt={blog.title}
          className="mt-5 h-56 w-full overflow-hidden rounded-xl sm:h-72 md:h-96"
        />
      )}

      <p className="mt-5 break-words whitespace-pre-line leading-7 text-gray-700">{blog.description}</p>

      {error && <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      {isOwner && (
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            to={"/edit/" + blog.id}
            className="inline-flex items-center gap-2 rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-violet-800"
          >
            <Pencil size={16} />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-700"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      )}
    </article>
  );
}

export default BlogDetail;