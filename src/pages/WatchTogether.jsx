//pages/WatchTogether.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Plus } from "lucide-react";

import RoomCard from "../features/watch_together/RoomCard";
import CreateRoomModal from "../features/watch_together/CreateRoomModal";

import { useRooms } from "../hooks/useRooms";
import { useCreateRoom } from "../hooks/useCreateRoom";

export default function WatchTogether() {
  const nav = useNavigate();
  const { data: rooms = [], isLoading, isError } = useRooms();
  const createRoom = useCreateRoom();

  const [showModal, setShowModal] = useState(false);
  const [joinUrl, setJoinUrl] = useState("");

  const handleCreate = async (payload) => {
    const { id } = await createRoom.mutateAsync(payload);
    setShowModal(false);
    nav(`/watch-together/${id}`);
    navigator.clipboard.writeText(
      window.location.origin + `/watch-together/${id}`
    );
  };

  const handleJoin = () => {
    try {
      const input = joinUrl.trim();
      let id;

      if (input.startsWith("http")) {
        const url = new URL(input);
        id = url.pathname.split("/").pop();
      } else {
        id = input;
      }

      if (id && /^\d+$/.test(id)) {
        nav(`/watch-together/${id}`);
      } else {
        alert("Invalid room link or ID.");
      }
    } catch {
      alert("Invalid URL format.");
    }
  };

  return (
    <section className="min-h-screen px-6 pb-24 pt-8 md:px-12 text-white">
      <header className="mb-14 flex flex-wrap items-center justify-between gap-y-6">
        <h1 className="text-5xl font-light">Watch-together</h1>

        <div className="flex items-center ">
          <input
            type="url"
            value={joinUrl}
            onChange={(e) => setJoinUrl(e.target.value)}
            placeholder="Room URL or ID (e.g. 23 or https://cineo.app/watch-together/23)"
            className="w-116 rounded-l-lg bg-siva-300 px-4 py-2 placeholder:text-siva-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-bordo-400"
          />
          <button
            onClick={handleJoin}
            className="rounded-r-lg bg-bordo-500 px-6 py-2 hover:bg-bordo-400"
          >
            Join room
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="flex mx-2 items-center gap-2 rounded bg-bordo-500 px-5 py-2 hover:bg-bordo-400"
          >
            <Plus size={16} /> Create room
          </button>
        </div>
      </header>

      {isLoading && <p className="text-center text-slate-400">Loading…</p>}
      {isError && (
        <p className="text-center text-red-400">Error loading rooms.</p>
      )}
      {!isLoading && !rooms.length && (
        <p className="text-center text-slate-400">No rooms yet.</p>
      )}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-10 md:gap-12">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onEnter={(id) => nav(`/watch-together/${id}`)}
          />
        ))}
      </div>

      {showModal && (
        <CreateRoomModal
          isOpen
          onClose={() => setShowModal(false)}
          onCreate={handleCreate}
        />
      )}
    </section>
  );
}
