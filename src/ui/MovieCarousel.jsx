import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import usePrevNextButtons, {
  PrevButton,
  NextButton,
} from "./MovieCarouselArrowButton";
import MovieCard from "./MovieCard";

export default function MovieCarousel({
  slides = [],
  options = {},
  onSelect,
  onWatchLater,
  onBookmark,
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  // Re-init offscreen
  useEffect(() => {
    if (!emblaApi) return;
    requestAnimationFrame(() => emblaApi.reInit());
  }, [emblaApi, slides.length]);

  // Subscribe to select
  useEffect(() => {
    if (!emblaApi || typeof onSelect !== "function") return;
    const handler = () => onSelect(emblaApi.selectedScrollSnap());
    emblaApi.on("select", handler);
    handler();
    return () => emblaApi.off("select", handler);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative overflow-visible z-10">
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
                className="
                  flex-none w-40 sm:w-44 lg:w-48 xl:w-52
                  transform-gpu
                "
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
