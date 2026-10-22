import { BookOpen } from "lucide-react";

function Logo({ small }) {
  return (
    <span
      className={
        "flex items-center gap-2 font-extrabold " + (small ? "text-lg" : "text-xl")
      }
    >
      <span
        className={
          "flex items-center justify-center rounded-lg bg-[#6841e8] text-white " +
          (small ? "h-8 w-8" : "h-9 w-9")
        }
      >
        <BookOpen size={small ? 18 : 22} />
      </span>
      BlogSpace
    </span>
  );
}

export default Logo;