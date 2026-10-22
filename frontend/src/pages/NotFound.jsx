import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-12 text-center sm:px-6 sm:py-16">
      <h1 className="text-5xl font-extrabold text-[#6841e8]">404</h1>
      <p className="mt-3 text-gray-600">This page does not exist.</p>
      <Link to="/" className="mt-5 inline-block rounded-lg bg-violet-700 px-5 py-3 font-bold text-white transition-colors hover:bg-violet-800 sm:mt-6">
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound;