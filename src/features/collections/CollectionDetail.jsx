import { useState } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import Spinner from "../../ui/Spinner";
import ErrorNotice from "../../ui/ErrorNotice";
import AddMovieCard from "./AddMovieCard";
import AddMovieModal from "./AddMovieModal";
import { useMoviePopup } from "../../context/MoviePopupContext";
import { poster } from "../../services/apiTmdb";
import {
  useCollectionMovies,
  useAddMovieToCollection,
  useRemoveMovieFromCollection,
} from "../../hooks/useCollections";

export default function CollectionDetail() {
  const { id } = useParams();
  const userId = 1; // TODO: replace with real session user ID

  const {
    data: movies = [],
    isLoading,
    isError,
  } = useCollectionMovies(userId, Number(id));

  const addMovie = useAddMovieToCollection(userId);
  const removeMovie = useRemoveMovieFromCollection(userId);
  const { open } = useMoviePopup();
  const [showAdd, setShowAdd] = useState(false);

  if (isError) return <ErrorNotice title="Failed to load collection" />;
  if (isLoading) return <Spinner size={48} />;

  return (
    <section className="min-h-screen bg-black text-siva-100 pb-12 pt-24 px-6 xl:px-12">
      <h1 className="text-4xl font-semibold mb-6">
        Collection: {movies.length ? movies[0].collectionName : id}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((m) => (
          <div key={m.dbId} className="group relative">
            <img
              src={poster(m.poster)}
              alt={m.title}
              className="w-full h-full object-cover rounded-lg cursor-pointer transition-all duration-300 ease-out hover:scale-105"
              onClick={() => open(m)}
            />
            <button
              onClick={() =>
                removeMovie.mutate({
                  collectionId: Number(id),
                  movieId: m.dbId,
                })
              }
              className="absolute top-2 right-2 bg-black/50 p-1 rounded-full hover:bg-bordo-500"
              title="Remove from collection"
            >
              <Icon icon="gridicons:cross-circle" className="text-white" />
            </button>
            <button
              onClick={() => open(m)}
              className="mt-2 text-sm font-medium line-clamp-1 hover:text-bordo-400 transition-all w-full text-left"
              title={m.title}
            >
              {m.title}
            </button>
          </div>
        ))}

        {/* “Add Movie” card */}
        <AddMovieCard onClick={() => setShowAdd(true)} />
      </div>

      {showAdd && (
        <AddMovieModal
          alreadyAdded={movies.map((m) => m.api_id)}
          onAdd={(tmdbMovie) => {
            addMovie.mutate(
              { collectionId: Number(id), tmdbMovie },
              { onSuccess: () => setShowAdd(false) }
            );
          }}
          onCancel={() => setShowAdd(false)}
        />
      )}
    </section>
  );
}
