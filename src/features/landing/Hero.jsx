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
      <motion.div variants={fadeInUp} className="text-center">
        <img src="/logo-cineo.svg" className="mx-auto w-182" />
      </motion.div>
      <motion.h1
        variants={fadeInUp}
        className="mt-20 text-6xl font-medium mx-auto text-center"
      >
        Your personal AI movie library
      </motion.h1>
      <motion.p
        variants={fadeInUp}
        className="mt-8 max-w-3xl mx-auto text-center font-light text-gray-300 text-3xl "
      >
        Follow all your movies, ones that you already watched or some that you
        want to watch, mark your favourites and get personalised suggestions
      </motion.p>
      <motion.div variants={fadeInUp} className="mt-20">
        <Link
          to="/info"
          className="z-50 relative mt-18 bg-white hover:bg-bordo-400 px-10 py-5 rounded-4xl tracking-wider text-lg font-bold transition-all text-bordo-400 hover:text-white duration-300 mr-5"
        >
          GET STARTED
        </Link>
        <Link
          to="/login"
          className="z-50 relative mt-18 bg-bordo-500 hover:bg-bordo-400 px-16 py-5 rounded-4xl tracking-wider text-lg font-semibold transition-all duration-300 ml-5"
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
        className="relative top-28 cursor-pointer"
      >
        <Icon
          icon="formkit:arrowdown"
          width={24}
          height={24}
          className="animate-bounce items-center justify-center rounded-full bg-white p-2 dark:bg-white/5"
        />
      </button>
    </motion.section>
  );
}
