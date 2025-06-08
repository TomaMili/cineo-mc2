// src/features/watch_together/WatchTogetherGroup.jsx
import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, Share2, Clock, Settings } from "lucide-react";
import clsx from "clsx";
import supabase from "../../services/supabase";

import { useCurrentUser } from "../../hooks/useAuth";
import { useRoom } from "../../hooks/useRoom";
import { useMembers } from "../../hooks/useMembers";
import {
  useWatchRoomMovies,
  useAddMovieToWatchRoom,
  useRemoveMovieFromWatchRoom,
} from "../../hooks/useWatchTogetherMovies";
import { useToggleReady } from "../../hooks/useToggleReady";
import { useUpdateRoom } from "../../hooks/useUpdateRoom";
import MemberRow from "./MemberRow";

import CreateRoomModal from "./CreateRoomModal";
import AddMovieDialog from "./AddMovieDialog";

import Spinner from "../../ui/Spinner";

/* ------------------------------------------------------------------ */
function Countdown({ target }) {
  if (!target) return null;
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, new Date(target).getTime() - now);
  if (!diff) return null;
  const hh = String(Math.floor(diff / 3600000)).padStart(2, "0");
  const mm = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
  const ss = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
  return (
    <span className="flex items-center gap-1 text-sm text-slate-300">
      <Clock size={14} /> {hh}:{mm}:{ss}
    </span>
  );
}

/* ------------------------------------------------------------------ */
export default function WatchTogetherGroup() {
  const { roomId: idParam, id } = useParams();
  const roomId = Number(idParam ?? id);
  const nav = useNavigate();
  const { profile } = useCurrentUser();
  const currentUserId = profile?.id;

  // Ensure membership
  useEffect(() => {
    if (!roomId || !currentUserId) return;
    (async () => {
      const { data, error } = await supabase
        .from("watch_room_members")
        .select("room_id")
        .eq("room_id", roomId)
        .eq("user_id", currentUserId)
        .maybeSingle();
      if (!error && !data) {
        await supabase
          .from("watch_room_members")
          .insert({ room_id: roomId, user_id: currentUserId });
      }
    })();
  }, [roomId, currentUserId]);

  // Queries & mutations
  const { data: room, isLoading: loadingRoom } = useRoom(roomId);
  const { data: members } = useMembers(roomId);
  const { data: movies = [], isLoading: loadingMovies } =
    useWatchRoomMovies(roomId);
  const addMovie = useAddMovieToWatchRoom(roomId);
  const removeMovie = useRemoveMovieFromWatchRoom(roomId);
  const toggleReady = useToggleReady(roomId);
  const updateRoom = useUpdateRoom(roomId);

  const sortedMembers = useMemo(() => {
    if (!members) return [];
    return [
      ...members.filter((m) => m.id === currentUserId),
      ...members
        .filter((m) => m.id !== currentUserId)
        .sort((a, b) => a.username.localeCompare(b.username)),
    ];
  }, [members, currentUserId]);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [result, setResult] = useState(null);

  // Close Add dialog on success
  useEffect(() => {
    if (addMovie.isSuccess) setShowAdd(false);
  }, [addMovie.isSuccess]);
  // Fetch result if awaiting_accept
  useEffect(() => {
    if (room?.status === "awaiting_accept") {
      fetch(`/api/rooms/${roomId}/result`).then(
        (res) => res.ok && res.json().then(setResult)
      );
    }
  }, [room?.status, roomId]);

  const moviesByUser = useMemo(() => {
    return (movies || []).reduce((acc, movie) => {
      if (!acc[movie.user_id]) acc[movie.user_id] = [];
      acc[movie.user_id].push(movie);
      return acc;
    }, {});
  }, [movies]);

  if (loadingRoom) return <Spinner className="mt-20" />;
  if (!room?.id)
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <p className="text-xl">Room not found</p>
        <button
          onClick={() => nav("/watch-together")}
          className="rounded bg-bordo-600 px-4 py-2 text-white"
        >
          Back
        </button>
      </div>
    );

  console.log("MOVIES", movies);
  console.log("moviesByUser", moviesByUser);

  return (
    <section className="mx-auto max-w-4xl px-4 pb-32 text-white">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="mb-1 text-4xl font-light">{room.name}</h1>
          <p className="text-sm text-slate-400">
            <span className="capitalize ">{room.room_type}</span> • Movie limit{" "}
            {room.movie_limit}/user
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Countdown target={room.expires_at} />
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="flex items-center gap-1 rounded-full bg-slate-700/30 px-3 py-1.5 text-sm hover:bg-slate-700/60 cursor-pointer"
          >
            <Share2 size={18} /> Invite
          </button>
          <button
            onClick={() =>
              toggleReady.mutate({
                value: !sortedMembers.find((m) => m.id === currentUserId)
                  ?.is_ready,
              })
            }
            className={clsx(
              "rounded-full px-4 py-1.5 text-sm font-semibold transition cursor-pointer",
              sortedMembers.find((m) => m.id === currentUserId)?.is_ready
                ? "bg-emerald-500 text-green-200 hover:bg-emerald-500/50"
                : "bg-bordo-500/40 border-bordo-400 border-1  text-white hover:bg-bordo-400/50"
            )}
          >
            {sortedMembers.find((m) => m.id === currentUserId)?.is_ready
              ? "Ready ✔"
              : "Mark as ready"}
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-1 rounded-full bg-bordo-600 px-3 py-1.5 text-sm hover:bg-bordo-500 cursor-pointer"
          >
            <Plus size={14} /> Add movie
          </button>
          {room.owner_id === currentUserId && (
            <button
              onClick={() => setShowEdit(true)}
              className="hidden items-center gap-1 rounded-full bg-siva-300/50 px-2 py-1.5 text-xs hover:bg-slate-700/60 sm:flex"
              title="Edit room"
            >
              <Settings size={18} className="cursor-pointer" />
            </button>
          )}
        </div>
      </header>

      <div className="flex flex-col gap-4">
        {sortedMembers.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            movies={moviesByUser[member.id] || []}
            limit={room.movie_limit}
            isMe={member.id === currentUserId}
            roomId={roomId} // ✅ OBAVEZNO
          />
        ))}
      </div>

      {showAdd && (
        <AddMovieDialog
          roomId={roomId}
          onClose={() => setShowAdd(false)}
          alreadyAdded={movies.map((m) => m.dbId)}
        />
      )}
      {showEdit && (
        <CreateRoomModal
          isOpen
          room={room}
          onSave={(payload) =>
            updateRoom.mutateAsync(payload).then(() => setShowEdit(false))
          }
          onClose={() => setShowEdit(false)}
        />
      )}

      {result?.result_type === "Random" && (
        <RandomPickDialog
          isOpen
          movie={result.picked_movie}
          onAccept={() =>
            fetch(`/api/rooms/${roomId}/accept`, { method: "POST" })
          }
        />
      )}
      {result?.result_type === "Generate" && (
        <GenerateListDialog
          isOpen
          movies={result.picked_list}
          onAccept={(movieId) =>
            fetch(`/api/rooms/${roomId}/accept`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ movie_id: movieId }),
            })
          }
        />
      )}
    </section>
  );
}
