// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function TagButton({ label, active, onToggle, className = "" }) {
  return (
    <motion.button
      onClick={onToggle}
      animate={{
        opacity: active ? 1 : 0.8,
        backgroundColor: active
          ? "rgba(153, 27, 27, 0.5)"
          : "rgba(75, 85, 99, 0.4)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      className={`
        w-full h-10
        px-4 py-2.5 rounded-sm text-sm  cursor-pointer text-clip
        border-siva-400
        ${
          active
            ? "text-white font-medium border-bordo-400"
            : "text-siva-100 hover:border-siva-300"
        }
        ${className}
      `}
    >
      {label}
    </motion.button>
  );
}
