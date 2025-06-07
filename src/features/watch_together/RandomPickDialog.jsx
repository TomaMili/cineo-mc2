import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { CheckCircle2 } from "lucide-react";

export default function RandomPickDialog({ isOpen, movie, onAccept }) {
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
                       w-full max-w-md rounded-3xl bg-slate-800/70 backdrop-blur
                       p-10 z-50 text-center shadow-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h2 className="text-2xl font-bold mb-6">Tonight’s pick is…</h2>
            {movie ? (
              <>
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="mx-auto w-40 rounded-lg shadow-lg mb-4"
                />
                <p className="text-lg font-medium mb-6">{movie.title}</p>
                <button
                  onClick={onAccept}
                  className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-2 font-semibold text-white hover:bg-green-500"
                >
                  <CheckCircle2 size={18} /> Add to watched
                </button>
              </>
            ) : (
              <p className="animate-pulse text-slate-300">Picking…</p>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
