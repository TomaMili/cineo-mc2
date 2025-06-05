/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Feature from "./Feature";

export default function WatchTogetherSection() {
  return (
    <Feature className="bg-black py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 text-center mb-50 lg:mt-0 mt-50 relative"
      >
        <div className="mb-20 relative">
          <h2 className="text-3xl lg:text-6xl font-medium text-white lg:absolute bottom-24 text-center w-full">
            Watch Together
          </h2>
          <p className="text-gray-400 mb-6 text-lg lg:text-3xl font-light lg:absolute bottom-6 w-full text-center">
            Plan movie nights with friends and let our AI suggest titles
            everyone will enjoy.
          </p>
          <img
            src="/couch-party.png"
            alt="Group watching"
            className="w-full rounded-lg lg:shadow-[0_0_35px_10px_rgba(255,255,255,0.1)] shadow-[0_0_15px_1px_rgba(255,255,255,0.1)] mx-auto "
          />
        </div>
        <Link
          to="/info"
          className="bg-white text-lg text-bordo-400 uppercase font-bold px-10 py-5 mb-10 rounded-4xl transition-all duration-300 hover:bg-bordo-600 hover:text-white"
        >
          Join Cineo
        </Link>
      </motion.div>
    </Feature>
  );
}
