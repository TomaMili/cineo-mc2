//pages/WatchTogether.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Plus } from "lucide-react";

import RoomCard from "../features/watch_together/RoomCard";
import CreateRoomModal from "../features/watch_together/CreateRoomModal";

import { useRooms } from "../hooks/useRooms";
import { useCreateRoom } from "../hooks/useCreateRoom";
import BlobBackground from "../ui/BlobBackground";

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
      <BlobBackground />
      <header className="mb-14 flex flex-wrap items-center justify-between gap-y-6">
        <h1 className="text-4xl font-medium uppercase">Watch-together</h1>

        <div className="flex gap-2 w-full items-end sm:items-center sm:flex-row justify-end flex-col-reverse ">
          <div>
            <input
              type="url"
              value={joinUrl}
              onChange={(e) => setJoinUrl(e.target.value)}
              placeholder="Room URL or ID (e.g. 23 or https://cineo.app/watch-together/23)"
              className="w-40 xs:w-80 lg:w-116 rounded-l bg-siva-300/50 px-3 sm:px-4 py-1 sm:py-2 placeholder:text-siva-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-bordo-400 transition-all duration-300 text-sm sm:text-md"
            />
            <button
              onClick={handleJoin}
              className="rounded-r bg-bordo-500 px-3 sm:px-4 py-1 sm:py-2 hover:bg-bordo-400 transition-colors duration-300 cursor-pointer text-sm sm:text-md"
            >
              Join room
            </button>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-bordo-500 hover:bg-bordo-400 px-3 sm:px-4 py-1 sm:py-2 rounded flex items-center gap-2 w-fit transition-colors duration-300 cursor-pointer text-sm sm:text-md sm:ml-4"
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
