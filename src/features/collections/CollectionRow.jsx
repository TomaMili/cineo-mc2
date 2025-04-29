import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { Icon } from "@iconify-icon/react";
// import ConfirmRemoveModal from "../../ui/ConfirmRemoveModal";
import AddMovieCard from "./AddMovieCard";
import AddMovieModal from "./AddMovieModal";
import { useMoviePopup } from "../../context/MoviePopupContext";
import { PrevButton, NextButton } from "../../ui/MovieCarouselArrowButton";
import usePopularMovies from "../../hooks/usePopularMovies";
import { handleShare } from "../../utils/share";

export default function CollectionRow({
  collection,
  // onRemoveMovie,
  onAddMovie,
  onDeleteCollection,
}) {
  const { data: popularData, isLoading: loadingPopular } = usePopularMovies(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const movies = popularData?.results ?? [];

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  // const [toRemove, setToRemove] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const { open } = useMoviePopup();

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

  const handleShareClick = () =>
    handleShare(
      window.location.origin + `/collections/${collection.id}`,
      `Link for "${collection.name}" copied to the clipboard!`
    );

  if (loadingPopular) {
    return <div className="text-white p-8">Loading popular movies…</div>;
  }

  return (
    <div className="mb-12">
      {/* Naslov i gumbi */}
      <div className="flex items-center gap-3 mb-5">
        <h3 className="text-2xl font-semibold text-white hover:text-bordo-400 cursor-pointer transition-all">
          <Link
            to={`/collections/${collection.id}`}
            className="hover:underline focus:outline-none"
          >
            {collection.name}
          </Link>
        </h3>
        <button
          className="flex items-center gap-2 bg-bordo-500 hover:bg-bordo-400 text-white text-sm px-3 py-2 rounded leading-none"
          onClick={() => setShowDelete(true)}
        >
          <Icon
            icon="material-symbols:delete-outline"
            width="18"
            height="18"
            className="align-middle"
          />
          <span className="align-">Delete</span>
        </button>
        <button
          className="flex items-center gap-2 bg-bordo-500 hover:bg-bordo-400 text-white text-sm px-3 py-2 rounded leading-none"
          onClick={handleShareClick}
        >
          <Icon
            icon="gridicons:share"
            width="18"
            height="18"
            className="align-middle"
          />
          <span className="align-middle">Share</span>
        </button>
      </div>

      {/* Carousel */}
      <div className="relative">
        <PrevButton
          disabled={prevDisabled}
          onClick={() => emblaApi && emblaApi.scrollPrev()}
          className="absolute -left-6 top-1/2 -translate-y-1/2 -translate-x-1/2 z-2"
        />
        <NextButton
          disabled={nextDisabled}
          onClick={() => emblaApi && emblaApi.scrollNext()}
          className="absolute -right-6 top-1/2 -translate-y-1/2 translate-x-1/2 z-2"
        />
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="relative group flex-none w-40 sm:w-44 lg:w-48 xl:w-52"
              >
                <div className="overflow-hidden rounded-lg aspect-[2/3]">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/placeholder.jpg"
                    }
                    alt={movie.title}
                    className="w-full h-full object-cover transition-all duration-300 ease-out group-hover:blur-[3px] group-hover:scale-105"
                    style={{ cursor: "pointer" }}
                    onClick={() => open(movie)}
                  />
                </div>
                {/* Naziv filma kao popup trigger */}
                <button
                  onClick={() => open(movie)}
                  className="mt-2 text-sm font-medium text-white line-clamp-1 text-left hover:text-bordo-400 cursor-pointer transition-all"
                  title={movie.title}
                >
                  {movie.title}
                </button>
              </div>
            ))}
            {/* + DODAJ FILM KARTICA */}
            <AddMovieCard onClick={() => setShowAddModal(true)} />
          </div>
        </div>
      </div>
      {showAddModal && (
        <AddMovieModal
          onAdd={(ids) => {
            onAddMovie(collection.id, ids);
            setShowAddModal(false);
          }}
          onCancel={() => setShowAddModal(false)}
          alreadyAdded={movies.map((m) => m.id)}
        />
      )}
      {showDelete && (
        <ConfirmRemoveModal
          movie={{ title: collection.name }}
          listName="collection"
          onConfirm={() => {
            onDeleteCollection(collection);
            setShowDelete(false);
          }}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}
