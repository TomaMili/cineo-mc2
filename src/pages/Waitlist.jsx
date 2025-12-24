// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Icon } from "@iconify-icon/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import RotatingText from "../ui/RotatingText";
import SplitTextReveal from "../ui/SplitTextReveal";
import WaitlistCard from "../features/waitlist/WaitlistCard";
import ProblemStatementSection from "../features/landing/ProblemStatementSection";
import SolutionSection from "../features/landing/SolutionSection";
import IntegrationsSection from "../features/landing/IntegrationsSection";
import WatchTogetherSection from "../features/landing/WatchTogetherSection";
import UISneakPeekSection from "../features/landing/UISneakPeekSection";
import FAQSection from "../features/landing/FAQSection";
import FooterLanding from "../features/landing/FooterLanding";
import supabase from "../services/supabase";
import { trackWaitlistSignup } from "../lib/analytics";
import { LiquidChrome } from "../components/LiquidChrome";

// Meta Pixel & TikTok Pixel event tracking helper
const trackPixelEvent = (eventName) => {
  // Meta Pixel
  if (typeof window !== "undefined" && typeof window.fbq !== "undefined") {
    window.fbq("track", eventName);
  }
  // TikTok Pixel
  if (typeof window !== "undefined" && typeof window.ttq !== "undefined") {
    window.ttq.track(eventName);
  }
};

// Match LandingPage hero animation variants
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeInUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const Waitlist = () => {
  const [heroName, setHeroName] = useState("");
  const [heroEmail, setHeroEmail] = useState("");
  const [isHeroSubmitting, setIsHeroSubmitting] = useState(false);
  const [showHeroShare, setShowHeroShare] = useState(false);
  const [heroCopied, setHeroCopied] = useState(false);
  const [heroReferralCode, setHeroReferralCode] = useState(null);

  // Fetch referral code if success but no code yet
  useEffect(() => {
    const fetchReferralCode = async () => {
      if (showHeroShare && !heroReferralCode && heroEmail) {
        const { data } = await supabase
          .from("waitlist_signups")
          .select("referral_code")
          .eq("email", heroEmail)
          .single();

        if (data?.referral_code) {
          setHeroReferralCode(data.referral_code);
        }
      }
    };

    fetchReferralCode();
  }, [showHeroShare, heroReferralCode, heroEmail]);

  const handleHeroSubmit = async (e) => {
    trackPixelEvent("Lead");
    e.preventDefault();
    setIsHeroSubmitting(true);

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const refCode = urlParams.get("ref");

      const { data, error } = await supabase
        .from("waitlist_signups")
        .insert([
          {
            email: heroEmail,
            name: heroName.trim() || null,
            referred_by: refCode && refCode !== "invite" ? refCode : null,
          },
        ])
        .select("referral_code")
        .single();

      if (error) {
        if (error.code === "23505") {
          // Email already exists
          if (heroName && heroName.trim() !== "") {
            // Update name if provided
            const { error: updateError } = await supabase
              .from("waitlist_signups")
              .update({ name: heroName.trim() })
              .eq("email", heroEmail);

            if (!updateError) {
              toast.success("Your name has been updated! 🎉");
              trackWaitlistSignup("hero_form");
            } else {
              console.error("Update error:", updateError);
              toast.error("Something went wrong, please try again.");
            }
          } else {
            toast.success("You're already on the waitlist! 🎉");
          }

          // Dohvati postojeći referral code
          const { data: existingData } = await supabase
            .from("waitlist_signups")
            .select("referral_code")
            .eq("email", heroEmail)
            .single();

          console.log(
            "Fetched existing hero referral code:",
            existingData?.referral_code
          );

          if (existingData?.referral_code) {
            setHeroReferralCode(existingData.referral_code);
          }

          setShowHeroShare(true);
          setIsHeroSubmitting(false);
          return; // Important: exit early to prevent further processing
        } else {
          throw error;
        }
      } else {
        toast.success("You've been added to the waitlist! ");
        trackWaitlistSignup("hero_form");
        trackPixelEvent("CompleteRegistration");

        // IMPORTANT: Set referral code FIRST
        if (data?.referral_code) {
          setHeroReferralCode(data.referral_code);
        }

        // Send confirmation email
        try {
          await fetch("/api/send-waitlist-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: heroEmail,
              name: heroName || null,
              referralCode: data?.referral_code,
            }),
          });
        } catch (emailError) {
          console.error("Email sending failed:", emailError);
          // Don't show error to user - email is nice-to-have
        }

        setShowHeroShare(true);
      }
    } catch (err) {
      console.error("Waitlist signup error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsHeroSubmitting(false);
    }
  };

  const shareUrl = heroReferralCode
    ? `https://cineoai.com/?ref=${heroReferralCode}`
    : `https://cineoai.com/?ref=invite`;
  const shareText =
    "Check out Cineo - AI-powered movie discovery that actually understands your taste! Join the waitlist now and get TWO MONTHS FREE at launch!";

  const handleHeroCopyLink = async () => {
    trackPixelEvent("Share");
    await navigator.clipboard.writeText(shareUrl);
    setHeroCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setHeroCopied(false), 2000);
  };

  const shareToTwitter = () => {
    trackPixelEvent("Share");
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareToLinkedIn = () => {
    trackPixelEvent("Share");
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
      "_blank"
    );
  };

  const shareToWhatsApp = () => {
    trackPixelEvent("Share");
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
      "_blank"
    );
  };

  const shareToFacebook = () => {
    trackPixelEvent("Share");
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      "_blank"
    );
  };

  const shareToInstagram = () => {
    trackPixelEvent("Share");
    navigator.clipboard.writeText(shareUrl);
    window.open("https://www.instagram.com/cineo_app/", "_blank");
    toast.success("Link copied! Paste it in your Instagram story or bio 📸");
  };

  return (
    <>
      <Helmet>
        <title>Cineo – your personal AI movie library</title>
        <meta
          name="description"
          content="Cineo is your personal AI movie library. Stop scrolling and start watching – track what you’ve watched, save what you want to watch and get personalised AI movie recommendations across all platforms."
        />
        <meta
          name="keywords"
          content="Cineo, movie app, AI recommendations, watchlist, films, streaming, smart film collection, movie tracker, movie organizer, personalized suggestions"
        />
        <meta
          property="og:title"
          content="Cineo – your personal AI movie library"
        />
        <meta
          property="og:description"
          content="Searching for the right movie doesn’t have to be tiring. Cineo helps you track, organise and discover films with AI-powered recommendations."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://cineo-mc2.vercel.app/waitlist"
        />
      </Helmet>
      <main className="w-full">
        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="relative w-full min-h-[100vh] bg-cover bg-center flex flex-col justify-center items-center will-change-transform"
          style={{
            // backgroundImage: "url('/bg-image.jpg')",
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
        >
          <div className="absolute inset-0 bg-bordo-700 pointer-events-none h-full">
            <LiquidChrome
              baseColor={[0.1, 0, 0]}
              speed={0.05}
              amplitude={0.4}
              interactive={false}
            />
          </div>
          <motion.div variants={fadeInUp} className="text-center z-10">
            <img
              src="/logo-cineo.svg"
              className="mx-auto w-full px-12 md:px-10"
              alt="Cineo Logo"
            />
          </motion.div>
          {/* Eyebrow tagline */}
          <motion.p
            variants={fadeInUp}
            className="mt-4 md:mt-6 text-xs md:text-md uppercase tracking-[0.25em] text-bordo-400 text-center px-4 mb-2 md:mb-3"
          >
            <SplitTextReveal text="Smart Film Collection" />
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="text-3xl md:text-6xl font-bold mb-3 md:mb-4 leading-tight tracking-tight text-center justify-center px-4 text-siva-100 min-h-[80px] md:min-h-[140px] flex items-center"
          >
            <RotatingText
              texts={[
                "Stop scrolling. Start watching.",
                "Enjoy movie nights again.",
              ]}
              rotationInterval={5000}
              staggerDuration={0.02}
              splitBy="words"
              mainClassName="justify-center items-center text-center"
            />
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-base md:text-xl text-slate-200 max-w-xl md:max-w-2xl mx-auto font-light px-6 md:px-4 text-center leading-relaxed mb-4 z-10 relative"
          >
            Because choosing a movie shouldn't take longer than watching one
            <span className="hidden md:inline">
              <br />
              Follow all your movies, ones you've already watched or want to
              watch, mark favourites and get personalised suggestions across all
              platforms.
            </span>
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-2 md:mt-3 w-full max-w-xl mx-auto px-6 md:px-4 z-10 relative"
          >
            {!showHeroShare ? (
              <form onSubmit={handleHeroSubmit} className="w-full">
                <div className="flex flex-col md:flex-row gap-2.5 md:gap-3 items-stretch">
                  <input
                    type="text"
                    placeholder="Your name (optional)"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                    disabled={isHeroSubmitting}
                    className="flex-1 px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg bg-siva-900/70 backdrop-blur-sm border border-siva-700 text-white placeholder-siva-400 focus:outline-none focus:border-bordo-500 transition-colors disabled:opacity-50"
                  />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={heroEmail}
                    onChange={(e) => setHeroEmail(e.target.value)}
                    required
                    disabled={isHeroSubmitting}
                    className="flex-1 px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg bg-siva-900/70 backdrop-blur-sm border border-siva-700 text-white placeholder-siva-400 focus:outline-none focus:border-bordo-500 transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isHeroSubmitting}
                    className="w-full md:w-auto px-4 py-2.5 bg-bordo-500 hover:bg-bordo-400 text-white font-semibold rounded-lg shadow-lg shadow-bordo-500/30 hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer text-sm"
                  >
                    {isHeroSubmitting ? "Joining..." : "Join waitlist"}
                  </button>
                </div>
              </form>
            ) : showHeroShare ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full"
              >
                <div className="bg-gradient-to-r from-bordo-500/20 to-purple-500/20 border border-bordo-500/40 rounded-xl p-3 mb-3">
                  <p className="text-white text-center font-bold text-base mb-0.5">
                    You're on the list! 🎉
                  </p>
                  <p className="text-siva-300 text-center text-xs">
                    Share Cineo and both get{" "}
                    <span className="text-siva-100 font-bold">
                      TWO MONTHS FREE
                    </span>{" "}
                    at launch!
                  </p>
                </div>

                {heroReferralCode && (
                  <div className="flex gap-2 justify-center flex-wrap">
                    {/* Copy link button */}
                    <button
                      onClick={handleHeroCopyLink}
                      className="bg-siva-800/80 hover:bg-siva-700/80 border border-siva-600 text-white px-4 py-2 rounded-lg transition-all hover:scale-105 flex items-center justify-center cursor-pointer gap-1.5"
                    >
                      {heroCopied ? (
                        <Icon icon="mdi:check" width="18" height="18" />
                      ) : (
                        <Icon icon="mdi:link-variant" width="18" height="18" />
                      )}
                    </button>

                    {/* Social share buttons */}
                    <button
                      onClick={shareToTwitter}
                      className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white px-4 py-2 rounded-lg transition-all hover:scale-105 flex items-center justify-center cursor-pointer"
                      aria-label="Share on Twitter"
                    >
                      <Icon icon="prime:twitter" width="18" height="18" />
                    </button>

                    <button
                      onClick={shareToFacebook}
                      className="bg-[#1877F2] hover:bg-[#145dbf] text-white px-4 py-2 rounded-lg transition-all hover:scale-105 flex items-center justify-center cursor-pointer"
                      aria-label="Share on Facebook"
                    >
                      <Icon icon="mdi:facebook" width="18" height="18" />
                    </button>

                    <button
                      onClick={shareToInstagram}
                      className="bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FD1D1D] hover:opacity-90 text-white px-4 py-2 rounded-lg transition-all hover:scale-105 flex items-center justify-center cursor-pointer"
                      aria-label="Share on Instagram"
                    >
                      <Icon icon="mdi:instagram" width="18" height="18" />
                    </button>

                    <button
                      onClick={shareToLinkedIn}
                      className="bg-[#0A66C2] hover:bg-[#004182] text-white px-4 py-2 rounded-lg transition-all hover:scale-105 flex items-center justify-center cursor-pointer"
                      aria-label="Share on LinkedIn"
                    >
                      <Icon icon="mdi:linkedin" width="18" height="18" />
                    </button>

                    <button
                      onClick={shareToWhatsApp}
                      className="bg-[#25D366] hover:bg-[#20BA5A] text-white px-4 py-2 rounded-lg transition-all hover:scale-105 flex items-center justify-center cursor-pointer"
                      aria-label="Share on WhatsApp"
                    >
                      <Icon icon="mdi:whatsapp" width="18" height="18" />
                    </button>
                  </div>
                )}
              </motion.div>
            ) : null}

            <motion.div
              variants={fadeInUp}
              className="mt-5 md:mt-6 flex flex-col items-center"
            >
              <button
                onClick={() => {
                  const problemSection =
                    document.getElementById("problem-section");
                  problemSection?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="text-siva-100 hover:text-white font-medium text-sm tracking-wide cursor-pointer transition-colors duration-200"
              >
                Learn more
              </button>
              <Icon
                icon="mdi:chevron-down"
                className="w-5 h-5 text-siva-100 hover:text-white transition-colors duration-200"
              />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Landing sections - conversion optimized flow */}
        <ProblemStatementSection />
        <SolutionSection />
        <IntegrationsSection />
        <WatchTogetherSection />
        <UISneakPeekSection />

        {/* Waitlist signup section */}
        <section
          id="waitlist-signup"
          className="relative w-full md:max-w-4xl mx-auto px-4 md:px-8 pt-20 pb-20 flex flex-col items-center text-center"
        >
          <h2 className="text-2xl lg:text-6xl font-medium text-white mb-3">
            Get early access
          </h2>
          <div className="flex items-center justify-center gap-2 text-siva-400 text-sm mb-8">
            <Icon icon="mdi:lock" className="w-4 h-4" />
            <span>Your privacy matters — we never sell your data</span>
          </div>
          <p className="text-gray-400 text-lg lg:text-md font-light mb-8">
            Drop your email or simply register your interest and be first in
            line when we launch.
          </p>
          <div className="w-full">
            <WaitlistCard />
          </div>
        </section>

        <FAQSection />
        <FooterLanding />
      </main>
    </>
  );
};

export default Waitlist;
