import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import RoomCard from "../features/watch_together/RoomCard";
import CreateRoomModal from "../features/watch_together/CreateRoomModal";

const ICON_SIZE = 30;

const SEED_ROOMS = [
  {
    id: "a1",
    name: "Petak kod Kate",
    type: "Random",
    limit: 5,
    endsAt: Date.now() + 1000 * 60 * 90,
    members: [
      { id: 1, avatar: "/avatars/CINEO ICON.svg" },
      { id: 2, avatar: "/avatars/frank.jpg" },
      { id: 3, avatar: "/avatars/jess.jpg" },
      { id: 4, avatar: "/avatars/shrek.jpg" },
    ],
    readyIds: [1],
  },
  {
    id: "a2",
    name: "Soba",
    type: "Generate",
    limit: 2,
    endsAt: Date.now() + 1000 * 60 * 50,
    members: [
      { id: 1, avatar: "/avatars/you.jpg" },
      { id: 2, avatar: "/avatars/frank.jpg" },
      { id: 3, avatar: "/avatars/shrek.jpg" },
      { id: 4, avatar: "/avatars/jess.jpg" },
      { id: 5, avatar: "/avatars/you.jpg" },
      { id: 6, avatar: "/avatars/frank.jpg" },
      { id: 7, avatar: "/avatars/shrek.jpg" },
      { id: 8, avatar: "/avatars/shrek.jpg" },
    ],
    readyIds: [],
  },
  {
    id: "a3",
    name: "Subota",
    type: "Generate",
    limit: 2,
    endsAt: Date.now() + 1000 * 60 * 30,
    members: [
      { id: 1, avatar: "/avatars/you.jpg" },
      { id: 2, avatar: "/avatars/jess.jpg" },
      { id: 3, avatar: "" },
    ],
    readyIds: [],
  },
];

export default function WatchTogether() {
  const nav = useNavigate();
  const [rooms, setRooms] = useState(SEED_ROOMS);
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setRooms((r) => [...r]), 1_000);
    return () => clearInterval(id);
  }, []);

  const handleCreate = (name, type, limit) => {
    setRooms((r) => [
      ...r,
      {
        id: crypto.randomUUID(),
        name,
        type,
        limit,
        endsAt: Date.now() + 1000 * 60 * 90,
        members: [],
        readyIds: [],
      },
    ]);
    setShowNew(false);
  };

  return (
    <section className="min-h-screen pt-8 pb-20 px-6 md:px-12 text-white">
      <div className="mb-14 flex flex-wrap gap-y-6 items-center justify-between">
        <h1 className="text-5xl font-light mr-8">Watch-together</h1>

        <div className="flex items-center">
          <input
            type="url"
            placeholder="https://www.example.com"
            className="w-64 px-4 py-2 bg-white/10 placeholder:text-siva-200 
                       rounded-l-lg rounded-r-none
                       focus:outline-none focus:ring-2 focus:ring-inset focus:ring-bordo-400"
          />
          <button className="px-6 py-2 bg-bordo-500 hover:bg-bordo-400 rounded-r-lg">
            Join room
          </button>

          <button
            onClick={() => setShowNew(true)}
            className="ml-4 px-6 py-2 rounded bg-bordo-500 hover:bg-bordo-400"
          >
            + Create room
          </button>
        </div>
      </div>

      <div className="grid gap-10 md:gap-12 grid-cols-[repeat(auto-fill,minmax(270px,1fr))]">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} onEnter={(id) => nav(id)} />
        ))}
      </div>

      {showNew && (
        <CreateRoomModal
          onCreate={handleCreate}
          onCancel={() => setShowNew(false)}
        />
      )}
    </section>
  );
}
