// src/features/watch_together/WatchTogetherGroup.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify-icon/react";

import {
  useWatchRoomMovies,
  useAddMovieToWatchRoom,
  useRemoveMovieFromWatchRoom,
} from "../../hooks/useWatchTogetherMovies";

import AddMovieDialog from "./AddMovieDialog";
import MovieCard from "../../ui/MovieCard";
import Spinner from "../../ui/Spinner";

/* ------------------------------------------------------------------ */

export default function WatchTogetherGroup() {
  /* 1 ───── route param / state ────────────────────────────────────── */
  const idParam = useParams().roomId ?? useParams().id; // fallback na oba naziva
  const roomId = Number.parseInt(idParam, 10);
  const [dialogOpen, setDialogOpen] = useState(false);

  /* 2 ───── queries / mutations ────────────────────────────────────── */
  const { data: movies = [], isLoading } = useWatchRoomMovies(roomId);
  const addMovie = useAddMovieToWatchRoom(roomId);
  const removeMovie = useRemoveMovieFromWatchRoom(roomId);

  /* 3 ───── side-effect: close dialog after successful add──────────── */
  useEffect(() => {
    if (addMovie.isSuccess) setDialogOpen(false);
  }, [addMovie.isSuccess]);

  /* 4 ───── early exits ────────────────────────────────────────────── */
  if (!Number.isFinite(roomId))
    return <p className="text-red-500">No room id 🤔{roomId}</p>;
  if (isLoading) return <Spinner className="mt-20" />;

  /* 5 ───── render ─────────────────────────────────────────────────── */
  return (
    <>
      {dialogOpen && (
        <AddMovieDialog
          roomId={roomId}
          onClose={() => setDialogOpen(false)}
          alreadyAdded={movies.map((m) => m.id)}
        />
      )}

      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-siva-100">
            Watch-together group #{roomId}
          </h2>
          <button
            onClick={() => setDialogOpen(true)}
            className="flex items-center gap-2 bg-bordo-500 hover:bg-bordo-400 text-white px-4 py-2 rounded-lg"
          >
            <Icon icon="mdi:plus" width={20} height={20} />
            Add movie
          </button>
        </header>
        {console.log(movies)}
        {movies.length === 0 ? (
          <p className="text-siva-300">No movies yet – add one!</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {movies.map((m) => (
              <MovieCard
                key={m.dbId ?? m.id}
                movie={m}
                onRemove={() => removeMovie.mutate(m.dbId)}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
