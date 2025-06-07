/* src/features/watch_together/WatchTogetherGroup.jsx */
import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, Share2, Clock, Settings2 } from "lucide-react";
import clsx from "clsx";
import supabase from "../../services/supabase";

import { useCurrentUser } from "../../hooks/useAuth";
import { useRoom } from "../../hooks/useRoom";
import { useMembers } from "../../hooks/useMembers";
import {
  useWatchTogetherMovies,
  useAddMovieToWatchTogether,
} from "../../hooks/useWatchTogetherMovies";
import { useToggleReady } from "../../hooks/useToggleReady";
import { useUpdateRoom } from "../../hooks/useUpdateRoom";

import CreateRoomModal from "./CreateRoomModal";
import MemberRow from "./MemberRow";
import RandomPickDialog from "./RandomPickDialog";
import GenerateListDialog from "./GenerateListDialog";
import AddMovieDialog from "./AddMovieDialog";

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */
function Countdown({ target }) {
  if (!target) return null; // ← ako nema datuma, ništa ne prikazuj

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1_000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, new Date(target).getTime() - now);
  if (!diff) return null; // safety net

  const hh = String(Math.floor(diff / 3_600_000)).padStart(2, "0");
  const mm = String(Math.floor((diff % 3_600_000) / 60_000)).padStart(2, "0");
  const ss = String(Math.floor((diff % 60_000) / 1_000)).padStart(2, "0");

  return (
    <span className="flex items-center gap-1 text-sm text-slate-300">
      <Clock size={14} /> {hh}:{mm}:{ss}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */
export default function WatchTogetherGroup() {
  const { groupId } = useParams();
  const nav = useNavigate();

  const { profile } = useCurrentUser();
  const currentUserId = profile?.id;

  useEffect(() => {
    if (!groupId || !currentUserId) return;
    (async () => {
      const { data, error } = await supabase
        .from("watch_room_members")
        .select("room_id")
        .eq("room_id", groupId)
        .eq("user_id", currentUserId)
        .maybeSingle();
      if (!error && !data) {
        await supabase.from("watch_room_members").insert({
          room_id: groupId,
          user_id: currentUserId,
        });
      }
    })();
  }, [groupId, currentUserId]);

  const { data: room, isLoading: roomLoading } = useRoom(groupId);
  const { data: members } = useMembers(groupId);
  const { data: movies } = useWatchTogetherMovies(groupId);

  const toggleReady = useToggleReady(groupId);
  const addMovie = useAddMovieToWatchTogether(groupId);
  const updateRoom = useUpdateRoom(groupId);

  const sortedMembers = useMemo(() => {
    if (!members) return [];
    return [
      ...members.filter((m) => m.id === currentUserId),
      ...members
        .filter((m) => m.id !== currentUserId)
        .sort((a, b) => a.username.localeCompare(b.username)),
    ];
  }, [members, currentUserId]);

  const moviesByUser = useMemo(() => {
    if (!movies) return {};
    return movies.reduce((acc, m) => {
      (acc[m.user_id] ||= []).push(m);
      return acc;
    }, {});
  }, [movies]);

  const myMember = sortedMembers.find((m) => m.id === currentUserId);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (room?.status === "awaiting_accept") {
      (async () => {
        const res = await fetch(`/api/rooms/${groupId}/result`);
        if (res.ok) setResult(await res.json());
      })();
    }
  }, [room?.status, groupId]);

  if (roomLoading)
    return <p className="py-20 text-center text-slate-300">Loading…</p>;
  if (!room?.id)
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <p className="text-xl">Room not found</p>
        <button
          className="rounded bg-bordo-600 px-4 py-2 text-white"
          onClick={() => nav("/watch-together")}
        >
          Back
        </button>
      </div>
    );

  return (
    <section className="mx-auto max-w-4xl px-4 pb-32 text-white">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="mb-1 text-4xl font-light">{room.name}</h1>
          <p className="text-sm text-slate-400">
            <span className="capitalize">{room.room_type || "…"}</span> • Movie
            limit {room.movie_limit ?? "?"}/user
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Countdown target={room.expires_at} />
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="flex items-center gap-1 rounded-full bg-slate-700/30 px-3 py-1.5 text-xs hover:bg-slate-700/60"
          >
            <Share2 size={14} /> Invite
          </button>
          <button
            onClick={() => toggleReady.mutate({ value: !myMember?.is_ready })}
            className={clsx(
              "rounded-full px-4 py-1.5 text-sm font-semibold transition",
              myMember?.is_ready
                ? "bg-green-600/20 text-green-200 hover:bg-green-600/30"
                : "bg-yellow-600/20 text-yellow-200 hover:bg-yellow-600/30"
            )}
          >
            {myMember?.is_ready ? "Ready ✔" : "Mark as ready"}
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-1 rounded bg-bordo-600 px-3 py-1.5 text-sm hover:bg-bordo-500"
          >
            <Plus size={14} /> Add movie
          </button>
          {room.owner_id === currentUserId && (
            <button
              onClick={() => setShowEdit(true)}
              className="hidden items-center gap-1 rounded bg-slate-700/30 px-3 py-1.5 text-xs hover:bg-slate-700/60 sm:flex"
              title="Edit room"
            >
              <Settings2 size={14} />
            </button>
          )}
        </div>
      </header>
      <div className="flex flex-col gap-3">
        {sortedMembers.map((m) => (
          <MemberRow
            key={m.id}
            member={m}
            movies={moviesByUser[m.id] || []}
            limit={room.movie_limit}
            isMe={m.id === currentUserId}
          />
        ))}
      </div>
      <button
        onClick={() => setShowAdd(true)}
        className="fixed bottom-8 right-8 size-14 place-content-center rounded-full bg-bordo-600 text-white shadow-lg hover:bg-bordo-500 md:hidden"
      >
        <Plus size={26} />
      </button>

      {/* Add Movie Modal */}
      {showAdd && (
        <AddMovieDialog
          roomId={groupId}
          onClose={() => setShowAdd(false)}
          alreadyAdded={moviesByUser[currentUserId]?.map((m) => m.api_id) || []}
        />
      )}

      {/* Edit Room Modal */}
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

      {/* RESULT dialogs */}
      {result?.result_type === "Random" && (
        <RandomPickDialog
          isOpen
          movie={result.picked_movie}
          onAccept={() =>
            fetch(`/api/rooms/${groupId}/accept`, { method: "POST" })
          }
        />
      )}
      {result?.result_type === "Generate" && (
        <GenerateListDialog
          isOpen
          movies={result.picked_list}
          onAccept={(movieId) =>
            fetch(`/api/rooms/${groupId}/accept`, {
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
