import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MyBlogs from "./pages/MyBlogs";
import BlogDetail from "./pages/BlogDetail";
import BlogForm from "./pages/BlogForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

function App() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f6fa] text-[#201d32]">
      <Navbar search={search} setSearch={setSearch} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home search={search} />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/create" element={<BlogForm />} />
          <Route path="/edit/:id" element={<BlogForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;