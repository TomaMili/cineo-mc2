import useEmblaCarousel from "embla-carousel-react";
import usePrevNextButtons, {
  PrevButton,
  NextButton,
} from "./MovieCarouselArrowButton";
import MovieCard from "./MovieCard";
import { useState } from "react";
import MoviePopup from "./MoviePopup";

export default function MovieCarousel({
  slides = [],
  options = {},
  onWatchLater,
  onBookmark,
}) {
  const [selected, setSelected] = useState(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="relative overflow-visible z-10 ">
      <PrevButton
        disabled={prevBtnDisabled}
        onClick={onPrevButtonClick}
        className="absolute -left-6 top-1/2 -translate-y-1/2 -translate-x-1/2"
      />
      <NextButton
        disabled={nextBtnDisabled}
        onClick={onNextButtonClick}
        className="absolute -right-6 top-1/2 -translate-y-1/2 translate-x-1/2"
      />

      <div ref={emblaRef} className="overflow-hidden w-full">
        <div className="flex gap-6">
          {slides.map((movie) => (
            <div
              key={movie.id}
              className="flex-none w-40 sm:w-44 lg:w-48 xl:w-52"
            >
              <MovieCard
                movie={movie}
                onWatchLater={onWatchLater}
                onClick={() => setSelected(movie)} // ← open popup
                onBookmark={onBookmark}
              />
            </div>
          ))}
        </div>
      </div>
      <MoviePopup movie={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
