/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import MovieCard from "../../ui/MovieCard";
import { NavLink } from "react-router-dom";

export default function RandomPickDialog({ isOpen, movie, onClose }) {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                       w-full max-w-lg rounded-3xl bg-siva-800/40 backdrop-blur
                       p-8 sm:p-10 z-50 text-center shadow-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <NavLink
              to="/watch-together"
              className="absolute right-4 top-4 text-slate-300 hover:text-white cursor-pointer"
            >
              <X size={22} />
            </NavLink>

            <h2 className="text-3xl font-medium mb-6">Tonight’s pick is…</h2>

            {movie ? (
              <>
                <div className="mx-auto mb-6 w-40">
                  <MovieCard movie={movie} />
                </div>
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
