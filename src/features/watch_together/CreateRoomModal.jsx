// src/features/watch_together/CreateRoomModal.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { useCreateRoom } from "../../hooks/useCreateRoom";
import { useUpdateRoom } from "../../hooks/useUpdateRoom";

export default function CreateRoomModal({ isOpen = false, room, onClose }) {
  const createRoom = useCreateRoom();
  const updateRoom = useUpdateRoom(room?.id);

  const [form, setForm] = useState({
    name: "",
    timer: "01:30:00", // za <input type="time" step="1">
    type: "Generate",
    limit: 2,
  });

  useEffect(() => {
    if (!room) return;
    const diff = Math.max(0, new Date(room.expires_at).getTime() - Date.now());
    const hh = String(Math.floor(diff / 3_600_000)).padStart(2, "0");
    const mm = String(Math.floor((diff % 3_600_000) / 60_000)).padStart(2, "0");
    const ss = String(Math.floor((diff % 60_000) / 1_000)).padStart(2, "0");

    setForm({
      name: room.name,
      timer: `${hh}:${mm}:${ss}`,
      type: room.room_type,
      limit: room.movie_limit,
    });
  }, [room]);

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async () => {
    const [h, m, s] = form.timer.split(":").map(Number);
    const ms = h * 3_600_000 + m * 60_000 + s * 1_000;
    const expires_at = new Date(Date.now() + ms).toISOString();

    const payload = {
      name: form.name.trim(),
      room_type: form.type,
      movie_limit: Number(form.limit),
      expires_at,
    };

    try {
      if (room) {
        await updateRoom.mutateAsync(payload);
      } else {
        await createRoom.mutateAsync(payload);
      }
      onClose();
    } catch (err) {
      console.error("Failed to save room:", err);
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2
                       rounded-2xl bg-slate-800/60 p-8 backdrop-blur shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <h2 className="mb-8 text-center text-2xl font-semibold">
              {room ? "Edit room" : "Create a room"}
            </h2>
            <label className="mb-1 block text-sm">Room name</label>
            <input
              value={form.name}
              onChange={update("name")}
              className="mb-4 w-full rounded-md bg-slate-700/50 px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-bordo-400"
            />
            <label className="mb-1 block text-sm">Set timer</label>
            <input
              type="time"
              step="1"
              value={form.timer}
              onChange={update("timer")}
              className="mb-4 w-full rounded-md bg-slate-700/50 px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-bordo-400"
            />
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm">Room type</label>
                <select
                  value={form.type}
                  onChange={update("type")}
                  className="w-full rounded-md bg-slate-700/50 px-4 py-2
                             focus:outline-none focus:ring-2 focus:ring-bordo-400"
                >
                  <option>Generate</option>
                  <option>Random</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm">Movie limit</label>
                <select
                  value={form.limit}
                  onChange={update("limit")}
                  className="w-full rounded-md bg-slate-700/50 px-4 py-2
                             focus:outline-none focus:ring-2 focus:ring-bordo-400"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!form.name.trim()}
              className={clsx(
                "w-full rounded-full py-3 font-semibold transition",
                form.name.trim()
                  ? "bg-bordo-600 hover:bg-bordo-500 text-white"
                  : "cursor-not-allowed bg-slate-600 text-slate-400"
              )}
            >
              {room ? "Save changes" : "Create"}
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
