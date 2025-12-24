import { motion } from "framer-motion";
import Feature from "./Feature";
import { Icon } from "@iconify-icon/react";

export default function WatchTogetherSection() {
  const steps = [
    {
      number: "1",
      title: "Create a Room",
      description: "Set up your movie night in seconds.",
      image: "2.png",
    },
    {
      number: "2",
      title: "Invite Friends",
      description: "Share a link or QR code — no app needed.",
      image: "3.png",
    },
    {
      number: "3",
      title: "Get Your Pick",
      description: "AI finds the perfect movie for everyone.",
      image: "4.png",
    },
  ];

  return (
    <Feature>
      <section className="py-16 md:py-24 bg-gradient-to-b from-siva-800 via-black to-siva-800 relative overflow-hidden">
        {/* Ambient lighting */}
        <div className="hidden md:block absolute top-1/4 left-0 w-[400px] h-[400px] bg-bordo-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="hidden md:block absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-bordo-500/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white mb-4">
              Watch Together
            </h2>
            <p className="text-lg md:text-xl text-siva-300 font-light max-w-xl mx-auto">
              End the "what should we watch?" debate forever.
            </p>
          </div>

          {/* 3 Steps - Zigzag Layout */}
          <div className="space-y-12 md:space-y-20 mb-16">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-6 md:gap-10 lg:gap-14`}
              >
                {/* Image */}
                <div className="w-full md:w-2/5">
                  <div className="relative group">
                    {/* Subtle glow on hover */}
                    <div className="absolute -inset-2 bg-bordo-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <img
                      src={step.image}
                      alt={step.title}
                      className="relative w-full rounded-xl shadow-2xl shadow-black/40"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="w-full md:w-2/5 text-center md:text-left">
                  <div className="bg-gradient-to-br from-siva-800/95 to-bordo-800/50 border border-bordo-700 rounded-xl p-6 md:p-8 hover:border-bordo-500/40 hover:shadow-[0_0_30px_rgba(185,28,28,0.15)] transition-all duration-300">
                    {/* Step indicator */}
                    <div className="flex items-center gap-3 mb-3 justify-center md:justify-start">
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-bordo-500 text-white text-lg font-bold shadow-lg shadow-bordo-500/30">
                        {step.number}
                      </span>
                      <div className="h-px w-8 bg-gradient-to-r from-bordo-500 to-transparent hidden md:block" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base md:text-lg text-siva-300 font-light">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
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
              <span>Get early access</span>
              <Icon icon="raphael:arrowdown" className="mt-1 w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </section>
    </Feature>
  );
}
