import { useSuperSuggest } from "../../context/SuperSuggestContext";

function HeroSection() {
  const { show } = useSuperSuggest();
  return (
    <div>
      <div className="flex flex-col items-center gap-6 z-0 bg-[url(/bg-image.jpg)] -mt-24 pb-28">
        <img
          src="/logo-cineo.svg"
          alt="logo"
          width="34%"
          height="34%"
          className="relative mx-auto mt-34"
        />
        <h2 className="z-0 text-6xl font-light text-center pt-20">
          Ready for Your Next <br /> Watch?
        </h2>
        <button
          onClick={show}
          className="bg-bordo-500 z-0 px-6 pt-4 pb-3 rounded-4xl font-semibold cursor-pointer hover:bg-bordo-400"
        >
          SUPERSUGGESTION
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
