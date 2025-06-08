import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, Share2, Clock, Settings, Heading2 } from "lucide-react";
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
import toast from "react-hot-toast";

import BlobBackground from "../../ui/BlobBackground";

function Countdown({ target }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!target) return null;

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

export default function WatchTogetherGroup() {
  const { roomId: idParam, id } = useParams();
  const roomId = Number(idParam ?? id);
  const nav = useNavigate();

  const { profile } = useCurrentUser();
  const currentUserId = profile?.id;

  useEffect(() => {
    if (!roomId || !currentUserId) return;
    (async () => {
      const { data } = await supabase
        .from("watch_room_members")
        .select("room_id")
        .eq("room_id", roomId)
        .eq("user_id", currentUserId)
        .maybeSingle();
      if (!data) {
        await supabase
          .from("watch_room_members")
          .insert({ room_id: roomId, user_id: currentUserId });
      }
    })();
  }, [roomId, currentUserId]);

  const { data: room, isLoading: loadingRoom } = useRoom(roomId);
  const { data: members } = useMembers(roomId);
  const { data: movies = [] } = useWatchRoomMovies(roomId);

  const addMovie = useAddMovieToWatchRoom(roomId);
  // const removeMovie = useRemoveMovieFromWatchRoom(roomId);
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

  console.log(sortedMembers);
  const allReady =
    sortedMembers.length > 0 && sortedMembers.every((m) => m.is_ready);

  useEffect(() => {
    if (allReady && room?.status === "active") {
      updateRoom.mutate({ status: "awaiting_accept" });
    }
  }, [allReady, room?.status, updateRoom]);

  const moviesByUser = useMemo(() => {
    return movies.reduce((acc, movie) => {
      const key = String(movie.user_id);
      (acc[key] ||= []).push(movie);
      return acc;
    }, {});
  }, [movies]);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (addMovie.isSuccess) setShowAdd(false);
  }, [addMovie.isSuccess]);

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

  return (
    <section className="mx-auto relative max-w-4xl px-4 pb-32 text-white">
      <BlobBackground blobNum={2} />
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="mb-1 text-4xl font-light">{room.name}</h1>
          <p className="text-sm text-slate-400">
            <span className="capitalize">{room.room_type}</span> • Movie limit{" "}
            {room.movie_limit} per user
          </p>
          {!allReady && <Countdown target={room.expires_at} />}
        </div>

        <div className="flex items-center gap-3">
          {!allReady && (
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard");
              }}
              className="flex items-center gap-1  bg-slate-700/30 rounded px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-md transition-all duration-300  hover:bg-slate-700/60 cursor-pointer"
            >
              <Share2 size={18} /> Invite
            </button>
          )}

          {!allReady && (
            <button
              onClick={() =>
                toggleReady.mutate({
                  value: !sortedMembers.find((m) => m.id === currentUserId)
                    ?.is_ready,
                })
              }
              className={clsx(
                "rounded px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-md font-semibold transition-all duration-300 cursor-pointer",
                sortedMembers.find((m) => m.id === currentUserId)?.is_ready
                  ? "bg-emerald-500 text-white hover:bg-emerald-500/50"
                  : "bg-bordo-500/40 text-white"
              )}
            >
              {sortedMembers.find((m) => m.id === currentUserId)?.is_ready
                ? "Ready ✔"
                : "Mark as ready"}
            </button>
          )}

          {!allReady && (
            <button
              onClick={() => setShowAdd(true)}
              className="flex items-center gap-1 rounded bg-bordo-600 px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-md hover:bg-bordo-500 transition-all duration-300 cursor-pointer"
            >
              <Plus size={14} /> Add movie
            </button>
          )}

          {room.owner_id === currentUserId && !allReady && (
            <button
              onClick={() => setShowEdit(true)}
              className="hidden items-center gap-1 rounded bg-siva-300/50 px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-md hover:bg-siva-200/50 sm:flex transition-all duration-300 cursor-pointer"
              title="Edit room"
            >
              <Settings size={20} />
            </button>
          )}

          {allReady && <h2 className="text-4xl pb-4">Time is up!</h2>}
        </div>
      </header>

      <div className="flex flex-col gap-4">
        {sortedMembers.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            movies={moviesByUser[String(member.id)] || []}
            limit={room.movie_limit}
            isMe={member.id === currentUserId}
            roomId={roomId}
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
    </section>
  );
}
