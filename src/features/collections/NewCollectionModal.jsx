import { useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify-icon/react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function NewCollectionModal({
  initialName = "",
  onCreate,
  onCancel,
}) {
  const [name, setName] = useState(initialName);

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/70"
          onClick={onCancel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
        />

        <motion.div
          key="modal"
          className="relative bg-siva-800/99 rounded-xl shadow-2xl w-full max-w-md p-6"
          initial={{ y: -30, scale: 0.9, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: -30, scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 text-siva-400 hover:text-white transition cursor-pointer"
          >
            <Icon icon="gridicons:cross-circle" width={28} height={28} />
          </button>

          <h2 className="text-xl font-medium text-siva-100 mb-4">
            New Collection
          </h2>

          <label className="block mb-6">
            <span className="text-siva-100">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-4 py-2 font-light bg-siva-700 rounded-lg ring-1 focus:outline-none focus:ring-2 focus:ring-bordo-400 text-siva-300 placeholder-siva-400"
              placeholder="My Sci-Fi Faves"
            />
          </label>

          <div className="flex justify-end space-x-3">
            <motion.button
              onClick={onCancel}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gray-700 hover:bg-gray-700 px-3 sm:px-4 py-1 sm:py-2 rounded transition-colors duration-300 cursor-pointer text-sm sm:text-md"
            >
              Cancel
            </motion.button>

            <motion.button
              onClick={() => onCreate(name.trim())}
              disabled={!name.trim()}
              whileHover={name.trim() ? { scale: 1.03 } : {}}
              whileTap={name.trim() ? { scale: 0.97 } : {}}
              className={`px-3 sm:px-4 py-1 sm:py-2 rounded transition-colors duration-300 text-sm sm:text-md
                ${
                  name.trim()
                    ? "bg-bordo-500 hover:bg-bordo-400 text-white cursor-pointer"
                    : "bg-bordo-500/20 text-siva-400 cursor-not-allowed"
                }`}
            >
              Create
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
