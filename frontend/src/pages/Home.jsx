import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PenLine, ArrowRight, SearchX } from "lucide-react";
import api from "../api";
import { CATEGORIES } from "../utils";
import BlogCard from "../components/BlogCard";
import BlogImage from "../components/BlogImage";

function Home({ search }) {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("All");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await api.get("/blogs");
        setBlogs(res.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  const filteredBlogs = blogs.filter(
    (blog) =>
      (category === "All" || blog.category === category) &&
      blog.title.toLowerCase().includes(search.toLowerCase())
  );

  const featured = blogs[0];

  return (
    <div>
      <section className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-6 sm:px-6 md:px-8 md:py-8">
        <div className="flex w-full min-w-0 max-w-xl flex-col gap-3">
          <span className="self-start rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700">
            Welcome to BlogSpace
          </span>
          <h1 className="break-words text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Read, write and share your thoughts.
          </h1>
          <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
            Discover stories from the community, or start your own blog in a minute.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <Link
              to="/create"
              className="inline-flex items-center gap-2 rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-violet-800 sm:px-5"
            >
              <PenLine size={18} />
              Create a Blog
            </Link>
            <a
              href="#latest"
              className="hidden items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold transition-colors hover:border-violet-300 hover:text-violet-700 sm:inline-flex"
            >
              Browse blogs
              <ArrowRight size={18} />
            </a>
          </div>
        </div>

        {featured && (
          <Link
            to={"/blog/" + featured.id}
            className="hidden w-80 shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors hover:border-violet-200 lg:block"
          >
            <BlogImage src={featured.image} alt={featured.title} className="h-52 w-full" />
            <div className="flex flex-col gap-2 p-4">
              <span className="self-start rounded-full bg-violet-100 px-2.5 py-1 text-xs font-bold text-violet-800">
                {featured.category}
              </span>
              <p className="line-clamp-2 text-lg font-bold">{featured.title}</p>
              <p className="text-sm text-gray-500">Latest from the community</p>
            </div>
          </Link>
        )}
      </section>

      <section id="latest" className="mx-auto max-w-6xl scroll-mt-6 px-4 pb-6 sm:px-6 md:px-8">
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-extrabold">Latest Blogs</h2>

          <div className="flex max-w-full flex-wrap gap-1.5 sm:gap-2">
            {["All", ...CATEGORIES].map((name) => (
              <button
                key={name}
                onClick={() => setCategory(name)}
                className={
                  "rounded-full border px-2.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:px-3 sm:text-sm " +
                  (category === name
                    ? "border-violet-700 bg-violet-700 text-white"
                    : "border-gray-200 bg-white hover:border-violet-300 hover:text-violet-700")
                }
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading && <p className="text-sm text-gray-500">Loading stories...</p>}
          {!loading &&
            !error &&
            filteredBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
        </div>

        {!loading && !error && filteredBlogs.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-8 text-center">
            <SearchX className="mx-auto text-violet-500" size={32} />
            <h3 className="mt-3 text-lg font-bold text-gray-900">
              {blogs.length === 0 ? "No blogs yet" : "No matching blogs"}
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-sm leading-relaxed text-gray-600">
              {blogs.length === 0
                ? "Be the first to share a story with the community."
                : "Try another search or category to find a story."}
            </p>
            {blogs.length === 0 && (
              <Link
                to="/create"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-violet-800"
              >
                <PenLine size={16} />
                Write the first blog
              </Link>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;