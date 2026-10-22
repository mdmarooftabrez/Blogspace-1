import { useState } from "react";
import { BookOpen } from "lucide-react";

function BlogImage({ src, alt, className = "card-image" }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-violet-50 text-violet-600`}
      >
        <BookOpen size={40} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} object-cover`}
      onError={() => setHasError(true)}
    />
  );
}

export default BlogImage;
