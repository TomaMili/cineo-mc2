import { Link } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import Hero from "../features/landing/Hero";
import Feature from "../features/landing/Feature";
import FeatureTabsSection from "../features/landing/FeatureTabsSection";

export default function LandingPage() {
  return (
    <main className="w-full overflow-x-hidden">
      <Hero />
      <Feature>
        {" "}
        <FeatureTabsSection />
      </Feature>
      <img
        src="/stacked-waves-haikei-1.svg"
        alt="lines"
        className="w-full rotate-180"
      />
      <img src="/stacked-waves-haikei-2.svg" alt="lines" className="w-full" />
      <img
        src="/stacked-waves-haikei-1.svg"
        alt="lines"
        className="w-full rotate-180"
      />
      {/* <section
        ref={firstSectionRef}
        className="relative bg-black bg-cover bg-center py-24 "
      >
        <div className="absolute -top-64 w-screen h-126 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-0  via-black/100 to-0 z-20" />
        </div>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 px-6">
          <img
            id="track-section"
            src="/mock-phones.png"
            alt="Mobile mock-ups"
            className="w-2/3 drop-shadow-2xl"
          />
          <div className="max-w-md lg:max-w-none">
            <h3 className="text-5xl font-medium mb-4">Track Your Movies</h3>
            <p className="leading-relaxed text-xl font-light text-siva-200">
              Keep a record of all the movies you've watched and rate them to
              help our AI understand your preferences.
            </p>
          </div>
        </div>
        <div className="absolute -bottom-62 w-screen h-126 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-0  via-black/100 to-0 z-20" />
        </div>
      </section> */}
      {/* 
      <section
        className="
          relative w-full h-[90vh] bg-[url('/bg-image-rotate.JPG')] bg-cover bg-center overflow-hidden"
      >
        <div className="max-w-6xl mx-auto h-full flex flex-col lg:flex-row-reverse items-center gap-16 px-6">
          <img
            src="/mock-desktop.png"
            alt="Desktop mock-up"
            className="w-[420px] lg:w-[460px] drop-shadow-2xl"
          />
          <div className="max-w-md lg:max-w-none">
            <h3 className="text-5xl font-medium mb-4">
              Personalized Recommendations
            </h3>
            <p className="leading-relaxed text-xl font-light text-siva-200">
              Our AI analyzes your watch history and preferences to suggest
              movies you'll love.
            </p>
          </div>
        </div>
        <div className="absolute -bottom-62 w-screen h-126 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-0  via-black/100 to-0 z-20" />
        </div>
      </section>

      <section className="w-full flex flex-col justify-center h-[130vh] bg-black  bg-cover bg-center overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center h-full mt-50">
          <img
            src="/couch-party.png"
            alt="Friends watching movies"
            className="rounded-xl shadow-xl mb-10"
          />
          <h3 className="text-5xl font-medium mb-4">Watch Together</h3>
          <p className="leading-relaxed text-xl font-light text-siva-200">
            Plan movie nights with friends and let our AI suggest movies
            everyone will enjoy.
          </p>
        </div>
      </section>

      <section
        className="
          relative bg-[url('/bg-image.jpg')] w-full  h-[40vh]   bg-cover bg-center overflow-hidden"
      >
        <div className="absolute top-0 w-screen h-126 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-black/100  to-0 z-20" />
        </div>
        <div className="felx flex-col items-center justify-center text-center h-full px-6 mt-36">
          <h3 className="relative text-3xl font-medium mb-8 z-21">
            Ready to transform your movie experience?
          </h3>
          <Link
            to="/signup"
            className="z-21 relative inline-block mx-auto bg-gray-100 text-bordo-700 hover:bg-white font-semibold px-10 py-3 rounded tracking-wider"
          >
            JOIN CINEO
          </Link>
        </div>
      </section> */}
    </main>
  );
}
