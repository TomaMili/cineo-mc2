/* eslint-disable no-unused-vars */
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export default function Feature({ children, background }) {
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: "-200px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`bg-[url(${background})]`}
    >
      {children}
    </motion.div>
  );
}
