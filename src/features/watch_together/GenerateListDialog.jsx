//GenerateListDialog.jsx
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useState } from "react";
import { BookmarkPlus } from "lucide-react";

export default function GenerateListDialog({ isOpen, movies, onAccept }) {
  const [idx, setIdx] = useState(0);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                       w-full max-w-xl rounded-3xl bg-slate-800/70 backdrop-blur
                       p-8 z-50 shadow-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h2 className="mb-6 text-center text-2xl font-bold">
              Recommended list
            </h2>

            <div className="relative mb-6">
              <img
                src={movies[idx].poster}
                alt={movies[idx].title}
                className="mx-auto h-72 rounded-lg object-cover shadow-lg"
              />
              <button
                disabled={idx === 0}
                className="absolute left-1 top-1/2 -translate-y-1/2 p-2 disabled:opacity-30"
                onClick={() => setIdx((i) => i - 1)}
              >
                ‹
              </button>
              <button
                disabled={idx === movies.length - 1}
                className="absolute right-1 top-1/2 -translate-y-1/2 p-2 disabled:opacity-30"
                onClick={() => setIdx((i) => i + 1)}
              >
                ›
              </button>
            </div>

            <p className="text-center text-lg font-medium mb-6">
              {movies[idx].title}
            </p>

            <button
              onClick={() => onAccept(movies[idx].id)}
              className="mx-auto inline-flex items-center gap-2 rounded-full bg-bordo-600 px-6 py-2 font-semibold text-white hover:bg-bordo-500"
            >
              <BookmarkPlus size={18} /> Add to watched
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
