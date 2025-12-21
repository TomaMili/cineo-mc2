import { motion } from "framer-motion";
import Feature from "./Feature";
import { Icon } from "@iconify-icon/react";
import { GlowingCards, GlowingCard } from "../../components/GlowingCards";
import BlobBackground from "../../ui/BlobBackground";

export default function IntegrationsSection() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Top streaming providers with logos
  const streamingProviders = [
    {
      id: "8",
      name: "Netflix",
      logo: "https://image.tmdb.org/t/p/original/9A1JSVmSxsyaBK4SUFsYVqbAYfW.jpg",
    },
    {
      id: "384",
      name: "HBO Max",
      logo: "https://image.tmdb.org/t/p/original/Ajqyt5aNxNGjmF9uOfxArGrdf3X.jpg",
    },
    {
      id: "337",
      name: "Disney+",
      logo: "https://image.tmdb.org/t/p/original/7rwgEs15tFwyR9NPQ5vpzxTj19Q.jpg",
    },
    {
      id: "350",
      name: "Apple TV+",
      logo: "https://image.tmdb.org/t/p/original/6uhKBfmtzFqOcLousHwZuzcrScK.jpg",
    },
    {
      id: "119",
      name: "Prime Video",
      logo: "https://image.tmdb.org/t/p/original/emthp39XA2YScoYL1p0sdbAH2WA.jpg",
    },
  ];

  return (
    <Feature>
      <section className="py-24 bg-siva-800 relative">
        {/* iOS FIX: Removed overflow-hidden */}
        <BlobBackground />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          {/* Header with status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-6">
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-semibold text-white">
                Integrations
              </h2>
              <span className="px-4 py-1.5 text-xs md:text-sm font-light rounded-full tracking-wide">
                Coming Soon
              </span>
            </div>
            <p className="text-lg md:text-2xl lg:text-3xl text-siva-200 font-light mb-4 px-4">
              Works with everything you already watch
            </p>
            <p className="text-base md:text-lg text-siva-300 font-light max-w-3xl mx-auto px-4">
              Cineo integrations are currently in development. Join the waitlist
              to be part of early testing.
            </p>
          </motion.div>

          {/* GlowingCards container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <GlowingCards
              enableGlow={true}
              glowRadius={20}
              glowOpacity={0.8}
              gap="2rem"
              className="mb-12 md:mb-16"
            >
              {/* Card 1: Streaming Services */}
              <motion.div variants={cardVariants} className="flex-1 flex">
                <GlowingCard
                  glowColor="#f59e0b"
                  className="h-full flex flex-col border-2 border-amber-900/40 hover:border-amber-500/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-300"
                >
                  {/* Title with inline badge */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      Streaming Services
                    </h3>
                    <span className="text-xs font-medium  text-amber-300 whitespace-nowrap">
                      Planned
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-base text-siva-200  mb-6 leading-relaxed">
                    See where any movie is available, get notified when
                    watchlist titles arrive on your platforms.
                  </p>

                  {/* Streaming Logos */}
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    {streamingProviders.map((provider, idx) => (
                      <motion.div
                        key={provider.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.1 }}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden bg-white/5 hover:bg-white/10 transition-all "
                        title={provider.name}
                      >
                        <img
                          src={provider.logo}
                          alt={provider.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                    <span className="text-siva-400 text-sm font-light">
                      + more
                    </span>
                  </div>

                  {/* Development note - at bottom */}
                  <div className="mt-auto pt-4 border-t border-siva-700/30">
                    <p className="text-[10px] md:text-xs text-siva-500 font-extralight">
                      Streaming integrations are currently in development
                    </p>
                  </div>
                </GlowingCard>
              </motion.div>

              {/* Card 2: Cinemas (B2B) */}
              <motion.div variants={cardVariants} className="flex-1 flex">
                <GlowingCard
                  glowColor="#3b82f6"
                  className="h-full flex flex-col border-2 border-blue-900/40 hover:border-blue-500/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300"
                >
                  {/* Title with inline badge */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      Cinema Partners
                    </h3>
                    <span className="text-xs font-medium  text-blue-300 whitespace-nowrap">
                      Coming Soon
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-base text-siva-200 mb-6 leading-relaxed">
                    Planned integrations with theaters. See showtimes and get
                    notified about new releases once live.
                  </p>

                  {/* B2B note - at bottom */}
                  <div className="mt-auto pt-4 border-t border-siva-700/30">
                    <p className="text-[10px] md:text-xs text-siva-500  font-extralight">
                      Partnerships in progress
                    </p>
                  </div>
                </GlowingCard>
              </motion.div>

              {/* Card 3: TV & Devices */}
              <motion.div variants={cardVariants} className="flex-1 flex">
                <GlowingCard
                  glowColor="#a855f7"
                  className="h-full flex flex-col border-2 border-purple-900/40 hover:border-purple-500/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300"
                >
                  {/* Title with inline badge */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      TV & Devices
                    </h3>
                    <span className="text-xs font-medium   text-purple-300 whitespace-nowrap">
                      Future
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-base text-siva-200 t mb-6 leading-relaxed">
                    Future integrations with TV providers, smart TV apps, and
                    broadcast schedules.
                  </p>

                  {/* Platforms */}
                  <div className="space-y-2 text-sm text-siva-400 mb-6">
                    {[
                      { icon: "mdi:television", text: "Smart TV apps" },
                      {
                        icon: "mdi:broadcast",
                        text: "TV broadcast schedules",
                      },
                      { icon: "mdi:devices", text: "Multi-device sync" },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <Icon
                          icon={item.icon}
                          className="w-4 h-4 text-bordo-400 flex-shrink-0"
                        />
                        <span>{item.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Roadmap note - at bottom */}
                  <div className="mt-auto pt-4 border-t border-siva-700/30">
                    <p className="text-[10px] md:text-xs text-siva-500 font-extralight">
                      Part of future roadmap
                    </p>
                  </div>
                </GlowingCard>
              </motion.div>
            </GlowingCards>
          </motion.div>

          {/* Bottom CTA with animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                document
                  .getElementById("waitlist-signup")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" })
              }
              className="inline-flex items-center gap-3 bg-bordo-500/10 border border-bordo-500/30 rounded-full px-6 py-3 hover:bg-bordo-500/20 transition-all cursor-pointer"
            >
              <Icon
                icon="mdi:bell-outline"
                className="w-5 h-5 text-bordo-400"
              />
              <span className="text-white font-medium text-sm md:text-base">
                Join the waitlist to get notified as integrations launch
              </span>
              <Icon
                icon="raphael:arrowdown mt-1"
                className="w-5 h-5 text-bordo-400"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Feature>
  );
}
