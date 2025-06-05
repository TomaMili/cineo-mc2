/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "@iconify-icon/react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.35 } },
};
const fadeInUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Hero() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="relative w-full h-screen bg-cover bg-center flex flex-col justify-center items-center"
      style={{ backgroundImage: "url('/bg-image.jpg')" }}
    >
      <motion.div variants={fadeInUp} className="text-center z-10">
        <img
          src="/logo-cineo.svg"
          className="mx-auto w-full px-10"
          alt="Cineo Logo"
        />
      </motion.div>

      <motion.h1
        variants={fadeInUp}
        className="mt-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mx-auto text-center text-white leading-tight px-4"
      >
        Your personal AI movie library
      </motion.h1>

      <motion.p
        variants={fadeInUp}
        className="mt-6 max-w-xl mx-auto text-center font-light text-gray-300 text-lg sm:text-xl lg:text-3xl px-4"
      >
        Follow all your movies—ones that you already watched or some that you
        want to watch—mark your favourites and get personalised suggestions
      </motion.p>

      <motion.div
        variants={fadeInUp}
        className="mt-8 flex flex-col sm:flex-row gap-4 justify-center z-10 px-4"
      >
        <Link
          to="/info"
          className="bg-white text-center hover:bg-bordo-400 px-6 py-3 rounded-full tracking-wider text-base sm:text-lg font-bold text-bordo-400 hover:text-white transition duration-300"
        >
          GET STARTED
        </Link>
        <Link
          to="/login"
          className="bg-bordo-500 text-center hover:bg-bordo-400 px-6 sm:px-10 py-3 rounded-full tracking-wider text-base sm:text-lg font-semibold text-white transition duration-300"
        >
          LOG IN
        </Link>
      </motion.div>

      <button
        onClick={() =>
          document
            .getElementById("track-section")
            .scrollIntoView({ behavior: "smooth", block: "center" })
        }
        className="absolute bottom-6 cursor-pointer z-10"
      >
        <Icon
          icon="formkit:arrowdown"
          width={32}
          height={32}
          className="animate-bounce text-white bg-black/50 rounded-full p-2"
        />
      </button>
    </motion.section>
  );
}
