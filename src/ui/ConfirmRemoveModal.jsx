import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function ConfirmRemoveModal({
  movie,
  listName = "list",
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-40"
      />

      <motion.div
        key="modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        onClick={onCancel}
      >
        <div
          className="bg-siva-800 text-white rounded-lg p-6 max-w-sm w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-xl font-semibold text-center mb-4">
            Remove <span className="font-bold text-white">{movie.title}</span>{" "}
            from <span className="font-bold text-white">{listName}</span>?
          </h3>
          <div className="flex justify-center gap-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-bordo-500 rounded hover:bg-bordo-400 cursor-pointer"
            >
              Remove
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
