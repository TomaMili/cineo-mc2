import { useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify-icon/react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Modal for creating a Watch‑together room.
 * Now supports a **timer** (hours / minutes) in addition to name, type and limit.
 * `onCreate` gets `(name, type, limit, durationSeconds)`.
 */
export default function CreateRoomModal({
  initial = { name: "", type: "Generate", limit: 2, duration: 0 },
  onCreate,
  onCancel,
}) {
  const [name, setName] = useState(initial.name);
  const [type, setType] = useState(initial.type);
  const [limit, setLimit] = useState(initial.limit);

  // timer state (store separately so the user sees each field)
  const [hours, setHours] = useState(() => Math.floor(initial.duration / 3600));
  const [mins, setMins] = useState(() =>
    Math.floor((initial.duration % 3600) / 60)
  );
  const [secs, setSecs] = useState(() => initial.duration % 60);

  // derived total
  const durationSeconds = hours * 3600 + mins * 60 + secs;

  const canSubmit = name.trim() && limit > 0 && durationSeconds > 0;

  /* helpers */
  const clamp = (val, max) => Math.max(0, Math.min(val, max));

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70"
          onClick={onCancel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
        />

        {/* modal box */}
        <motion.div
          className="relative bg-siva-800 rounded-xl p-6 w-full max-w-md shadow-2xl"
          initial={{ y: -30, scale: 0.9, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: -30, scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* close btn */}
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 text-siva-400 hover:text-white"
          >
            <Icon icon="gridicons:cross-circle" width={28} height={28} />
          </button>

          <h2 className="text-2xl font-semibold text-siva-100 mb-6">
            Create a room
          </h2>

          {/* name */}
          <label className="block mb-4">
            <span className="text-siva-100">Room name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-siva-700 rounded-lg ring-2 ring-bordo-600 focus:outline-none focus:ring-bordo-400 text-siva-100 placeholder-siva-400"
              placeholder="Sci-fi Movie Night"
            />
          </label>

          {/* timer */}
          <fieldset className="mb-4">
            <legend className="text-siva-100 mb-1 ">Set timer</legend>
            <div className="flex gap-2 max-w-xs ">
              {[
                {
                  label: "h",
                  value: hours,
                  set: setHours,
                  max: 12,
                },
                {
                  label: "m",
                  value: mins,
                  set: setMins,
                  max: 59,
                },
                {
                  label: "s",
                  value: secs,
                  set: setSecs,
                  max: 59,
                },
              ].map(({ label, value, set, max }) => (
                <div key={label} className="flex flex-col items-center flex-1">
                  <input
                    type="number"
                    min={0}
                    max={max}
                    value={value}
                    onChange={(e) => set(clamp(Number(e.target.value), max))}
                    className="w-full px-3 py-2 bg-siva-700 rounded-lg ring-2 ring-bordo-600 focus:ring-bordo-400 focus:outline-none text-center text-siva-100"
                  />
                  <span className="text-xs text-siva-300 mt-1">{label}</span>
                </div>
              ))}
            </div>
          </fieldset>

          {/* room type */}
          <fieldset className="mb-4">
            <legend className="text-siva-100 mb-1">Room type</legend>
            <div className="flex gap-4">
              {["Generate", "Random"].map((opt) => (
                <label
                  key={opt}
                  className={`flex items-center gap-2 cursor-pointer px-3 py-1 rounded-lg ${
                    type === opt ? "bg-bordo-600" : "bg-siva-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="room-type"
                    value={opt}
                    checked={type === opt}
                    onChange={() => setType(opt)}
                    className="form-radio text-bordo-500 focus:ring-bordo-400"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </fieldset>

          {/* limit */}
          <label className="block mb-8 max-w-[180px]">
            <span className="text-siva-100">Movie limit / person</span>
            <input
              type="number"
              min={1}
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="mt-1 w-full px-4 py-2 bg-siva-700 rounded-lg ring-2 ring-bordo-600 focus:ring-bordo-400 focus:outline-none text-siva-100"
            />
          </label>

          {/* actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-5 py-2 bg-siva-600 rounded-lg text-white hover:bg-siva-500"
            >
              Cancel
            </button>

            <button
              onClick={() =>
                onCreate(name.trim(), type, limit, durationSeconds)
              }
              disabled={!canSubmit}
              className={`px-5 py-2 rounded-lg text-white transition-colors ${
                canSubmit
                  ? "bg-bordo-500 hover:bg-bordo-400"
                  : "bg-bordo-500/50 cursor-not-allowed"
              }`}
            >
              Create
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
