import BlobBackground from "../../ui/BlobBackground";
import Feature from "./Feature";

export default function DiscoverMoviesSection() {
  return (
    <Feature>
      <div className="mt-10 h-screen relative overflow-visible mb-100">
        <BlobBackground />
        <div className="relative block w-fit mx-auto z-10">
          <h2 className="text-7xl font-regular text-white text-center mx-auto">
            Discover new movies
          </h2>
        </div>

        <section className="text-gray-300 pt-28 z-10">
          <div className="max-w-[1600px] mx-auto px-6 flex flex-col gap-12 items-center">
            <div className="w-3/4 flex items-center justify-center overflow-hidden z-10">
              <img src={"/article-5.png"} className="w-full rounded-xl" />
            </div>
            <p className="text-white mb-6 font-light text-3xl text-center">
              Check out on which platforms are they available, get notifications
              for your streaming services. <br />
              Never miss out on your favourites.
            </p>
          </div>
        </section>
      </div>
    </Feature>
  );
}
