/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlobBackground from "../../ui/BlobBackground";
import Feature from "./Feature";
import { Icon } from "@iconify-icon/react";

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
    image: "/article-3.png",
  },
  {
    title: "Get AI driven recommendations",
    description:
      "Let our AI analyze your ratings and watch history to suggest the perfect next movie for you.",
    image: "/article-4.png",
  },
];

export default function FeatureTabsSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Feature>
      <div className="mt-40 h-screen relative overflow-visible mb-20">
        <BlobBackground />
        <div className="relative block mb-10 w-fit mx-auto z-10">
          <h2 className="text-7xl font-regular text-white text-center mx-auto">
            Take Control of Your Movie Experience
          </h2>
        </div>

        <section className="text-gray-300 pt-38 z-10">
          <div className="max-w-[1600px] mx-auto px-6 flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-3/7">
              <div className="space-y-4">
                {features.map((feat, idx) => {
                  const isOpen = idx === openIndex;
                  return (
                    <div key={idx} className="flex py-2">
                      <div
                        className={`w-0.5 mr-4 mt-1 transition-all duration-0 ${
                          isOpen ? "bg-bordo-400 h-full" : "bg-bordo-400 h-6"
                        }`}
                      />
                      <div className="flex-1">
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
                            {feat.title}{" "}
                            {isOpen || (
                              <Icon
                                icon="iconamoon:arrow-down-2"
                                width={24}
                                height={24}
                              />
                            )}
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <p className="text-gray-400 font-light text-3xl pt-2">
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

            <div className="w-full lg:w-4/7 flex items-center justify-center overflow-hidden z-10">
              <img
                src={features[openIndex].image}
                alt={features[openIndex].title}
                className="w-full rounded-xl"
              />
            </div>
          </div>
        </section>
      </div>
    </Feature>
  );
}
