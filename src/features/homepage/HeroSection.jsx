import { useSuperSuggest } from "../../context/SuperSuggestContext";

function HeroSection() {
  const { show } = useSuperSuggest();

  return (
    <div className="relative w-full text-white z-0 h-2/3">
      <picture className="absolute inset-0 z-0 w-full h-full">
        <source srcSet="/bg-image.jpg" type="image/jpg" />
        <source srcSet="/bg-image.avif" type="image/avif" />
        <source srcSet="/bg-image.webp" type="image/webp" />
        <img
          src="/bg-image.jpg"
          alt="Background image"
          className="h-full w-full object-cover"
          decoding="async"
          fetchpriority="high"
        />
      </picture>
      <div className="flex flex-col items-center gap-6 z-1 -mt-24 pb-28 ">
        <img
          src="/logo-cineo.svg"
          alt="logo"
          className="relative mx-auto mt-34"
          decoding="async"
          fetchpriority="high"
        />
        <h2 className="z-0 text-6xl font-light text-center pt-20">
          Ready for Your Next <br /> Watch?
        </h2>
        <button
          onClick={show}
          className="bg-bordo-500 z-0 px-6 pt-4 pb-3 rounded-4xl font-semibold cursor-pointer hover:bg-bordo-400 transition-colors duration-300 ease-out"
        >
          SUPERSUGGESTION
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
