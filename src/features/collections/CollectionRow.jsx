import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { PrevButton, NextButton } from "../../ui/MovieCarouselArrowButton";
import MovieCard from "../../ui/MovieCard";
import ConfirmRemoveModal from "../watchlater/ConfirmRemoveModal";

export default function CollectionRow({
  collection,
  onRemoveMovie,
  onAddMovie,
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [toRemove, setToRemove] = useState(null);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setPrevDisabled(!emblaApi.canScrollPrev());
      setNextDisabled(!emblaApi.canScrollNext());
    };
    emblaApi.on("select", update);
    update();
    return () => emblaApi.off("select", update);
  }, [emblaApi]);

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold text-white mb-4">
        {collection.name}
      </h3>

      <div className="relative">
        <PrevButton
          onClick={() => emblaApi.scrollPrev()}
          disabled={prevDisabled}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2"
        />
        <NextButton
          onClick={() => emblaApi.scrollNext()}
          disabled={nextDisabled}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2"
        />

        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-6">
            {collection.movies.map((movie) => (
              <div
                key={movie.id}
                className="relative group flex-none w-40 sm:w-44 lg:w-48 xl:w-52"
              >
                {/* remove confirm */}
                {toRemove && toRemove.id === movie.id && (
                  <ConfirmRemoveModal
                    movie={movie}
                    listName={collection.name}
                    onConfirm={() => {
                      onRemoveMovie(collection.id, movie.id);
                      setToRemove(null);
                    }}
                    onCancel={() => setToRemove(null)}
                  />
                )}

                {/* X on hover */}
                <button
                  onClick={() => setToRemove(movie)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition bg-black/50 p-1 rounded-full hover:bg-bordo-500 z-10"
                >
                  <span className="text-white text-lg">×</span>
                </button>

                {/* poster */}
                <div className="overflow-hidden rounded-lg">
                  <MovieCard movie={movie} hideActions onClick={() => {}} />
                </div>
              </div>
            ))}

            {/* “+” at end */}
            <div
              className="flex-none w-40 sm:w-44 lg:w-48 xl:w-52 flex items-center justify-center cursor-pointer rounded-lg border-2 border-gray-600 hover:border-bordo-500"
              onClick={() => onAddMovie(collection.id)}
            >
              <span className="text-gray-400 text-3xl">+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
