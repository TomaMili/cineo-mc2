import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import usePrevNextButtons, {
  PrevButton,
  NextButton,
} from "./MovieCarouselArrowButton";
import MovieCard from "./MovieCard";

export default function MovieCarousel({
  slides = [],
  options = {},
  onInit,
  onReachEnd,
  onWatchLater,
  onBookmark,
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  useEffect(() => {
    if (!emblaApi) return;
    onInit?.(emblaApi);
    requestAnimationFrame(() => emblaApi.reInit());
  }, [emblaApi, slides.length, onInit]);

  useEffect(() => {
    if (!emblaApi || typeof onReachEnd !== "function") return;
    let fired = false;
    const selectHandler = () => {
      if (!emblaApi.canScrollNext() && !fired) {
        fired = true;
        onReachEnd();
      }
    };
    emblaApi.on("select", selectHandler);
    selectHandler();
    return () => emblaApi.off("select", selectHandler);
  }, [emblaApi, onReachEnd, slides.length]);

  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 1050px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1050px)");
    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="relative overflow-visible z-10">
      {!isMobile && (
        <PrevButton
          disabled={prevBtnDisabled}
          onClick={onPrevButtonClick}
          className="sm:absolute -left-6 top-1/2 -translate-y-1/2 -translate-x-1/2"
        />
      )}

      {!isMobile && (
        <NextButton
          disabled={nextBtnDisabled}
          onClick={onNextButtonClick}
          className="sm:absolute -right-6 top-1/2 -translate-y-1/2 translate-x-1/2"
        />
      )}

      <div
        ref={emblaRef}
        className="overflow-hidden w-full"
        style={{ willChange: "transform" }}
      >
        <div className="flex gap-6 pt-2 px-1">
          {slides.map((movie, idx) =>
            movie ? (
              <div
                key={`${movie.id}-${idx}`}
                className="flex-none w-28 sm:w-44 lg:w-48 xl:w-52 transform-gpu"
              >
                <MovieCard
                  movie={movie}
                  onWatchLater={onWatchLater}
                  onBookmark={onBookmark}
                />
              </div>
            ) : (
              <div
                key={`skeleton-${idx}`}
                className="flex-none w-40 sm:w-44 lg:w-48 xl:w-52 animate-pulse bg-gray-700 rounded"
                style={{ height: "270px" }}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
