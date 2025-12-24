import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Mail, Gift, Link2 } from "lucide-react";
import { Icon } from "@iconify-icon/react";
import toast from "react-hot-toast";
import supabase from "../../services/supabase";
import { StarBorder } from "../../components/StarBorder";
import { trackWaitlistSignup } from "../../lib/analytics";

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

const WaitlistCard = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [referralCode, setReferralCode] = useState(null);

  // Fetch referral code if success but no code yet
  useEffect(() => {
    const fetchReferralCode = async () => {
      if (isSuccess && !referralCode && email) {
        const { data } = await supabase
          .from("waitlist_signups")
          .select("referral_code")
          .eq("email", email)
          .single();

        if (data?.referral_code) {
          setReferralCode(data.referral_code);
        }
      }
    };

    fetchReferralCode();
  }, [isSuccess, referralCode, email]);

  const handleEmailSubmit = async (e) => {
    trackPixelEvent("Lead");
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Provjeri da li postoji ref parametar u URL-u
      const urlParams = new URLSearchParams(window.location.search);
      const refCode = urlParams.get("ref");

      // INSERT email + optional name + referred_by
      const { data, error } = await supabase
        .from("waitlist_signups")
        .insert([
          {
            email,
            name: name || null,
            referred_by: refCode && refCode !== "invite" ? refCode : null,
          },
        ])
        .select("referral_code")
        .single();

      if (error) {
        // 23505 = unique constraint violation (email već postoji)
        if (error.code === "23505") {
          // Ako postoji email i korisnik je unio ime, updejtiraj ga
          if (name && name.trim() !== "") {
            const { error: updateError } = await supabase
              .from("waitlist_signups")
              .update({ name: name.trim() })
              .eq("email", email);

            if (updateError) {
              console.error("Update error:", updateError);
              toast.error("Something went wrong, please try again.");
              setIsSubmitting(false);
              return;
            }
            toast.success("Your name has been updated! 🎉");
          } else {
            toast.success("You're already on the waitlist! 🎉");
          }

          // Dohvati postojeći referral code
          const { data: existingData } = await supabase
            .from("waitlist_signups")
            .select("referral_code")
            .eq("email", email)
            .single();

          console.log(
            "Fetched existing referral code:",
            existingData?.referral_code
          );

          if (existingData?.referral_code) {
            setReferralCode(existingData.referral_code);
          }

          // Show success state
          setIsSuccess(true);
          setIsSubmitting(false);
          return; // Important: exit early to prevent further processing
        } else {
          console.error(error);
          toast.error("Something went wrong, please try again.");
          setIsSubmitting(false);
          return;
        }
      } else {
        toast.success("You've been added to the waitlist! 🎉");
        trackPixelEvent("CompleteRegistration");

        // IMPORTANT: Set referral code FIRST, then success
        if (data?.referral_code) {
          setReferralCode(data.referral_code);
        }

        // Send confirmation email
        try {
          await fetch("/api/send-waitlist-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              name: name || null,
              referralCode: data?.referral_code,
            }),
          });
        } catch (emailError) {
          console.error("Email sending failed:", emailError);
          // Don't show error to user - email is nice-to-have
        }
      }

      // Track event
      trackWaitlistSignup("bottom_form");

      // Only show success if we have referral code
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const shareUrl = referralCode
    ? `https://cineoai.com/?ref=${referralCode}`
    : `https://cineoai.com/?ref=invite`;
  const shareText =
    "Check out Cineo - AI-powered movie discovery that actually understands your taste! Join the waitlist and get TWO MONTHS FREE when we launch.";

  const handleCopyLink = async () => {
    trackPixelEvent("Share");
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
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
    // Instagram doesn't have direct URL sharing, copy link and show message
    navigator.clipboard.writeText(shareUrl);
    window.open("https://www.instagram.com/cineo_app/", "_blank");
    toast.success("Link copied! Paste it in your Instagram story or bio 📸");
  };

  return (
    <StarBorder as="div" color="rgba(185, 28, 28, 1)" speed="4s" thickness={4}>
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.3, 0, 0, 1] }}
        className="p-8 md:p-10"
      >
        <div className="relative z-10">
          {!isSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="relative inline-block mb-6">
                <Mail className="w-16 h-16 text-bordo-400" />
                <div className="absolute inset-0 blur-xl bg-bordo-500/40" />
              </div>

              <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-slate-50 tracking-tight">
                Join the waitlist
              </h2>

              <p className="text-slate-300 mb-7 text-base md:text-lg font-light leading-relaxed">
                Be the first to experience Cineo when we launch.
              </p>

              {/* EMAIL + OPTIONAL NAME INPUTS */}
              <form
                onSubmit={handleEmailSubmit}
                className="w-full mx-auto space-y-4"
              >
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-siva-800/80 border border-bordo-500/40 text-siva-100 placeholder:text-siva-300 px-4 py-3 text-base rounded-lg focus:outline-none focus:border-bordo-400 focus:ring-1 focus:ring-bordo-400 transition-all"
                />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-siva-800/80 border border-bordo-500/40 text-siva-100 placeholder:text-siva-300 px-4 py-3 text-base rounded-lg focus:outline-none focus:border-bordo-400 focus:ring-1 focus:ring-bordo-400 transition-all"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-auto mx-auto cursor-pointer bg-bordo-500 hover:bg-bordo-400 disabled:opacity-70 disabled:cursor-not-allowed text-white font-medium px-7 py-3 text-base rounded-lg shadow-md shadow-bordo-500/30 transition-transform duration-200 hover:scale-[1.04] focus:outline-none focus:ring-2 focus:ring-bordo-400/60 block"
                >
                  {isSubmitting ? "Joining..." : "Join waitlist"}
                </button>
              </form>
            </motion.div>
          ) : isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative w-24 h-24 bg-bordo-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-12 h-12 text-bordo-400" />
                <div className="absolute inset-0 blur-2xl bg-bordo-500/40 rounded-full" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-slate-50 tracking-tight">
                You're on the list!
              </h2>

              <p className="text-slate-300 text-base md:text-lg font-light mb-4 leading-relaxed">
                We'll contact you as soon as we launch.
              </p>

              {/* 50% OFF Gift messaging */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-bordo-900/40 to-purple-900/20 border border-bordo-500/40 rounded-2xl p-5 mb-6 max-w-md mx-auto"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Gift className="w-5 h-5 text-bordo-400" />
                  <h3 className="text-lg font-semibold text-white">
                    Unlock your reward
                  </h3>
                </div>

                <p className="text-sm text-siva-200 mb-1 font-medium">
                  Share Cineo with friends and <strong> BOTH </strong> get
                </p>
                <p className="text-base text-white font-bold mb-3">
                  TWO MONTHS FREE
                </p>

                <p className="text-xs font-light text-siva-400">
                  No limit • Share as much as you want
                </p>
              </motion.div>

              {/* Share buttons - only show when referralCode is ready */}
              {referralCode && (
                <div className="flex flex-col gap-3 max-w-sm mx-auto">
                  {/* Copy link button */}
                  <button
                    onClick={handleCopyLink}
                    className="w-full bg-siva-800/80 hover:bg-siva-700/80 border border-siva-600 text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span className="text-base">Link copied!</span>
                      </>
                    ) : (
                      <>
                        <Link2 className="w-5 h-5" />
                        <span className="text-base">Copy invite link</span>
                      </>
                    )}
                  </button>

                  {/* Social share buttons */}
                  <div className="flex gap-2 justify-center flex-wrap">
                    <button
                      onClick={shareToTwitter}
                      className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white px-6 py-3 rounded-xl transition-all hover:scale-105 flex items-center justify-center cursor-pointer"
                      aria-label="Share on Twitter"
                    >
                      <Icon icon="prime:twitter" width="20" height="20" />
                    </button>

                    <button
                      onClick={shareToFacebook}
                      className="bg-[#1877F2] hover:bg-[#145dbf] text-white px-6 py-3 rounded-xl transition-all hover:scale-105 flex items-center justify-center cursor-pointer"
                      aria-label="Share on Facebook"
                    >
                      <Icon icon="mdi:facebook" width="20" height="20" />
                    </button>

                    <button
                      onClick={shareToInstagram}
                      className="bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FD1D1D] hover:opacity-90 text-white px-6 py-3 rounded-xl transition-all hover:scale-105 flex items-center justify-center cursor-pointer"
                      aria-label="Share on Instagram"
                    >
                      <Icon icon="mdi:instagram" width="20" height="20" />
                    </button>

                    <button
                      onClick={shareToLinkedIn}
                      className="bg-[#0A66C2] hover:bg-[#004182] text-white px-6 py-3 rounded-xl transition-all hover:scale-105 flex items-center justify-center cursor-pointer"
                      aria-label="Share on LinkedIn"
                    >
                      <Icon icon="mdi:linkedin" width="20" height="20" />
                    </button>

                    <button
                      onClick={shareToWhatsApp}
                      className="bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-3 rounded-xl transition-all hover:scale-105 flex items-center justify-center cursor-pointer"
                      aria-label="Share on WhatsApp"
                    >
                      <Icon icon="mdi:whatsapp" width="20" height="20" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ) : null}
        </div>
      </motion.div>
    </StarBorder>
  );
};

export default WaitlistCard;
