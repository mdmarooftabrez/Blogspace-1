import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Search, Menu, X, ChevronDown, LogOut, FileText } from "lucide-react";
import AuthContext from "../context/auth-context";

function Navbar({ search, setSearch }) {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  function handleSearch(e) {
    setSearch(e.target.value);
    navigate("/");
  }

  async function handleLogout() {
    await logout();
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate("/login");
  }

  const searchBox = (
    <label className="flex h-11 items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 text-gray-500">
      <Search size={18} />
      <input
        type="text"
        placeholder="Search blogs..."
        value={search}
        onChange={handleSearch}
        className="min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none"
      />
    </label>
  );

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6 md:gap-6 md:px-8">
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6841e8] text-white">
            <BookOpen size={22} />
          </span>
          BlogSpace
        </Link>

        <div className="hidden items-center gap-6 text-sm font-semibold lg:flex">
          <Link to="/" className="text-[#6841e8] transition-colors hover:text-violet-800">Home</Link>
          <Link to="/create" className="transition-colors hover:text-[#6841e8]">Create Blog</Link>
        </div>

        <div className="hidden w-64 lg:block xl:w-72">{searchBox}</div>

        <div className="relative hidden lg:block">
          {user ? (
            <>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-sm font-bold"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1edff] text-[#6841e8]">
                  {user.name[0].toUpperCase()}
                </span>
                <span className="max-w-32 truncate">{user.name}</span>
                <ChevronDown size={16} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                  <Link
                    to="/my-blogs"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-gray-50"
                  >
                    <FileText size={16} />
                    My Blogs
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-gray-50"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to="/login" className="rounded-lg bg-violet-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-violet-800">
              Login
            </Link>
          )}
        </div>

        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div className="px-4 pb-3 sm:px-6 lg:hidden">{searchBox}</div>

      {menuOpen && (
        <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-3 text-sm font-semibold sm:px-6 lg:hidden">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/create" onClick={() => setMenuOpen(false)}>Create Blog</Link>

          {user ? (
            <>
              <Link to="/my-blogs" onClick={() => setMenuOpen(false)}>My Blogs</Link>
              <button onClick={handleLogout} className="flex items-center gap-2 text-left text-red-600">
                <LogOut size={16} />
                Logout ({user.name})
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;