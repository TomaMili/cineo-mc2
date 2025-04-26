// src/features/watchlater/ConfirmRemoveModal.jsx
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmRemoveModal({
  movie,
  listName,
  onConfirm,
  onCancel,
}) {
  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-40"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
      >
        <div
          className="bg-gray-800 text-white rounded-lg p-6 max-w-sm w-full space-y-4"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-xl text-center">
            Remove <strong>{movie.title}</strong> from your <br />{" "}
            <span className="underline">{listName.toUpperCase()}</span> <br />
            list?
          </h3>
          <div className="flex justify-center space-x-4 pt-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-bordo-500 rounded hover:bg-bordo-400"
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
