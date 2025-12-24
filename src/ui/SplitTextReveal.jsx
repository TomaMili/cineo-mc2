import { motion } from "framer-motion";

export default function SplitTextReveal({
  text,
  className = "",
  delay = 0,
  wordDelay = 0.08,
}) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + index * wordDelay,
            duration: 0.4,
            ease: "easeOut",
          }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
