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
    <div className="mb-18">
      <div className="flex items-center gap-6 mb-3 bg-siva-700 rounded-lg">
        <h1 className="text-3xl font-normal mb-1">{collection.name}</h1>
        <div className="flex gap-2">
          <button
            onClick={() => onShareCollection?.(collection)}
            title="Share collection"
            className="bg-bordo-500 hover:bg-bordo-400 px-4 py-2 rounded flex items-center gap-2 transition-colors duration-200 cursor-pointer"
          >
            <Icon icon="gridicons:share" width="18" height="18" />
            <span>Share</span>
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            title="Delete collection"
            className="bg-bordo-500 hover:bg-bordo-400 px-4 py-2 rounded flex items-center gap-2 transition-colors duration-200 cursor-pointer"
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

      <div
        className="grid gap-6 gap-y-10
          grid-cols-2 min-[570px]:grid-cols-3 min-[770px]:grid-cols-4 min-[1100px]:grid-cols-5 min-[1400px]:grid-cols-6
          min-[1670px]:grid-cols-7 min-[1860px]:grid-cols-8 "
      >
        {movies.map((m) => (
          <div
            key={m.dbId}
            className="group relative w-40 sm:w-44 lg:w-48 xl:w-52 aspect-[2/3]"
          >
            <img
              src={poster(m.poster)}
              alt={m.title}
              className="w-full h-full object-cover rounded-lg cursor-pointer transition-all duration-300 ease-out hover:scale-103"
              onClick={() => open(m)}
            />
            <button
              onClick={() =>
                removeMovie.mutate({
                  collectionId: collection.id,
                  movieId: m.dbId,
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
            <button
              onClick={() => open(m)}
              className="mt-2 text-sm font-medium line-clamp-1 hover:text-bordo-400 transition-all w-full text-left cursor-pointer"
              title={m.title}
            >
              {m.title}
            </button>
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
