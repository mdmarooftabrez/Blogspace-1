import { Link } from "react-router-dom";
import { User, Calendar } from "lucide-react";
import { formatDate } from "../utils";
import BlogImage from "./BlogImage";

function BlogCard({ blog }) {
  return (
    <Link
      to={"/blog/" + blog.id}
      className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-colors hover:border-violet-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
    >
      <BlogImage src={blog.image} alt={blog.title} className="h-48 w-full" />

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="self-start rounded-full bg-violet-50 px-2.5 py-1 text-xs font-bold text-violet-800">
          {blog.category}
        </span>

        <h3 className="line-clamp-2 break-words text-base font-bold leading-snug group-hover:text-violet-800">
          {blog.title}
        </h3>
        <p className="line-clamp-2 break-words text-sm text-gray-600">{blog.description}</p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-gray-100 pt-3 text-xs text-gray-500">
          <span className="flex min-w-0 items-center gap-1.5">
            <User size={14} />
            <span className="truncate">{blog.author}</span>
          </span>
          <span className="flex shrink-0 items-center gap-1.5">
            <Calendar size={14} />
            {formatDate(blog.created_at)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;