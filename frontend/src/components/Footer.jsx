import { BookOpen } from "lucide-react";

function Footer() {
  return (
    <footer className="mt-6 border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 sm:flex-row sm:px-6 md:px-8">
        <span className="flex items-center gap-2 text-base font-extrabold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6841e8] text-white">
            <BookOpen size={18} />
          </span>
          BlogSpace
        </span>
        <p>© {new Date().getFullYear()} BlogSpace. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;