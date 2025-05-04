// src/features/watch_together/WatchTogetherGroup.jsx
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Icon } from "@iconify-icon/react";
import MemberRow from "./MemberRow";

const ICON_SIZE = 32;

/* ───────────  DEMO fetch  ─────────── */
async function fetchRoomById(id) {
  const creatorId = 1;
  return {
    id,
    name: "Room name",
    creatorId,
    type: "Generate",
    limit: 2,
    endsAt: Date.now() + 1000 * 60 * 90,
    members: [
      {
        id: 1,
        name: "You",
        avatar: "/avatars/you.jpg",
        ready: false,
        movies: [],
      },
      {
        id: 2,
        name: "Frank",
        avatar: "/avatars/frank.jpg",
        ready: false,
        movies: [238, 129],
      },
      {
        id: 3,
        name: "Jessica",
        avatar: "/avatars/jess.jpg",
        ready: false,
        movies: [],
      },
      {
        id: 4,
        name: "John",
        avatar: "/avatars/john.jpg",
        ready: true,
        movies: [238, 129],
      },
      {
        id: 5,
        name: "Peter",
        avatar: "/avatars/peter.jpg",
        ready: true,
        movies: [157336],
      },
    ],
  };
}

const diffToHms = (to) => {
  const s = Math.max(0, Math.floor((to - Date.now()) / 1000));
  return `${String(Math.floor(s / 3600)).padStart(2, "0")}h ${String(
    Math.floor((s % 3600) / 60)
  ).padStart(2, "0")}m ${String(s % 60).padStart(2, "0")}s`;
};

export default function WatchTogetherGroup() {
  const { groupId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const preview = state?.preview;
  const [room, setRoom] = useState(
    preview || { id: groupId, name: "Loading…" }
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const full = await fetchRoomById(groupId);
        if (!cancelled) setRoom(full);
      } catch (err) {
        console.error(err);
        navigate("/watch-together");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [groupId, navigate]);

  useEffect(() => {
    const id = setInterval(() => setRoom((r) => ({ ...r })), 1000);
    return () => clearInterval(id);
  }, []);

  const userId = 1;
  const isHost = room.creatorId === userId;
  const me = room.members?.find((m) => m.id === userId);

  const toggleReady = () =>
    setRoom((r) => ({
      ...r,
      members: r.members.map((m) =>
        m.id === userId ? { ...m, ready: !m.ready } : m
      ),
    }));

  if (!room.members) return null;

  return (
    <section className="min-h-screen px-6 py-8 text-white">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12">
        <div>
          <h1 className="text-5xl font-light mb-4">{room.name}</h1>
          <p className="text-lg">
            Room type: <span className="font-semibold">{room.type}</span>
          </p>
          <p className="text-lg">
            Movie limit:{" "}
            <span className="font-semibold">{room.limit} per person</span>
          </p>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-4">
          <div className="flex items-center gap-3">
            <Icon icon="mdi:clock-outline" width={20} />
            <span className="text-lg">{diffToHms(room.endsAt)}</span>

            <button
              onClick={() =>
                navigator.clipboard.writeText(window.location.href)
              }
              className="bg-bordo-500 hover:bg-bordo-400 px-4 py-2 rounded flex items-center gap-2 cursor-pointer transition-colors duration-200"
            >
              <Icon icon="gridicons:share" width="18" height="18" />
              Share
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={toggleReady}
              className="bg-bordo-500 hover:bg-bordo-400 px-6 py-2 rounded cursor-pointer transition-colors duration-200 text-lg"
            >
              {me?.ready ? "Cancel ready" : "Mark as ready"}
            </button>

            {!me?.ready && (
              <button className="bg-bordo-500 hover:bg-bordo-400 px-6 py-2 rounded flex items-center gap-1 cursor-pointer transition-colors duration-200">
                <Icon icon="mdi:plus" width={18} /> Add movie
              </button>
            )}
          </div>

          {isHost && (
            <button
              onClick={() => navigate("/watch-together")}
              className="bg-bordo-500 hover:bg-bordo-400 px-6 py-2 rounded cursor-pointer transition-colors duration-200"
            >
              End room
            </button>
          )}
        </div>
      </div>

      <ul className="space-y-4">
        {room.members.map((m) => (
          <MemberRow
            key={m.id}
            member={m}
            limit={room.limit}
            isHost={m.id === room.creatorId}
          />
        ))}
      </ul>

      <Link
        to="/watch-together"
        className="inline-block mt-12 text-lg underline hover:text-bordo-400"
      >
        ← Back to rooms
      </Link>
    </section>
  );
}
