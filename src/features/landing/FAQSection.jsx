import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify-icon/react";
import Feature from "./Feature";

const faqs = [
  {
    question: "When will Cineo launch?",
    answer:
      "We're aiming for early 2026. Join the waitlist to be the first to know and get early access!",
  },
  {
    question: "Which streaming platforms do you support?",
    answer:
      "All major platforms: Netflix, HBO Max, Disney+, Prime Video, Apple TV+, and more.",
    // Plus Croatian cinema chains like Cinestar, Blitz, and Arena.",
  },
  {
    question: "Is Cineo free?",
    answer:
      "We'll have a free tier with core features, and a premium tier for power users. Early adopters get special perks!",
  },
  {
    question: "How does the AI work?",
    answer:
      "Our AI analyzes your watch history, ratings, and preferences to learn your unique taste. The more you use Cineo, the better it gets at recommending movies you'll love.",
  },
  {
    question: "Will my data be private?",
    answer:
      "Absolutely. Your data is encrypted and never sold to third parties. We use it only to improve your experience.",
  },
  {
    question: "Can I use it on mobile?",
    answer:
      "Yes! Cineo works on web, iOS, and Android. Your watchlists sync seamlessly across all devices.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <Feature>
      <section className="py-12 md:py-16 bg-siva-800">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-8 md:mb-10 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="flex py-2">
                <div
                  className={`w-0.5 mr-3 md:mr-4 mt-1 transition-all duration-200 ${
                    openIndex === idx
                      ? "bg-bordo-400 h-full"
                      : "bg-bordo-400 h-6"
                  }`}
                />
                <div className="flex-1">
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full text-left flex items-center justify-between focus:outline-none cursor-pointer"
                  >
                    <span
                      className={`transition-all duration-200 ${
                        openIndex === idx
                          ? "text-white text-xl md:text-2xl font-semibold"
                          : "text-gray-300 text-lg md:text-xl"
                      }`}
                    >
                      {faq.question}
                    </span>
                    {openIndex !== idx && (
                      <Icon
                        icon="iconamoon:arrow-down-2"
                        width={20}
                        height={20}
                        className="ml-2 flex-shrink-0"
                      />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-siva-300 font-light text-base md:text-lg pt-2">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Feature>
  );
}
