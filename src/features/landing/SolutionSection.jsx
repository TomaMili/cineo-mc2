import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlobBackground from "../../ui/BlobBackground";
import CurvedLoop from "../../components/CurvedLoop";
import Feature from "./Feature";
import { Icon } from "@iconify-icon/react";

const features = [
  {
    title: "AI finds your perfect movie",
    description:
      "No more endless scrolling. \nOur AI learns your unique taste from ratings and watch history, suggesting movies you'll actually love—in seconds, not hours.",
    image: "/article-4.png",
  },
  {
    title: "Your Movie DNA & Complete Library",
    description:
      "Build your personal taste profile. \nTrack watched movies, organize watchlists, rate films, and watch your Movie DNA evolve — feeding even better recommendations over time. \nEverything in one beautiful place.",
    image: "/article-2.png",
  },
  {
    title: "Complete Movie Information",
    description:
      "Everything you need to know.\nDetailed cast info, runtime, director, ratings, streaming platforms, and where to watch—all in one beautifully organized view.",
    image: "/article-5.png",
  },
];

export default function SolutionSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Feature>
      <section className="py-24 bg-siva-800 relative overflow-hidden">
        <BlobBackground />

        <div className="max-w-full mx-auto px-6  relative z-10">
          {/* CurvedLoop full width */}
          <div className="mb-16 w-full">
            <CurvedLoop
              marqueeText="Take Control of Your Movie Experience ✦"
              speed={1}
              curveAmount={0}
              interactive={true}
              className="fill-white"
              highlightText="Take Control"
              highlightClassName="fill-bordo-400 font-bold"
            />
          </div>

          {/* Feature Tabs */}
          <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-12 items-center">
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
                                ? "text-white text-2xl lg:text-4xl font-semibold"
                                : "text-gray-300 text-2xl lg:text-3xl"
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
                              <p className="text-siva-300 font-light text-xl lg:text-3xl pt-2 whitespace-pre-line">
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

            <div className="w-full lg:w-4/7 flex items-center justify-center overflow-hidden relative z-10 hover:scale-[1.12] transition-transform duration-300">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[500px] h-[500px] bg-black/60 rounded-full blur-[120px] "></div>
              </div>
              <img
                src={features[openIndex].image}
                alt={features[openIndex].title}
                className="w-full rounded-xl relative z-10"
              />
            </div>
          </div>
        </div>
      </section>
    </Feature>
  );
}
