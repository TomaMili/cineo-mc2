import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    title: "Discover new movies to watch",
    description:
      "Browse hand-picked collections, trending titles, and hidden gems—curated just for your taste.",
    image: "/article-1.png",
  },
  {
    title: "Add them to your watchlists",
    description:
      "Save upcoming releases or classic favorites to your personal watchlists so you never lose track.",
    image: "/article-2.png",
  },
  {
    title: "Track your movie DNA",
    description:
      "Log what you’ve seen, rate each film, and see your unique taste profile evolve over time.",
    image: "/article-1.png",
  },
  {
    title: "Get AI driven recommendations",
    description:
      "Let our AI analyze your ratings and watch history to suggest the perfect next movie for you.",
    image: "/article-2.png",
  },
];

export default function FeatureTabsSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mt-40 h-screen">
      <div className="relative block mb-10 w-fit mx-auto">
        <h2 className="text-7xl font-regular text-white text-center mx-auto">
          Take Control of Your Movie Experience
        </h2>

        <img
          src="/brush-stroke-lines-collection.PNG"
          alt="doodle"
          className="absolute -bottom-16 -left-24 w-60 rotate-195"
        />
      </div>

      <section
        className="text-gray-300 pt-38"
        style={{ minHeight: "400px" }} // lock minimum height
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Column */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-4">
              {features.map((feat, idx) => {
                const isOpen = idx === openIndex;
                return (
                  <div key={idx} className="flex py-2">
                    {/* indicator bar */}
                    <div
                      className={`w-0.5 mr-4 mt-1 transition-all duration-0 ${
                        isOpen ? "bg-bordo-500 h-full" : "bg-gray-600 h-6"
                      }`}
                    />
                    <div className="flex-1">
                      {/* heading */}
                      <button
                        onClick={() => setOpenIndex(idx)}
                        className="w-full text-left flex items-center space-x-0 focus:outline-none cursor-pointer"
                      >
                        <span
                          className={`transition-all duration-200 ${
                            isOpen
                              ? "text-white text-4xl font-semibold"
                              : "text-gray-300 text-3xl"
                          }`}
                        >
                          {feat.title}
                        </span>
                      </button>

                      {/* description panel */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="text-gray-400 font-light text-2xl pt-2">
                              {feat.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <img
              src={features[openIndex].image}
              alt={features[openIndex].title}
              className="w-full max-w-xl rounded-md shadow-[0_0_25px_10px_rgba(255,255,255,0.12)]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
