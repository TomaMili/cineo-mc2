/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import Feature from "./Feature";
import { Link } from "react-router-dom";
import BlobBackground from "../../ui/BlobBackground";

const testimonials = [
  {
    name: "Alice",
    role: "Movie Buff",
    quote:
      "Cineo changed how I watch movies – the AI recs are amazing! I used to spend hours scrolling through streaming services, but now I get spot-on suggestions within seconds. The watchlist feature keeps everything organized, and I love seeing personalized collections based on my taste. Highly recommend Cineo to anyone who wants to discover hidden gems without the hassle.",
    avatar: "/alice-avatar.png",
  },
  {
    name: "Bob",
    role: "Film Critic",
    quote:
      "Finally a single place to track all my watch history. Love it! The rating system helps me remember which films I’ve enjoyed and which I didn’t. The AI recommendations feel almost psychic—every suggestion has been superb. My workflow is smoother, and I’ve found new Indie titles I never would have discovered otherwise.",
    avatar: "/bob-avatar.png",
  },
  {
    name: "Carol",
    role: "Binge Watcher",
    quote:
      "I no longer waste time searching—Cineo’s recs are spot-on! I can mark everything I’ve watched and receive curated lists every week. The mood-based suggestions have introduced me to films I wouldn’t have considered before, and now my watch parties are legendary. It’s like having a personal film festival in my living room!",
    avatar: "/carol-avatar.png",
  },
  {
    name: "David",
    role: "Casual Viewer",
    quote:
      "Cineo makes movie nights so much easier. I’m not a hardcore cinephile, but I still want good recommendations—this app delivers. The interface is clean and intuitive, and I love that I can download posters and track films offline. The AI learning curve is super smooth; I barely had to rate anything before it knew what I liked.",
    avatar: "/david-avatar.png",
  },
  {
    name: "Emma",
    role: "Documentary Fan",
    quote:
      "As someone obsessed with documentaries, Cineo’s recommendations are incredible. It picked up on my interest in nature films and suggested titles I’d never heard of. I especially like the custom dashboards—seeing my watch statistics laid out is both fun and motivating. This app is a must for anyone serious about film discovery.",
    avatar: "/emma-avatar.png",
  },
  {
    name: "Frank",
    role: "Weekend CEO",
    quote:
      "Between work and family, I need a quick way to find the right movie. Cineo’s watchlists let me save films I want to see, and the AI does the heavy lifting by suggesting the perfect pick for a relaxed Saturday. The profile achievements keep things fun—I’m already chasing my next badge. This app is a game changer for busy people.",
    avatar: "/frank-avatar.png",
  },
  {
    name: "Grace",
    role: "Indie Aficionado",
    quote:
      "I thought I knew all the indie flicks, but Cineo proved me wrong. The AI recommended an underground French film that blew me away. Tracking every festival release has never been easier with Cineo’s platform. The community features and collaborative watchlists are a great bonus. I’ll never go back to my old systems of pen-and-paper lists.",
    avatar: "/grace-avatar.png",
  },
  {
    name: "Henry",
    role: "Family Planner",
    quote:
      "Movie nights with my kids used to be a chore—now they’re a joy. Cineo’s family profiles let me switch between everyone’s tastes in a click. The kids love ticking off their watched lists, and the AI always throws in fun animated picks that surprise us. It’s helped us bond more as a family. Five stars all around!",
    avatar: "/henry-avatar.png",
  },
  {
    name: "Isabella",
    role: "Retro Enthusiast",
    quote:
      "I’m a sucker for classic films, and Cineo’s recommendation engine nails it every time. I discovered a restored 1950s noir that was streaming exclusively overseas—mind blown. The nostalgia badge system is adorable, and sharing my retro watchlist with friends has sparked some great discussions. This app feels like a cinematic time machine.",
    avatar: "/carol-avatar.png",
  },
  {
    name: "Jack",
    role: "Horror Buff",
    quote:
      "Horror recommendations by Cineo are terrifyingly accurate—in the best way. It suggested a Japanese horror gem that had me hiding behind my pillow. Tracking every ‘jump scare’ film felt like a badge of honor, and the midnight watch parties we host now are always packed. Cineo has officially become my go-to for anything scary on screen.",
    avatar: "/jack-avatar.png",
  },
];

export default function TestimonialsSection() {
  const [ref, emblaApi] = useEmblaCarousel({
    align: "center",
    startIndex: 3,
    dragFree: true,
  });

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi]);
  const [mouseDrag, setMouseDrag] = useState(false);

  return (
    <Feature>
      <section className="mt-10 min-h-screen relative overflow-visible z-10">
        <BlobBackground />
        <div className="w-full mx-auto px-6 text-center">
          <div className="flex justify-between items-center px-10 mb-10 ">
            <h2 className="text-6xl font-medium text-white text-left">
              What Our Users Say?
            </h2>
            <Link
              to="/info"
              className="bg-white text-lg text-bordo-400 uppercase font-bold px-10 py-4 mb-10 h-full rounded-4xl transition-all duration-300 hover:bg-bordo-600 hover:text-white"
            >
              Join Cineo
            </Link>
          </div>
          <div ref={ref} className="overflow-hidden">
            <motion.div
              className="flex gap-6 pb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`flex-none z-10 w-5/13 bg-siva-300/10 p-10 rounded-[50px] select-none ${
                    mouseDrag ? "cursor-grabbing" : "cursor-grab"
                  }`}
                  onMouseDown={() => setMouseDrag(true)}
                  onMouseUp={() => setMouseDrag(false)}
                >
                  <div className="flex flex-col justify-between h-full">
                    <p className="text-gray-300 font-light text-2xl mb-4">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center space-x-3">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-16 h-16 rounded-full"
                      />
                      <div className="text-left">
                        <p className="text-white font-semibold text-xl">
                          {t.name}
                        </p>
                        <p className="text-gray-500 text-lg">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </Feature>
  );
}
