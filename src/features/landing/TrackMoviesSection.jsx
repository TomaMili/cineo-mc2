/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import Feature from "./Feature";
import { Icon } from "@iconify-icon/react";

export default function TrackMoviesSection() {
  return (
    <Feature className="bg-gray-900 py-24 relative">
      <div className="max-w-8xl mx-auto px-10 mb-50 lg:mb-100 flex flex-col-reverse lg:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2 flex justify-center"
        >
          <img
            src="/watchlist-mockup.png"
            alt="Mobile UI"
            className="w-full max-w-lg rounded-lg shadow-glow"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:w-1/2 relative"
        >
          <h2 className="text-4xl lg:text-6xl text-center lg:text-left font-medium text-white mb-4">
            Create your own watchlists
          </h2>
          <img
            src="/doodle-2.png"
            alt="doodle"
            className="absolute w-15 lg:w-20 rotate-100 -top-12 lg:-top-15 -left-8 lg:-left-20"
          />
          <p className="text-gray-400 mb-6 font-light text-xl lg:text-left text-center lg:text-3xl">
            Keep a record of all the films you’ve watched, rate them, and let AI
            learn your preferences.
          </p>
          <ul className="space-y-6 text-xl lg:text-3xl">
            <li className="flex flex-col lg:flex-row text-center lg:text-left items-center space-x-3 text-gray-300">
              <Icon
                icon={"mdi:bookmark-outline"}
                width="32"
                height="32"
                className="text-bordo-500"
              />
              <span>Add movies to your watch-later list</span>
            </li>
            <li className="flex flex-col lg:flex-row text-center lg:text-left items-center space-x-3 text-gray-300">
              <Icon
                icon={"mdi:eye-plus-outline"}
                width="32"
                height="32"
                className="text-bordo-500"
              />
              <span>Rate the movies you watched</span>
            </li>
            <li className="flex flex-col lg:flex-row text-center lg:text-left items-center space-x-3 text-gray-300">
              <Icon
                icon="proicons:library"
                width={32}
                height={32}
                className="text-bordo-500"
              />
              <span>
                Create your own collections and share them with your friends
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </Feature>
  );
}
