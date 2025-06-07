//CollectionRow.jsx
import { useState } from "react";
import { Icon } from "@iconify-icon/react";
import AddMovieCard from "./AddMovieCard";
import AddMovieModal from "./AddMovieModal";
import ConfirmRemoveModal from "../../ui/ConfirmRemoveModal.jsx";
import Spinner from "../../ui/Spinner";
import ErrorNotice from "../../ui/ErrorNotice";
import { useMoviePopup } from "../../context/MoviePopupContext";
import { poster } from "../../services/apiTmdb";
import {
  useCollectionMovies,
  useAddMovieToCollection,
  useRemoveMovieFromCollection,
} from "./useCollections.js";
import { useCurrentUser } from "../../hooks/useAuth.jsx";
import MovieCard from "../../ui/MovieCard.jsx";

export default function CollectionRow({
  collection,
  onDeleteCollection,
  onShareCollection,
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { open } = useMoviePopup();

  const { profile } = useCurrentUser();
  const userId = profile?.id;

  const {
    data: movies = [],
    isLoading,
    isError,
  } = useCollectionMovies(userId, collection.id);

  const addMovie = useAddMovieToCollection(userId);
  const removeMovie = useRemoveMovieFromCollection(userId);

  if (isError) return <ErrorNotice title="Failed to load collection" />;
  if (isLoading) return <Spinner size={24} />;

  return (
    <div className="mb-8 sm:mb-18">
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 mb-3 bg-siva-700 rounded-lg">
        <h1 className="text-2xl sm:text-3xl font-normal mb-1">
          {collection.name}
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => onShareCollection?.(collection)}
            title="Share collection"
            className="bg-bordo-500 hover:bg-bordo-400 px-3 sm:px-4 py-1 sm:py-2 rounded flex items-center gap-2 transition-colors duration-300 cursor-pointer text-sm sm:text-md"
          >
            <Icon icon="gridicons:share" width="18" height="18" />
            <span>Share</span>
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            title="Delete collection"
            className="bg-bordo-500 hover:bg-bordo-400 px-3 sm:px-4 py-1 sm:py-2 rounded flex items-center gap-2 transition-colors duration-300 cursor-pointer text-sm sm:text-md"
          >
            <Icon icon="material-symbols:delete-outline" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {showDeleteConfirm && (
        <ConfirmRemoveModal
          movie={{ title: collection.name }}
          listName="collection"
          onConfirm={() => {
            onDeleteCollection(collection.id);
            setShowDeleteConfirm(false);
          }}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}

      <div className="flex gap-3 lg:gap-6 flex-nowrap sm:flex-wrap overflow-auto py-5">
        {movies.map((movie) => (
          <div className="relative group">
            <div
              key={movie.dbId}
              className="group relative w-32 sm:w-44 lg:w-48 xl:w-52 aspect-[2/3]"
            >
              <img
                src={poster(movie.poster)}
                srcSet={`
                        ${poster(movie.poster, 92)}  92w,
                        ${poster(movie.poster, 342)} 342w,
                        ${poster(movie.poster, 500)} 500w
                      `}
                alt={movie.title}
                sizes="(max-width: 640px) 50vw, 20vw"
                className="w-full h-full object-cover rounded-lg cursor-pointer transition-all duration-300 ease-out hover:scale-103"
                onClick={() => open(movie)}
              />
              <button
                onClick={() =>
                  removeMovie.mutate({
                    collectionId: collection.id,
                    movieId: movie.dbId,
                  })
                }
                className=" absolute top-2 right-2
                          bg-black/50 p-1 rounded-full
                          hover:bg-bordo-500
                          flex justify-center items-center
                          transition-all duration-300 ease-out
                          opacity-0            
                          group-hover:opacity-100 cursor-pointer"
                title="Remove from collection"
              >
                <Icon
                  icon="gridicons:cross-circle"
                  className="text-white"
                  width="20"
                  height="20"
                />
              </button>
            </div>
          </div>
        ))}
        <AddMovieCard onClick={() => setShowAddModal(true)} />
      </div>

      {showAddModal && (
        <AddMovieModal
          alreadyAdded={movies.map((m) => m.api_id)}
          onAdd={(tmdbMovie) => {
            addMovie.mutate(
              { collectionId: collection.id, tmdbMovie },
              { onSuccess: () => setShowAddModal(false) }
            );
          }}
          onCancel={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}
