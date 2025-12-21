import { motion } from "framer-motion";
import Feature from "./Feature";
import { Icon } from "@iconify-icon/react";
import StarBorder from "../../components/StarBorder";

export default function WatchTogetherSection() {
  const benefits = [
    {
      icon: "material-symbols:sync-problem-outline-rounded",
      title: "No More Group Debates",
      description:
        "AI analyzes everyone's taste and finds movies the whole group will love.",
    },
    {
      icon: "fa:group",
      title: "Smart Group Matching",
      description:
        "Our AI combines preferences and suggests the perfect movie for your crew.",
    },
    {
      icon: "mingcute:link-fill",
      title: "Share with One Link",
      description:
        "Create a session and invite friends instantly. No apps, no hassle.",
    },
  ];

  return (
    <Feature>
      <section className="py-16 md:py-24 bg-gradient-to-b from-siva-800 via-black to-siva-800 relative overflow-hidden">
        {/* Ambient lighting */}
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-bordo-500/8 rounded-full blur-[40px] pointer-events-none will-change-transform" />
        <div className="absolute bottom-1/3 right-0 w-[600px] h-[600px] bg-bordo-500/6 rounded-full blur-[40px] pointer-events-none will-change-transform" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white mb-4">
              Watch Together
            </h2>
            <p className="text-lg md:text-2xl lg:text-3xl text-siva-300 font-light max-w-3xl mx-auto px-4">
              End group indecision. Let AI find movies everyone will enjoy.
            </p>
          </div>

          {/* Hero Image */}
          <div className="mb-16">
            <img
              src="/couch-party.png"
              alt="Group watching movies together"
              className="w-3/4 max-w-2xl mx-auto rounded-2xl border border-bordo-500/20 shadow-[0_0_50px_rgba(185,28,28,0.15)]"
              loading="lazy"
            />
            {/* iOS FIX: Added lazy loading */}
          </div>

          {/* 3 Benefits - Animated Cards */}
          <div className="mb-16">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="relative group flex">
                  <StarBorder
                    speed={idx === 0 ? "4s" : idx === 1 ? "5s" : "6s"}
                  >
                    <div className="relative w-full bg-gradient-to-br from-siva-800/95 to-bordo-800/50 border border-bordo-700 rounded-xl p-8 overflow-hidden transition-all duration-300 group-hover:border-bordo-500/40 group-hover:shadow-[0_0_30px_rgba(185,28,28,0.15)] flex flex-col min-h-[320px] will-change-transform">
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-bordo-500/5 via-transparent to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10 text-center flex flex-col">
                        {/* Icon */}
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="w-24 h-24 bg-bordo-500/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-bordo-500/20 transition-colors duration-300"
                        >
                          <Icon
                            icon={benefit.icon}
                            width="64"
                            height="64"
                            className="text-bordo-400 group-hover:text-bordo-300 transition-colors duration-300"
                          />
                        </motion.div>

                        {/* Title */}
                        <h4 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-bordo-100 transition-colors duration-300">
                          {benefit.title}
                        </h4>

                        {/* Description */}
                        <p className="text-base md:text-lg text-siva-300 font-light leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </StarBorder>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative group">
              <StarBorder speed="7s">
                <div className="relative bg-gradient-to-br from-siva-900/80 to-siva-900/40 border border-bordo-500/20 rounded-2xl p-6 md:p-8 group-hover:border-bordo-500/40 transition-all duration-300">
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 text-center">
                    How it works
                  </h3>
                  <p className="text-base md:text-lg text-siva-200 font-light text-center leading-relaxed">
                    Create a room, invite friends with a link, and let Cineo's
                    AI analyze everyone's preferences to suggest movies the
                    entire group will love.
                  </p>

                  {/* Mystery element */}
                  <div className="mt-6 pt-6 border-t border-siva-700/30 text-center">
                    <p className="text-sm text-siva-300 ">
                      Join the waitlist to be the first to try Watch Together
                    </p>
                  </div>
                </div>
              </StarBorder>
            </div>
          </div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                document
                  .getElementById("waitlist-signup")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" })
              }
              className="inline-flex items-center gap-3 bg-bordo-500 hover:bg-bordo-400 text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-bordo-500/30 transition-all cursor-pointer"
            >
              <span>Get early access to Watch Together</span>
              <Icon icon="raphael:arrowdown" className="mt-1 w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </section>
    </Feature>
  );
}
