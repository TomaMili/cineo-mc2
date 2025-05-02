import useEmblaCarousel from "embla-carousel-react";

import CastCard from "./CastCard";
import usePrevNextButtons, {
  PrevButton,
  NextButton,
} from "../../ui/MovieCarouselArrowButton";

export default function CastCarousel({
  slides = [],
  options = {},
  onActorClick,
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

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

      <div ref={emblaRef} className="overflow-hidden w-full">
        <div className="flex gap-4 px-2">
          {slides.map((cast) => (
            <div
              key={cast.credit_id ?? cast.id}
              className="flex-none w-28 sm:w-32 lg:w-36 xl:w-40"
            >
              <CastCard cast={cast} onClick={onActorClick} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
