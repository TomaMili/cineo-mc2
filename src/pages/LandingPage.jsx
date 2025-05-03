import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <main className="w-full overflow-x-hidden">
      <section
        className="
    relative w-full h-[90vh] overflow-hidden
    bg-[url('/bg-image.jpg')] bg-cover bg-center
    before:absolute before:inset-0
    before:bg-gradient-to-b before:from-transparent before:via-black/40 before:to-black
    before:pointer-events-none
    before:z-0            
  "
      >
        <Link
          to="/login"
          className="absolute right-4 top-6 sm:right-10 sm:top-8
               bg-bordo-500 hover:bg-bordo-400 text-xs font-semibold px-6 py-2 rounded cursor-pointer z-20"
        >
          LOGIN
        </Link>

        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">
          <img src="/logo-cineo.svg" alt="CINEO" className="w-1/3 mb-10" />

          <h2 className="mt-6 mb-4 text-3xl sm:text-4xl font-semibold">
            Your personal AI movie library
          </h2>

          <p className="max-w-xl mt-4 leading-relaxed text-2xl font-light ">
            Follow all your movies, ones that you already watched or some that
            you want to watch, mark your favourites and get personalised
            suggestions
          </p>

          <Link
            to="/info"
            className="mt-8 bg-bordo-500 hover:bg-bordo-400 px-10 py-3 rounded-full
                 tracking-wider text-sm font-semibold"
          >
            JOIN CINEO
          </Link>
        </div>
      </section>

      <section
        className="relative overflow-hidden bg-gradient-to-b from-black via-[#200101] to-[#440302] py-24
            before:absolute before:inset-x-0 before:top-0 before:h-32
    before:bg-gradient-to-t before:from-transparent 
    before:pointer-events-none
      "
      >
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 px-6">
          <img
            src="/mock-phones.png"
            alt="Mobile mock-ups"
            className="w-1/2 drop-shadow-2xl"
          />

          <div className="max-w-md lg:max-w-none">
            <h3 className="text-3xl font-semibold mb-4">Track Your Movies</h3>
            <p className="leading-relaxed text-lg text-siva-200">
              Keep a record of all the movies you've watched and rate them to
              help our AI understand your preferences.
            </p>
          </div>
        </div>
      </section>

      <section
        className=" relative overflow-hidden
    bg-gradient-to-b from-[#440302] via-[#200101] to-black  
    py-24

    before:absolute before:inset-x-0 before:top-0 before:h-32
    before:bg-gradient-to-t before:from-transparent 
    before:pointer-events-none "
      >
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-16 px-6">
          <img
            src="/mock-desktop.png"
            alt="Desktop mock-up"
            className="w-[420px] lg:w-[460px] drop-shadow-2xl"
          />

          <div className="max-w-md lg:max-w-none">
            <h3 className="text-3xl font-semibold mb-4">
              Personalized Recommendations
            </h3>
            <p className="leading-relaxed text-lg text-siva-200">
              Our AI analyzes your watch history and preferences to suggest
              movies you'll love.
            </p>
          </div>
        </div>
      </section>
      {/* --- SECTION 3 : Watch Together ------------------------------- */}
      <section className="relative bg-gradient-to-b from-black via-[#200101] to-[#440302] py-24">
        <div className="max-w-4xl mx-auto px-6">
          <img
            src={"/couch-party.png"}
            alt="Friends watching movies"
            className="rounded-xl shadow-xl w-full mb-10"
          />

          <h3 className="text-3xl font-semibold text-center mb-4">
            Watch Together
          </h3>
          <p className="text-center leading-relaxed max-w-2xl mx-auto text-lg text-siva-200">
            Plan movie nights with friends and let our AI suggest movies
            everyone will enjoy.
          </p>
        </div>
      </section>
      {/* --- CTA Footer ------------------------------------------------- */}
      <section
        className="  relative overflow-hidden
    bg-[url('/bg-image.jpg')] bg-cover bg-center
    py-24 text-center

    after:content-[''] after:absolute after:inset-0
    after:bg-gradient-to-b after:from-[#440302]
    after:via-[#200101] after:to-black
    after:z-0 after:pointer-events-none"
      >
        <div className="relative z-10">
          <h3 className="text-3xl font-semibold mb-8">
            Ready to transform your movie experience?
          </h3>

          <Link
            to="/signup"
            className="inline-block bg-gray-100 text-bordo-700 hover:bg-white
                 font-semibold px-10 py-3 rounded tracking-wider"
          >
            JOIN CINEO
          </Link>
        </div>
      </section>
    </main>
  );
}
